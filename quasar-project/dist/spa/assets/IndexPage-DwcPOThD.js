import{_ as x,B as i,C as d,D as l,G as a,j as e,L as c,M as g,N as y,H as s,O as b}from"./index-CeeqmRIO.js";import{Q as n,a as o,b as m}from"./QCardActions-DUu7N6pJ.js";import{Q as C}from"./QDialog-ClFP_LGy.js";import{Q as w}from"./QPage-BHVqYzDk.js";const _={data(){return{dialogVisible:!1,currentCategory:""}},methods:{showSubcategories(f){this.currentCategory=f,this.dialogVisible=!0}}},N={class:"row flex q-gutter-sm justify-center"};function Q(f,t,V,h,r,p){return i(),d(w,{class:"column flex flex-center q-gutter-sm"},{default:l(()=>[a("div",null,[e(n,{class:"fit column flex flex-center q-gutter-sm"},{default:l(()=>[e(c,{src:"/icons/eye.png"}),t[5]||(t[5]=a("div",{class:"text-h6 text-center"}," Typology of Chinese countryside self built house ",-1)),a("div",N,[e(n,{class:"col-5 cursor-pointer",onClick:t[0]||(t[0]=u=>p.showSubcategories("twoFloors"))},{default:l(()=>[e(o,null,{default:l(()=>[e(c,{src:"/icons/twofloor.png"})]),_:1}),e(o,{class:"text"},{default:l(()=>t[3]||(t[3]=[a("strong",null,"Two floors:",-1),g(" New Chinese style/ European style/ Nordic style /Modern style ")])),_:1})]),_:1}),e(n,{class:"col-5 cursor-pointer",onClick:t[1]||(t[1]=u=>p.showSubcategories("threeFloors"))},{default:l(()=>[e(o,null,{default:l(()=>[e(c,{src:"/icons/threefloor.png"})]),_:1}),e(o,{class:"text"},{default:l(()=>t[4]||(t[4]=[a("strong",null,"Three floors:",-1),g(" Chinese style/New Chinese style/European style/Simple style ")])),_:1})]),_:1})])]),_:1})]),e(C,{modelValue:r.dialogVisible,"onUpdate:modelValue":t[2]||(t[2]=u=>r.dialogVisible=u),"transition-show":"rotate","transition-hide":"rotate"},{default:l(()=>[e(n,null,{default:l(()=>[e(o,null,{default:l(()=>t[6]||(t[6]=[a("div",{class:"text-h6"},"Subcategories",-1)])),_:1}),e(y),r.currentCategory==="twoFloors"?(i(),d(o,{key:0},{default:l(()=>[e(m,{class:"q-gutter-md justify-around row flex flex-center"},{default:l(()=>[e(s,{label:"New Chinese Style",to:"examplepage",class:"col-2"}),e(s,{label:"European style",to:"examplepage",class:"col-2"}),e(s,{label:"Nordic style",to:"examplepage",class:"col-2"}),e(s,{label:"modern style",to:"examplepage",class:"col-2"})]),_:1})]),_:1})):r.currentCategory==="threeFloors"?(i(),d(o,{key:1},{default:l(()=>[e(m,{class:"q-gutter-md justify-around row flex flex-center"},{default:l(()=>[e(s,{label:"New Chinese Style",to:"examplepage",class:"col-2"}),e(s,{label:"European style",to:"examplepage",class:"col-2"}),e(s,{label:"Nordic style",to:"examplepage",class:"col-2"}),e(s,{label:"modern style",to:"examplepage",class:"col-2"})]),_:1})]),_:1})):b("",!0)]),_:1})]),_:1},8,["modelValue"])]),_:1})}const B=x(_,[["render",Q],["__file","IndexPage.vue"]]);export{B as default};