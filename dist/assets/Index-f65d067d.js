import{k as r,q as g,o as P,x as V,r as u,a as D,b as C,w as l,d as e,e as s,u as m,y as B,z as L,R as h}from"./index-3f1fe31d.js";import{_ as M}from"./AdminLayout-b49adfa0.js";import{p as N}from"./package-da35992e.js";import{_ as U}from"./ConfirmDelete-84324153.js";/* empty css                */const j={class:"w-full"},A={class:"relative"},E={class:"bg-light-primary-1 dark:bg-dark-primary-2 p-5 rounded-lg space-y-3 shadow-lg"},R={class:"flex justify-between items-center"},S=e("div",{class:"bg-secondary-3 text-white hover:bg-opacity-90 px-4 py-2 rounded-lg gap-1 flex items-center text-sm cursor-pointer shadow-lg"},[e("i",{class:"fa-solid fa-plus"}),e("p",null,"Add Package")],-1),$={class:"flex gap-3 items-center justify-center text-xs"},q=e("div",{class:"flex gap-2 items-center text-white bg-secondary-2 hover:bg-opacity-90 rounded-lg px-3 py-1 cursor-pointer"},[e("i",{class:"fa-solid fa-pen"}),e("p",null,"Edit")],-1),H={__name:"Index",setup(z){const n=N(),c=r([]),f=r(!1),o=r(""),i=r(1),y=r(10),k=[{key:"package_name",title:"Package Name"},{key:"id",title:"Action",align:"center"}],v=g(()=>c.value.filter(d=>d.package_name.toLowerCase().includes(o.value))),_=g(()=>Math.ceil(v.value.length/y.value));P(async()=>{await n.getData(),p()});async function p(){c.value=n.packages}const b=async d=>{await n.deleteData(d,f)};return V(()=>{p()}),(d,t)=>{const x=u("v-data-table"),w=u("v-pagination");return D(),C(M,{title:"List Of Packages"},{default:l(()=>[e("div",j,[e("div",A,[e("div",E,[e("div",R,[s(m(h),{to:{name:"admin.package.create"}},{default:l(()=>[S]),_:1}),B(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=a=>o.value=a),class:"rounded-lg text-sm min-w-52 dark:!border-gray-500 border !border-typography-2/20 shadow-lg bg-light-primary-1 dark:bg-dark-primary-1 text-typography-3 dark:text-white",placeholder:"Search Package"},null,512),[[L,o.value]])]),s(x,{page:i.value,"onUpdate:page":t[1]||(t[1]=a=>i.value=a),search:o.value,headers:k,items:c.value,"hide-default-footer":"","header-props":{class:"dark:bg-dark-primary-1 bg-light-primary-2 dark:!text-white border-b dark:!border-white/30"},"item-key":"id",class:"border dark:!border-typography-2/20 shadow-lg dark:!bg-dark-primary-1 !bg-light-primary-2 dark:!text-typography-1"},{"item.id":l(({item:a})=>[e("div",$,[s(m(h),{to:{name:"admin.package.edit",params:{id:a.id}}},{default:l(()=>[q]),_:2},1032,["to"]),s(U,{type:"Package",id:a.id,method:b},null,8,["id"])])]),_:1},8,["page","search","items"]),s(w,{modelValue:i.value,"onUpdate:modelValue":t[2]||(t[2]=a=>i.value=a),length:_.value,"next-icon":"fa-solid fa-chevron-right","prev-icon":"fa-solid fa-chevron-left",class:"bg-light-primary-2 border !border-typography-2/20 shadow-lg rounded-lg dark:bg-dark-primary-1 dark:text-white","total-visible":5},null,8,["modelValue","length"])])])])]),_:1})}}};export{H as default};
