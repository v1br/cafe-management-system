import{o as u,p as d,q as y,t as w,r as i,_ as x,n as e,O as g,M as S,L as j,S as k}from"./components-DsaIHRdB.js";/**
 * @remix-run/react v2.16.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function v({getKey:t,...l}){let{isSpaMode:c}=u(),r=d(),h=y();w({getKey:t,storageKey:a});let p=i.useMemo(()=>{if(!t)return null;let s=t(r,h);return s!==r.key?s:null},[]);if(c)return null;let f=((s,m)=>{if(!window.history.state||!window.history.state.key){let o=Math.random().toString(32).slice(2);window.history.replaceState({key:o},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[m||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(o){console.error(o),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",x({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${f})(${JSON.stringify(a)}, ${JSON.stringify(p)})`}}))}const O=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"},{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"},{rel:"icon",type:"image/png",href:"/icons/Cafe.svg"}];function b({children:t}){return e.jsxs("html",{lang:"en",className:"w-screen overflow-x-hidden",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(S,{}),e.jsx(j,{})]}),e.jsxs("body",{className:"h-fit min-h-screen pb-8 bg-[#FFEFE2] text-[#40312A] overflow-x-hidden overflow-y-auto",children:[t,e.jsx(v,{}),e.jsx(k,{})]})]})}function E(){return e.jsx(g,{})}export{b as Layout,E as default,O as links};
