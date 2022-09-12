const syntax_colors={black:"#000000",blue:"#0000aa",lightblue:"#00aaaa",purple:"#5555ff",orange:"#aa5500",lightorange:"#aa5500",green:"#00aa00"},is_blue_keyword=e=>e==="if"||e==="for"||e==="else"||e==="return"||e==="I0"||e==="U0"||e==="I8"||e==="U8"||e==="I16"||e==="I32"||e==="F64"||e==="class"||e==="#define",is_lightblue_keyword=e=>e==="TRUE"||e==="FALSE",is_purple_keyword=e=>e==="I64"||e==="U64"||e==="U32"||e==="U16",element=(t,n)=>{const e=document.createElement("span");return e.appendChild(document.createTextNode(t)),e.style.color=n,e},lex_is_digit=e=>!isNaN(e),lex_is_alpha=e=>/^[A-Z0-9_#]$/i.test(e),is_next=(t,e,n)=>{for(;e<t.length;++e){if(t[e]===" "||t[e]==="\n")continue;return t[e]===n}return!1},jshlchl_lex=e=>{if(!e)return;let t=[];for(let n=0;n<e.length;++n){if(e[n]==="/"&&e[n+1]==="/"){let s="";for(;1;)if(s+=e[n++],e[n]==="\n"||n===e.length)break;t.push(element(s,syntax_colors.green))}if(e[n]==="\n"){for(;e[n++]==="\n";)t.push(document.createElement("br"));n--}if(e[n]===" "){let s="";for(;e[n++]===" ";)s+=" ";n--,t.push(element(s,""))}if(lex_is_digit(e[n])){let s="";for(;lex_is_digit(e[n]);)s+=e[n++];n--,t.push(element(s,syntax_colors.blue))}if(lex_is_alpha(e[n])&&!lex_is_digit(e[n])){let o="";for(;lex_is_alpha(e[n]);)o+=e[n++];let s;is_blue_keyword(o)?s=syntax_colors.blue:is_lightblue_keyword(o)?s=syntax_colors.lightblue:is_purple_keyword(o)?s=syntax_colors.purple:is_next(e,n,"(")?s=syntax_colors.black:s=syntax_colors.black,n--,t.push(element(o,s))}if(e[n]==='"'||e[n]==="'"){let s="",o=e[n];for(;e[n];){if(e[n]==="\\"&&(t.push(element(s,syntax_colors.orange)),t.push(element(e[n]+e[++n],syntax_colors.lightorange)),s="",n++,e[n]===o||n===e.length))break;if(s+=e[n++],e[n]===o||n===e.length)break}e[n]==='"'?s+='"':e[n]==="'"&&(s+="'"),t.push(element(s,syntax_colors.orange))}if(e[n]!=="\n"&&e[n]!==" "&&e[n]!=='"'&&e[n]!=="'"&&!lex_is_alpha(e[n])&&!lex_is_digit(e[n])&&e[n]){if(e[n]==="/"&&e[n+1]==="/"){n--;continue}t.push(element(e[n],"black"))}}return t},set_scroll=()=>{const e=document.getElementById("stdin"),t=document.getElementById("hl");t.scrollLeft=e.scrollLeft,t.scrollTop=e.scrollTop};export const highlight=n=>{const t=document.getElementById("hl");t.innerHTML="";const e=jshlchl_lex(n);if(!e)return;for(let n=0;n<e.length;++n)t.appendChild(e[n]);e[e.length-1].isEqualNode(document.createElement("br"))&&t.appendChild(document.createElement("br")),set_scroll()}