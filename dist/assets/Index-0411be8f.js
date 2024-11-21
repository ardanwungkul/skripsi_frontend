import{k as o,q as v,o as A,x as B,r as d,a as f,b,w as s,d as a,y as G,z as I,e as i,t as M,G as E,u as L,m as $}from"./index-638c9339.js";import{_ as j}from"./AdminLayout-4c7d2b0c.js";/* empty css                */import{o as q}from"./order-a3c3f2f7.js";import{s as z}from"./vue-multiselect.esm-209dc6fc.js";/* empty css                        */import{u as F}from"./user-63e47d30.js";const R={class:"w-full"},T={class:"relative"},H={class:"bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg"},J={class:"flex justify-between items-center"},K={class:"whitespace-nowrap"},Q=a("p",null,"Progress",-1),W=a("i",{class:"fa-solid fa-arrow-right"},null,-1),X=[Q,W],Y={class:"p-3 space-y-3"},Z=["onClick"],de={__name:"Index",setup(ee){const c=q(),m=F(),p=o([]),g=o([]),u=o(null),k=o(!1),l=o(""),n=o(1),w=o(10),x=[{key:"order_code",title:"Order Code"},{key:"user.name",title:"User Name"},{key:"domain_name",title:"Domain Name"},{key:"amount",title:"Amount"},{key:"status_payment",title:"Status Payment"},{key:"status_order",title:"Status Order"},{key:"id",title:"Action"}],D=v(()=>p.value.filter(r=>r.order_code.toLowerCase().includes(l.value))),V=v(()=>Math.ceil(D.value.length/w.value));A(async()=>{await c.getData(),await m.getData(),g.value=m.users.filter(r=>r.role=="support"),h()});async function h(){p.value=c.orders}function P(r){return r.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}const C=async r=>{const e=new FormData;e.append("order_id",r.id),e.append("user_id",u.value.id),await c.process(e,k)};return B(()=>{h()}),(r,e)=>{const S=d("v-card"),U=d("v-dialog"),N=d("v-data-table"),O=d("v-pagination");return f(),b(j,{title:"List Of Orders"},{default:s(()=>[a("div",R,[a("div",T,[a("div",H,[a("div",J,[G(a("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>l.value=t),class:"rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white",placeholder:"Search Order"},null,512),[[I,l.value]])]),i(N,{page:n.value,"onUpdate:page":e[2]||(e[2]=t=>n.value=t),search:l.value,headers:x,items:p.value,"hide-default-footer":"","header-props":{class:"dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30"},"item-key":"id",class:"border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"},{"item.amount":s(({item:t})=>[a("p",K," Rp. "+M(P(t.amount)),1)]),"item.id":s(({item:t})=>[t.status_payment=="PAID"&&t.status_order=="PENDING"?(f(),b(U,{key:0,"max-width":"500"},{activator:s(({props:y})=>[a("button",E(y,{class:"flex gap-2 items-center text-white bg-secondary-3 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer"}),X,16)]),default:s(({isActive:y})=>[i(S,{title:"Give this Assignment to"},{default:s(()=>[a("div",Y,[i(L(z),{modelValue:u.value,"onUpdate:modelValue":e[1]||(e[1]=_=>u.value=_),options:g.value,searchable:!0,"close-on-select":!0,label:"name","track-by":"name","preserve-search":!0,placeholder:"Select User"},null,8,["modelValue","options"]),a("button",{onClick:_=>C(t),class:"bg-secondary-3 px-5 py-1 rounded-lg text-typography-1 shadow-lg hover:bg-opacity-80"}," Process ",8,Z)])]),_:2},1024)]),_:2},1024)):$("",!0)]),_:1},8,["page","search","items"]),i(O,{modelValue:n.value,"onUpdate:modelValue":e[3]||(e[3]=t=>n.value=t),length:V.value,"next-icon":"fa-solid fa-chevron-right","prev-icon":"fa-solid fa-chevron-left",class:"bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white","total-visible":5},null,8,["modelValue","length"])])])])]),_:1})}}};export{de as default};