import{_ as N,r as t,o as g,a as p,B as u,C as y,D as f,G as n,P as V,R as M,F as k,j as r,H as w,S,U as c,M as B}from"./index-CeeqmRIO.js";import{Q as m}from"./QInput-C0kg-8gv.js";import{Q as P}from"./QPage-BHVqYzDk.js";const Q={__name:"TargetPage",setup(x,{expose:a}){a();const o=t(""),s=t(""),l=t("Your Name"),d=t([]),e=t(null);g(()=>{e.value=new WebSocket("ws://localhost:8080"),e.value.onmessage=i=>{const b=JSON.parse(i.data);d.value.push(b)}}),p(()=>{e.value&&e.value.close()});const _={newMessage:o,receiver:s,senderName:l,messages:d,socket:e,sendMessage:()=>{if(o.value.trim()&&s.value.trim()&&l.value.trim()){const i={sender:l.value.trim(),receiver:s.value.trim(),text:o.value.trim()};e.value.send(JSON.stringify(i)),o.value=""}},ref:t,onMounted:g,onUnmounted:p};return Object.defineProperty(_,"__isScriptSetup",{enumerable:!1,value:!0}),_}},T={class:"chat-container"},U={class:"chat-box"},h={class:"message-list"};function C(x,a,o,s,l,d){return u(),y(P,{class:"flex flex-center"},{default:f(()=>[n("div",T,[n("div",U,[n("div",h,[(u(!0),V(k,null,M(s.messages,(e,v)=>(u(),V("div",{key:v,class:"message"},[n("strong",null,c(e.sender)+" to "+c(e.receiver)+":",1),B(" "+c(e.text),1)]))),128))]),r(m,{modelValue:s.newMessage,"onUpdate:modelValue":a[0]||(a[0]=e=>s.newMessage=e),onKeyup:S(s.sendMessage,["enter"]),label:"Type your message",outlined:"","bottom-slots":""},{append:f(()=>[r(w,{onClick:s.sendMessage,color:"primary",icon:"send"})]),_:1},8,["modelValue"]),r(m,{modelValue:s.receiver,"onUpdate:modelValue":a[1]||(a[1]=e=>s.receiver=e),label:"Recipient",outlined:"","bottom-slots":""},null,8,["modelValue"]),r(m,{modelValue:s.senderName,"onUpdate:modelValue":a[2]||(a[2]=e=>s.senderName=e),label:"Your Name",outlined:"","bottom-slots":""},null,8,["modelValue"])])])]),_:1})}const F=N(Q,[["render",C],["__scopeId","data-v-75f9f420"],["__file","TargetPage.vue"]]);export{F as default};