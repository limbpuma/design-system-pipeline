import{j as s}from"./jsx-runtime-DF2Pcvd1.js";import{A as e}from"./AIStatusIndicator-3oDvfBxv.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./utils-JCLedEej.js";const G={title:"AI/AIStatusIndicator",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{status:{control:"select",options:["idle","processing","analyzing","success","error","warning"]},size:{control:"select",options:["sm","md","lg"]},animated:{control:"boolean"},progress:{control:{type:"range",min:0,max:100}}}},a={args:{status:"idle",label:"Ready"}},r={args:{status:"processing",label:"Processing...",animated:!0}},t={args:{status:"analyzing",label:"Analyzing image...",animated:!0,progress:45}},n={args:{status:"success",label:"Analysis complete"}},o={args:{status:"error",label:"Analysis failed"}},i={args:{status:"warning",label:"Low confidence"}},l={args:{status:"analyzing",label:"Processing 75%",progress:75,animated:!0}},c={render:()=>s.jsxs("div",{className:"flex items-center gap-6",children:[s.jsx(e,{status:"processing",size:"sm",label:"Small",animated:!0}),s.jsx(e,{status:"processing",size:"md",label:"Medium",animated:!0}),s.jsx(e,{status:"processing",size:"lg",label:"Large",animated:!0})]})},u={render:()=>s.jsxs("div",{className:"flex flex-col gap-4",children:[s.jsx(e,{status:"idle",label:"Idle - Ready to start"}),s.jsx(e,{status:"processing",label:"Processing - Working...",animated:!0}),s.jsx(e,{status:"analyzing",label:"Analyzing - AI thinking...",animated:!0,progress:60}),s.jsx(e,{status:"success",label:"Success - Complete!"}),s.jsx(e,{status:"warning",label:"Warning - Check results"}),s.jsx(e,{status:"error",label:"Error - Something went wrong"})]})};var g,d,m;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    status: 'idle',
    label: 'Ready'
  }
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,b,S;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    status: 'processing',
    label: 'Processing...',
    animated: true
  }
}`,...(S=(b=r.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var I,A,y;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    status: 'analyzing',
    label: 'Analyzing image...',
    animated: true,
    progress: 45
  }
}`,...(y=(A=t.parameters)==null?void 0:A.docs)==null?void 0:y.source}}};var x,z,f;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    status: 'success',
    label: 'Analysis complete'
  }
}`,...(f=(z=n.parameters)==null?void 0:z.docs)==null?void 0:f.source}}};var j,w,h;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    status: 'error',
    label: 'Analysis failed'
  }
}`,...(h=(w=o.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var P,W,k;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    status: 'warning',
    label: 'Low confidence'
  }
}`,...(k=(W=i.parameters)==null?void 0:W.docs)==null?void 0:k.source}}};var v,E,R;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    status: 'analyzing',
    label: 'Processing 75%',
    progress: 75,
    animated: true
  }
}`,...(R=(E=l.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var C,L,N;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-6">
      <AIStatusIndicator status="processing" size="sm" label="Small" animated />
      <AIStatusIndicator status="processing" size="md" label="Medium" animated />
      <AIStatusIndicator status="processing" size="lg" label="Large" animated />
    </div>
}`,...(N=(L=c.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var M,_,O;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4">
      <AIStatusIndicator status="idle" label="Idle - Ready to start" />
      <AIStatusIndicator status="processing" label="Processing - Working..." animated />
      <AIStatusIndicator status="analyzing" label="Analyzing - AI thinking..." animated progress={60} />
      <AIStatusIndicator status="success" label="Success - Complete!" />
      <AIStatusIndicator status="warning" label="Warning - Check results" />
      <AIStatusIndicator status="error" label="Error - Something went wrong" />
    </div>
}`,...(O=(_=u.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};const H=["Idle","Processing","Analyzing","Success","Error","Warning","WithProgress","Sizes","AllStates"];export{u as AllStates,t as Analyzing,o as Error,a as Idle,r as Processing,c as Sizes,n as Success,i as Warning,l as WithProgress,H as __namedExportsOrder,G as default};
