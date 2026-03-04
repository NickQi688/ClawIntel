# Gemini Seedance 2.0 Prompt Generator

> 为 Seedance 2.0 生成专业级视频提示词
>
> 基于 Gemini 3.5 Flash Preview 模型
> 支持首帧图片优化（集成 Nano Banana Pro）

## 功能说明

- **提示词生成**：为 Seedance 2.0 生成 3 个版本（基础/专业/创意）的视频提示词
- **场景支持**：10 大场景（文本生成、一致性控制、运镜复刻等）
- **餐饮美食**：6 大专用场景（小人国萌娃、烤肉广告、烧烤江湖等）
- **首帧优化**：集成 Nano Banana Pro（6000+ 图像提示词库）

## 安装

```bash
npx skills i gemini-seedance-prompt-generator
```

或手动克隆到本地：

```bash
git clone https://github.com/NickQi688/gemini-seedance-prompt-generator.git ~/.claude/skills/gemini-seedance-prompt-generator
```

## 使用方法

1. **激活 Skill**：说"帮我生成 Seedance 2.0 提示词"或提到视频相关需求
2. **自动识别**：自动识别场景类型（10 选1）
3. **获取推荐**：3 个版本提示词（基础/专业/创意）
4. **对话优化**：提出修改意见，多轮迭代
5. **首帧优化**：自动调用 Nano Banana Pro 获取高质量首帧图片

## 首帧优化工作流

### 4 种路径

```
用户需求
    ↓
【步骤 1】调用 Nano Banana Pro
  - 获取 3 个推荐提示词
  - 生成首帧图片（或用户已有）
    ↓
【步骤 2】Seedance 2.0 生成
  - 基于首帧图片 + Nano Banana Pro 提示词
  - 转换为视频提示词格式
  - 输出 3 个版本（基础/专业/创意）
    ↓
【步骤 3】用户确认
  - 用户选择版本
  - 提出修改意见
  - 迭代优化
    ↓
【步骤 4】最终输出
  - 复制即用提示词
  - 参数建议
```

### 关键词自动触发

| 关键词 | 触发条件 | 目的 |
|---------|----------|-----|
| 封面、缩略图 | 调用 Nano Banana Pro（poster/thumbnail） |
| 头像、人物介绍 | 调用 Nano Banana Pro（profile/avatar） |
| 产品照、产品展示 | 调用 Nano Banana Pro（product/commerce） |

## 技术规格

| 项目 | 规格 |
|-----|------|
| 模型 | Gemini 3.5 Flash Preview |
| 上下文 | 100 万 tokens |
| 速度 | 快速、低成本 |
| 视觉理解 | 强（支持图像分析） |

## 版本

- **v1.0.0** (2026-02-12)
- 初始发布版

## 作者

小鲸 & Claudian

---

从 [Nano Banana Pro Prompts Recommend](https://github.com/UMind-OpenLab/nano-banana-pro-prompts-recommend-skill) 获取首帧图片提示词，为 Seedance 2.0 视频生成提供高质量起点。
