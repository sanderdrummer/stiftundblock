(this.webpackJsonpstiftundblock=this.webpackJsonpstiftundblock||[]).push([[0],{49:function(e,t,a){e.exports=a(58)},54:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(8),c=a.n(l),o=(a(54),a(23)),u=a(40),i=a(100),m=a(32),s=a(101),d=a(102),p=a(98),f=a(86),E=a(87),g=a(88),h=a(89),y=a(90),v=a(91),b=a(92),w=a(93),S=a(94),k=a(95),A=a(24),O=function(e,t){switch(t.type){case"NextRound":return Object(A.a)({},e,{rounds:[].concat(Object(o.a)(e.rounds),[t.scores])});case"SetWants":return Object(A.a)({},e,{wants:[].concat(Object(o.a)(e.wants),[t.wants])});case"SetPlayers":return Object(A.a)({},e,{players:t.payload});case"Reset":return Object(A.a)({},t.state);default:return e}},R=function(e,t){return t.reduce((function(t,a){return t+a[e]}),0)},W=function(e){return function(e){return Object.keys(e)}(e).length},N=function(){var e=Object(n.useReducer)(O,{players:[],rounds:[],wants:[]}),t=Object(u.a)(e,2),a=t[0],l=t[1],c=W(a.players);return r.a.useEffect((function(){var e=window.localStorage.getItem("WIZARD");try{var t=JSON.parse(e||"");l({type:"Reset",state:t})}catch(a){}}),[l]),r.a.useEffect((function(){window.localStorage.setItem("WIZARD",JSON.stringify(a))}),[a]),r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,{mt:3,mb:3},r.a.createElement(m.a,null,"WIZARD")),0===c?r.a.createElement(x,{onSubmit:function(e){return l({type:"SetPlayers",payload:e})}}):r.a.createElement(I,{addScore:function(e){return l({type:"NextRound",scores:e})},addWants:function(e){return l({type:"SetWants",wants:e})},state:a}),a.players.length>0&&r.a.createElement(i.a,{mt:6},r.a.createElement(s.a,{onClick:function(){return l({type:"Reset",state:{players:[],rounds:[],wants:[]}})},variant:"contained",color:"primary"},"neues spiel")))},j=function(e){var t=e.players,a=e.onSubmit,n=e.wants,l=e.round;return r.a.createElement("form",{autoComplete:"off",onSubmit:function(e){e.preventDefault();var r=t.map((function(t){return Number(e.currentTarget[t].value)}));if(r.reduce((function(e,t){return e+t}),0)===l){var c=r.map((function(e,t){var a=n[t]-e;return 0===a?20+10*e:-1*Math.abs(10*a)}));a(c),e.currentTarget.reset(),window.scrollTo(0,0)}else alert("Oh oh die Anzahl aller Stiche passt nicht zur aktuellen Kartenanzahl :(")}},r.a.createElement(m.a,null,"Rundenwertung:"),t.map((function(e,t){return r.a.createElement(i.a,{display:"flex",alignContent:"center",alignItems:"center",key:e},r.a.createElement(d.a,{style:{marginRight:"1rem"}},n[t]),r.a.createElement(p.a,{variant:"outlined",label:"Stiche von ".concat(e),placeholder:"tats\xe4chliche Stiche",required:!0,fullWidth:!0,margin:"normal",type:"tel",name:e,inputProps:{pattern:"[0-9]*"}}))})),r.a.createElement(s.a,{variant:"contained",type:"submit"},"punkte speichern"))},T=function(e){var t=e.players,a=e.onSubmit;return r.a.createElement("form",{autoComplete:"off",onSubmit:function(e){e.preventDefault();var n=t.map((function(t){return Number(e.currentTarget[t].value)}));a(n),e.currentTarget.reset(),window.scrollTo(0,0)}},r.a.createElement(m.a,null,"Stiche Ansagen:"),t.map((function(e){return r.a.createElement(p.a,{variant:"outlined",key:e,label:"Ansage von ".concat(e),placeholder:"x stiche",required:!0,fullWidth:!0,margin:"normal",type:"tel",name:e,inputProps:{pattern:"[0-9]*"}})})),r.a.createElement(s.a,{variant:"contained",type:"submit"},"Ansage speichern"))},I=function(e){var t=e.state,a=e.addScore,n=e.addWants,l=function(e){var t=function(e){return e.players}(e),a=W(t),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;return 60/e}(a),r=e.rounds.length+1;return{rounds:n,cardAmount:r,leaderBoard:t.map((function(t,a){return{name:t,score:R(a,e.rounds)}})).sort((function(e,t){return t.score-e.score})),dealer:t[(r-1)%a]}}(t),c=t.wants[l.cardAmount-1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,null,r.a.createElement(E.a,{title:"Runde ".concat(l.cardAmount," von ").concat(l.rounds),subheader:1===l.cardAmount?"".concat(l.cardAmount," Karte wird verteilt - Es gibt ").concat(l.dealer):"".concat(l.cardAmount," Karten werden verteilt - Es gibt ").concat(l.dealer)}),r.a.createElement(g.a,null,c?r.a.createElement(j,{round:l.cardAmount,wants:c,onSubmit:a,players:t.players}):r.a.createElement(T,{onSubmit:n,players:t.players}),r.a.createElement(h.a,{style:{margin:"2rem 0"}}),r.a.createElement(m.a,null,"Wertung f\xfcr Runde ",l.cardAmount-1," von ",l.rounds),r.a.createElement(y.a,null,r.a.createElement(v.a,null,r.a.createElement(b.a,null,r.a.createElement(w.a,null,r.a.createElement(S.a,null,"Platz"),r.a.createElement(S.a,{align:"right"},"Name"),r.a.createElement(S.a,{align:"right"},"Punkte"))),r.a.createElement(k.a,null,l.leaderBoard.map((function(e,t){return r.a.createElement(w.a,{key:e.name},r.a.createElement(S.a,{component:"th",scope:"row"},t+1),r.a.createElement(S.a,{align:"right"},e.name),r.a.createElement(S.a,{align:"right"},e.score))}))))))),r.a.createElement(f.a,{style:{marginTop:"3rem"}},r.a.createElement(D,{state:t})))},D=function(e){var t=e.state;return r.a.createElement(y.a,null,r.a.createElement(v.a,null,r.a.createElement(b.a,null,r.a.createElement(w.a,null,r.a.createElement(S.a,null),t.players.map((function(e){return r.a.createElement(S.a,{align:"right",key:"head-".concat(e)},e)})))),r.a.createElement(k.a,null,t.rounds.map((function(e,a){return r.a.createElement(w.a,{key:"row-".concat(a)},r.a.createElement(S.a,null,a+1),t.players.map((function(n,l){return r.a.createElement(S.a,{align:"right",key:"cell=".concat(a,"-").concat(l)},e[l]," | ",t.wants[a][l])})))})))))},x=function(e){var t=e.onSubmit,a=e.count,n=Array(void 0===a?6:a).fill("");return r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=n.map((function(t,a){return e.target["playerName".concat(a+1)].value})).filter((function(e){return e.length}));Object(o.a)(new Set(a)).length!==a.length?alert("Jeder spieler sollte einen eindeutigen namen haben ;)"):t(a)}},n.map((function(e,t){return r.a.createElement(p.a,{variant:"outlined",required:t<3,key:t,autoComplete:"off",label:"Spieler ".concat(t+1),name:"playerName".concat(t+1),placeholder:"Name",margin:"normal",type:"text",fullWidth:!0})})),r.a.createElement(s.a,{variant:"contained",color:"primary",type:"submit"},"spiel starten"))},C=a(96),P=a(97);var B=function(){return r.a.createElement("div",null,r.a.createElement(C.a,{position:"static"},r.a.createElement(m.a,{variant:"h6"},"STIFT UND BLOCK")),r.a.createElement(P.a,null,r.a.createElement(N,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[49,1,2]]]);
//# sourceMappingURL=main.2fe9e91f.chunk.js.map