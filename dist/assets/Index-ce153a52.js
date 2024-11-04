import{k as s,q as u,o as C,x as S,r as g,a as B,b as E,w as r,d as e,e as o,u as h,y as L,z as M,t as y,R as _}from"./index-3f1fe31d.js";import{_ as N}from"./AdminLayout-b49adfa0.js";import{d as P}from"./domain-32530300.js";import{_ as U}from"./ConfirmDelete-84324153.js";/* empty css                */const j={class:"w-full"},A={class:"relative"},O={class:"bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg"},R={class:"flex justify-between items-center"},$=e("div",{class:"bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg"},[e("i",{class:"fa-solid fa-plus"}),e("p",null,"Add Domain")],-1),q={class:"grid grid-cols-1 py-2"},z={class:"line-clamp-2"},I={class:"py-2"},T={class:""},F={class:"flex gap-3 items-center justify-center text-xs"},G=e("div",{class:"flex gap-2 items-center text-white bg-secondary-2 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer"},[e("i",{class:"fa-solid fa-pen"}),e("p",null,"Edit")],-1),Y={__name:"Index",setup(H){const l=P(),c=s([]),f=s(!1);s([]);const i=s(""),d=s(1),v=s(10),b=[{key:"domain_name",title:"Product Name"},{key:"user",title:"Owner"},{key:"start_date",title:"Start Date"},{key:"expired_date",title:"Expired Date"},{key:"id",title:"Action",align:"center"}],k=u(()=>c.value.filter(n=>n.domain_name.toLowerCase().includes(i.value))),x=u(()=>Math.ceil(k.value.length/v.value));C(async()=>{await l.getData(),p()});async function p(){c.value=l.domains}const w=async n=>{await l.deleteData(n,f)};return S(()=>{p()}),(n,a)=>{const D=g("v-data-table"),V=g("v-pagination");return B(),E(N,{title:"List Of Domains"},{default:r(()=>[e("div",j,[e("div",A,[e("div",O,[e("div",R,[o(h(_),{to:{name:"domain.create"}},{default:r(()=>[$]),_:1}),L(e("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=t=>i.value=t),class:"rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white",placeholder:"Search Domain"},null,512),[[M,i.value]])]),o(D,{page:d.value,"onUpdate:page":a[1]||(a[1]=t=>d.value=t),search:i.value,headers:b,items:c.value,"hide-default-footer":"","header-props":{class:"dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30"},"item-key":"id",class:"border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"},{"item.name":r(({item:t})=>[e("div",q,[e("p",z,y(t.name),1)])]),"item.user":r(({item:t})=>{var m;return[e("div",I,[e("p",T,y((m=t.user)==null?void 0:m.name),1)])]}),"item.id":r(({item:t})=>[e("div",F,[o(h(_),{to:{name:"domain.edit",params:{id:t.id}}},{default:r(()=>[G]),_:2},1032,["to"]),o(U,{type:"Domain",id:t.id,method:w},null,8,["id"])])]),_:1},8,["page","search","items"]),o(V,{modelValue:d.value,"onUpdate:modelValue":a[2]||(a[2]=t=>d.value=t),length:x.value,"next-icon":"fa-solid fa-chevron-right","prev-icon":"fa-solid fa-chevron-left",class:"bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white","total-visible":5},null,8,["modelValue","length"])])])])]),_:1})}}};export{Y as default};