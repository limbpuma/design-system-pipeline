import{j as r}from"./jsx-runtime-DF2Pcvd1.js";import{B as e}from"./Button-CZ993yF8.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./utils-JCLedEej.js";const er={title:"Components/Button",component:e,parameters:{layout:"centered",docs:{description:{component:"A versatile button component with multiple variants and sizes."}},design:{type:"figma",url:"https://www.figma.com/file/YOUR_FILE_ID/Design-System?node-id=BUTTON_NODE_ID"}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","outline","ghost","danger","success"],description:"The visual style of the button"},size:{control:"select",options:["sm","md","lg"],description:"The size of the button"},isLoading:{control:"boolean",description:"Shows a loading spinner"},disabled:{control:"boolean",description:"Disables the button"},children:{control:"text",description:"Button content"}}},a={args:{children:"Primary Button",variant:"primary",size:"md"}},n={args:{children:"Secondary Button",variant:"secondary",size:"md"}},s={args:{children:"Outline Button",variant:"outline",size:"md"}},t={args:{children:"Ghost Button",variant:"ghost",size:"md"}},o={args:{children:"Delete",variant:"danger",size:"md"}},i={args:{children:"Confirm",variant:"success",size:"md"}},c={args:{children:"Small Button",variant:"primary",size:"sm"}},d={args:{children:"Large Button",variant:"primary",size:"lg"}},m={args:{children:"Loading...",variant:"primary",size:"md",isLoading:!0}},l={args:{children:"Disabled",variant:"primary",size:"md",disabled:!0}},u={render:()=>r.jsxs("div",{className:"flex flex-wrap gap-4",children:[r.jsx(e,{variant:"primary",children:"Primary"}),r.jsx(e,{variant:"secondary",children:"Secondary"}),r.jsx(e,{variant:"outline",children:"Outline"}),r.jsx(e,{variant:"ghost",children:"Ghost"}),r.jsx(e,{variant:"danger",children:"Danger"}),r.jsx(e,{variant:"success",children:"Success"})]})},p={render:()=>r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx(e,{size:"sm",children:"Small"}),r.jsx(e,{size:"md",children:"Medium"}),r.jsx(e,{size:"lg",children:"Large"})]})};var g,h,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'md'
  }
}`,...(v=(h=a.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var y,B,S;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'md'
  }
}`,...(S=(B=n.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var z,x,f;s.parameters={...s.parameters,docs:{...(z=s.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'md'
  }
}`,...(f=(x=s.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var D,b,L;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'md'
  }
}`,...(L=(b=t.parameters)==null?void 0:b.docs)==null?void 0:L.source}}};var j,O,w;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: 'Delete',
    variant: 'danger',
    size: 'md'
  }
}`,...(w=(O=o.parameters)==null?void 0:O.docs)==null?void 0:w.source}}};var G,N,P;i.parameters={...i.parameters,docs:{...(G=i.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    children: 'Confirm',
    variant: 'success',
    size: 'md'
  }
}`,...(P=(N=i.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var _,A,T;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: 'Small Button',
    variant: 'primary',
    size: 'sm'
  }
}`,...(T=(A=c.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var E,C,I;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'lg'
  }
}`,...(I=(C=d.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var M,R,U;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    children: 'Loading...',
    variant: 'primary',
    size: 'md',
    isLoading: true
  }
}`,...(U=(R=m.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var V,F,Y;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    children: 'Disabled',
    variant: 'primary',
    size: 'md',
    disabled: true
  }
}`,...(Y=(F=l.parameters)==null?void 0:F.docs)==null?void 0:Y.source}}};var k,q,H;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
    </div>
}`,...(H=(q=u.parameters)==null?void 0:q.docs)==null?void 0:H.source}}};var J,K,Q;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
}`,...(Q=(K=p.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};const ar=["Primary","Secondary","Outline","Ghost","Danger","Success","Small","Large","Loading","Disabled","AllVariants","AllSizes"];export{p as AllSizes,u as AllVariants,o as Danger,l as Disabled,t as Ghost,d as Large,m as Loading,s as Outline,a as Primary,n as Secondary,c as Small,i as Success,ar as __namedExportsOrder,er as default};
