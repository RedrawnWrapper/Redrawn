var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

window.SearchSuggestion=(function(){var d=window.$,j=window.searchTermsDataUrl||"/static/store/common/terms.json",k=false,i=null,b=function(n){i=n},c=(function(){var s=null,t=function(y,x){return{value:y,parentNode:x,children:[],isWord:false}},p=function(){return s},q=function(x,y){var z=null,A=false;d.each(x,function(C,B){if(B.value===y){z=B;A=true;return false}});if(A){return z}return null},n=function(y){var x=[];if(y.parentNode===null){return x}d.each(y.parentNode.children,function(A,z){if(z.value!==y.value){x.push(z)}});return x},r=function(z){var y=z,x=null,A=0;while(true){if(y.value===null){break}A+=1;y=y.parentNode}return A},o=function(A){var z=A,y=null,x="";while(true){if(z.value===null){break}x=z.value.concat(x);z=z.parentNode}return x},v=function(){s=t(null,null)},u=function(B){var A=s,C=null,z=null,y=null,x=0;while(true){if(x===B.length){A.isWord=true;break}C=B.charAt(x);z=q(A.children,C);if(z===null){y=t(C,A);A.children.push(y);A=y}else{A=z}x+=1}},w=function(y){var z=[],A=q(s.children,y.charAt(0)),x=[],B=function(C,D){if(D.children.length===0){x.push(C.concat(D.value));return}if(D.isWord){x.push(C.concat(D.value))}d.each(D.children,function(F,E){B(o(D),E)})};if(A===null){return[]}(function(){var C=y.slice(1).split(""),D=A;d.each(C,function(G,F){var E=q(D.children,F);if(E!==null){if(G!==(C.length-1)){D=E}else{B(o(E.parentNode),E)}d.each(n(E),function(H,I){z.push(I)})}else{d.each(D.children,function(I,H){z.push(H)});if(D!==A){d.each(n(D),function(H,I){z.push(I)})}return false}})}());(function(){d.each(z,function(D,F){var C=y.slice(r(F)).split(""),E=F,G=false;d.each(C,function(J,I){var H=q(E.children,I);if(H===null){G=true;return false}E=H});if(!G){B(o(E.parentNode),E)}})}());(function(){var D=null,C=[];d.each(x,function(F,E){if(E===y){D=E}else{C.push(E)}});C=d.unique(C);C.sort();if(D!==null){C.unshift(D)}x=C}());return x};return{init:v,insert:u,getRoot:p,search:w}}()),a=function(){return c.getRoot()},g=null,f=function(o){var n=null,p=function(q,r){if(!g.hasOwnProperty(r)){g[r]=[]}g[r].push(n);c.insert(r)};g={};for(n in o){if(o.hasOwnProperty(n)){if(!g.hasOwnProperty(n)){g[n]=[]}if(!g[n].hasOwnProperty(n)){g[n].push(n);c.insert(n)}d.each(o[n],p)}}},l=function(){return g},m=function(){if(!k){d.get(j,function(n){c.init();f(n);k=true;if(typeof i==="function"){i()}},"json")}},e=function(n){if(!k||(n.length<=1)){return[]}return c.search(n.toLowerCase())},h=function(n){n=n.toLowerCase();if(!g.hasOwnProperty(n)){return[]}return g[n]};m();return{setOnReady:b,getTermTrieRoot:a,getTermLookup:l,suggest:e,getControlTerms:h}}());

}
/*
     FILE ARCHIVED ON 05:07:04 Jan 07, 2020 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:05:43 Feb 20, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 1102.91 (3)
  PetaboxLoader3.datanode: 6151.982 (4)
  RedisCDXSource: 0.871
  exclusion.robots.policy: 0.346
  exclusion.robots: 0.361
  CDXLines.iter: 26.699 (3)
  captures_list: 1134.319
  esindex: 0.016
  PetaboxLoader3.resolve: 37.9
  load_resource: 5104.017
*/
