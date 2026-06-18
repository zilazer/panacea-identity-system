# Vehicle 3D Preview Model / 车辆三维预览模型

## Current Asset / 当前资产

The current 3D preview asset is:

当前三维预览资产为：

- `assets/vehicle/3d/model3-highland-preview/Poppyseed.gltf`

Supporting files:

支持文件：

- `assets/vehicle/3d/model3-highland-preview/Poppyseed0.bin`
- `assets/vehicle/3d/model3-highland-preview/textures/`

## Source / 来源

The online source path was checked and returns `HTTP 200`:

已检查线上来源路径，返回 `HTTP 200`：

- `https://teslawrapgallery.com/tesla_3d_models/Poppyseed.gltf`

## Validation / 校验

Local validation result:

本地校验结果：

- glTF external resource URIs: 64
- missing references: 0
- total files copied: 65
- project size: about 1.4 MB
- detected model node: `Model3_Text_NV35`

## Use / 用途

Use this model for web-based 3D preview:

用于网页三维预览：

- load with Three.js `GLTFLoader`
- apply deep-blue body material override
- import PNG decal artwork
- project the PNG decal onto the visible car surface with `DecalGeometry`
- drag the decal position directly on the model
- adjust decal scale, rotation, and opacity
- inspect placement from front, side, rear, and top camera presets
- prototype orbit controls and screenshots

## Web Integration / 网页集成

The current implementation lives in the standalone `3d-preview.html` page, linked from `index.html`.

当前实现位于独立的 `3d-preview.html` 页面，并由 `index.html` 入口页链接进入。

Runtime behavior:

运行行为：

- the page loads the local glTF from `assets/vehicle/3d/model3-highland-preview/Poppyseed.gltf`
- Three.js modules are loaded from `unpkg.com`
- the preview uses `GLTFLoader`, `DRACOLoader`, `OrbitControls`, and `DecalGeometry`
- PNG files are loaded locally in the browser through a file input and are not committed to the repo automatically
- the decal is rebuilt as geometry whenever placement, size, rotation, or opacity changes

- 页面从 `assets/vehicle/3d/model3-highland-preview/Poppyseed.gltf` 加载本地 glTF
- Three.js 模块从 `unpkg.com` 加载
- 预览使用 `GLTFLoader`、`DRACOLoader`、`OrbitControls` 与 `DecalGeometry`
- PNG 文件通过浏览器本地文件输入读取，不会自动提交到仓库
- 当位置、尺寸、旋转或透明度变化时，贴纸会被重新生成为几何体

## Limits / 限制

This model is suitable for visual preview, not production measurement.

该模型适合视觉预览，不适合生产测量。

Do not use mesh distances as final sticker dimensions. Final dimensions still require physical measurement on the user's actual September 2025 mainland China Model 3 RWD base vehicle.

不要把模型网格距离当作最终贴纸尺寸。最终尺寸仍需在用户 2025 年 9 月中国大陆 Model 3 后轮驱动入门版实车上测量。
