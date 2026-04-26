// =======================================================
// 映射：你的文件名 => GitHub 原始规则地址
// =======================================================
const RULE_MAP = {
  // 基础规则
  "LocalAreaNetwork.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list",
  "UnBan.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/UnBan.list",

  // 广告过滤
  "BanAD.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list",
  "BanProgramAD.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list",
  "BanEasyList.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyList.list",
  "BanEasyListChina.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyListChina.list",

  // 国内增强
  "ChinaMedia.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/ChinaMedia.list",

  // AI 工具
  // "OpenAi.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/OpenAi.list",
  // "Gemini.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Gemini.list",
  // "Claude.list": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.list",
  // "Anthropic.list": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/ruleset/Anthropic.list",
  "AI.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/AI.list",

  // Apple Intelligence
  "AppleIntelligence.list": "https://raw.githubusercontent.com/xpdigital/Apple-Rule/refs/heads/main/Apple-US.list",

  // 支付 / 购物
  "PayPal.list": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PayPal/PayPal.list",
  "Amazon.list": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Amazon/Amazon.list",

  // 科技网站
  "Github.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Github.list",
  "Google.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Google.list",
  "GoogleFCM.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/GoogleFCM.list",
  "GoogleOneVPN.list": "https://raw.githubusercontent.com/orange23qi/Clash/main/ruleset/GoogleOneVPN.list",

  // 社交
  "Telegram.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Telegram.list",
  "Instagram.list": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Instagram/Instagram.list",
  "WhatsApp.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Ruleset/Whatsapp.list",
  "Reddit.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Reddit.list",
  "LinkedIn.list": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/LinkedIn/LinkedIn.list",
  "TikTok.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/TikTok.list",

  // Apple & Apple TV
  "Apple.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Apple.list",
  "AppleTV.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/AppleTV.list",
  "MyAppleTV.list": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/ruleset/AppleTV.list",
  "AppleFitness.list": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/ruleset/AppleFitness.list",

  // 流媒体
  "YouTube.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list",
  "DisneyPlus.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/DisneyPlus.list",
  "Netflix.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Netflix.list",

  // 港澳台媒体
  "BilibiliHMT.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/BilibiliHMT.list",

  // 动漫
  "Mikan.list": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/ruleset/Mikanani.list",
  
  // VPN
  "Hitun.list": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/ruleset/Hitun.list",

  // 游戏
  "PokemonTCGP.list": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/ruleset/PokemonTCGP.list",
  "PokemonGO.list": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/ruleset/PokemonGO.list",
  "Nintendo.list": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Nintendo/Nintendo.list",
  "Sony.list": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Sony/Sony.list",
  "PlayStation.list": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PlayStation/PlayStation.list",
  "Steam.list": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Steam/Steam.list",

  // 大陆
  "ChinaDomain.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list",
  "ChinaCompanyIp.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaCompanyIp.list",

  // GFW 增强
  "ProxyGFWlist.list": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list",

  // Clash Base Config
  "GeneralClashConfig.yml": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/GeneralClashConfig.yml",

  // Stash Rule
  "stash_rule.ini": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/stash/rule.ini",
  "stash_work_rule.ini": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/stash/work_rule.ini",

  // Shardowrocket Rule
  "shardowrocket_rule.conf": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/shadowrocket/rule.conf",
  "shardowrocket_local_rule.conf": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/shadowrocket/local_rule.conf",
  "shardowrocket_itools.conf": "https://raw.githubusercontent.com/orange23qi/Clash/refs/heads/main/shadowrocket/itools.conf"
};

// =======================================================
// 同步所有规则到 R2
// =======================================================
async function syncAll(env) {
  for (const [filename, sourceUrl] of Object.entries(RULE_MAP)) {
    try {
      const res = await fetch(sourceUrl, { cf: { cacheTtl: 0 } });
      if (!res.ok) {
        console.log(`Fetch failed: ${sourceUrl} -> ${res.status}`);
        continue;
      }

      const content = await res.text();
      await env.RULES_BUCKET.put(filename, content, {
        httpMetadata: { contentType: "text/plain; charset=utf-8" },
      });

      console.log(`Updated: ${filename}`);
    } catch (e) {
      console.log(`Error updating ${filename}: ${e}`);
    }
  }
}

// =======================================================
// Worker 入口（文件访问 + 手工同步）
// =======================================================
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 手工触发同步
    if (url.pathname === "/__sync") {
      await syncAll(env);
      return new Response("Manual sync completed.", {
        status: 200,
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    // 访问规则文件
    const key = url.pathname.replace(/^\/+/, "") || "index.txt";
    const object = await env.RULES_BUCKET.get(key);

    if (!object) {
      return new Response("Not found", { status: 404 });
    }

    const headers = new Headers(object.httpMetadata);
    if (!headers.get("content-type")) {
      headers.set("content-type", "text/plain; charset=utf-8");
    }

    return new Response(object.body, { headers });
  },

  // 定时任务（Cron）
  async scheduled(event, env, ctx) {
    ctx.waitUntil(syncAll(env));
  }
};
