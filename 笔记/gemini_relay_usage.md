# Gemini Cloud Run 中转使用说明

> 本文档用于记录 **Gemini / Imagen Cloud Run 中转服务** 的必要信息，
> 方便在 **其他电脑 / 其他环境** 快速接入使用。
>
> ⚠️ 本文档 **会同步到 GitHub**，已刻意避免写入任何敏感信息。

---

## 一、整体架构说明（先理解这个）

当前 AI 能力的实际架构是：

```
任意电脑 / IDE / 脚本
        │ HTTPS
        ▼
Cloud Run 中转服务（我自己的）
        │ 内网 / 原生
        ▼
Vertex AI
  ├─ Gemini 3.1 Pro（文本 / 推理）
  └─ Imagen（图片生成）
```

这样做的好处：

- ✅ 不依赖本地网络 / 代理 / TUN
- ✅ 不需要本地 Google 凭证
- ✅ 所有电脑统一一个 API
- ✅ 模型可随时在云端升级或替换

---

## 二、基础接入信息（通用）

### 1️⃣ API Base URL

```text
https://<YOUR_CLOUD_RUN_DOMAIN>/v1
```

> 实际域名以当前部署的 Cloud Run 为准

---

### 2️⃣ 鉴权方式（非常重要）

统一使用 **API Key + Bearer Token**：

```http
Authorization: Bearer <YOUR_API_KEY>
```

⚠️ 注意：
- API Key **不要写进 GitHub**
- 推荐通过：
  - 环境变量
  - 本地配置文件（不提交）

---

## 三、文本模型接入（Gemini 3.1 Pro）

### ✅ 能力说明

- 主模型：**Gemini 3.1 Pro Preview**
- 适合：
  - 长上下文
  - 代码仓库分析
  - 推理 / 架构设计

---

### ✅ 接口地址

```http
POST /v1/chat/completions
```

完整地址示例：

```text
https://<YOUR_CLOUD_RUN_DOMAIN>/v1/chat/completions
```

---

### ✅ 请求示例（curl）

```bash
curl https://<YOUR_CLOUD_RUN_DOMAIN>/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -d '{
    "messages": [
      {"role": "user", "content": "用一句话解释这个项目的作用"}
    ]
  }'
```

---

### ✅ OpenAI SDK（Python / OpenCode 通用）

```python
from openai import OpenAI

client = OpenAI(
    api_key="<YOUR_API_KEY>",
    base_url="https://<YOUR_CLOUD_RUN_DOMAIN>/v1"
)

resp = client.chat.completions.create(
    model="anything",  # 模型名不会被实际使用
    messages=[
        {"role": "user", "content": "分析这个代码仓库"}
    ],
)

print(resp.choices[0].message.content)
```

> 说明：
> - 中转层不关心 model 字段
> - 实际模型由云端统一控制

---

## 四、图片模型接入（Imagen）

### ✅ 能力说明

- 模型：**Imagen（Vertex AI）**
- 用途：
  - UI 图
  - 产品示意图
  - 插画 / 概念图

---

### ✅ 接口地址

```http
POST /v1/images/generations
```

完整地址示例：

```text
https://<YOUR_CLOUD_RUN_DOMAIN>/v1/images/generations
```

---

### ✅ 请求示例（curl）

```bash
curl https://<YOUR_CLOUD_RUN_DOMAIN>/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -d '{
    "prompt": "A modern SaaS dashboard UI, clean design",
    "n": 1
  }'
```

返回结果：

```json
{
  "data": [
    {
      "b64_json": "<base64 image>"
    }
  ]
}
```

需要自行将 `b64_json` 解码成图片文件。

---

## 五、其他电脑接入时的最小清单

在新电脑 / 新环境，只需要：

1. ✅ 能访问 HTTPS
2. ✅ 拿到 **Cloud Run Base URL**
3. ✅ 拿到 **API Key**
4. ✅ 任意支持 OpenAI 协议的 SDK 或工具

❌ 不需要：
- Google Cloud SDK
- Vertex AI SDK
- 本地凭证
- 代理 / TUN

---

## 六、敏感信息管理建议（重要）

✅ **推荐做法**：

- API Key 放在：
  - `.env`
  - 系统环境变量
  - 本地配置文件（gitignore）

❌ **不要做的事**：

- 不要写入 GitHub
- 不要硬编码在代码里
- 不要发到聊天工具

---

## 七、维护说明（给未来的自己）

- ✅ 模型升级：只需要改 Cloud Run 后端
- ✅ API 不变，所有客户端无感
- ✅ 成本 / 限流 / 日志都在云端统一处理

这套中转的目标不是“临时能用”，而是：

> **成为长期稳定的 AI 基础设施**
