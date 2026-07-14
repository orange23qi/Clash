# GoogleVPN 自动回退设计

## 目标

优化 `stash/work_rule.ini` 中 AI 流量的代理选择：正常情况下优先使用 GoogleVPN；当 GoogleVPN 组内所有节点均不可用时自动切换到 `DIRECT`；节点恢复后自动切回 GoogleVPN。

## 配置结构

- 保留 `📲 GoogleVPN` 为 `url-test` 组，继续在名称匹配 `GoogleVPN|PixelVPN` 的节点中自动选择延迟较低的可用节点。
- 将 `💬 Intelligence` 从手动 `select` 组改为自动 `fallback` 组，候选顺序固定为 `📲 GoogleVPN`、`DIRECT`。
- 删除无实际用途的 `🖐️ Manual` 候选。
- 保留当前探测地址 `http://www.gstatic.com/generate_204` 和 300 秒检查间隔。

## 流量行为

`AI.list` 和 `AppleIntelligence.list` 继续进入 `💬 Intelligence`：

1. GoogleVPN 至少有一个节点可用时，由 `📲 GoogleVPN` 自动选优并承载流量。
2. GoogleVPN 所有节点均不可用时，`💬 Intelligence` 回退到 `DIRECT`。
3. GoogleVPN 恢复可用后，`fallback` 按候选优先级自动切回 `📲 GoogleVPN`。

其他流量不受影响，继续由 `FINAL -> DIRECT` 处理。

## 验证

- 检查 `Manual` 不再被引用。
- 检查 `💬 Intelligence` 的候选顺序为 GoogleVPN 在前、DIRECT 在后。
- 检查 GoogleVPN 仍为 `url-test`，避免 DIRECT 因低延迟抢占代理。
- 运行文本结构检查和 `git diff --check`，确认配置格式及补丁无异常。
