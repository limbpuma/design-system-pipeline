import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as o,R as I}from"./index-B2-qRKKC.js";import{c as ke,a as J,u as U,b as ue,P as D,d as w,e as me,f as Ve,g as Me}from"./index-D4s1UqAV.js";import{c as O,a as pe}from"./utils-JCLedEej.js";import{C as z,a as B,b as H,c as K,d as $}from"./Card-CUxG4HiN.js";import{B as Le}from"./Button-CZ993yF8.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-kS-9iBlu.js";function ee(t){const a=Oe(t),r=o.forwardRef((s,n)=>{const{children:l,...i}=s,d=o.Children.toArray(l),b=d.find(Ge);if(b){const p=b.props.children,c=d.map(m=>m===b?o.Children.count(p)>1?o.Children.only(null):o.isValidElement(p)?p.props.children:null:m);return e.jsx(a,{...i,ref:n,children:o.isValidElement(p)?o.cloneElement(p,void 0,c):null})}return e.jsx(a,{...i,ref:n,children:l})});return r.displayName=`${t}.Slot`,r}function Oe(t){const a=o.forwardRef((r,s)=>{const{children:n,...l}=r;if(o.isValidElement(n)){const i=Be(n),d=ze(l,n.props);return n.type!==o.Fragment&&(d.ref=s?ke(s,i):i),o.cloneElement(n,d)}return o.Children.count(n)>1?o.Children.only(null):null});return a.displayName=`${t}.SlotClone`,a}var We=Symbol("radix.slottable");function Ge(t){return o.isValidElement(t)&&typeof t.type=="function"&&"__radixId"in t.type&&t.type.__radixId===We}function ze(t,a){const r={...a};for(const s in a){const n=t[s],l=a[s];/^on[A-Z]/.test(s)?n&&l?r[s]=(...d)=>{const b=l(...d);return n(...d),b}:n&&(r[s]=n):s==="style"?r[s]={...n,...l}:s==="className"&&(r[s]=[n,l].filter(Boolean).join(" "))}return{...t,...r}}function Be(t){var s,n;let a=(s=Object.getOwnPropertyDescriptor(t.props,"ref"))==null?void 0:s.get,r=a&&"isReactWarning"in a&&a.isReactWarning;return r?t.ref:(a=(n=Object.getOwnPropertyDescriptor(t,"ref"))==null?void 0:n.get,r=a&&"isReactWarning"in a&&a.isReactWarning,r?t.props.ref:t.props.ref||t.ref)}function He(t){const a=t+"CollectionProvider",[r,s]=J(a),[n,l]=r(a,{collectionRef:{current:null},itemMap:new Map}),i=y=>{const{scope:u,children:x}=y,C=I.useRef(null),f=I.useRef(new Map).current;return e.jsx(n,{scope:u,itemMap:f,collectionRef:C,children:x})};i.displayName=a;const d=t+"CollectionSlot",b=ee(d),p=I.forwardRef((y,u)=>{const{scope:x,children:C}=y,f=l(d,x),v=U(u,f.collectionRef);return e.jsx(b,{ref:v,children:C})});p.displayName=d;const c=t+"CollectionItemSlot",m="data-radix-collection-item",g=ee(c),j=I.forwardRef((y,u)=>{const{scope:x,children:C,...f}=y,v=I.useRef(null),E=U(u,v),F=l(c,x);return I.useEffect(()=>(F.itemMap.set(v,{ref:v,...f}),()=>void F.itemMap.delete(v))),e.jsx(g,{[m]:"",ref:E,children:C})});j.displayName=c;function S(y){const u=l(t+"CollectionConsumer",y);return I.useCallback(()=>{const C=u.collectionRef.current;if(!C)return[];const f=Array.from(C.querySelectorAll(`[${m}]`));return Array.from(u.itemMap.values()).sort((F,k)=>f.indexOf(F.ref.current)-f.indexOf(k.ref.current))},[u.collectionRef,u.itemMap])}return[{Provider:i,Slot:p,ItemSlot:j},S,s]}var Ke=o.createContext(void 0);function fe(t){const a=o.useContext(Ke);return t||a||"ltr"}var q="rovingFocusGroup.onEntryFocus",$e={bubbles:!1,cancelable:!0},P="RovingFocusGroup",[Y,be,qe]=He(P),[Ue,ve]=J(P,[qe]),[Ye,Je]=Ue(P),xe=o.forwardRef((t,a)=>e.jsx(Y.Provider,{scope:t.__scopeRovingFocusGroup,children:e.jsx(Y.Slot,{scope:t.__scopeRovingFocusGroup,children:e.jsx(Ze,{...t,ref:a})})}));xe.displayName=P;var Ze=o.forwardRef((t,a)=>{const{__scopeRovingFocusGroup:r,orientation:s,loop:n=!1,dir:l,currentTabStopId:i,defaultCurrentTabStopId:d,onCurrentTabStopIdChange:b,onEntryFocus:p,preventScrollOnEntryFocus:c=!1,...m}=t,g=o.useRef(null),j=U(a,g),S=fe(l),[y,u]=me({prop:i,defaultProp:d??null,onChange:b,caller:P}),[x,C]=o.useState(!1),f=Ve(p),v=be(r),E=o.useRef(!1),[F,k]=o.useState(0);return o.useEffect(()=>{const h=g.current;if(h)return h.addEventListener(q,f),()=>h.removeEventListener(q,f)},[f]),e.jsx(Ye,{scope:r,orientation:s,dir:S,loop:n,currentTabStopId:y,onItemFocus:o.useCallback(h=>u(h),[u]),onItemShiftTab:o.useCallback(()=>C(!0),[]),onFocusableItemAdd:o.useCallback(()=>k(h=>h+1),[]),onFocusableItemRemove:o.useCallback(()=>k(h=>h-1),[]),children:e.jsx(D.div,{tabIndex:x||F===0?-1:0,"data-orientation":s,...m,ref:j,style:{outline:"none",...t.style},onMouseDown:w(t.onMouseDown,()=>{E.current=!0}),onFocus:w(t.onFocus,h=>{const Fe=!E.current;if(h.target===h.currentTarget&&Fe&&!x){const X=new CustomEvent(q,$e);if(h.currentTarget.dispatchEvent(X),!X.defaultPrevented){const G=v().filter(_=>_.focusable),Ae=G.find(_=>_.active),De=G.find(_=>_.id===y),Pe=[Ae,De,...G].filter(Boolean).map(_=>_.ref.current);ye(Pe,c)}}E.current=!1}),onBlur:w(t.onBlur,()=>C(!1))})})}),ge="RovingFocusGroupItem",he=o.forwardRef((t,a)=>{const{__scopeRovingFocusGroup:r,focusable:s=!0,active:n=!1,tabStopId:l,children:i,...d}=t,b=ue(),p=l||b,c=Je(ge,r),m=c.currentTabStopId===p,g=be(r),{onFocusableItemAdd:j,onFocusableItemRemove:S,currentTabStopId:y}=c;return o.useEffect(()=>{if(s)return j(),()=>S()},[s,j,S]),e.jsx(Y.ItemSlot,{scope:r,id:p,focusable:s,active:n,children:e.jsx(D.span,{tabIndex:m?0:-1,"data-orientation":c.orientation,...d,ref:a,onMouseDown:w(t.onMouseDown,u=>{s?c.onItemFocus(p):u.preventDefault()}),onFocus:w(t.onFocus,()=>c.onItemFocus(p)),onKeyDown:w(t.onKeyDown,u=>{if(u.key==="Tab"&&u.shiftKey){c.onItemShiftTab();return}if(u.target!==u.currentTarget)return;const x=et(u,c.orientation,c.dir);if(x!==void 0){if(u.metaKey||u.ctrlKey||u.altKey||u.shiftKey)return;u.preventDefault();let f=g().filter(v=>v.focusable).map(v=>v.ref.current);if(x==="last")f.reverse();else if(x==="prev"||x==="next"){x==="prev"&&f.reverse();const v=f.indexOf(u.currentTarget);f=c.loop?tt(f,v+1):f.slice(v+1)}setTimeout(()=>ye(f))}}),children:typeof i=="function"?i({isCurrentTabStop:m,hasTabStop:y!=null}):i})})});he.displayName=ge;var Qe={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function Xe(t,a){return a!=="rtl"?t:t==="ArrowLeft"?"ArrowRight":t==="ArrowRight"?"ArrowLeft":t}function et(t,a,r){const s=Xe(t.key,r);if(!(a==="vertical"&&["ArrowLeft","ArrowRight"].includes(s))&&!(a==="horizontal"&&["ArrowUp","ArrowDown"].includes(s)))return Qe[s]}function ye(t,a=!1){const r=document.activeElement;for(const s of t)if(s===r||(s.focus({preventScroll:a}),document.activeElement!==r))return}function tt(t,a){return t.map((r,s)=>t[(a+s)%t.length])}var at=xe,st=he,W="Tabs",[rt]=J(W,[ve]),Ce=ve(),[nt,Z]=rt(W),Te=o.forwardRef((t,a)=>{const{__scopeTabs:r,value:s,onValueChange:n,defaultValue:l,orientation:i="horizontal",dir:d,activationMode:b="automatic",...p}=t,c=fe(d),[m,g]=me({prop:s,onChange:n,defaultProp:l??"",caller:W});return e.jsx(nt,{scope:r,baseId:ue(),value:m,onValueChange:g,orientation:i,dir:c,activationMode:b,children:e.jsx(D.div,{dir:c,"data-orientation":i,...p,ref:a})})});Te.displayName=W;var Ne="TabsList",we=o.forwardRef((t,a)=>{const{__scopeTabs:r,loop:s=!0,...n}=t,l=Z(Ne,r),i=Ce(r);return e.jsx(at,{asChild:!0,...i,orientation:l.orientation,dir:l.dir,loop:s,children:e.jsx(D.div,{role:"tablist","aria-orientation":l.orientation,...n,ref:a})})});we.displayName=Ne;var je="TabsTrigger",_e=o.forwardRef((t,a)=>{const{__scopeTabs:r,value:s,disabled:n=!1,...l}=t,i=Z(je,r),d=Ce(r),b=Se(i.baseId,s),p=Ee(i.baseId,s),c=s===i.value;return e.jsx(st,{asChild:!0,...d,focusable:!n,active:c,children:e.jsx(D.button,{type:"button",role:"tab","aria-selected":c,"aria-controls":p,"data-state":c?"active":"inactive","data-disabled":n?"":void 0,disabled:n,id:b,...l,ref:a,onMouseDown:w(t.onMouseDown,m=>{!n&&m.button===0&&m.ctrlKey===!1?i.onValueChange(s):m.preventDefault()}),onKeyDown:w(t.onKeyDown,m=>{[" ","Enter"].includes(m.key)&&i.onValueChange(s)}),onFocus:w(t.onFocus,()=>{const m=i.activationMode!=="manual";!c&&!n&&m&&i.onValueChange(s)})})})});_e.displayName=je;var Ie="TabsContent",Re=o.forwardRef((t,a)=>{const{__scopeTabs:r,value:s,forceMount:n,children:l,...i}=t,d=Z(Ie,r),b=Se(d.baseId,s),p=Ee(d.baseId,s),c=s===d.value,m=o.useRef(c);return o.useEffect(()=>{const g=requestAnimationFrame(()=>m.current=!1);return()=>cancelAnimationFrame(g)},[]),e.jsx(Me,{present:n||c,children:({present:g})=>e.jsx(D.div,{"data-state":c?"active":"inactive","data-orientation":d.orientation,role:"tabpanel","aria-labelledby":b,hidden:!g,id:p,tabIndex:0,...i,ref:a,style:{...t.style,animationDuration:m.current?"0s":void 0},children:g&&l})})});Re.displayName=Ie;function Se(t,a){return`${t}-trigger-${a}`}function Ee(t,a){return`${t}-content-${a}`}var ot=Te,lt=we,it=_e,ct=Re;const dt=pe("inline-flex items-center gap-1",{variants:{variant:{default:["p-1 rounded-lg","bg-slate-100 dark:bg-slate-800"],underline:["border-b border-slate-200 dark:border-slate-700","gap-0"],pills:["gap-2"],enclosed:["border-b border-slate-200 dark:border-slate-700","gap-0"]},size:{sm:"text-sm",md:"text-sm",lg:"text-base"},fullWidth:{true:"w-full",false:""}},defaultVariants:{variant:"default",size:"md",fullWidth:!1}}),ut=pe(["inline-flex items-center justify-center gap-2 whitespace-nowrap","font-medium transition-all duration-200","focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2","disabled:pointer-events-none disabled:opacity-50"],{variants:{variant:{default:["px-3 py-1.5 rounded-md","text-slate-600 dark:text-slate-400","hover:text-slate-900 dark:hover:text-slate-100","data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900","data-[state=active]:text-slate-900 dark:data-[state=active]:text-white","data-[state=active]:shadow-sm"],underline:["px-4 py-2.5 -mb-px","text-slate-600 dark:text-slate-400","hover:text-slate-900 dark:hover:text-slate-100","border-b-2 border-transparent","data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400","data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400"],pills:["px-4 py-2 rounded-full","text-slate-600 dark:text-slate-400","hover:bg-slate-100 dark:hover:bg-slate-800","hover:text-slate-900 dark:hover:text-slate-100","data-[state=active]:bg-blue-600 dark:data-[state=active]:bg-blue-500","data-[state=active]:text-white","data-[state=active]:shadow-md data-[state=active]:shadow-blue-500/25"],enclosed:["px-4 py-2.5 -mb-px rounded-t-lg","text-slate-600 dark:text-slate-400","border border-transparent","hover:text-slate-900 dark:hover:text-slate-100","data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900","data-[state=active]:text-slate-900 dark:data-[state=active]:text-white","data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-700","data-[state=active]:border-b-white dark:data-[state=active]:border-b-slate-900"]},size:{sm:"text-xs",md:"text-sm",lg:"text-base"},fullWidth:{true:"flex-1",false:""}},defaultVariants:{variant:"default",size:"md",fullWidth:!1}}),Q=o.createContext({variant:"default",size:"md",fullWidth:!1}),R=o.forwardRef(({variant:t="default",size:a="md",fullWidth:r=!1,children:s,...n},l)=>e.jsx(Q.Provider,{value:{variant:t??"default",size:a??"md",fullWidth:r??!1},children:e.jsx(ot,{ref:l,...n,children:s})}));R.displayName="Tabs";const A=o.forwardRef(({className:t,...a},r)=>{const{variant:s,size:n,fullWidth:l}=o.useContext(Q);return e.jsx(lt,{ref:r,className:O(dt({variant:s,size:n,fullWidth:l}),t),...a})});A.displayName="TabsList";const T=o.forwardRef(({className:t,icon:a,badge:r,children:s,...n},l)=>{const{variant:i,size:d,fullWidth:b}=o.useContext(Q);return e.jsxs(it,{ref:l,className:O(ut({variant:i,size:d,fullWidth:b}),t),...n,children:[a&&e.jsx("span",{className:"flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4","aria-hidden":"true",children:a}),e.jsx("span",{children:s}),r&&e.jsx("span",{className:O("ml-1 flex-shrink-0 min-w-[1.25rem] px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-none",i==="pills"?"bg-white/20 text-current":"bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"),children:r})]})});T.displayName="TabsTrigger";const N=o.forwardRef(({className:t,...a},r)=>e.jsx(ct,{ref:r,className:O("mt-4","focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2","data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2","data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0","duration-200",t),...a}));N.displayName="TabsContent";const te=N;try{R.displayName="Tabs",R.__docgenInfo={description:"",displayName:"Tabs",props:{fullWidth:{defaultValue:{value:"false"},description:"",name:"fullWidth",required:!1,type:{name:"boolean"}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},variant:{defaultValue:{value:"default"},description:"",name:"variant",required:!1,type:{name:'"default" | "underline" | "pills" | "enclosed" | null'}},size:{defaultValue:{value:"md"},description:"",name:"size",required:!1,type:{name:'"sm" | "md" | "lg" | null'}}}}}catch{}try{A.displayName="TabsList",A.__docgenInfo={description:"",displayName:"TabsList",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{T.displayName="TabsTrigger",T.__docgenInfo={description:"",displayName:"TabsTrigger",props:{icon:{defaultValue:null,description:"Icon to display before the label",name:"icon",required:!1,type:{name:"ReactNode"}},badge:{defaultValue:null,description:"Badge/count to display after the label",name:"badge",required:!1,type:{name:"ReactNode"}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{N.displayName="TabsContent",N.__docgenInfo={description:"",displayName:"TabsContent",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{te.displayName="TabsPanel",te.__docgenInfo={description:"",displayName:"TabsPanel",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}const Ct={title:"Components/Tabs",component:R,parameters:{layout:"centered",docs:{description:{component:"An accessible tabbed interface built on Radix UI with keyboard navigation."}}},tags:["autodocs"]},V={render:()=>e.jsxs(R,{defaultValue:"tab1",className:"w-[400px]",children:[e.jsxs(A,{children:[e.jsx(T,{value:"tab1",children:"Account"}),e.jsx(T,{value:"tab2",children:"Password"}),e.jsx(T,{value:"tab3",children:"Settings"})]}),e.jsx(N,{value:"tab1",children:e.jsxs(z,{children:[e.jsxs(B,{children:[e.jsx(H,{children:"Account"}),e.jsx(K,{children:"Make changes to your account here."})]}),e.jsxs($,{className:"space-y-2",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{htmlFor:"name",className:"text-sm font-medium",children:"Name"}),e.jsx("input",{id:"name",defaultValue:"John Doe",className:"w-full px-3 py-2 border rounded-md"})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{htmlFor:"email",className:"text-sm font-medium",children:"Email"}),e.jsx("input",{id:"email",defaultValue:"john@example.com",className:"w-full px-3 py-2 border rounded-md"})]})]})]})}),e.jsx(N,{value:"tab2",children:e.jsxs(z,{children:[e.jsxs(B,{children:[e.jsx(H,{children:"Password"}),e.jsx(K,{children:"Change your password here."})]}),e.jsxs($,{className:"space-y-2",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{htmlFor:"current",className:"text-sm font-medium",children:"Current password"}),e.jsx("input",{id:"current",type:"password",className:"w-full px-3 py-2 border rounded-md"})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{htmlFor:"new",className:"text-sm font-medium",children:"New password"}),e.jsx("input",{id:"new",type:"password",className:"w-full px-3 py-2 border rounded-md"})]})]})]})}),e.jsx(N,{value:"tab3",children:e.jsxs(z,{children:[e.jsxs(B,{children:[e.jsx(H,{children:"Settings"}),e.jsx(K,{children:"Configure your preferences."})]}),e.jsx($,{children:e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"checkbox",id:"notifications",className:"rounded"}),e.jsx("label",{htmlFor:"notifications",className:"text-sm",children:"Enable notifications"})]})})]})})]})},M={render:()=>e.jsxs(R,{defaultValue:"overview",className:"w-[500px]",children:[e.jsxs(A,{className:"grid w-full grid-cols-3",children:[e.jsx(T,{value:"overview",children:"Overview"}),e.jsx(T,{value:"analytics",children:"Analytics"}),e.jsx(T,{value:"reports",children:"Reports"})]}),e.jsxs(N,{value:"overview",className:"p-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Dashboard Overview"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Welcome to your dashboard. Here you can see a summary of your account activity."}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 mt-4",children:[e.jsxs("div",{className:"p-4 bg-blue-50 rounded-lg",children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Total Users"}),e.jsx("p",{className:"text-2xl font-bold",children:"1,234"})]}),e.jsxs("div",{className:"p-4 bg-green-50 rounded-lg",children:[e.jsx("p",{className:"text-sm text-gray-600",children:"Revenue"}),e.jsx("p",{className:"text-2xl font-bold",children:"$12,345"})]})]})]}),e.jsxs(N,{value:"analytics",className:"p-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Analytics"}),e.jsx("p",{className:"text-sm text-gray-600",children:"View detailed analytics about your performance."}),e.jsx("div",{className:"h-32 bg-gray-100 rounded-lg mt-4 flex items-center justify-center text-gray-400",children:"Chart placeholder"})]}),e.jsxs(N,{value:"reports",className:"p-4",children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Reports"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Download and manage your reports."}),e.jsx("div",{className:"mt-4",children:e.jsx(Le,{variant:"outline",size:"sm",children:"Download Report"})})]})]})},L={render:()=>e.jsxs(R,{defaultValue:"music",className:"w-[300px]",children:[e.jsxs(A,{children:[e.jsx(T,{value:"music",children:"Music"}),e.jsx(T,{value:"podcasts",children:"Podcasts"}),e.jsx(T,{value:"live",disabled:!0,children:"Live"})]}),e.jsx(N,{value:"music",className:"p-4 text-sm",children:"Listen to your favorite music."}),e.jsx(N,{value:"podcasts",className:"p-4 text-sm",children:"Discover new podcasts."})]})};var ae,se,re;V.parameters={...V.parameters,docs:{...(ae=V.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input id="name" defaultValue="John Doe" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input id="email" defaultValue="john@example.com" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab2">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="current" className="text-sm font-medium">Current password</label>
              <input id="current" type="password" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-1">
              <label htmlFor="new" className="text-sm font-medium">New password</label>
              <input id="new" type="password" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab3">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure your preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="notifications" className="rounded" />
              <label htmlFor="notifications" className="text-sm">Enable notifications</label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
}`,...(re=(se=V.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};var ne,oe,le;M.parameters={...M.parameters,docs:{...(ne=M.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4">
        <h3 className="text-lg font-semibold mb-2">Dashboard Overview</h3>
        <p className="text-sm text-gray-600">
          Welcome to your dashboard. Here you can see a summary of your account activity.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="text-2xl font-bold">$12,345</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="p-4">
        <h3 className="text-lg font-semibold mb-2">Analytics</h3>
        <p className="text-sm text-gray-600">
          View detailed analytics about your performance.
        </p>
        <div className="h-32 bg-gray-100 rounded-lg mt-4 flex items-center justify-center text-gray-400">
          Chart placeholder
        </div>
      </TabsContent>
      <TabsContent value="reports" className="p-4">
        <h3 className="text-lg font-semibold mb-2">Reports</h3>
        <p className="text-sm text-gray-600">
          Download and manage your reports.
        </p>
        <div className="mt-4">
          <Button variant="outline" size="sm">Download Report</Button>
        </div>
      </TabsContent>
    </Tabs>
}`,...(le=(oe=M.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var ie,ce,de;L.parameters={...L.parameters,docs:{...(ie=L.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="music" className="w-[300px]">
      <TabsList>
        <TabsTrigger value="music">Music</TabsTrigger>
        <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
        <TabsTrigger value="live" disabled>Live</TabsTrigger>
      </TabsList>
      <TabsContent value="music" className="p-4 text-sm">
        Listen to your favorite music.
      </TabsContent>
      <TabsContent value="podcasts" className="p-4 text-sm">
        Discover new podcasts.
      </TabsContent>
    </Tabs>
}`,...(de=(ce=L.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};const Tt=["Default","WithContent","Minimal"];export{V as Default,L as Minimal,M as WithContent,Tt as __namedExportsOrder,Ct as default};
