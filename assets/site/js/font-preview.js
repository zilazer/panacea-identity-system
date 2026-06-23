const form = document.querySelector("#font-playground");
const input = document.querySelector("#font-preview-input");
const exportPngButton = document.querySelector("#export-font-png");
const exportSvgButton = document.querySelector("#export-font-svg");
const status = document.querySelector("#font-export-status");

const FONT_FAMILY = "Panacea Architectural";
const FONT_URL = "assets/font/PanaceaArchitectural-Regular.ttf?v=0.3.0";
const FONT_SIZE = 240;
const LINE_HEIGHT = 300;
const PADDING = 80;
const EXPORT_SCALE = 2;
let fontDataUriPromise;

function updateButton() {
  const isEmpty = input.value.length === 0;
  exportPngButton.disabled = isEmpty;
  exportSvgButton.disabled = isEmpty;
  if (input.value.length > 0) status.textContent = "";
}

function safeFilename(text, extension) {
  const compact = text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z-]/g, "")
    .slice(0, 40);
  return compact ? `panacea-${compact}.${extension}` : `panacea-type.${extension}`;
}

async function getExportMetrics(text) {
  await document.fonts.load(`${FONT_SIZE}px "${FONT_FAMILY}"`);

  const lines = text.split("\n");
  const measurementCanvas = document.createElement("canvas");
  const measurementContext = measurementCanvas.getContext("2d");
  measurementContext.font = `${FONT_SIZE}px "${FONT_FAMILY}"`;

  const maxLineWidth = Math.max(...lines.map((line) => measurementContext.measureText(line || " ").width));
  const textHeight = FONT_SIZE * 1.11 + Math.max(0, lines.length - 1) * LINE_HEIGHT;
  const logicalWidth = Math.ceil(maxLineWidth + PADDING * 2);
  const logicalHeight = Math.ceil(textHeight + PADDING * 2);
  const firstBaseline = PADDING + FONT_SIZE * 0.85;

  return { lines, logicalWidth, logicalHeight, firstBaseline };
}

function setExportDisabled(isDisabled) {
  exportPngButton.disabled = isDisabled;
  exportSvgButton.disabled = isDisabled;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

async function getFontDataUri() {
  if (!fontDataUriPromise) {
    fontDataUriPromise = fetch(FONT_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Font download failed");
        return response.arrayBuffer();
      })
      .then((buffer) => `data:font/ttf;base64,${arrayBufferToBase64(buffer)}`);
  }
  return fontDataUriPromise;
}

async function exportPng() {
  const text = input.value;
  if (!text) return;

  setExportDisabled(true);
  status.textContent = "Rendering / 正在生成";

  const { lines, logicalWidth, logicalHeight, firstBaseline } = await getExportMetrics(text);

  const canvas = document.createElement("canvas");
  canvas.width = logicalWidth * EXPORT_SCALE;
  canvas.height = logicalHeight * EXPORT_SCALE;

  const context = canvas.getContext("2d");
  context.scale(EXPORT_SCALE, EXPORT_SCALE);
  context.clearRect(0, 0, logicalWidth, logicalHeight);
  context.fillStyle = "#000000";
  context.font = `${FONT_SIZE}px "${FONT_FAMILY}"`;
  context.textBaseline = "alphabetic";

  lines.forEach((line, index) => {
    context.fillText(line, PADDING, firstBaseline + index * LINE_HEIGHT);
  });

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("PNG export failed");

  downloadBlob(blob, safeFilename(text, "png"));

  status.textContent = `${canvas.width} × ${canvas.height}px · Transparent / 透明背景`;
  setExportDisabled(false);
}

async function exportSvg() {
  const text = input.value;
  if (!text) return;

  setExportDisabled(true);
  status.textContent = "Rendering SVG / 正在生成 SVG";

  const [{ lines, logicalWidth, logicalHeight, firstBaseline }, fontDataUri] = await Promise.all([
    getExportMetrics(text),
    getFontDataUri()
  ]);
  const tspans = lines
    .map((line, index) => {
      const y = firstBaseline + index * LINE_HEIGHT;
      const value = line.length > 0 ? escapeXml(line) : "&#160;";
      return `<tspan x="${PADDING}" y="${y}" xml:space="preserve">${value}</tspan>`;
    })
    .join("\n    ");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${logicalWidth}" height="${logicalHeight}" viewBox="0 0 ${logicalWidth} ${logicalHeight}">
  <defs>
    <style>
      @font-face {
        font-family: "${FONT_FAMILY}";
        src: url("${fontDataUri}") format("truetype");
      }
    </style>
  </defs>
  <text fill="#000000" font-family="${FONT_FAMILY}" font-size="${FONT_SIZE}" dominant-baseline="alphabetic">
    ${tspans}
  </text>
</svg>
`;
  downloadBlob(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), safeFilename(text, "svg"));

  status.textContent = `${logicalWidth} × ${logicalHeight}px · SVG / 矢量文件`;
  setExportDisabled(false);
}

input.addEventListener("input", updateButton);
exportSvgButton.addEventListener("click", async () => {
  try {
    await exportSvg();
  } catch (error) {
    status.textContent = "SVG export failed / SVG 导出失败";
    setExportDisabled(false);
    console.error(error);
  }
});
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await exportPng();
  } catch (error) {
    status.textContent = "Export failed / 导出失败";
    setExportDisabled(false);
    console.error(error);
  }
});

updateButton();
