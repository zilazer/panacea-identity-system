const form = document.querySelector("#font-playground");
const input = document.querySelector("#font-preview-input");
const exportButton = document.querySelector("#export-font-png");
const status = document.querySelector("#font-export-status");

const FONT_FAMILY = "Panacea Architectural";
const FONT_SIZE = 240;
const LINE_HEIGHT = 300;
const PADDING = 80;
const EXPORT_SCALE = 2;

function updateButton() {
  exportButton.disabled = input.value.length === 0;
  if (input.value.length > 0) status.textContent = "";
}

function safeFilename(text) {
  const compact = text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z-]/g, "")
    .slice(0, 40);
  return compact ? `panacea-${compact}.png` : "panacea-type.png";
}

async function exportPng() {
  const text = input.value;
  if (!text) return;

  exportButton.disabled = true;
  status.textContent = "Rendering / 正在生成";

  await document.fonts.load(`${FONT_SIZE}px "${FONT_FAMILY}"`);

  const lines = text.split("\n");
  const measurementCanvas = document.createElement("canvas");
  const measurementContext = measurementCanvas.getContext("2d");
  measurementContext.font = `${FONT_SIZE}px "${FONT_FAMILY}"`;

  const maxLineWidth = Math.max(...lines.map((line) => measurementContext.measureText(line || " ").width));
  const textHeight = FONT_SIZE * 1.11 + Math.max(0, lines.length - 1) * LINE_HEIGHT;
  const logicalWidth = Math.ceil(maxLineWidth + PADDING * 2);
  const logicalHeight = Math.ceil(textHeight + PADDING * 2);

  const canvas = document.createElement("canvas");
  canvas.width = logicalWidth * EXPORT_SCALE;
  canvas.height = logicalHeight * EXPORT_SCALE;

  const context = canvas.getContext("2d");
  context.scale(EXPORT_SCALE, EXPORT_SCALE);
  context.clearRect(0, 0, logicalWidth, logicalHeight);
  context.fillStyle = "#000000";
  context.font = `${FONT_SIZE}px "${FONT_FAMILY}"`;
  context.textBaseline = "alphabetic";

  const firstBaseline = PADDING + FONT_SIZE * 0.85;
  lines.forEach((line, index) => {
    context.fillText(line, PADDING, firstBaseline + index * LINE_HEIGHT);
  });

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("PNG export failed");

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = safeFilename(text);
  link.click();
  URL.revokeObjectURL(url);

  status.textContent = `${canvas.width} × ${canvas.height}px · Transparent / 透明背景`;
  exportButton.disabled = false;
}

input.addEventListener("input", updateButton);
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await exportPng();
  } catch (error) {
    status.textContent = "Export failed / 导出失败";
    exportButton.disabled = false;
    console.error(error);
  }
});

updateButton();
