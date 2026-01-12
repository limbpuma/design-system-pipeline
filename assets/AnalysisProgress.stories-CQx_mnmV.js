import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as ce}from"./index-B2-qRKKC.js";import{c as n}from"./utils-JCLedEej.js";import{A as me}from"./AIStatusIndicator-3oDvfBxv.js";import"./_commonjsHelpers-Cpj98o6Y.js";const y=a=>{if(a<60)return`${a}s`;const t=Math.floor(a/60),i=a%60;return i>0?`${t}m ${i}s`:`${t}m`},ie={pending:"Pending",active:"In progress",complete:"Completed",error:"Failed"},ue=({status:a,index:t,label:i})=>{const r="relative w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300",o=`Step ${t+1}: ${i} - ${ie[a]}`;switch(a){case"complete":return e.jsx("div",{className:n(r,"bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"),role:"img","aria-label":o,children:e.jsx("svg",{className:"w-5 h-5 animate-in zoom-in duration-300",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:3,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})});case"active":return e.jsxs("div",{className:n(r,"bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/30"),role:"img","aria-label":o,children:[e.jsxs("svg",{className:"w-5 h-5 animate-spin",fill:"none",viewBox:"0 0 24 24","aria-hidden":"true",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:4}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"})]}),e.jsx("span",{className:"absolute inset-0 rounded-xl bg-blue-500/30 animate-ping","aria-hidden":"true"})]});case"error":return e.jsx("div",{className:n(r,"bg-red-500 text-white shadow-lg shadow-red-500/30"),role:"img","aria-label":o,children:e.jsx("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})});default:return e.jsx("div",{className:n(r,"bg-slate-100 dark:bg-slate-800","text-slate-400 dark:text-slate-500","border-2 border-slate-200 dark:border-slate-700"),role:"img","aria-label":o,children:e.jsx("span",{"aria-hidden":"true",children:t+1})})}},pe=({progress:a,status:t,animated:i=!0})=>{const r=t==="processing"||t==="analyzing";return e.jsx("div",{className:"h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-inner",children:e.jsx("div",{className:n("h-full rounded-full transition-all duration-500 ease-out",t==="error"?"bg-red-500":t==="success"?"bg-emerald-500":"bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-[length:200%_100%]",i&&r&&"animate-[shimmer_2s_linear_infinite]"),style:{width:`${a}%`},role:"progressbar","aria-valuenow":a,"aria-valuemin":0,"aria-valuemax":100,"aria-label":"Overall progress"})})},ge=({status:a})=>e.jsx("div",{className:"flex flex-col items-center flex-1 min-h-[32px]",children:e.jsx("div",{className:n("w-0.5 flex-1 rounded-full transition-all duration-500",a==="complete"?"bg-emerald-500":a==="active"?"bg-gradient-to-b from-blue-500 to-slate-200 dark:to-slate-700":"bg-slate-200 dark:bg-slate-700")})});function j({steps:a,overallProgress:t,estimatedTime:i,status:r,statusMessage:o,showDetails:w=!0,compact:le=!1,animated:N=!0,className:oe}){const de=a.findIndex(s=>s.status==="active"),A=a.filter(s=>s.status==="complete").length,P=a.filter(s=>s.status==="complete"&&s.duration).reduce((s,l)=>s+(l.duration||0),0);return e.jsxs("div",{className:n("rounded-2xl border border-slate-200 dark:border-slate-700","bg-white dark:bg-slate-900","shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50",le?"p-4":"p-6",oe),role:"region","aria-label":"Analysis progress",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsx("div",{className:"flex items-center gap-3",children:e.jsx(me,{status:r,label:o,animated:N})}),i!==void 0&&(r==="processing"||r==="analyzing")&&e.jsxs("div",{className:"flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800",children:[e.jsx("svg",{className:"w-4 h-4 text-slate-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),e.jsxs("span",{className:"text-sm font-medium text-slate-600 dark:text-slate-400",children:["~",y(i)]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-center justify-between text-sm mb-3",children:[e.jsxs("span",{className:"text-slate-500 dark:text-slate-400",children:["Step ",Math.max(de+1,A)," of ",a.length]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("span",{className:"text-2xl font-bold text-slate-900 dark:text-white",children:[Math.round(t),"%"]})})]}),e.jsx(pe,{progress:t,status:r,animated:N})]}),w&&e.jsx("div",{className:"space-y-0",role:"list","aria-label":"Analysis steps",children:a.map((s,l)=>e.jsxs("div",{className:"flex gap-4",role:"listitem",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx(ue,{status:s.status,index:l,label:s.label}),l<a.length-1&&e.jsx(ge,{status:s.status})]}),e.jsxs("div",{className:n("flex-1 pb-6",l===a.length-1&&"pb-0"),children:[e.jsxs("div",{className:"flex items-start justify-between gap-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:n("font-semibold transition-colors duration-300",s.status==="active"?"text-slate-900 dark:text-white":s.status==="complete"?"text-emerald-600 dark:text-emerald-400":s.status==="error"?"text-red-600 dark:text-red-400":"text-slate-400 dark:text-slate-500"),children:s.label}),s.description&&e.jsx("p",{className:n("text-sm mt-1 transition-colors duration-300",s.status==="active"||s.status==="complete"?"text-slate-500 dark:text-slate-400":"text-slate-400 dark:text-slate-600"),children:s.description}),s.error&&e.jsxs("div",{className:"flex items-start gap-2 mt-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30",children:[e.jsx("svg",{className:"w-4 h-4 text-red-500 flex-shrink-0 mt-0.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),e.jsx("p",{className:"text-sm text-red-600 dark:text-red-400",children:s.error})]})]}),s.duration!==void 0&&s.status==="complete"&&e.jsx("span",{className:"flex-shrink-0 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400",children:y(s.duration)})]}),s.status==="active"&&s.progress!==void 0&&e.jsx("div",{className:"mt-3 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden",children:e.jsx("div",{className:"h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300",style:{width:`${s.progress}%`},role:"progressbar","aria-valuenow":s.progress,"aria-valuemin":0,"aria-valuemax":100,"aria-label":`${s.label} progress`})})]})]},s.id))}),!w&&e.jsx("div",{className:"flex items-center gap-2",role:"list","aria-label":"Analysis steps compact view",children:a.map((s,l)=>e.jsxs(ce.Fragment,{children:[e.jsx("div",{className:n("w-3 h-3 rounded-full transition-all duration-300",s.status==="complete"?"bg-emerald-500 shadow-lg shadow-emerald-500/50":s.status==="active"?"bg-blue-500 shadow-lg shadow-blue-500/50 animate-pulse scale-125":s.status==="error"?"bg-red-500 shadow-lg shadow-red-500/50":"bg-slate-200 dark:bg-slate-700"),role:"listitem","aria-label":`Step ${l+1}: ${s.label} - ${ie[s.status]}`}),l<a.length-1&&e.jsx("div",{className:n("flex-1 h-1 rounded-full transition-all duration-500",s.status==="complete"?"bg-emerald-500":"bg-slate-200 dark:bg-slate-700"),"aria-hidden":"true"})]},s.id))}),r==="success"&&e.jsx("div",{className:"mt-6 pt-4 border-t border-slate-100 dark:border-slate-800",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center",children:e.jsx("svg",{className:"w-5 h-5 text-emerald-600 dark:text-emerald-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-slate-900 dark:text-white",children:"Analysis Complete"}),e.jsxs("p",{className:"text-xs text-slate-500 dark:text-slate-400",children:[A," steps completed",P>0&&` in ${y(P)}`]})]})]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("span",{className:"px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-sm font-semibold text-emerald-600 dark:text-emerald-400",children:"100%"})})]})}),r==="error"&&e.jsx("div",{className:"mt-6 pt-4 border-t border-red-100 dark:border-red-900/30",children:e.jsxs("div",{className:"flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0",children:e.jsx("svg",{className:"w-5 h-5 text-red-600 dark:text-red-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})})}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm font-medium text-red-600 dark:text-red-400",children:"Analysis Failed"}),e.jsx("p",{className:"text-xs text-red-500 dark:text-red-400/70",children:"Check the error above and try again"})]})]})})]})}try{j.displayName="AnalysisProgress",j.__docgenInfo={description:"",displayName:"AnalysisProgress",props:{steps:{defaultValue:null,description:"Analysis steps",name:"steps",required:!0,type:{name:"AnalysisStep[]"}},overallProgress:{defaultValue:null,description:"Overall progress (0-100)",name:"overallProgress",required:!0,type:{name:"number"}},estimatedTime:{defaultValue:null,description:"Estimated time remaining in seconds",name:"estimatedTime",required:!1,type:{name:"number"}},status:{defaultValue:null,description:"Current status",name:"status",required:!0,type:{name:"enum",value:[{value:'"success"'},{value:'"warning"'},{value:'"error"'},{value:'"idle"'},{value:'"connecting"'},{value:'"processing"'},{value:'"analyzing"'}]}},statusMessage:{defaultValue:null,description:"Status message",name:"statusMessage",required:!1,type:{name:"string"}},showDetails:{defaultValue:{value:"true"},description:"Show step details",name:"showDetails",required:!1,type:{name:"boolean"}},compact:{defaultValue:{value:"false"},description:"Compact mode",name:"compact",required:!1,type:{name:"boolean"}},animated:{defaultValue:{value:"true"},description:"Show animated gradient on progress",name:"animated",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"Additional class name",name:"className",required:!1,type:{name:"string"}}}}}catch{}const ye={title:"AI Blocks/AnalysisProgress",component:j,parameters:{layout:"padded",backgrounds:{default:"light"}},tags:["autodocs"],argTypes:{status:{control:"select",options:["idle","processing","analyzing","success","error","warning"]},showDetails:{control:"boolean"},compact:{control:"boolean"},animated:{control:"boolean"}}},k=[{id:"1",label:"Image Processing",description:"Preparing images for analysis",status:"complete",duration:3},{id:"2",label:"AI Analysis",description:"Running deep learning models",status:"active",progress:65},{id:"3",label:"Report Generation",description:"Compiling findings and recommendations",status:"pending"},{id:"4",label:"Quality Check",description:"Validating results",status:"pending"}],d={args:{steps:k,overallProgress:45,estimatedTime:25,status:"processing",statusMessage:"Analyzing property images...",showDetails:!0,animated:!0}},c={args:{steps:[{id:"1",label:"Image Processing",description:"Preparing images",status:"active",progress:20},{id:"2",label:"AI Analysis",description:"Deep learning analysis",status:"pending"},{id:"3",label:"Report Generation",description:"Creating report",status:"pending"}],overallProgress:10,estimatedTime:45,status:"processing",statusMessage:"Starting analysis...",animated:!0}},m={args:{steps:[{id:"1",label:"Image Enhancement",description:"Optimizing quality",status:"complete",duration:2},{id:"2",label:"Structure Detection",description:"Identifying elements",status:"complete",duration:4},{id:"3",label:"Damage Assessment",description:"AI scanning for damage",status:"active",progress:80},{id:"4",label:"Cost Estimation",description:"Calculating repair costs",status:"pending"},{id:"5",label:"Report Compilation",description:"Generating recommendations",status:"pending"}],overallProgress:65,estimatedTime:15,status:"analyzing",statusMessage:"Deep analysis in progress...",animated:!0}},u={args:{steps:[{id:"1",label:"Image Processing",status:"complete",duration:2},{id:"2",label:"AI Analysis",status:"complete",duration:8},{id:"3",label:"Report Generation",status:"complete",duration:3},{id:"4",label:"Quality Check",description:"Final validation",status:"active",progress:90}],overallProgress:95,estimatedTime:3,status:"processing",statusMessage:"Almost done...",animated:!0}},p={args:{steps:[{id:"1",label:"Image Processing",status:"complete",duration:2},{id:"2",label:"AI Analysis",status:"complete",duration:12},{id:"3",label:"Report Generation",status:"complete",duration:4},{id:"4",label:"Quality Check",status:"complete",duration:2}],overallProgress:100,status:"success",statusMessage:"Analysis complete",animated:!1}},g={args:{steps:[{id:"1",label:"Image Processing",status:"complete",duration:2},{id:"2",label:"AI Analysis",status:"error",error:"Unable to process image: resolution too low. Please upload a higher quality image."},{id:"3",label:"Report Generation",status:"pending"}],overallProgress:35,status:"error",statusMessage:"Analysis failed"}},b={args:{steps:k,overallProgress:45,estimatedTime:25,status:"processing",statusMessage:"Processing...",compact:!0,animated:!0}},x={args:{steps:[{id:"1",label:"Upload",status:"complete"},{id:"2",label:"Process",status:"complete"},{id:"3",label:"Analyze",status:"complete"},{id:"4",label:"Report",status:"complete"}],overallProgress:100,status:"success",statusMessage:"Done",compact:!0,showDetails:!1}},h={args:{steps:k,overallProgress:60,estimatedTime:18,status:"analyzing",statusMessage:"Analyzing...",showDetails:!1,animated:!0}},v={args:{steps:[{id:"1",label:"Image Upload",description:"Uploading high-res images",status:"complete",duration:5},{id:"2",label:"Pre-processing",description:"Normalizing and enhancing",status:"complete",duration:8},{id:"3",label:"Object Detection",description:"Identifying structures",status:"complete",duration:15},{id:"4",label:"Damage Analysis",description:"ML model inference",status:"complete",duration:20},{id:"5",label:"Severity Scoring",description:"Calculating severity levels",status:"active",progress:40},{id:"6",label:"Cost Estimation",description:"Estimating repair costs",status:"pending"},{id:"7",label:"Report Generation",description:"Creating detailed report",status:"pending"},{id:"8",label:"Quality Assurance",description:"Final review",status:"pending"}],overallProgress:55,estimatedTime:120,status:"analyzing",statusMessage:"Comprehensive analysis in progress...",animated:!0}},f={args:{steps:[{id:"1",label:"Upload Images",status:"pending"},{id:"2",label:"Process Images",status:"pending"},{id:"3",label:"Analyze",status:"pending"},{id:"4",label:"Generate Report",status:"pending"}],overallProgress:0,status:"idle",statusMessage:"Ready to start"}};var C,I,M;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    steps: processingSteps,
    overallProgress: 45,
    estimatedTime: 25,
    status: 'processing',
    statusMessage: 'Analyzing property images...',
    showDetails: true,
    animated: true
  }
}`,...(M=(I=d.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var S,z,D;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    steps: [{
      id: '1',
      label: 'Image Processing',
      description: 'Preparing images',
      status: 'active',
      progress: 20
    }, {
      id: '2',
      label: 'AI Analysis',
      description: 'Deep learning analysis',
      status: 'pending'
    }, {
      id: '3',
      label: 'Report Generation',
      description: 'Creating report',
      status: 'pending'
    }],
    overallProgress: 10,
    estimatedTime: 45,
    status: 'processing',
    statusMessage: 'Starting analysis...',
    animated: true
  }
}`,...(D=(z=c.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var L,R,T;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    steps: [{
      id: '1',
      label: 'Image Enhancement',
      description: 'Optimizing quality',
      status: 'complete',
      duration: 2
    }, {
      id: '2',
      label: 'Structure Detection',
      description: 'Identifying elements',
      status: 'complete',
      duration: 4
    }, {
      id: '3',
      label: 'Damage Assessment',
      description: 'AI scanning for damage',
      status: 'active',
      progress: 80
    }, {
      id: '4',
      label: 'Cost Estimation',
      description: 'Calculating repair costs',
      status: 'pending'
    }, {
      id: '5',
      label: 'Report Compilation',
      description: 'Generating recommendations',
      status: 'pending'
    }],
    overallProgress: 65,
    estimatedTime: 15,
    status: 'analyzing',
    statusMessage: 'Deep analysis in progress...',
    animated: true
  }
}`,...(T=(R=m.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var G,E,_;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    steps: [{
      id: '1',
      label: 'Image Processing',
      status: 'complete',
      duration: 2
    }, {
      id: '2',
      label: 'AI Analysis',
      status: 'complete',
      duration: 8
    }, {
      id: '3',
      label: 'Report Generation',
      status: 'complete',
      duration: 3
    }, {
      id: '4',
      label: 'Quality Check',
      description: 'Final validation',
      status: 'active',
      progress: 90
    }],
    overallProgress: 95,
    estimatedTime: 3,
    status: 'processing',
    statusMessage: 'Almost done...',
    animated: true
  }
}`,...(_=(E=u.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var $,q,V;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    steps: [{
      id: '1',
      label: 'Image Processing',
      status: 'complete',
      duration: 2
    }, {
      id: '2',
      label: 'AI Analysis',
      status: 'complete',
      duration: 12
    }, {
      id: '3',
      label: 'Report Generation',
      status: 'complete',
      duration: 4
    }, {
      id: '4',
      label: 'Quality Check',
      status: 'complete',
      duration: 2
    }],
    overallProgress: 100,
    status: 'success',
    statusMessage: 'Analysis complete',
    animated: false
  }
}`,...(V=(q=p.parameters)==null?void 0:q.docs)==null?void 0:V.source}}};var U,B,W;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    steps: [{
      id: '1',
      label: 'Image Processing',
      status: 'complete',
      duration: 2
    }, {
      id: '2',
      label: 'AI Analysis',
      status: 'error',
      error: 'Unable to process image: resolution too low. Please upload a higher quality image.'
    }, {
      id: '3',
      label: 'Report Generation',
      status: 'pending'
    }],
    overallProgress: 35,
    status: 'error',
    statusMessage: 'Analysis failed'
  }
}`,...(W=(B=g.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};var F,O,Q;b.parameters={...b.parameters,docs:{...(F=b.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    steps: processingSteps,
    overallProgress: 45,
    estimatedTime: 25,
    status: 'processing',
    statusMessage: 'Processing...',
    compact: true,
    animated: true
  }
}`,...(Q=(O=b.parameters)==null?void 0:O.docs)==null?void 0:Q.source}}};var H,J,K;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    steps: [{
      id: '1',
      label: 'Upload',
      status: 'complete'
    }, {
      id: '2',
      label: 'Process',
      status: 'complete'
    }, {
      id: '3',
      label: 'Analyze',
      status: 'complete'
    }, {
      id: '4',
      label: 'Report',
      status: 'complete'
    }],
    overallProgress: 100,
    status: 'success',
    statusMessage: 'Done',
    compact: true,
    showDetails: false
  }
}`,...(K=(J=x.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var X,Y,Z;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    steps: processingSteps,
    overallProgress: 60,
    estimatedTime: 18,
    status: 'analyzing',
    statusMessage: 'Analyzing...',
    showDetails: false,
    animated: true
  }
}`,...(Z=(Y=h.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,se,ae;v.parameters={...v.parameters,docs:{...(ee=v.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    steps: [{
      id: '1',
      label: 'Image Upload',
      description: 'Uploading high-res images',
      status: 'complete',
      duration: 5
    }, {
      id: '2',
      label: 'Pre-processing',
      description: 'Normalizing and enhancing',
      status: 'complete',
      duration: 8
    }, {
      id: '3',
      label: 'Object Detection',
      description: 'Identifying structures',
      status: 'complete',
      duration: 15
    }, {
      id: '4',
      label: 'Damage Analysis',
      description: 'ML model inference',
      status: 'complete',
      duration: 20
    }, {
      id: '5',
      label: 'Severity Scoring',
      description: 'Calculating severity levels',
      status: 'active',
      progress: 40
    }, {
      id: '6',
      label: 'Cost Estimation',
      description: 'Estimating repair costs',
      status: 'pending'
    }, {
      id: '7',
      label: 'Report Generation',
      description: 'Creating detailed report',
      status: 'pending'
    }, {
      id: '8',
      label: 'Quality Assurance',
      description: 'Final review',
      status: 'pending'
    }],
    overallProgress: 55,
    estimatedTime: 120,
    status: 'analyzing',
    statusMessage: 'Comprehensive analysis in progress...',
    animated: true
  }
}`,...(ae=(se=v.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var te,re,ne;f.parameters={...f.parameters,docs:{...(te=f.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    steps: [{
      id: '1',
      label: 'Upload Images',
      status: 'pending'
    }, {
      id: '2',
      label: 'Process Images',
      status: 'pending'
    }, {
      id: '3',
      label: 'Analyze',
      status: 'pending'
    }, {
      id: '4',
      label: 'Generate Report',
      status: 'pending'
    }],
    overallProgress: 0,
    status: 'idle',
    statusMessage: 'Ready to start'
  }
}`,...(ne=(re=f.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};const je=["Processing","Starting","Analyzing","NearComplete","Complete","WithError","Compact","CompactComplete","NoDetails","LongProcess","Idle"];export{m as Analyzing,b as Compact,x as CompactComplete,p as Complete,f as Idle,v as LongProcess,u as NearComplete,h as NoDetails,d as Processing,c as Starting,g as WithError,je as __namedExportsOrder,ye as default};
