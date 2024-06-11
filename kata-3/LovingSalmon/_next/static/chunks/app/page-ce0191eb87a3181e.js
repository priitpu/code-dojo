(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{1233:function(e,t,n){Promise.resolve().then(n.bind(n,9980))},9980:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return ec}});var i=n(7437),a=n(2265),r=n(3723),s=n(6648),o=n(1346),l=n.n(o),c=JSON.parse('{"V":[{"version":"1.0.0","date":"2024-05-17","description":"\uD83C\uDF89 Initial game release! \uD83C\uDF89","features":[],"bugfixes":[]},{"version":"1.1.0","date":"2024-05-26","description":"Get ready to discover new ways to make higher profits with crop mutations! You have a chance to find mutated crops after every shop update. \uD83D\uDC40","features":[{"title":"Changelog window","description":"Added this changelog window to share last game updates and improvements. \uD83D\uDE80"},{"title":"Crop mutations","description":"Added crop mutations functionality. \uD83E\uDDEC"},{"title":"New tile price growth chart","description":"Added a chart to show new tile price growth. \uD83D\uDCC8","link":{"text":"Price growth chart","url":"/assets/images/tile_price_growth.png"}}],"bugfixes":[{"title":"Images preload","description":"Implemented images preloading to prevent flickering on the initial load."},{"title":"Crop final growth stage","description":"Fixed crop\'s last growth stage image to show up correctly on last timer tick."},{"title":"Eggplant stage image size","description":"Fixed eggplant\'s stage images to match other crop sizes."}]}]}'),d=n(8347),u=n.n(d),h=e=>{let{children:t,opened:n,onModalClosed:r}=e,s=(0,a.useRef)(null);return(0,a.useEffect)(()=>{null!==s.current&&s.current.addEventListener("click",e=>{let t=s.current.getBoundingClientRect();if(!(t.top<=e.clientY&&e.clientY<=t.top+t.height&&t.left<=e.clientX&&e.clientX<=t.left+t.width)){var n;null===(n=s.current)||void 0===n||n.close()}})},[s]),(0,a.useEffect)(()=>{var e,t;n?null===(e=s.current)||void 0===e||e.showModal():null===(t=s.current)||void 0===t||t.close()},[n]),(0,i.jsxs)("dialog",{ref:s,className:u().container,onClose:r,children:[(0,i.jsx)("button",{className:u().closeButton,onClick:r,children:"X"}),t]})},m=n(8869),p=n.n(m),g=e=>{let{title:t,listItems:n}=e;return(0,i.jsxs)("div",{children:[(0,i.jsx)("h4",{children:t}),(0,i.jsx)("ul",{className:p().list,children:n.map((e,t)=>(0,i.jsxs)("li",{children:[e.description,e.link&&(0,i.jsx)("div",{children:(0,i.jsx)("a",{target:"_blank",href:e.link.url,className:p().link,children:e.link.text})})]},t))})]})},_=n(4060),x=n.n(_),f=e=>{let{entry:t}=e,{version:n,date:a,description:r,features:s,bugfixes:o}=t,l=new Date(a).toLocaleDateString("en",{month:"long",day:"numeric",year:"numeric"});return(0,i.jsxs)("div",{className:x().container,children:[(0,i.jsxs)("h3",{children:[(0,i.jsxs)("span",{children:["v",n]}),(0,i.jsx)("span",{children:" - "}),(0,i.jsx)("span",{children:l})]}),r&&(0,i.jsx)("p",{children:r}),s.length>0&&(0,i.jsx)(g,{title:"Features",listItems:s}),o.length>0&&(0,i.jsx)(g,{title:"Bug fixes",listItems:o})]})},v=n(5088),j=n.n(v),w=e=>{let{changelog:t}=e;return(0,i.jsxs)("div",{className:j().container,children:[(0,i.jsx)("h2",{children:" Changelog"}),(0,i.jsx)("hr",{}),(0,i.jsx)("div",{className:j().entriesList,children:t.map((e,t)=>(0,i.jsx)(f,{entry:e},t))})]})},N=n(1591),C=n.n(N),b=()=>{let[e,t]=(0,a.useState)(!1),n=[...c.V].reverse();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("button",{className:C().button,onClick:()=>t(!0),children:"C"}),(0,i.jsx)(h,{opened:e,onModalClosed:()=>t(!1),children:(0,i.jsx)(w,{changelog:n})})]})},y=()=>{let{gameState:e,updateMoney:t}=(0,r.j)();return(0,i.jsxs)("header",{className:l().container,children:[(0,i.jsx)("div",{className:l().actionsContainer,children:(0,i.jsx)(b,{})}),(0,i.jsxs)("div",{className:l().moneyBackground,children:[(0,i.jsx)(s.default,{unoptimized:!0,src:"/assets/images/coin.png",alt:"Coin currency",width:24,height:24,onClick:()=>{t(1)}}),(0,i.jsx)("span",{className:l().moneyAmountNumber,children:null==e?void 0:e.money})]})]})},I=n(8887),S=n(4235),L=n(3146);let T=e=>50*Math.round(L.pw*L.f$**(e-L.Rz-1)/50),k=e=>[Math.floor(e%6e4/1e3),Math.floor(e%36e5/6e4),Math.floor(e%864e5/36e5)],M=e=>e<=20?"stage_1":e>20&&e<=50?"stage_2":e>50&&e<100?"stage_3":"stage_4";var E=n(1533),D=n.n(E),P=e=>{let{shopItem:t}=e,{gameState:n,updateTile:a,updateMoney:o,updateShop:l}=(0,r.j)(),{tileSelected:c}=(0,I.I)(),d=k(t.growthDuration),u=t.mutations.length>0,h=(null==n?void 0:n.money)>=t.price,m=e=>{if(h){let t=new S.Z(e.name,e.imageName,e.value,e.price,e.growthDuration);t.mutations=e.mutations,t.plant(),o(-e.price),a(c,t),l()}};return(0,i.jsxs)("div",{className:D().container,children:[(0,i.jsxs)("span",{className:D().buyPriceLabel,children:[(0,i.jsx)(s.default,{unoptimized:!0,src:"/assets/images/coin.png",alt:"Coin currency",width:16,height:16}),t.price]}),(0,i.jsxs)("button",{className:D().shopItem,onClick:()=>m(t),style:h?void 0:{filter:"grayscale(0.5)",cursor:"not-allowed"},children:[u&&(0,i.jsx)("span",{className:D().rarityLabel,children:t.mutations.map((e,t)=>(0,i.jsx)(s.default,{unoptimized:!0,className:D().mutationIcon,src:"/assets/images/mutations/".concat(e.iconName,".png"),alt:"Mutation icon",width:12,height:12},t))}),(0,i.jsx)(s.default,{unoptimized:!0,src:"./assets/images/crops/".concat(t.imageName,"/crop.png"),alt:t.name,width:36,height:36}),(0,i.jsxs)("span",{className:D().durationLabel,children:[d[2]>0&&(0,i.jsxs)("span",{children:[d[2],"h"]}),d[1]>0&&(0,i.jsxs)("span",{children:[d[1],"m"]}),d[0]>0&&(0,i.jsxs)("span",{children:[d[0],"s"]})]})]}),(0,i.jsxs)("span",{className:D().sellPriceLabel,children:[(0,i.jsx)(s.default,{unoptimized:!0,src:"/assets/images/coin.png",alt:"Coin currency",width:16,height:16}),t.value]})]})},z=n(7573),R=n.n(z),F=()=>{var e;let{gameState:t}=(0,r.j)(),{tileSelected:n}=(0,I.I)();return(0,i.jsx)("div",{className:R().container,style:void 0!==n?{height:"auto"}:void 0,children:(0,i.jsx)("div",{className:R().shopContainer,children:null==t?void 0:null===(e=t.shop)||void 0===e?void 0:e.map((e,t)=>(0,i.jsx)(P,{shopItem:e},t))})})},J=n(6800),G=n.n(J),A=n(9623),B=n.n(A),X=n(722),Z=n.n(X),H=e=>{let{growthDate:t}=e,n=k(t);return(0,i.jsx)("div",{className:Z().container,children:(0,i.jsxs)("p",{className:Z().timeLabel,children:[n[2]>0&&(0,i.jsxs)("span",{children:[n[2],"h"]}),n[1]>0&&(0,i.jsxs)("span",{children:[n[1],"m"]}),n[0]>0&&(0,i.jsxs)("span",{children:[n[0],"s"]})]})})},V=e=>{let{crop:t,tileId:n}=e,{gameLoopStamp:a,updateMoney:o,updateTile:l}=(0,r.j)(),c=t.mutations.length,d=t.growthTimeEnd-a,u=t.growthTimeEnd-t.growthTimeStart-1e3,h=100*(a-t.growthTimeStart)/u,m=h>=100;return(0,i.jsxs)("div",{className:B().container,children:[(0,i.jsx)("div",{className:B().rarityStarsContainer,children:Array(c).fill(null).map((e,t)=>(0,i.jsx)(s.default,{unoptimized:!0,className:B().rarityStar,src:"./assets/images/mutations/star.png",alt:"Rarity star",width:20,height:20},t))}),(0,i.jsx)("div",{onClick:()=>{m&&(o(t.value),l(n,null))},className:G()(B().cropStageImage,m?B().cropSelectable:""),style:{backgroundImage:"url(./assets/images/crops/".concat(t.imageName,"/").concat(M(h),".png)")}}),!m&&(0,i.jsx)(H,{growthDate:d})]})},O=n(5508),Y=n.n(O),U=e=>{let{tile:t}=e,{tileSelected:n,selectTile:a}=(0,I.I)(),r=t.crop;return(0,i.jsxs)("div",{className:Y().container,onClick:()=>{r||a(t.id)},children:[r&&(0,i.jsx)(V,{crop:t.crop,tileId:t.id}),(0,i.jsx)(s.default,{unoptimized:!0,"data-name":"tile",className:r?void 0:Y().tileSelectable,src:"./assets/images/farm_slot_tile.png",alt:"Farm slot tile",width:100,height:100,style:{filter:n===t.id?"drop-shadow(1px 1px 0 var(--selected-outline-clr))\n                drop-shadow(-1px 1px 0 var(--selected-outline-clr))\n                drop-shadow(1px -1px 0 var(--selected-outline-clr))\n                drop-shadow(-1px -1px 0 var(--selected-outline-clr))":void 0}})]})},W=n(9447),Q=n.n(W),q=e=>{let{newTileId:t}=e,{gameState:n,updateMoney:a,addTile:o}=(0,r.j)(),l=T(t),c=(null==n?void 0:n.money)>=l;return(0,i.jsxs)("div",{className:Q().container,onClick:()=>{c&&(o(t),a(-l))},children:[(0,i.jsx)(s.default,{unoptimized:!0,style:c?void 0:{filter:"grayscale(0.5)",cursor:"not-allowed"},className:Q().newTileImage,src:"/assets/images/new_farm_tile.png",alt:"New farm slot tile",width:100,height:100}),(0,i.jsxs)("div",{className:Q().priceLabel,children:[(0,i.jsx)(s.default,{unoptimized:!0,src:"/assets/images/coin.png",alt:"Coin currency",width:16,height:16}),(0,i.jsx)("span",{children:l})]})]})},K=n(7422),$=n.n(K),ee=e=>{let{children:t}=e;return(0,i.jsx)("div",{className:$().container,children:t})},et=n(5033),en=n.n(et),ei=()=>{var e,t;let{gameState:n}=(0,r.j)(),{selectTile:s}=(0,I.I)();return(0,a.useEffect)(()=>{let e=e=>{var t,n;(null===(n=e.target.attributes)||void 0===n?void 0:null===(t=n["data-name"])||void 0===t?void 0:t.value)!=="tile"&&s(void 0)};return document.addEventListener("click",e),()=>{document.removeEventListener("click",e)}},[s]),(0,i.jsx)("div",{className:en().container,children:(0,i.jsxs)(ee,{children:[null==n?void 0:n.tiles.map(e=>(0,i.jsx)(U,{tile:e},e.id)),(null==n?void 0:null===(e=n.tiles)||void 0===e?void 0:e.length)<(null==n?void 0:n.maxTiles)&&(0,i.jsx)(q,{newTileId:(null==n?void 0:null===(t=n.tiles)||void 0===t?void 0:t.length)+1})]})})},ea=n(1263),er=n.n(ea),es=()=>(0,i.jsx)("div",{className:er().container,children:(0,i.jsxs)("div",{className:er().containerInner,children:[(0,i.jsx)("div",{className:er().loader}),(0,i.jsx)(s.default,{priority:!0,unoptimized:!0,className:er().logo,src:"/assets/images/logo.png",alt:"Farm Royale logo",width:210,height:100})]})}),eo=n(8518),el=n.n(eo);function ec(){let{gameState:e}=(0,r.j)(),[t,n]=(0,a.useState)(!0);return((0,a.useEffect)(()=>{e&&t&&setTimeout(()=>n(!1),1e3)},[e,t]),t)?(0,i.jsx)(es,{}):(0,i.jsxs)("main",{className:el().container,children:[(0,i.jsx)(y,{}),(0,i.jsx)(ei,{}),(0,i.jsx)(F,{}),(0,i.jsxs)("span",{className:el().versionLabel,children:["v","1.1.0"]})]})}},3146:function(e,t,n){"use strict";n.d(t,{Jr:function(){return i},Rz:function(){return r},f$:function(){return s},pw:function(){return a}});let i="farm-royale-game-state",a=1e3,r=8,s=1.55},3723:function(e,t,n){"use strict";n.d(t,{GameProvider:function(){return g},j:function(){return _}});var i=n(7437),a=n(2265),r=n(3146),s=n(4235);class o extends s.Z{constructor(e){super("Tomato","tomato",250,170,39e4,e)}}class l extends s.Z{constructor(e){super("Carrot","carrot",100,75,6e4,e)}}class c extends s.Z{constructor(e){super("Corn","corn",200,140,3e5,e)}}class d extends s.Z{constructor(e){super("Potato","potato",65,50,3e4,e)}}class u extends s.Z{constructor(e){super("Eggplant","eggplant",300,200,6e5,e)}}let h={money:500,maxTiles:16,tiles:[{id:1,crop:null},{id:2,crop:null},{id:3,crop:null},{id:4,crop:null},{id:5,crop:null},{id:6,crop:null},{id:7,crop:null},{id:8,crop:null}],shop:[new d,new l,new c,new o,new u]};class m{createRandomCrop(e){let t=Math.floor(Math.random()*this.cropTypes.length);return new this.cropTypes[t](e)}constructor(){this.cropTypes=[d,l,c,o,u]}}let p=(0,a.createContext)(void 0);function g(e){let{children:t}=e,[n,s]=(0,a.useState)(void 0),[o,l]=(0,a.useState)(new Date().getTime()),[c]=(0,a.useState)(new m);return(0,a.useEffect)(()=>{let e=setInterval(()=>{l(Date.now())},1e3);return()=>clearInterval(e)},[]),(0,a.useEffect)(()=>{let e=localStorage.getItem(r.Jr);e?s(JSON.parse(e)):s(h)},[]),(0,a.useEffect)(()=>{n&&localStorage.setItem(r.Jr,JSON.stringify(n))},[n]),(0,i.jsx)(p.Provider,{value:{gameState:n,gameLoopStamp:o,cropFactory:c,updateTile:(e,t)=>{let i=n.tiles.map(n=>n.id===e?{...n,crop:t}:n);s(e=>({...e,tiles:i}))},updateMoney:e=>{n&&!(n.money+e<0)&&s(t=>({...t,money:t.money+e}))},updateShop:()=>{let e=[,,,,,].fill(null).map(()=>c.createRandomCrop(!0));s(t=>({...t,shop:e}))},addTile:e=>{if(!n||n.tiles.length>=n.maxTiles)return;let t={id:e,crop:null};s(e=>({...e,tiles:[...e.tiles,t]}))}},children:t})}function _(){let e=(0,a.useContext)(p);if(void 0===e)throw Error("useGameContext must be used within a GameProvider");return e}},8887:function(e,t,n){"use strict";n.d(t,{I:function(){return o},InterfaceProvider:function(){return s}});var i=n(7437),a=n(2265);let r=(0,a.createContext)(void 0);function s(e){let{children:t}=e,[n,s]=(0,a.useState)(void 0);return(0,i.jsx)(r.Provider,{value:{tileSelected:n,selectTile:e=>{s(e)}},children:t})}function o(){let e=(0,a.useContext)(r);if(void 0===e)throw Error("useInterface must be used within a InterfaceProvider");return e}},4235:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});let i=[{name:"Increased Value",iconName:"coin",value:1.5,priceChange:1.1},{name:"Half Growth Time",iconName:"clock",value:.5,priceChange:1.2},{name:"Double Amount",iconName:"double",value:2,priceChange:1.4}],a=()=>i[Math.floor(Math.random()*i.length)],r=e=>{let t=[];for(;t.length<e;){let e=a();t.some(t=>t.name===e.name)||t.push(e)}return t};class s{applyRandomMutations(){let e=Math.floor(100*Math.random())+1;if(e>=1&&e<=85);else if(e>85&&e<=94){let e=r(1);this.mutations.push(...e)}else if(e>94&&e<=98){let e=r(2);this.mutations.push(...e)}else if(e>98&&e<=100){let e=r(3);this.mutations.push(...e)}this.mutations.forEach(e=>{"Increased Value"===e.name?(this.value=this.value*e.value,this.price=Math.floor(this.price*e.priceChange)):"Half Growth Time"===e.name?(this.growthDuration=this.growthDuration*e.value,this.price=Math.floor(this.price*e.priceChange)):"Double Amount"===e.name&&(this.value=this.value*e.value,this.price=Math.floor(this.price*e.priceChange))})}plant(){let e=new Date().getTime();this.growthTimeStart=e,this.growthTimeEnd=e+this.growthDuration}constructor(e,t,n,i,a,r=!1){this.growthTimeStart=0,this.growthTimeEnd=0,this.mutations=[],this.name=e,this.imageName=t,this.value=n,this.price=i,this.growthDuration=a,r&&this.applyRandomMutations()}}var o=s},8518:function(e){e.exports={container:"page_container__jZF7q",versionLabel:"page_versionLabel__DuOAv"}},1591:function(e){e.exports={button:"ChangelogModal_button__Gcue9"}},4060:function(e){e.exports={container:"ChangelogEntry_container__2sFMU"}},8869:function(e){e.exports={list:"ChangesList_list__RtbNc",link:"ChangesList_link__R3eQU"}},5088:function(e){e.exports={container:"ModalContent_container__aRw4c",entriesList:"ModalContent_entriesList__URkbg"}},5508:function(e){e.exports={container:"FarmTile_container__Jt50f",tileSelectable:"FarmTile_tileSelectable__4nDd5"}},9447:function(e){e.exports={container:"NewFarmTile_container__Uwz0j",newTileImage:"NewFarmTile_newTileImage__a_RBs",priceLabel:"NewFarmTile_priceLabel__JYXfM"}},9623:function(e){e.exports={container:"PlantedCrop_container__nbaX1",cropStageImage:"PlantedCrop_cropStageImage__7cJOX",cropSelectable:"PlantedCrop_cropSelectable__M5htV",rarityStarsContainer:"PlantedCrop_rarityStarsContainer__7i3Cm",rarityStar:"PlantedCrop_rarityStar__rWXa7"}},722:function(e){e.exports={container:"TimeCounter_container__mW_hG",timeLabel:"TimeCounter_timeLabel__hJGdl"}},7422:function(e){e.exports={container:"TilesContainer_container___D7Ju"}},8347:function(e){e.exports={container:"Modal_container__RemtS",closeButton:"Modal_closeButton__mazsw"}},7573:function(e){e.exports={container:"BottomMenu_container__IDyDD",shopContainer:"BottomMenu_shopContainer__qhcPG"}},1533:function(e){e.exports={container:"ShopItem_container__K9V7W",buyPriceLabel:"ShopItem_buyPriceLabel__N3c0L",sellPriceLabel:"ShopItem_sellPriceLabel__Ek6rg",shopItem:"ShopItem_shopItem__EHMzV",rarityLabel:"ShopItem_rarityLabel__JLs_a",durationLabel:"ShopItem_durationLabel___7mLa"}},5033:function(e){e.exports={container:"GameScreen_container__8iGpF"}},1346:function(e){e.exports={container:"Header_container__Dp53H",moneyBackground:"Header_moneyBackground__bA4fV",moneyAmountNumber:"Header_moneyAmountNumber__MbLI_",actionsContainer:"Header_actionsContainer__KXm3I"}},1263:function(e){e.exports={container:"LoadingScreen_container__6XZWe",containerInner:"LoadingScreen_containerInner__sR7tI",logo:"LoadingScreen_logo__bFQtY",loader:"LoadingScreen_loader__sfr98","l20-1":"LoadingScreen_l20-1__7iJd0","l20-2":"LoadingScreen_l20-2__4ik0Q"}}},function(e){e.O(0,[792,819,971,23,744],function(){return e(e.s=1233)}),_N_E=e.O()}]);