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
  start();
});

/* Website tile: auto scroll each page down then up, then swipe to the next.
   A clone of the first slide is appended so the swipe keeps going forward and
   loops back seamlessly (no rewind through the deck). */
document.querySelectorAll('.frame.bw').forEach(function(box){
  var deck=box.querySelector('.bw-deck'); if(!deck)return;
  var slides=[].slice.call(deck.querySelectorAll('.bw-slide'));
  if(slides.length<2)return;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  deck.appendChild(slides[0].cloneNode(true));            // trailing clone of page 1
  var all=[].slice.call(deck.querySelectorAll('.bw-slide'));
  var n=all.length;                                        // real slides + 1 clone
  deck.style.width=(n*100)+'%';
  all.forEach(function(s){ s.style.flex='0 0 '+(100/n)+'%'; s.style.width=(100/n)+'%'; });
  var i=0,step=0;
  var SCROLL=2400,SWIPE=700,HOLD_TOP=900,HOLD_BOT=900,SETTLE=600;
  function go(idx,animate){
    deck.style.transition=animate?'':'none';
    deck.style.transform='translateX(-'+(100/n*idx)+'%)';
    if(!animate){ void deck.offsetWidth; deck.style.transition=''; }   // force reflow, restore transition
  }
  function tick(){
    var img=all[i].querySelector('img');
    if(step===0){            // scroll current page down
      var over=img.offsetHeight-all[i].clientHeight;
      img.style.transform=over>2?'translateY(-'+over+'px)':'translateY(0)';
      step=1;setTimeout(tick,SCROLL+HOLD_BOT);
    }else if(step===1){      // scroll back to top
      img.style.transform='translateY(0)';
      step=2;setTimeout(tick,SCROLL+SETTLE);
    }else{                   // swipe forward to the next page
      i++;go(i,true);
      if(i===n-1){           // landed on the clone: hold, then snap back to the real page 1
        setTimeout(function(){ go(0,false); i=0; step=0; tick(); },SWIPE+HOLD_TOP);
      }else{ step=0;setTimeout(tick,SWIPE+HOLD_TOP); }
    }
  }
  setTimeout(tick,1200);
});

/* nav: burger removed — nav is two persistent buttons (Insights, Contact) */

/* =========================================================
   WAVE SWELLS: layered translucent, shaded ocean currents.
   Visible (not thin scribbles), still light & calm.
   ========================================================= */
(function(){
  const cv=document.getElementById('flow');if(!cv)return;
  const ctx=cv.getContext('2d');
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

/* deter casual saving of portfolio images (portfolio grid only) */
(function(){var g=document.querySelector('.sw-grid');if(!g)return;
  g.addEventListener('contextmenu',function(e){e.preventDefault();});
  g.addEventListener('dragstart',function(e){e.preventDefault();});
})();

/* Insights index: load-more pagination — show 3 rows at a time (3/6/9 by column count).
   All cards stay in the DOM for SEO/AIO; JS only toggles visibility. */
(function(){
  var grid=document.querySelector('.igrid'); if(!grid) return;
  var btn=document.querySelector('.ins-more'); if(!btn) return;
  var cards=[].slice.call(grid.querySelectorAll('.icard'));
  var ROWS=3;
  function cols(){ return getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length || 1; }
  var shown=cols()*ROWS;
  function render(){
    var c=cols();
    shown=Math.min(Math.max(Math.ceil(shown/c)*c, c*ROWS), cards.length);  // align to full rows, min 3 rows
    cards.forEach(function(card,idx){
      if(idx>=shown){ card.classList.add('is-hidden'); }
      else if(card.classList.contains('is-hidden')){
        card.classList.remove('is-hidden'); requestAnimationFrame(function(){ card.classList.add('in'); });
      }
    });
    btn.hidden = shown>=cards.length;
  }
  render();
  btn.addEventListener('click',function(){ shown+=cols()*ROWS; render(); });
  var rt; addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(render,150); });
})();
