import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as w}from"./index-B2-qRKKC.js";import{c as o,a as ye}from"./utils-JCLedEej.js";import"./_commonjsHelpers-Cpj98o6Y.js";const ve=ye("rounded-2xl border overflow-hidden transition-all duration-300",{variants:{variant:{default:"border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50",elevated:"border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-300/50 dark:shadow-slate-900/50",highlighted:"border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/20"}},defaultVariants:{variant:"default"}}),ke=t=>t>=80?{text:"text-emerald-600 dark:text-emerald-400",bg:"bg-emerald-500",ring:"ring-emerald-500/20",gradient:"from-emerald-500 to-teal-500"}:t>=60?{text:"text-amber-600 dark:text-amber-400",bg:"bg-amber-500",ring:"ring-amber-500/20",gradient:"from-amber-500 to-orange-500"}:{text:"text-red-600 dark:text-red-400",bg:"bg-red-500",ring:"ring-red-500/20",gradient:"from-red-500 to-rose-500"},L=t=>t>=90?"Excellent":t>=80?"Good":t>=70?"Fair":t>=60?"Needs Attention":"Critical Issues",we=t=>{switch(t){case"critical":return{bg:"bg-red-50 dark:bg-red-900/20",border:"border-red-200 dark:border-red-800/30",text:"text-red-700 dark:text-red-400",badge:"bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",icon:"text-red-500",dot:"bg-red-500"};case"moderate":return{bg:"bg-amber-50 dark:bg-amber-900/20",border:"border-amber-200 dark:border-amber-800/30",text:"text-amber-700 dark:text-amber-400",badge:"bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",icon:"text-amber-500",dot:"bg-amber-500"};case"minor":return{bg:"bg-blue-50 dark:bg-blue-900/20",border:"border-blue-200 dark:border-blue-800/30",text:"text-blue-700 dark:text-blue-400",badge:"bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",icon:"text-blue-500",dot:"bg-blue-500"};default:return{bg:"bg-slate-50 dark:bg-slate-800",border:"border-slate-200 dark:border-slate-700",text:"text-slate-700 dark:text-slate-400",badge:"bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",icon:"text-slate-400",dot:"bg-slate-400"}}},je=({score:t,label:n})=>{const l=ke(t),i=2*Math.PI*45,a=t/100*i,r=`${n}: ${t} out of 100, rated as ${L(t)}`;return e.jsxs("div",{className:"relative flex flex-col items-center",role:"img","aria-label":r,children:[e.jsxs("div",{className:"relative w-28 h-28",children:[e.jsxs("svg",{className:"w-28 h-28 transform -rotate-90",viewBox:"0 0 100 100","aria-hidden":"true",children:[e.jsx("circle",{className:"text-slate-100 dark:text-slate-800",strokeWidth:"8",stroke:"currentColor",fill:"transparent",r:"45",cx:"50",cy:"50"}),e.jsx("circle",{className:o("transition-all duration-1000 ease-out",l.text),strokeWidth:"8",strokeDasharray:i,strokeDashoffset:i-a,strokeLinecap:"round",stroke:"currentColor",fill:"transparent",r:"45",cx:"50",cy:"50"})]}),e.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center","aria-hidden":"true",children:[e.jsx("span",{className:o("text-3xl font-bold",l.text),children:t}),e.jsx("span",{className:"text-xs text-slate-400",children:"/ 100"})]})]}),e.jsxs("div",{className:"mt-2 text-center","aria-hidden":"true",children:[e.jsx("p",{className:"text-xs text-slate-500 dark:text-slate-400",children:n}),e.jsx("p",{className:o("text-sm font-semibold",l.text),children:L(t)})]})]})},Ne=({finding:t,expanded:n=!1,onToggle:l})=>{const i=we(t.severity),a=`finding-content-${t.id}`,r=(c,m="USD")=>new Intl.NumberFormat("default",{style:"currency",currency:m,maximumFractionDigits:0}).format(c);return e.jsxs("div",{className:o("rounded-xl border transition-all duration-200",i.bg,i.border,"hover:shadow-md",n&&"ring-1 ring-slate-200 dark:ring-slate-700"),role:"listitem",children:[e.jsxs("button",{onClick:l,className:"w-full px-4 py-3 flex items-start gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset rounded-xl","aria-expanded":n,"aria-controls":a,"aria-label":`${t.title}, ${t.severity} severity${t.category?`, ${t.category}`:""}. Click to ${n?"collapse":"expand"} details.`,children:[e.jsx("span",{className:o("w-2 h-2 rounded-full mt-2 flex-shrink-0",i.dot),"aria-hidden":"true"}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2",children:[e.jsx("h5",{className:"font-medium text-slate-900 dark:text-white truncate",children:t.title}),e.jsx("span",{className:o("px-2 py-0.5 rounded-full text-xs font-medium capitalize flex-shrink-0",i.badge),children:t.severity})]}),t.category&&e.jsxs("p",{className:"text-xs text-slate-500 dark:text-slate-400 mt-0.5",children:[t.category,t.location&&` · ${t.location}`]})]}),e.jsx("svg",{className:o("w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0",n&&"rotate-180"),fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})]}),e.jsx("div",{id:a,className:o("overflow-hidden transition-all duration-200",n?"max-h-96":"max-h-0"),"aria-hidden":!n,children:e.jsxs("div",{className:"px-4 pb-4 pt-0",children:[t.description&&e.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-300 mb-3 pl-5",children:t.description}),t.costEstimate&&e.jsxs("div",{className:"pl-5 flex items-center gap-2",children:[e.jsx("span",{className:"text-xs text-slate-500 dark:text-slate-400",children:"Est. repair:"}),e.jsxs("span",{className:"text-sm font-semibold text-slate-700 dark:text-slate-200",children:[r(t.costEstimate.min,t.costEstimate.currency)," -"," ",r(t.costEstimate.max,t.costEstimate.currency)]})]})]})})]})};function j({score:t,scoreLabel:n="Score",title:l,subtitle:i,timestamp:a,findings:r,maxVisibleFindings:c=3,summary:m,image:S,imageAlt:ce,actions:me,showExport:ue=!0,onExport:C,showShare:ge=!0,onShare:E,variant:pe,className:xe}){const[u,he]=w.useState(!1),[D,be]=w.useState(null),fe=u?r:r.slice(0,c),A=r.filter(s=>s.severity==="critical").length,F=r.filter(s=>s.severity==="moderate").length,I=r.filter(s=>s.severity==="minor").length,V=w.useMemo(()=>{if(!a)return null;const s=typeof a=="string"?new Date(a):a;return new Intl.DateTimeFormat("default",{dateStyle:"medium",timeStyle:"short"}).format(s)},[a]);return e.jsxs("article",{className:o(ve({variant:pe}),xe),"aria-labelledby":"results-title",children:[e.jsx("div",{className:"relative p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900",children:e.jsxs("div",{className:"flex items-start gap-6",children:[e.jsx(je,{score:t,label:n}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h3",{id:"results-title",className:"text-xl font-bold text-slate-900 dark:text-white",children:l}),i&&e.jsx("p",{className:"text-sm text-slate-500 dark:text-slate-400 mt-1",children:i}),V&&e.jsxs("p",{className:"text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1.5",children:[e.jsx("svg",{className:"w-3.5 h-3.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),e.jsx("time",{dateTime:a==null?void 0:a.toString(),children:V})]}),e.jsxs("div",{className:"flex items-center gap-3 mt-4 flex-wrap",role:"group","aria-label":"Findings summary",children:[A>0&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30",children:[e.jsx("span",{className:"w-2 h-2 rounded-full bg-red-500","aria-hidden":"true"}),e.jsxs("span",{className:"text-xs font-medium text-red-700 dark:text-red-300",children:[A," Critical"]})]}),F>0&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30",children:[e.jsx("span",{className:"w-2 h-2 rounded-full bg-amber-500","aria-hidden":"true"}),e.jsxs("span",{className:"text-xs font-medium text-amber-700 dark:text-amber-300",children:[F," Moderate"]})]}),I>0&&e.jsxs("div",{className:"flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30",children:[e.jsx("span",{className:"w-2 h-2 rounded-full bg-blue-500","aria-hidden":"true"}),e.jsxs("span",{className:"text-xs font-medium text-blue-700 dark:text-blue-300",children:[I," Minor"]})]})]})]}),S&&e.jsx("div",{className:"flex-shrink-0",children:e.jsx("img",{src:S,alt:ce||`Preview image for ${l}`,className:"w-24 h-24 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"})})]})}),m&&e.jsx("div",{className:"px-6 py-4 border-t border-slate-100 dark:border-slate-800",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0","aria-hidden":"true",children:e.jsx("svg",{className:"w-4 h-4 text-slate-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})})}),e.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-300 leading-relaxed",children:m})]})}),r.length>0&&e.jsxs("div",{className:"px-6 py-4 border-t border-slate-100 dark:border-slate-800",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h4",{className:"font-semibold text-slate-900 dark:text-white",children:["Findings (",r.length,")"]}),r.length>c&&e.jsx("button",{onClick:()=>he(!u),className:"text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded","aria-expanded":u,children:u?"Show less":`Show all ${r.length}`})]}),e.jsx("ul",{className:"space-y-2","aria-label":"Analysis findings",children:fe.map(s=>e.jsx(Ne,{finding:s,expanded:D===s.id,onToggle:()=>be(D===s.id?null:s.id)},s.id))})]}),r.length===0&&e.jsxs("div",{className:"px-6 py-8 border-t border-slate-100 dark:border-slate-800 text-center",children:[e.jsx("div",{className:"w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-3","aria-hidden":"true",children:e.jsx("svg",{className:"w-6 h-6 text-emerald-600 dark:text-emerald-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}),e.jsx("p",{className:"text-sm font-medium text-slate-900 dark:text-white",children:"No issues found"}),e.jsx("p",{className:"text-xs text-slate-500 dark:text-slate-400 mt-1",children:"Everything looks great!"})]}),e.jsx("div",{className:"px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50",children:e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2",role:"group","aria-label":"Report actions",children:[ue&&C&&e.jsxs("button",{onClick:C,className:o("inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200","bg-white dark:bg-slate-800","border border-slate-200 dark:border-slate-700","text-slate-700 dark:text-slate-200","hover:bg-slate-50 dark:hover:bg-slate-700","hover:shadow-md","active:scale-95","focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"),"aria-label":"Export analysis report as PDF",children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),"Export PDF"]}),ge&&E&&e.jsxs("button",{onClick:E,className:o("inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200","text-slate-500 dark:text-slate-400","hover:bg-white dark:hover:bg-slate-800","hover:text-slate-700 dark:hover:text-slate-200","active:scale-95","focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"),"aria-label":"Share analysis report",children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"})}),"Share"]})]}),me]})})]})}try{j.displayName="AIResultsCard",j.__docgenInfo={description:"",displayName:"AIResultsCard",props:{score:{defaultValue:null,description:"Overall score (0-100)",name:"score",required:!0,type:{name:"number"}},scoreLabel:{defaultValue:{value:"Score"},description:'Score label (e.g., "Property Condition", "Skin Health")',name:"scoreLabel",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"Title of the analysis",name:"title",required:!0,type:{name:"string"}},subtitle:{defaultValue:null,description:"Subtitle or description",name:"subtitle",required:!1,type:{name:"string"}},timestamp:{defaultValue:null,description:"Timestamp of analysis",name:"timestamp",required:!1,type:{name:"string | Date"}},findings:{defaultValue:null,description:"Analysis findings",name:"findings",required:!0,type:{name:"Finding[]"}},maxVisibleFindings:{defaultValue:{value:"3"},description:"Maximum findings to show initially",name:"maxVisibleFindings",required:!1,type:{name:"number"}},summary:{defaultValue:null,description:"Summary text",name:"summary",required:!1,type:{name:"string"}},image:{defaultValue:null,description:"Image preview",name:"image",required:!1,type:{name:"string"}},imageAlt:{defaultValue:null,description:"Image alt text for accessibility",name:"imageAlt",required:!1,type:{name:"string"}},actions:{defaultValue:null,description:"Actions",name:"actions",required:!1,type:{name:"ReactNode"}},showExport:{defaultValue:{value:"true"},description:"Show export button",name:"showExport",required:!1,type:{name:"boolean"}},onExport:{defaultValue:null,description:"Export handler",name:"onExport",required:!1,type:{name:"(() => void)"}},showShare:{defaultValue:{value:"true"},description:"Show share button",name:"showShare",required:!1,type:{name:"boolean"}},onShare:{defaultValue:null,description:"Share handler",name:"onShare",required:!1,type:{name:"(() => void)"}},className:{defaultValue:null,description:"Additional class name",name:"className",required:!1,type:{name:"string"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'"default" | "elevated" | "highlighted" | null'}}}}}catch{}const Ae={title:"AI Blocks/AIResultsCard",component:j,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","elevated","highlighted"]},score:{control:{type:"range",min:0,max:100}}}},N=[{id:"1",title:"Missing Roof Shingles",description:"Several shingles are missing in the northeast corner, exposing the underlayment.",severity:"critical",category:"Roofing",location:"Northeast corner",costEstimate:{min:500,max:1200,currency:"USD"}},{id:"2",title:"Gutter Damage",description:"Gutters show signs of sagging and may need replacement.",severity:"moderate",category:"Drainage",location:"Front facade",costEstimate:{min:300,max:600,currency:"USD"}},{id:"3",title:"Minor Paint Peeling",description:"Some paint peeling observed on the south-facing trim.",severity:"minor",category:"Exterior",location:"South side",costEstimate:{min:200,max:400,currency:"USD"}},{id:"4",title:"HVAC System Age",description:"System appears to be 15+ years old. Consider planning for replacement.",severity:"info",category:"HVAC"}],d={args:{score:72,scoreLabel:"Property Condition",title:"HomeCheck AI Analysis",subtitle:"123 Main Street, Anytown USA",timestamp:new Date,findings:N,summary:"The property is in fair condition with some issues requiring attention. The roof shows signs of wear and should be prioritized for repair.",showExport:!0,onExport:()=>console.log("Export clicked"),showShare:!0,onShare:()=>console.log("Share clicked")}},g={args:{score:95,scoreLabel:"Overall Health",title:"Property Inspection Complete",subtitle:"Modern Home - Built 2020",timestamp:new Date,findings:[{id:"1",title:"Minor Landscaping Issue",description:"Some bushes need trimming near the foundation.",severity:"info",category:"Landscaping"}],summary:"Excellent condition! This property is well-maintained with no significant issues detected.",variant:"highlighted"}},p={args:{score:35,scoreLabel:"Condition Score",title:"Urgent Issues Detected",subtitle:"Historic Property - Needs Attention",timestamp:new Date,findings:[{id:"1",title:"Foundation Crack",description:"Significant crack detected in the foundation wall.",severity:"critical",category:"Foundation",costEstimate:{min:5e3,max:15e3}},{id:"2",title:"Water Damage",description:"Signs of water intrusion in the basement.",severity:"critical",category:"Water Damage",costEstimate:{min:2e3,max:8e3}},{id:"3",title:"Roof Replacement Needed",description:"Roof is beyond repair and needs full replacement.",severity:"critical",category:"Roofing",costEstimate:{min:8e3,max:2e4}},{id:"4",title:"Electrical Panel Outdated",description:"Electrical panel does not meet current safety codes.",severity:"moderate",category:"Electrical",costEstimate:{min:1500,max:3e3}}],summary:"This property has significant issues that require immediate attention. A professional inspection is strongly recommended before purchase."}},x={args:{score:78,title:"Roof Analysis Complete",subtitle:"Analyzed from aerial drone image",timestamp:new Date,findings:N.slice(0,2),image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200",summary:"The roof shows moderate wear consistent with its age."}},h={args:{...d.args,variant:"elevated",title:"Premium Analysis Report"}},b={args:{...d.args,variant:"highlighted",score:88,title:"Featured Property Analysis"}},f={args:{score:65,title:"Comprehensive Inspection",findings:[...N,{id:"5",title:"Window Seals Degraded",description:"Several windows showing signs of seal failure.",severity:"moderate",category:"Windows",costEstimate:{min:800,max:2e3}},{id:"6",title:"Deck Boards Warped",description:"Some deck boards are warped and need replacement.",severity:"minor",category:"Exterior",costEstimate:{min:500,max:1e3}},{id:"7",title:"Insulation Check Recommended",description:"Thermal imaging suggests possible insulation gaps.",severity:"info",category:"Insulation"}],maxVisibleFindings:3,timestamp:new Date}},y={args:{score:100,scoreLabel:"Perfect Score",title:"Inspection Complete",subtitle:"New Construction Home",timestamp:new Date,findings:[],summary:"No issues detected. This property is in excellent condition."}},v={args:{...d.args,actions:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{className:"px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700",children:"Get Quotes"}),e.jsx("button",{className:"px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50",children:"Schedule Inspection"})]})}},k={args:{score:82,scoreLabel:"Skin Health",title:"SkinCheck AI Analysis",subtitle:"Daily skin assessment",timestamp:new Date,findings:[{id:"1",title:"Mild Dryness Detected",description:"Skin appears slightly dehydrated in the T-zone area.",severity:"minor",category:"Hydration"},{id:"2",title:"Sun Damage Signs",description:"Early signs of photoaging detected. Consider SPF increase.",severity:"moderate",category:"UV Protection"},{id:"3",title:"Healthy Complexion",description:"Overall skin tone is even and healthy.",severity:"info",category:"General"}],summary:"Your skin is in good condition. Focus on hydration and sun protection for optimal results."}};var P,H,M;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    score: 72,
    scoreLabel: 'Property Condition',
    title: 'HomeCheck AI Analysis',
    subtitle: '123 Main Street, Anytown USA',
    timestamp: new Date(),
    findings: sampleFindings,
    summary: 'The property is in fair condition with some issues requiring attention. The roof shows signs of wear and should be prioritized for repair.',
    showExport: true,
    onExport: () => console.log('Export clicked'),
    showShare: true,
    onShare: () => console.log('Share clicked')
  }
}`,...(M=(H=d.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var R,T,W;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    score: 95,
    scoreLabel: 'Overall Health',
    title: 'Property Inspection Complete',
    subtitle: 'Modern Home - Built 2020',
    timestamp: new Date(),
    findings: [{
      id: '1',
      title: 'Minor Landscaping Issue',
      description: 'Some bushes need trimming near the foundation.',
      severity: 'info',
      category: 'Landscaping'
    }],
    summary: 'Excellent condition! This property is well-maintained with no significant issues detected.',
    variant: 'highlighted'
  }
}`,...(W=(T=g.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};var q,z,B;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    score: 35,
    scoreLabel: 'Condition Score',
    title: 'Urgent Issues Detected',
    subtitle: 'Historic Property - Needs Attention',
    timestamp: new Date(),
    findings: [{
      id: '1',
      title: 'Foundation Crack',
      description: 'Significant crack detected in the foundation wall.',
      severity: 'critical',
      category: 'Foundation',
      costEstimate: {
        min: 5000,
        max: 15000
      }
    }, {
      id: '2',
      title: 'Water Damage',
      description: 'Signs of water intrusion in the basement.',
      severity: 'critical',
      category: 'Water Damage',
      costEstimate: {
        min: 2000,
        max: 8000
      }
    }, {
      id: '3',
      title: 'Roof Replacement Needed',
      description: 'Roof is beyond repair and needs full replacement.',
      severity: 'critical',
      category: 'Roofing',
      costEstimate: {
        min: 8000,
        max: 20000
      }
    }, {
      id: '4',
      title: 'Electrical Panel Outdated',
      description: 'Electrical panel does not meet current safety codes.',
      severity: 'moderate',
      category: 'Electrical',
      costEstimate: {
        min: 1500,
        max: 3000
      }
    }],
    summary: 'This property has significant issues that require immediate attention. A professional inspection is strongly recommended before purchase.'
  }
}`,...(B=(z=p.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var $,U,_;x.parameters={...x.parameters,docs:{...($=x.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    score: 78,
    title: 'Roof Analysis Complete',
    subtitle: 'Analyzed from aerial drone image',
    timestamp: new Date(),
    findings: sampleFindings.slice(0, 2),
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
    summary: 'The roof shows moderate wear consistent with its age.'
  }
}`,...(_=(U=x.parameters)==null?void 0:U.docs)==null?void 0:_.source}}};var G,O,Q;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'elevated',
    title: 'Premium Analysis Report'
  }
}`,...(Q=(O=h.parameters)==null?void 0:O.docs)==null?void 0:Q.source}}};var Y,J,K;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'highlighted',
    score: 88,
    title: 'Featured Property Analysis'
  }
}`,...(K=(J=b.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var X,Z,ee;f.parameters={...f.parameters,docs:{...(X=f.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    score: 65,
    title: 'Comprehensive Inspection',
    findings: [...sampleFindings, {
      id: '5',
      title: 'Window Seals Degraded',
      description: 'Several windows showing signs of seal failure.',
      severity: 'moderate',
      category: 'Windows',
      costEstimate: {
        min: 800,
        max: 2000
      }
    }, {
      id: '6',
      title: 'Deck Boards Warped',
      description: 'Some deck boards are warped and need replacement.',
      severity: 'minor',
      category: 'Exterior',
      costEstimate: {
        min: 500,
        max: 1000
      }
    }, {
      id: '7',
      title: 'Insulation Check Recommended',
      description: 'Thermal imaging suggests possible insulation gaps.',
      severity: 'info',
      category: 'Insulation'
    }],
    maxVisibleFindings: 3,
    timestamp: new Date()
  }
}`,...(ee=(Z=f.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,re,ae;y.parameters={...y.parameters,docs:{...(te=y.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    score: 100,
    scoreLabel: 'Perfect Score',
    title: 'Inspection Complete',
    subtitle: 'New Construction Home',
    timestamp: new Date(),
    findings: [],
    summary: 'No issues detected. This property is in excellent condition.'
  }
}`,...(ae=(re=y.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var se,ne,ie;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    actions: <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          Get Quotes
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
          Schedule Inspection
        </button>
      </div>
  }
}`,...(ie=(ne=v.parameters)==null?void 0:ne.docs)==null?void 0:ie.source}}};var oe,le,de;k.parameters={...k.parameters,docs:{...(oe=k.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    score: 82,
    scoreLabel: 'Skin Health',
    title: 'SkinCheck AI Analysis',
    subtitle: 'Daily skin assessment',
    timestamp: new Date(),
    findings: [{
      id: '1',
      title: 'Mild Dryness Detected',
      description: 'Skin appears slightly dehydrated in the T-zone area.',
      severity: 'minor',
      category: 'Hydration'
    }, {
      id: '2',
      title: 'Sun Damage Signs',
      description: 'Early signs of photoaging detected. Consider SPF increase.',
      severity: 'moderate',
      category: 'UV Protection'
    }, {
      id: '3',
      title: 'Healthy Complexion',
      description: 'Overall skin tone is even and healthy.',
      severity: 'info',
      category: 'General'
    }],
    summary: 'Your skin is in good condition. Focus on hydration and sun protection for optimal results.'
  }
}`,...(de=(le=k.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};const Fe=["Default","ExcellentScore","PoorScore","WithImage","ElevatedVariant","HighlightedVariant","ManyFindings","NoFindings","WithCustomActions","SkinCheckAI"];export{d as Default,h as ElevatedVariant,g as ExcellentScore,b as HighlightedVariant,f as ManyFindings,y as NoFindings,p as PoorScore,k as SkinCheckAI,v as WithCustomActions,x as WithImage,Fe as __namedExportsOrder,Ae as default};
