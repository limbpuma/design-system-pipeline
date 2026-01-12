import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{C as r,a as t,b as n,c as s,d as a,e as F}from"./Card-CUxG4HiN.js";import{B as m}from"./Button-CZ993yF8.js";import"./index-B2-qRKKC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./utils-JCLedEej.js";const R={title:"Components/Card",component:r,parameters:{layout:"centered",docs:{description:{component:"A container component for grouping related content with semantic tokens."}}},tags:["autodocs"]},o={render:()=>e.jsxs(r,{className:"w-[350px]",children:[e.jsxs(t,{children:[e.jsx(n,{children:"Card Title"}),e.jsx(s,{children:"Card description goes here."})]}),e.jsx(a,{children:e.jsx("p",{children:"Card content with any React elements."})}),e.jsx(F,{children:e.jsx(m,{variant:"primary",children:"Action"})})]})},d={render:()=>e.jsxs(r,{className:"w-[350px]",children:[e.jsxs(t,{children:[e.jsx(n,{children:"Create account"}),e.jsx(s,{children:"Enter your details to get started."})]}),e.jsxs(a,{className:"space-y-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-sm font-medium text-[var(--semantic-color-foreground-default)]",htmlFor:"name",children:"Name"}),e.jsx("input",{id:"name",type:"text",placeholder:"John Doe",className:"w-full px-3 py-2 rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] text-[var(--semantic-color-foreground-default)] placeholder:text-[var(--semantic-color-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--semantic-color-ring-default)] focus:border-transparent"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-sm font-medium text-[var(--semantic-color-foreground-default)]",htmlFor:"email",children:"Email"}),e.jsx("input",{id:"email",type:"email",placeholder:"john@example.com",className:"w-full px-3 py-2 rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] text-[var(--semantic-color-foreground-default)] placeholder:text-[var(--semantic-color-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--semantic-color-ring-default)] focus:border-transparent"})]})]}),e.jsxs(F,{className:"flex justify-between",children:[e.jsx(m,{variant:"outline",children:"Cancel"}),e.jsx(m,{variant:"primary",children:"Create"})]})]})},c={render:()=>e.jsxs(r,{className:"w-[350px] overflow-hidden",children:[e.jsx("div",{className:"h-48 bg-gradient-to-br from-blue-500 to-purple-600","aria-hidden":"true"}),e.jsxs(t,{children:[e.jsx(n,{children:"Beautiful Gradient"}),e.jsx(s,{children:"A card with a decorative header."})]}),e.jsx(a,{children:e.jsx("p",{className:"text-sm text-[var(--semantic-color-foreground-muted)]",children:"Cards can contain any content including images, gradients, or other media."})})]})},l={render:()=>e.jsx(r,{className:"w-[350px]",children:e.jsx(a,{className:"pt-6",children:e.jsx("p",{children:"A simple card with just content, no header or footer."})})})},i={render:()=>e.jsxs("div",{className:"flex gap-4",children:[e.jsxs(r,{className:"w-[200px]",children:[e.jsxs(t,{className:"pb-2",children:[e.jsx(s,{children:"Total Revenue"}),e.jsx(n,{className:"text-3xl",children:"$45,231"})]}),e.jsx(a,{children:e.jsx("p",{className:"text-xs text-[var(--semantic-color-success-default)]",children:"+20.1% from last month"})})]}),e.jsxs(r,{className:"w-[200px]",children:[e.jsxs(t,{className:"pb-2",children:[e.jsx(s,{children:"Active Users"}),e.jsx(n,{className:"text-3xl",children:"2,350"})]}),e.jsx(a,{children:e.jsx("p",{className:"text-xs text-[var(--semantic-color-success-default)]",children:"+180 new this week"})})]})]})};var u,p,x;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with any React elements.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Action</Button>
      </CardFooter>
    </Card>
}`,...(x=(p=o.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var C,h,f;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Enter your details to get started.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--semantic-color-foreground-default)]" htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="John Doe" className="w-full px-3 py-2 rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] text-[var(--semantic-color-foreground-default)] placeholder:text-[var(--semantic-color-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--semantic-color-ring-default)] focus:border-transparent" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--semantic-color-foreground-default)]" htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="john@example.com" className="w-full px-3 py-2 rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] text-[var(--semantic-color-foreground-default)] placeholder:text-[var(--semantic-color-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--semantic-color-ring-default)] focus:border-transparent" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Create</Button>
      </CardFooter>
    </Card>
}`,...(f=(h=d.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var g,v,j;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px] overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600" aria-hidden="true" />
      <CardHeader>
        <CardTitle>Beautiful Gradient</CardTitle>
        <CardDescription>A card with a decorative header.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--semantic-color-foreground-muted)]">
          Cards can contain any content including images, gradients, or other media.
        </p>
      </CardContent>
    </Card>
}`,...(j=(v=c.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var N,b,w;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
}`,...(w=(b=l.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var y,D,T;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="flex gap-4">
      <Card className="w-[200px]">
        <CardHeader className="pb-2">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-3xl">$45,231</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-[var(--semantic-color-success-default)]">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card className="w-[200px]">
        <CardHeader className="pb-2">
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-3xl">2,350</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-[var(--semantic-color-success-default)]">+180 new this week</p>
        </CardContent>
      </Card>
    </div>
}`,...(T=(D=i.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};const W=["Default","WithForm","WithImage","Minimal","Stats"];export{o as Default,l as Minimal,i as Stats,d as WithForm,c as WithImage,W as __namedExportsOrder,R as default};
