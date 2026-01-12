import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as d}from"./index-B2-qRKKC.js";import{c as p,a as We}from"./utils-JCLedEej.js";import"./_commonjsHelpers-Cpj98o6Y.js";const G=We("inline-flex items-center gap-1.5 font-medium transition-all",{variants:{status:{verified:["bg-green-100 text-green-900 border-green-300","dark:bg-green-900 dark:text-green-100 dark:border-green-700"].join(" "),caution:["bg-yellow-100 text-yellow-900 border-yellow-300","dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700"].join(" "),alert:["bg-red-100 text-red-900 border-red-300","dark:bg-red-900 dark:text-red-100 dark:border-red-700"].join(" ")},size:{sm:"px-2 py-0.5 text-xs rounded-md border",md:"px-2.5 py-1 text-sm rounded-lg border",lg:"px-3 py-1.5 text-base rounded-lg border-2"},interactive:{true:"cursor-pointer hover:opacity-80",false:""}},defaultVariants:{status:"verified",size:"md",interactive:!1}}),Ie=({className:t})=>e.jsxs("svg",{className:t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("path",{d:"m9 11 3 3L22 4"})]}),Se=({className:t})=>e.jsxs("svg",{className:t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}),e.jsx("path",{d:"M12 9v4"}),e.jsx("path",{d:"M12 17h.01"})]}),Ce=({className:t})=>e.jsxs("svg",{className:t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"m15 9-6 6"}),e.jsx("path",{d:"m9 9 6 6"})]}),De=({className:t})=>e.jsxs("svg",{className:t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}),e.jsx("path",{d:"m9 12 2 2 4-4"})]}),R=({className:t})=>e.jsx("svg",{className:t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:e.jsx("path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"})}),P=({className:t})=>e.jsx("svg",{className:t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:e.jsx("path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"})}),Me=({className:t})=>e.jsxs("svg",{className:t,xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M12 16v-4"}),e.jsx("path",{d:"M12 8h.01"})]});function Be(t){return t>=90?"verified":t>=70?"caution":"alert"}function qe(t){switch(t){case"verified":return{label:"Verified",description:"Authentic images",Icon:Ie};case"caution":return{label:"Review",description:"Needs review",Icon:Se};case"alert":return{label:"Alert",description:"Possible manipulation",Icon:Ce}}}function s({score:t,isAIGenerated:l=!1,isEdited:r=!1,showDetails:o=!1,indicators:z=[],onClick:x,size:c,className:E,showLabel:V=!0}){const[i,C]=d.useState(!1),B=d.useRef(null),_=d.useRef(null),W=d.useRef(null),D=d.useId(),n=Be(t),m=qe(n),M=c==="lg"?"h-5 w-5":c==="sm"?"h-3 w-3":"h-4 w-4",Ee=o||!!x;d.useEffect(()=>{function a(u){B.current&&!B.current.contains(u.target)&&C(!1)}return i&&document.addEventListener("mousedown",a),()=>document.removeEventListener("mousedown",a)},[i]),d.useEffect(()=>{var u;function a(_e){var q;_e.key==="Escape"&&i&&(C(!1),(q=W.current)==null||q.focus())}return i&&(document.addEventListener("keydown",a),(u=_.current)==null||u.focus()),()=>document.removeEventListener("keydown",a)},[i]);const Ve=()=>{o&&C(!i),x==null||x()};return e.jsxs("div",{className:"relative inline-block",ref:B,children:[Ee?e.jsxs("button",{ref:W,type:"button",onClick:Ve,className:p(G({status:n,size:c,interactive:!0}),E),"aria-label":`Authenticity score: ${t}%`,"aria-expanded":o?i:void 0,"aria-haspopup":o?"dialog":void 0,"aria-controls":o&&i?D:void 0,children:[e.jsx(m.Icon,{className:M,"aria-hidden":"true"}),e.jsxs("span",{children:[t,"%"]}),V&&c!=="sm"&&e.jsx("span",{className:"hidden sm:inline",children:m.label})]}):e.jsxs("div",{role:"img",className:p(G({status:n,size:c,interactive:!1}),E),"aria-label":`Authenticity score: ${t}%`,children:[e.jsx(m.Icon,{className:M,"aria-hidden":"true"}),e.jsxs("span",{"aria-hidden":"true",children:[t,"%"]}),V&&c!=="sm"&&e.jsx("span",{className:"hidden sm:inline","aria-hidden":"true",children:m.label})]}),(l||r)&&e.jsxs("div",{className:"absolute -top-1 -right-1 flex gap-0.5",children:[l&&e.jsx("span",{className:"flex items-center justify-center w-4 h-4 bg-purple-500 rounded-full",role:"img","aria-label":"Possibly AI-generated",children:e.jsx(R,{className:"h-2.5 w-2.5 text-white","aria-hidden":"true"})}),r&&e.jsx("span",{className:"flex items-center justify-center w-4 h-4 bg-orange-500 rounded-full",role:"img","aria-label":"Digitally edited",children:e.jsx(P,{className:"h-2.5 w-2.5 text-white","aria-hidden":"true"})})]}),o&&i&&e.jsxs("div",{ref:_,id:D,className:p("absolute z-50 top-full left-0 mt-2","w-72 p-4 rounded-xl","bg-[var(--semantic-color-popover-default)]","border border-[var(--semantic-color-border-default)]","shadow-xl"),role:"dialog","aria-modal":"false","aria-label":`Authenticity details: ${t}% - ${m.description}`,tabIndex:-1,children:[e.jsxs("div",{className:"flex items-center gap-3 pb-3 border-b border-[var(--semantic-color-border-default)]",children:[e.jsx("div",{className:p("flex items-center justify-center w-12 h-12 rounded-full",n==="verified"&&"bg-green-100 dark:bg-green-900",n==="caution"&&"bg-yellow-100 dark:bg-yellow-900",n==="alert"&&"bg-red-100 dark:bg-red-900"),children:e.jsx(De,{"aria-hidden":"true",className:p("h-6 w-6",n==="verified"&&"text-green-700 dark:text-green-200",n==="caution"&&"text-yellow-700 dark:text-yellow-200",n==="alert"&&"text-red-700 dark:text-red-200")})}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-baseline gap-2",children:[e.jsx("span",{className:"text-2xl font-bold",children:t}),e.jsx("span",{className:"text-[var(--semantic-color-muted-foreground)]",children:"/100"})]}),e.jsx("p",{className:"text-sm text-[var(--semantic-color-muted-foreground)]",children:m.description})]})]}),z.length>0&&e.jsx("ul",{className:"mt-3 space-y-2",children:z.map((a,u)=>e.jsxs("li",{className:"flex items-start gap-2 text-sm",children:[a.severity==="positive"?e.jsx(Ie,{"aria-hidden":"true",className:"h-4 w-4 mt-0.5 text-green-700 dark:text-green-300 shrink-0"}):a.severity==="high"?e.jsx(Ce,{"aria-hidden":"true",className:"h-4 w-4 mt-0.5 text-red-700 dark:text-red-300 shrink-0"}):a.severity==="medium"?e.jsx(Se,{"aria-hidden":"true",className:"h-4 w-4 mt-0.5 text-yellow-700 dark:text-yellow-300 shrink-0"}):e.jsx(Me,{"aria-hidden":"true",className:"h-4 w-4 mt-0.5 text-gray-600 dark:text-gray-300 shrink-0"}),e.jsx("span",{children:a.description})]},u))}),(l||r)&&e.jsxs("div",{className:"mt-3 pt-3 border-t border-[var(--semantic-color-border-default)] space-y-2",children:[l&&e.jsxs("div",{className:"flex items-center gap-2 text-sm text-purple-800 dark:text-purple-200",children:[e.jsx(R,{"aria-hidden":"true",className:"h-4 w-4"}),e.jsx("span",{children:"Possibly AI-generated"})]}),r&&e.jsxs("div",{className:"flex items-center gap-2 text-sm text-orange-800 dark:text-orange-200",children:[e.jsx(P,{"aria-hidden":"true",className:"h-4 w-4"}),e.jsx("span",{children:"Digitally edited"})]})]}),e.jsx("p",{className:"mt-3 pt-3 border-t border-[var(--semantic-color-border-default)] text-xs text-[var(--semantic-color-muted-foreground)]",children:"Authenticity analysis uses AI to detect possible image manipulation."})]})]})}function h({score:t,className:l}){const r=Be(t),o=r==="verified"?"Verified":r==="caution"?"Needs review":"Alert";return e.jsx("div",{className:p("inline-flex items-center justify-center","w-10 h-10 rounded-lg font-bold text-sm",r==="verified"&&"bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",r==="caution"&&"bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100",r==="alert"&&"bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100",l),role:"img","aria-label":`Authenticity score: ${t}% - ${o}`,children:e.jsxs("span",{"aria-hidden":"true",children:[t,"%"]})})}try{s.displayName="AuthenticityBadge",s.__docgenInfo={description:"",displayName:"AuthenticityBadge",props:{score:{defaultValue:null,description:"Authenticity score from 0 to 100",name:"score",required:!0,type:{name:"number"}},isAIGenerated:{defaultValue:{value:"false"},description:"Whether the images appear AI-generated",name:"isAIGenerated",required:!1,type:{name:"boolean"}},isEdited:{defaultValue:{value:"false"},description:"Whether the images appear digitally edited",name:"isEdited",required:!1,type:{name:"boolean"}},showDetails:{defaultValue:{value:"false"},description:"Show detailed tooltip/popup on click",name:"showDetails",required:!1,type:{name:"boolean"}},indicators:{defaultValue:{value:"[]"},description:"Detailed indicators for the tooltip",name:"indicators",required:!1,type:{name:"AuthenticityIndicator[]"}},onClick:{defaultValue:null,description:"Click handler",name:"onClick",required:!1,type:{name:"(() => void)"}},className:{defaultValue:null,description:"Additional class names",name:"className",required:!1,type:{name:"string"}},showLabel:{defaultValue:{value:"true"},description:"Show label text alongside score",name:"showLabel",required:!1,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:'"sm" | "md" | "lg" | null'}}}}}catch{}try{h.displayName="AuthenticityScore",h.__docgenInfo={description:"Compact authenticity score display for cards",displayName:"AuthenticityScore",props:{score:{defaultValue:null,description:"",name:"score",required:!0,type:{name:"number"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const He={title:"Components/AuthenticityBadge",component:s,parameters:{layout:"centered",docs:{description:{component:"Visual indicator for image authenticity scores. Key differentiator for AI-powered real estate verification."}}},tags:["autodocs"],argTypes:{score:{control:{type:"range",min:0,max:100,step:1},description:"Authenticity score from 0 to 100"},size:{control:"select",options:["sm","md","lg"],description:"Size of the badge"},isAIGenerated:{control:"boolean",description:"Whether images appear AI-generated"},isEdited:{control:"boolean",description:"Whether images appear digitally edited"},showDetails:{control:"boolean",description:"Show detailed tooltip on click"},showLabel:{control:"boolean",description:"Show label text alongside score"}}},g={args:{score:95,showLabel:!0}},f={args:{score:75,showLabel:!0}},v={args:{score:45,showLabel:!0}},w={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{score:95,size:"sm"}),e.jsx(s,{score:95,size:"md"}),e.jsx(s,{score:95,size:"lg"})]})},b={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{score:95,showLabel:!0}),e.jsx(s,{score:78,showLabel:!0}),e.jsx(s,{score:45,showLabel:!0})]})},y={args:{score:35,isAIGenerated:!0,showLabel:!0}},j={args:{score:65,isEdited:!0,showLabel:!0}},N={args:{score:25,isAIGenerated:!0,isEdited:!0,showLabel:!0}},ze=[{type:"verified",description:"Original images verified",severity:"positive"},{type:"metadata",description:"Consistent metadata",severity:"positive"},{type:"lighting",description:"Natural lighting detected",severity:"positive"}],k={args:{score:95,showDetails:!0,showLabel:!0,indicators:ze},render:t=>e.jsxs("div",{className:"w-[400px] flex justify-center",children:[e.jsx(s,{score:t.score??95,...t}),e.jsx("p",{className:"absolute bottom-4 text-sm text-gray-500",children:"Click the badge to see details"})]})},Ge=[{type:"lighting",description:"Possible lighting manipulation",severity:"medium"},{type:"metadata",description:"Modified EXIF data detected",severity:"high"}],A={args:{score:58,showDetails:!0,showLabel:!0,isEdited:!0,indicators:Ge},render:t=>e.jsx("div",{className:"w-[400px] flex justify-center",children:e.jsx(s,{score:t.score??58,...t})})},L={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(h,{score:95}),e.jsx(h,{score:75}),e.jsx(h,{score:45})]})},I={render:()=>e.jsxs("div",{className:"w-[300px] p-4 bg-white rounded-xl shadow-lg border",children:[e.jsxs("div",{className:"relative aspect-video bg-gray-200 rounded-lg mb-3",children:[e.jsx("div",{className:"absolute top-2 left-2",children:e.jsx(h,{score:92})}),e.jsx("div",{className:"absolute top-2 right-2 px-2 py-1 bg-white/90 rounded text-xs font-medium",children:"Idealista"})]}),e.jsx("h3",{className:"font-semibold",children:"Bright renovated apartment"}),e.jsx("p",{className:"text-sm text-gray-500",children:"Madrid, Chamberí"}),e.jsxs("div",{className:"mt-2 flex items-center justify-between",children:[e.jsx("span",{className:"text-lg font-bold text-blue-600",children:"285.000 €"}),e.jsx(s,{score:92,size:"sm",showDetails:!0,indicators:ze})]})]})},S={render:()=>e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"text-center mb-4",children:[e.jsx("h3",{className:"font-semibold text-lg",children:"Authenticity Score Comparison"}),e.jsx("p",{className:"text-sm text-gray-500",children:"How different scores are displayed"})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"p-4 bg-green-100 rounded-lg text-center",children:[e.jsx(s,{score:95,size:"lg",showLabel:!0,showDetails:!0,indicators:[{type:"verified",description:"All images verified",severity:"positive"}]}),e.jsx("p",{className:"mt-2 text-sm text-green-900",children:"High Trust"}),e.jsx("p",{className:"text-xs text-green-800",children:"90-100 points"})]}),e.jsxs("div",{className:"p-4 bg-yellow-100 rounded-lg text-center",children:[e.jsx(s,{score:75,size:"lg",showLabel:!0,showDetails:!0,indicators:[{type:"warning",description:"Minor edits detected",severity:"medium"}]}),e.jsx("p",{className:"mt-2 text-sm text-yellow-900",children:"Needs Review"}),e.jsx("p",{className:"text-xs text-yellow-800",children:"70-89 points"})]}),e.jsxs("div",{className:"p-4 bg-red-100 rounded-lg text-center",children:[e.jsx(s,{score:45,size:"lg",showLabel:!0,isAIGenerated:!0,showDetails:!0,indicators:[{type:"alert",description:"Possible manipulation",severity:"high"}]}),e.jsx("p",{className:"mt-2 text-sm text-red-900",children:"Alert"}),e.jsx("p",{className:"text-xs text-red-800",children:"0-69 points"})]})]})]})};var $,O,H;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    score: 95,
    showLabel: true
  }
}`,...(H=(O=g.parameters)==null?void 0:O.docs)==null?void 0:H.source}}};var T,K,X;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    score: 75,
    showLabel: true
  }
}`,...(X=(K=f.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var F,Z,J;v.parameters={...v.parameters,docs:{...(F=v.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    score: 45,
    showLabel: true
  }
}`,...(J=(Z=v.parameters)==null?void 0:Z.docs)==null?void 0:J.source}}};var Q,U,Y;w.parameters={...w.parameters,docs:{...(Q=w.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <AuthenticityBadge score={95} size="sm" />
      <AuthenticityBadge score={95} size="md" />
      <AuthenticityBadge score={95} size="lg" />
    </div>
}`,...(Y=(U=w.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};var ee,te,se;b.parameters={...b.parameters,docs:{...(ee=b.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <AuthenticityBadge score={95} showLabel />
      <AuthenticityBadge score={78} showLabel />
      <AuthenticityBadge score={45} showLabel />
    </div>
}`,...(se=(te=b.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var re,ae,ie;y.parameters={...y.parameters,docs:{...(re=y.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    score: 35,
    isAIGenerated: true,
    showLabel: true
  }
}`,...(ie=(ae=y.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};var ne,oe,de;j.parameters={...j.parameters,docs:{...(ne=j.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    score: 65,
    isEdited: true,
    showLabel: true
  }
}`,...(de=(oe=j.parameters)==null?void 0:oe.docs)==null?void 0:de.source}}};var le,ce,me;N.parameters={...N.parameters,docs:{...(le=N.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    score: 25,
    isAIGenerated: true,
    isEdited: true,
    showLabel: true
  }
}`,...(me=(ce=N.parameters)==null?void 0:ce.docs)==null?void 0:me.source}}};var ue,pe,he;k.parameters={...k.parameters,docs:{...(ue=k.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    score: 95,
    showDetails: true,
    showLabel: true,
    indicators: sampleIndicators
  },
  render: args => <div className="w-[400px] flex justify-center">
      <AuthenticityBadge score={args.score ?? 95} {...args} />
      <p className="absolute bottom-4 text-sm text-gray-500">
        Click the badge to see details
      </p>
    </div>
}`,...(he=(pe=k.parameters)==null?void 0:pe.docs)==null?void 0:he.source}}};var xe,ge,fe;A.parameters={...A.parameters,docs:{...(xe=A.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    score: 58,
    showDetails: true,
    showLabel: true,
    isEdited: true,
    indicators: warningIndicators
  },
  render: args => <div className="w-[400px] flex justify-center">
      <AuthenticityBadge score={args.score ?? 58} {...args} />
    </div>
}`,...(fe=(ge=A.parameters)==null?void 0:ge.docs)==null?void 0:fe.source}}};var ve,we,be;L.parameters={...L.parameters,docs:{...(ve=L.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <AuthenticityScore score={95} />
      <AuthenticityScore score={75} />
      <AuthenticityScore score={45} />
    </div>
}`,...(be=(we=L.parameters)==null?void 0:we.docs)==null?void 0:be.source}}};var ye,je,Ne;I.parameters={...I.parameters,docs:{...(ye=I.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: () => <div className="w-[300px] p-4 bg-white rounded-xl shadow-lg border">
      <div className="relative aspect-video bg-gray-200 rounded-lg mb-3">
        <div className="absolute top-2 left-2">
          <AuthenticityScore score={92} />
        </div>
        <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded text-xs font-medium">
          Idealista
        </div>
      </div>
      <h3 className="font-semibold">Bright renovated apartment</h3>
      <p className="text-sm text-gray-500">Madrid, Chamberí</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600">285.000 €</span>
        <AuthenticityBadge score={92} size="sm" showDetails indicators={sampleIndicators} />
      </div>
    </div>
}`,...(Ne=(je=I.parameters)==null?void 0:je.docs)==null?void 0:Ne.source}}};var ke,Ae,Le;S.parameters={...S.parameters,docs:{...(ke=S.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  render: () => <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg">Authenticity Score Comparison</h3>
        <p className="text-sm text-gray-500">How different scores are displayed</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <AuthenticityBadge score={95} size="lg" showLabel showDetails indicators={[{
          type: 'verified',
          description: 'All images verified',
          severity: 'positive'
        }]} />
          <p className="mt-2 text-sm text-green-900">High Trust</p>
          <p className="text-xs text-green-800">90-100 points</p>
        </div>

        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <AuthenticityBadge score={75} size="lg" showLabel showDetails indicators={[{
          type: 'warning',
          description: 'Minor edits detected',
          severity: 'medium'
        }]} />
          <p className="mt-2 text-sm text-yellow-900">Needs Review</p>
          <p className="text-xs text-yellow-800">70-89 points</p>
        </div>

        <div className="p-4 bg-red-100 rounded-lg text-center">
          <AuthenticityBadge score={45} size="lg" showLabel isAIGenerated showDetails indicators={[{
          type: 'alert',
          description: 'Possible manipulation',
          severity: 'high'
        }]} />
          <p className="mt-2 text-sm text-red-900">Alert</p>
          <p className="text-xs text-red-800">0-69 points</p>
        </div>
      </div>
    </div>
}`,...(Le=(Ae=S.parameters)==null?void 0:Ae.docs)==null?void 0:Le.source}}};const Te=["Verified","Caution","Alert","Sizes","AllStatuses","AIGenerated","Edited","AIGeneratedAndEdited","WithDetails","WithWarnings","CompactScore","InCardContext","Comparison"];export{y as AIGenerated,N as AIGeneratedAndEdited,v as Alert,b as AllStatuses,f as Caution,L as CompactScore,S as Comparison,j as Edited,I as InCardContext,w as Sizes,g as Verified,k as WithDetails,A as WithWarnings,Te as __namedExportsOrder,He as default};
