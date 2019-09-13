parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"wr89":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isEmptyObject=(t=>0===Object.entries(t).length&&t.constructor===Object),exports.wrapModulo=((t,e)=>(t%e+e)%e),exports.lineWrap=((t,e)=>{const r=t.match(/\S+/g)||[];if(0===r.length)return"";let n=[],l="";return r.forEach((t,o)=>{""===l&&t.length<=e?l=t:`${l} ${t}`.length<=e?l=`${l} ${t}`:t.length>e?(l.length>=e-1?(n.push(l),l=""):l+=" ",t.split("").forEach(t=>{`${l}${t}`.length<e?l+=t:(n.push(`${l}-`),l=t)})):(n.push(l),l=t),o===r.length-1&&n.push(l)}),(n=n.map(t=>{if(t.length===e)return t;let r="";for(let n=0;n<e-t.length;n++)r+=" ";return t+r})).join("\n")}),exports.expandString=((t,e,r)=>{const n=t.split("\n");let l="";return n.forEach(t=>{let n="";t.split("").forEach(t=>{for(let r=0;r<e;r++)n+=t}),n+="\n";for(let e=0;e<r;e++)l+=n}),l.replace(/\n$/,"")});
},{}],"kxG4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("../underdash");class i{constructor(){}static initialize(t){if(!t||e.isEmptyObject(t))throw new Error("No dependencies supplied");i.dependencies=t}static resolve(e){if(!i.dependencies)throw new Error("Dependency container is not initialized");return i.dependencies[e]}}exports.default=i;
},{"../underdash":"wr89"}],"meEq":[function(require,module,exports) {
"use strict";var E;Object.defineProperty(exports,"__esModule",{value:!0}),function(E){E[E.T=1]="T",E[E.L=2]="L",E[E.L_INVERTED=3]="L_INVERTED",E[E.S=4]="S",E[E.S_INVERTED=5]="S_INVERTED",E[E.I=6]="I",E[E.BLOCK=7]="BLOCK",E[E.EMPTY_SPACE=8]="EMPTY_SPACE"}(E=exports.GAME_PIECE_TYPE||(exports.GAME_PIECE_TYPE={}));
},{}],"9+vi":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const E=require("../gamePiece/enums");exports.WEB_ENV="WEB_ENV",exports.TERMINAL_ENV="TERMINAL_ENV",exports.TEST_ENV="TEST_ENV",exports.COLUMNS=10,exports.ROWS=16;const _={[exports.WEB_ENV]:{[E.GAME_PIECE_TYPE.L]:"😁",[E.GAME_PIECE_TYPE.L_INVERTED]:"😫",[E.GAME_PIECE_TYPE.S]:"😜",[E.GAME_PIECE_TYPE.S_INVERTED]:"🤗",[E.GAME_PIECE_TYPE.T]:"😮",[E.GAME_PIECE_TYPE.I]:"😎",[E.GAME_PIECE_TYPE.BLOCK]:"😅",[E.GAME_PIECE_TYPE.EMPTY_SPACE]:"〰️"},[exports.TERMINAL_ENV]:{[E.GAME_PIECE_TYPE.L]:"l",[E.GAME_PIECE_TYPE.L_INVERTED]:"l",[E.GAME_PIECE_TYPE.S]:"s",[E.GAME_PIECE_TYPE.S_INVERTED]:"s",[E.GAME_PIECE_TYPE.T]:"t",[E.GAME_PIECE_TYPE.I]:"i",[E.GAME_PIECE_TYPE.BLOCK]:"o",[E.GAME_PIECE_TYPE.EMPTY_SPACE]:" "},[exports.TEST_ENV]:{[E.GAME_PIECE_TYPE.L]:"l",[E.GAME_PIECE_TYPE.L_INVERTED]:"l",[E.GAME_PIECE_TYPE.S]:"s",[E.GAME_PIECE_TYPE.S_INVERTED]:"s",[E.GAME_PIECE_TYPE.T]:"t",[E.GAME_PIECE_TYPE.I]:"i",[E.GAME_PIECE_TYPE.BLOCK]:"o",[E.GAME_PIECE_TYPE.EMPTY_SPACE]:" "}};exports.createGameCharSelector=(E=>{const P=_[E];return E=>P[E]});
},{"../gamePiece/enums":"meEq"}],"89Hz":[function(require,module,exports) {
"use strict";var t;Object.defineProperty(exports,"__esModule",{value:!0}),function(t){t[t.StartToGame=0]="StartToGame",t[t.StartToOptions=1]="StartToOptions",t[t.OptionsToStart=2]="OptionsToStart"}(t=exports.SceneTransition||(exports.SceneTransition={}));
},{}],"RLDF":[function(require,module,exports) {
"use strict";var t;Object.defineProperty(exports,"__esModule",{value:!0}),function(t){t.InputUp="InputUp",t.InputDown="InputDown",t.InputLeft="InputLeft",t.InputRight="InputRight",t.Confirmation="Confirmation",t.Pause="Pause",t.Rotate="Rotate",t.RotateReverse="RotateReverse",t.GravityDrop="GravityDrop",t.QuickDrop="QuickDrop",t.StartGravityInterval="StartGravityInterval",t.IncreaseGravityInterval="IncreaseGravityInterval",t.ClearGravityInterval="ClearGravityInterval",t.Restart="Restart",t.ToggleGhostPieceOption="ToggleGhostPieceOption"}(t=exports.EventType||(exports.EventType={}));
},{}],"1tBu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("../underdash"),t=require("../eventDispatcher/enums"),n=(n,r)=>{let a=0;const s=()=>{let e="";return r.forEach((t,n)=>{e+=n===a?`-> ${t.text}\n`:`   ${t.text}\n`}),{renderString:e,nextPieceString:"",score:0,level:1,clearedLines:0}};return n(s()),{handleEvent:o=>{switch(o.type){case t.EventType.InputDown:a=e.wrapModulo(a+1,r.length),n(s());break;case t.EventType.InputUp:a=e.wrapModulo(a-1,r.length),n(s());break;case t.EventType.Confirmation:case t.EventType.Rotate:case t.EventType.RotateReverse:r[a].action()}}}};exports.default=n;
},{"../underdash":"wr89","../eventDispatcher/enums":"RLDF"}],"BjO5":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("../../game/enums"),n=e(require("../menuTemplate")),r=e(require("../../dependencyContainer")),a=({changeScene:e})=>{const a=r.default.resolve("render"),o=[{text:"Start game",action:()=>e(t.SceneTransition.StartToGame)},{text:"Options",action:()=>e(t.SceneTransition.StartToOptions)}];return n.default(a,o)};exports.default=a;
},{"../../game/enums":"89Hz","../menuTemplate":"1tBu","../../dependencyContainer":"kxG4"}],"8QOs":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("../eventDispatcher/enums"),t=(t,i,r)=>{let n,s;const c=t=>{const a=i.find(e=>e.transition===t);if(!a)throw new Error("No scene initializer found");n=a.initializer({changeScene:c,dispatch:r.dispatch}),s&&s(),s=r.register(n),r.dispatch({type:e.EventType.StartGravityInterval})};return n=t({changeScene:c,dispatch:r.dispatch}),s=r.register(n),{changeScene:c}};exports.default=t;
},{"../eventDispatcher/enums":"RLDF"}],"kWAF":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const E=require("./enums"),x=e(require("../dependencyContainer"));exports.getMinMaxCoordinates=(e=>{let E=Number.MAX_SAFE_INTEGER,x=Number.MAX_SAFE_INTEGER,y=Number.MIN_SAFE_INTEGER,t=Number.MIN_SAFE_INTEGER;return e.forEach(e=>{const{x:r,y:o}=e;r>y&&(y=r),r<E&&(E=r),o>t&&(t=o),o<x&&(x=o)}),[{x:E,y:x},{x:y,y:t}]}),exports.isLongestSideEven=(e=>{const[E,x]=exports.getMinMaxCoordinates(e),y=x.x-E.x+1,t=x.y-E.y+1;return(y>t?y:t)%2==0});const y=[];exports.getNextPieceType=(()=>{const e=[E.GAME_PIECE_TYPE.T,E.GAME_PIECE_TYPE.L,E.GAME_PIECE_TYPE.L_INVERTED,E.GAME_PIECE_TYPE.S,E.GAME_PIECE_TYPE.S_INVERTED,E.GAME_PIECE_TYPE.I,E.GAME_PIECE_TYPE.BLOCK];0===y.length&&e.forEach(e=>{y.push(e)});const x=Math.floor(Math.random()*y.length);return y.splice(x,1)[0]}),exports.getPieceChar=(e=>{const y=x.default.resolve("gameCharSelector");switch(e){case E.GAME_PIECE_TYPE.L:case E.GAME_PIECE_TYPE.L_INVERTED:case E.GAME_PIECE_TYPE.S:case E.GAME_PIECE_TYPE.S_INVERTED:case E.GAME_PIECE_TYPE.T:case E.GAME_PIECE_TYPE.I:case E.GAME_PIECE_TYPE.BLOCK:return y(e);default:throw new Error(`Unknown piece type - ${e}`)}}),exports.getInitialCoordinates=((e,x)=>{switch(e){case E.GAME_PIECE_TYPE.T:return[{x:x.x,y:x.y-1},{x:x.x-1,y:x.y},{x:x.x,y:x.y},{x:x.x+1,y:x.y}];case E.GAME_PIECE_TYPE.L:return[{x:x.x+1,y:x.y-1},{x:x.x-1,y:x.y},{x:x.x,y:x.y},{x:x.x+1,y:x.y}];case E.GAME_PIECE_TYPE.L_INVERTED:return[{x:x.x-1,y:x.y-1},{x:x.x-1,y:x.y},{x:x.x,y:x.y},{x:x.x+1,y:x.y}];case E.GAME_PIECE_TYPE.S:return[{x:x.x,y:x.y-1},{x:x.x+1,y:x.y-1},{x:x.x-1,y:x.y},{x:x.x,y:x.y}];case E.GAME_PIECE_TYPE.S_INVERTED:return[{x:x.x-1,y:x.y-1},{x:x.x,y:x.y-1},{x:x.x,y:x.y},{x:x.x+1,y:x.y}];case E.GAME_PIECE_TYPE.I:return[{x:x.x-1,y:x.y},{x:x.x,y:x.y},{x:x.x+1,y:x.y},{x:x.x+2,y:x.y}];case E.GAME_PIECE_TYPE.BLOCK:return[{x:x.x,y:x.y},{x:x.x+1,y:x.y},{x:x.x,y:x.y+1},{x:x.x+1,y:x.y+1}];default:throw new Error(`Unknown piece type - ${e}`)}}),exports.transpose=((e,E,x,y)=>({coordinates:e.map(e=>({x:e.x+x,y:e.y+y})),origo:{x:E.x+x,y:E.y+y}})),exports.getNextRotation=(e=>{const{coordinates:E,origo:x,reverse:y}=e;let t={x:x.x,y:x.y};const r=exports.isLongestSideEven(E);let o=E.map(e=>{const E=e.x<=t.x&&e.y<=t.y;return!r||E?{x:e.x,y:e.y}:{x:e.x>t.x?e.x+1:e.x,y:e.y>t.y?e.y+1:e.y}});return r&&(t={x:t.x+1,y:t.y+1}),o=o.map(e=>{const E=e.x-t.x,x=e.y-t.y;let r,o;return y?(r=x,o=-1*E):(r=-1*x,o=E),{x:t.x+r,y:t.y+o}}),r&&(t={x:t.x-1,y:t.y-1},o=o.map(e=>e.x<=t.x&&e.y<=t.y?e:{x:e.x>t.x?e.x-1:e.x,y:e.y>t.y?e.y-1:e.y})),{coordinates:o,origo:t}});
},{"./enums":"meEq","../dependencyContainer":"kxG4"}],"OK5E":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./utils"),t=require("../eventDispatcher/enums"),o=require("../config");exports.createGamePiece=(r=>{const n={x:2,y:2};let s=e.getInitialCoordinates(r,n),i={x:n.x,y:n.y};const[a]=e.getMinMaxCoordinates(s),c=e.transpose(s,i,o.COLUMNS/2-i.x-1,0-a.y);s=c.coordinates,i=c.origo;let u=e.getPieceChar(r),g=0;return{getNextState:o=>{const r=(o=>{switch(o){case t.EventType.InputLeft:return e.transpose(s,i,-1,0);case t.EventType.InputRight:return e.transpose(s,i,1,0);case t.EventType.InputUp:return e.transpose(s,i,0,-1);case t.EventType.InputDown:return e.transpose(s,i,0,1);case t.EventType.Rotate:{const t=e.getNextRotation({coordinates:s,origo:i,reverse:!1});return{coordinates:t.coordinates,origo:t.origo}}case t.EventType.RotateReverse:{const t=e.getNextRotation({coordinates:s,origo:i,reverse:!0});return{coordinates:t.coordinates,origo:t.origo}}case t.EventType.GravityDrop:return e.transpose(s,i,0,1);default:return{coordinates:s,origo:i}}})(o);return Object.assign({},r,{moves:g})},setState:e=>{null!==e.coordinates&&void 0!==e.coordinates&&(s=e.coordinates),null!==e.origo&&void 0!==e.origo&&(i=e.origo),null!==e.moves&&void 0!==e.moves&&(g=e.moves)},getState:()=>{return{coordinates:s,origo:i,moves:g}},getChar:()=>u,getPreview:()=>e.getInitialCoordinates(r,{x:0,y:0}),getType:()=>r}});
},{"./utils":"kWAF","../eventDispatcher/enums":"RLDF","../config":"9+vi"}],"xpO1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=e=>1e3*Math.pow(.8-.007*(e-1),e-1);class t{constructor(){this._level=1,this._gravityInterval=e(this._level)}increaseLevel(){this._level<15&&(this._level+=1,this._gravityInterval=e(this._level))}setLevel(t){t>=1&&t<=15&&(this._level=t,this._gravityInterval=e(this._level))}getLevel(){return this._level}getGravityInterval(){return this._gravityInterval}}exports.default=t;
},{}],"oHCv":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("../../gamePiece/index"),r=require("../../gamePiece/enums"),a=require("../../gamePiece/utils"),o=require("../../config"),n=e(require("../../dependencyContainer")),i=require("../../eventDispatcher/enums"),s=e(require("./levelController"));var c;!function(e){e.Active="Active",e.GameOver="GameOver",e.Paused="Paused"}(c=exports.GameState||(exports.GameState={})),exports.initializeGameState=(({changeScene:e,dispatch:v})=>{const l=n.default.resolve("gameCharSelector"),p=n.default.resolve("render"),y=l(r.GAME_PIECE_TYPE.EMPTY_SPACE);let f,S,d,E,u,g,m,h;function T(e){let t=!0;for(let r=0;r<e.length;r++){const a=e[r];if(a.x<0||a.x>=o.COLUMNS||a.y<0||a.y>=o.ROWS){t=!1;break}m[a.y][a.x]!==y&&(t=!1)}return t}function b(e){let t=!0;do{let r=e.getNextState(i.EventType.GravityDrop);if(void 0===r.moves)throw new Error("Expected to find property 'moves' on nextState");(t=T(r.coordinates))&&e.setState(Object.assign({},r,{moves:r.moves+1}))}while(t)}const x=()=>{p((()=>{const e=[];for(let a=0;a<o.ROWS;a++){e[a]=[];for(let t=0;t<o.COLUMNS;t++)e[a][t]=m[a][t]}f.getState().coordinates.forEach(t=>{e[t.y][t.x]=f.getChar()});let t="";for(let a=0;a<o.ROWS;a++){for(let r=0;r<o.COLUMNS;r++)t+=e[a][r];a<o.ROWS-1&&(t+="\n")}const r=d.getPreview();let n=[];r.forEach(e=>{n[e.y]||(n[e.y]=[]),n[e.y][e.x]=d.getChar()});let i="";const[s,c]=a.getMinMaxCoordinates(r);for(let a=s.y;a<=c.y;a++){for(let e=s.x;e<=c.x;e++)i+=n[a][e]||y;a<c.y&&(i+="\n")}return{renderString:t,nextPieceString:i,score:g,level:h.getLevel(),clearedLines:u,gameBoard:e,nextPiece:d,ghostPiece:S}})(),E)};let G;const P=()=>{(()=>{h=new s.default;const e=a.getNextPieceType(),r=t.createGamePiece(e),n=t.createGamePiece(a.getNextPieceType());f=r,S=t.createGamePiece(e),d=n,E=c.Active,u=0,g=0,m=[];for(let t=0;t<o.ROWS;t++){m[t]=[];for(let e=0;e<o.COLUMNS;e++)m[t][e]=y}b(S)})(),x(),v({type:i.EventType.StartGravityInterval})};return P(),{handleEvent:e=>{switch(e.type){case i.EventType.Pause:E===c.Active?(E=c.Paused,v({type:i.EventType.ClearGravityInterval})):E===c.Paused&&(E=c.Active,v({type:i.EventType.StartGravityInterval}));break;case i.EventType.Restart:if(E!==c.GameOver)break;P();break;case i.EventType.StartGravityInterval:(e=>{G&&clearInterval(G),G=setInterval(()=>{v({type:i.EventType.GravityDrop}),x()},e)})(h.getGravityInterval());break;case i.EventType.ClearGravityInterval:null!==G&&clearInterval(G);break;case i.EventType.InputUp:break;case i.EventType.InputLeft:case i.EventType.InputRight:case i.EventType.Rotate:case i.EventType.RotateReverse:{if(E!==c.Active)break;let t=f.getNextState(e.type);if(T(t.coordinates)){f.setState(t),S.setState(t),b(S);break}if(e.type===i.EventType.Rotate||e.type===i.EventType.RotateReverse){const e=[1,2,-1,-2];for(const o of e){const e=a.transpose(t.coordinates,t.origo,o,0);if(T(e.coordinates)){f.setState(e),S.setState(e),b(S);break}}const r=[1];for(const o of r){const e=a.transpose(t.coordinates,t.origo,0,o);if(T(e.coordinates)){f.setState(e),S.setState(e),b(S);break}}}break}case i.EventType.QuickDrop:if(E!==c.Active)break;let r;v({type:i.EventType.StartGravityInterval});let n=!0;do{if(void 0===(r=f.getNextState(i.EventType.GravityDrop)).moves)throw new Error("Expected to find property 'moves' on nextState");(n=T(r.coordinates))&&f.setState(Object.assign({},r,{moves:r.moves+1}))}while(n);v({type:i.EventType.GravityDrop});break;case i.EventType.InputDown:case i.EventType.GravityDrop:{if(E!==c.Active)break;v({type:i.EventType.StartGravityInterval});const r=f.getNextState(e.type);if(void 0===r.moves)throw new Error("Expected to find property 'moves' on nextState");if(T(r.coordinates))f.setState(Object.assign({},r,{moves:r.moves+1}));else{if(0===r.moves){v({type:i.EventType.ClearGravityInterval}),E=c.GameOver;break}f.getState().coordinates.forEach(e=>{m[e.y][e.x]=f.getChar()});const e=[];for(let t=o.ROWS-1;t>=0;t--){let r=!0;for(let e=0;e<o.COLUMNS;e++)if(m[t][e]===y){r=!1;break}r&&e.push(t)}if(e.forEach(e=>{for(let t=0;t<o.COLUMNS;t++)m[e][t]=y}),e.length>0)for(let t=e[0]-1;t>=0;t--)for(let r=0;r<o.COLUMNS;r++)if(m[t][r]!==y){const a=m[t][r],o=e.filter(e=>e>t).length;let n=t,i=!0;for(;i&&n<t+o;)m[n+1][r]===y?n++:i=!1;t!==n&&(m[t][r]=y,m[n][r]=a)}let n=0;const s=h.getLevel();switch(e.length){case 0:break;case 1:n+=100*s;break;case 2:n+=300*s;break;case 3:n+=500*s;break;case 4:n+=800*s;break;default:throw new Error("We shouldn't be able to clear more than 4 lines in one play..")}g+=n,e.forEach(()=>{u+=1}),h.setLevel(Math.floor(u/15)+1),v({type:i.EventType.StartGravityInterval});const l=t.createGamePiece(a.getNextPieceType());b(S=t.createGamePiece(d.getType())),f=d,d=l}break}}x()}}});
},{"../../gamePiece/index":"OK5E","../../gamePiece/enums":"meEq","../../gamePiece/utils":"kWAF","../../config":"9+vi","../../dependencyContainer":"kxG4","../../eventDispatcher/enums":"RLDF","./levelController":"xpO1"}],"noH9":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("../../game/enums"),r=e(require("../menuTemplate")),n=e(require("../../dependencyContainer")),s=require("../../eventDispatcher/enums"),i=e=>{const{changeScene:i,dispatch:o}=e,a=n.default.resolve("render"),u=[{text:"Ghost pieces - (TODO)",action:()=>o({type:s.EventType.ToggleGhostPieceOption})},{text:"Back to start screen",action:()=>i(t.SceneTransition.OptionsToStart)}];return r.default(a,u)};exports.default=i;
},{"../../game/enums":"89Hz","../menuTemplate":"1tBu","../../dependencyContainer":"kxG4","../../eventDispatcher/enums":"RLDF"}],"nnU0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=()=>{let e=[],t=0;return{register:r=>{const s=t;return t+=1,e.push(Object.assign({},r,{id:s})),()=>(t=>{e=e.filter(e=>e.id!==t)})(s)},dispatch:t=>{e.forEach(e=>{e.handleEvent(t)})}}};exports.default=e;
},{}],"Ztbj":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=e(require("../dependencyContainer")),i=e(require("../scenes/menu")),n=e(require("../scenes/sceneController")),r=require("./enums"),s=require("../scenes/gameState"),a=e(require("../scenes/options")),u=e(require("../eventDispatcher")),o=()=>{const e=t.default.resolve("setupInputListeners"),o=[{transition:r.SceneTransition.StartToGame,initializer:s.initializeGameState},{transition:r.SceneTransition.StartToOptions,initializer:a.default},{transition:r.SceneTransition.OptionsToStart,initializer:i.default}],l=u.default();n.default(i.default,o,l);e({handleInput:e=>{l.dispatch({type:e})}})};exports.default=o;
},{"../dependencyContainer":"kxG4","../scenes/menu":"BjO5","../scenes/sceneController":"8QOs","./enums":"89Hz","../scenes/gameState":"oHCv","../scenes/options":"noH9","../eventDispatcher":"nnU0"}],"ZQK0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class t{constructor(t,e,i,r=1){if(this.withinColorRange=(t=>(t.forEach(t=>{if(t<0||t>255)return!1}),!0)),this.withinAlphaRange=(t=>t>=0&&t<=1),!this.withinColorRange([t,e,i])||!this.withinAlphaRange(r))throw new Error("Invalid values supplied to Color constructor");this.red=t,this.green=e,this.blue=i,this.alpha=r}toString(){return`rgb(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`}setAlpha(e){if(!this.withinAlphaRange(e))throw new Error("Invalid alpha value supplied to setAlpha method");return new t(this.red,this.green,this.blue,e)}}exports.default=t;
},{}],"yJmQ":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("../gamePiece/enums"),n=require("../gamePiece/utils"),l=require("../config"),r=require("../scenes/gameState"),o=e(require("./color")),i=require("../underdash"),a=new o.default(171,0,235),s=new o.default(252,158,0),c=new o.default(45,0,248),f=new o.default(0,254,0),u=new o.default(255,0,0),d=new o.default(0,185,224),E=new o.default(237,247,0),g=()=>{const e=l.createGameCharSelector(l.WEB_ENV),g=e(t.GAME_PIECE_TYPE.EMPTY_SPACE),S=e(t.GAME_PIECE_TYPE.T),w=e(t.GAME_PIECE_TYPE.L),P=e(t.GAME_PIECE_TYPE.L_INVERTED),_=e(t.GAME_PIECE_TYPE.S),h=e(t.GAME_PIECE_TYPE.S_INVERTED),p=e(t.GAME_PIECE_TYPE.I),m=e(t.GAME_PIECE_TYPE.BLOCK),x=e=>{switch(e){case S:return a;case w:return s;case P:return c;case _:return f;case h:return u;case p:return d;case m:return E;default:return new o.default(255,255,255)}},C=document.getElementById("canvas");if(!C)throw new Error("Could not find canvas element");const T=C.getContext("2d");if(!T)throw new Error("Could not find context element");const y=window.innerHeight-50,G=y/2;T.canvas.height=y,T.canvas.width=G;const M=G/l.COLUMNS,I=M,R=y-l.ROWS*I;return(e,t)=>{const{renderString:l,gameBoard:a,nextPiece:s,score:c,level:f,ghostPiece:u,clearedLines:d}=e;if(!l)throw new Error("Render string was not supplied to render function");T.clearRect(0,0,G,y),T.fillStyle=new o.default(255,255,255,.25).toString(),T.fillRect(0,R,G,y-R);const E=e=>{const t=i.lineWrap(e,20).split("\n"),n=M,l=2*I,r=M,a=2*I+I*t.length;T.fillStyle=new o.default(0,0,0,.5).toString(),T.fillRect(n,R+l,G-2*n,a),T.fillStyle=new o.default(255,255,255).toString(),T.font="20px monospace";const s=I;for(let o=0;o<t.length;o++)T.fillText(t[o],n+r,R+l+20+r+o*s)};(()=>{if(s){const e=M/2,t=I/2,l=G-5*e,r=0;T.fillStyle=new o.default(0,0,0).toString(),T.font="18px monospace",T.fillText("Next:",l-60,r+20);const i=x(s.getChar());T.fillStyle=i.toString();const{coordinates:a,origo:c}=s.getState(),[f]=n.getMinMaxCoordinates(a);n.transpose(a,c,-1*f.x,0).coordinates.forEach(n=>{const{x:o,y:i}=n;T.fillRect(l+e*o,r+t*i,e,t)})}})(),(()=>{if(u){const e=x(u.getChar()).setAlpha(.15);T.fillStyle=e.toString(),u.getState().coordinates.forEach(({x:e,y:t})=>{T.fillRect(0+e*M,R+t*I,M,I)})}})(),(()=>{if(a)for(let e=0;e<a.length;e++)for(let t=0;t<a[0].length;t++){const n=a[e][t];if(n!==g){const l=x(n);T.fillStyle=l.toString(),T.fillRect(0+t*M,R+e*I,M,I),T.strokeStyle=new o.default(0,0,0).toString(),T.lineWidth=1,T.strokeRect(0+t*M,R+e*I,M,I)}}})(),t&&(()=>{const e=new o.default(0,0,0).toString();T.fillStyle=e,T.font="18px monospace",T.fillText(`Level: ${f}`,0,20),T.fillText(`Score: ${c}`,0,45),T.fillText(`Cleared lines: ${d}`,0,70)})(),t||(()=>{const e=new o.default(0,0,0).toString();T.fillStyle=e,T.font="18px monospace";const t=l.split("\n");T.font="16px monospace";const n=I;for(let l=0;l<t.length;l++)T.fillText(t[l],M,R+2*I+l*n)})(),t&&t===r.GameState.GameOver&&E('Game over! Press "r" to play again.'),t&&t===r.GameState.Paused&&E('Game paused. Press "q" to exit to menu.')}};exports.default=g;
},{"../gamePiece/enums":"meEq","../gamePiece/utils":"kWAF","../config":"9+vi","../scenes/gameState":"oHCv","./color":"ZQK0","../underdash":"wr89"}],"YSSF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("../eventDispatcher/enums"),t=t=>{const{handleInput:n}=t;let o=[];function p(){const t=o[0],p=o[o.length-1],u=function(t,n,o){return 0===t&&0===n?o>window.innerWidth/2?e.EventType.Rotate:e.EventType.RotateReverse:Math.abs(t)>Math.abs(n)?t>0?e.EventType.InputRight:e.EventType.InputLeft:n>200?(console.log(n),e.EventType.QuickDrop):n>0?e.EventType.InputDown:e.EventType.InputUp}(p.pageX-t.pageX,p.pageY-t.pageY,p.clientX);n(u),o=[]}const u=document.getElementById("wrapper");if(!u)throw new Error("Element did not exist");u.addEventListener("touchstart",function(e){o.push(e.touches[0])},!1),u.addEventListener("touchend",p,!1),u.addEventListener("touchcancel",function(){p()},!1),u.addEventListener("touchmove",function(e){o.push(e.touches[0])},!1),u.addEventListener("keydown",function(t){const o={37:e.EventType.InputLeft,39:e.EventType.InputRight,38:e.EventType.InputUp,40:e.EventType.InputDown,69:e.EventType.Rotate,81:e.EventType.RotateReverse,87:e.EventType.QuickDrop,32:e.EventType.GravityDrop,13:e.EventType.Confirmation,82:e.EventType.Restart,27:e.EventType.Pause};void 0!==o[t.keyCode]&&n(o[t.keyCode])},!1)};exports.default=t;
},{"../eventDispatcher/enums":"RLDF"}],"g5I+":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(n){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(n){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"FsWR":[function(require,module,exports) {
var process = require("process");
var e=require("process");Object.defineProperty(exports,"__esModule",{value:!0});const t=require("../underdash"),n=require("../scenes/gameState"),r=require("../config"),i=require("../gamePiece/enums"),o=4,s=2,l=r.createGameCharSelector(r.TERMINAL_ENV),a=l(i.GAME_PIECE_TYPE.EMPTY_SPACE),c=(r,i)=>{const{renderString:o,nextPieceString:s,score:l,level:c,gameBoard:g,ghostPiece:p}=r;if(!o)throw new Error("No render string supplied");let u=o;if(g){let e=[];p&&(e=p.getState().coordinates),u="";for(let t=0;t<g.length;t++){for(let n=0;n<g[0].length;n++){let r=g[t][n];for(const i of e)i.x===n&&i.y===t&&r===a&&(r=".");u+=r}t<g.length-1&&(u+="\n")}u=t.expandString(u,4,2)}const d=(e,n)=>{const r=e.split("\n");let i=0;r.forEach(e=>{e.length>i&&(i=e.length)});const o=i/2-10;let s=t.lineWrap(n,16);const l=s.split("\n").length;s=s.split("\n").join("");const a=l+2+2;return r.map((e,t)=>{if(10===t||t===10+a-1)return e.split("").map((e,t)=>t===o||t===o+20-1?"+":t>=o&&t<o+20?"-":e).join("");const n=t<12||t>=10+a-1-1;return t>10&&t<10+a-1?e.split("").map((e,t)=>{if(t===o||t===o+20-1)return"|";if(t>=o&&t<o+20){const e=t<o+1+1||t>=o+20-1-1;if(n||e||0===s.length)return" ";const r=s[0];return s=s.substring(1),r}return e}).join(""):e}).join("\n")};let h=u;i&&i===n.GameState.GameOver&&(h=d(h,"Game over! Press 'r' to play again.")),i&&i===n.GameState.Paused&&(h=d(h,"Game paused"));let f="";f+=`level: ${c}\n`,f+=`score: ${l}\n`,f+="next:\n",f+=t.expandString(((e,n)=>{const r=e.split("\n").length;return r>=n?e:`${e}${t.expandString("\n",n-r,1)}`})(`${s}\n`,3),4,2),f+="{{replace-me}}\n";const m=(f+=h).split("\n");let S=0;m.forEach(e=>{e.length>S&&(S=e.length)});let x="";x+="+",x+=t.expandString("-",S,1),x+="+\n",m.forEach(e=>{const n=e.length;let r="";n<S&&(r=t.expandString(" ",S-n,1)),e.includes("{{replace-me}}")?x+=`+${t.expandString("-",S,1)}+\n`:x+=`|${e}${r}|\n`}),x+="+",x+=t.expandString("-",S,1),x+="+\n",e.stdout.write("[2J"),e.stdout.write(x)};exports.default=c;
},{"../underdash":"wr89","../scenes/gameState":"oHCv","../config":"9+vi","../gamePiece/enums":"meEq","process":"g5I+"}],"sC8V":[function(require,module,exports) {

},{}],"APRZ":[function(require,module,exports) {
var process = require("process");
var e=require("process");Object.defineProperty(exports,"__esModule",{value:!0});const t=require("readline"),n=require("../eventDispatcher/enums"),r=r=>{const{handleInput:s}=r;if(t.emitKeypressEvents(e.stdin),void 0===e||void 0===e.stdin||void 0===e.stdin.setRawMode)throw new Error("Unexpected undefined object");e.stdin.setRawMode(!0),e.stdin.on("keypress",(t,r)=>{if(r.ctrl&&"c"===r.name)e.exit();else switch(r.name){case"left":s(n.EventType.InputLeft);break;case"right":s(n.EventType.InputRight);break;case"up":s(n.EventType.InputUp);break;case"down":s(n.EventType.InputDown);break;case"q":s(n.EventType.RotateReverse);break;case"e":s(n.EventType.Rotate);break;case"r":s(n.EventType.Restart);break;case"w":s(n.EventType.QuickDrop);break;case"return":s(n.EventType.Confirmation);break;case"escape":s(n.EventType.Pause)}})};exports.default=r;
},{"readline":"sC8V","../eventDispatcher/enums":"RLDF","process":"g5I+"}],"9B6d":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,r,t,n){return new(t||(t=Promise))(function(i,a){function u(e){try{l(n.next(e))}catch(r){a(r)}}function o(e){try{l(n.throw(e))}catch(r){a(r)}}function l(e){e.done?i(e.value):new t(function(r){r(e.value)}).then(u,o)}l((n=n.apply(e,r||[])).next())})},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},t=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r};Object.defineProperty(exports,"__esModule",{value:!0});const n=r(require("./dependencyContainer")),i=require("./config"),a=r(require("./game"));exports.main=(r=>e(this,void 0,void 0,function*(){let e;switch(r){case i.WEB_ENV:e={render:(yield Promise.resolve().then(()=>t(require("./render/web")))).default(),setupInputListeners:(yield Promise.resolve().then(()=>t(require("./input/web")))).default,gameCharSelector:i.createGameCharSelector(i.WEB_ENV)};break;case i.TERMINAL_ENV:e={render:(yield Promise.resolve().then(()=>t(require("./render/terminal")))).default,setupInputListeners:(yield Promise.resolve().then(()=>t(require("./input/terminal")))).default,gameCharSelector:i.createGameCharSelector(i.TERMINAL_ENV)};break;default:throw new Error(`Unknown game environment - ${r}`)}n.default.initialize(e),a.default()}));
},{"./dependencyContainer":"kxG4","./config":"9+vi","./game":"Ztbj","./render/web":"yJmQ","./input/web":"YSSF","./render/terminal":"FsWR","./input/terminal":"APRZ"}],"65v2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("./index"),r=require("./config");e.main(r.WEB_ENV);
},{"./index":"9B6d","./config":"9+vi"}]},{},["65v2"], null)
//# sourceMappingURL=/web.75029dc3.js.map