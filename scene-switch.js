// scene-switch.js — 场景切换逻辑（v1.9 新增）
// 依赖：index.html 中的全局变量和函数
// 统一右上角 Bar：#top-bar
//   状态A（none）：显示 [🔨 搭建 | 🔬 探伤]
//   状态B（build）：显示  搭建 [🎬 演示 | 🎮 调试 | 🔌 接入]
//   状态C（probe）：显示  探伤 [🎬 演示 | 🎮 调试 | 📂 上传]

function setScene(scene){
  // 校验
  if(scene!=='none' && scene!=='build' && scene!=='probe') return;
  currentScene=scene;

  // 先隐藏所有按钮
  var ids=[
    'btn-scene-build','btn-scene-probe',       // 状态A
    'btn-build-switch','btn-build-auto','btn-build-interactive','btn-build-real', // 状态B
    'btn-probe-switch','btn-probe-demo','btn-probe-debug','btn-probe-upload'  // 状态C
  ];
  ids.forEach(function(id){
    var el=document.getElementById(id);
    if(el) el.style.display='none';
  });

  if(scene==='none'){
    // ===== 状态A：未进入场景 =====
    var bBuild=document.getElementById('btn-scene-build');
    var bProbe=document.getElementById('btn-scene-probe');
    if(bBuild) bBuild.style.display='inline-block';
    if(bProbe) bProbe.style.display='inline-block';
    hideProbeHTML();
    console.log('[Fusang] 返回初始页');
    return;
  }

  if(scene==='build'){
    // ===== 状态B：搭建场景 =====
    var sw=document.getElementById('btn-build-switch');
    if(sw) sw.style.display='inline-block';
    ['btn-build-auto','btn-build-interactive','btn-build-real'].forEach(function(id){
      var b=document.getElementById(id);
      if(b) b.style.display='inline-block';
    });
    hideProbeHTML();

    // 重置探伤专用状态
    if(typeof probeDemoState!=='undefined') probeDemoState=0;
    if(typeof probeStartTime!=='undefined') probeStartTime=0;
    if(typeof probeProblemNodes!=='undefined') probeProblemNodes=[];
    if(typeof probeUploadedFiles!=='undefined') probeUploadedFiles=[];
    if(typeof probeScanned!=='undefined') probeScanned=false;

    // 重置所有节点 status 为 waiting + 清空 quality
    if(typeof nodes!=='undefined' && typeof taskById==='function'){
      nodes.forEach(function(n){
        var t=taskById(n.id);
        if(t){
          t.status='waiting';
          if(t.quality){
            t.quality={coupling:0,nestingDepth:0,linesOfCode:0,hasCircularDep:false};
          }
        }
      });
    }

    // 重置搭建演示状态
    if(typeof demoState!=='undefined') demoState=-1;
    if(typeof demoLitSet!=='undefined') demoLitSet={};
    if(typeof demoDimOverlay!=='undefined') demoDimOverlay=false;

    setMode('auto');
    console.log('[Fusang] 🔨 进入搭建场景');
    return;
  }

  if(scene==='probe'){
    // ===== 状态C：探伤场景 =====
    var sw=document.getElementById('btn-probe-switch');
    if(sw) sw.style.display='inline-block';
    ['btn-probe-demo','btn-probe-debug','btn-probe-upload'].forEach(function(id){
      var b=document.getElementById(id);
      if(b) b.style.display='inline-block';
    });

    // 重置搭建专用状态
    if(typeof demoState!=='undefined') demoState=-1;
    if(typeof demoLitSet!=='undefined') demoLitSet={};
    if(typeof demoDimOverlay!=='undefined') demoDimOverlay=false;
    if(typeof livePanel!=='undefined'){ livePanel.open=false; }

    setProbeMode('demo');
    console.log('[Fusang] 🔬 进入探伤场景');
  }
}

function setProbeMode(subMode){
  // 探伤子模式：demo/debug/upload
  if(typeof probeDemoState!=='undefined'){
    probeDemoState=(subMode==='demo')?0:-1;
  }
  if(typeof probeStartTime!=='undefined') probeStartTime=performance.now();

  // 更新按钮高亮
  ['btn-probe-demo','btn-probe-debug','btn-probe-upload'].forEach(function(id){
    var btn=document.getElementById(id);
    if(btn){
      var isActive=id==='btn-probe-'+subMode;
      btn.style.background=isActive?'#58a6ff':'transparent';
      btn.style.color=isActive?'#fff':'#8b949e';
    }
  });

  if(subMode==='demo') showProbeHTML();
  console.log('[Fusang] 🔬 探伤子模式: '+subMode);
}

// 页面加载后初始化：默认进入「none」状态（显示场景切换按钮）
// currentScene 初始值设为 'none'
if(typeof currentScene==='undefined') var currentScene='none';
setScene('none');
