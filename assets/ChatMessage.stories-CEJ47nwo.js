import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{C as t,M as n}from"./ChatMessage-jegDohLd.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./utils-JCLedEej.js";const S=({children:s,title:hs="AI Assistant",subtitle:xs="Online",showHeader:ys=!0})=>e.jsx("div",{className:"w-full max-w-2xl mx-auto",children:e.jsxs("div",{className:"bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden",children:[ys&&e.jsxs("div",{className:"flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700",children:[e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg",children:e.jsx("svg",{className:"w-5 h-5 text-white",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.5,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"})})}),e.jsx("span",{className:"absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-semibold text-slate-900 dark:text-white",children:hs}),e.jsxs("p",{className:"text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1",children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"}),xs]})]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("button",{className:"p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors","aria-label":"Settings",children:e.jsx("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:1.5,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"})})})})]}),e.jsx("div",{className:"p-5 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-900 min-h-[200px] max-h-[500px] overflow-y-auto",children:e.jsx("div",{className:"flex flex-col gap-4",children:s})})]})}),a=({children:s})=>e.jsx("div",{className:"w-full max-w-2xl mx-auto p-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl min-h-[150px] flex items-center",children:e.jsx("div",{className:"w-full flex flex-col gap-4",children:s})}),Ss={title:"AI/ChatMessage",component:t,parameters:{layout:"centered",backgrounds:{default:"subtle",values:[{name:"subtle",value:"#f8fafc"},{name:"light",value:"#ffffff"},{name:"dark",value:"#0f172a"}]},docs:{description:{component:`
A professional chat message component designed for AI-powered conversational interfaces.

## Features
- **Role-based styling**: Different visual styles for user, assistant, and system messages
- **Rich avatars**: Support for images, status indicators, and default AI/user icons
- **Interactive actions**: Hover actions for copy, regenerate, feedback
- **Animations**: Smooth entrance animations, typing indicators, streaming cursor
- **Reactions**: Emoji reactions with counts
- **Accessibility**: Full keyboard navigation and screen reader support
        `}}},tags:["autodocs"],argTypes:{role:{control:"select",options:["user","assistant","system"],description:"The role of the message sender"},size:{control:"select",options:["sm","md","lg"],description:"Size variant of the message"},onlineStatus:{control:"select",options:["online","offline","away","busy"],description:"Online status indicator for avatar"},isStreaming:{control:"boolean",description:"Show streaming cursor animation"},isTyping:{control:"boolean",description:"Show typing indicator dots"}},decorators:[s=>e.jsx("div",{className:"w-full min-w-[600px]",children:e.jsx(s,{})})]},M=()=>e.jsx("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})}),gs=()=>e.jsx("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),us=()=>e.jsx("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"})}),fs=()=>e.jsx("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,"aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"})}),r={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"user",content:"Can you analyze this image of my house roof for potential damage?",timestamp:new Date,senderName:"John",onlineStatus:"online"}},o={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"assistant",content:`I've analyzed the image of your roof. I found 3 areas of concern:

1. **Missing shingles** in the northeast corner
2. **Moss growth** along the ridge line
3. **Potential water damage** near the chimney flashing

I recommend getting a professional inspection within the next 30 days.`,timestamp:new Date,senderName:"AI Assistant",onlineStatus:"online"}},i={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"system",content:"Analysis session started. Upload an image to begin."}},c={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"assistant",content:"Analyzing your image for structural damage...",isStreaming:!0,timestamp:new Date}},l={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"assistant",content:"",isTyping:!0}},d={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"assistant",content:"I was unable to process your request.",error:"Image format not supported. Please upload a JPG or PNG file.",timestamp:new Date}},m={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"user",content:"What issues do you see with my property?",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=user123",senderName:"Sarah",timestamp:new Date,onlineStatus:"online"}},p={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"assistant",content:"Processing complete. No issues detected.",size:"sm",timestamp:new Date}},g={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"user",content:"Can you provide a detailed breakdown of all the findings from the analysis?",size:"lg",timestamp:new Date,senderName:"Michael"}},u={render:s=>e.jsxs(a,{children:[e.jsx("p",{className:"text-sm text-slate-500 dark:text-slate-400 mb-4 text-center",children:"Hover over the message to see action buttons"}),e.jsx(t,{...s})]}),args:{role:"assistant",content:"Here's my analysis of the property condition. The overall score is 72/100, which indicates good condition with some areas needing attention.",timestamp:new Date,actionsOnHover:!0,actions:e.jsxs(e.Fragment,{children:[e.jsx(n,{icon:e.jsx(M,{}),label:"Copy message",onClick:()=>console.log("Copy")}),e.jsx(n,{icon:e.jsx(gs,{}),label:"Regenerate response",onClick:()=>console.log("Regenerate")}),e.jsx(n,{icon:e.jsx(us,{}),label:"Good response",onClick:()=>console.log("Thumbs up")}),e.jsx(n,{icon:e.jsx(fs,{}),label:"Bad response",onClick:()=>console.log("Thumbs down")})]})}},h={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"assistant",content:"Based on my analysis, I've identified 5 potential issues that need your attention.",timestamp:new Date,actionsOnHover:!1,actions:e.jsxs(e.Fragment,{children:[e.jsx(n,{icon:e.jsx(M,{}),label:"Copy",onClick:()=>console.log("Copy")}),e.jsx(n,{icon:e.jsx(gs,{}),label:"Regenerate",onClick:()=>console.log("Regenerate")})]})}},x={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"assistant",content:"The analysis is complete! Your property scored 85/100 which is excellent.",timestamp:new Date,reactions:[{emoji:"👍",count:3,reacted:!0},{emoji:"❤️",count:1},{emoji:"🎉",count:2}],onReactionClick:s=>console.log("Reaction clicked:",s)}},y={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"user",content:"I'll check back later for the results.",timestamp:new Date,senderName:"Alex",onlineStatus:"away"}},f={render:s=>e.jsx(a,{children:e.jsx(t,{...s})}),args:{role:"user",content:"Please prioritize the roof inspection.",timestamp:new Date,senderName:"Chris",onlineStatus:"busy"}},w={render:()=>e.jsxs(S,{title:"HomeCheck AI",subtitle:"Ready to assist",children:[e.jsx(t,{role:"system",content:"Welcome to HomeCheck AI. Upload an image of your property to begin analysis."}),e.jsx(t,{role:"user",content:"I'd like to check the condition of my roof. Here's a photo I took yesterday.",timestamp:new Date(Date.now()-12e4),senderName:"John",onlineStatus:"online"}),e.jsx(t,{role:"assistant",content:"I'm analyzing the roof image now. This typically takes 10-15 seconds...",isStreaming:!0,timestamp:new Date(Date.now()-6e4)}),e.jsx(t,{role:"assistant",content:"Analysis complete! I found **2 areas of concern**:\\n\\n1. Several shingles appear to be curling in the northeast section\\n2. There's visible algae growth that should be cleaned\\n\\nOverall condition score: **78/100** (Good)",timestamp:new Date,reactions:[{emoji:"👍",count:1,reacted:!0}]}),e.jsx(t,{role:"user",content:"Can you estimate the repair cost?",timestamp:new Date,senderName:"John",onlineStatus:"online"}),e.jsx(t,{role:"assistant",content:"",isTyping:!0})]})},v={render:s=>e.jsxs(S,{title:"Property Inspector AI",subtitle:"Generating report...",children:[e.jsx(t,{role:"user",content:"Generate a full inspection report for my property.",timestamp:new Date(Date.now()-3e4),senderName:"Client",onlineStatus:"online"}),e.jsx(t,{...s})]}),args:{role:"assistant",content:`# Comprehensive Property Analysis Report

## Overview
Based on the images provided, I've conducted a thorough analysis of your property's exterior condition.

## Findings

### 1. Roof Condition (Score: 72/100)
- **Shingles**: Several curling shingles detected in the northeast quadrant
- **Flashing**: Minor gaps observed around chimney base
- **Gutters**: Debris accumulation suggests need for cleaning

### 2. Siding Analysis (Score: 85/100)
- Overall condition is good
- Minor paint peeling on south-facing wall
- No signs of water damage or rot

### 3. Foundation (Score: 90/100)
- No visible cracks
- Proper grading around perimeter
- Drainage appears adequate

## Recommendations
1. Schedule roof inspection within 30 days
2. Clean gutters before next rain season
3. Touch up paint on south wall

## Cost Estimates
| Item | Estimate |
|------|----------|
| Roof repairs | $500-$1,200 |
| Gutter cleaning | $150-$300 |
| Paint touch-up | $200-$400 |

**Total estimated range: $850-$1,900**`,timestamp:new Date,actionsOnHover:!0,actions:e.jsxs(e.Fragment,{children:[e.jsx(n,{icon:e.jsx(M,{}),label:"Copy report",onClick:()=>console.log("Copy")}),e.jsx(n,{icon:e.jsx(us,{}),label:"Good response",onClick:()=>console.log("Thumbs up")})]})}},j={render:()=>e.jsx(S,{title:"Size Comparison",subtitle:"Visual reference",showHeader:!1,children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide",children:"Small"}),e.jsx(t,{role:"assistant",content:"This is a small message variant.",size:"sm"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide",children:"Medium (Default)"}),e.jsx(t,{role:"assistant",content:"This is the medium/default message variant.",size:"md"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide",children:"Large"}),e.jsx(t,{role:"assistant",content:"This is a large message variant.",size:"lg"})]})]})})},C={render:()=>e.jsx(S,{title:"Message Roles",subtitle:"Visual reference",showHeader:!1,children:e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{role:"user",content:"This is a user message - aligned to the right with blue background.",senderName:"User",onlineStatus:"online"}),e.jsx(t,{role:"assistant",content:"This is an assistant message - aligned to the left with neutral background and AI avatar.",senderName:"AI Assistant",onlineStatus:"online"}),e.jsx(t,{role:"system",content:"This is a system message - centered with amber styling for notifications."})]})})},b={render:()=>e.jsxs(S,{title:"Interactive States",subtitle:"Animation showcase",children:[e.jsx(t,{role:"assistant",content:"Normal message state",timestamp:new Date}),e.jsx(t,{role:"assistant",content:"Streaming response with cursor animation...",isStreaming:!0,timestamp:new Date}),e.jsx(t,{role:"assistant",content:"",isTyping:!0}),e.jsx(t,{role:"assistant",content:"Error state example",error:"Connection timed out. Please try again.",timestamp:new Date})]})};var k,N,I,A,D;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'user',
    content: 'Can you analyze this image of my house roof for potential damage?',
    timestamp: new Date(),
    senderName: 'John',
    onlineStatus: 'online'
  }
}`,...(I=(N=r.parameters)==null?void 0:N.docs)==null?void 0:I.source},description:{story:"Default user message with clean, modern styling",...(D=(A=r.parameters)==null?void 0:A.docs)==null?void 0:D.description}}};var W,T,z,R,L;o.parameters={...o.parameters,docs:{...(W=o.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'assistant',
    content: "I've analyzed the image of your roof. I found 3 areas of concern:\\n\\n1. **Missing shingles** in the northeast corner\\n2. **Moss growth** along the ridge line\\n3. **Potential water damage** near the chimney flashing\\n\\nI recommend getting a professional inspection within the next 30 days.",
    timestamp: new Date(),
    senderName: 'AI Assistant',
    onlineStatus: 'online'
  }
}`,...(z=(T=o.parameters)==null?void 0:T.docs)==null?void 0:z.source},description:{story:"AI assistant response with professional formatting",...(L=(R=o.parameters)==null?void 0:R.docs)==null?void 0:L.description}}};var H,B,P,G,$;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'system',
    content: 'Analysis session started. Upload an image to begin.'
  }
}`,...(P=(B=i.parameters)==null?void 0:B.docs)==null?void 0:P.source},description:{story:"System notification message with distinct styling",...($=(G=i.parameters)==null?void 0:G.docs)==null?void 0:$.description}}};var O,U,E,F,J;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'assistant',
    content: 'Analyzing your image for structural damage...',
    isStreaming: true,
    timestamp: new Date()
  }
}`,...(E=(U=c.parameters)==null?void 0:U.docs)==null?void 0:E.source},description:{story:"Message with streaming cursor animation",...(J=(F=c.parameters)==null?void 0:F.docs)==null?void 0:J.description}}};var V,q,Y,_,K;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'assistant',
    content: '',
    isTyping: true
  }
}`,...(Y=(q=l.parameters)==null?void 0:q.docs)==null?void 0:Y.source},description:{story:"Animated typing indicator",...(K=(_=l.parameters)==null?void 0:_.docs)==null?void 0:K.description}}};var Q,X,Z,ee,se;d.parameters={...d.parameters,docs:{...(Q=d.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'assistant',
    content: 'I was unable to process your request.',
    error: 'Image format not supported. Please upload a JPG or PNG file.',
    timestamp: new Date()
  }
}`,...(Z=(X=d.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:"Error state with clear visual feedback",...(se=(ee=d.parameters)==null?void 0:ee.docs)==null?void 0:se.description}}};var te,ae,ne,re,oe;m.parameters={...m.parameters,docs:{...(te=m.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'user',
    content: 'What issues do you see with my property?',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user123',
    senderName: 'Sarah',
    timestamp: new Date(),
    onlineStatus: 'online'
  }
}`,...(ne=(ae=m.parameters)==null?void 0:ae.docs)==null?void 0:ne.source},description:{story:"Message with custom avatar image",...(oe=(re=m.parameters)==null?void 0:re.docs)==null?void 0:oe.description}}};var ie,ce,le,de,me;p.parameters={...p.parameters,docs:{...(ie=p.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'assistant',
    content: 'Processing complete. No issues detected.',
    size: 'sm',
    timestamp: new Date()
  }
}`,...(le=(ce=p.parameters)==null?void 0:ce.docs)==null?void 0:le.source},description:{story:"Compact size variant",...(me=(de=p.parameters)==null?void 0:de.docs)==null?void 0:me.description}}};var pe,ge,ue,he,xe;g.parameters={...g.parameters,docs:{...(pe=g.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'user',
    content: 'Can you provide a detailed breakdown of all the findings from the analysis?',
    size: 'lg',
    timestamp: new Date(),
    senderName: 'Michael'
  }
}`,...(ue=(ge=g.parameters)==null?void 0:ge.docs)==null?void 0:ue.source},description:{story:"Large size variant for emphasis",...(xe=(he=g.parameters)==null?void 0:he.docs)==null?void 0:xe.description}}};var ye,fe,we,ve,je;u.parameters={...u.parameters,docs:{...(ye=u.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center">
        Hover over the message to see action buttons
      </p>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'assistant',
    content: "Here's my analysis of the property condition. The overall score is 72/100, which indicates good condition with some areas needing attention.",
    timestamp: new Date(),
    actionsOnHover: true,
    actions: <>
        <MessageActionButton icon={<CopyIcon />} label="Copy message" onClick={() => console.log('Copy')} />
        <MessageActionButton icon={<RefreshIcon />} label="Regenerate response" onClick={() => console.log('Regenerate')} />
        <MessageActionButton icon={<ThumbsUpIcon />} label="Good response" onClick={() => console.log('Thumbs up')} />
        <MessageActionButton icon={<ThumbsDownIcon />} label="Bad response" onClick={() => console.log('Thumbs down')} />
      </>
  }
}`,...(we=(fe=u.parameters)==null?void 0:fe.docs)==null?void 0:we.source},description:{story:"Message with hover-activated action buttons",...(je=(ve=u.parameters)==null?void 0:ve.docs)==null?void 0:je.description}}};var Ce,be,Se,Me,ke;h.parameters={...h.parameters,docs:{...(Ce=h.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'assistant',
    content: "Based on my analysis, I've identified 5 potential issues that need your attention.",
    timestamp: new Date(),
    actionsOnHover: false,
    actions: <>
        <MessageActionButton icon={<CopyIcon />} label="Copy" onClick={() => console.log('Copy')} />
        <MessageActionButton icon={<RefreshIcon />} label="Regenerate" onClick={() => console.log('Regenerate')} />
      </>
  }
}`,...(Se=(be=h.parameters)==null?void 0:be.docs)==null?void 0:Se.source},description:{story:"Message with always-visible actions",...(ke=(Me=h.parameters)==null?void 0:Me.docs)==null?void 0:ke.description}}};var Ne,Ie,Ae,De,We;x.parameters={...x.parameters,docs:{...(Ne=x.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'assistant',
    content: 'The analysis is complete! Your property scored 85/100 which is excellent.',
    timestamp: new Date(),
    reactions: [{
      emoji: '👍',
      count: 3,
      reacted: true
    }, {
      emoji: '❤️',
      count: 1
    }, {
      emoji: '🎉',
      count: 2
    }],
    onReactionClick: (emoji: string) => console.log('Reaction clicked:', emoji)
  }
}`,...(Ae=(Ie=x.parameters)==null?void 0:Ie.docs)==null?void 0:Ae.source},description:{story:"Message with emoji reactions",...(We=(De=x.parameters)==null?void 0:De.docs)==null?void 0:We.description}}};var Te,ze,Re,Le,He;y.parameters={...y.parameters,docs:{...(Te=y.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'user',
    content: "I'll check back later for the results.",
    timestamp: new Date(),
    senderName: 'Alex',
    onlineStatus: 'away'
  }
}`,...(Re=(ze=y.parameters)==null?void 0:ze.docs)==null?void 0:Re.source},description:{story:"User status: Away",...(He=(Le=y.parameters)==null?void 0:Le.docs)==null?void 0:He.description}}};var Be,Pe,Ge,$e,Oe;f.parameters={...f.parameters,docs:{...(Be=f.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  render: args => <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>,
  args: {
    role: 'user',
    content: 'Please prioritize the roof inspection.',
    timestamp: new Date(),
    senderName: 'Chris',
    onlineStatus: 'busy'
  }
}`,...(Ge=(Pe=f.parameters)==null?void 0:Pe.docs)==null?void 0:Ge.source},description:{story:"User status: Busy",...(Oe=($e=f.parameters)==null?void 0:$e.docs)==null?void 0:Oe.description}}};var Ue,Ee,Fe,Je,Ve;w.parameters={...w.parameters,docs:{...(Ue=w.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  render: () => <ChatContainer title="HomeCheck AI" subtitle="Ready to assist">
      <ChatMessage role="system" content="Welcome to HomeCheck AI. Upload an image of your property to begin analysis." />
      <ChatMessage role="user" content="I'd like to check the condition of my roof. Here's a photo I took yesterday." timestamp={new Date(Date.now() - 120000)} senderName="John" onlineStatus="online" />
      <ChatMessage role="assistant" content="I'm analyzing the roof image now. This typically takes 10-15 seconds..." isStreaming timestamp={new Date(Date.now() - 60000)} />
      <ChatMessage role="assistant" content="Analysis complete! I found **2 areas of concern**:\\n\\n1. Several shingles appear to be curling in the northeast section\\n2. There's visible algae growth that should be cleaned\\n\\nOverall condition score: **78/100** (Good)" timestamp={new Date()} reactions={[{
      emoji: '👍',
      count: 1,
      reacted: true
    }]} />
      <ChatMessage role="user" content="Can you estimate the repair cost?" timestamp={new Date()} senderName="John" onlineStatus="online" />
      <ChatMessage role="assistant" content="" isTyping />
    </ChatContainer>
}`,...(Fe=(Ee=w.parameters)==null?void 0:Ee.docs)==null?void 0:Fe.source},description:{story:"Full conversation flow demonstrating real-world usage",...(Ve=(Je=w.parameters)==null?void 0:Je.docs)==null?void 0:Ve.description}}};var qe,Ye,_e,Ke,Qe;v.parameters={...v.parameters,docs:{...(qe=v.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  render: args => <ChatContainer title="Property Inspector AI" subtitle="Generating report...">
      <ChatMessage role="user" content="Generate a full inspection report for my property." timestamp={new Date(Date.now() - 30000)} senderName="Client" onlineStatus="online" />
      <ChatMessage {...args} />
    </ChatContainer>,
  args: {
    role: 'assistant',
    content: \`# Comprehensive Property Analysis Report

## Overview
Based on the images provided, I've conducted a thorough analysis of your property's exterior condition.

## Findings

### 1. Roof Condition (Score: 72/100)
- **Shingles**: Several curling shingles detected in the northeast quadrant
- **Flashing**: Minor gaps observed around chimney base
- **Gutters**: Debris accumulation suggests need for cleaning

### 2. Siding Analysis (Score: 85/100)
- Overall condition is good
- Minor paint peeling on south-facing wall
- No signs of water damage or rot

### 3. Foundation (Score: 90/100)
- No visible cracks
- Proper grading around perimeter
- Drainage appears adequate

## Recommendations
1. Schedule roof inspection within 30 days
2. Clean gutters before next rain season
3. Touch up paint on south wall

## Cost Estimates
| Item | Estimate |
|------|----------|
| Roof repairs | $500-$1,200 |
| Gutter cleaning | $150-$300 |
| Paint touch-up | $200-$400 |

**Total estimated range: $850-$1,900**\`,
    timestamp: new Date(),
    actionsOnHover: true,
    actions: <>
        <MessageActionButton icon={<CopyIcon />} label="Copy report" onClick={() => console.log('Copy')} />
        <MessageActionButton icon={<ThumbsUpIcon />} label="Good response" onClick={() => console.log('Thumbs up')} />
      </>
  }
}`,...(_e=(Ye=v.parameters)==null?void 0:Ye.docs)==null?void 0:_e.source},description:{story:"Long-form message with markdown formatting",...(Qe=(Ke=v.parameters)==null?void 0:Ke.docs)==null?void 0:Qe.description}}};var Xe,Ze,es,ss,ts;j.parameters={...j.parameters,docs:{...(Xe=j.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  render: () => <ChatContainer title="Size Comparison" subtitle="Visual reference" showHeader={false}>
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Small</p>
          <ChatMessage role="assistant" content="This is a small message variant." size="sm" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Medium (Default)</p>
          <ChatMessage role="assistant" content="This is the medium/default message variant." size="md" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Large</p>
          <ChatMessage role="assistant" content="This is a large message variant." size="lg" />
        </div>
      </div>
    </ChatContainer>
}`,...(es=(Ze=j.parameters)==null?void 0:Ze.docs)==null?void 0:es.source},description:{story:"Multiple message sizes comparison",...(ts=(ss=j.parameters)==null?void 0:ss.docs)==null?void 0:ts.description}}};var as,ns,rs,os,is;C.parameters={...C.parameters,docs:{...(as=C.parameters)==null?void 0:as.docs,source:{originalSource:`{
  render: () => <ChatContainer title="Message Roles" subtitle="Visual reference" showHeader={false}>
      <div className="space-y-4">
        <ChatMessage role="user" content="This is a user message - aligned to the right with blue background." senderName="User" onlineStatus="online" />
        <ChatMessage role="assistant" content="This is an assistant message - aligned to the left with neutral background and AI avatar." senderName="AI Assistant" onlineStatus="online" />
        <ChatMessage role="system" content="This is a system message - centered with amber styling for notifications." />
      </div>
    </ChatContainer>
}`,...(rs=(ns=C.parameters)==null?void 0:ns.docs)==null?void 0:rs.source},description:{story:"All message roles comparison",...(is=(os=C.parameters)==null?void 0:os.docs)==null?void 0:is.description}}};var cs,ls,ds,ms,ps;b.parameters={...b.parameters,docs:{...(cs=b.parameters)==null?void 0:cs.docs,source:{originalSource:`{
  render: () => <ChatContainer title="Interactive States" subtitle="Animation showcase">
      <ChatMessage role="assistant" content="Normal message state" timestamp={new Date()} />
      <ChatMessage role="assistant" content="Streaming response with cursor animation..." isStreaming timestamp={new Date()} />
      <ChatMessage role="assistant" content="" isTyping />
      <ChatMessage role="assistant" content="Error state example" error="Connection timed out. Please try again." timestamp={new Date()} />
    </ChatContainer>
}`,...(ds=(ls=b.parameters)==null?void 0:ls.docs)==null?void 0:ds.source},description:{story:"Interactive states showcase",...(ps=(ms=b.parameters)==null?void 0:ms.docs)==null?void 0:ps.description}}};const Ms=["UserMessage","AssistantMessage","SystemMessage","StreamingMessage","TypingIndicator","ErrorMessage","WithAvatar","SmallSize","LargeSize","WithHoverActions","WithPersistentActions","WithReactions","StatusAway","StatusBusy","Conversation","LongMessage","SizeComparison","RolesComparison","InteractiveStates"];export{o as AssistantMessage,w as Conversation,d as ErrorMessage,b as InteractiveStates,g as LargeSize,v as LongMessage,C as RolesComparison,j as SizeComparison,p as SmallSize,y as StatusAway,f as StatusBusy,c as StreamingMessage,i as SystemMessage,l as TypingIndicator,r as UserMessage,m as WithAvatar,u as WithHoverActions,h as WithPersistentActions,x as WithReactions,Ms as __namedExportsOrder,Ss as default};
