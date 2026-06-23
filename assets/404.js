(function(){
  var cv=document.getElementById('flow'),ctx=cv.getContext('2d');
  var w,h,dpr,t=0;
  function resize(){dpr=Math.min(devicePixelRatio||1,2);w=cv.clientWidth;h=cv.clientHeight;cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
  resize();addEventListener('resize',resize);
  var layers=[
    {col:[136,146,189],base:0.58,amp:30,len:0.0015,sp:0.00020,fill:0.10,line:0.16},
    {col:[66,95,188],  base:0.70,amp:42,len:0.0011,sp:-0.00016,fill:0.10,line:0.16},
    {col:[5,153,118],  base:0.80,amp:36,len:0.0018,sp:0.00024,fill:0.13,line:0.26},
    {col:[5,153,118],  base:0.92,amp:54,len:0.0009,sp:-0.00013,fill:0.16,line:0.30}
  ];
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  function draw(){
    t+=16;ctx.clearRect(0,0,w,h);
    layers.forEach(function(L,i){
      var baseY=h*L.base,pts=[];
      for(var x=0;x<=w;x+=10){var y=baseY+Math.sin(x*L.len+t*L.sp+i)*L.amp+Math.sin(x*L.len*2.4-t*L.sp*1.7+i)*L.amp*0.38;pts.push([x,y]);}
      ctx.beginPath();ctx.moveTo(0,h);pts.forEach(function(p){ctx.lineTo(p[0],p[1]);});ctx.lineTo(w,h);ctx.closePath();
      var g=ctx.createLinearGradient(0,baseY-L.amp,0,h);
      g.addColorStop(0,'rgba('+L.col[0]+','+L.col[1]+','+L.col[2]+','+L.fill+')');
      g.addColorStop(1,'rgba('+L.col[0]+','+L.col[1]+','+L.col[2]+','+(L.fill*0.18)+')');
      ctx.fillStyle=g;ctx.fill();
      ctx.beginPath();pts.forEach(function(p,k){k?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);});
      ctx.strokeStyle='rgba('+L.col[0]+','+L.col[1]+','+L.col[2]+','+L.line+')';ctx.lineWidth=1.6;ctx.stroke();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
