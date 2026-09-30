// NAS Sub-Store Node.js + HTTP META media precheck. No account cookies or tokens.
// Only existing Hong Kong pool candidates are checked. GPT marker stays first.
function youtubeInitialData(body) {
  const match=/\bytInitialData\s*=\s*/.exec(body);
  if(!match)return null;
  const start=match.index+match[0].length;
  let depth=0,inString=false,escaped=false;
  for(let i=start;i<body.length;i++){
    const c=body[i];
    if(inString){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')inString=false;continue;}
    if(c==='"'){inString=true;continue;}
    if(c==='{')depth++;
    else if(c==='}'&&--depth===0){try{return JSON.parse(body.slice(start,i+1))}catch{return null;}}
  }
  return null;
}
function classifyYouTube(res) {
  const body=String(res.body??res.rawBody??'');
  const region=(body.match(/"INNERTUBE_CONTEXT_GL"\s*:\s*"([A-Z]{2})"/)||[])[1];
  const status=Number(res.status??res.statusCode);
  // Inspect the rendered offer data, not shared JavaScript strings/captcha libraries.
  const data=youtubeInitialData(body);
  const rendered=data?JSON.stringify(data):'';
  return {ok:status===200 && !!region && region!=='CN' && /ad-free/i.test(rendered) && !/Premium is not available in your country|unusual traffic|verify you are human/i.test(rendered),region:region||null,status,initialData:!!data};
}
function classifyNetflix(res,id) {
  const body=String(res.body??res.rawBody??'');
  const status=Number(res.status??res.statusCode);
  const watchTitle=/<meta\b[^>]*property=["']og:title["'][^>]*content=["']Watch\s/i.test(body) || /<meta\b[^>]*content=["']Watch\s[^>]*property=["']og:title["']/i.test(body);
  const titlePresent=body.includes(String(id));
  const blocked=/Oh no!|Sorry for the interruption|proxy or unblocker/i.test(body);
  return {ok:status===200&&watchTitle&&titlePresent&&!blocked,status,watchTitle,titlePresent,blocked};
}
async function operator(proxies=[],targetPlatform,context) {
  const $=$substore;
  const cacheEnabled=$arguments.cache!==false && $arguments.cache!=='false';
  const ttl=50*60*1000;
  const timeout=Number($arguments.timeout||12000);
  const concurrency=Number($arguments.concurrency||3);
  const diagnostic=$arguments.diagnostic===true||$arguments.diagnostic==='true';
  const sampleLimit=Number($arguments.sample_limit||0);
  const hongkong=/(港|HK|Hong Kong|HongKong)/i;
  const mediaTags=/\[(?:YTP(?:-[A-Z]{2})?|NF)\]\s*/g;
  const entries=[];
  for(let i=0;i<proxies.length;i++){
    const proxy=proxies[i];proxy.name=proxy.name.replace(mediaTags,'');
    delete proxy._ytp;delete proxy._ytp_region;delete proxy._nf;delete proxy._media_diag;
    if(!hongkong.test(proxy.name)||/(Game|游戏|IPLC)/i.test(proxy.name))continue;
    if(sampleLimit&&entries.length>=sampleLimit)continue;
    try {
      const node=ProxyUtils.produce([{...proxy}],'ClashMeta','internal')?.[0];
      if(!node)continue;
      const identity=Object.fromEntries(Object.entries(node).filter(([key])=>!/^(name|collectionName|subName|id|_.*)$/i.test(key)));
      const key='http-meta:media:hk-premium-v1:'+JSON.stringify(identity);
      const cached=cacheEnabled?scriptResourceCache.get(key):null;
      if(cached){apply(proxy,cached);continue;}
      entries.push({proxy,node,key});
    }catch{}
  }
  if(!entries.length)return proxies;
  let pid;
  const meta='http://127.0.0.1:9876';
  try {
    const started=await $.http.post({url:meta+'/start',timeout:15000,headers:{'Content-Type':'application/json'},body:JSON.stringify({proxies:entries.map(e=>e.node),timeout:3000+entries.length*timeout*3})});
    const response=typeof started.body==='string'?JSON.parse(started.body):started.body;
    pid=response.pid;const ports=response.ports;
    if(!pid||!Array.isArray(ports)||ports.length!==entries.length)throw new Error('HTTP META start failed');
    await $.wait(3000);
    let next=0;
    await Promise.all(Array.from({length:Math.min(concurrency,entries.length)},async()=>{
      while(next<entries.length){
        const i=next++;const entry=entries[i];
        const request=async url=>{
          try{return await $.http.get({url,proxy:'http://127.0.0.1:'+ports[i],timeout,headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','Accept-Language':'en-US,en;q=0.9'}})}catch{return {status:0,body:''}}
        };
        const [yt,nf1,nf2]=await Promise.all([request('https://www.youtube.com/premium?hl=en'),request('https://www.netflix.com/title/81280792'),request('https://www.netflix.com/title/70143836')]);
        const y=classifyYouTube(yt),n1=classifyNetflix(nf1,81280792),n2=classifyNetflix(nf2,70143836);
        const result={ytp:y.ok&&y.region==='HK',ytpRegion:y.region,nf:n1.ok||n2.ok};
        if(diagnostic)result.diagnostic={youtube:y,netflix1:n1,netflix2:n2};
        if(cacheEnabled)scriptResourceCache.set(entry.key,result,ttl);
        apply(entry.proxy,result);
      }
    }));
    $.info('MEDIA_PRECHECK '+JSON.stringify({checked:entries.length,ytp:entries.filter(e=>e.proxy._ytp).length,netflix:entries.filter(e=>e.proxy._nf).length}));
  }finally {
    if(pid){try{await $.http.post({url:meta+'/stop',timeout:15000,headers:{'Content-Type':'application/json'},body:JSON.stringify({pid:[pid]})})}catch{$.info('MEDIA_PRECHECK cleanup failed; HTTP META timeout will reclaim core')}}
  }
  return proxies;
  function apply(proxy,result){
    const labels=[];if(result.ytp&&result.ytpRegion)labels.push('[YTP]');if(result.nf)labels.push('[NF]');
    const gpt=proxy.name.match(/^\[GPT\]\s*/);const name=proxy.name.replace(/^\[GPT\]\s*/,'');
    proxy.name=(gpt?'[GPT] ':'')+(labels.length?labels.join(' ')+' ':'')+name;
    proxy._ytp=!!result.ytp;proxy._ytp_region=result.ytpRegion;proxy._nf=!!result.nf;if(diagnostic)proxy._media_diag=result.diagnostic;
  }
}
