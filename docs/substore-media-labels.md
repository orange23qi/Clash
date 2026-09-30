# Sub-Store 流媒体标签

NAS 使用 Sub-Store Node.js、HTTP META，以及 `scripts/substore-media-check.js`。
部署脚本位于容器 `/opt/app/data/media-check.js`，作为现有 GPT 检测之后的脚本操作运行：

```text
/opt/app/data/media-check.js#cache=true&concurrency=3&timeout=12000
```

- `[YTP]`：YouTube Premium 页面实际渲染数据包含可用优惠，地区识别为 `HK`。
- `[NF]`：Netflix 两部非自制影片（`81280792`、`70143836`）至少一部返回对应的观看介绍页，且未出现已知限制提示。
- 检测范围沿用原 YouTube/Netflix 的香港候选池，排除 Game、游戏、IPLC 节点。
- 全部节点保留；未通过、超时、无法解析的节点不加标签。
- 多标签示例：`[GPT] [YTP] [NF] 香港节点`。GPT 标记始终位于最前，媒体标记不含地区简称，避免误匹配现有 ChatGPT 新加坡筛选。

这是免登录页面预检，不能保证账号的 Premium 订阅资格、Netflix 任意影片播放或实际播放流畅度。

## 自动选择

Shadowrocket 的 `rule.conf`、Stash 的 `config.yaml` 和 `rule.ini` 中，YouTube-Smart 只筛选 `[YTP]` 香港候选，Netflix-Smart 只筛选 `[NF]` 香港候选。
三组每 600 秒测速，公差 100 ms。ChatGPT-Smart 只包含带 `[GPT]` 标记的新加坡节点；Shadowrocket 的 Intelligence 只交给这个子组，Stash 的父组也可手动选择这些已验证节点。YouTube/Netflix 主组保留默认 Smart 组及手动 Global 选项。

NAS 沿用三条每小时错峰处理任务；GPT 和媒体检测各自缓存 50 分钟。
Gist 产物每小时整点同步。客户端更新订阅后才能获取新标签；缓存到期时拉取可能等待一次重新检测。
DisneyPlus 规则、组及 Stash 提供器已注释。

## 修改及验证

更新仓库脚本后，需同步到 NAS 的上述容器挂载路径；仅推送 Git 不会更新 NAS 脚本。
部署前备份 Sub-Store 的 `sub-store.json` 和 `root.json`；通过后端 API 更新处理器，避免直接改写运行中的配置文件。
回滚时移除新增媒体脚本操作，恢复客户端 Smart 组的原筛选规则，再同步 Gist。

```sh
node --check scripts/substore-media-check.js
node scripts/substore-media-check.test.js
```
