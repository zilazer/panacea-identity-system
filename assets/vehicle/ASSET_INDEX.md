# Vehicle Asset Index / 车辆资产索引

## Reference Vehicle / 参考车辆

| File / 文件 | Status / 状态 | Notes / 说明 |
| --- | --- | --- |
| `reference/tesla-model-3-2025-china-deep-blue-reference.png` | Active reference / 当前参考 | User's Tesla Model 3 reference photo. Purchased in mainland China in September 2025. Body color appears to be a deep metallic blue from the supplied photo. / 用户的 Tesla Model 3 参考照片。2025 年 9 月购于中国大陆。根据提供照片，车身颜色呈深蓝金属色。 |

## Blueprints / 图纸

| File / 文件 | Status / 状态 | Notes / 说明 |
| --- | --- | --- |
| `blueprints/model3-sticker-placement-blueprint-v0.1.svg` | Draft / 草案 | First sticker placement measurement blueprint with front, side, passenger-side, rear views, candidate sticker IDs, suggested sizes, rotation angles, curvature-radius estimates, and field-verification fields. / 第一版车贴位置测量图纸，包含前视、侧视、乘客侧、后视、候选贴纸编号、建议尺寸、旋转角度、曲率半径估算与实车复测字段。 |
| `blueprints/model3-sticker-placement-blueprint-v0.2.svg` | Current draft / 当前草案 | Updated drawing based on the cheapest mainland China September 2025 Model 3 configuration: base RWD, deep blue body, standard exterior, no Performance spoiler. / 当前图纸按 2025 年 9 月中国大陆最便宜 Model 3 配置更新：后轮驱动入门版、深蓝车身、标准外观、无 Performance 尾翼。 |
| `blueprints/model3-rwd-blue-realistic-side-blueprint-v0.3.svg` | Current visual standard / 当前视觉标准 | Realistic side-view blueprint for the base RWD deep-blue Model 3, with detailed silhouette, lamps, glass, door cuts, handles, side camera, charging port, wheel arches, and multi-spoke wheels. / 后轮驱动入门版深蓝 Model 3 写实侧视图纸，包含细化车身轮廓、灯组、玻璃、门缝、门把手、侧摄像头、充电口、轮拱与多辐轮毂。 |
| `blueprints/model3-rwd-blue-realistic-side-raster-v0.4.png` | Current raster base / 当前栅格底图 | AI-generated realistic raster side-view base for the deep-blue mainland China Model 3 base RWD. Use as the visual base for later measurement overlays. / AI 生成的深蓝中国大陆 Model 3 后轮驱动入门版写实侧视栅格底图，用作后续测量标注底图。 |
| `blueprints/model3-rwd-blue-front-raster-v0.5.png` | Current raster set / 当前栅格组 | Realistic front-view raster base for sticker placement overlays. / 用于贴纸标注叠加的写实前视栅格底图。 |
| `blueprints/model3-rwd-blue-driver-side-raster-v0.5.png` | Current raster set / 当前栅格组 | Realistic driver-side raster base for sticker placement overlays. / 用于贴纸标注叠加的写实驾驶侧栅格底图。 |
| `blueprints/model3-rwd-blue-passenger-side-raster-v0.5.png` | Current raster set / 当前栅格组 | Realistic passenger-side raster base for sticker placement overlays. / 用于贴纸标注叠加的写实乘客侧栅格底图。 |
| `blueprints/model3-rwd-blue-rear-raster-v0.5.png` | Current raster set / 当前栅格组 | Realistic rear-view raster base for sticker placement overlays. / 用于贴纸标注叠加的写实后视栅格底图。 |
| `blueprints/model3-rwd-blue-top-raster-v0.5.png` | Current raster set / 当前栅格组 | Realistic top-view raster base for sticker placement overlays. / 用于贴纸标注叠加的写实顶视栅格底图。 |

## 3D Preview Models / 三维预览模型

| File / 文件 | Status / 状态 | Notes / 说明 |
| --- | --- | --- |
| `3d/model3-highland-preview/Poppyseed.gltf` | Active preview model / 当前预览模型 | glTF 2.0 Model 3 preview asset used by the standalone `3d-preview.html` Three.js decal tool. Supports local PNG decal import, drag placement, scale, rotation, opacity, and camera presets. Uses `Poppyseed0.bin` and `textures/`. Source path verified as reachable at `https://teslawrapgallery.com/tesla_3d_models/Poppyseed.gltf`. / 独立 `3d-preview.html` Three.js 贴纸工具使用的 glTF 2.0 Model 3 预览资产，支持本地 PNG 贴纸导入、拖动定位、缩放、旋转、透明度与相机预设。依赖 `Poppyseed0.bin` 与 `textures/`。来源路径已验证可访问：`https://teslawrapgallery.com/tesla_3d_models/Poppyseed.gltf`。 |

## Handling Rules / 使用规则

- Use this vehicle photo as the real color and proportion reference for sticker placement proposals. / 车贴位置方案应以这张车辆照片作为真实颜色与比例参考。
- Do not infer a loud racing or wrap direction from the vehicle context. / 不要因为是车辆项目就推导成赛车拉花或大面积改色方向。
- For this deep blue body color, prioritize matte silver, matte white, and low-contrast gunmetal gray depending on the surface. / 对于该深蓝车身，应根据表面优先考虑哑光银、哑光白与低对比枪灰。
- Keep visible exterior decals small and aligned to existing body details. / 可见外部贴纸应保持小尺寸，并对齐车身既有细节。
