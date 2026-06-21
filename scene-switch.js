// scene-switch.js — 场景切换逻辑（v1.9 新增）
// 依赖：index.html 中的全局变量和函数

function setScene(scene){
  if(scene!=='build' && scene!=='probe') return;
  currentScene=scene;

  // 更新场景按钮高亮
  var btnBuild=document.getElementById('btn-scene-build');
  var btnProbe=document.getElementById('btn-scene-probe');
  if(btnBuild){
    btnBuild.style.background=scene==='build'?'#238636':'transparent';
    btnBuild.style.color=scene==='build'?'#fff':'#8b949e';
  }
  if(btnProbe){
    btnProbe.style.background=scene==='probe'?'#58a6ff':'transparent';
    btnProbe.style.color=scene==='probe'?'#fff':'#8b949e';
  }

  if(scene==='build'){
    // 进入搭建场景：显示搭建按钮组，隐藏探伤按钮组+UI
    var topModes=document.getElementById('top-modes');
    if(topModes) topModes.style.display='flex';
    var probeModes=document.getElementById('probe-modes');
    if(probeModes) probeModes.style.display='none';
    hideProbeHTML();

    // 重置探伤专用状态
    probeDemoState=0;
    probeStartTime=0;
    probeProblemNodes=[];

    // 重置所有节点 status 为初始值 + 清空 quality
    nodes.forEach(function(n){
      var t=taskById(n.id);
      if(t) t.status='waiting';
      if(t && t.quality){
        t.quality={coupling:0,nestingDepth:0,linesOfCode:0,hasCircularDep:false};
      }
    });

    setMode('auto');
    console.log('[Fusang] 🔨 进入搭建场景');
  } else {
    // 进入探伤场景：显示探伤按钮组，隐藏搭建按钮组
    var topModes=document.getElementById('top-modes');
    if(topModes) topModes.style.display='none';
    var probeModes=document.getElementById('probe-modes');
    if(probeModes) probeModes.style.display='flex';

    // 重置搭建专用状态
    demoState=-1;
    demoLitSet={};
    demoDimOverlay=false;

    // 启动探伤演示
    setProbeMode('demo');
    console.log('[Fusang] 🔬 进入探伤场景');
  }
}

function setProbeMode(subMode){
  // 探伤子模式：demo/debug/upload
  probeDemoState=(subMode==='demo')?0:-1;
  probeStartTime=performance.now();

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
