(function(){"use strict";var e={323:function(e,t,a){var i=a(825),s=a(875);function l(e,t){const a=(0,s.up)("router-view");return(0,s.wg)(),(0,s.j4)(a)}var o=a(407);const n={},r=(0,o.Z)(n,[["render",l]]);var c=r,d=a(287),h=a(970),u=a(641),m=a(452),v=a(71),f=a(569),p=(0,s.aZ)({__name:"colBar",props:{data:{}},setup(e){const t=e;let a,i;const l=(0,u.iH)();function o(){var e;const s=(null===(e=t.data)||void 0===e?void 0:e.map((e=>{const t=e.value;return Object.assign(Object.assign({},e),{value:0===t||1===t?3:Math.log(t)+3,realValue:t})})))||[],o=Math.max(...s.map((e=>e.value))),n={grid:{top:30,bottom:10,left:50,right:50},yAxis:[{splitLine:{show:!1},type:"value",show:!1}],xAxis:[{splitLine:{show:!1},axisLine:{show:!1},type:"category",axisTick:{show:!1},inverse:!0,data:s.map((e=>e.name)),axisLabel:{color:"#01c0ff",fontSize:12,formatter(e){return null===e||void 0===e?void 0:e.split("").join("\n")},verticalAlign:"bottom",padding:[0,28,10,0]}},{type:"category",inverse:!0,axisTick:"none",axisLine:"none",show:!0,offset:-10,axisLabel:{fontFamily:"segmentFont",color:"#fff",fontSize:15,fontWeight:500},data:s.map((e=>e.realValue))}],series:[{type:"bar",barWidth:5,legendHoverLink:!1,silent:!0,itemStyle:{normal:{color:new f.Q.o(1,1,1,0,[{offset:0,color:"#011753"},{offset:1,color:"#46e9f7"}])}},data:s,z:1},{type:"pictorialBar",itemStyle:{normal:{color:"#061348"}},symbolRepeat:"fixed",symbolMargin:10,symbol:"rect",symbolClip:!0,symbolSize:[8,1],symbolPosition:"start",symbolOffset:[1,-1],symbolBoundingData:1.1*o,data:s,z:2,animationEasing:"elasticOut"},{name:"外框",type:"bar",barGap:"-130%",data:new Array(s.length).fill(1.1*o),barWidth:8,animation:!1,itemStyle:{normal:{color:"transparent",barBorderColor:"#1C4B8E",barBorderWidth:1,label:{show:!1}}}},{name:"hightLightPoniter",type:"scatter",data:s,symbol:"roundRect",symbolSize:[9,3],symbolOffset:-.5,zlevel:2,itemStyle:{color:"#fff",shadowColor:"rgba(115, 243, 255, 1)",shadowBlur:6}}]};null===a||void 0===a||a.dispose(),null===a||void 0===a||a.clear(),a=f.S1(l.value);let r=!1;const c=new Array(s.length).fill(0);clearInterval(i),i=setInterval((()=>{a.setOption({series:[{name:"hightLightPoniter",animationDurationUpdate:2e3,animationEasingUpdate:"linear",data:r?s.map((e=>e.value)):c}]}),r=!r}),4e3),a.resize(),a.setOption(n)}return(0,s.YP)((()=>t.data),o),(0,s.Ah)((()=>{clearInterval(i)})),(0,s.bv)(o),(e,t)=>((0,s.wg)(),(0,s.iD)("div",{class:"charts",ref_key:"$el",ref:l},null,512))}});const y=(0,o.Z)(p,[["__scopeId","data-v-8a5d8514"]]);var g=y,w=(0,s.aZ)({__name:"rowBar",props:{data:{}},setup(e){const t=e;let a,i;const l=(0,u.iH)();let o=["#468FF7","#f7ad46","#46e9f7","#067c87","#468FF7","#f75446"];function n(){var e;const s=(null===(e=t.data)||void 0===e?void 0:e.map((e=>{const t=e.value;return Object.assign(Object.assign({},e),{value:0===t||1===t?3:+(Math.log(t)+3).toFixed(2),realValue:t})})))||[],n=Math.max(...s.map((e=>e.value))),r=Math.ceil(1.2*n),c=null===s||void 0===s?void 0:s.map((e=>r-e.value)),d={color:o,grid:{top:10,bottom:20,left:150,right:80},xAxis:[{splitLine:{show:!1},type:"value",show:!1,max:r},{type:"value",inverse:!0,show:!1,max:r,splitLine:{show:!1}}],yAxis:[{splitLine:{show:!1},axisLine:{show:!1},type:"category",axisTick:{show:!1},inverse:!0,data:s.map((e=>e.name)),axisLabel:{color:"#01c0ff",fontSize:12,margin:10}},{type:"category",inverse:!0,axisTick:"none",axisLine:"none",show:!0,axisLabel:{fontFamily:"segmentFont",color:"#fff",fontSize:15,fontWeight:500},data:s.map((e=>e.realValue))}],series:[{name:"率",type:"bar",barWidth:7,showBackground:!0,backgroundStyle:{color:"#194B72"},label:{show:!1},z:5,data:s.map(((e,t)=>({name:e.name,value:e.value,itemStyle:{color:{type:"linear",x:0,y:0,x2:1,y2:1,colorStops:[{offset:0,color:"#011753"},{offset:1,color:o[t%o.length]}]}}})))},{name:"反向",type:"bar",barWidth:20,xAxisIndex:1,barGap:"-180%",itemStyle:{color:"#061537"},label:{show:!1},z:4,data:c},{name:"外圆",type:"scatter",emphasis:{scale:!1},symbol:"rect",symbolSize:[5,10],symbolOffset:[0,-4],itemStyle:{color:"#FFF",shadowColor:"rgba(255, 255, 255, 0.5)",shadowBlur:5,borderWidth:1,opacity:1},z:6,data:s,animationDelay:500},{name:"移动竖线",type:"scatter",emphasis:{scale:!1},symbol:"rect",symbolSize:[1,18],symbolOffset:[0,-3],itemStyle:{color:"#FFF",shadowColor:"rgba(255, 255, 255, 0.5)",shadowBlur:5,borderWidth:1,opacity:1},z:2,data:new Array(s.length).fill(.2),animationDelay:500}]};null===a||void 0===a||a.dispose(),null===a||void 0===a||a.clear(),a=f.S1(l.value);let h=!0;const u=new Array(s.length).fill(.2);clearInterval(i),i=setInterval((()=>{a.setOption({series:[{name:"移动竖线",animationDurationUpdate:2e3,animationEasingUpdate:"linear",data:h?new Array(s.length).fill(1.1*n):u}]}),h=!h}),3e3),a.resize(),a.setOption(d)}return(0,s.YP)((()=>t.data),n),(0,s.Ah)((()=>{clearInterval(i)})),(0,s.bv)(n),(e,t)=>((0,s.wg)(),(0,s.iD)("div",{class:"charts",ref_key:"$el",ref:l},null,512))}});const b=(0,o.Z)(w,[["__scopeId","data-v-6e619883"]]);var x=b,S=a(349);const _=e=>((0,s.dD)("data-v-ef616b48"),e=e(),(0,s.Cn)(),e),W={style:{width:"100%",height:"100%",display:"flex"}},z={class:"circleBox"},F=(0,s.uE)('<div class="svg1box" data-v-ef616b48><svg class="svgItem svg1" data-v-ef616b48><circle id="circle1" cx="50%" cy="50%" r="29%" fill="transparent" stroke="#A098FC" stroke-dasharray="70,1000" stroke-width="1" data-v-ef616b48></circle></svg><svg class="svgItem svg2" data-v-ef616b48><circle id="circle2" cx="50%" cy="50%" r="29%" fill="transparent" stroke="#A098FC" stroke-dasharray="70,1000" stroke-width="1" data-v-ef616b48></circle></svg></div><div class="svg2box" data-v-ef616b48><svg class="svgItem svg1" data-v-ef616b48><circle id="circle1" cx="50%" cy="50%" r="32%" fill="transparent" stroke="#4386FA" stroke-dasharray="100,1000" stroke-width="1" data-v-ef616b48></circle></svg><svg class="svgItem svg2" data-v-ef616b48><circle id="circle2" cx="50%" cy="50%" r="32%" fill="transparent" stroke="#4386FA" stroke-dasharray="100,1000" stroke-width="1" data-v-ef616b48></circle></svg></div>',2),k={style:{width:"50px",display:"flex","flex-direction":"column","justify-content":"center",transform:"translateX(-15px)",color:"var(--baseColor)"},class:""},U=_((()=>(0,s._)("span",{style:{"font-size":"12px"}}," cpu",-1))),C=_((()=>(0,s._)("div",{style:{width:"10px",height:"5px"}},null,-1))),D=_((()=>(0,s._)("span",{style:{"font-size":"12px"}}," mem",-1)));var P=(0,s.aZ)({__name:"circleNormal",props:{data:{}},setup(e){const t=e;let a,i;const l=(0,u.iH)();function o(e,t=100){const a=t>>1,i=[],s=e/t*a;for(let l=0;l<a;l++)i.push({value:1,name:l,itemStyle:{color:l<s?new f.Q.o(0,0,0,1,[{offset:0,color:"#0ff"},{offset:1,color:"#5467df"}]):"#251f45"}});return i}function n(){var e,s,n;const r=(null===(e=t.data)||void 0===e?void 0:e.cpu)||0,c=(null===(s=t.data)||void 0===s?void 0:s.mem)||0,d=Math.max(Math.min(100,Math.floor(10*Math.max(r,c))),70),h=(null===(n=t.data)||void 0===n?void 0:n.title)||"未知",u={title:{text:h,left:"center",top:"center",textStyle:{color:"#01c0ff",fontSize:12}},grid:{top:0,bottom:0,left:0,right:0},polar:[{radius:["70%","80%"],center:["50%","50%"]}],angleAxis:[{max:d,show:!1}],radiusAxis:{type:"category",show:!0,axisLabel:{show:!1},axisLine:{show:!1},axisTick:{show:!1}},series:[{name:"外圈发光圆环",type:"bar",roundCap:!0,barWidth:60,showBackground:!0,backgroundStyle:{color:"#2e2856"},data:[r],coordinateSystem:"polar",polarIndex:0,itemStyle:{normal:{color:new f.Q.o(0,1,0,0,[{offset:0,color:"#585fe1"},{offset:1,color:"#0ff"}])}}},{hoverAnimation:!1,type:"pie",z:2,name:"带竖线的内圈圆环",data:o(c,d),radius:["50%","65%"],zlevel:2,itemStyle:{normal:{borderColor:"#180f2a",borderWidth:2}},label:{normal:{position:"inside",show:!1}}}]};null===a||void 0===a||a.dispose(),null===a||void 0===a||a.clear(),a=f.S1(l.value);clearInterval(i),a.resize(),a.setOption(u)}return(0,s.Ah)((()=>{clearInterval(i)})),(0,s.bv)(n),(0,s.YP)((()=>t.data),n),(e,t)=>{var a,i;return(0,s.wg)(),(0,s.iD)("div",W,[(0,s._)("div",z,[F,(0,s._)("div",{class:"charts",ref_key:"$el",ref:l},null,512)]),(0,s._)("div",k,[U,(0,s._)("span",null,(0,S.zw)((null===(a=e.data)||void 0===a?void 0:a.cpu)||"--")+"% ",1),C,D,(0,s.Uk)(" "+(0,S.zw)((null===(i=e.data)||void 0===i?void 0:i.mem)||"--")+"% ",1)])])}}});const A=(0,o.Z)(P,[["__scopeId","data-v-ef616b48"]]);var O=A;const H={class:"circleBox"};var T=(0,s.aZ)({__name:"circlePie2",props:{title:{type:String,default:"在线数目"},data:{type:Array}},setup(e){const t=e;let a;(0,s.bv)(r);const i=["#00C0FD","#3751E6","#FFC722","#886EFF","#008DEC","#114C90","#00BFA5"];(0,s.YP)((()=>t.data),r);const l=(0,u.iH)();let o;function n(e){return e>=1e8?`{a|${Number(e/1e7).toFixed(0)}} 千万`:e>=1e5?`{a|${Number(e/1e4).toFixed(0)}} 万`:`{a|${Number(e).toFixed(0)}}`}function r(){var e;clearTimeout(o);const s=(null===(e=t.data)||void 0===e?void 0:e.filter((e=>"其他"!==e.name)).sort(((e,t)=>t.value-e.value)).slice(0,7))||[],c=s.reduce(((e,t)=>(t.value||0)+e),0),d=null===s||void 0===s?void 0:s.map((e=>Object.assign(Object.assign({},e),{value:Math.floor(e.value/c*100)}))),h={title:[{text:n(c),left:"center",top:"center",textStyle:{fontSize:15,color:"#fff",fontWeight:"normal",verticalAlign:"center",lineHeight:25,rich:{a:{fontFamily:"segmentFont",fontSize:25,lineHeight:25,color:"#fff",verticalAlign:"center"}}}}],series:[{name:"pieData",type:"pie",startAngle:170,radius:["58%","60%"],hoverAnimation:!1,label:{color:"#01c0ff",fontSize:14},data:d.map(((e,t)=>[{value:e.value,name:e.name,itemStyle:{borderWidth:10,shadowBlur:20,borderColor:i[t],shadowColor:i[t]}},{value:5,name:"",label:{show:!1},labelLine:{show:!1},itemStyle:{color:"rgba(0, 0, 0, 0)",borderColor:"rgba(0, 0, 0, 0)",borderWidth:0}}])).flat(2)}]};null===a||void 0===a||a.clear(),null===a||void 0===a||a.dispose(),a=f.S1(l.value),a.resize(),a.setOption(h),o=setTimeout((()=>{r()}),5e3)}return(0,s.Ah)((()=>{clearTimeout(o)})),(e,t)=>((0,s.wg)(),(0,s.iD)("div",H,[(0,s._)("div",{class:"charts",ref_key:"$el",ref:l},null,512)]))}});const M=(0,o.Z)(T,[["__scopeId","data-v-09d7442d"]]);var $=M,j=a.p+"img/area.8e7c24c9.png";const L=e=>((0,s.dD)("data-v-cebcfebe"),e=e(),(0,s.Cn)(),e),B={class:"platForm"},I=L((()=>(0,s._)("img",{style:{height:"80%"},src:j,alt:""},null,-1))),Z={class:"count windows"},N=L((()=>(0,s._)("span",{style:{"font-size":"12px","font-family":"'Courier New', Courier, monospace"}},"win",-1))),E=L((()=>(0,s._)("br",null,null,-1))),G={class:"count linux"},q=L((()=>(0,s._)("span",{style:{"font-size":"12px","font-family":"'Courier New', Courier, monospace"}},"linux",-1))),Y=L((()=>(0,s._)("br",null,null,-1))),R={class:"count mac"},V=L((()=>(0,s._)("span",{style:{"font-size":"12px","font-family":"'Courier New', Courier, monospace"}},"mac",-1))),Q=L((()=>(0,s._)("br",null,null,-1))),K={class:"count other"},J=L((()=>(0,s._)("span",{style:{"font-size":"12px","font-family":"'Courier New', Courier, monospace"}},"other",-1))),X=L((()=>(0,s._)("br",null,null,-1))),ee={class:"count sum"},te=L((()=>(0,s._)("span",{style:{"font-size":"12px","font-family":"'Courier New', Courier, monospace"}},"总数",-1))),ae=L((()=>(0,s._)("br",null,null,-1)));var ie=(0,s.aZ)({__name:"platform",props:{data:{}},setup(e){const t=e,a=((0,u.iH)({other:100,mac:300,windows:3e4,linux:5e3}),(0,s.Fl)((()=>({other:t.data.other||0,mac:t.data.mac||0,windows:t.data.windows||0,linux:t.data.linux||0})))),i=(0,s.Fl)((()=>Object.values(a.value).reduce(((e,t)=>e+t))));return(e,t)=>((0,s.wg)(),(0,s.iD)("div",B,[I,(0,s._)("div",Z,[N,E,(0,s.Uk)(" "+(0,S.zw)(a.value.windows),1)]),(0,s._)("div",G,[q,Y,(0,s.Uk)(" "+(0,S.zw)(a.value.linux),1)]),(0,s._)("div",R,[V,Q,(0,s.Uk)(" "+(0,S.zw)(a.value.mac),1)]),(0,s._)("div",K,[J,X,(0,s.Uk)(" "+(0,S.zw)(a.value.other),1)]),(0,s._)("div",ee,[te,ae,(0,s.Uk)(" "+(0,S.zw)(i.value),1)])]))}});const se=(0,o.Z)(ie,[["__scopeId","data-v-cebcfebe"]]);var le=se;function oe(e){let t=0,a="";return e>=1e8&&(t=+Number(e/1e7).toFixed(0),a="kw"),e>=1e5&&(t=+Number(e/1e4).toFixed(0),a="w"),e>=1e4&&(t=+Number(e/1e3).toFixed(0),a="k"),[t,a]}const ne={class:"circleBox"};var re=(0,s.aZ)({__name:"radar",props:{data:{}},setup(e){const t=e;let a,i;const l=(0,u.iH)(),o=(0,u.iH)();function n(e,t=0){return{name:"gauge"+e,type:"gauge",detail:!1,splitNumber:10,radius:"90%",center:["50%","50%"],startAngle:90*e-18+t,endAngle:90*e-72+t,axisLine:{show:!1},axisTick:{show:!0,lineStyle:{color:"#66ccff",width:1},length:6,splitNumber:1},splitLine:{show:!1},axisLabel:{show:!1}}}function r(){const e={series:[n(0),n(1),n(2),n(3)]},t=f.S1(o.value);t.resize(),t.setOption(e)}function c(){var e;const i=(null===(e=t.data)||void 0===e?void 0:e.map((e=>{const t=e.value;return Object.assign(Object.assign({},e),{value:0===t||1===t?3:Math.log(t)+3,realValue:t})})))||[];if(!Array.isArray(i)||!i.length)return;const s=Math.max(...i.map((e=>e.value))),o=null===i||void 0===i?void 0:i.map((e=>({name:e.name,max:1.2*s,min:0}))),n=null===i||void 0===i?void 0:i.map((e=>e.value)),r={color:["#00C0FD"],radar:{shape:"circle",center:["50%","50%"],radius:"60%",indicator:o,axisName:{color:"#00C0FD",fontSize:14},splitNumber:4,splitArea:{show:!0,areaStyle:{color:["rgba(27, 50, 66, 0.4)"]}},axisLine:{lineStyle:{color:"#203f5d"}},splitLine:{lineStyle:{color:"rgba(99,192,251,0.2)",width:2}}},series:[{type:"radar",color:"#f7e31f",silent:!0,lineStyle:{color:"#00C0FD"},label:{show:!0,color:"#fff",formatter:e=>{var t;const[a,s]=oe((null===(t=i[e.dimensionIndex])||void 0===t?void 0:t.realValue)||0);return`{a|${a}}${s}`},rich:{a:{fontFamily:"segmentFont"}}},areaStyle:{opacity:.8,color:{type:"radial",x:.5,y:.5,r:1,colorStops:[{offset:1,color:"#4BFFFC"},{offset:0,color:"rgba(0,0,0,0)"}],globalCoord:!1}},data:[{value:n}]}]};null===a||void 0===a||a.dispose(),null===a||void 0===a||a.clear(),a=f.S1(l.value),a.resize(),a.setOption(r)}return(0,s.Ah)((()=>{clearInterval(i)})),(0,s.YP)((()=>t.data),c),(0,s.bv)((()=>{c(),r()})),(e,t)=>((0,s.wg)(),(0,s.iD)("div",ne,[(0,s._)("div",{class:"charts",ref_key:"$el",ref:l},null,512),(0,s._)("div",{class:"charts gauge",ref_key:"$el2",ref:o},null,512)]))}});const ce=(0,o.Z)(re,[["__scopeId","data-v-b6105d1a"]]);var de=ce;const he=e=>((0,s.dD)("data-v-ee3c3374"),e=e(),(0,s.Cn)(),e),ue={style:{padding:"10px",width:"100%",height:"100%"}},me=he((()=>(0,s._)("div",{style:{display:"flex",width:"100%","margin-bottom":"3px"}},[(0,s._)("div",{style:{width:"25%"},class:"tt th"},"任务名称"),(0,s._)("div",{style:{width:"25%"},class:"tt th"},"节点数量"),(0,s._)("div",{style:{width:"50%"},class:"tt th"},"功能信息")],-1))),ve={style:{height:"calc(100% - 28px)"}},fe={style:{width:"25%"},class:"tt td"},pe={style:{width:"25%"},class:"tt td"},ye={style:{width:"50%"},class:"tt td"};var ge=(0,s.aZ)({__name:"fixTable",props:{data:{}},setup(e){const t=e,a=(0,s.Fl)((()=>{var e;const a=10,i=null===(e=t.data)||void 0===e?void 0:e.slice(0,a);return i.length<a&&i.push(...new Array(a-i.length).fill({name:"*",count:"*",desc:"*"})),i}));return(e,t)=>((0,s.wg)(),(0,s.iD)("div",ue,[me,(0,s._)("div",ve,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.value,((e,t)=>((0,s.wg)(),(0,s.iD)("div",{style:{display:"flex",width:"100%"},class:"tr",key:t},[(0,s._)("div",fe,(0,S.zw)(e.name),1),(0,s._)("div",pe,(0,S.zw)(e.count),1),(0,s._)("div",ye,(0,S.zw)(e.desc),1)])))),128))])]))}});const we=(0,o.Z)(ge,[["__scopeId","data-v-ee3c3374"]]);var be=we,xe=a.p+"img/windows.7d2a2af8.svg",Se=a.p+"img/mac.b0681959.svg",_e=a.p+"img/linux.044d5376.svg",We=a.p+"img/other.7ac9d1a6.svg",ze=a.p+"img/机房.183cdb2a.svg",Fe=(0,s.aZ)({__name:"graph",props:{data:{}},setup(e){const t=e;let a,i;const l=(0,u.iH)();[{name:"win",value:25},{name:"mac",value:85},{name:"other",value:65},{name:"linux",value:55}].reverse();(0,s.Ah)((()=>{clearInterval(i)})),(0,s.YP)((()=>t.data),n),(0,s.bv)(n);const o={win:{symbol:xe,symbolSize:30},mac:{symbol:Se,symbolSize:30},linux:{symbol:_e,symbolSize:25},other:{symbol:We,symbolSize:20}};function n(){var e,i,s;let n=0;const r={linux:4,win:1,other:2,mac:3},c=(null===(i=[...(null===(e=t.data)||void 0===e?void 0:e.data)||[]])||void 0===i?void 0:i.sort(((e,t)=>r[e.name]-r[t.name])).map(((e,t)=>(n+=e.value,{name:e.name,value:[100,45*(2*t+1),e.value],symbol:"image://"+o[e.name].symbol,symbolSize:o[e.name].symbolSize,label:{show:!0,formatter:"{a|{b}}\n{b|{@[2]}}",offset:[0,25],align:"center",rich:{a:{fontSize:12,color:"#01c0ff"},b:{fontSize:14,color:"#fff",fontFamily:"segmentFont"}}},itemStyle:{color:"red"}}))))||[];c.unshift({name:(null===(s=t.data)||void 0===s?void 0:s.name)||"",value:[0,0,n],symbol:"image://"+ze,symbolSize:40,symbolOffset:[0,0],label:{show:!0,offset:[0,30],formatter:"{a|{b}}\n{b|{@[2]}}",color:"#01c0ff",align:"center",rich:{a:{fontSize:12,color:"#01c0ff"},b:{fontSize:14,color:"#fff",fontFamily:"segmentFont"}}},itemStyle:{color:"red"}});const d={xAxis:{show:!1},polar:[{radius:"90%",center:["50%","47%"]}],radiusAxis:{type:"value",show:!1},angleAxis:[{max:360,show:!1}],yAxis:{show:!1},series:[{name:"节点",type:"graph",hoverAnimation:!1,coordinateSystem:"polar",itemStyle:{shadowColor:"none"},silent:!0,emphasis:{scale:!1},data:c},{name:"线",type:"lines",silent:!0,coordinateSystem:"polar",polyline:!0,zlevel:2,lineStyle:{width:2,color:new f.Q.o(0,1,0,0,[{offset:0,color:"#585fe1"},{offset:1,color:"#0ff"}]),type:4,join:"round"},effect:{show:!0,constantSpeed:60,trailLength:0,symbol:"arrow",symbolSize:6,color:"#01c0ff",roundTrip:!0},emphasis:{lineStyle:{type:"solid"}},data:[[[20,180],[74,30],[91,45]],[[20,180],[84,150],[104,135]],[[20,180],[84,210],[104,225]],[[20,180],[74,330],[91,315]]]}]};null===a||void 0===a||a.dispose(),null===a||void 0===a||a.clear(),a=f.S1(l.value),a.resize(),a.setOption(d)}return(e,t)=>((0,s.wg)(),(0,s.iD)("div",{class:"charts",ref_key:"$el",ref:l},null,512))}});const ke=(0,o.Z)(Fe,[["__scopeId","data-v-25d172b8"]]);var Ue=ke;const Ce={ref:"wrap"},De=["innerHTML"];function Pe(e,t,a,i,l,o){return(0,s.wg)(),(0,s.iD)("div",Ce,[(0,s._)("div",{ref:"realBox",style:(0,S.j5)(o.pos)},[(0,s._)("div",{ref:"slotList",style:(0,S.j5)(o.float)},[(0,s.WI)(e.$slots,"default")],4),(0,s._)("div",{innerHTML:l.copyHtml,style:(0,S.j5)(o.float)},null,12,De)],4)],512)}function Ae(...e){let t,a,i,s,l,o,n=1,r=e[0]||{},c=!1;const d=e.length;if("boolean"===typeof r&&(c=r,r=e[1]||{},n++),"object"!==typeof r&&"function"!==typeof r&&(r={}),n===d)return r;for(;n<d;n++)if(null!=(a=e[n]))for(t in a)i=r[t],s=a[t],l=Array.isArray(s),c&&s&&("object"===typeof s||l)?(l?(l=!1,o=i&&Array.isArray(i)?i:[]):o=i&&"object"===typeof i?i:{},r[t]=Ae(c,o,s)):void 0!==s&&(r[t]=s);return r}const Oe=(e,t)=>{if(e===t)return!0;if(e.length!==t.length)return!1;for(let a=0;a<e.length;++a)if(e[a]!==t[a])return!1;return!0};var He={name:"vue-seamless-scroll",data(){return{xPos:0,yPos:0,delay:0,copyHtml:"",height:0,width:0,realBoxWidth:0}},props:{data:{type:Array,default:()=>[]},classOption:{type:Object,default:()=>({})}},computed:{leftSwitchState(){return this.xPos<0},rightSwitchState(){return Math.abs(this.xPos)<this.realBoxWidth-this.width},leftSwitchClass(){return this.leftSwitchState?"":this.options.switchDisabledClass},rightSwitchClass(){return this.rightSwitchState?"":this.options.switchDisabledClass},leftSwitch(){return{position:"absolute",margin:`${this.height/2}px 0 0 -${this.options.switchOffset}px`,transform:"translate(-100%,-50%)"}},rightSwitch(){return{position:"absolute",margin:`${this.height/2}px 0 0 ${this.width+this.options.switchOffset}px`,transform:"translateY(-50%)"}},float(){return this.isHorizontal?{float:"left",overflow:"hidden"}:{overflow:"hidden"}},pos(){return{transform:`translate(${this.xPos}px,${this.yPos}px)`,transition:`all ${this.ease} ${this.delay}ms`,overflow:"hidden"}},defaultOption(){return{step:.5,limitMoveNum:5,hoverStop:!0,direction:1,openTouch:!0,singleHeight:0,singleWidth:0,waitTime:1e3,switchOffset:30,autoPlay:!0,navigation:!1,switchSingleStep:134,switchDelay:1e3,switchDisabledClass:"disabled",isSingleRemUnit:!1}},options(){return Ae({},this.defaultOption,this.classOption)},navigation(){return this.options.navigation},autoPlay(){return!this.navigation&&this.options.autoPlay},scrollSwitch(){return this.data.length>=this.options.limitMoveNum},hoverStopSwitch(){return this.options.hoverStop&&this.autoPlay&&this.scrollSwitch},canTouchScroll(){return this.options.openTouch},isHorizontal(){return this.options.direction>1},baseFontSize(){return this.options.isSingleRemUnit?parseInt(window.getComputedStyle(document.documentElement,null).fontSize):1},realSingleStopWidth(){return this.options.singleWidth*this.baseFontSize},realSingleStopHeight(){return this.options.singleHeight*this.baseFontSize},step(){let e,t=this.options.step;return e=this.isHorizontal?this.realSingleStopWidth:this.realSingleStopHeight,e>0&&e%t>0&&console.error("如果设置了单步滚动,step需是单步大小的约数,否则无法保证单步滚动结束的位置是否准确。~~~~~"),t}},methods:{reset(){this._cancle(),this._initMove()},leftSwitchClick(){this.leftSwitchState&&(Math.abs(this.xPos)<this.options.switchSingleStep?this.xPos=0:this.xPos+=this.options.switchSingleStep)},rightSwitchClick(){this.rightSwitchState&&(this.realBoxWidth-this.width+this.xPos<this.options.switchSingleStep?this.xPos=this.width-this.realBoxWidth:this.xPos-=this.options.switchSingleStep)},_cancle(){cancelAnimationFrame(this.reqFrame||"")},_move(){this.isHover||(this._cancle(),this.reqFrame=requestAnimationFrame(function(){const e=this.realBoxHeight/2,t=this.realBoxWidth/2;let{direction:a,waitTime:i}=this.options,{step:s}=this;1===a?(Math.abs(this.yPos)>=e&&(this.$emit("ScrollEnd"),this.yPos=0),this.yPos-=s):0===a?(this.yPos>=0&&(this.$emit("ScrollEnd"),this.yPos=-1*e),this.yPos+=s):2===a?(Math.abs(this.xPos)>=t&&(this.$emit("ScrollEnd"),this.xPos=0),this.xPos-=s):3===a&&(this.xPos>=0&&(this.$emit("ScrollEnd"),this.xPos=-1*t),this.xPos+=s),this.singleWaitTime&&clearTimeout(this.singleWaitTime),this.realSingleStopHeight?Math.abs(this.yPos)%this.realSingleStopHeight<s?this.singleWaitTime=setTimeout((()=>{this._move()}),i):this._move():this.realSingleStopWidth&&Math.abs(this.xPos)%this.realSingleStopWidth<s?this.singleWaitTime=setTimeout((()=>{this._move()}),i):this._move()}.bind(this)))},_initMove(){this.$nextTick((()=>{const{switchDelay:e}=this.options,{autoPlay:t,isHorizontal:a}=this;if(this._dataWarm(this.data),this.copyHtml="",a){this.height=this.$refs.wrap.offsetHeight,this.width=this.$refs.wrap.offsetWidth;let e=this.$refs.slotList.offsetWidth;t&&(e=2*e+1),this.$refs.realBox.style.width=e+"px",this.realBoxWidth=e}if(!t)return this.ease="linear",void(this.delay=e);if(this.ease="ease-in",this.delay=0,this.scrollSwitch){let e;e&&clearTimeout(e),this.copyHtml=this.$refs.slotList.innerHTML,setTimeout((()=>{this.realBoxHeight=this.$refs.realBox.offsetHeight,this._move()}),0)}else this._cancle(),this.yPos=this.xPos=0}))},_dataWarm(e){e.length>100&&console.warn(`数据达到了${e.length}条有点多哦~,可能会造成部分老旧浏览器卡顿。`)},_startMove(){this.isHover=!1,this._move()},_stopMove(){this.isHover=!0,this.singleWaitTime&&clearTimeout(this.singleWaitTime),this._cancle()}},mounted(){this._initMove()},watch:{data(e,t){this._dataWarm(e),Oe(e,t)||this.reset()},autoPlay(e){e?this.reset():this._stopMove()}},beforeCreate(){this.reqFrame=null,this.singleWaitTime=null,this.isHover=!1,this.ease="ease-in"},beforeUnmount(){this._cancle(),clearTimeout(this.singleWaitTime)}};const Te=(0,o.Z)(He,[["render",Pe]]);var Me=Te;const $e={style:{position:"relative",width:"100%",height:"100%",padding:"10px"}},je=(0,s.uE)('<div style="display:flex;width:100%;margin-bottom:3px;"><div style="width:10%;" class="tt th">级别</div><div style="width:20%;" class="tt th">主机</div><div style="width:40%;" class="tt th">主题</div><div style="width:30%;" class="tt th">时间</div></div>',1),Le={style:{width:"10%"},class:"tt td"},Be={style:{width:"20%"},class:"tt td"},Ie={style:{width:"40%"},class:"tt td"},Ze={style:{width:"30%"},class:"tt td"};var Ne=(0,s.aZ)({__name:"scrollEventTable",props:{data:{}},setup(e){const t=(0,u.iH)();return(e,a)=>((0,s.wg)(),(0,s.iD)("div",$e,[je,(0,s.Wm)(Me,{ref_key:"scrollTableRef",ref:t,data:e.data,class:"warp"},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.data,((e,t)=>((0,s.wg)(),(0,s.iD)("div",{style:{display:"flex",width:"100%"},class:"tr",key:t},[(0,s._)("div",Le,(0,S.zw)(e.level),1),(0,s._)("div",Be,(0,S.zw)(e.inet),1),(0,s._)("div",Ie,(0,S.zw)(e.subject),1),(0,s._)("div",Ze,(0,S.zw)(e.created_at),1)])))),128))])),_:1},8,["data"])]))}});const Ee=Ne;var Ge=Ee,qe=a(731),Ye=a.n(qe);const Re=e=>((0,s.dD)("data-v-ef777be6"),e=e(),(0,s.Cn)(),e),Ve={class:"home"},Qe=Re((()=>(0,s._)("div",{class:"header"},[(0,s._)("span",null," 安全监控中心 ")],-1))),Ke={style:{height:"60.6667%"}},Je={style:{height:"50%",width:"100%",position:"relative"},class:"area"},Xe=Re((()=>(0,s._)("span",{class:"title"},[(0,s._)("span",{class:"title-text"},"agent安装情况（台）")],-1))),et={style:{height:"50%",width:"100%"},class:"area"},tt=Re((()=>(0,s._)("span",{class:"title"},[(0,s._)("span",{class:"title-text"},"agent状态统计（台）")],-1))),at={class:"area",style:{height:"50%",width:"100%"}},it=Re((()=>(0,s._)("span",{class:"title"},[(0,s._)("span",{class:"title-text"},"七日内终端登录统计")],-1))),st={class:"area",style:{height:"50%",width:"100%"}},lt=Re((()=>(0,s._)("span",{class:"title"},[(0,s._)("span",{class:"title-text"},"风险事件统计")],-1))),ot=Re((()=>(0,s._)("span",{class:"title"},[(0,s._)("span",{class:"title-text"},"各机房broker分布情况")],-1))),nt={class:"area",style:{height:"50%",width:"100%"}},rt=Re((()=>(0,s._)("span",{class:"title"},[(0,s._)("span",{class:"title-text"},"borker内存和CPU监控")],-1))),ct={style:{height:"50%",width:"100%"},class:"area"},dt=Re((()=>(0,s._)("span",{class:"title"},[(0,s._)("span",{class:"title-text"}," 七日内风险事件统计（次）")],-1))),ht={style:{height:"39.3333%"}},ut=Re((()=>(0,s._)("span",{class:"title"},[(0,s._)("span",{class:"title-text"},"主机滚动事件")],-1))),mt=Re((()=>(0,s._)("span",{class:"title"},[(0,s._)("span",{class:"title-text"},"agent任务")],-1))),vt=Re((()=>(0,s._)("span",{class:"title"},[(0,s._)("span",{class:"title-text"},"供应链监控 ")],-1)));var ft=(0,s.aZ)({__name:"home",setup(e){const t=p((()=>(0,h.mG)(this,void 0,void 0,(function*(){return{linux:5976,windows:3295,mac:0,other:0}}))),72e6),a=p((()=>(0,h.mG)(this,void 0,void 0,(function*(){return[{name:"未激活",value:0},{name:"在线",value:8420},{name:"离线",value:851},{name:"已删除",value:0}]})))),i=p((()=>(0,h.mG)(this,void 0,void 0,(function*(){return[{name:"commons-codec",value:2364},{name:"commons-logging",value:2235},{name:"httpcore",value:1831},{name:"httpclient",value:1830},{name:"javassist",value:1824},{name:"common",value:1593},{name:"rpc-api",value:1509},{name:"remoting-api",value:1509},{name:"cluster",value:1509},{name:"serialization-api",value:1508}]}))),3e4),l=p((()=>(0,h.mG)(this,void 0,void 0,(function*(){return[{name:"内网节点1",data:[{name:"win",value:1458},{name:"linux",value:3600},{name:"mac",value:0},{name:"other",value:0}]},{name:"内网节点2",data:[{name:"win",value:1},{name:"linux",value:6},{name:"mac",value:0},{name:"other",value:0}]},{name:"内网节点3",data:[{name:"win",value:270},{name:"linux",value:490},{name:"mac",value:0},{name:"other",value:0}]},{name:"内网节点4",data:[{name:"win",value:610},{name:"linux",value:513},{name:"mac",value:0},{name:"other",value:0}]},{name:"内网节点5",data:[{name:"win",value:955},{name:"linux",value:1364},{name:"mac",value:0},{name:"other",value:0}]},{name:"内网节点6",data:[{name:"win",value:0},{name:"linux",value:2},{name:"mac",value:0},{name:"other",value:0}]},{name:"内网节点7",data:[{name:"win",value:1},{name:"linux",value:1},{name:"mac",value:0},{name:"other",value:0}]}]}))),36e5),o=p((()=>(0,h.mG)(this,void 0,void 0,(function*(){return[{name:"测试应用",value:1},{name:"危险事件",value:11110},{name:"低危事件",value:31110},{name:"扣分事件",value:11110},{name:"每日触发事件",value:300}]}))),12e4),n=p((()=>(0,h.mG)(this,void 0,void 0,(function*(){return[{name:"紧急",value:11347},{name:"高危",value:32596},{name:"中危",value:278707},{name:"低危",value:5}]})))),r=p((()=>(0,h.mG)(this,void 0,void 0,(function*(){function e(e){switch(e){case"success":return"登录成功";case"failed":return"登录失败";case"logout":return"退出登录";default:return"其他"}}return Object.entries({success:1e3,failed:200,logout:500}).map((([t,a])=>({name:e(t),value:a||0})))})))),c=p((()=>(0,h.mG)(this,void 0,void 0,(function*(){return Ye().mock({"a|50":[{inet:"@ip","level|1":["高危","低危","中危"],subject:"@cparagraph(5,15)",created_at:"@date"}]}).a})))),d=p((()=>(0,h.mG)(this,void 0,void 0,(function*(){return Ye().mock({"a|10":[{name:"@paragraph(5,10)",count:"@integer(10,100)",desc:"@cparagraph(10,15)"}]}).a}))),12e5),f=p((()=>(0,h.mG)(this,void 0,void 0,(function*(){return[{title:"机器1",cpu:1.72,mem:79.34},{title:"机器2",cpu:1.72,mem:79.34},{title:"机器3",cpu:1.72,mem:79.34},{title:"机器4",cpu:1.72,mem:79.34}]}))));function p(e,t=2e4){const a=(0,u.iH)(0),i=(0,u.iH)([]);return e().then((e=>{i.value=e})),a.value=setInterval((()=>(0,h.mG)(this,void 0,void 0,(function*(){i.value=yield e()}))),t),(0,s.Jd)((()=>{clearInterval(a.value)})),i}return(e,h)=>((0,s.wg)(),(0,s.iD)("div",Ve,[Qe,(0,s._)("div",Ke,[(0,s.Wm)((0,u.SU)(m.dq),{gutter:10,class:"h100"},{default:(0,s.w5)((()=>[(0,s.Wm)((0,u.SU)(v.Dv),{span:5,class:"h100"},{default:(0,s.w5)((()=>[(0,s._)("div",Je,[Xe,(0,s.Wm)(le,{data:(0,u.SU)(t)},null,8,["data"])]),(0,s._)("div",et,[tt,(0,s.Wm)(g,{data:(0,u.SU)(a)},null,8,["data"])])])),_:1}),(0,s.Wm)((0,u.SU)(v.Dv),{span:5,class:"h100"},{default:(0,s.w5)((()=>[(0,s._)("div",at,[it,(0,s.Wm)($,{data:(0,u.SU)(r)},null,8,["data"])]),(0,s._)("div",st,[lt,(0,s.Wm)(de,{style:{transform:"translateY(20px)"},data:(0,u.SU)(n)},null,8,["data"])])])),_:1}),(0,s.Wm)((0,u.SU)(v.Dv),{span:8,class:"h100 area"},{default:(0,s.w5)((()=>[ot,(0,s.Wm)((0,u.SU)(m.dq),{style:{height:"50%"}},{default:(0,s.w5)((()=>[(0,s.Wm)((0,u.SU)(v.Dv),{span:12,style:{height:"100%"}},{default:(0,s.w5)((()=>[(0,s.Wm)(Ue,{data:(0,u.SU)(l)[0]},null,8,["data"])])),_:1}),(0,s.Wm)((0,u.SU)(v.Dv),{span:12,style:{height:"100%"}},{default:(0,s.w5)((()=>[(0,s.Wm)(Ue,{data:(0,u.SU)(l)[1]},null,8,["data"])])),_:1})])),_:1}),(0,s.Wm)((0,u.SU)(m.dq),{style:{height:"50%"},class:"broker"},{default:(0,s.w5)((()=>[(0,s.Wm)((0,u.SU)(v.Dv),{span:12,style:{height:"100%"}},{default:(0,s.w5)((()=>[(0,s.Wm)(Ue,{data:(0,u.SU)(l)[2]},null,8,["data"])])),_:1}),(0,s.Wm)((0,u.SU)(v.Dv),{span:12,style:{height:"100%"}},{default:(0,s.w5)((()=>[(0,s.Wm)(Ue,{data:(0,u.SU)(l)[3]},null,8,["data"])])),_:1})])),_:1})])),_:1}),(0,s.Wm)((0,u.SU)(v.Dv),{span:6,class:"h100"},{default:(0,s.w5)((()=>[(0,s._)("div",nt,[rt,(0,s.Wm)((0,u.SU)(m.dq),{style:{height:"45%","margin-top":"10px"}},{default:(0,s.w5)((()=>[(0,s.Wm)((0,u.SU)(v.Dv),{span:12,class:"h100",style:{display:"flex"}},{default:(0,s.w5)((()=>[(0,s.Wm)(O,{style:{flex:"1"},data:(0,u.SU)(f)[0]},null,8,["data"])])),_:1}),(0,s.Wm)((0,u.SU)(v.Dv),{span:12,class:"h100"},{default:(0,s.w5)((()=>[(0,s.Wm)(O,{data:(0,u.SU)(f)[1]},null,8,["data"])])),_:1})])),_:1}),(0,s.Wm)((0,u.SU)(m.dq),{style:{height:"45%","margin-top":"10px"}},{default:(0,s.w5)((()=>[(0,s.Wm)((0,u.SU)(v.Dv),{span:12,class:"h100"},{default:(0,s.w5)((()=>[(0,s.Wm)(O,{data:(0,u.SU)(f)[2]},null,8,["data"])])),_:1}),(0,s.Wm)((0,u.SU)(v.Dv),{span:12,class:"h100"},{default:(0,s.w5)((()=>[(0,s.Wm)(O,{data:(0,u.SU)(f)[3]},null,8,["data"])])),_:1})])),_:1})]),(0,s._)("div",ct,[dt,(0,s.Wm)(g,{data:(0,u.SU)(o)},null,8,["data"])])])),_:1})])),_:1})]),(0,s._)("div",ht,[(0,s.Wm)((0,u.SU)(m.dq),{class:"h100"},{default:(0,s.w5)((()=>[(0,s.Wm)((0,u.SU)(v.Dv),{span:11,class:"area h100"},{default:(0,s.w5)((()=>[ut,(0,s.Wm)(Ge,{data:(0,u.SU)(c)},null,8,["data"])])),_:1}),(0,s.Wm)((0,u.SU)(v.Dv),{span:7,class:"area h100"},{default:(0,s.w5)((()=>[mt,(0,s.Wm)(be,{data:(0,u.SU)(d)},null,8,["data"])])),_:1}),(0,s.Wm)((0,u.SU)(v.Dv),{span:6,class:"area h100"},{default:(0,s.w5)((()=>[vt,(0,s.Wm)(x,{data:(0,u.SU)(i)},null,8,["data"])])),_:1})])),_:1})])]))}});const pt=(0,o.Z)(ft,[["__scopeId","data-v-ef777be6"]]);var yt=pt;const gt=[{path:"/",name:"home",component:yt}],wt=(0,d.p7)({history:(0,d.PO)("/example/ssoc/"),routes:gt});var bt=wt,xt=(a(592),a(382));xt.Z.defaults.timeout=3e5,xt.Z.defaults.baseURL="/api/v1";const St=(0,i.ri)(c);St.use(bt).mount("#app")}},t={};function a(i){var s=t[i];if(void 0!==s)return s.exports;var l=t[i]={exports:{}};return e[i].call(l.exports,l,l.exports,a),l.exports}a.m=e,function(){var e=[];a.O=function(t,i,s,l){if(!i){var o=1/0;for(d=0;d<e.length;d++){i=e[d][0],s=e[d][1],l=e[d][2];for(var n=!0,r=0;r<i.length;r++)(!1&l||o>=l)&&Object.keys(a.O).every((function(e){return a.O[e](i[r])}))?i.splice(r--,1):(n=!1,l<o&&(o=l));if(n){e.splice(d--,1);var c=s();void 0!==c&&(t=c)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[i,s,l]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var i in t)a.o(t,i)&&!a.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/example/ssoc/"}(),function(){var e={826:0};a.O.j=function(t){return 0===e[t]};var t=function(t,i){var s,l,o=i[0],n=i[1],r=i[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(s in n)a.o(n,s)&&(a.m[s]=n[s]);if(r)var d=r(a)}for(t&&t(i);c<o.length;c++)l=o[c],a.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return a.O(d)},i=self["webpackChunkssoc"]=self["webpackChunkssoc"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=a.O(void 0,[998],(function(){return a(323)}));i=a.O(i)})();
//# sourceMappingURL=index.f29407e0.js.map