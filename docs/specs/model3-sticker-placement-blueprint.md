# Model 3 Sticker Placement Blueprint / Model 3 贴纸位置图纸

Blueprint file:

图纸文件：

- `assets/vehicle/blueprints/model3-sticker-placement-blueprint-v0.2.svg`
- `assets/vehicle/blueprints/model3-rwd-blue-realistic-side-blueprint-v0.3.svg`
- `assets/vehicle/blueprints/model3-rwd-blue-realistic-side-raster-v0.4.png`
- `assets/vehicle/blueprints/model3-rwd-blue-front-raster-v0.5.png`
- `assets/vehicle/blueprints/model3-rwd-blue-driver-side-raster-v0.5.png`
- `assets/vehicle/blueprints/model3-rwd-blue-passenger-side-raster-v0.5.png`
- `assets/vehicle/blueprints/model3-rwd-blue-rear-raster-v0.5.png`
- `assets/vehicle/blueprints/model3-rwd-blue-top-raster-v0.5.png`

## Purpose / 目的

This blueprint is a measurement draft for the Panacea Tesla Model 3 sticker system. It identifies candidate sticker surfaces, suggested mark sizes, rotation angles, curvature radius estimates, and edge-offset fields.

这张图纸是 Panacea Tesla Model 3 车贴系统的测量草案，用于标记适合贴纸的位置、建议标识尺寸、旋转角度、曲率半径估算值与边距测量字段。

It is not a final production cutting file. All local dimensions must be verified on the actual car before vinyl cutting.

它不是最终生产下刀文件。所有局部尺寸都必须在实车上复测后才能用于车贴制作。

## Vehicle Reference / 车辆参考

Vehicle:

车辆：

- Tesla Model 3 RWD base trim / Tesla Model 3 后轮驱动入门版
- Purchased in mainland China in September 2025 / 2025 年 9 月购于中国大陆
- Deep Blue Metallic body color from supplied reference photo / 根据参考照片为深蓝金属色车身
- Base-version exterior logic: no Performance spoiler, no sport body kit, standard sedan rear deck, standard wheel treatment / 入门版外观逻辑：无 Performance 尾翼、无运动套件、标准三厢车尾、标准轮毂处理

Planning reference dimensions:

规划参考尺寸：

| Dimension / 尺寸 | Reference / 参考值 |
| --- | --- |
| Overall length / 车长 | 4694 mm |
| Overall width / 车宽 | 1849 mm |
| Overall height / 车高 | 1443 mm |
| Wheelbase / 轴距 | 2875 mm |

These full-vehicle dimensions are used only to scale the drawing logic. The drawn appearance should follow the 2025 mainland China Model 3 base RWD blue version. Sticker zones must be measured locally.

这些整车尺寸只用于建立图纸比例逻辑。绘制外观应遵循 2025 年中国大陆 Model 3 后轮驱动入门版蓝色车型。贴纸区域必须做局部实测。

## Appearance Constraints / 外观绘制约束

The blueprint must represent the cheapest mainland China Model 3 available to the user in September 2025: the base rear-wheel-drive version in blue.

图纸必须表现用户在 2025 年 9 月中国大陆可以买到的最便宜 Model 3：蓝色后轮驱动入门版。

Draw:

需要绘制：

- standard Highland slim headlamps / Highland 窄长头灯
- clean front bumper without aggressive sport intake graphics / 干净前保险杠，不画激进运动进气视觉
- standard sedan side profile / 标准轿车侧面比例
- standard wheel treatment, not Performance-specific wheels / 标准轮毂处理，不画 Performance 专属轮毂
- clean rear deck without carbon-fiber Performance spoiler / 干净后备箱盖，不画 Performance 碳纤维尾翼
- deep metallic blue body tone as the planning color / 以深蓝金属色作为规划车身色

Do not draw:

不要绘制：

- Performance spoiler / Performance 尾翼
- racing graphics / 赛车拉花
- lowered stance / 降低车身姿态
- aftermarket body kit / 后市场运动包围
- chrome or reflective sticker assumptions / 镀铬或反光贴纸假设

## Realistic Drawing Standard / 写实绘制标准

The current visual-detail target is:

当前视觉细节标准为：

- `assets/vehicle/blueprints/model3-rwd-blue-realistic-side-blueprint-v0.3.svg`
- `assets/vehicle/blueprints/model3-rwd-blue-realistic-side-raster-v0.4.png`

All future vehicle blueprint views should match the V0.4 raster image for recognizable real-car likeness. Vector overlays should carry precise measurement labels.

未来所有车辆图纸视图都应匹配 V0.4 栅格图的真实车辆识别度。精确测量文字应由后期矢量标注层承担。

Required visual details:

必须绘制的视觉细节：

- realistic Highland side silhouette / 写实 Highland 侧面轮廓
- slim front and rear lamp geometry / 窄长前后灯几何
- glass greenhouse shape and B-pillar division / 玻璃舱与 B 柱分割
- front and rear door cut lines / 前后门缝
- flush door handles / 隐藏式门把手
- side camera detail / 侧摄像头细节
- charging-port outline / 充电口轮廓
- wheel arches and multi-spoke wheel detail / 轮拱与多辐轮毂细节
- rocker panel and lower body sculpting / 侧裙与下部车身曲面线
- subtle deep-blue body fill for trim-specific recognition / 轻微深蓝车身底色，用于识别车型颜色

The drawing should remain a technical line drawing, not a photorealistic render.

图纸仍应保持技术线稿属性，不应变成照片级渲染图。

For public-facing or high-recognition previews, use a raster base first, then add vector measurement overlays. Hand-drawn SVG vehicle bodies are acceptable only for schematic measurement drafts.

面向公开展示或需要高识别度的预览时，应先使用栅格写实底图，再叠加矢量测量标注。手写 SVG 车身只适合示意级测量草案。

## Current Raster View Set / 当前栅格视图组

The current V0.5 raster base set includes five views:

当前 V0.5 栅格底图组包含五个视图：

| View / 视图 | File / 文件 |
| --- | --- |
| Front / 前视 | `assets/vehicle/blueprints/model3-rwd-blue-front-raster-v0.5.png` |
| Driver side / 驾驶侧 | `assets/vehicle/blueprints/model3-rwd-blue-driver-side-raster-v0.5.png` |
| Passenger side / 乘客侧 | `assets/vehicle/blueprints/model3-rwd-blue-passenger-side-raster-v0.5.png` |
| Rear / 后视 | `assets/vehicle/blueprints/model3-rwd-blue-rear-raster-v0.5.png` |
| Top / 顶视 | `assets/vehicle/blueprints/model3-rwd-blue-top-raster-v0.5.png` |

Use these PNGs as visual base layers. Add exact sticker dimensions, angles, curvature notes, and edge offsets in a separate annotation layer.

这些 PNG 应作为视觉底图使用。精确贴纸尺寸、角度、曲率说明与边距应在独立标注层中添加。

## Measurement Fields / 测量字段

Each sticker candidate should be measured with the following fields:

每个候选贴纸位置都应记录以下字段：

| Field / 字段 | Meaning / 含义 |
| --- | --- |
| `ID` | Numbered location on the blueprint / 图纸上的编号位置 |
| `zone` | Vehicle surface or part / 车辆表面或部件 |
| `asset` | Brand asset to apply / 使用的品牌资产 |
| `size_mm` | Sticker bounding-box size / 贴纸外接矩形尺寸 |
| `rotation_deg` | Sticker rotation relative to vehicle horizontal / 相对车身水平线的旋转角度 |
| `curve_radius_mm` | Approximate local surface radius / 局部表面近似曲率半径 |
| `chord_length_mm` | Usable straight or near-straight placement length / 可用直线或近直线贴附长度 |
| `edge_offset_mm` | Distance from closest body seam, lamp edge, glass edge, or trim line / 距离最近钣金缝、灯边、玻璃边或饰条线的距离 |
| `finish` | Matte white, matte silver, or gunmetal gray / 哑光白、哑光银或枪灰 |
| `status` | Draft, field verified, prototype, approved / 草案、已实测、打样、已确认 |

## Candidate Zones / 候选区域

| ID / 编号 | Zone / 区域 | Suggested Asset / 建议资产 | Size / 尺寸 | Rotation / 角度 | Curvature / 曲率 |
| --- | --- | --- | --- | --- | --- |
| 1 | Left headlight corner / 左头灯角 | `a` | 20 x 20 mm | -16 deg | R approx 620 mm |
| 2 | Right headlight corner / 右头灯角 | `a` | 20 x 20 mm | +16 deg | R approx 620 mm |
| 3 | Left front bumper / 左前保险杠 | `panacea` | 70 x 16 mm | -7 deg | chord approx 92 mm |
| 4 | Right front bumper / 右前保险杠 | `panacea` | 70 x 16 mm | +7 deg | chord approx 92 mm |
| 5 | Fender blade / 翼子板细节 | micro mark | 45 x 12 mm | -12 deg | R approx 900 mm |
| 6 | Driver door lower area / 驾驶侧车门下部 | `panacea` | 70 x 16 mm | +2 deg | near-flat |
| 7 | B-pillar / B 柱 | `a` | 20 x 20 mm | 0 deg | vertical glass plane |
| 8 | Rear quarter glass / 后三角窗 | `allheilmittel` or micro text | 62 x 14 mm | +9 deg | R approx 1300 mm |
| 9 | Charging port edge / 充电口边缘 | micro mark | 42 x 12 mm | -6 deg | field verify |
| 10 | Passenger door lower area / 乘客侧车门下部 | `panacea` | 70 x 16 mm | -2 deg | near-flat |
| 11 | Passenger B-pillar / 乘客侧 B 柱 | `a` | 20 x 20 mm | 0 deg | vertical glass plane |
| 12 | Passenger rear quarter glass / 乘客侧后三角窗 | `allheilmittel` or micro text | 62 x 14 mm | -9 deg | R approx 1300 mm |
| 13 | Passenger charging-port mirror option / 乘客侧充电口镜像备选 | micro mark | 42 x 12 mm | +6 deg | field verify |
| 14 | Left rear lamp inner area / 左尾灯内侧 | micro mark | 62 x 14 mm | +5 deg | R approx 720 mm |
| 15 | Right rear lamp inner area / 右尾灯内侧 | micro mark | 62 x 14 mm | -5 deg | R approx 720 mm |
| 16 | Rear bumper low detail / 后保险杠低位细节 | micro `panacea` | 58 x 14 mm | 0 deg | low-visibility detail |

## Measuring Method / 测量方法

Recommended tools:

推荐工具：

- flexible measuring tape / 软尺
- contour gauge or flexible curve ruler / 轮廓尺或软曲线尺
- masking tape / 美纹纸
- digital angle finder or phone level app / 数显角度尺或手机水平仪
- caliper for small trim gaps / 卡尺，用于测量小型饰条缝隙
- printed 1:1 test stickers / 1:1 打印测试贴纸

Process:

流程：

1. Clean the target surface and mark the visual alignment line with masking tape.
   清洁目标表面，用美纹纸标出视觉对齐线。
2. Place a 1:1 paper or low-tack vinyl test mark on the surface.
   将 1:1 纸样或低粘测试贴贴到表面。
3. Record top-left, center, and nearest-edge offsets.
   记录左上角、中心点与最近边缘的距离。
4. Measure the rotation angle relative to the nearest panel line, not the ground.
   旋转角度应相对最近钣金线测量，而不是相对地面。
5. Estimate curvature by checking whether the test mark lifts at the corners.
   通过观察测试贴四角是否翘起估算曲面影响。
6. If corner lift appears, reduce the sticker width or split the mark into smaller pieces.
   如果四角翘起，应减小贴纸宽度或拆分为更小片段。

## Production Rule / 制作规则

Use the SVG blueprint for planning and annotation. Use the original logo SVG files for cutting:

用这张 SVG 图纸进行规划与标注。实际下刀应使用原始 Logo SVG 文件：

- `assets/logo/current/panacea-master-solid-current.svg`
- `assets/logo/current/panacea-master-outline-current.svg`

The blueprint is not a vinyl cutting source.

图纸本身不是车贴下刀源文件。
