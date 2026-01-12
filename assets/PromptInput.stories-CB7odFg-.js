import{j as r}from"./jsx-runtime-DF2Pcvd1.js";import{r as J}from"./index-B2-qRKKC.js";import{P as B}from"./PromptInput-CGBSJty_.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./utils-JCLedEej.js";const $={title:"AI/PromptInput",component:B,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","minimal","floating"]}}},a=e=>{const[G,l]=J.useState(e.value||"");return r.jsx(B,{...e,value:G,onChange:l,onSubmit:H=>{console.log("Submitted:",H),l("")}})},t={render:e=>r.jsx(a,{...e}),args:{placeholder:"Describe what you want to analyze..."}},o={render:e=>r.jsx(a,{...e}),args:{placeholder:"Ask about your property...",suggestions:[{id:"1",text:"Analyze roof condition",icon:"🏠"},{id:"2",text:"Check for water damage",icon:"💧"},{id:"3",text:"Inspect foundation",icon:"🧱"},{id:"4",text:"Review exterior siding",icon:"🪵"}]}},s={render:e=>r.jsx(a,{...e}),args:{placeholder:"Type or speak your question...",showVoice:!0}},n={render:e=>r.jsx(a,{...e}),args:{placeholder:"Describe the image or attach a file...",showAttachment:!0}},i={render:e=>r.jsx(a,{...e}),args:{placeholder:"Ask anything about your property...",showVoice:!0,showAttachment:!0,suggestions:[{id:"1",text:"What issues do you see?",icon:"🔍"},{id:"2",text:"Estimate repair costs",icon:"💰"},{id:"3",text:"Priority recommendations",icon:"📋"}]}},c={render:e=>r.jsx(a,{...e}),args:{placeholder:"Waiting for response...",isLoading:!0,value:"Analyze this property image"}},d={render:e=>r.jsx(a,{...e}),args:{placeholder:"Input disabled",disabled:!0}},p={render:e=>r.jsx(a,{...e}),args:{placeholder:"Quick question...",variant:"minimal"}},m={render:e=>r.jsxs("div",{className:"relative h-64 bg-gray-100 rounded-lg p-4",children:[r.jsx("p",{className:"text-gray-500",children:"Chat content would appear here..."}),r.jsx("div",{className:"absolute bottom-4 left-4 right-4",children:r.jsx(a,{...e})})]}),args:{placeholder:"Type your message...",variant:"floating",showVoice:!0}},u={render:e=>r.jsx(a,{...e}),args:{placeholder:"Limited to 100 characters...",maxLength:100}};var g,h,x;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Describe what you want to analyze...'
  }
}`,...(x=(h=t.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var y,b,f;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Ask about your property...',
    suggestions: [{
      id: '1',
      text: 'Analyze roof condition',
      icon: '🏠'
    }, {
      id: '2',
      text: 'Check for water damage',
      icon: '💧'
    }, {
      id: '3',
      text: 'Inspect foundation',
      icon: '🧱'
    }, {
      id: '4',
      text: 'Review exterior siding',
      icon: '🪵'
    }]
  }
}`,...(f=(b=o.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var w,I,v;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Type or speak your question...',
    showVoice: true
  }
}`,...(v=(I=s.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var D,j,P;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Describe the image or attach a file...',
    showAttachment: true
  }
}`,...(P=(j=n.parameters)==null?void 0:j.docs)==null?void 0:P.source}}};var A,S,V;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Ask anything about your property...',
    showVoice: true,
    showAttachment: true,
    suggestions: [{
      id: '1',
      text: 'What issues do you see?',
      icon: '🔍'
    }, {
      id: '2',
      text: 'Estimate repair costs',
      icon: '💰'
    }, {
      id: '3',
      text: 'Priority recommendations',
      icon: '📋'
    }]
  }
}`,...(V=(S=i.parameters)==null?void 0:S.docs)==null?void 0:V.source}}};var k,L,W;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Waiting for response...',
    isLoading: true,
    value: 'Analyze this property image'
  }
}`,...(W=(L=c.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var z,F,N;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Input disabled',
    disabled: true
  }
}`,...(N=(F=d.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var C,E,T;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Quick question...',
    variant: 'minimal'
  }
}`,...(T=(E=p.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var q,M,R;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <div className="relative h-64 bg-gray-100 rounded-lg p-4">
      <p className="text-gray-500">Chat content would appear here...</p>
      <div className="absolute bottom-4 left-4 right-4">
        <PromptInputDemo {...args} />
      </div>
    </div>,
  args: {
    placeholder: 'Type your message...',
    variant: 'floating',
    showVoice: true
  }
}`,...(R=(M=m.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var Q,_,O;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Limited to 100 characters...',
    maxLength: 100
  }
}`,...(O=(_=u.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};const ee=["Default","WithSuggestions","WithVoiceInput","WithAttachment","FullFeatured","Loading","Disabled","MinimalVariant","FloatingVariant","MaxLength"];export{t as Default,d as Disabled,m as FloatingVariant,i as FullFeatured,c as Loading,u as MaxLength,p as MinimalVariant,n as WithAttachment,o as WithSuggestions,s as WithVoiceInput,ee as __namedExportsOrder,$ as default};
