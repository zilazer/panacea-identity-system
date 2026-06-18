# Panacea Identity System / Panacea 品牌识别系统

Panacea Identity System is the long-term brand design system for `panacea`, `人間良藥`, `allheilmittel`, and the icon `a`.

Panacea 品牌识别系统是为 `panacea`、`人間良藥`、`allheilmittel` 与图标 `a` 建立的长期品牌设计系统。

This project is not a logo exploration folder. It is a maintainable identity system for vehicles, packaging, signage, products, software, editorial material, objects, and architectural applications.

这个项目不是一个 Logo 探索文件夹，而是一套可长期维护的品牌识别系统，覆盖车辆、包装、招牌、产品、软件、编辑出版物、物件与建筑应用。

## Brand Layers / 品牌层级

| Layer / 层级 | Asset / 资产 | Role / 作用 |
| --- | --- | --- |
| Master Brand / 主品牌 | `panacea` | Primary brand mark / 主要品牌标识 |
| Concept Layer / 理念层 | `人間良藥` | Brand philosophy / 品牌理念 |
| Archive Layer / 档案层 | `allheilmittel` | Research, archive, editorial, lab context / 研究、档案、编辑与实验室语境 |
| Icon Layer / 图标层 | `a` | App icon, stamp, sticker, seal, wheel cap, avatar / App 图标、印章、贴纸、封印、轮毂盖、头像 |

These layers are not competing logos. They are used by context and scale.

这四层不是互相竞争的 Logo，而是根据场景与尺度分工使用。

## Current Focus / 当前重点

The active design program is:

当前设计项目是：

**Panacea Tesla Model 3 Sticker Design System / Panacea Tesla Model 3 车贴设计系统**

Vehicle identity direction:

车辆识别方向：

- minimal intervention / 最小介入
- architectural detail / 建筑化细节
- hidden branding / 隐藏式品牌
- discoverable placement / 可被发现的位置
- quiet luxury / 安静的高级感
- point graphics, not full-body graphics / 点状图形，不做大面积车身图案

The output should become an official **Panacea Vehicle Identity Manual**, not a single mockup.

最终输出应成为一套正式的 **Panacea Vehicle Identity Manual / Panacea 车辆识别手册**，而不是单张效果图。

## Design Language / 设计语言

- uniform stroke weight / 统一线宽
- 45-degree chamfer language / 45 度切角语言
- modular construction / 模块化构成
- open geometric forms / 开放式几何形态
- no decorative curves / 不使用装饰性曲线
- symbol-first thinking / 符号优先
- industrial, editorial, architectural tone / 工业、编辑、建筑化气质
- timeless rather than trendy / 永恒感优先于潮流感

Reference attitude: Braun, FRAMA, Aesop, Acne Studios, Rimowa, New Tendency, Jasper Morrison, Dieter Rams.

参考气质：Braun、FRAMA、Aesop、Acne Studios、Rimowa、New Tendency、Jasper Morrison、Dieter Rams。

## Project Structure / 项目结构

```text
index.html
assets/
  logo/
    current/       Current active marks / 当前有效标识
    legacy/        Historical references and prior assets / 历史参考与旧资产
docs/
  identity-system.md
  manuals/
    tesla-model-3-sticker-guide.md
  specs/
    vehicle-sticker-spec.md
    model3-sticker-placement-blueprint.md
  prompts/
    lead-design-system-architect.md
```

## Website / 网页

The project includes a static website at `index.html` for GitHub Pages deployment.

项目包含一个位于 `index.html` 的静态网页，可直接用于 GitHub Pages 部署。

Recommended GitHub Pages setting:

推荐 GitHub Pages 设置：

- Source: deploy from branch / 来源：从分支部署
- Branch: `main` / 分支：`main`
- Folder: `/root` / 目录：`/root`

The website presents the identity concept, four-layer brand system, Tesla Model 3 vehicle identity direction, a 3D sticker preview tool, manual structure, and current production assets.

网页展示品牌概念、四层品牌系统、Tesla Model 3 车辆识别方向、3D 车贴预览工具、手册结构与当前生产资产。

## Blueprint / 图纸

The first sticker placement measurement draft is available at:

第一版车贴位置测量图纸位于：

- `assets/vehicle/blueprints/model3-sticker-placement-blueprint-v0.2.svg`
- `assets/vehicle/blueprints/model3-rwd-blue-realistic-side-blueprint-v0.3.svg`
- `assets/vehicle/blueprints/model3-rwd-blue-realistic-side-raster-v0.4.png`
- `assets/vehicle/blueprints/model3-rwd-blue-front-raster-v0.5.png`
- `assets/vehicle/blueprints/model3-rwd-blue-driver-side-raster-v0.5.png`
- `assets/vehicle/blueprints/model3-rwd-blue-passenger-side-raster-v0.5.png`
- `assets/vehicle/blueprints/model3-rwd-blue-rear-raster-v0.5.png`
- `assets/vehicle/blueprints/model3-rwd-blue-top-raster-v0.5.png`
- `docs/specs/model3-sticker-placement-blueprint.md`

This blueprint identifies candidate sticker zones, suggested sizes, rotation angles, curvature-radius estimates, and required field-verification measurements.

这张图纸标记了候选贴纸区域、建议尺寸、旋转角度、曲率半径估算与必须实车复测的测量字段。

The current drawing is based on the user's September 2025 mainland China Tesla Model 3 base RWD blue version, not a Performance or modified version.

当前图纸基于用户 2025 年 9 月中国大陆 Tesla Model 3 后轮驱动入门版蓝色车型绘制，不按 Performance 或改装版本绘制。

The V0.3 realistic side-view blueprint is the visual-detail standard for future blueprint views.

V0.3 写实侧视图是后续所有车辆图纸视图的视觉细节标准。

The V0.4 raster side-view is the current realism target and should be used as the base image for sticker measurement overlays.

V0.4 栅格侧视图是当前写实目标，应作为后续贴纸测量标注的底图。

The V0.5 raster set expands the realistic base to front, rear, driver side, passenger side, and top views.

V0.5 栅格组把写实底图扩展到前视、后视、驾驶侧、乘客侧与顶视。

## 3D Preview / 三维预览

The project now includes a local glTF Model 3 preview asset and an `index.html` Three.js preview section for web-based sticker placement studies:

项目现在包含一个本地 glTF Model 3 预览资产，并在 `index.html` 中加入了 Three.js 预览区，用于网页三维车贴位置研究：

- `assets/vehicle/3d/model3-highland-preview/Poppyseed.gltf`
- `docs/specs/vehicle-3d-preview-model.md`

The preview tool supports PNG decal import, drag-to-place projection on the car surface, scale, rotation, opacity, and front/side/rear/top camera presets.

预览工具支持导入 PNG 贴纸、在车身表面拖动投射定位、缩放、旋转、透明度调整，以及前视、侧视、后视、顶视相机预设。

This model is for visual preview and interaction prototyping, not final physical measurement.

该模型用于视觉预览与交互原型，不用于最终实物测量。

## Asset Status / 资产状态

Current active assets:

当前有效资产：

- `assets/logo/current/panacea-master-solid-current.svg`
- `assets/logo/current/panacea-master-outline-current.svg`
- `assets/logo/current/panacea-icon-a-current.svg`
- `assets/vehicle/reference/tesla-model-3-2025-china-deep-blue-reference.png`

Legacy/reference assets:

历史 / 参考资产：

- `assets/logo/legacy/renliang-thin-print.svg`

PNG logo files in `assets/logo/legacy` and `assets/logo/previous` are deprecated raster context only. Webpage brand imagery should use SVG.

`assets/logo/legacy` 与 `assets/logo/previous` 中的 PNG logo 文件仅作为已弃用栅格语境保留。网页品牌图像应使用 SVG。

Legacy assets are source context. They should not override the current four-layer system without an explicit design decision.

历史资产是来源语境。除非有明确的设计决策，否则它们不应覆盖当前四层品牌系统。

## Vehicle Reference / 车辆参考

The current vehicle reference is the user's Tesla Model 3 purchased in mainland China in September 2025. The supplied photo shows a deep metallic blue body color.

当前车辆参考为用户于 2025 年 9 月在中国大陆购买的 Tesla Model 3。根据提供照片，车身颜色为深蓝金属色。

For this vehicle, exterior sticker proposals should prioritize matte silver and matte white on dark glass or trim, and low-contrast gunmetal gray only where it remains legible on blue paint.

针对这辆车，外部车贴方案应优先考虑在深色玻璃或饰条上使用哑光银与哑光白；枪灰只应在深蓝车漆上仍能保持可读性的位置使用。
