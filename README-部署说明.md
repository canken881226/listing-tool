# 汤普臣 Listing 工具 — OpenAI 低成本版部署说明

## 你需要上传/替换的文件
- `index.html`
- `api/claude.js`
- `api/openai.js` 可选备用入口
- `vercel.json`

## Vercel 环境变量
在 Vercel 项目后台设置：

```bash
OPENAI_API_KEY=你的 OpenAI API Key
OPENAI_MODEL_ANALYZE=gpt-5.4-mini
OPENAI_MODEL_WRITE=gpt-5.4-mini
```

说明：
- 工具仍保留 `/api/claude` 路径，是为了不大改前端调用。
- 实际后端已经改成 OpenAI Responses API。
- API Key 不再放浏览器 localStorage，安全性更好。

## 成本控制逻辑
- 图片识别/产品画像：默认 `OPENAI_MODEL_ANALYZE`
- Listing生成/批量生成：默认 `OPENAI_MODEL_WRITE`
- 两个模型都可以用 mini，先压成本；以后需要更强文案时再把 WRITE 升级。
