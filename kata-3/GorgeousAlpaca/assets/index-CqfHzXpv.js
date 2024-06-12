(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const Ge=(e,n)=>e===n,qe=Symbol("solid-track"),W={equals:Ge};let xe=Le;const G=1,Y=2,$e={owned:null,cleanups:null,context:null,owner:null};var y=null;let le=null,Fe=null,$=null,E=null,D=null,te=0;function X(e,n){const t=$,l=y,s=e.length===0,o=n===void 0?l:n,i=s?$e:{owned:null,cleanups:null,context:o?o.context:null,owner:o},r=s?e:()=>e(()=>B(()=>ne(i)));y=i,$=null;try{return H(r,!0)}finally{$=t,y=l}}function I(e,n){n=n?Object.assign({},W,n):W;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},l=s=>(typeof s=="function"&&(s=s(t.value)),Pe(t,s));return[ke.bind(t),l]}function C(e,n,t){const l=ue(e,n,!1,G);U(l)}function Ae(e,n,t){xe=Ue;const l=ue(e,n,!1,G);l.user=!0,D?D.push(l):U(l)}function j(e,n,t){t=t?Object.assign({},W,t):W;const l=ue(e,n,!0,0);return l.observers=null,l.observerSlots=null,l.comparator=t.equals||void 0,U(l),ke.bind(l)}function K(e){return H(e,!1)}function B(e){if($===null)return e();const n=$;$=null;try{return e()}finally{$=n}}function He(e){Ae(()=>B(e))}function Ce(e){return y===null||(y.cleanups===null?y.cleanups=[e]:y.cleanups.push(e)),e}function Me(e,n){const t=Symbol("context");return{id:t,Provider:Xe(t),defaultValue:e}}function Ee(e){return y&&y.context&&y.context[e.id]!==void 0?y.context[e.id]:e.defaultValue}function Ke(e){const n=j(e),t=j(()=>oe(n()));return t.toArray=()=>{const l=t();return Array.isArray(l)?l:l!=null?[l]:[]},t}function ke(){if(this.sources&&this.state)if(this.state===G)U(this);else{const e=E;E=null,H(()=>z(this),!1),E=e}if($){const e=this.observers?this.observers.length:0;$.sources?($.sources.push(this),$.sourceSlots.push(e)):($.sources=[this],$.sourceSlots=[e]),this.observers?(this.observers.push($),this.observerSlots.push($.sources.length-1)):(this.observers=[$],this.observerSlots=[$.sources.length-1])}return this.value}function Pe(e,n,t){let l=e.value;return(!e.comparator||!e.comparator(l,n))&&(e.value=n,e.observers&&e.observers.length&&H(()=>{for(let s=0;s<e.observers.length;s+=1){const o=e.observers[s],i=le&&le.running;i&&le.disposed.has(o),(i?!o.tState:!o.state)&&(o.pure?E.push(o):D.push(o),o.observers&&Oe(o)),i||(o.state=G)}if(E.length>1e6)throw E=[],new Error},!1)),n}function U(e){if(!e.fn)return;ne(e);const n=te;Ve(e,e.value,n)}function Ve(e,n,t){let l;const s=y,o=$;$=y=e;try{l=e.fn(n)}catch(i){return e.pure&&(e.state=G,e.owned&&e.owned.forEach(ne),e.owned=null),e.updatedAt=t+1,Ne(i)}finally{$=o,y=s}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?Pe(e,l):e.value=l,e.updatedAt=t)}function ue(e,n,t,l=G,s){const o={fn:e,state:l,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:y,context:y?y.context:null,pure:t};return y===null||y!==$e&&(y.owned?y.owned.push(o):y.owned=[o]),o}function Z(e){if(e.state===0)return;if(e.state===Y)return z(e);if(e.suspense&&B(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<te);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===G)U(e);else if(e.state===Y){const l=E;E=null,H(()=>z(e,n[0]),!1),E=l}}function H(e,n){if(E)return e();let t=!1;n||(E=[]),D?t=!0:D=[],te++;try{const l=e();return Re(t),l}catch(l){t||(D=null),E=null,Ne(l)}}function Re(e){if(E&&(Le(E),E=null),e)return;const n=D;D=null,n.length&&H(()=>xe(n),!1)}function Le(e){for(let n=0;n<e.length;n++)Z(e[n])}function Ue(e){let n,t=0;for(n=0;n<e.length;n++){const l=e[n];l.user?e[t++]=l:Z(l)}for(n=0;n<t;n++)Z(e[n])}function z(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const l=e.sources[t];if(l.sources){const s=l.state;s===G?l!==n&&(!l.updatedAt||l.updatedAt<te)&&Z(l):s===Y&&z(l,n)}}}function Oe(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=Y,t.pure?E.push(t):D.push(t),t.observers&&Oe(t))}}function ne(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),l=e.sourceSlots.pop(),s=t.observers;if(s&&s.length){const o=s.pop(),i=t.observerSlots.pop();l<s.length&&(o.sourceSlots[i]=l,s[l]=o,t.observerSlots[l]=i)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)ne(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0}function Je(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Ne(e,n=y){throw Je(e)}function oe(e){if(typeof e=="function"&&!e.length)return oe(e());if(Array.isArray(e)){const n=[];for(let t=0;t<e.length;t++){const l=oe(e[t]);Array.isArray(l)?n.push.apply(n,l):n.push(l)}return n}return e}function Xe(e,n){return function(l){let s;return C(()=>s=B(()=>(y.context={...y.context,[e]:l.value},Ke(()=>l.children))),void 0),s}}const Qe=Symbol("fallback");function _e(e){for(let n=0;n<e.length;n++)e[n]()}function We(e,n,t={}){let l=[],s=[],o=[],i=0,r=n.length>1?[]:null;return Ce(()=>_e(o)),()=>{let c=e()||[],d,a;return c[qe],B(()=>{let f=c.length,S,u,v,h,b,_,m,x,k;if(f===0)i!==0&&(_e(o),o=[],l=[],s=[],i=0,r&&(r=[])),t.fallback&&(l=[Qe],s[0]=X(M=>(o[0]=M,t.fallback())),i=1);else if(i===0){for(s=new Array(f),a=0;a<f;a++)l[a]=c[a],s[a]=X(g);i=f}else{for(v=new Array(f),h=new Array(f),r&&(b=new Array(f)),_=0,m=Math.min(i,f);_<m&&l[_]===c[_];_++);for(m=i-1,x=f-1;m>=_&&x>=_&&l[m]===c[x];m--,x--)v[x]=s[m],h[x]=o[m],r&&(b[x]=r[m]);for(S=new Map,u=new Array(x+1),a=x;a>=_;a--)k=c[a],d=S.get(k),u[a]=d===void 0?-1:d,S.set(k,a);for(d=_;d<=m;d++)k=l[d],a=S.get(k),a!==void 0&&a!==-1?(v[a]=s[d],h[a]=o[d],r&&(b[a]=r[d]),a=u[a],S.set(k,a)):o[d]();for(a=_;a<f;a++)a in v?(s[a]=v[a],o[a]=h[a],r&&(r[a]=b[a],r[a](a))):s[a]=X(g);s=s.slice(0,i=f),l=c.slice(0)}return s});function g(f){if(o[a]=f,r){const[S,u]=I(a);return r[a]=u,n(c[a],S)}return n(c[a])}}}function p(e,n){return B(()=>e(n||{}))}const Ye=e=>`Stale read from <${e}>.`;function de(e){const n="fallback"in e&&{fallback:()=>e.fallback};return j(We(()=>e.each,e.children,n||void 0))}function O(e){const n=e.keyed,t=j(()=>e.when,void 0,{equals:(l,s)=>n?l===s:!l==!s});return j(()=>{const l=t();if(l){const s=e.children;return typeof s=="function"&&s.length>0?B(()=>s(n?l:()=>{if(!B(t))throw Ye("Show");return e.when})):s}return e.fallback},void 0,void 0)}function Ze(e,n,t){let l=t.length,s=n.length,o=l,i=0,r=0,c=n[s-1].nextSibling,d=null;for(;i<s||r<o;){if(n[i]===t[r]){i++,r++;continue}for(;n[s-1]===t[o-1];)s--,o--;if(s===i){const a=o<l?r?t[r-1].nextSibling:t[o-r]:c;for(;r<o;)e.insertBefore(t[r++],a)}else if(o===r)for(;i<s;)(!d||!d.has(n[i]))&&n[i].remove(),i++;else if(n[i]===t[o-1]&&t[r]===n[s-1]){const a=n[--s].nextSibling;e.insertBefore(t[r++],n[i++].nextSibling),e.insertBefore(t[--o],a),n[s]=t[o]}else{if(!d){d=new Map;let g=r;for(;g<o;)d.set(t[g],g++)}const a=d.get(n[i]);if(a!=null)if(r<a&&a<o){let g=i,f=1,S;for(;++g<s&&g<o&&!((S=d.get(n[g]))==null||S!==a+f);)f++;if(f>a-r){const u=n[i];for(;r<a;)e.insertBefore(t[r++],u)}else e.replaceChild(t[r++],n[i++])}else i++;else n[i++].remove()}}}const ve="_$DX_DELEGATE";function ze(e,n,t,l={}){let s;return X(o=>{s=o,n===document?e():A(n,e(),n.firstChild?null:void 0,t)},l.owner),()=>{s(),n.textContent=""}}function L(e,n,t){let l;const s=()=>{const i=document.createElement("template");return i.innerHTML=e,i.content.firstChild},o=()=>(l||(l=s())).cloneNode(!0);return o.cloneNode=o,o}function fe(e,n=window.document){const t=n[ve]||(n[ve]=new Set);for(let l=0,s=e.length;l<s;l++){const o=e[l];t.has(o)||(t.add(o),n.addEventListener(o,tt))}}function R(e,n,t){t==null?e.removeAttribute(n):e.setAttribute(n,t)}function w(e,n){n==null?e.removeAttribute("class"):e.className=n}function et(e,n,t,l){Array.isArray(t)?(e[`$$${n}`]=t[0],e[`$$${n}Data`]=t[1]):e[`$$${n}`]=t}function je(e,n,t={}){const l=Object.keys(n||{}),s=Object.keys(t);let o,i;for(o=0,i=s.length;o<i;o++){const r=s[o];!r||r==="undefined"||n[r]||(we(e,r,!1),delete t[r])}for(o=0,i=l.length;o<i;o++){const r=l[o],c=!!n[r];!r||r==="undefined"||t[r]===c||!c||(we(e,r,!0),t[r]=c)}return t}function Ie(e,n,t){return B(()=>e(n,t))}function A(e,n,t,l){if(t!==void 0&&!l&&(l=[]),typeof n!="function")return ee(e,n,l,t);C(s=>ee(e,n(),s,t),l)}function we(e,n,t){const l=n.trim().split(/\s+/);for(let s=0,o=l.length;s<o;s++)e.classList.toggle(l[s],t)}function tt(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}});t;){const l=t[n];if(l&&!t.disabled){const s=t[`${n}Data`];if(s!==void 0?l.call(t,s,e):l.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function ee(e,n,t,l,s){for(;typeof t=="function";)t=t();if(n===t)return t;const o=typeof n,i=l!==void 0;if(e=i&&t[0]&&t[0].parentNode||e,o==="string"||o==="number")if(o==="number"&&(n=n.toString()),i){let r=t[0];r&&r.nodeType===3?r.data!==n&&(r.data=n):r=document.createTextNode(n),t=F(e,t,l,r)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n;else if(n==null||o==="boolean")t=F(e,t,l);else{if(o==="function")return C(()=>{let r=n();for(;typeof r=="function";)r=r();t=ee(e,r,t,l)}),()=>t;if(Array.isArray(n)){const r=[],c=t&&Array.isArray(t);if(ie(r,n,t,s))return C(()=>t=ee(e,r,t,l,!0)),()=>t;if(r.length===0){if(t=F(e,t,l),i)return t}else c?t.length===0?me(e,r,l):Ze(e,t,r):(t&&F(e),me(e,r));t=r}else if(n.nodeType){if(Array.isArray(t)){if(i)return t=F(e,t,l,n);F(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function ie(e,n,t,l){let s=!1;for(let o=0,i=n.length;o<i;o++){let r=n[o],c=t&&t[e.length],d;if(!(r==null||r===!0||r===!1))if((d=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))s=ie(e,r,c)||s;else if(d==="function")if(l){for(;typeof r=="function";)r=r();s=ie(e,Array.isArray(r)?r:[r],Array.isArray(c)?c:[c])||s}else e.push(r),s=!0;else{const a=String(r);c&&c.nodeType===3&&c.data===a?e.push(c):e.push(document.createTextNode(a))}}return s}function me(e,n,t=null){for(let l=0,s=n.length;l<s;l++)e.insertBefore(n[l],t)}function F(e,n,t,l){if(t===void 0)return e.textContent="";const s=l||document.createTextNode("");if(n.length){let o=!1;for(let i=n.length-1;i>=0;i--){const r=n[i];if(s!==r){const c=r.parentNode===e;!o&&!i?c?e.replaceChild(s,r):e.insertBefore(s,t):c&&r.remove()}else o=!0}}else e.insertBefore(s,t);return[s]}const nt="_farm_dsm2k_1",lt="_hud_dsm2k_5",st="_hud__text_dsm2k_16",J={farm:nt,hud:lt,hud__text:st},rt=(e,n=":")=>(e?.split(n)??[])?.map(t=>Number.parseInt(t)),ye=500,be="seedcraft_state",[se,Te]=I({...[1e3,1001,1002].reduce((e,n)=>([1e3,1001,1002].forEach(t=>e[`${n}:${t}`]={available:!0}),e),{})},{equals:!1}),[N,V]=I(200),[ae,pe]=I(0),ot=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]];function it(e){const n=structuredClone(e);return Object.keys(e).forEach(t=>{const[l,s]=rt(t);ot.forEach(([o,i])=>{const r=l+o,c=s+i;n?.[`${r}:${c}`]||(n[`${r}:${c}`]={})})}),n}function re(e,n,t){Te(l=>{const s=structuredClone(l);return s[`${e}:${n}`]=t,s})}const[ce,De]=I([{type:"blue",cost:50,growthDuration:5e3,value:75},{type:"red",cost:75,growthDuration:1e4,value:125},{type:"purple",cost:200,growthDuration:15e3,value:350}]),[Q,Be]=I([{type:"white",cost:300,growthDuration:2e4,value:600},{type:"orange",cost:500,growthDuration:3e4,value:1e3}]),at="_info_1286c_1",ct="_info__title_1286c_14",ut="_info__description_1286c_20",dt="_info__text_1286c_26",q={info:at,info__title:ct,info__description:ut,info__text:dt,"info__not-enough":"_info__not-enough_1286c_30"};var ft=L("<div><div> Flower</div><div><span>Cost: <span></span><img src=/code-dojo/kata-3/GorgeousAlpaca/assets/emerald.webp width=24 height=24 alt=Emerald></span><span>Growth duration: <!>s</span><span>Value: <!> <img src=/code-dojo/kata-3/GorgeousAlpaca/assets/emerald.webp width=24 height=24 alt=Emerald>");const he=e=>(()=>{var n=ft(),t=n.firstChild,l=t.firstChild,s=t.nextSibling,o=s.firstChild,i=o.firstChild,r=i.nextSibling,c=o.nextSibling,d=c.firstChild,a=d.nextSibling;a.nextSibling;var g=c.nextSibling,f=g.firstChild,S=f.nextSibling;return S.nextSibling,A(t,()=>e.seed.type,l),A(r,()=>e.seed.cost),A(c,()=>e.seed.growthDuration/1e3,a),A(g,()=>e.seed.value,S),C(u=>{var v=q.info,h=q.info__title,b=q.info__description,_=q.info__text,m=e.seed.cost>N()?q["info__not-enough"]:void 0,x=q.info__text,k=q.info__text;return v!==u.e&&w(n,u.e=v),h!==u.t&&w(t,u.t=h),b!==u.a&&w(s,u.a=b),_!==u.o&&w(o,u.o=_),m!==u.i&&w(r,u.i=m),x!==u.n&&w(c,u.n=x),k!==u.s&&w(g,u.s=k),u},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),n})(),ht="_seed_1pngg_1",gt={seed:ht};var _t=L("<li><button>");const vt=e=>{const[n,t]=I(!1),l=Ee(ge),s=()=>{l?.plantSeed(e.seed)};return(()=>{var o=_t(),i=o.firstChild;return i.$$click=s,i.addEventListener("mouseleave",()=>t(!1)),i.addEventListener("mouseenter",()=>t(!0)),A(o,p(O,{get when(){return n()},get children(){return p(he,{get seed(){return e.seed}})}}),null),C(r=>{var c=gt.seed,d=`url(/code-dojo/kata-3/GorgeousAlpaca/assets/flower-${e.seed.type}.webp)`,a=`Plant ${e.seed.type} seed`,g=e.seed.cost>N();return c!==r.e&&w(i,r.e=c),d!==r.t&&((r.t=d)!=null?i.style.setProperty("--flower",d):i.style.removeProperty("--flower")),a!==r.a&&R(i,"aria-label",r.a=a),g!==r.o&&(i.disabled=r.o=g),r},{e:void 0,t:void 0,a:void 0,o:void 0}),o})()};fe(["click"]);const wt="_plot_1dqvx_1",mt="_plowed_1dqvx_9",yt="_options_1dqvx_45",bt="_flower_1dqvx_56",pt="_flower__img_1dqvx_63",T={plot:wt,plowed:mt,"empty-plot":"_empty-plot_1dqvx_21","empty-plot__plus":"_empty-plot__plus_1dqvx_28","plus-shake":"_plus-shake_1dqvx_1",options:yt,flower:bt,flower__img:pt};var Se=L("<div>"),St=L("<button>"),xt=L("<button><div>"),$t=L("<ul>"),At=L("<button><img width=35 height=35>");const Ct=e=>{let n;const t=Ee(ge),[l,s]=I(!1),[o,i]=I(!1),r=f=>{f?.target&&!n?.contains(f?.target)&&(s(!1),document.removeEventListener("click",r))},c=()=>{l()||(s(!0),document.addEventListener("click",r))},d=j(()=>{if(!e.plot.seed?.plantedAt||!e.plot.seed.growthDuration)return 0;const f=ae()-(e.plot.seed?.plantedAt+e.plot.seed?.growthDuration);return f<=0?Math.max(0,1+f/e.plot.seed.growthDuration):1}),a=j(()=>e.plot.seed?.plantedAt&&e.plot.seed.growthDuration&&e.plot.seed?.plantedAt+e.plot.seed?.growthDuration<=ae()),g=()=>{a()&&t?.sellFlower(e.plot.seed)};return(()=>{var f=Se(),S=n;return typeof S=="function"?Ie(S,f):n=f,A(f,p(O,{get when(){return!e.plot?.available&&!e.plot?.seed},get children(){var u=St();return et(u,"click",t?.buyPlot),A(u,p(O,{get when(){return t?.canBuyPlot},get children(){var v=Se();return C(()=>w(v,T["empty-plot__plus"])),v}})),C(()=>w(u,T["empty-plot"])),u}}),null),A(f,p(O,{get when(){return!e.plot?.seed&&e.plot?.available},get children(){return[(()=>{var u=xt(),v=u.firstChild;return u.$$click=c,C(h=>{var b=T["empty-plot"],_=T["empty-plot__plus"];return b!==h.e&&w(u,h.e=b),_!==h.t&&w(v,h.t=_),h},{e:void 0,t:void 0}),u})(),p(O,{get when(){return l()},get children(){var u=$t();return A(u,p(de,{get each(){return ce()},children:v=>p(vt,{seed:v})})),C(()=>w(u,T.options)),u}})]}}),null),A(f,p(O,{get when(){return e.plot?.seed},get children(){return[(()=>{var u=At(),v=u.firstChild;return u.addEventListener("mouseleave",()=>i(!1)),u.addEventListener("mouseenter",()=>i(!0)),u.$$click=g,C(h=>{var b=T.flower,_=!a(),m=T.flower__img,x=`/code-dojo/kata-3/GorgeousAlpaca/assets/flower-${e.plot.seed?.type}.webp`,k=`${e.plot.seed?.type} Flower`,M=d();return b!==h.e&&w(u,h.e=b),_!==h.t&&(u.disabled=h.t=_),m!==h.a&&w(v,h.a=m),x!==h.o&&R(v,"src",h.o=x),k!==h.i&&R(v,"alt",h.i=k),M!==h.n&&((h.n=M)!=null?v.style.setProperty("--growth-stage",M):v.style.removeProperty("--growth-stage")),h},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),u})(),p(O,{get when(){return o()&&e.plot?.seed},get children(){return p(he,{get seed(){return e.plot.seed}})}})]}}),null),C(u=>{var v=T.plot,h={[T.plowed]:e.plot?.available||!!e.plot?.seed},b=+e?.pos?.col+1,_=+e?.pos?.row+1;return v!==u.e&&w(f,u.e=v),u.t=je(f,h,u.t),b!==u.a&&((u.a=b)!=null?f.style.setProperty("--grid-col",b):f.style.removeProperty("--grid-col")),_!==u.o&&((u.o=_)!=null?f.style.setProperty("--grid-row",_):f.style.removeProperty("--grid-row")),u},{e:void 0,t:void 0,a:void 0,o:void 0}),f})()};fe(["click"]);const Et="_trigger_1pkg7_1",kt="_modal_1pkg7_29",Pt="_modal__close_1pkg7_43",Lt="_header_1pkg7_60",Ot="_seeds_1pkg7_68",Nt="_seed__item_1pkg7_78",jt="_seed__button_1pkg7_86",It="_seed__price_1pkg7_102",Tt="_arrow_1pkg7_118",P={trigger:Et,modal:kt,modal__close:Pt,header:Lt,seeds:Ot,seed__item:Nt,seed__button:jt,seed__price:It,"seed__price-text":"_seed__price-text_1pkg7_106","seed__price-text--not-enough":"_seed__price-text--not-enough_1pkg7_114",arrow:Tt};var Dt=L("<li><button><span><img src=/code-dojo/kata-3/GorgeousAlpaca/assets/emerald.webp width=24 height=24 alt=Emerald><span></span></span><span></span><img width=35 height=35>"),Bt=L("<button title=Store>Store<img src=/code-dojo/kata-3/GorgeousAlpaca/assets/emerald.webp width=24 height=24 alt=Emerald>"),Gt=L("<ul>"),qt=L("<dialog><div>Trades<button>X");const Ft=e=>{const[n,t]=I(!1),l=s=>{e.nextSeedPrice>N()||K(()=>{V(o=>o-e.nextSeedPrice),De(o=>[...o,s]),Be(o=>o.filter(i=>i.type!==s.type))})};return(()=>{var s=Dt(),o=s.firstChild,i=o.firstChild,r=i.firstChild,c=r.nextSibling,d=i.nextSibling,a=d.nextSibling;return o.addEventListener("mouseleave",()=>t(!1)),o.addEventListener("mouseenter",()=>t(!0)),o.$$click=()=>l(e.seed),A(c,()=>e.nextSeedPrice),A(s,p(O,{get when(){return n()},get children(){return p(he,{get seed(){return e.seed}})}}),null),C(g=>{var f=P.seed__item,S=P.seed__button,u=N()<e.nextSeedPrice,v=P.seed__price,h=P["seed__price-text"],b={[P["seed__price-text--not-enough"]]:N()<e.nextSeedPrice},_=P.arrow,m=P.seed,x=`/code-dojo/kata-3/GorgeousAlpaca/assets/flower-${e.seed.type}.webp`,k=`${e.seed.type} Flower`;return f!==g.e&&w(s,g.e=f),S!==g.t&&w(o,g.t=S),u!==g.a&&(o.disabled=g.a=u),v!==g.o&&w(i,g.o=v),h!==g.i&&w(c,g.i=h),g.n=je(c,b,g.n),_!==g.s&&w(d,g.s=_),m!==g.h&&w(a,g.h=m),x!==g.r&&R(a,"src",g.r=x),k!==g.d&&R(a,"alt",g.d=k),g},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0}),s})()},Ht=e=>{let n;return[(()=>{var t=Bt();return t.$$click=()=>n?.showModal(),C(()=>w(t,P.trigger)),t})(),(()=>{var t=qt(),l=t.firstChild,s=l.firstChild,o=s.nextSibling,i=n;return typeof i=="function"?Ie(i,t):n=t,o.$$click=()=>n?.close(),A(t,p(O,{get when(){return Q().length},get children(){var r=Gt();return A(r,p(de,{get each(){return Q()},children:c=>p(Ft,{seed:c,get nextSeedPrice(){return e.nextSeedPrice}})})),C(()=>w(r,P.seeds)),r}}),null),A(t,p(O,{get when(){return!Q().length},children:"You already have everything"}),null),C(r=>{var c=P.modal,d=P.header,a=P.modal__close;return c!==r.e&&w(t,r.e=c),d!==r.t&&w(l,r.t=d),a!==r.a&&w(o,r.a=a),r},{e:void 0,t:void 0,a:void 0}),t})()]};fe(["click"]);var Mt=L("<main><div><div>Balance: <img src=/code-dojo/kata-3/GorgeousAlpaca/assets/emerald.webp width=24 height=24 alt=Emerald></div><div>Next plot: <img src=/code-dojo/kata-3/GorgeousAlpaca/assets/emerald.webp width=24 height=24 alt=Emerald></div></div><div>");const ge=Me(),Kt=()=>{let e;He(()=>{const r=localStorage.getItem(be);K(()=>{if(r){const c=JSON.parse(r);c.farm&&Te(c.farm),c.emeralds&&V(c.emeralds),c.availableSeeds&&De(c.availableSeeds),c.buyableSeeds&&Be(c.buyableSeeds)}pe(new Date().getTime())}),e=setInterval(()=>pe(c=>c+ye),ye)}),Ae(()=>localStorage.setItem(be,JSON.stringify({farm:se(),emeralds:N(),availableSeeds:ce(),buyableSeeds:Q()})));const n=j(()=>it(se())),t=j(()=>Math.floor(200*1.1**Object.keys(se()).length)),l=j(()=>Math.floor(200*1.5**Object.keys(ce()).length)),s=(r,c)=>d=>{N()>=d.cost&&K(()=>{V(a=>a-d.cost),re(r,c,{seed:{...d,plantedAt:ae()}})})},o=(r,c)=>()=>{N()<t()||K(()=>{V(d=>d-t()),re(r,c,{available:!0})})},i=(r,c)=>d=>{d&&K(()=>{re(r,c,{available:!0}),V(a=>a+d.value)})};return Ce(()=>clearInterval(e)),(()=>{var r=Mt(),c=r.firstChild,d=c.firstChild,a=d.firstChild,g=a.nextSibling,f=d.nextSibling,S=f.firstChild,u=S.nextSibling,v=c.nextSibling;return A(d,N,g),A(f,t,u),A(r,p(Ht,{get nextSeedPrice(){return l()}}),v),A(v,p(de,{get each(){return Object.entries(n())},children:([h,b])=>{const[_,m]=h?.split(":");return p(ge.Provider,{get value(){return{plantSeed:s(_,m),canBuyPlot:N()>=t(),buyPlot:o(_,m),sellFlower:i(_,m)}},get children(){return p(Ct,{plot:b,pos:{col:_,row:m}})}})}})),C(h=>{var b=J.hud,_=J.hud__text,m=J.hud__text,x=J.farm;return b!==h.e&&w(c,h.e=b),_!==h.t&&w(d,h.t=_),m!==h.a&&w(f,h.a=m),x!==h.o&&w(v,h.o=x),h},{e:void 0,t:void 0,a:void 0,o:void 0}),r})()},Vt=document.getElementById("root");ze(()=>p(Kt,{}),Vt);