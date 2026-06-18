# Model 3 3D Preview Asset / Model 3 三维预览资产

## Files / 文件

- `Poppyseed.gltf`
- `Poppyseed0.bin`
- `textures/000.png` through `textures/062.png`

## Source / 来源

The model matches the publicly reachable Tesla wrap gallery asset path:

模型对应可访问的 Tesla wrap gallery 资产路径：

- `https://teslawrapgallery.com/tesla_3d_models/Poppyseed.gltf`

The current project copy was imported from the local cached Tesla 3D model directory and validated for complete glTF resource references.

当前项目副本从本机已有 Tesla 3D 模型缓存目录导入，并已校验 glTF 外部资源引用完整。

## Validation / 校验

- Format: glTF 2.0 JSON + external binary + PNG textures
- Files: 65 total
- Size: about 1.4 MB
- External references in `Poppyseed.gltf`: 64
- Missing external references: 0
- Internal node evidence: includes `Model3_Text_NV35`

## Intended Use / 用途

Use this asset for local web-based 3D preview prototyping:

用于本地网页三维预览原型：

- Three.js `GLTFLoader`
- sticker-placement preview
- camera/orbit controls
- rough surface and placement exploration

## Limitations / 限制

This is a preview model, not a factory CAD model.

这是预览模型，不是工厂 CAD 模型。

- Do not use it for millimeter-accurate sticker cutting.
- Do not treat mesh surface measurements as production measurements.
- Confirm visual match against the user's September 2025 mainland China Model 3 RWD base car before final public use.
- Keep exact sticker dimensions in a separate measurement/spec layer.

- 不要用于毫米级车贴下刀。
- 不要把网格表面测量当作生产尺寸。
- 最终公开使用前，应与用户 2025 年 9 月中国大陆 Model 3 后轮驱动入门版实车外观核对。
- 精确车贴尺寸应保留在独立测量 / 规格层。
