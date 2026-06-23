const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>20));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3*70)+'ms';io.observe(el)});
document.querySelectorAll('[data-count]').forEach(el=>{
  const t=+el.dataset.count;let done=false;
  new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!done){done=true;let n=0;(function s(){n+=Math.ceil(t/34);if(n>=t){el.textContent=t+'+';return}el.textContent=n;requestAnimationFrame(s)})()}})).observe(el);
});
document.querySelectorAll('.card').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(800px) rotateX(${py*-5}deg) rotateY(${px*6}deg) translateY(-4px)`});
  card.addEventListener('pointerleave',()=>card.style.transform='');
});
/* Portfolio filtering */
(function(){
  const chips=document.querySelectorAll('.filt');
  const tiles=document.querySelectorAll('.pgrid .tile');
  if(!chips.length)return;
  chips.forEach(chip=>chip.addEventListener('click',()=>{
    const f=chip.dataset.filter;
    chips.forEach(c=>{const on=c===chip;c.classList.toggle('active',on);c.setAttribute('aria-pressed',String(on))});
    tiles.forEach(t=>{
      const show=f==='all'||t.dataset.cat.split(' ').includes(f);
      t.classList.toggle('hide',!show);
    });
  }));
})();

/* Before/after compare sliders */
document.querySelectorAll('.ba-range').forEach(function(r){
  var ba=r.closest('.ba');
  function upd(){ba.style.setProperty('--pos',r.value+'%');}
  r.addEventListener('input',upd); upd();
});
/* Deck carousel dot indicators */
document.querySelectorAll('.deck').forEach(function(deck){
  var track=deck.querySelector('.deck-track');
  var dots=[].slice.call(deck.querySelectorAll('.deck-dots b'));
  if(!track||!dots.length)return;
  track.addEventListener('scroll',function(){
    var i=Math.round(track.scrollLeft/track.clientWidth);
    dots.forEach(function(d,k){d.classList.toggle('on',k===i);});
  },{passive:true});
});

/* Email-marketing slideshow */
document.querySelectorAll('.frame.slides').forEach(function(box){
  var slides=[].slice.call(box.querySelectorAll('.slide2'));
  var dots=[].slice.call(box.querySelectorAll('.sl-dot'));
  if(slides.length<2)return;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var i=0,timer=null;
  function go(n){slides[i].classList.remove('on');if(dots[i])dots[i].classList.remove('on');i=n;slides[i].classList.add('on');if(dots[i])dots[i].classList.add('on');}
  function start(){timer=setInterval(function(){go((i+1)%slides.length);},2600);}
  function stop(){clearInterval(timer);}
  start();
  box.addEventListener('mouseenter',stop);
  box.addEventListener('mouseleave',start);
});

document.getElementById('burger').addEventListener('click',function(){
  const nl=document.querySelector('.nav-mid');const open=nl.style.display==='flex';
  if(open)nl.style.display='';
  else nl.style.cssText='display:flex;position:absolute;top:74px;left:0;right:0;flex-direction:column;background:#fff;padding:24px 28px;gap:18px;border-bottom:1px solid var(--line)';
  this.setAttribute('aria-expanded',String(!open));
});

/* =========================================================
   WAVE SWELLS: layered translucent, shaded ocean currents.
   Visible (not thin scribbles), still light & calm.
   ========================================================= */
(function(){
  const cv=document.getElementById('flow'),ctx=cv.getContext('2d');
  let w,h,dpr,t=0;
  function resize(){dpr=Math.min(devicePixelRatio||1,2);w=cv.clientWidth;h=cv.clientHeight;cv.width=w*dpr;cv.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
  resize();addEventListener('resize',resize);
  // back-to-front layers: deep slate/blue -> bright teal crest
  const layers=[
    {col:[136,146,189], base:0.50, amp:30, len:0.0015, sp: 0.00044, fill:0.10, line:0.16},
    {col:[66,95,188],   base:0.62, amp:42, len:0.0011, sp:-0.00036, fill:0.10, line:0.16},
    {col:[5,153,118],   base:0.74, amp:36, len:0.0018, sp: 0.00052, fill:0.13, line:0.26},
    {col:[5,153,118],   base:0.88, amp:54, len:0.0009, sp:-0.00030, fill:0.16, line:0.30},
  ];
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function wave(L,i,off){
    const baseY=h*L.base;
    let pts=[];
    for(let x=0;x<=w;x+=10){
      const y=baseY
        +Math.sin(x*L.len + t*L.sp + i)*L.amp
        +Math.sin(x*L.len*2.4 - t*L.sp*1.7 + i)*L.amp*0.38;
      pts.push([x,y]);
    }
    return {pts,baseY};
  }
  function draw(){
    t+=16;
    ctx.clearRect(0,0,w,h);
    layers.forEach((L,i)=>{
      const {pts,baseY}=wave(L,i);
      // filled body
      ctx.beginPath();ctx.moveTo(0,h);
      pts.forEach(p=>ctx.lineTo(p[0],p[1]));
      ctx.lineTo(w,h);ctx.closePath();
      const g=ctx.createLinearGradient(0,baseY-L.amp,0,h);
      g.addColorStop(0,`rgba(${L.col[0]},${L.col[1]},${L.col[2]},${L.fill})`);
      g.addColorStop(1,`rgba(${L.col[0]},${L.col[1]},${L.col[2]},${L.fill*0.18})`);
      ctx.fillStyle=g;ctx.fill();
      // crest line for definition
      ctx.beginPath();
      pts.forEach((p,k)=>k?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));
      ctx.strokeStyle=`rgba(${L.col[0]},${L.col[1]},${L.col[2]},${L.line})`;
      ctx.lineWidth=1.6;ctx.stroke();
    });
    if(!reduce)requestAnimationFrame(draw);
  }
  draw();
})();
