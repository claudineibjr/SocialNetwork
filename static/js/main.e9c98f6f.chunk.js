(this.webpackJsonpsocialnetwork_laboratoria=this.webpackJsonpsocialnetwork_laboratoria||[]).push([[0],{47:function(e,a,t){},62:function(e,a,t){e.exports=t.p+"static/media/logo.25bf045c.svg"},78:function(e,a,t){e.exports=t(97)},83:function(e,a,t){},84:function(e,a,t){},89:function(e,a,t){},90:function(e,a,t){},91:function(e,a,t){},93:function(e,a,t){},96:function(e,a,t){},97:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(7),i=t.n(l);t(83),t(62),t(84);var o=t(67),c=t(28),u=t(11),s=(t(47),t(101)),m=t(146),E=t(140),d=t(23),f=t.n(d),p=t(35),v=t(135),S=t(139),b=t(36),g=t(21),N=function(){function e(){Object(b.a)(this,e)}return Object(g.a)(e,null,[{key:"validateEmail",value:function(e){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}},{key:"formatDate",value:function(a){var t=a.getFullYear(),n=e.completeLeadingZeros((a.getMonth()+1).toString(),2);return e.completeLeadingZeros(a.getDate().toString(),2)+"/"+n+"/"+t}},{key:"completeLeadingZeros",value:function(e,a){for(var t="",n=0;n<a;n++)t="0"+t;return(t+e).slice(-a)}}]),e}();function h(){var e;!function(e){e[e.EMAIL=0]="EMAIL",e[e.FIRSTNAME=1]="FIRSTNAME",e[e.LASTNAME=2]="LASTNAME",e[e.PASSWORD=3]="PASSWORD",e[e.SEX=4]="SEX",e[e.BIRHTDAY=5]="BIRHTDAY"}(e||(e={}));var a=r.a.useState(!1),t=Object(u.a)(a,2),n=t[0],l=t[1],i=r.a.useState(""),o=Object(u.a)(i,2),c=o[0],s=o[1],m=r.a.useState(""),E=Object(u.a)(m,2),d=E[0],b=E[1],g=function(e){return h(e).length>0},h=function(a){if(!n)return"";switch(a){case e.EMAIL:return N.validateEmail(c)?"":"Email address is not valid";case e.PASSWORD:return 0===d.length?"Password is required":"";default:return""}};function O(){return(O=Object(p.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l(!0);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement("div",{className:"componentContainer componentLoginContainer"},r.a.createElement("div",{className:"componentWelcome"},"Good to see you again. Welcome!"),r.a.createElement("form",{className:"componentForm componentLoginForm"},r.a.createElement(v.a,{required:!0,error:g(e.EMAIL),value:c,onChange:function(e){return s(e.target.value)},id:"email",label:"E-mail",helperText:h(e.EMAIL),variant:"outlined"}),r.a.createElement(v.a,{required:!0,error:g(e.PASSWORD),value:d,onChange:function(e){return b(e.target.value)},id:"password",label:"Password",type:"password",helperText:h(e.PASSWORD),variant:"outlined"})),r.a.createElement("div",{className:"formSubmit"},r.a.createElement(S.a,{variant:"contained",color:"primary",className:"submitButton",onClick:function(){return O.apply(this,arguments)}},"Login")))}var O=t(147),A=t(102),T=t(100),L=t(103),I=t(104);function C(){var e,a;!function(e){e[e.EMAIL=0]="EMAIL",e[e.FIRSTNAME=1]="FIRSTNAME",e[e.LASTNAME=2]="LASTNAME",e[e.PASSWORD=3]="PASSWORD",e[e.SEX=4]="SEX",e[e.BIRHTDAY=5]="BIRHTDAY"}(e||(e={})),function(e){e.NONE="",e.MALE="Male",e.FEMALE="Female",e.NOT_INFORM="I prefer not to inform"}(a||(a={}));var t=r.a.useState(!1),n=Object(u.a)(t,2),l=n[0],i=n[1],o=r.a.useState(""),c=Object(u.a)(o,2),s=c[0],m=c[1],E=r.a.useState(""),d=Object(u.a)(E,2),b=d[0],g=d[1],h=r.a.useState(""),C=Object(u.a)(h,2),M=C[0],R=C[1],P=r.a.useState(""),F=Object(u.a)(P,2),w=F[0],D=F[1],j=r.a.useState(""),y=Object(u.a)(j,2),x=y[0],k=y[1],W=r.a.useState(new Date),q=Object(u.a)(W,2),B=q[0],_=q[1],X=function(e){return H(e).length>0},H=function(t){if(!l)return"";switch(t){case e.EMAIL:return N.validateEmail(s)?"":"Email address is not valid";case e.FIRSTNAME:return 0===b.length?"First Name Required":"";case e.PASSWORD:return 0===w.length?"Password is required":"";case e.SEX:return x===a.NONE?"Sex is required":"";default:return""}};function Y(){return(Y=Object(p.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i(!0);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement("div",{className:"componentContainer"},r.a.createElement("div",{className:"componentWelcome"},"Welcome to mine, yours, our Social Network!"),r.a.createElement("form",{className:"componentForm"},r.a.createElement(v.a,{required:!0,error:X(e.EMAIL),value:s,onChange:function(e){return m(e.target.value)},id:"email",label:"E-mail",helperText:H(e.EMAIL),variant:"outlined"}),r.a.createElement(v.a,{required:!0,error:X(e.FIRSTNAME),value:b,onChange:function(e){return g(e.target.value)},id:"firstName",label:"First name",helperText:H(e.FIRSTNAME),variant:"outlined"}),r.a.createElement(v.a,{id:"lastName",value:M,onChange:function(e){return R(e.target.value)},error:X(e.LASTNAME),label:"Last name",helperText:H(e.LASTNAME),variant:"outlined"}),r.a.createElement(v.a,{required:!0,error:X(e.PASSWORD),value:w,onChange:function(e){return D(e.target.value)},id:"password",label:"Password",type:"password",helperText:H(e.PASSWORD),variant:"outlined"}),r.a.createElement(v.a,{id:"date",label:"Date of birth",type:"date",value:B,onChange:function(e){var a;(a=new Date(e.target.value)).getFullYear()>1e3&&_(a)},className:"inputDate",InputLabelProps:{shrink:!0},variant:"outlined"}),r.a.createElement(T.a,{variant:"outlined",error:X(e.SEX)},r.a.createElement(I.a,{id:"demo-simple-select-error-label"},"Gender"),r.a.createElement(L.a,{labelId:"demo-simple-select-error-label",id:"demo-simple-select-error",value:x,onChange:function(e){return k(e.target.value)}},r.a.createElement(O.a,{value:a.NONE},r.a.createElement("em",null,"None")),r.a.createElement(O.a,{value:a.MALE},a.MALE),r.a.createElement(O.a,{value:a.FEMALE},a.FEMALE),r.a.createElement(O.a,{value:a.NOT_INFORM},a.NOT_INFORM)),r.a.createElement(A.a,null,H(e.SEX)))),r.a.createElement("div",{className:"formSubmit"},r.a.createElement(S.a,{variant:"contained",color:"primary",className:"submitButton",onClick:function(){return Y.apply(this,arguments)}},"Register")))}function M(){var e;!function(e){e[e.Login=0]="Login",e[e.Register=1]="Register"}(e||(e={}));var a=r.a.useState(e.Login),t=Object(u.a)(a,2),n=t[0],l=t[1];return r.a.createElement("div",{className:"login-container"},function(){switch(n){case e.Login:return r.a.createElement(h,null);case e.Register:return r.a.createElement(C,null);default:return r.a.createElement("h1",null,"Falha no sistema")}}(),r.a.createElement(s.a,{square:!0,className:"bottomTabs"},r.a.createElement(m.a,{value:n,onChange:function(e,a){return l(a)},indicatorColor:"primary",textColor:"primary",centered:!0,"aria-label":"icon label tabs example"},r.a.createElement(E.a,{value:e.Login,label:"Login"}),r.a.createElement(E.a,{value:e.Register,label:"Create account"}))))}t(89),t(90);function R(){var e,a;!function(e){e.FRIENDS="Friends",e.PUBLIC="Public"}(e||(e={})),function(e){e[e.POST_CONTENT=0]="POST_CONTENT"}(a||(a={}));var t,n=r.a.useState(!1),l=Object(u.a)(n,2),i=l[0],o=l[1],c=r.a.useState(e.FRIENDS),s=Object(u.a)(c,2),m=s[0],E=s[1],d=r.a.useState(""),b=Object(u.a)(d,2),g=b[0],N=b[1],h=function(e){if(!i)return"";switch(e){case a.POST_CONTENT:return 0===g.length?"Post content required":"";default:return""}};function A(){return(A=Object(p.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o(!0);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement("div",{className:"createPostContainer"},r.a.createElement("div",{className:"contentArea"},r.a.createElement(v.a,{id:"outlined-multiline-static",label:"What's going on?",multiline:!0,rows:"4",value:g,onChange:function(e){return N(e.target.value)},margin:"normal",variant:"outlined",error:(t=a.POST_CONTENT,h(t).length>0),helperText:h(a.POST_CONTENT)})),r.a.createElement("div",{className:"bottomButtons"},r.a.createElement(T.a,{variant:"outlined",className:"formChooseVisibility"},r.a.createElement(L.a,{labelId:"demo-simple-select-error-label",id:"demo-simple-select-error",value:m,onChange:function(e){return E(e.target.value)}},r.a.createElement(O.a,{value:e.FRIENDS},e.FRIENDS),r.a.createElement(O.a,{value:e.PUBLIC},e.PUBLIC))),r.a.createElement(S.a,{variant:"contained",color:"primary",onClick:function(){return A.apply(this,arguments)},className:"formSubmit"},"Post")))}var P=t(63),F=t(64),w=t(69),D=(t(91),t(141)),j=t(148),y=t(143),x=t(144),k=t(142),W=t(145),q=t(65),B=t.n(q),_=t(66),X=t.n(_),H=function(e){function a(e){return Object(b.a)(this,a),Object(P.a)(this,Object(F.a)(a).call(this,e))}return Object(w.a)(a,e),Object(g.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"postContainer"},r.a.createElement(D.a,{className:"cardContainer"},r.a.createElement(j.a,{avatar:r.a.createElement(k.a,{"aria-label":"recipe"}," C "),title:"Claudinei Brito Junior",subheader:"Ontem, \xe0s 16h05"}),r.a.createElement(y.a,null,"Lorem ipsum dolor sit amexsat, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu sa\xe7ldad fugiat nulla pariatur."),r.a.createElement(x.a,{disableSpacing:!0},r.a.createElement(W.a,{"aria-label":"add to favorites"},r.a.createElement(B.a,null)),r.a.createElement(W.a,{"aria-label":"share"},r.a.createElement(X.a,null)))))}}]),a}(n.Component);function Y(){return r.a.createElement("div",{className:"homePageContainer"},r.a.createElement(R,null),r.a.createElement(H,null),r.a.createElement(H,null),r.a.createElement(H,null),r.a.createElement(H,null),r.a.createElement(H,null),r.a.createElement(H,null),r.a.createElement(H,null),r.a.createElement(H,null),r.a.createElement(H,null),r.a.createElement(H,null),r.a.createElement(H,null),r.a.createElement(H,null))}var Z;t(93);function U(){return r.a.createElement("h1",null,"Hello World! Profile")}!function(e){e.LOGIN="/login",e.HOME="/home",e.PROFILE="/profile"}(Z||(Z={}));t(96);i.a.render(r.a.createElement((function(){return r.a.createElement(o.a,null,r.a.createElement(c.a,{path:"/",exact:!0,component:M}),r.a.createElement(c.a,{path:"/login",component:M}),r.a.createElement(c.a,{path:"/home",component:Y}),r.a.createElement(c.a,{path:"/profile",component:U}))}),null),document.getElementById("root"))}},[[78,1,2]]]);
//# sourceMappingURL=main.e9c98f6f.chunk.js.map