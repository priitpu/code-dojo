var N=Object.defineProperty;var U=(o,e,t)=>e in o?N(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var n=(o,e,t)=>(U(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();class g{constructor(e=0,t=0){this.x=e,this.y=t}set(e,t){return this.x=e,this.y=t,this}copy(e){return this.x=e.x,this.y=e.y,this}eq(e){return this.x===e.x&&this.y===e.y}clone(){return new g(this.x,this.y)}add(e){return this.x+=e.x,this.y+=e.y,this}sub(e){return this.x-=e.x,this.y-=e.y,this}mul(e){return this.x*=e.x,this.y*=e.y,this}div(e){return this.x/=e.x,this.y/=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}subScalar(e){return this.x-=e,this.y-=e,this}mulScalar(e){return this.x*=e,this.y*=e,this}divScalar(e){return this.x/=e,this.y/=e,this}get length(){return Math.hypot(this.x,this.y)}lerp(e,t){this.x=B(this.x,e.x,t),this.y=B(this.y,e.y,t)}distanceTo(e){return Math.hypot(Math.abs(e.y-this.y),Math.abs(e.x-this.x))}}const B=(o,e,t)=>o+t*(e-o),Y=(o,e,t)=>Math.max(Math.min(o,t),e),F=(o,e=2,t=10)=>{const s=Math.pow(t??10,e);return Math.round(o*s)/s};function X(o,e){const t=Math.floor(o/e),s=o%e;return new g(s,t)}function b(o,e,t){return e*t+o}class m{constructor(e){n(this,"element",document.createElement("div"));this.element.classList.add(e)}mount(e){return e instanceof m?e.element.appendChild(this.element):e.appendChild(this.element),this}unmount(e){return e instanceof m?e.element.removeChild(this.element):e.removeChild(this.element),this}}class k extends m{constructor(t){super(`${t}-inner`);n(this,"wrapper",document.createElement("div"));this.wrapper.classList.add(`${t}-wrapper`),this.wrapper.appendChild(this.element)}mount(t){return t instanceof m?t.element.appendChild(this.wrapper):t.appendChild(this.wrapper),this}unmount(t){return t instanceof m?t.element.removeChild(this.wrapper):t.removeChild(this.wrapper),this}}const C=(o,e)=>{let t=e;return s=>{t!==s&&(t=s,o.call(void 0,t))}},c=(o,e,t,s)=>{const i=document.createElement(o);return e!=null&&e.length&&i.classList.add(...e),s!=null&&s.attr&&Object.entries(s.attr).forEach(([r,a])=>i.setAttribute(r,a)),t!=null&&t.length&&(Array.isArray(t)?Object.values(t).forEach(r=>i.appendChild(r)):i.innerHTML=t),i},G=o=>{const e=Math.floor(o/3600),t=Math.floor(o%3600/60),s=Math.floor(o%60);return[e>0?`${e}h `:"",t>0||e>0?`${t}m `:"",`${s}s`].join("")};class H{constructor(e,t){n(this,"states",new Map);n(this,"value");Object.entries(e).forEach(([s,i])=>this.states.set(s,i)),this.value=t}transition(e,t,...s){var u,l,d,p;const i=this.states.get(e),r=i.transitions[t];if(!r)return;const a=r.target,h=this.states.get(a);r.action(...s),(l=(u=i.actions).onLeave)==null||l.call(u),(p=(d=h.actions).onEnter)==null||p.call(d),this.value=a}change(e,t){var r,a,h,u;const s=this.states.get(e),i=this.states.get(t);(a=(r=s.actions).onLeave)==null||a.call(r),(u=(h=i.actions).onEnter)==null||u.call(h),this.value=t}}class T{constructor(e,t,s,i,r){n(this,"life",0);n(this,"ready",!1);this.name=e,this.seedPrice=t,this.sellPrice=s,this.timeToGrow=i,this.stages=r}tick(e){return this.ready?!1:(this.life+=e*1e3,this.life>=this.timeToGrow?(this.life=this.timeToGrow,this.ready=!0,!1):!0)}deserialize(e){this.life=e.time,this.life>=this.timeToGrow&&(this.ready=!0)}serialize(){return{plant:this.name,time:this.life}}get percentage(){return this.life/this.timeToGrow*100}get timeLeft(){return this.ready?0:(this.timeToGrow-this.life)/1e3}get stage(){return Math.floor(this.stages*(this.life/this.timeToGrow))}}n(T,"price",0),n(T,"sellPrice",0),n(T,"time",0),n(T,"totalStages",0);const y=class y extends T{constructor(){super("wheat",y.price,y.sellPrice,y.time,y.totalStages)}};n(y,"price",10),n(y,"sellPrice",40),n(y,"time",2e4),n(y,"totalStages",2);let A=y;const f=class f extends T{constructor(){super("carrot",f.price,f.sellPrice,f.time,f.totalStages)}};n(f,"price",40),n(f,"sellPrice",90),n(f,"time",6e4),n(f,"totalStages",2);let $=f;const v=class v extends T{constructor(){super("potato",v.price,v.sellPrice,v.time,v.totalStages)}};n(v,"price",90),n(v,"sellPrice",220),n(v,"time",12e4),n(v,"totalStages",2);let D=v;const x=class x extends T{constructor(){super("radish",x.price,x.sellPrice,x.time,x.totalStages)}};n(x,"price",85),n(x,"sellPrice",180),n(x,"time",8e4),n(x,"totalStages",2);let O=x;const w=class w extends T{constructor(){super("pumpkin",w.price,w.sellPrice,w.time,w.totalStages)}};n(w,"price",120),n(w,"sellPrice",480),n(w,"time",24e4),n(w,"totalStages",3);let I=w;const P={wheat:A,carrot:$,radish:O,potato:D,pumpkin:I};class W extends m{constructor(t=64,s=8){super("progress");n(this,"svg",document.createElementNS("http://www.w3.org/2000/svg","svg"));n(this,"circle",document.createElementNS("http://www.w3.org/2000/svg","circle"));n(this,"circle2",document.createElementNS("http://www.w3.org/2000/svg","circle"));this.size=t,this.width=s;const i=t/2,r=(Math.PI*((i-s)*2)).toFixed(2);this.svg.setAttribute("width",String(t)),this.svg.setAttribute("height",String(t)),this.svg.setAttribute("viewport",`0 0 ${t} ${t}`),this.circle.style.setProperty("stroke-width",`${s}px`),this.circle.setAttribute("cx",String(i)),this.circle.setAttribute("cy",String(i)),this.circle.setAttribute("fill","transparent"),this.circle.setAttribute("r",`${i-s}`),this.circle.setAttribute("stroke-dasharray",`${r}`),this.svg.appendChild(this.circle),this.circle2.style.setProperty("stroke-width",`${s}px`),this.circle2.setAttribute("cx",String(i)),this.circle2.setAttribute("cy",String(i)),this.circle2.setAttribute("fill","transparent"),this.circle2.setAttribute("r",`${i-s}`),this.circle2.setAttribute("stroke-dasharray",`${r}`),this.svg.appendChild(this.circle2),this.element.appendChild(this.svg),this.setProgress(0)}setProgress(t){const s=this.size/2,i=Math.PI*((s-this.width)*2),r=(100-t)/100*i;this.circle2.setAttribute("stroke-dashoffset",`${r.toFixed(2)}`)}}class M extends m{constructor(t,s){super("tile");n(this,"currentPlant");n(this,"progress",new W(20,4));n(this,"timer",c("div",["tile-timer"],""));n(this,"image",c("img",["tile-picture"],void 0,{attr:{draggable:"false"}}));n(this,"payout",c("span",["tile-payout"],""));n(this,"setTime",C(t=>{this.timer.innerHTML=t},""));n(this,"setPayout",C(t=>{this.payout.innerText=t},""));n(this,"setPicture",C(t=>{this.image.src=t},""));n(this,"state",new H({dirt:{actions:{onEnter:()=>{this.element.classList.add("tile-dirt")},onLeave:()=>{this.element.classList.remove("tile-dirt")}},transitions:{plant:{target:"growing",action:t=>{this.currentPlant=new P[t]}}}},growing:{actions:{onEnter:()=>{this.element.classList.add("tile-growing")},onLeave:()=>{this.element.classList.remove("tile-growing"),this.progress.setProgress(0),this.updateTimer(),this.updatePayout()}},transitions:{clear:{target:"dirt",action:()=>{this.currentPlant=void 0}},finish:{target:"ready",action:()=>{}}}},ready:{actions:{onEnter:()=>{this.element.classList.add("tile-ready"),this.progress.setProgress(100),this.updateTimer(),this.updatePayout(),this.updatePicture()},onLeave:()=>{this.currentPlant=void 0,this.element.classList.remove("tile-ready"),this.progress.setProgress(0),this.updateTimer(),this.updatePayout(),this.updatePicture()}},transitions:{harvest:{target:"dirt",action:()=>{}}}}},"dirt"));this.x=t,this.y=s,this.setup()}plant(t){this.currentPlant||this.state.value!=="dirt"||this.state.transition("dirt","plant",t)}harvest(){if(!this.currentPlant||this.state.value!=="ready")return;const t=this.currentPlant;return this.state.transition("ready","harvest"),t}tick(t){!this.currentPlant||this.state.value==="ready"||(this.currentPlant.tick(t),this.currentPlant.ready&&this.state.transition("growing","finish"),this.progress.setProgress(this.currentPlant.percentage),this.updateTimer(),this.updatePayout(),this.updatePicture())}deserialize(t){t.plant&&(this.currentPlant=new P[t.plant.plant],this.currentPlant.deserialize(t.plant)),t.state&&t.state!=="dirt"&&this.state.change("dirt",t.state)}serialize(){var t;return{xy:[this.x,this.y],plant:(t=this.currentPlant)==null?void 0:t.serialize(),state:this.state.value!=="dirt"?this.state.value:void 0}}updateTimer(){if(!this.currentPlant){this.setTime("");return}this.setTime(this.currentPlant.timeLeft?`${G(Math.ceil(this.currentPlant.timeLeft))}`:"Ready!")}updatePayout(){var t;if(!((t=this.currentPlant)!=null&&t.ready)){this.setPayout("");return}this.setPayout(`+${this.currentPlant.sellPrice} €`)}updatePicture(){if(!this.currentPlant){this.setPicture("");return}this.setPicture(`./assets/plants/${this.currentPlant.name}/${this.currentPlant.stage}.png`)}setup(){this.element.classList.add("tile-dirt"),this.element.style.setProperty("--tile-pos-x",String(this.x)),this.element.style.setProperty("--tile-pos-y",String(this.y)),this.progress.mount(this),this.progress.element.appendChild(this.timer),this.element.appendChild(this.image),this.element.appendChild(this.payout)}}class V extends CustomEvent{constructor(e){super("tileselect",{detail:e})}}class q extends CustomEvent{constructor(e){super("tiledeselect",{detail:e})}}class J extends CustomEvent{constructor(e){super("plant",{detail:e})}}class K extends CustomEvent{constructor(e){super("buytile",{detail:e})}}class Q extends CustomEvent{constructor(e){super("unlockseed",{detail:e})}}class R extends m{constructor(t,s){super("tile");n(this,"buy",c("span",["tile-buy-title"],"Expand"));n(this,"cost",c("span",["tile-buy-cost"],""));this.x=t,this.y=s,this.element.classList.add("tile-buy"),this.element.style.setProperty("--tile-pos-x",String(t)),this.element.style.setProperty("--tile-pos-y",String(s)),this.element.appendChild(this.buy),this.element.appendChild(this.cost)}setCost(t){this.cost.innerText=`${t} €`}}const Z=o=>{let e=100,t=0,s=0;return i=>{i.preventDefault();const r=Date.now(),a=r-t<e,h=s>0!=i.deltaY>0,u=Math.abs(i.deltaY)<Math.abs(s);(h||!a||!u)&&o.call(void 0,i),t=r,s=i.deltaY}},j=[null,null,null,4368,4353,null,null,null,null,4113,273,null,null,null,null,1,17,16,null,null,null,257,4369,4112,null,null,null,256,4352,4096];class _ extends m{constructor(t,s="./assets/farmgrass.png"){super("background");n(this,"canvas",document.createElement("canvas"));n(this,"ctx",this.canvas.getContext("2d"));n(this,"mapTileSize",32);n(this,"mapImage");this.tileSize=t,this.src=s,this.element.appendChild(this.canvas)}async preload(){return new Promise((t,s)=>{this.mapImage=document.createElement("img"),this.mapImage.onload=()=>t(),this.mapImage.onerror=()=>s(),this.mapImage.src=this.src})}build({mask:t,width:s,offset:i}){var u,l;const{tileIndexes:r,tiledWidth:a,tiledHeight:h}=this.getTileMap(t,s);this.canvas.width=a*this.mapTileSize,this.canvas.height=h*this.mapTileSize,(u=this.ctx)==null||u.clearRect(0,0,this.canvas.width,this.canvas.height);for(let d=0;d<a;d++)for(let p=0;p<h;p++){const S=b(d,p,a),E=r[S];if(!E)continue;const{x:L,y:z}=X(E,this.mapImage.width/this.mapTileSize);(l=this.ctx)==null||l.drawImage(this.mapImage,L*this.mapTileSize,z*this.mapTileSize,this.mapTileSize,this.mapTileSize,d*this.mapTileSize,p*this.mapTileSize,this.mapTileSize,this.mapTileSize)}this.canvas.style.setProperty("transform",`translate(${(i.x-1.5)*this.tileSize}px, ${(i.y-1.5)*this.tileSize}px) scale(${this.tileSize/this.mapTileSize})`)}getTileMap(t,s){const i=t.length/s,r=s+3,a=i+3,h=Array.from({length:r*a},()=>0),u=Array.from({length:r*a},()=>null);for(let l=0;l<s;l++)for(let d=0;d<i;d++){const p=b(l,d,s);if(!t[p])continue;const S=b(l+1,d+1,r),E=b(l+2,d+1,r),L=b(l+1,d+2,r),z=b(l+2,d+2,r);h[S]|=1,h[E]|=16,h[L]|=256,h[z]|=4096}for(let l=0;l<u.length;l++){const d=h[l],p=j.indexOf(d);p!==-1&&(u[l]=p)}return{tileIndexes:u,tiledWidth:r,tiledHeight:a}}}class tt extends k{constructor(){super("field");n(this,"tiles",[]);n(this,"buyTiles",[]);n(this,"tileSize",128);n(this,"tileCost",100);n(this,"tileCostFactor",1.35);n(this,"pos",new g);n(this,"targetPos",new g);n(this,"zoom",1);n(this,"activeTile");n(this,"background",new _(this.tileSize));n(this,"backgroundDirty",!0);n(this,"mousedown",!1);n(this,"dragging",!1);n(this,"pinching",!1);n(this,"prevTouch");n(this,"lastPinchLength",0);n(this,"lastPos",new g);this.onTouchStart=this.onTouchStart.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onWheel=Z(this.onWheel.bind(this)),this.setup()}async preload(){await this.background.preload()}tick(t){this.backgroundDirty&&(this.backgroundDirty=!1,this.background.build(this.createTileMask())),this.tiles.forEach(s=>s.tick(t))}center(){const t=this.getCenterCoordinates();this.pos.set(window.innerWidth/2-t.x,window.innerHeight/2-t.y),this.setAreaVariables()}hideBuyables(){this.buyTiles.length&&(this.buyTiles.forEach(t=>t.unmount(this)),this.buyTiles.length=0)}showBuyables(){const t=this.getNegativeExtent().subScalar(1),s=this.getPositiveExtent().addScalar(1);this.hideBuyables();for(let i=t.x;i<=s.x;i++)for(let r=t.y;r<=s.y;r++){const a=new g(i,r);if(this.tiles.some(u=>a.eq(u))||this.tiles.every(u=>a.distanceTo(u)>1))continue;const h=new R(i,r);h.mount(this),h.setCost(this.nextTileCost),h.element.addEventListener("click",()=>this.element.dispatchEvent(new K({pos:a,cost:this.nextTileCost}))),this.buyTiles.push(h)}}addTile(t){this.tiles.push(this.trackTile(new M(t.x,t.y))),this.showBuyables(),this.backgroundDirty=!0}deserialize(t){if(t.tiles.length){this.tiles.forEach(s=>s.unmount(this)),this.tiles.length=0;for(const s of t.tiles){const[i,r]=s.xy,a=new M(i,r);a.deserialize(s),this.tiles.push(this.trackTile(a))}}}serialize(){return{tiles:this.tiles.map(t=>t.serialize())}}createTileMask(){const t=this.getNegativeExtent(),s=this.getPositiveExtent(),i=[],r=new g(-t.x+s.x,0).length+1;for(let a=t.x;a<=s.x;a++)for(let h=t.y;h<=s.y;h++){const u=new g(a,h),l=this.tiles.some(S=>u.eq(S)),d=a-t.x,p=h-t.y;i[b(d,p,r)]=Number(l)}return{mask:i,width:r,offset:t}}setAreaVariables(){this.wrapper.style.setProperty("--field-x",`${this.pos.x}px`),this.wrapper.style.setProperty("--field-y",`${this.pos.y}px`),this.wrapper.style.setProperty("--field-scale",`${this.zoom}`)}selectTile(t){this.deselectTile(),this.activeTile=t,this.element.dispatchEvent(new V({tile:t}))}deselectTile(){if(!this.activeTile)return;const t=this.activeTile;this.activeTile=void 0,this.element.dispatchEvent(new q({tile:t}))}trackTile(t){return t.mount(this.element),t.element.addEventListener("pointerup",()=>{this.dragging&&this.pos.distanceTo(this.lastPos)>1||this.selectTile(t)}),t}setup(){this.wrapper.style.setProperty("--tile-size",`${this.tileSize}px`),this.background.mount(this),this.addEvents(),this.prepopulate()}addEvents(){this.wrapper.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.wrapper.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.wrapper.addEventListener("touchend",this.onTouchEnd),this.wrapper.addEventListener("touchcancel",this.onTouchEnd),this.wrapper.addEventListener("mousedown",this.onPointerDown),this.wrapper.addEventListener("mousemove",this.onPointerMove),this.wrapper.addEventListener("mouseup",this.onPointerUp),this.wrapper.addEventListener("wheel",this.onWheel,{passive:!1})}get nextTileCost(){return Math.ceil(this.tileCost*Math.pow(this.tileCostFactor,this.tiles.length-9))}prepopulate(t=3){for(let s=0;s<t;s++)for(let i=0;i<t;i++)this.tiles.push(this.trackTile(new M(s,i)))}getPositiveExtent(){return this.tiles.reduce((t,s)=>t.set(t.x<s.x?s.x:t.x,t.y<s.y?s.y:t.y),new g(-9e9,-9e9))}getNegativeExtent(){return this.tiles.reduce((t,s)=>t.set(t.x>s.x?s.x:t.x,t.y>s.y?s.y:t.y),new g(9e9,9e9))}getCenterCoordinates(){const t=this.getPositiveExtent(),s=this.getNegativeExtent();return t.clone().add(s).divScalar(2).mulScalar(this.tileSize).addScalar(this.tileSize/2)}onPointerDown(){this.dragging=!1,this.mousedown=!0}onPointerMove(t){this.mousedown&&(this.dragging||this.lastPos.copy(this.pos),this.dragging=!0,this.pos.x+=t.movementX,this.pos.y+=t.movementY,this.setAreaVariables())}onPointerUp(t){this.pointerUpHandler(t)}onWheel(t){const s=this.pos.clone(),i=(t.clientX-s.x)/this.zoom,r=(t.clientY-s.y)/this.zoom;t.deltaY<0?this.zoom*=1.2:this.zoom/=1.2,this.zoom=Y(this.zoom,.1,10),this.pos.set(t.clientX-i*this.zoom,t.clientY-r*this.zoom),this.setAreaVariables()}onTouchStart(t){this.prevTouch=t.touches[0],t.touches.length===2&&(this.pinching=!0),this.onPointerDown()}onTouchMove(t){const s=t.touches[0];if(t.preventDefault(),t.touches.length===2&&this.pinching){const i=Math.hypot(t.touches[0].pageX-t.touches[1].pageX,t.touches[0].pageY-t.touches[1].pageY);if(this.lastPinchLength){const r=i/this.lastPinchLength,a=(t.touches[0].clientX-this.pos.x)/this.zoom,h=(t.touches[0].clientY-this.pos.y)/this.zoom;r>0?this.zoom*=r:this.zoom/=r,this.zoom=Y(this.zoom,.25,10),this.pos.set(t.touches[0].clientX-a*this.zoom,t.touches[0].clientY-h*this.zoom),this.setAreaVariables()}this.lastPinchLength=i}this.mousedown&&(this.dragging||this.lastPos.copy(this.pos),this.dragging=!0,this.prevTouch&&(this.pos.x+=s.pageX-this.prevTouch.pageX,this.pos.y+=s.pageY-this.prevTouch.pageY,this.setAreaVariables()),this.prevTouch=s)}onTouchEnd(t){var s;this.pinching=!1,this.lastPinchLength=0,(s=t.touches)!=null&&s.length||(this.dragging=!1),this.pointerUpHandler(t)}pointerUpHandler(t){this.mousedown=!1,!(this.dragging&&this.pos.distanceTo(this.lastPos)>1)&&this.activeTile&&!this.element.contains(t.target)&&this.deselectTile()}}class et extends k{constructor(){super("hud");n(this,"moneyText",c("span",["hud-money"],"0 €"));n(this,"moneySign",c("div",["hud-money-wrapper"],[this.moneyText]));this.element.append(this.moneySign)}update(t){this.moneyText.innerText=`${t} €`}}class st extends m{constructor(){super("shop")}update(e){this.element.innerHTML="";for(const t of e){const s=c("span",["button-shop-name"],t),i=c("span",["button-shop-cost"],`${P[t].price} €`),r=c("div",["button-shop-image"]),a=c("button",["button","button-shop"],[s,r,i]);this.element.appendChild(a),a.addEventListener("click",()=>{this.element.dispatchEvent(new J({plant:t}))})}}}class it extends k{constructor(){super("tooltip");n(this,"currElement");n(this,"isOpen",!1);this.wrapper.style.display="none"}open(t,s,i){this.currElement=i,this.wrapper.style.setProperty("--tooltip-x",String(t)),this.wrapper.style.setProperty("--tooltip-y",String(s)),this.wrapper.style.display="block",this.isOpen=!0,i.mount(this)}close(){this.isOpen&&(this.currElement&&this.currElement.unmount(this),this.wrapper.style.display="none",this.isOpen=!1)}}class nt extends k{constructor(t,s=500){super("openable");n(this,"time",0);n(this,"state",new H({closed:{actions:{onEnter:()=>this.wrapper.classList.add("is-closed"),onLeave:()=>this.wrapper.classList.remove("is-closed")},transitions:{open:{target:"opening",action:()=>{this.time=this.transitionTime}}}},opening:{actions:{onEnter:()=>this.wrapper.classList.add("is-opening","is-open"),onLeave:()=>this.wrapper.classList.remove("is-opening")},transitions:{finish:{target:"open",action:()=>{}}}},closing:{actions:{onEnter:()=>this.wrapper.classList.add("is-closing"),onLeave:()=>this.wrapper.classList.remove("is-closing","is-open")},transitions:{finish:{target:"closed",action:()=>{}}}},open:{actions:{onEnter:()=>this.wrapper.classList.add("is-open")},transitions:{close:{target:"closing",action:()=>{this.time=this.transitionTime}}}}},"closed"));this.className=t,this.transitionTime=s,this.wrapper.classList.add(t,"is-closed")}get isOpen(){return this.state.value!=="closed"}get isTransitioning(){return["closing","opening"].includes(this.state.value)}tick(t){if(this.isTransitioning){if(this.time<=0){this.state.transition(this.state.value,"finish"),this.time=0;return}this.time-=t*1e3}}open(){this.isOpen||this.state.transition("closed","open")}close(){!this.isOpen||this.isTransitioning||this.state.transition("open","close")}toggle(){this.isTransitioning||(this.isOpen?this.close():this.open())}}class rt extends nt{constructor(){super("unlocks");n(this,"initialSeeds",3);n(this,"unlocked",Object.keys(P).slice(0,this.initialSeeds));n(this,"closeBtn",c("button",["button","button-close"],"x"));n(this,"header",c("div",["unlocks-header"],[c("span",["unlocks-header-text"],"Unlock more seeds"),this.closeBtn]));n(this,"body",c("div",["unlocks-body"]));n(this,"box",c("div",["unlocks-inner"],[this.header,this.body]));n(this,"toggleBtn",c("button",["button","button-toggle"]));n(this,"baseCost",1e3);n(this,"costFactor",3.6942);this.closeBtn.addEventListener("click",()=>this.close()),this.toggleBtn.addEventListener("click",()=>this.toggle()),this.element.append(this.box,this.toggleBtn)}get purchaseCount(){return this.unlocked.length-this.initialSeeds}get nextSeedCost(){return Math.ceil(this.baseCost*Math.pow(this.costFactor,this.purchaseCount))}get nextUnlockable(){return Object.keys(P).slice(this.unlocked.length)[0]}update(){this.body.innerHTML="";const{nextUnlockable:t,nextSeedCost:s}=this;if(!t){this.body.appendChild(c("p",["shop-message"],"There are currently no more seeds to unlock!"));return}const i=c("button",["button","button-shop"],[c("span",["button-shop-name"],t),c("span",["button-shop-cost"],`${s} €`)]);i.addEventListener("click",()=>{this.element.dispatchEvent(new Q({seed:t,cost:s}))}),this.body.appendChild(i)}unlock(t){this.unlocked.push(t),this.update()}serialize(){return{unlocked:this.unlocked}}deserialize(t){if(!(t!=null&&t.unlocked))return;const s=Object.keys(P);this.unlocked=t.unlocked.filter(i=>s.includes(i))}}class ot extends m{constructor(){super("game");n(this,"field",new tt);n(this,"tooltip",new it);n(this,"shop",new st);n(this,"unlocks",new rt);n(this,"hud",new et);n(this,"moneyCount",90);n(this,"lastTime");n(this,"targetUps",1e3/30);n(this,"running",!1);this.loop=this.loop.bind(this),this.field.mount(this),this.tooltip.mount(this.field),this.hud.mount(this),this.unlocks.mount(this),this.hud.update(this.money),this.listen()}set money(t){const s=F(t);this.moneyCount=s,this.hud.update(s)}get money(){return this.moneyCount}async preload(){await this.field.preload()}start(){return this.running=!0,this.loop(0),this.field.center(),this.field.showBuyables(),this.shop.update(this.unlocks.unlocked),this.unlocks.update(),this}stop(){this.running=!1}deserialize(t){this.money=t.money,this.field.deserialize(t.field),this.unlocks.deserialize(t.unlocks)}serialize(){return{money:this.money,field:this.field.serialize(),unlocks:this.unlocks.serialize()}}listen(){this.field.element.addEventListener("tileselect",({detail:{tile:t}})=>{var s;if(t.state.value==="dirt"&&this.tooltip.open(t.x,t.y,this.shop),t.state.value==="ready"){const i=(s=this.field.activeTile)==null?void 0:s.harvest();i&&(this.money+=i.sellPrice)}}),this.field.element.addEventListener("tiledeselect",()=>{this.tooltip.close()}),this.field.element.addEventListener("buytile",({detail:{pos:t,cost:s}})=>{this.money<s||(this.money-=s,this.field.addTile(t))}),this.shop.element.addEventListener("plant",({detail:{plant:t}})=>{var i;if(!this.field.activeTile)return;const s=P[t].price;this.money<s||(this.money-=s,(i=this.field.activeTile)==null||i.plant(t),this.tooltip.close())}),this.hud.element.addEventListener("hudtoggle",()=>this.unlocks.toggle()),this.unlocks.element.addEventListener("unlockseed",({detail:{seed:t,cost:s}})=>{this.money<s||(this.money-=s,this.unlocks.unlock(t),this.shop.update(this.unlocks.unlocked))})}loop(t){if(!this.running)return;requestAnimationFrame(this.loop),this.lastTime||(this.lastTime=t);const s=t-this.lastTime;if(s>this.targetUps){const i=s/1e3;this.field.tick(i),this.unlocks.tick(i),this.lastTime=t}}}const at=()=>{const o=window.localStorage.getItem("state");if(o)return JSON.parse(o)},ht=o=>{window.localStorage.setItem("state",JSON.stringify(o))};async function lt(){const o=new ot;await o.preload(),o.mount(document.getElementById("app"));const e=at();e&&o.deserialize(e),setInterval(()=>ht(o.serialize()),5e3),o.start()}lt().catch(console.error);