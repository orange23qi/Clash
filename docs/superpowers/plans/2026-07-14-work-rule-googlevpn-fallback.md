# GoogleVPN Automatic Fallback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make AI traffic prefer the latency-selected GoogleVPN group, automatically fall back to `DIRECT` when every GoogleVPN node is unavailable, and return to GoogleVPN after recovery.

**Architecture:** Keep `📲 GoogleVPN` as the existing `url-test` group so it continues selecting a healthy low-latency VPN node. Change the upstream `💬 Intelligence` policy to a prioritized `fallback` group containing `📲 GoogleVPN` first and `DIRECT` second.

**Tech Stack:** Stash custom proxy-group configuration, subconverter INI syntax, shell/awk structural checks, Git.

## Global Constraints

- Modify only `stash/work_rule.ini` for runtime behavior.
- Keep `AI.list` and `AppleIntelligence.list` routed to `💬 Intelligence`.
- Keep all unmatched traffic routed by `FINAL -> DIRECT`.
- Keep `📲 GoogleVPN` as `url-test` using `http://www.gstatic.com/generate_204`, interval `300`, and tolerance `50`.
- Do not add external automation or new proxy groups.
- Preserve unrelated existing user changes.

---

### Task 1: Convert Intelligence to automatic GoogleVPN-first fallback

**Files:**
- Modify: `stash/work_rule.ini:7`
- Test: inline shell structural checks against `stash/work_rule.ini`

**Interfaces:**
- Consumes: the existing `📲 GoogleVPN` group and built-in `DIRECT` policy.
- Produces: a `💬 Intelligence` fallback group ordered as `📲 GoogleVPN`, then `DIRECT`.

- [ ] **Step 1: Run the pre-change structural check**

Run:

```bash
awk '
  /custom_proxy_group=💬 Intelligence`fallback`\[\]📲 GoogleVPN`\[\]DIRECT`http:\/\/www\.gstatic\.com\/generate_204`300,,50/ { fallback_ok=1 }
  /🖐️ Manual/ { manual_found=1 }
  END { exit (fallback_ok && !manual_found) ? 0 : 1 }
' stash/work_rule.ini
```

Expected: exit status `1`, because `💬 Intelligence` is still a `select` group and still references `🖐️ Manual`.

- [ ] **Step 2: Apply the minimal configuration change**

Replace the current `💬 Intelligence` proxy-group line with exactly:

```ini
custom_proxy_group=💬 Intelligence`fallback`[]📲 GoogleVPN`[]DIRECT`http://www.gstatic.com/generate_204`300,,50
```

Do not change the existing `📲 GoogleVPN` `url-test` line, rule-set mappings, or `FINAL -> DIRECT` rule.

- [ ] **Step 3: Run the post-change structural check**

Run:

```bash
awk '
  /custom_proxy_group=📲 GoogleVPN`url-test`\(GoogleVPN\|PixelVPN\)`http:\/\/www\.gstatic\.com\/generate_204`300,,50/ { google_url_test=1 }
  /custom_proxy_group=💬 Intelligence`fallback`\[\]📲 GoogleVPN`\[\]DIRECT`http:\/\/www\.gstatic\.com\/generate_204`300,,50/ { fallback_ok=1 }
  /ruleset=DIRECT,\[\]FINAL/ { final_direct=1 }
  /🖐️ Manual/ { manual_found=1 }
  END { exit (google_url_test && fallback_ok && final_direct && !manual_found) ? 0 : 1 }
' stash/work_rule.ini
```

Expected: exit status `0` with no output.

- [ ] **Step 4: Review the focused diff and formatting**

Run:

```bash
git diff --check
git diff -- stash/work_rule.ini
```

Expected: `git diff --check` emits no output. The focused diff removes the obsolete Manual path and changes `💬 Intelligence` from `select` to GoogleVPN-first `fallback`; no rule-set or unrelated proxy-group lines change.

- [ ] **Step 5: Commit the runtime configuration separately if requested**

```bash
git add stash/work_rule.ini
git commit -m "Enable GoogleVPN automatic direct fallback"
```

Expected: the commit contains only `stash/work_rule.ini`.
