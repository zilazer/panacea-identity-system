# Panacea Architectural Regular

可安装的 Panacea 建筑构件式字体。输入大写或小写字母会显示相同字形。

Installable Panacea architectural-component typeface. Uppercase and lowercase input share the same glyph outlines.

## 字符 / Characters

- `A-Z`
- `a-z`
- Space / 空格

数字、标点符号和重音字符暂未包含。

Numerals, punctuation, and accented characters are not included yet.

## 文件 / Files

- `PanaceaArchitectural-Regular.ttf`: 可安装字体 / installable font
- `source/panacea-alphabet-2nd.svg`: 原始矢量字形 / source vector glyphs
- `../../tools/build_panacea_font.py`: 可重复构建脚本 / reproducible build script

## 重新生成 / Rebuild

```bash
PYTHONPATH=/private/tmp/panacea-font-deps python3 tools/build_panacea_font.py
```
