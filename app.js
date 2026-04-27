// ══════════════════════════════════════════════
//  汤普臣 Listing 系统 · app.js
//  共享数据 via localStorage (演示版)
//  生产部署时替换为 API/Firebase/Supabase
// ══════════════════════════════════════════════

const STORAGE_CATS = 'tc_cats_v5';
const STORAGE_KW   = 'tc_kw_v5';
const STORAGE_LOG  = 'tc_log_v5';

// ── 初始关键词库 ───────────────────────────────
const INIT_CATS = {
  '童装 / 连衣裙 BZ23':{ line:'童装', en:'Girls Casual Dress', l1:['girls casual dress','girls summer dress','girls sleeveless dress','girls sundress','girls skater dress','toddler girls dress'], l2:['girls dress for birthday party','girls dress for Easter','girls twirl dress','girls a-line swing dress','girls bubble print dress','girls dress with pockets','machine washable girls dress','birthday gift dress for girl','back to school dress girls','girls dress for school picture day','girls dress size 8-10','girls dress size 10-12','girls dress for beach vacation'], l3:['girls cotton blend dress','girls pull on dress','toddler sundress 2t 3t 4t','girls dress size 6-7','girls dress size 12-14','kids summer outfit girls']},
  '童装 / 连体裤 ZD-P23':{ line:'童装', en:'Kids Onesie Pajamas', l1:['kids onesie pajamas','onesie pajamas for kids','boys onesie pajamas','kids one piece pajamas','kids zip up pajamas','kids fleece pajamas'], l2:['boys hooded onesie pajamas','fleece one piece pajamas for boys','boys onesie pajamas size 8-10','boys onesie pajamas size 10-12','big kids onesie pajamas','galaxy pajamas boys','space pajamas for kids','halloween pajamas kids','birthday gift boys pajamas','novelty one-piece pajamas boys'], l3:['onesie pjs for kids','pajama jumpsuit boys','novelty kids pajamas','onesies for 12 year olds']},
  '童装 / 卫裤 F93':{ line:'童装', en:'Kids Sweatpants', l1:['kids sweatpants','boys sweatpants','girls sweatpants','kids jogger sweatpants','boys joggers'], l2:['tie dye pants for kids','boys tie dye joggers','kids colorful sweatpants','boys neon pants glow party','kids athletic jogger pants','boys joggers size 10-12','kids 80s style neon joggers'], l3:['kids cotton joggers','youth athletic pants casual','active joggers kids']},
  '童装 / 网球裙 CZH15':{ line:'童装', en:'Girls Tennis Dress', l1:['girls tennis dress','girls long sleeve tennis dress','kids athletic dress','girls sports dress'], l2:['girls long sleeve pleated tennis dress','kids athletic polo dress quick dry','girls tennis dress for practice','girls tennis outfit for school team','girls pickleball dress athletic'], l3:['girls polo athletic dress','kids activewear dress sport']},
  '童装 / 卫衣裙 FZ27':{ line:'童装', en:'Girls Hoodie Dress', l1:['girls hoodie dress','kids long hoodie','girls long sweatshirt dress'], l2:['girls hoodie dress with pockets','fleece hoodie dress fall winter','oversized sweatshirt dress girls','back to school hoodie dress girls'], l3:['girls big sweatshirt long','girls casual dress hoodie style']},
  '童装 / 运动套装 CZH14':{ line:'童装', en:'Girls Tracksuit Set', l1:['girls tracksuit set','girls athletic set','girls zip hoodie set','kids jogger set'], l2:['girls hoodie and sweatpants set','girls zip tracksuit for school','girls fleece sweatsuit winter','girls dance training tracksuit'], l3:['youth track suit girls','girls lounge set fleece']},
  '童装 / 棒球服 FZ34':{ line:'童装', en:'Kids Varsity Baseball Jacket', l1:['kids varsity jacket','kids baseball jacket','youth varsity bomber','kids letterman jacket'], l2:['kids snap button baseball jacket school','boys girls letterman jacket rib knit collar','youth fleece bomber for back to school','kids varsity jacket birthday gift'], l3:['kids bomber jacket fleece inside','kids casual outerwear light jacket']},
  '童装 / 套头衫 FZ42':{ line:'童装', en:'Kids Pullover Sweatshirt', l1:['kids pullover sweatshirt','boys girls sweatshirt','kids warm pullover','youth crewneck sweatshirt'], l2:['kids warm pullover for school','kids cozy sweatshirt for winter','boys girls pullover birthday gift','kids sweatshirt graphic print'], l3:['youth casual sweatshirt soft','kids everyday pullover midweight']},
  '家居 / 楼梯贴':{ line:'家居', en:'Stair Riser Decals', l1:['stair riser decals','stair stickers','peel and stick stair riser decals','stair riser stickers'], l2:['removable stair riser decals','self adhesive stair riser decals','waterproof stair riser decals','renter friendly stair decals removable','stair riser decals 6 x 35 1/2'], l3:['stairway tread decoration','self-adhesive stair strips']},
  '家居 / 窗户贴':{ line:'家居', en:'Fake Window Wall Decal', l1:['fake window wall decal','window view wall decal','3d window wall sticker','fake window wall sticker'], l2:['window illusion wall decal bedroom','open window wall decal peel and stick','fake window wall mural living room','3d window decal removable rental'], l3:['window sticker fake view','peel stick window poster']},
  '家居 / 烫衣板罩 CZA31':{ line:'家居', en:'Ironing Board Cover', l1:['ironing board cover','ironing board cover and pad','replacement ironing board cover','ironing board pad'], l2:['heat resistant ironing board cover 15x54','thick padded ironing board cover','non slip ironing board cover','cotton ironing board cover machine washable'], l3:['ironing cover replacement fitted','garment care laundry accessories']},
  '家居 / 小烫衣板罩 BZT86':{ line:'家居', en:'Tabletop Ironing Board Cover', l1:['tabletop ironing board cover','small ironing board cover','mini ironing board cover','portable ironing board cover'], l2:['tabletop ironing board cover heat resistant','mini ironing board cover for dorm','portable ironing board cover rv travel'], l3:['folding ironing board cover small','mini ironing mat cover']},
  '家居 / 熨衣垫 BZT91':{ line:'家居', en:'Foldable Ironing Mat', l1:['ironing mat','foldable ironing mat','portable ironing mat','travel ironing mat'], l2:['foldable ironing mat heat resistant','portable ironing pad non slip','countertop ironing mat small space','washer dryer top ironing mat laundry room'], l3:['ironing pad countertop','laundry ironing mat']},
  '家居 / 门挂熨衣垫 BZT94':{ line:'家居', en:'Over Door Ironing Mat', l1:['over door ironing mat','hanging ironing mat','over the door ironing pad','space saving ironing mat'], l2:['over door ironing mat heat resistant','hanging ironing pad thick padded','space saving ironing mat for apartment'], l3:['vertical ironing mat door mounted','slim ironing mat over door']},
  '家居 / 门盖':{ line:'家居', en:'Door Cover Banner', l1:['door banner','door cover','front door banner','door wrap'], l2:['front door cover for entryway decor','door banner for seasonal decoration','fabric door cover grommets easy hang'], l3:['porch door cover panel','washable door wrap']},
  '家居 / 门贴':{ line:'家居', en:'Door Sticker', l1:['door stickers','peel and stick door sticker','door decals','self adhesive door decal'], l2:['peel and stick door wallpaper renter friendly','waterproof bathroom door sticker','nursery door mural peel and stick','holiday door sticker Christmas Halloween'], l3:['door wallpaper vinyl','interior door sticker matte gloss']},
  '家居 / 窗幔':{ line:'家居', en:'Window Valance', l1:['window valance','window valance curtain','window topper','window treatment valance'], l2:['kitchen window valance farmhouse','bathroom window valance rod pocket','bedroom window valance blackout'], l3:['box pleat valance gathered','cafe window treatment short']},
  '家居 / 静电窗户膜':{ line:'家居', en:'Static Cling Window Film', l1:['static cling window film','privacy window film','window cling film','non adhesive window film'], l2:['frosted privacy window film bathroom','removable static cling window film renter','uv blocking window film heat control'], l3:['window film non adhesive self cling','frosted glass window sticker']},
  '家居 / 水晶贴':{ line:'家居', en:'3D Crystal Sticker', l1:['transfer paper','transfer decal','3d crystal sticker','domed sticker','epoxy sticker'], l2:['3d raised crystal decal for tumbler','domed sticker for cup bottle','glossy epoxy decal diy craft'], l3:['adhesive transfer film decal','no heat transfer sticker diy']},
  '家居 / 横幅 Banner':{ line:'家居', en:'Party Backdrop Banner', l1:['backdrop banner','photo backdrop','party backdrop','banner backdrop'], l2:['party photo backdrop banner for birthday','photo booth backdrop for events','fabric backdrop for photography','reusable party backdrop indoor outdoor'], l3:['decorative wall banner tapestry','lightweight foldable backdrop']},
};

// ── DB ────────────────────────────────────────
let DB = { cats:{}, kwList:[], log:[] };
let opName = localStorage.getItem('tc_opname') || '运营';
let API_KEY = localStorage.getItem('tc_apikey') || '';
let uploadedImages = [];  // base64 list
let aiAnalysis = {};      // result from Claude API

function loadDB(){
  try {
    const c = localStorage.getItem(STORAGE_CATS);
    const k = localStorage.getItem(STORAGE_KW);
    const l = localStorage.getItem(STORAGE_LOG);
    DB.cats  = c ? JSON.parse(c) : JSON.parse(JSON.stringify(INIT_CATS));
    DB.kwList= k ? JSON.parse(k) : buildKwList(DB.cats);
    DB.log   = l ? JSON.parse(l) : [];
    if(!c){ saveDB(); }
  } catch(e){ DB.cats=JSON.parse(JSON.stringify(INIT_CATS)); DB.kwList=buildKwList(DB.cats); }
}
function saveDB(){
  localStorage.setItem(STORAGE_CATS, JSON.stringify(DB.cats));
  localStorage.setItem(STORAGE_KW,   JSON.stringify(DB.kwList));
  localStorage.setItem(STORAGE_LOG,  JSON.stringify(DB.log.slice(0,50)));
}
function buildKwList(cats){
  const list=[]; const pos={1:'Title / Bullet',2:'Bullet / Q&A',3:'Search Terms'}; const intent={1:'高购买意图',2:'中意图',3:'补充索引'};
  Object.entries(cats).forEach(([cat,d])=>{ [1,2,3].forEach(layer=>{ const key=['l1','l2','l3'][layer-1]; (d[key]||[]).forEach(word=>list.push({cat,word,layer,intent:intent[layer],pos:pos[layer]})); }); });
  return list;
}
function addLog(action,detail){ DB.log.unshift({time:new Date().toLocaleString('zh-CN',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}),op:opName,action,detail}); DB.log=DB.log.slice(0,50); saveDB(); }
function setSyncStatus(s,msg){ document.getElementById('sdot').className='sync-dot '+s; document.getElementById('slabel').textContent=msg; }
function showToast(msg,type='ok'){ const w=document.getElementById('toast-wrap'); const t=document.createElement('div'); t.className=`toast ${type}`; t.textContent=msg; w.appendChild(t); requestAnimationFrame(()=>{ requestAnimationFrame(()=>t.classList.add('show')); }); setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),400); },2800); }

// ── NAV ────────────────────────────────────────
function sw(name,btn){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.hnav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('p-'+name).classList.add('active');
  btn.classList.add('active');
  if(name==='kw'){ populateSelects(); renderKwTable(); updateKwMetrics(); }
  if(name==='log'){ renderLog(); }
  if(name==='ad'){ populateSelects(); }
}

// ── STEP FLOW ──────────────────────────────────
let currentStep = 1;
function goStep(n){
  currentStep=n;
  ['s1-card','s2-card','s3-card','s4-card'].forEach((id,i)=>{
    document.getElementById(id).style.display = (i+1===n)?'block':'none';
  });
  [1,2,3,4].forEach(i=>{
    const el=document.getElementById('step'+i);
    el.className='step'+(i===n?' active':i<n?' done':'');
  });
}

// ── IMAGE UPLOAD ───────────────────────────────
function handleDrop(ev){ ev.preventDefault(); document.getElementById('dropzone').classList.remove('drag'); handleFiles(ev.dataTransfer.files); }
function handleFiles(files){
  const arr = Array.from(files).slice(0, 5);
  const promises = arr.map(f=>new Promise(res=>{ const r=new FileReader(); r.onload=e=>res(e.target.result); r.readAsDataURL(f); }));
  Promise.all(promises).then(b64s=>{
    uploadedImages = [...uploadedImages, ...b64s].slice(0,5);
    renderPreviews();
    document.getElementById('step1-next').disabled = uploadedImages.length===0;
  });
}
function renderPreviews(){
  const wrap=document.getElementById('img-preview');
  wrap.innerHTML=uploadedImages.map((src,i)=>`
    <div class="img-thumb">
      <img src="${src}" alt="Product ${i+1}">
      <button class="del-btn" onclick="removeImg(${i})">×</button>
    </div>`).join('');
}
function removeImg(i){ uploadedImages.splice(i,1); renderPreviews(); document.getElementById('step1-next').disabled=uploadedImages.length===0; }

// ── POPULATE SELECTS ───────────────────────────
function populateSelects(){
  const cats=Object.keys(DB.cats).sort();
  ['p-cat','kf-cat','ak-cat','ad-cat'].forEach(id=>{
    const el=document.getElementById(id); if(!el) return;
    const isFilter=(id==='kf-cat'||id==='ad-cat');
    const cur=el.value;
    el.innerHTML=(isFilter?'<option value="">全部品类</option>':'<option value="">— 选择品类 —</option>')+
      cats.map(c=>`<option value="${c}">${c}</option>`).join('');
    if(cur) el.value=cur;
  });
}
function onParamChange(){
  const cat=document.getElementById('p-cat').value;
  if(!cat||!DB.cats[cat]) return;
}

// ── AI ANALYZE (calls Claude API) ─────────────
async function doAnalyze(){
  const cat=document.getElementById('p-cat').value;
  if(!cat){ showToast('请先选择品类','err'); return; }
  if(!uploadedImages.length){ showToast('请先上传产品图片','err'); return; }
  goStep(3);
  document.getElementById('ai-loading').classList.add('show');
  document.getElementById('ai-result-area').style.display='none';
  const loadingMsgs=['识别产品颜色与图案...','分析产品结构特征...','建立买家画像 (ISE)...','匹配关键词层级...'];
  let mi=0; const lt=setInterval(()=>{ document.getElementById('loading-sub').textContent=loadingMsgs[mi++ % loadingMsgs.length]; },1800);

  const catData=DB.cats[cat];
  const age=document.getElementById('p-age').value;
  const material=document.getElementById('p-material').value;
  const color=document.getElementById('p-color').value;
  const limit=document.getElementById('p-limit').value;
  const size=document.getElementById('p-size').value;
  const extra=document.getElementById('p-extra').value;
  const sceneOpts=Array.from(document.getElementById('p-scene').selectedOptions).map(o=>o.value);
  const market=document.getElementById('p-market').value;

  const systemPrompt = `You are a senior Amazon product analyst and ISE copywriting strategist. Analyze the product image with extreme precision across 8 dimensions, then build a multi-layered ISE buyer profile based on Amazon buyer psychology.

Return ONLY valid JSON, no markdown, no explanation. Be specific — vague answers produce bad copy.

{
  "product_type": "Exact product type in English (e.g. Girls Sleeveless A-line Skater Dress)",
  "silhouette": "Cut/silhouette (e.g. A-line flared, fitted, oversized, straight)",
  "neckline": "Neckline style (e.g. crew neck, v-neck, square neck, mock neck)",
  "sleeve": "Sleeve type (e.g. sleeveless, short sleeve, long sleeve, 3/4 sleeve)",
  "hem": "Hem style (e.g. high-low, straight, ruffled, asymmetric)",
  "print_pattern": "Exact pattern description (e.g. Colorful paint splash brush stroke print — pink teal blue yellow purple on white base)",
  "color_palette": "List main colors (e.g. hot pink, teal blue, sunshine yellow, lavender purple, white)",
  "style_vibe": "Style mood/vibe for search (e.g. artistic, bohemian, sporty, preppy, vintage, graphic)",
  "key_selling_points": ["specific feature 1","specific feature 2","specific feature 3","specific feature 4"],
  "title_keywords": ["top keyword phrase 1","top keyword phrase 2","top keyword phrase 3"],
  "ise_profiles": [
    {
      "priority": 1,
      "identity": "Specific buyer identity at purchase moment (e.g. A mom of a 6-year-old girl scrolling Amazon at 11pm before her daughter's birthday weekend)",
      "scene": "The exact purchase trigger moment — who they are, what just happened, where they are",
      "emotion_before": "Specific fears/doubts blocking purchase — be precise, not generic",
      "emotion_after": "Specific emotional rewards after purchase — child reaction + parent relief",
      "purchase_trigger": "The single sentence that would make this buyer click Add to Cart"
    },
    {
      "priority": 2,
      "identity": "Second buyer profile (e.g. An aunt looking for a birthday gift that will make her niece squeal)",
      "scene": "Their specific situation",
      "emotion_before": "Their specific fears",
      "emotion_after": "Their specific rewards",
      "purchase_trigger": "Their Add to Cart trigger"
    }
  ],
  "rufus_qa_hooks": ["high-probability Rufus question 1","question 2","question 3","question 4"],
  "l2_recommended": ["scene keyword 1","scene keyword 2","scene keyword 3","scene keyword 4","scene keyword 5"],
  "search_intent": "Primary search intent (e.g. gift occasion, everyday functional, trend/style)",
  "differentiation": "What makes this product visually stand out from competitors in 1 sentence"
}`;

  const userText = `Category: ${cat} (${catData.en})
${age ? 'Age range: '+age : 'Age: detect from image'}
${material ? 'Material (confirmed): '+material : 'Material: infer from image'}
${color ? 'Color/Pattern (user note): '+color : 'Color/Pattern: detect precisely from image'}
${sceneOpts.length ? 'Selected scenes: '+sceneOpts.join(', ') : ''}
${limit ? 'Usage restriction: '+limit : ''}
${size ? 'Size range: '+size : ''}
${extra ? 'Extra notes: '+extra : ''}
Target market: ${market}

Analyze the image carefully. Identify exact colors, print pattern, silhouette, construction details. Build ISE profiles based on what type of person would buy this specific product for what specific reason. Be precise and emotionally intelligent.`;

  const messages=[{role:'user',content:[
    ...uploadedImages.map(b64=>({type:'image',source:{type:'base64',media_type:'image/jpeg',data:b64.split(',')[1]}})),
    {type:'text',text:userText}
  ]}];

  try{
    const resp=await fetch('/api/claude',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':API_KEY},
      body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:systemPrompt,messages})
    });
    const data=await resp.json();
    clearInterval(lt);
    const raw=data.content?.[0]?.text||'{}';
    let parsed={};
    try{ parsed=JSON.parse(raw.replace(/```json|```/g,'').trim()); }catch(e){}
    aiAnalysis={...parsed, cat, catData, age, material, color:parsed.color||color, limit, size, extra, sceneOpts, market};
    renderAiResult();
    setSyncStatus('ok','AI 分析完成');
  } catch(err){
    clearInterval(lt);
    // fallback: generate from params without API
    aiAnalysis={
      product_type: catData.en,
      color: color||'See product images',
      style: 'Casual',
      key_features: ['Soft & breathable','Machine washable','True to size'],
      ise_identity: '希望为孩子挑选好看又实穿的服装的妈妈',
      ise_scene: '在手机上为即将到来的派对或日常穿着寻找合适的服装',
      ise_before: '担心尺码不准,担心面料刺激皮肤',
      ise_after: '孩子穿起来舒服好看,机洗方便省心',
      l2_recommended: catData.l2.slice(0,5),
      cat, catData, age, material, color, limit, size, extra, sceneOpts, market
    };
    renderAiResult();
    setSyncStatus('ok','(离线模式)');
  }

  document.getElementById('ai-loading').classList.remove('show');
  document.getElementById('ai-result-area').style.display='block';
}

function renderAiResult(){
  const a=aiAnalysis;
  const catData=a.catData;

  // ── Product dimension tags (6 dimensions)
  const dimTags=[
    a.product_type, a.silhouette, a.neckline, a.sleeve, a.hem,
    a.print_pattern, a.style_vibe,
    ...(a.key_selling_points||a.key_features||[]),
    a.color_palette||a.color||'', a.material||''
  ].filter(Boolean);
  document.getElementById('ai-tags').innerHTML=dimTags.map(t=>`<span class="ai-tag">${t}</span>`).join('');

  // ── ISE profiles (multi-profile support)
  const profiles = a.ise_profiles||[{
    priority:1,
    identity: a.ise_identity||'—',
    scene: a.ise_scene||'—',
    emotion_before: a.ise_before||'—',
    emotion_after: a.ise_after||'—',
    purchase_trigger: ''
  }];

  const profileColors = ['#C84B31','#1D4E89','#2D6A4F'];
  const profileBg = ['#FDF0ED','#EFF6FF','#ECFDF5'];
  const profileLabels = ['主要买家','次要买家','第三买家'];

  let iseHtml = profiles.map(function(p,i){
    var bg=profileBg[i]||'#F9F9F9';
    var col=profileColors[i]||'#888';
    var lbl=profileLabels[i]||('画像'+(i+1));
    var trigger=p.purchase_trigger?('<div style="margin-top:6px;padding:6px 10px;background:rgba(255,255,255,.7);border-radius:6px;font-style:italic;font-size:11px;color:'+col+'">'+p.purchase_trigger+'</div>'):'';
    return '<div style="background:'+bg+';border:0.5px solid '+col+'33;border-radius:8px;padding:10px 13px;margin-bottom:8px">'+
      '<div style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:'+col+';margin-bottom:7px">'+lbl+'</div>'+
      '<div style="font-size:12px;line-height:1.85;color:var(--color-text-secondary)">'+
      '<div><span style="font-weight:600;color:var(--color-text-primary)">身份 (I)</span>　'+(p.identity||'—')+'</div>'+
      '<div><span style="font-weight:600;color:var(--color-text-primary)">场景 (S)</span>　'+(p.scene||'—')+'</div>'+
      '<div><span style="font-weight:600;color:var(--color-text-primary)">购买前障碍</span>　'+(p.emotion_before||p.ise_before||'—')+'</div>'+
      '<div><span style="font-weight:600;color:var(--color-text-primary)">购买后回报</span>　'+(p.emotion_after||p.ise_after||'—')+'</div>'+
      trigger+
      '</div></div>';
  }).join('');

  // Add differentiation & search intent if present
  if(a.differentiation){
    iseHtml += `<div style="background:var(--color-background-secondary);border-radius:8px;padding:9px 12px;font-size:12px;color:var(--color-text-secondary);margin-top:4px">
      <span style="font-weight:600;color:var(--color-text-primary)">差异化优势</span>　${a.differentiation}
    </div>`;
  }
  if(a.rufus_qa_hooks&&a.rufus_qa_hooks.length){
    iseHtml += `<div style="margin-top:7px;font-size:11px;color:var(--color-text-tertiary)">
      <span style="font-weight:600">Rufus高频问题预判：</span> ${a.rufus_qa_hooks.join(' · ')}
    </div>`;
  }

  document.getElementById('ai-ise').innerHTML=iseHtml;

  // ── L1 keywords: merge catData + title_keywords from AI
  const aiTitleKw = a.title_keywords||[];
  const baseL1 = catData.l1||[];
  // Put AI-suggested title keywords first if not already in list
  const mergedL1 = [...new Set([...aiTitleKw,...baseL1])];
  document.getElementById('kw-l1').value=mergedL1.join('\n');

  // ── L3: all L3 from DB + enrich with silhouette/color/pattern terms
  const dbL3 = DB.kwList.filter(k=>k.cat===a.cat&&k.layer===3).map(k=>k.word);
  const extraL3 = [];
  if(a.silhouette) extraL3.push(a.silhouette.toLowerCase().split(' ')[0]+' dress');
  if(a.print_pattern) extraL3.push(a.print_pattern.toLowerCase().split(' ').slice(0,3).join(' '));
  if(a.color_palette) a.color_palette.split(',').forEach(c=>{ const t=c.trim().toLowerCase(); if(t&&t.length>2&&t.length<20) extraL3.push(t+' girls dress'); });
  const mergedL3 = [...new Set([...dbL3,...extraL3,...(catData.l3||[])])];
  document.getElementById('kw-l3').value=mergedL3.join(' ');

  // ── L2 chips: merge DB + AI recommended, auto-select AI picks
  const allL2 = [...new Set([
    ...DB.kwList.filter(k=>k.cat===a.cat&&k.layer===2).map(k=>k.word),
    ...(a.l2_recommended||[])
  ])];
  const recommended = new Set(a.l2_recommended||[]);
  document.getElementById('kw-l2-chips').innerHTML=allL2.map(w=>{
    // Smart auto-select: match by first 2 meaningful words
    const wTokens = w.toLowerCase().split(' ').filter(t=>t.length>2).slice(0,2);
    const sel = recommended.has(w) || [...recommended].some(r=>{
      const rTokens = r.toLowerCase().split(' ').filter(t=>t.length>2).slice(0,2);
      return rTokens.some(rt=>wTokens.includes(rt));
    });
    return `<div class="kw-chip${sel?' selected':''}" onclick="toggleChip(this)">
      <span class="layer-dot ld-2"></span>${w}</div>`;
  }).join('');
}

function toggleChip(el){ el.classList.toggle('selected'); }

// ── GENERATE LISTING ───────────────────────────
async function generateListing(){
  const a=aiAnalysis;
  if(!a.cat){ showToast('请先完成AI分析','err'); return; }
  const l2sel=Array.from(document.querySelectorAll('#kw-l2-chips .kw-chip.selected')).map(c=>c.textContent.trim());
  const l1raw=document.getElementById('kw-l1').value.trim();
  const l3raw=document.getElementById('kw-l3').value.trim();
  const l1=l1raw.split('\n').filter(Boolean);
  const sceneArr=a.sceneOpts&&a.sceneOpts.length?a.sceneOpts:['birthday party','everyday wear'];
  const material=a.material||a.catData.en;
  const color=a.color||'';
  const size=a.size||'multiple sizes';
  const limit=a.limit||'';

  goStep(4);
  document.getElementById('s4-card').style.display='block';

  // ═══ UPGRADED: ISE × A9 × COSMO × Rufus fully integrated system prompt ═══
  const systemPrompt=`You are a world-class Amazon Listing strategist who understands how A9/COSMO/Rufus algorithms work and how ISE buyer psychology drives conversions.

Your copy must:
1. Win the A9 algorithm: exact keyword match, L1 front-loaded, semantic field coverage
2. Win COSMO: cover buyer intent dimensions — who, why, when, how, what occasion
3. Win Rufus: every Q&A answers a real shopper question with verifiable specifics
4. Win the buyer: ISE emotional arc — meet them at their fear, walk them to relief

═══ PLATFORM ALGORITHM RULES ═══

A9 (Search Ranking):
→ Primary L1 keyword must appear in first 60 characters of Title
→ Each L2 scene keyword must appear ONCE across Title+Bullets (no repetition)
→ L3 synonyms ONLY in Search Terms — never front-end
→ Title 80–148 chars: [Primary KW] [print/color] [silhouette] – for [1 scene], [benefit/size]

COSMO (Semantic Knowledge Graph):
→ Cover all buyer intent signals: gift seeker, occasion dresser, practical parent, size-anxious shopper
→ Each bullet must cover a DIFFERENT intent dimension
→ Use natural language — COSMO understands semantic meaning, not just keywords
→ Include complementary product context naturally ("pairs with leggings", "layer with a cardigan")

Rufus (AI Shopping Assistant — highest Q&A weight):
→ Q&A is Rufus's primary data source — write for it first
→ Every answer must contain: specific number OR material name OR step-by-step OR size guidance
→ Pre-answer the 4 highest-probability Rufus questions in Bullets 1-4
→ Q&A must cover: what it's made of, sizing, washing, occasion fit, gift suitability, skin sensitivity, color durability, shape retention

ISE Emotional Architecture:
→ Bullet 1: Open with buyer IDENTITY at their purchase moment (not generic "for moms")
→ The specific fear/doubt that almost stopped them
→ How the product feature directly dissolves that fear (cause → effect)
→ The emotional reward they actually get (child's reaction + parent's relief)
→ Every section should move the reader from BEFORE state to AFTER state

═══ OUTPUT SPECIFICATIONS ═══

TITLE (80–148 chars):
Structure: [Top L1 KW] [print/pattern] [silhouette type] – for [1 L2 scene keyword], [core benefit] Sizes [range]
Example: "Girls Sleeveless Paint Splash Print Skater Dress – for Birthday Party, Twirl-Ready & Colorful Sizes 2T-10"
Rules: NO pipes, NO all-caps, ONE em-dash max, natural readable phrase

BULLET 1 — ISE Emotional Hook (30-45 words):
Open: "For [hyper-specific buyer identity at purchase moment]"
Arc: [specific fear] → [product feature that kills the fear] → [child reaction + parent payoff]
Example: "For the mom who promised her daughter the perfect birthday outfit but has 48 hours left — the tagless neckline and four-way stretch mean she'll wear it happily for 8 hours straight, and you'll get every spin on camera."

BULLET 2 — Design × Scene (25-40 words):
Lead with the product's most visual/unique feature
Connect it to a specific usage scene using an L2 keyword naturally
Make the reader SEE the child wearing it

BULLET 3 — FABRIC & FIT (mandatory format, 30-40 words):
"FABRIC & FIT: Crafted from [X]% [Fiber] / [Y]% [Fiber] — [specific stretch/comfort claim]. [Fit guidance]. [Size chart reference]."
Must include exact percentages. Must include sizing advice.

BULLET 4 — Occasion Painting (25-40 words):
Paint a sensory scene: WHERE + WHEN + WHO + HOW THE CHILD LOOKS
Use 2-3 specific occasions from the L2 list
End with an emotional image (spinning, running, laughing — something visual)

BULLET 5 — Care + Gifting (25-35 words):
"EASY CARE & GIFTING: Machine wash cold, tumble dry low — colors stay vivid after 30+ washes. [Restriction if any.] Ships gift-ready for [occasions]."

DESCRIPTION — HTML formatted, 5 sections (180-260 words total):
<b>WHO IT'S FOR</b><br>[2-3 sentences: specific identity, their moment, why this product is the answer]<br><br>
<b>FABRIC &amp; FIT</b><br>[Repeat fabric stats, expand on fit, sizing nuance, comfort claim]<br><br>
<b>CARE INSTRUCTIONS</b><br>[Step-by-step wash: temp, cycle, dry, ironing, expected durability]<br><br>
<b>GREAT FOR</b><br>[Specific occasions, list naturally — not bullet-within-bullet]<br><br>
<b>NOT RECOMMENDED FOR</b><br>[Honest limitation. Builds trust.]

Q&A — 12-15 pairs, Rufus-optimized:
Mandatory topics: fabric %, true-to-size, machine wash, birthday/occasion, gift, sensitive skin, color durability, shape after washing, drying time, size range, year-round wear, complementary styling
Each answer: specific + verifiable. Min 20 words per answer.

SEARCH TERMS — 230-249 bytes:
Start with size variants NOT in title: 2t 3t 4t 5 6 7 8 10 12 14
Add color synonyms (e.g. "hot pink" "teal" "aqua" "pastel")
Add pattern synonyms (e.g. "paint splatter" "brush stroke" "abstract print")
Add style synonyms (e.g. "flowy dress" "swing dress" "skater skirt dress")
Add occasion synonyms (e.g. "party outfit" "holiday dress" "spring dress")
ZERO overlap with Title. All lowercase. No punctuation.

Return ONLY valid JSON:
{"title":"...","bullets":["b1","b2","b3","b4","b5"],"description":"<b>WHO...</b><br>...","qa":[{"q":"...","a":"..."}],"search_terms":"..."}`;

  // Build rich ISE profile string from multi-profile analysis
  const iseProfiles = a.ise_profiles||[{
    priority:1, identity:a.ise_identity||'', scene:a.ise_scene||'',
    emotion_before:a.ise_before||'', emotion_after:a.ise_after||'',
    purchase_trigger:''
  }];
  const iseStr = iseProfiles.map((p,i)=>
    `[Profile ${i+1}] Identity: ${p.identity||p.ise_identity||''} | Scene: ${p.scene||p.ise_scene||''} | Fear: ${p.emotion_before||p.ise_before||''} | Reward: ${p.emotion_after||p.ise_after||''}`+
    (p.purchase_trigger?` | Trigger: "${p.purchase_trigger}"`:'')).join('\n');

  const userMsg=`═══ PRODUCT BRIEF ═══
Category: ${a.cat} (${a.catData.en})
Product type (from image analysis): ${a.product_type||a.catData.en}
Silhouette: ${a.silhouette||'see image'}
Neckline: ${a.neckline||'crew neck'}
Sleeve: ${a.sleeve||'sleeveless'}
Hem: ${a.hem||'straight'}
Print / Pattern: ${a.print_pattern||color||'see image'}
Color palette: ${a.color_palette||a.color||'see image'}
Style vibe: ${a.style_vibe||a.style||'casual'}
Material: ${material}
Size range: ${size}
Usage restriction: ${limit||'not for rough outdoor play'}
Differentiation: ${a.differentiation||''}
Extra: ${a.extra||''}

═══ KEYWORD STRATEGY ═══
L1 Core Keywords (top 1-2 in Title, at least 1 in each Bullet):
${l1.join('\n')}

L2 Scene Keywords (selected — weave naturally, each used ONCE across Title+Bullets):
${l2sel.join('\n')}

L3 Words for Search Terms ONLY (use all, add variants to hit 230-249 bytes):
${l3raw}

═══ ISE BUYER PROFILES ═══
${iseStr}

Rufus Q hooks: ${(a.rufus_qa_hooks||[]).join(' | ')}
Search intent: ${a.search_intent||'occasion + everyday'}

═══ ALGORITHM REMINDERS ═══
• Title: 80-148 chars, primary L1 KW first, print/pattern/silhouette in title, ONE em-dash
• Bullet 1: Open with hyper-specific buyer identity at their purchase moment
• Bullet 3: Exact fabric % MANDATORY (${material})
• Description: HTML <b>HEADING</b><br> format, 5 sections
• Q&A: 12-15 pairs, Rufus-priority topics, every answer has specific verifiable detail
• Search Terms: 230-249 bytes, ZERO title/bullet overlap, all lowercase`;

  let listing={title:'',bullets:[],description:'',qa:[],search_terms:''};
  let apiSuccess=false;

  if(API_KEY){
    try{
      showToast('AI 正在生成专业文案，约20秒...');
      const resp=await fetch('/api/claude',{
        method:'POST',
        headers:{'Content-Type':'application/json','x-api-key':API_KEY},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:4000,system:systemPrompt,messages:[{role:'user',content:userMsg}]})
      });
      const data=await resp.json();
      if(data.error){
        console.warn('Claude API error:',data.error);
      } else {
        const raw=(data.content&&data.content[0]&&data.content[0].text)||'{}';
        // Extract JSON even if wrapped in markdown
        const jsonMatch=raw.match(/\{[\s\S]*\}/);
        const cleaned=jsonMatch?jsonMatch[0]:raw;
        try{
          const parsed=JSON.parse(cleaned);
          // Validate parsed has required fields
          if(parsed.title&&parsed.bullets&&parsed.bullets.length>=5&&parsed.qa&&parsed.qa.length>=5){
            listing=parsed;
            apiSuccess=true;
          } else {
            console.warn('Parsed JSON missing required fields, using fallback');
          }
        }catch(parseErr){
          console.warn('JSON parse failed:',parseErr.message,'raw:',raw.slice(0,200));
        }
      }
    }catch(err){
      console.error('API fetch error:',err);
    }
  }

  if(!apiSuccess){
    // High-quality fallback template
    const pk=l1[0]||a.catData.en;
    const sc1=sceneArr[0]||'birthday party';
    const sc2=sceneArr[1]||'school days';
    const matShort=material.includes('%')?material:`95% Polyester / 5% Spandex`;
    const matFirst=material.split(/[,/]/)[0].trim()||'Polyester';
    const ident=a.ise_identity||'busy moms';
    const barrier=a.ise_before||'sizing uncertainty and fabric concerns';
    const reward=a.ise_after||'a daughter who loves her outfit and easy machine-wash care';

    const titleBase=`${pk} ${matFirst} – for ${sc1}, Soft & Comfortable${size&&size!=='multiple sizes'?' Sizes '+size:''}`;
    const title=titleBase.slice(0,148);

    const bullets=[
      `For ${ident} — no more ${barrier}. Tagless construction and smooth seams mean she wears it all day without a single complaint, and you get ${reward}.`,
      `${l2sel[0]?'Designed for '+l2sel[0]+' and everyday adventures':'Built for active girls who never stop moving'} — the relaxed A-line cut gives her full range of motion whether she's spinning, running, or sitting through a school day.`,
      `FABRIC & FIT: Crafted from ${matShort} — stretches with every move, snaps back without bagging. Runs true to size; if she's between sizes or has a longer torso, size up for the best fit.`,
      `Perfect for ${sceneArr.slice(0,3).join(', ')} and more. ${a.ise_scene?'Whether '+a.ise_scene+',':'From morning drop-off to evening celebrations,'} she looks put-together and you look like you planned it all along.`,
      `EASY CARE & GIFTING: Machine wash cold, tumble dry low — colors stay vivid and the fabric holds its shape after 30+ washes. ${limit?'Note: '+limit+'. ':''} Ships in gift-ready packaging, perfect for birthdays, Easter, and back-to-school.`
    ];

    const desc=`<b>WHO IT'S FOR</b><br>This ${a.catData.en.toLowerCase()} was made for ${ident} who want their daughter to look effortlessly put-together — without the morning battle. Soft enough for all-day wear, pretty enough for the party.<br><br><b>FABRIC &amp; FIT</b><br>Made from ${matShort}. The four-way stretch fabric moves with her, not against her. Runs true to size — if she's between sizes, size up for growing room. See the size chart image for exact measurements.<br><br><b>CARE INSTRUCTIONS</b><br>Machine wash cold on a gentle cycle. Tumble dry low. No ironing needed. Colors stay bright after 30+ washes — built to keep up with her lifestyle.<br><br><b>GREAT FOR</b><br>${sceneArr.join(' · ')}<br><br><b>NOT RECOMMENDED FOR</b><br>${limit||'Rough outdoor play or activities requiring heavy-duty performance wear.'}`;

    const qa=[
      {q:'What is it made of?',a:`${matShort}. The fabric is soft, breathable, and gentle against skin — specifically chosen for kids who are sensitive to rough textures.`},
      {q:'Does it run true to size?',a:'Yes, it runs true to size. If your daughter is between sizes or has a longer torso, we recommend sizing up for the best fit and growing room.'},
      {q:'Is it machine washable?',a:'Yes — machine wash cold on a gentle cycle and tumble dry low. Colors remain vivid and fabric holds its shape after 30+ washes. No ironing needed.'},
      {q:`Is it suitable for ${sc1}?`,a:`Absolutely. This is one of the most popular choices for ${sc1}. The design and fabric are both party-ready and comfortable enough for long events.`},
      {q:'Is this a good gift?',a:'Yes — it ships in gift-ready packaging, making it ideal for birthdays, Easter, and holiday gifts. Parents consistently mention it was a hit with both the child and the mom.'},
      {q:'Will the colors fade after washing?',a:'No — the fabric is colorfast through 30+ machine wash cycles. The dye process bonds to the fiber, so you won\'t see cracking, peeling, or significant fading with normal care.'},
      {q:'Is the fabric safe for kids with sensitive skin?',a:'Yes. The design is tagless with smooth, flat seams specifically to prevent irritation. The fabric is soft-touch polyester that doesn\'t scratch or pill.'},
      {q:'How long does it take to dry?',a:'Quick-drying fabric — tumble dry low and it\'s typically ready to wear within 30 minutes. No ironing needed.'},
      {q:`Can she wear it for ${sc2}?`,a:`Yes — the relaxed fit and breathable fabric make it comfortable for ${sc2} as well. It transitions easily from casual to dressed-up occasions.`},
      {q:'Does it hold its shape after multiple washes?',a:'Yes — the four-way stretch fabric snaps back to its original shape after washing. No bagging, no stretching out, no pilling with normal machine wash care.'},
      {q:'What sizes are available?',a:`${size||'Multiple sizes available'}. Please refer to the size chart image in the product photos for exact height, weight, and chest measurements to ensure the best fit.`},
      {q:'Can it be worn year-round?',a:`Lightweight and breathable for spring and summer. ${material.toLowerCase().includes('fleece')?'The fleece interior adds warmth for fall and winter.':'Layer it with a light jacket or cardigan for cooler days.'}`},
    ];

    // Build search terms — fill to 240+ bytes, NO overlap with title/bullets
    const titleWords=new Set(title.toLowerCase().split(/\s+/));
    const bulletText=bullets.join(' ').toLowerCase();
    const usedWords=new Set([...titleWords]);
    bulletText.split(/\s+/).forEach(w=>usedWords.add(w.replace(/[^a-z0-9]/g,'')));

    const l3words=l3raw.split(/\s+/).filter(w=>w&&!usedWords.has(w.toLowerCase()));
    const extraTerms=['sundress','casual dress','summer outfit','toddler dress','girls skirt','flowy dress','knee length','sleeveless top','girls clothing','kids fashion','party outfit','school dress','holiday dress','twirl skirt','colorful dress','printed dress'];
    const filtered=extraTerms.filter(t=>!t.split(' ').some(w=>usedWords.has(w)));
    const allTerms=[...l3words,...filtered];
    let st='';
    for(const t of allTerms){
      if((st+' '+t).trim().length<=248) st=(st+' '+t).trim();
      else break;
    }
    if(st.length<180){
      const sizeVars=['2t','3t','4t','5','6','7','8','10','12','xs','sm','md','lg','xl'];
      for(const sv of sizeVars){
        if((st+' '+sv).length<=248) st=(st+' '+sv).trim();
      }
    }

    listing={title,bullets,description:desc,qa,search_terms:st};
  }

  // ── Render output ──
  const titleOut=listing.title||'';

  // Strip any accidental Chinese from title/bullets/search_terms
  const stripChinese=s=>(s||'').replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g,'').replace(/\s{2,}/g,' ').trim();

  const cleanTitle=stripChinese(titleOut).slice(0,150);
  document.getElementById('o-title').textContent=cleanTitle;
  document.getElementById('title-chars').textContent=cleanTitle.length+'/150字符';

  const cleanBullets=(listing.bullets||[]).map((b,i)=>`• B${i+1}: ${stripChinese(b)}`).join('\n\n');
  document.getElementById('o-bullets').textContent=cleanBullets;

  // Description: render as HTML
  const descEl=document.getElementById('o-desc');
  const rawDesc=listing.description||'';
  descEl.innerHTML='';
  descEl.style.whiteSpace='normal';
  const descDiv=document.createElement('div');
  descDiv.innerHTML=stripChinese(rawDesc).replace(/&amp;/g,'&');
  descEl.appendChild(descDiv);

  // Add copy button back
  const descCp=document.createElement('button');
  descCp.className='copy-btn';descCp.textContent='复制';descCp.style.cssText='position:absolute;top:7px;right:7px';
  descCp.onclick=()=>{ navigator.clipboard.writeText(descDiv.innerText).then(()=>{descCp.textContent='已复制';setTimeout(()=>descCp.textContent='复制',1500);}); };
  descEl.style.position='relative';
  descEl.appendChild(descCp);

  const qaArr=listing.qa||[];
  document.getElementById('qa-count').textContent=qaArr.length+'条';
  document.getElementById('o-qa').textContent=qaArr.map((item,i)=>`${i+1}. Q: ${stripChinese(item.q)}\n   A: ${stripChinese(item.a)}`).join('\n\n');

  // Search terms — verify no overlap with title
  const titleTokens=new Set(cleanTitle.toLowerCase().split(/\s+/).map(w=>w.replace(/[^a-z0-9]/g,'')).filter(Boolean));
  const rawST=stripChinese(listing.search_terms||'');
  const stWords=rawST.split(/\s+/).filter(w=>w&&!titleTokens.has(w.toLowerCase()));
  let stFinal=stWords.join(' ').slice(0,249);
  document.getElementById('o-st').textContent=stFinal;
  document.getElementById('st-chars').textContent=stFinal.length+'/249字节';

  window._lastListing={title:cleanTitle,bullets:listing.bullets,description:descDiv.innerText,qa:qaArr,search_terms:stFinal};

  // SOP Checklist
  const bulletStr=cleanBullets.toLowerCase();
  const hasFabricPct=/\d+\s*%/.test(bulletStr);
  const hasLimit=bulletStr.includes('not for')||bulletStr.includes('not recommended')||(limit&&limit.length>3);
  const titleLen=cleanTitle.length;
  const hasChinese=/[\u4e00-\u9fff]/.test(cleanTitle+cleanBullets);
  const stOverlap=stFinal.split(' ').some(w=>w&&titleTokens.has(w));

  const checks=[
    {pass:titleLen>=60&&titleLen<=150,text:`标题长度 60-150字符（当前${titleLen}字符）`},
    {pass:!hasChinese,text:'文案无中文字符'},
    {pass:qaArr.length>=10,text:`Q&A ≥ 10条（当前${qaArr.length}条）`},
    {pass:hasFabricPct,text:'Bullet 3 含面料成分百分比'},
    {pass:hasLimit,text:'Bullet 5 含「不适合」说明'},
    {pass:stFinal.length>=180,text:`Search Terms 180-249字节（当前${stFinal.length}字节）`},
    {pass:!stOverlap,text:'Search Terms 与标题无重复词'},
    {pass:l2sel.length>=2,text:`L2 场景词已勾选 ≥ 2条（当前${l2sel.length}条）`},
  ];
  document.getElementById('checklist').innerHTML=checks.map(c=>
    `<div class="check-item"><div class="check-icon ${c.pass?'ci-ok':'ci-no'}">${c.pass?'✓':'!'}</div>
    <div style="font-size:12px;color:${c.pass?'var(--txt2)':'var(--acc)'}">${c.text}</div></div>`
  ).join('');

  addLog('生成文案',`[${a.cat}] ${cleanTitle.slice(0,40)}...`);
  setSyncStatus('ok','已同步');
  showToast(apiSuccess?'✅ AI文案生成完成，请核查后上线':'⚠️ 使用模板生成（未配置API Key）');
}

// ── COPY ──────────────────────────────────────
function cpBlock(id){
  const txt=document.getElementById(id).textContent.trim();
  navigator.clipboard.writeText(txt).then(()=>showToast('已复制到剪贴板'));
}
function copyAll(){
  const parts=['o-title','o-bullets','o-desc','o-qa','o-st'];
  const txt=parts.map(id=>{
    const labels={'o-title':'=== TITLE ===','o-bullets':'=== BULLET POINTS ===','o-desc':'=== DESCRIPTION ===','o-qa':'=== Q&A ===','o-st':'=== SEARCH TERMS ==='};
    return labels[id]+'\n'+document.getElementById(id).textContent.trim();
  }).join('\n\n');
  navigator.clipboard.writeText(txt).then(()=>showToast('全部内容已复制'));
}
function openClaude(ev){
  ev.preventDefault();
  const listing=window._lastListing;
  if(!listing){showToast('请先生成文案','err');return;}
  const prompt=`请根据A9+COSMO+Rufus+ISE框架，优化以下Amazon Listing文案，保持结构不变，只改语言表达更自然流畅：\n\nTitle:\n${listing.title}\n\nBullet Points:\n${(listing.bullets||[]).map((b,i)=>`${i+1}. ${b}`).join('\n')}\n\nDescription:\n${listing.description}\n\nQ&A:\n${(listing.qa||[]).map((q,i)=>`${i+1}. Q: ${q.q}\nA: ${q.a}`).join('\n\n')}`;
  navigator.clipboard.writeText(prompt).then(()=>{ showToast('已复制优化提示词，请粘贴到Claude对话框'); window.open('https://claude.ai','_blank'); });
}

// ── KW TABLE ─────────────────────────────────
function renderKwTable(){
  const catF=document.getElementById('kf-cat')?.value||'';
  const layF=document.getElementById('kf-layer')?.value||'';
  const search=(document.getElementById('kf-search')?.value||'').toLowerCase();
  let list=DB.kwList;
  if(catF) list=list.filter(k=>k.cat===catF);
  if(layF) list=list.filter(k=>String(k.layer)===layF);
  if(search) list=list.filter(k=>k.word.toLowerCase().includes(search)||k.cat.toLowerCase().includes(search));
  const posMap={1:'Title / Bullet',2:'Bullet / Q&A',3:'Search Terms'};
  document.getElementById('kw-tbody').innerHTML=list.slice(0,400).map(k=>`<tr>
    <td style="word-break:break-all">${k.word}</td>
    <td style="font-size:11px;color:var(--text3)">${k.cat}</td>
    <td><span class="badge badge-l${k.layer}">L${k.layer}</span></td>
    <td style="font-size:11px">${posMap[k.layer]||''}</td>
    <td style="font-size:11px">${k.intent||''}</td>
    <td><button class="btn btn-ghost btn-sm" onclick="deleteKw('${k.word.replace(/'/g,"\\'")}','${k.cat.replace(/'/g,"\\'")}')">删除</button></td>
  </tr>`).join('')||'<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text3)">无匹配数据</td></tr>';
  document.getElementById('kw-count').textContent=`显示 ${Math.min(list.length,400)} / ${list.length} 条`;
}
function updateKwMetrics(){
  document.getElementById('mc-cats').textContent=Object.keys(DB.cats).length;
  document.getElementById('mc-l1').textContent=DB.kwList.filter(k=>k.layer===1).length;
  document.getElementById('mc-l2').textContent=DB.kwList.filter(k=>k.layer===2).length;
  document.getElementById('mc-l3').textContent=DB.kwList.filter(k=>k.layer===3).length;
}
function deleteKw(word,cat){
  DB.kwList=DB.kwList.filter(k=>!(k.word===word&&k.cat===cat));
  if(DB.cats[cat]){['l1','l2','l3'].forEach(l=>{if(DB.cats[cat][l])DB.cats[cat][l]=DB.cats[cat][l].filter(w=>w!==word);});}
  saveDB(); addLog('删除关键词',`[${cat}] ${word}`); renderKwTable(); updateKwMetrics(); showToast('已删除：'+word);
}
function addKeyword(){
  const cat=document.getElementById('ak-cat').value;
  const word=document.getElementById('ak-word').value.trim().toLowerCase();
  const layer=parseInt(document.getElementById('ak-layer').value);
  const intent=document.getElementById('ak-intent').value;
  if(!cat||!word){showToast('请填写品类和关键词','err');return;}
  if(DB.kwList.find(k=>k.word===word&&k.cat===cat)){showToast('该关键词已存在','err');return;}
  const pos={1:'Title / Bullet',2:'Bullet / Q&A',3:'Search Terms'};
  DB.kwList.push({cat,word,layer,intent,pos:pos[layer]});
  const lkey=['l1','l2','l3'][layer-1];
  if(DB.cats[cat]&&!DB.cats[cat][lkey].includes(word)) DB.cats[cat][lkey].push(word);
  saveDB(); addLog('新增关键词',`[${cat}] L${layer}: ${word}`);
  document.getElementById('ak-word').value='';
  renderKwTable(); updateKwMetrics(); showToast(`已添加：${word} → L${layer}`);
}
function addCategory(){
  const cn=document.getElementById('nc-cn').value.trim();
  const en=document.getElementById('nc-en').value.trim();
  const line=document.getElementById('nc-line').value;
  const l1raw=document.getElementById('nc-l1').value.trim();
  if(!cn||!en){showToast('请填写品类中英文名','err');return;}
  const l1words=l1raw?l1raw.split('\n').map(w=>w.trim()).filter(Boolean):[];
  const catKey=`${line} / ${cn}`;
  if(DB.cats[catKey]){showToast('品类已存在','err');return;}
  DB.cats[catKey]={line,en,l1:l1words,l2:[],l3:[]};
  l1words.forEach(w=>DB.kwList.push({cat:catKey,word:w,layer:1,intent:'高购买意图',pos:'Title / Bullet'}));
  saveDB(); populateSelects(); renderKwTable(); updateKwMetrics();
  addLog('新增品类',`${catKey} (${en}) L1词${l1words.length}条`);
  ['nc-cn','nc-en','nc-l1'].forEach(id=>document.getElementById(id).value='');
  showToast(`已创建品类：${catKey}`);
}

// ── AD ANALYSIS ───────────────────────────────
let _adRows=[];
function analyzeAd(){
  const raw=document.getElementById('ad-input').value.trim();
  if(!raw){showToast('请粘贴广告数据','err');return;}
  const adCat=document.getElementById('ad-cat').value;
  const rows=raw.split('\n').map(r=>r.split(/\t|,/).map(c=>c.trim())).filter(r=>r.length>=4&&r[0]);
  if(!rows.length){showToast('数据格式有误','err');return;}
  _adRows=rows.map(r=>{
    const word=r[0].toLowerCase(), clicks=parseInt(r[1])||0, orders=parseInt(r[2])||0, spend=parseFloat(r[3])||0, sales=parseFloat(r[4])||0;
    const acos=orders>0&&sales>0?Math.round(spend/sales*100):null;
    const cvr=clicks>0?parseFloat((orders/clicks*100).toFixed(1)):0;
    const existing=DB.kwList.find(k=>k.word===word||(adCat&&k.cat===adCat&&k.word===word));
    const curLayer=existing?existing.layer:null;
    let action='观察',code='watch',badge='badge-watch';
    if(acos!==null&&acos<25&&orders>=5){action='升层/强化';code='up';badge='badge-up';}
    else if(acos!==null&&acos>60&&cvr<0.3){action='降至L3';code='down';badge='badge-watch';}
    else if(clicks>=20&&orders===0){action='加否定词/暂停';code='pause';badge='badge-pause';}
    else if(!existing&&orders>=2){action='新词收录→L3';code='new';badge='badge-new';}
    return {word,clicks,orders,acos,cvr,curLayer,action,code,badge,spend,sales,existing,adCat};
  });
  const totalSpend=_adRows.reduce((s,r)=>s+r.spend,0), totalSales=_adRows.reduce((s,r)=>s+r.sales,0);
  const avgAcos=totalSales>0?Math.round(totalSpend/totalSales*100):0;
  const upC=_adRows.filter(r=>r.code==='up').length, pauseC=_adRows.filter(r=>r.code==='pause').length;
  document.getElementById('ad-metrics').innerHTML=`
    <div class="metric-card"><div class="metric-val">${_adRows.length}</div><div class="metric-lab">分析词数</div></div>
    <div class="metric-card"><div class="metric-val">${avgAcos}%</div><div class="metric-lab">均ACOS</div></div>
    <div class="metric-card"><div class="metric-val" style="color:var(--green)">${upC}</div><div class="metric-lab">建议升层</div></div>
    <div class="metric-card"><div class="metric-val" style="color:var(--l1)">${pauseC}</div><div class="metric-lab">建议暂停</div></div>`;
  document.getElementById('ad-tbody').innerHTML=_adRows.map(r=>`<tr>
    <td style="word-break:break-all;font-size:11px">${r.word}</td>
    <td>${r.clicks}</td><td>${r.orders}</td>
    <td>${r.acos!==null?r.acos+'%':'—'}</td>
    <td>${r.cvr}%</td>
    <td>${r.curLayer?`<span class="badge badge-l${r.curLayer}">L${r.curLayer}</span>`:'<span style="font-size:11px;color:var(--text3)">未收录</span>'}</td>
    <td><span class="badge ${r.badge}">${r.action}</span></td>
  </tr>`).join('');
  const upW=_adRows.filter(r=>r.code==='up').map(r=>r.word), pauseW=_adRows.filter(r=>r.code==='pause').map(r=>r.word), newW=_adRows.filter(r=>r.code==='new').map(r=>r.word);
  document.getElementById('ad-summary').innerHTML=`
    <div class="card-title" style="font-size:11px">本周优化摘要</div>
    <div style="font-size:12px;color:var(--text2);line-height:2">
    ${upW.length?`<strong>升层（${upW.length}条）：</strong>${upW.join(' / ')}<br>`:''}
    ${pauseW.length?`<strong>暂停（${pauseW.length}条）：</strong>${pauseW.join(' / ')}<br>`:''}
    ${newW.length?`<strong>新词（${newW.length}条）：</strong>${newW.join(' / ')}<br>`:''}
    ${!upW.length&&!pauseW.length&&!newW.length?'本周数据表现正常，无需调整。':''}
    </div>`;
  document.getElementById('ad-results').style.display='block';
}
function applyAd(){
  if(!_adRows.length){showToast('请先分析数据','err');return;}
  const adCat=document.getElementById('ad-cat').value;
  let count=0;
  _adRows.forEach(r=>{
    if(r.code==='up'){const k=DB.kwList.find(kw=>kw.word===r.word);if(k&&k.layer>1){k.layer=Math.max(1,k.layer-1);count++;}}
    else if(r.code==='down'){const k=DB.kwList.find(kw=>kw.word===r.word);if(k&&k.layer<3){k.layer=3;count++;}}
    else if(r.code==='pause'){const before=DB.kwList.length;DB.kwList=DB.kwList.filter(k=>k.word!==r.word);if(DB.kwList.length<before)count++;}
    else if(r.code==='new'&&adCat){
      if(!DB.kwList.find(k=>k.word===r.word&&k.cat===adCat)){
        DB.kwList.push({cat:adCat,word:r.word,layer:3,intent:'中意图',pos:'Search Terms'});
        if(DB.cats[adCat]&&!DB.cats[adCat].l3.includes(r.word))DB.cats[adCat].l3.push(r.word);
        count++;
      }
    }
  });
  saveDB(); addLog('广告数据更新',`应用${count}条建议，操作者：${opName}`);
  updateKwMetrics(); showToast(`已应用 ${count} 条建议，关键词库已更新`);
}

// ── LOG ───────────────────────────────────────
function renderLog(){
  const el=document.getElementById('log-list');
  if(!el)return;
  el.innerHTML=DB.log.length?DB.log.map(l=>
    `<div class="log-item"><span class="log-time">${l.time}</span><span class="log-op">${l.op}</span><span class="log-detail">${l.action}：${l.detail}</span></div>`
  ).join(''):'<div style="text-align:center;padding:32px;color:var(--text3)">暂无操作日志</div>';
}
function saveName(){
  opName=document.getElementById('op-name').value.trim()||'运营';
  localStorage.setItem('tc_opname',opName);
  showToast('已保存姓名：'+opName);
}

// ── API KEY MANAGEMENT ─────────────────────
function saveApiKey() {
  const v = (document.getElementById('api-key-input')||{value:''}).value.trim();
  if (!v) { showToast('请粘贴 API Key','err'); return; }
  if (!v.startsWith('sk-ant')) { showToast('格式不对，Key 应以 sk-ant 开头','err'); return; }
  API_KEY = v;
  localStorage.setItem('tc_apikey', v);
  const banner = document.getElementById('api-top-banner');
  if (banner) banner.style.display = 'none';
  updateApiStatus();
  setSyncStatus('ok', 'API 已配置');
  showToast('✅ API Key 保存成功，工具已就绪！');
}
function saveApiKeyFromLog() {
  const el = document.getElementById('api-key-log-input');
  if (el) { el.value && (document.getElementById('api-key-input') || {value:''}).value === '' && (()=>{})(); }
  const v = (el||{value:''}).value.trim();
  if (!v && !API_KEY) { showToast('请填写 API Key','err'); return; }
  if (v) {
    if (!v.startsWith('sk-ant')) { showToast('格式不对，Key 应以 sk-ant 开头','err'); return; }
    API_KEY = v;
    localStorage.setItem('tc_apikey', v);
  }
  const banner = document.getElementById('api-top-banner');
  if (banner) banner.style.display = 'none';
  updateApiStatus();
  setSyncStatus('ok', 'API 已配置');
  showToast('✅ API Key 保存成功！');
}
function clearApiKey() {
  API_KEY = '';
  localStorage.removeItem('tc_apikey');
  const banner = document.getElementById('api-top-banner');
  if (banner) banner.style.display = 'flex';
  updateApiStatus();
  setSyncStatus('busy', '未配置 API');
  showToast('已清除 API Key');
}
function updateApiStatus() {
  const dot = document.getElementById('api-status-dot');
  const txt = document.getElementById('api-status-txt');
  const banner = document.getElementById('api-top-banner');
  if (dot) dot.style.background = API_KEY ? '#6ee7b7' : '#FCA5A5';
  if (txt) txt.textContent = API_KEY ? '已配置 (' + API_KEY.slice(0,14) + '...)' : '未配置';
  if (banner) banner.style.display = API_KEY ? 'none' : 'flex';
}

// ── INIT ─────────────────────────────────────
loadDB();
populateSelects();
updateKwMetrics();
const sn=localStorage.getItem('tc_opname');
if(sn){opName=sn;const el=document.getElementById('op-name');if(el)el.value=sn;}
setSyncStatus('ok','本地模式就绪');
updateApiStatus();
// Show API banner if no key
if (!API_KEY) {
  const b = document.getElementById('api-top-banner');
  if (b) b.style.display = 'flex';
}
