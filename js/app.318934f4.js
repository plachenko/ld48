(function(t){function e(e){for(var i,s,o=e[0],c=e[1],u=e[2],h=0,l=[];h<o.length;h++)s=o[h],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&l.push(a[s][0]),a[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);f&&f(e);while(l.length)l.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(i=!1)}i&&(r.splice(e--,1),t=s(s.s=n[0]))}return t}var i={},a={app:0},r=[];function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var f=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"034f":function(t,e,n){"use strict";n("85ec")},1722:function(t,e,n){"use strict";n("7a08")},"202f":function(t,e,n){},"2b2d":function(t,e,n){},"6e16":function(t,e,n){"use strict";n("202f")},"7a08":function(t,e,n){},8580:function(t,e,n){},"85ec":function(t,e,n){},"8e73":function(t,e,n){"use strict";n("8f1d")},"8f1d":function(t,e,n){},a823:function(t,e,n){"use strict";n("2b2d")},ab43:function(t,e,n){"use strict";n("8580")},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"gameContainer"}},[n("Capture",{on:{mOutEvt:t.mOutEvt,mInEvt:t.mInEvt,mMovEvt:t.mMovEvt}}),n("div",{directives:[{name:"show",rawName:"v-show",value:t.bTitle,expression:"bTitle"}],staticClass:"menu",attrs:{id:"title"}},[t._m(0)]),n("div",{attrs:{id:"armContainer"}},[n("Arm",{ref:"arm",attrs:{position:t.oPosition},on:{hit:t.hitTarget}})],1)],1)])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"TitleText"}},[n("span",{attrs:{id:"deep1"}},[t._v("Deeper")]),n("span",{attrs:{id:"and"}},[t._v("and")]),n("span",{attrs:{id:"deep2"}},[t._v("Deeper")])])}],s=n("1da1"),o=n("d4ec"),c=n("bee2"),u=n("262e"),f=n("2caf"),h=(n("96cf"),n("9ab4")),l=n("1b40"),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"armContainer"}},[n("div",{attrs:{id:"arm"}},[n("div",{ref:"sleeve",attrs:{id:"sleeve"}},[n("div",{attrs:{id:"hand"}}),n("canvas",{ref:"chain",attrs:{id:"chain"}})])]),n("div",{ref:"watch",attrs:{id:"watch"}})])},v=[],d=n("4478"),b=n("2909"),y=(n("99af"),function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;Object(o["a"])(this,t),this.x=e,this.y=n}return Object(c["a"])(t,[{key:"getDistance",value:function(e){var n=this.x-e.x,i=this.y-e.y;return new t(n,i)}}]),t}()),g=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new y,n=(arguments.length>1&&void 0!==arguments[1]||new y,arguments.length>2&&void 0!==arguments[2]?arguments[2]:new y);Object(o["a"])(this,t),this.pos=e,this.off=n}return Object(c["a"])(t,[{key:"getDistance",value:function(t){return this.pos.getDistance(t.pos)}}]),t}(),O=function t(e,n,i,a,r){Object(o["a"])(this,t),this.Mass=e,this.Tension=n,this.Friction=i,this.Precision=a,this.Clamp=r},m=function t(e,n,i){Object(o["a"])(this,t),this.Target=e,this.Current=n,this.Velocity=i,this.Resting=!1},j=function(t){Object(u["a"])(n,t);var e=Object(f["a"])(n);function n(){var t,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new y,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new y;return Object(o["a"])(this,n),t=e.call(this,i,a),t.springConfiguration=new O(.01,1.4,.04,30,!0),t.xSpring=new w(i.x,t.springConfiguration),t.ySpring=new w(i.y,t.springConfiguration),t}return Object(c["a"])(n,[{key:"update",value:function(t,e){this.xSpring.SetTarget(t.pos.x),this.ySpring.SetTarget(t.pos.y),e/=1e3,this.xSpring.Update(e),this.ySpring.Update(e),this.pos.x=this.xSpring.GetValue(),this.pos.y=t.pos.y}}]),n}(g),w=function(){function t(e,n){Object(o["a"])(this,t),this.config=n,this.state=new m(e,e,0)}return Object(c["a"])(t,[{key:"IsResting",value:function(){return this.state.Resting}},{key:"GetValue",value:function(){return this.state.Current}},{key:"GetTarget",value:function(){return this.state.Target}},{key:"GetVelocity",value:function(){return this.state.Velocity}},{key:"SetTarget",value:function(t){this.state.Target=t}},{key:"Update",value:function(t){var e=-this.config.Tension*(this.state.Current-this.state.Target),n=-this.config.Friction*this.state.Velocity,i=(e+n)/this.config.Mass;if(this.state.Velocity=this.state.Velocity+i*t,this.state.Current=this.state.Current+this.state.Velocity*t,this.config.Clamp)console.log("Difference: ".concat(Math.abs(this.state.Target-this.state.Current))),this.state.Current>this.state.Target+this.config.Precision?(this.state.Current=this.state.Target+this.config.Precision,this.state.Velocity=0):this.state.Current<this.state.Target-this.config.Precision&&(this.state.Current=this.state.Target-this.config.Precision,this.state.Velocity=0);else if(Math.abs(this.state.Velocity)<this.config.Precision&&Math.abs(this.state.Current-this.state.Target)<this.config.Precision)return this.state.Current=this.state.Target,this.state.Velocity=0,void(this.state.Resting=!0);this.state.Resting=!1}}]),t}(),x=function(t){Object(u["a"])(n,t);var e=Object(f["a"])(n);function n(){var t;return Object(o["a"])(this,n),t=e.apply(this,arguments),t.hand=new g,t.handOff=new g(new y(t.hand.pos.x-65,t.hand.pos.y+100)),t.sleeve=Object(d["a"])(g,Object(b["a"])(Array(0)).concat([new y(0,30)])),t.watch=new j(t.handOff.pos,new y(0,100)),t.prevTime=0,t}return Object(c["a"])(n,[{key:"onPosChanged",value:function(t){this.renderPos(t.x,t.y,this.$refs.sleeve),this.hand.pos=new y(t.x,t.y),this.handOff.pos=new y(t.x-65,t.y+100)}},{key:"renderWatch",value:function(){var t=performance.now()-this.prevTime;this.prevTime=performance.now();var e=this.$refs.watch,n=this.watch;this.hand;n.update(this.handOff,t),this.drawChain(),e.style.left="".concat(n.pos.x-n.off.x,"px"),e.style.top="".concat(n.pos.y-n.off.y,"px")}},{key:"drawChain",value:function(){var t=this.$refs.chain,e=t.getContext("2d"),n=150,i=4*this.handOff.getDistance(this.watch).x;e&&(e.clearRect(0,0,400,150),e.lineWidth=5,e.strokeStyle="#440",e.setLineDash([15,3,3,3]),e.beginPath(),e.moveTo(n,0),e.lineTo(n-i,250),e.stroke(),e.closePath())}},{key:"update",value:function(){this.renderWatch()}},{key:"mounted",value:function(){}},{key:"renderPos",value:function(t,e,n){var i=Math.round(t),a=Math.round(e)-this.sleeve.off.y;n.style.left="".concat(i,"px"),n.style.top="".concat(a,"px")}}]),n}(l["c"]);Object(h["a"])([Object(l["b"])()],x.prototype,"position",void 0),Object(h["a"])([Object(l["d"])("position")],x.prototype,"onPosChanged",null),x=Object(h["a"])([l["a"]],x);var k=x,T=k,C=(n("1722"),n("2877")),_=Object(C["a"])(T,p,v,!1,null,"312a85d8",null),E=_.exports,P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{ref:"target",staticClass:"circ",attrs:{id:"inner"}}),n("div",{ref:"target",staticClass:"circ"})])},$=[],S=function(t){Object(u["a"])(n,t);var e=Object(f["a"])(n);function n(){return Object(o["a"])(this,n),e.apply(this,arguments)}return Object(c["a"])(n,[{key:"mounted",value:function(){var t=this;this.$nextTick((function(){var e=t.$refs.target;e.style.left=t.position.x+"px",e.style.top=t.position.y+"px"}))}}]),n}(l["c"]);Object(h["a"])([Object(l["b"])()],S.prototype,"position",void 0),S=Object(h["a"])([l["a"]],S);var M=S,V=M,D=(n("6e16"),Object(C["a"])(V,P,$,!1,null,"722ee120",null)),R=D.exports,A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v("Deeper and Deeper")]),n("div",{on:{click:t.start}},[t._v("Start")])])},G=[],L=function(t){Object(u["a"])(n,t);var e=Object(f["a"])(n);function n(){return Object(o["a"])(this,n),e.apply(this,arguments)}return Object(c["a"])(n,[{key:"start",value:function(){this.$emit("start")}}]),n}(l["c"]);Object(h["a"])([Object(l["b"])()],L.prototype,"msg",void 0),L=Object(h["a"])([l["a"]],L);var I=L,F=I,W=(n("a823"),Object(C["a"])(F,A,G,!1,null,"a403d970",null)),U=W.exports,q=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},J=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v("GAME OVER")])])}],H=function(t){Object(u["a"])(n,t);var e=Object(f["a"])(n);function n(){return Object(o["a"])(this,n),e.apply(this,arguments)}return n}(l["c"]);Object(h["a"])([Object(l["b"])()],H.prototype,"msg",void 0),H=Object(h["a"])([l["a"]],H);var N=H,X=N,Y=(n("8e73"),Object(C["a"])(X,q,J,!1,null,"657d551d",null)),z=Y.exports,B=n("5e54"),K=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"capture",attrs:{id:"capture"}})},Q=[],Z=function(t){Object(u["a"])(n,t);var e=Object(f["a"])(n);function n(){return Object(o["a"])(this,n),e.apply(this,arguments)}return Object(c["a"])(n,[{key:"mounted",value:function(){var t=this,e=this.$refs.capture,n=30;e.style.left=-1*n+"px",e.style.top=-1*n+"px",e.style.width=e.offsetWidth+2*n+"px",e.style.height=e.offsetHeight+2*n+"px",e.addEventListener("mousemove",(function(e){var i=e.offsetX-n,a=e.offsetY-n,r=new y(i,a);t.$emit("mMovEvt",r)})),e.addEventListener("contextmenu",(function(t){return t.preventDefault(),!1})),e.addEventListener("mouseover",(function(e){t.$emit("mInEvt")})),e.addEventListener("mouseout",(function(e){t.$emit("mOutEvt")}))}}]),n}(l["c"]);Object(h["a"])([Object(l["b"])()],Z.prototype,"position",void 0),Object(h["a"])([Object(l["b"])()],Z.prototype,"scale",void 0),Z=Object(h["a"])([l["a"]],Z);var tt=Z,et=tt,nt=(n("ab43"),Object(C["a"])(et,K,Q,!1,null,"66163bd4",null)),it=nt.exports,at=n("cffa"),rt=function(t){Object(u["a"])(n,t);var e=Object(f["a"])(n);function n(){var t;return Object(o["a"])(this,n),t=e.apply(this,arguments),t.bPaused=!1,t.bPlaying=!1,t.bTitle=!0,t.bGameOver=!1,t.oPosition={x:0,y:0},t}return Object(c["a"])(n,[{key:"mOutEvt",value:function(){this.bPaused=!0}},{key:"mInEvt",value:function(){this.bPaused=!1}},{key:"mMovEvt",value:function(t){this.oPosition=t}},{key:"hitTarget",value:function(){var t=(new B["a"]).toDestination();t.triggerAttackRelease("C4","8n"),B["b"]()}},{key:"start",value:function(){this.toneStart()}},{key:"toneStart",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,B["b"]();case 2:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()},{key:"onEnter",value:function(){at["a"].from("#pause",{opacity:0,duration:.3})}},{key:"onLeave",value:function(){this.step()}},{key:"step",value:function(){var t=this,e=10;setTimeout((function(){t.$refs.arm.update(),window.requestAnimationFrame(t.step)}),e)}},{key:"mounted",value:function(){var t=this;this.$nextTick((function(){at["a"].to("#title",{y:0,duration:1}),window.requestAnimationFrame(t.step)}))}}]),n}(l["c"]);rt=Object(h["a"])([Object(l["a"])({components:{Arm:E,Target:R,TitleScreen:U,GameOver:z,Capture:it}})],rt);var st=rt,ot=st,ct=(n("034f"),Object(C["a"])(ot,a,r,!1,null,null,null)),ut=ct.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(ut)}}).$mount("#app")}});
//# sourceMappingURL=app.318934f4.js.map