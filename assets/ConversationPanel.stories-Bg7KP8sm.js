import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r}from"./index-B2-qRKKC.js";import{c as o,a as Te}from"./utils-JCLedEej.js";import{C as z}from"./ChatMessage-jegDohLd.js";import{P as qe}from"./PromptInput-CGBSJty_.js";import"./_commonjsHelpers-Cpj98o6Y.js";const Ee=Te("relative flex flex-col overflow-hidden transition-all duration-300",{variants:{variant:{default:["rounded-2xl","border border-slate-200 dark:border-slate-700","bg-white dark:bg-slate-900","shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50"],embedded:["bg-slate-50 dark:bg-slate-800/50"],floating:["rounded-2xl","bg-white dark:bg-slate-900","shadow-2xl shadow-slate-300/50 dark:shadow-slate-900/50","ring-1 ring-slate-200 dark:ring-slate-700"]}},defaultVariants:{variant:"default"}}),$=({className:t})=>e.jsx("svg",{className:o("w-5 h-5",t),viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.5,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"})}),Re=({status:t})=>{const a={online:{color:"bg-emerald-500",label:"Connected",pulse:!1},offline:{color:"bg-slate-400",label:"Offline",pulse:!1},connecting:{color:"bg-amber-500",label:"Connecting...",pulse:!0}}[t];return e.jsxs("div",{className:"flex items-center gap-2",role:"status","aria-label":a.label,children:[e.jsxs("span",{className:"relative flex h-2.5 w-2.5",children:[a.pulse&&e.jsx("span",{className:o("absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",a.color),"aria-hidden":"true"}),e.jsx("span",{className:o("relative inline-flex rounded-full h-2.5 w-2.5",a.color),"aria-hidden":"true"})]}),e.jsx("span",{className:"text-xs font-medium text-slate-500 dark:text-slate-400",children:a.label})]})},We=({suggestion:t,onClick:a,index:l})=>{const c=[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"},"chat"),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"},"lightbulb"),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"},"rocket"),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"},"code")];return e.jsxs("button",{onClick:a,className:o("group flex items-start gap-3 p-4 rounded-xl text-left w-full","bg-white dark:bg-slate-800","border border-slate-200 dark:border-slate-700","hover:border-blue-300 dark:hover:border-blue-600","hover:shadow-lg hover:shadow-blue-500/10","transition-all duration-200","animate-in fade-in slide-in-from-bottom-2","focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"),style:{animationDelay:`${l*75}ms`},children:[e.jsx("div",{className:o("flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center","bg-gradient-to-br from-blue-500/10 to-violet-500/10","group-hover:from-blue-500/20 group-hover:to-violet-500/20","transition-colors duration-200"),children:e.jsx("svg",{className:"w-5 h-5 text-blue-600 dark:text-blue-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:1.5,"aria-hidden":"true",children:c[l%c.length]})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",children:t.text}),t.category&&e.jsx("span",{className:"text-xs text-slate-500 dark:text-slate-400",children:t.category})]}),e.jsx("svg",{className:"w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 4.5l7.5 7.5-7.5 7.5"})})]})};function I({messages:t,inputValue:a,onInputChange:l,onSubmit:c,suggestions:d=[],onSuggestionSelect:u,isLoading:m=!1,showTypingIndicator:h=!1,showVoice:g=!1,isVoiceActive:H=!1,onVoiceToggle:D,showAttachment:V=!1,onAttachment:p,header:x,emptyState:ke,placeholder:je="Type your message...",maxHeight:Se="500px",title:M,subtitle:L,showStatus:R=!1,connectionStatus:Ce="online",variant:Ne,className:Ae}){const P=r.useRef(null),T=r.useRef(null),[q,Ie]=r.useState(!0);r.useEffect(()=>{var s;q&&((s=P.current)==null||s.scrollIntoView({behavior:"smooth"}))},[t,h,q]);const He=r.useCallback(()=>{if(T.current){const{scrollTop:s,scrollHeight:E,clientHeight:Pe}=T.current;Ie(E-s-Pe<100)}},[]),De=s=>{s.trim()&&!m&&c(s)},Ve=s=>{u?u(s):c(s.text)},Me=()=>{var s;(s=P.current)==null||s.scrollIntoView({behavior:"smooth"})},W=(M||R)&&e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20",children:e.jsx($,{className:"text-white"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"font-semibold text-slate-900 dark:text-white",children:M||"AI Assistant"}),L&&e.jsx("p",{className:"text-xs text-slate-500 dark:text-slate-400",children:L})]})]}),R&&e.jsx(Re,{status:Ce})]}),Le=e.jsxs("div",{className:"flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in duration-500",children:[e.jsxs("div",{className:"relative mb-6",children:[e.jsx("div",{className:"w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-xl shadow-blue-500/25",children:e.jsx($,{className:"w-8 h-8 text-white animate-pulse"})}),e.jsx("div",{className:"absolute inset-0 -m-2 rounded-2xl border-2 border-blue-500/20 animate-ping",style:{animationDuration:"3s"},"aria-hidden":"true"})]}),e.jsx("h3",{className:"text-xl font-bold text-slate-900 dark:text-white mb-2",children:M||"Start a conversation"}),e.jsx("p",{className:"text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-8",children:L||"Ask anything or choose a suggestion below to get started."}),d.length>0&&e.jsx("div",{className:"w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3",children:d.slice(0,4).map((s,E)=>e.jsx(We,{suggestion:s,onClick:()=>Ve(s),index:E},s.id))}),e.jsxs("div",{className:"mt-8 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500",children:[e.jsx("kbd",{className:"px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 font-mono",children:"Enter"}),e.jsx("span",{children:"to send"}),e.jsx("span",{className:"mx-1",children:"·"}),e.jsx("kbd",{className:"px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 font-mono",children:"Shift + Enter"}),e.jsx("span",{children:"for new line"})]})]});return e.jsxs("div",{className:o(Ee({variant:Ne}),Ae),children:[(x||W)&&e.jsx("div",{className:o("flex-shrink-0 px-5 py-4","border-b border-slate-100 dark:border-slate-800","bg-slate-50/50 dark:bg-slate-800/50"),children:x||W}),e.jsx("div",{ref:T,onScroll:He,className:o("flex-1 overflow-y-auto p-5 space-y-4","scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600","scrollbar-track-transparent"),style:{maxHeight:Se},role:"log","aria-label":"Conversation messages","aria-live":"polite",children:t.length===0?ke||Le:e.jsxs(e.Fragment,{children:[t.map(s=>e.jsx(z,{role:s.role,content:s.content,timestamp:s.timestamp,isStreaming:s.isStreaming,error:s.error,avatar:s.avatar,senderName:s.senderName,status:s.status},s.id)),h&&e.jsx(z,{role:"assistant",content:"",isTyping:!0,timestamp:new Date}),e.jsx("div",{ref:P})]})}),!q&&t.length>0&&e.jsx("div",{className:"absolute bottom-28 left-1/2 -translate-x-1/2 z-10 animate-in fade-in slide-in-from-bottom-2 duration-200",children:e.jsxs("button",{onClick:Me,className:o("flex items-center gap-2 px-4 py-2 rounded-full","bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300","border border-slate-200 dark:border-slate-700","shadow-lg","hover:bg-slate-50 dark:hover:bg-slate-700","transition-all duration-200","focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"),"aria-label":"Scroll to latest messages",children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 14l-7 7m0 0l-7-7m7 7V3"})}),e.jsx("span",{className:"text-sm font-medium",children:"New messages"})]})}),e.jsxs("div",{className:o("flex-shrink-0 p-4","border-t border-slate-100 dark:border-slate-800","bg-slate-50/30 dark:bg-slate-800/30"),children:[m&&e.jsxs("div",{className:"flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 animate-in fade-in duration-200",children:[e.jsx("div",{className:"flex gap-1","aria-hidden":"true",children:[0,1,2].map(s=>e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce",style:{animationDelay:`${s*150}ms`}},s))}),e.jsx("span",{className:"text-sm text-blue-600 dark:text-blue-400",children:"AI is thinking..."})]}),e.jsx(qe,{value:a,onChange:l,onSubmit:De,placeholder:je,suggestions:t.length===0?[]:d,onSuggestionSelect:u,showVoice:g,isVoiceActive:H,onVoiceToggle:D,showAttachment:V,onAttachment:p,isLoading:m,variant:"elevated"}),e.jsxs("div",{className:"mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500",children:[e.jsx("svg",{className:"w-3.5 h-3.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),e.jsx("span",{children:"AI responses may not always be accurate"})]})]})]})}try{I.displayName="ConversationPanel",I.__docgenInfo={description:"",displayName:"ConversationPanel",props:{messages:{defaultValue:null,description:"Message history",name:"messages",required:!0,type:{name:"Message[]"}},inputValue:{defaultValue:null,description:"Current input value",name:"inputValue",required:!0,type:{name:"string"}},onInputChange:{defaultValue:null,description:"Input change handler",name:"onInputChange",required:!0,type:{name:"(value: string) => void"}},onSubmit:{defaultValue:null,description:"Message submit handler",name:"onSubmit",required:!0,type:{name:"(message: string) => void"}},suggestions:{defaultValue:{value:"[]"},description:"Suggestions",name:"suggestions",required:!1,type:{name:"PromptSuggestion[]"}},onSuggestionSelect:{defaultValue:null,description:"Suggestion select handler",name:"onSuggestionSelect",required:!1,type:{name:"((suggestion: PromptSuggestion) => void)"}},isLoading:{defaultValue:{value:"false"},description:"Loading state (AI is responding)",name:"isLoading",required:!1,type:{name:"boolean"}},showTypingIndicator:{defaultValue:{value:"false"},description:"Show typing indicator",name:"showTypingIndicator",required:!1,type:{name:"boolean"}},showVoice:{defaultValue:{value:"false"},description:"Show voice input",name:"showVoice",required:!1,type:{name:"boolean"}},isVoiceActive:{defaultValue:{value:"false"},description:"Voice active state",name:"isVoiceActive",required:!1,type:{name:"boolean"}},onVoiceToggle:{defaultValue:null,description:"Voice toggle handler",name:"onVoiceToggle",required:!1,type:{name:"(() => void)"}},showAttachment:{defaultValue:{value:"false"},description:"Show attachments option",name:"showAttachment",required:!1,type:{name:"boolean"}},onAttachment:{defaultValue:null,description:"Attachment handler",name:"onAttachment",required:!1,type:{name:"(() => void)"}},header:{defaultValue:null,description:"Header content",name:"header",required:!1,type:{name:"ReactNode"}},emptyState:{defaultValue:null,description:"Empty state content",name:"emptyState",required:!1,type:{name:"ReactNode"}},placeholder:{defaultValue:{value:"Type your message..."},description:"Placeholder text",name:"placeholder",required:!1,type:{name:"string"}},maxHeight:{defaultValue:{value:"500px"},description:"Max height for message area",name:"maxHeight",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"Title for the panel",name:"title",required:!1,type:{name:"string"}},subtitle:{defaultValue:null,description:"Subtitle/description",name:"subtitle",required:!1,type:{name:"string"}},showStatus:{defaultValue:{value:"false"},description:"Show connection status indicator",name:"showStatus",required:!1,type:{name:"boolean"}},connectionStatus:{defaultValue:{value:"online"},description:"Connection status",name:"connectionStatus",required:!1,type:{name:"enum",value:[{value:'"online"'},{value:'"offline"'},{value:'"connecting"'}]}},className:{defaultValue:null,description:"Additional class name",name:"className",required:!1,type:{name:"string"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:'"default" | "embedded" | "floating" | null'}}}}}catch{}const Ge={title:"AI Blocks/ConversationPanel",component:I,parameters:{layout:"padded",backgrounds:{default:"light"}},tags:["autodocs"],argTypes:{connectionStatus:{control:"select",options:["online","offline","connecting"]}}},i=[{id:"1",role:"user",content:"I uploaded some photos of my roof. Can you check for any damage?",timestamp:new Date(Date.now()-24e4),senderName:"John"},{id:"2",role:"assistant",content:`I've analyzed the roof images you uploaded. Here's what I found:

**Overall Condition: Good (78/100)**

### Issues Detected:
1. **Minor shingle lifting** in the northeast corner
2. **Moss growth** along the ridge line (cosmetic)

### Recommendations:
- Schedule a professional inspection within 6 months
- Consider moss treatment before winter

Would you like me to estimate repair costs or explain any finding in more detail?`,timestamp:new Date(Date.now()-18e4),senderName:"HomeCheck AI"},{id:"3",role:"user",content:"Yes, please estimate the costs for fixing the shingle issue.",timestamp:new Date(Date.now()-12e4),senderName:"John"},{id:"4",role:"assistant",content:`Based on the images and typical market rates:

**Shingle Repair Estimate:**
- Minor repair (5-10 shingles): $150 - $400
- If additional damage found: $400 - $800

**Factors that could affect cost:**
- Roof accessibility
- Shingle type matching
- Local labor rates

**Tip:** Get at least 3 quotes from licensed roofers for the best price.`,timestamp:new Date(Date.now()-6e4),senderName:"HomeCheck AI"}],we=[{id:"1",text:"Analyze my property photos",category:"Analysis"},{id:"2",text:"Check for water damage signs",category:"Inspection"},{id:"3",text:"Estimate repair costs",category:"Costs"},{id:"4",text:"Create maintenance checklist",category:"Planning"}],n=t=>{const[a,l]=r.useState(t.messages||[]),[c,d]=r.useState(""),[u,m]=r.useState(!1),[h,g]=r.useState(!1),H=D=>{const V={id:Date.now().toString(),role:"user",content:D,timestamp:new Date,senderName:"You"};l(p=>[...p,V]),d(""),m(!0),g(!0),setTimeout(()=>{const p={id:(Date.now()+1).toString(),role:"assistant",content:`I understand your question. Let me analyze that for you...

Based on my analysis, here are my recommendations:

1. **First step**: Review the current condition
2. **Second step**: Consider preventive measures
3. **Third step**: Schedule professional inspection if needed

Would you like more details on any of these points?`,timestamp:new Date,senderName:"HomeCheck AI"};l(x=>[...x,p]),m(!1),g(!1)},2e3)};return e.jsx("div",{className:"h-[650px] max-w-3xl mx-auto",children:e.jsx(I,{...t,messages:a,inputValue:c,onInputChange:d,onSubmit:H,isLoading:u,showTypingIndicator:h})})},f={render:t=>e.jsx(n,{...t}),args:{messages:i,title:"HomeCheck AI",subtitle:"Property Analysis Assistant",placeholder:"Ask about your property...",showStatus:!0,connectionStatus:"online",maxHeight:"450px"}},b={render:t=>e.jsx(n,{...t}),args:{messages:[],title:"HomeCheck AI",subtitle:"Your property analysis assistant",placeholder:"Ask me anything about your property...",suggestions:we,showStatus:!0,connectionStatus:"online",maxHeight:"450px"}},y={render:t=>e.jsx(n,{...t}),args:{messages:[],title:"Property Assistant",subtitle:"AI-powered property analysis",suggestions:[{id:"1",text:"Analyze roof condition",category:"Inspection"},{id:"2",text:"Check foundation status",category:"Inspection"},{id:"3",text:"Estimate renovation costs",category:"Costs"},{id:"4",text:"Generate inspection report",category:"Reports"}],showStatus:!0,connectionStatus:"online",maxHeight:"450px"}},v={render:t=>e.jsx(n,{...t}),args:{messages:i.slice(0,2),title:"Voice-Enabled Assistant",subtitle:"Speak or type your questions",showVoice:!0,showStatus:!0,connectionStatus:"online",maxHeight:"450px"}},w={render:t=>e.jsx(n,{...t}),args:{messages:i.slice(0,2),title:"Image Analysis",subtitle:"Upload photos for AI analysis",showAttachment:!0,placeholder:"Type a message or attach images...",showStatus:!0,connectionStatus:"online",maxHeight:"450px"}},k={render:t=>e.jsx(n,{...t}),args:{messages:i,title:"HomeCheck AI Pro",subtitle:"Complete property analysis suite",showVoice:!0,showAttachment:!0,placeholder:"Ask about your property...",suggestions:[{id:"1",text:"Generate detailed report",category:"Reports"},{id:"2",text:"Find local contractors",category:"Services"}],showStatus:!0,connectionStatus:"online",maxHeight:"450px"}},j={render:t=>e.jsx(n,{...t}),args:{messages:[],title:"Property Assistant",subtitle:"Establishing connection...",showStatus:!0,connectionStatus:"connecting",suggestions:we,maxHeight:"450px"}},S={render:t=>e.jsx(n,{...t}),args:{messages:i.slice(0,2),title:"Property Assistant",subtitle:"Connection lost",showStatus:!0,connectionStatus:"offline",maxHeight:"450px"}},C={render:t=>e.jsx(n,{...t}),args:{messages:[...i,{id:"5",role:"user",content:"What about the moss on the roof?",timestamp:new Date(Date.now()-5e4),senderName:"John"},{id:"6",role:"assistant",content:`The moss growth is primarily cosmetic but can trap moisture over time. Here's what you can do:

**DIY Treatment:**
- Zinc strips along the ridge ($50-100)
- Moss killer spray ($20-40)

**Professional cleaning:** $200-500

I recommend addressing it before the wet season to prevent potential damage.`,timestamp:new Date(Date.now()-4e4),senderName:"HomeCheck AI"},{id:"7",role:"user",content:"Thanks! Can you generate a full report I can share with my spouse?",timestamp:new Date(Date.now()-3e4),senderName:"John"},{id:"8",role:"assistant",content:`Absolutely! I've compiled a comprehensive report for you.

**Property Inspection Report**
- Date: Today
- Overall Score: 78/100

The report includes:
- All findings with photos
- Cost estimates
- Recommended timeline
- Local contractor suggestions

Would you like me to customize any section before sharing?`,timestamp:new Date,senderName:"HomeCheck AI"}],title:"HomeCheck AI",subtitle:"Property Analysis Complete",showStatus:!0,connectionStatus:"online",maxHeight:"450px"}},N={render:t=>e.jsx(n,{...t}),args:{messages:i.slice(0,2),header:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold",children:"HC"}),e.jsxs("div",{children:[e.jsx("h2",{className:"font-semibold text-slate-900 dark:text-white",children:"Custom Header"}),e.jsx("p",{className:"text-xs text-emerald-600 dark:text-emerald-400",children:"Premium Plan"})]})]}),e.jsx("button",{className:"px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors",children:"Settings"})]}),maxHeight:"450px"}},A={render:t=>e.jsx(n,{...t}),args:{messages:i,placeholder:"Type your message...",maxHeight:"450px"}};var B,_,F;f.parameters={...f.parameters,docs:{...(B=f.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages,
    title: 'HomeCheck AI',
    subtitle: 'Property Analysis Assistant',
    placeholder: 'Ask about your property...',
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px'
  }
}`,...(F=(_=f.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var O,G,J;b.parameters={...b.parameters,docs:{...(O=b.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <ConversationDemo {...args} />,
  args: {
    messages: [],
    title: 'HomeCheck AI',
    subtitle: 'Your property analysis assistant',
    placeholder: 'Ask me anything about your property...',
    suggestions,
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px'
  }
}`,...(J=(G=b.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Y,U,Z;y.parameters={...y.parameters,docs:{...(Y=y.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: args => <ConversationDemo {...args} />,
  args: {
    messages: [],
    title: 'Property Assistant',
    subtitle: 'AI-powered property analysis',
    suggestions: [{
      id: '1',
      text: 'Analyze roof condition',
      category: 'Inspection'
    }, {
      id: '2',
      text: 'Check foundation status',
      category: 'Inspection'
    }, {
      id: '3',
      text: 'Estimate renovation costs',
      category: 'Costs'
    }, {
      id: '4',
      text: 'Generate inspection report',
      category: 'Reports'
    }],
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px'
  }
}`,...(Z=(U=y.parameters)==null?void 0:U.docs)==null?void 0:Z.source}}};var Q,K,X;v.parameters={...v.parameters,docs:{...(Q=v.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages.slice(0, 2),
    title: 'Voice-Enabled Assistant',
    subtitle: 'Speak or type your questions',
    showVoice: true,
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px'
  }
}`,...(X=(K=v.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var ee,te,se;w.parameters={...w.parameters,docs:{...(ee=w.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: args => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages.slice(0, 2),
    title: 'Image Analysis',
    subtitle: 'Upload photos for AI analysis',
    showAttachment: true,
    placeholder: 'Type a message or attach images...',
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px'
  }
}`,...(se=(te=w.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var ae,ne,oe;k.parameters={...k.parameters,docs:{...(ae=k.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: args => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages,
    title: 'HomeCheck AI Pro',
    subtitle: 'Complete property analysis suite',
    showVoice: true,
    showAttachment: true,
    placeholder: 'Ask about your property...',
    suggestions: [{
      id: '1',
      text: 'Generate detailed report',
      category: 'Reports'
    }, {
      id: '2',
      text: 'Find local contractors',
      category: 'Services'
    }],
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px'
  }
}`,...(oe=(ne=k.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var re,ie,le;j.parameters={...j.parameters,docs:{...(re=j.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: args => <ConversationDemo {...args} />,
  args: {
    messages: [],
    title: 'Property Assistant',
    subtitle: 'Establishing connection...',
    showStatus: true,
    connectionStatus: 'connecting',
    suggestions,
    maxHeight: '450px'
  }
}`,...(le=(ie=j.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};var ce,de,me;S.parameters={...S.parameters,docs:{...(ce=S.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: args => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages.slice(0, 2),
    title: 'Property Assistant',
    subtitle: 'Connection lost',
    showStatus: true,
    connectionStatus: 'offline',
    maxHeight: '450px'
  }
}`,...(me=(de=S.parameters)==null?void 0:de.docs)==null?void 0:me.source}}};var ue,pe,he;C.parameters={...C.parameters,docs:{...(ue=C.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: args => <ConversationDemo {...args} />,
  args: {
    messages: [...sampleMessages, {
      id: '5',
      role: 'user',
      content: 'What about the moss on the roof?',
      timestamp: new Date(Date.now() - 50000),
      senderName: 'John'
    }, {
      id: '6',
      role: 'assistant',
      content: "The moss growth is primarily cosmetic but can trap moisture over time. Here's what you can do:\\n\\n**DIY Treatment:**\\n- Zinc strips along the ridge ($50-100)\\n- Moss killer spray ($20-40)\\n\\n**Professional cleaning:** $200-500\\n\\nI recommend addressing it before the wet season to prevent potential damage.",
      timestamp: new Date(Date.now() - 40000),
      senderName: 'HomeCheck AI'
    }, {
      id: '7',
      role: 'user',
      content: 'Thanks! Can you generate a full report I can share with my spouse?',
      timestamp: new Date(Date.now() - 30000),
      senderName: 'John'
    }, {
      id: '8',
      role: 'assistant',
      content: "Absolutely! I've compiled a comprehensive report for you.\\n\\n**Property Inspection Report**\\n- Date: Today\\n- Overall Score: 78/100\\n\\nThe report includes:\\n- All findings with photos\\n- Cost estimates\\n- Recommended timeline\\n- Local contractor suggestions\\n\\nWould you like me to customize any section before sharing?",
      timestamp: new Date(),
      senderName: 'HomeCheck AI'
    }],
    title: 'HomeCheck AI',
    subtitle: 'Property Analysis Complete',
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px'
  }
}`,...(he=(pe=C.parameters)==null?void 0:pe.docs)==null?void 0:he.source}}};var ge,xe,fe;N.parameters={...N.parameters,docs:{...(ge=N.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: args => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages.slice(0, 2),
    header: <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
            HC
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Custom Header</h2>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">Premium Plan</p>
          </div>
        </div>
        <button className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          Settings
        </button>
      </div>,
    maxHeight: '450px'
  }
}`,...(fe=(xe=N.parameters)==null?void 0:xe.docs)==null?void 0:fe.source}}};var be,ye,ve;A.parameters={...A.parameters,docs:{...(be=A.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: args => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages,
    placeholder: 'Type your message...',
    maxHeight: '450px'
  }
}`,...(ve=(ye=A.parameters)==null?void 0:ye.docs)==null?void 0:ve.source}}};const Je=["Default","Empty","WithSuggestions","WithVoiceInput","WithAttachments","FullFeatured","Connecting","Offline","LongConversation","CustomHeader","MinimalStyle"];export{j as Connecting,N as CustomHeader,f as Default,b as Empty,k as FullFeatured,C as LongConversation,A as MinimalStyle,S as Offline,w as WithAttachments,y as WithSuggestions,v as WithVoiceInput,Je as __namedExportsOrder,Ge as default};
