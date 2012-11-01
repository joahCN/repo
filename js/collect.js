/*
TODO: wrap text node to be in control.OR wrap mouse selected text . the last is batter?
 */

HT =new(function(){
   var isIE = Boolean(document.all);
   this.createBar = function (options){
       var BAR_ID = "jk_collect";
       var BG_ID = "jk_collect_panel_bg";
       var PANEL_ID = "jk_collect_panel";
       var BAR_ELEMENT_NAME = "jk_collect_name";
       if(document.getElementById(BAR_ID)){
            return;
       }
       var barDiv = document.createElement("div");
       barDiv.setAttribute("id",BAR_ID);
       barDiv.setAttribute("name",BAR_ELEMENT_NAME);
       barDiv.style.position = "fixed";
       barDiv.style.top = "0px";
       barDiv.style.left = "0px";
       barDiv.style.width = "100%";
       barDiv.style.height = "36px";
       barDiv.style.zIndex = "9999";
       barDiv.style.background = "#8FB333";
       document.body.appendChild(barDiv);
       var clsOption = {
           name : BAR_ELEMENT_NAME,
           onClick : function(){
               cleanScreen();
           }
       };
       var clsEle = createCloseMenu(clsOption);
       barDiv.appendChild(clsEle);
       var saveOption = {
           name : BAR_ELEMENT_NAME,
           onClick : function(){
               createCollectionPanel({elements : EVENTS.storage ,bgId : BG_ID ,panelId : PANEL_ID });
           }
       };
       var saveEle = createSaveMenu(saveOption);
       barDiv.appendChild(saveEle);

       var EVENTS = new (events);
       var EXTEND = new (extend);
       var SEQUENCE = SEQUENCE || new (sequenceUtil);
       //add mouse event to elements

       EXTEND.extendElement(document.body.getElementsByTagName('*'));

       function createCloseMenu (options){
           var position = options.position || "absolute";
           var name = options.name;
           var width = options.width || "50px";
           var height = options.height || "36px";
           var onclick = options.onClick || function (){};
           var clsDiv = document.createElement("div");
           clsDiv.style.position = position;
           clsDiv.style.width = width;
           clsDiv.style.height = height;
           clsDiv.style.lineHeight = height;
//           clsDiv.style.top = "6px";
           clsDiv.style.right = "28px";
           clsDiv.style.cursor = "pointer";
           clsDiv.style.zIndex = "1000";
           if(isIE){
               clsDiv.attachEvent("onClick", onclick);
           }
           else{
               clsDiv.addEventListener('click', onclick, false);
           }
           clsDiv.setAttribute("name",name);
           clsDiv.innerHTML = "close";
           return clsDiv;
       }

       function createSaveMenu(options){
           var position = options.position || "relative";
           var name = options.name;
           var width = options.width || "100%";
           var height = options.height || "36px";
           var onclick = options.onClick || function (){};
           var btDiv = document.createElement("div");
           btDiv.style.position = position;
           btDiv.style.width = width;
           btDiv.style.height = height;
           btDiv.setAttribute("name",name);
           var bt = document.createElement("button");
           bt.setAttribute("name","gather");
           bt.setAttribute("value","gather");
           bt.setAttribute("type","button");
           bt.style.margin = "0 auto";
           bt.style.display = "block";
           bt.style.height = "36px";
           if(isIE){
               bt.attachEvent("onClick", onclick);
           }
           else{
               bt.addEventListener('click', onclick, false);
           }
           bt.innerText = "gather";
           bt.setAttribute("name",name);
           btDiv.appendChild(bt);

           return btDiv;
       }

       function createCollectionPanel(options){
           if(document.getElementById("BG_ID")){
               return ;
           }
           var elements = options.elements;
           var BG_ID = options.bgId;
           var PANEL_ID = options.panelId;
           var _scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
           var _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

           var bgObj = document.createElement("div");
           bgObj.id = BG_ID;
           bgObj.style.width = _scrollWidth + "px";
           bgObj.style.height = _scrollHeight + "px";
           bgObj.style.top = "0px";
           bgObj.style.left = "0px";
           bgObj.style.background = "#33393C";
           bgObj.style.filter = "alpha(opacity=10)";
           bgObj.style.opacity = "0.20";
           document.body.appendChild(bgObj);

           var newDiv = document.createElement("div");
           newDiv.id = PANEL_ID;
           newDiv.style.position = "absolute";
           newDiv.style.zIndex = "9999";
           var newDivWidth = 400;
           var newDivHeight = 200;
           newDiv.style.width = newDivWidth + "px";
           newDiv.style.height = newDivHeight + "px";
           newDiv.style.top = (document.body.scrollTop + document.body.clientHeight / 2 - newDivHeight / 2) + "px";
           newDiv.style.left = (document.body.scrollLeft + document.body.clientWidth / 2 - newDivWidth / 2) + "px";
           newDiv.style.background = "#EFEFEF";
           newDiv.style.border = "1px solid #860001";
           newDiv.style.padding = "5px";
           var nodes = [];
           for(var ele in elements){
               var tg = elements[ele].target;
               if(tg.tagName === "IMG"){
                   nodes[nodes.length] = tg;
               }
               else{
                   nodes[nodes.length] = createTextNode(tg.innerText);
               }
           }

           for(var i = 0, l = nodes.length; i < l; i++){
               newDiv.appendChild(nodes[i]);
           }
           document.body.appendChild(newDiv);

           function createTextNode(txt){
               var pEle = document.createElement("p");
               pEle.innerText = txt;
               return pEle;
           }

       }

       function createShadeLayer(){
           var _scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
           var _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

           var bgObj = document.createElement("div");
           bgObj.id = BG_ID;
           bgObj.style.width = _scrollWidth + "px";
           bgObj.style.height = _scrollHeight + "px";
           bgObj.style.top = "0px";
           bgObj.style.left = "0px";
           bgObj.style.background = "#33393C";
           bgObj.style.filter = "alpha(opacity=10)";
           bgObj.style.opacity = "0.20";
           document.body.appendChild(bgObj);
       }

       function createConfirmPanel(options){

           createShadeLayer();
           var panelContent = "<div style='width: 200px;height: 100px;z-index: 3000;position: absolute;left: ${left};top:${top};background-color: #008000;'>" +
               "<button id='collection_continue' type='button' style='padding-right: 10px;'>continue</button> " +
               "<button id='collection_submit' type='button' style='padding-right: 10px;'>submit</button> " +
               "<button id='collection_cancel' type='button'>cancel</button>" +
               "</div>";

           var left = options.left;
           var top = options.top;
           var onContinue = options.onContinue;
           var onSubmit = options.onSubmit;
           var onCancel = options.onCancel;
           var id = options.id || "collect_confirm_panel";

           panelContent = panelContent.replace("${left}",left+"px");
           panelContent = panelContent.replace("${top}",top+"px");

           var panel = document.createElement("div");
           panel.id = id;
           panel.innerHTML = panelContent;
           document.body.appendChild(panel);

           EVENTS.addEvent(document.getElementById("collection_continue"),"click",onContinue);
           EVENTS.addEvent(document.getElementById("collection_submit"),"click",onSubmit);
           EVENTS.addEvent(document.getElementById("collection_cancel"),"click",cancel);

           function cancel(){
               onCancel();
               var ele = document.getElementById(id);
               ele.parentNode.removeChild(ele);
               document.body.removeChild(document.getElementById(BG_ID));
           }


       }

       function cleanScreen(){
           var storage = EVENTS.storage;
//           for(var ele in storage){
//               var element = storage[ele];
//               element.target.style.border = element.style || "";
//           }
           storage = {};
           EXTEND.cleanElement();
           document.body.removeChild(barDiv);
           document.body.removeChild(document.getElementById(BG_ID));
           document.body.removeChild(document.getElementById(PANEL_ID));

       }

       //initial screen elements ,add additional event listener to all the elements
       function extend(){
           var self = this;
           var extendObj = {
               mouseover :  EVENTS.mouseOver,
               mouseout :   EVENTS.mouseOut,
               click : EVENTS.click,
               mouseup : EVENTS.mouseup
           }
           var extendedEles;
           self.extendElement =  function (elements) {
               for(var i = 0, l = elements.length;i < l;i++){
//                   EVENTS.addEvent(elements[i],"mouseover",extendObj.mouseover);
//                   EVENTS.addEvent(elements[i],"mouseout",extendObj.mouseout);
//                   EVENTS.addEvent(elements[i],"click",extendObj.click);
                   EVENTS.addEvent(elements[i],"mouseup",extendObj.mouseup);
               }
               extendedEles = elements;
               modifyError();
           }
           self.cleanElement = function (elements){
               var cleanElements =  elements || extendedEles;
               for(var i = 0, l = cleanElements.length;i < l;i++){
//                   EVENTS.removeEvent(cleanElements[i],"mouseover",extendObj.mouseover);
//                   EVENTS.removeEvent(cleanElements[i],"mouseout",extendObj.mouseout);
//                   EVENTS.removeEvent(cleanElements[i],"click",extendObj.click);
                   EVENTS.removeEvent(cleanElements[i],"mouseup",extendObj.mouseup);
               }
               EVENTS.storage = {};
           }
           function modifyError(){
               var elements = document.getElementsByName(BAR_ELEMENT_NAME);
               self.cleanElement(elements);
           }
           return self;
       }

       //event object
       function events (){
           var self = this;
           self.storage = {};
           var eventObj = {
               click : "onclick",
               mousemove : "onmousemove",
               mouseover : "onmouseover",
               mouseout : "onmouseout",
               mouseup : "onmouseup"
           };
           self.addEvent = function (obj,e,fun){
               /*judge weather browser support such extend, if not iterator all elements and attach event*/
               if(isIE){
                   obj.attachEvent(eventObj[e], fun);
               }
               else{
                   obj.addEventListener(e, fun, false);
               }
           }
           self.removeEvent = function (obj,e,fun){
               if(isIE){
                   obj.detachEvent(eventObj[e], fun);
               }
               else{
                   obj.removeEventListener(e, fun, false);
               }
           }

           var oldEle;
           var oldStyle;
           var MOUSE_OVER_STYLE = "1px solid black";
           self.mouseOver = function (){
               var event = arguments[0] || window.event;
               var target = event.target || event.srcElement;
               oldStyle = target.style.border;
               oldEle = target;
               if(oldStyle !== SELECT_STYLE){
                   target.style.border = MOUSE_OVER_STYLE;
               }
               preventBubble(event);
           }
           self.mouseOut = function (){
               if(oldEle){
                   var currentStyle = oldEle.style.border;
                   if(currentStyle !== SELECT_STYLE){
                       oldEle.style.border = oldStyle || "";
                   }
                   preventBubble(event);

               }
           }
           var SELECT_STYLE = "1px solid rgb(115, 236, 19)";
           self.click = function (){
               var event = arguments[0] || window.event;
               var target = event.target || event.srcElement;
               var sequence;
               if(target.tagName === "IMG"){
                   sequence = SEQUENCE.hex_md5(target.outerHTML);
               }else{
                   sequence = SEQUENCE.hex_md5(target.innerText);
               }
               if(self.storage.hasOwnProperty(sequence)){
                   target.style.border = self.storage[sequence].style || "";
                   oldStyle = target.style.border;
                   delete  self.storage[sequence];
               }
               else{
                   self.storage[sequence] = {target:target , style:oldStyle};
                   target.style.border = SELECT_STYLE;
               }
               preventBubble(event);

           }

           self.mouseup = function(){
               var event = arguments[0] || window.event;
//               var target = event.target || event.srcElement;
//               select text
               var selectedText = GetSelectionText();

               var md5Id = SEQUENCE.hex_md5(selectedText);

               if(selectedText === "" || self.storage[md5Id]){
                   preventBubble(event);
                   return ;
               }

               var st = createSpanNodeTEXT(selectedText,md5Id);
               self.storage[md5Id] = st;

               var options = {
                   left : event.clientX,
                   top : event.clientY,
                   onContinue : function (){
                       alert("continue");
                   },
                   onSubmit : function(){
                       alert("submit");
                   },
                   onCancel : function(){
//                       alert("cancel")
                   }
               }

               createConfirmPanel(options);

               preventBubble(event);
           }
           function createSpanNode(txt){
               var spanEle = document.createElement("span");
               spanEle.innerHTML = txt;
               return spanEle;
           }

           function createSpanNodeTEXT(txt, id){
               var id = id || "";
               return "<span style='border:1px solid red ' id='"+id+"'>"+txt+"</span>";
           }

           function GetSelectionText() {
               if (window.getSelection){//chrome,firefox,opera
                   return window.getSelection().toString();
               }
               else if (document.selection&& document.selection.createRange) {//IE特有的
                   return document.selection.createRange().text;
               }
               return '';
           }

           function preventBubble(event){
               if(isIE){
                   event.cancelBubble = true;
               }
               else{
                   event.stopPropagation();
               }
           }

           return  self;
       }
       //create unique sequence
       function sequenceUtil() {
           var self = this;
           var hexcase = 0;
           var chrsz   = 8;
           self.hex_md5 = function (s){
               return binl2hex(core_md5(str2binl(s), s.length * chrsz));
           }

           function core_md5(x, len)
           {
               /* append padding */
               x[len >> 5] |= 0x80 << ((len) % 32);
               x[(((len + 64) >>> 9) << 4) + 14] = len;

               var a =  1732584193;
               var b = -271733879;
               var c = -1732584194;
               var d =  271733878;

               for(var i = 0; i < x.length; i += 16)
               {
                   var olda = a;
                   var oldb = b;
                   var oldc = c;
                   var oldd = d;

                   a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
                   d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
                   c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
                   b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
                   a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
                   d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
                   c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
                   b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
                   a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
                   d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
                   c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
                   b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
                   a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
                   d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
                   c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
                   b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

                   a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
                   d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
                   c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
                   b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
                   a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
                   d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
                   c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
                   b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
                   a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
                   d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
                   c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
                   b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
                   a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
                   d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
                   c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
                   b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

                   a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
                   d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
                   c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
                   b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
                   a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
                   d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
                   c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
                   b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
                   a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
                   d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
                   c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
                   b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
                   a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
                   d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
                   c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
                   b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

                   a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
                   d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
                   c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
                   b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
                   a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
                   d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
                   c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
                   b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
                   a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
                   d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
                   c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
                   b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
                   a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
                   d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
                   c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
                   b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

                   a = safe_add(a, olda);
                   b = safe_add(b, oldb);
                   c = safe_add(c, oldc);
                   d = safe_add(d, oldd);
               }
               return Array(a, b, c, d);

           }

           function md5_cmn(q, a, b, x, s, t)
           {
               return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
           }
           function md5_ff(a, b, c, d, x, s, t)
           {
               return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
           }
           function md5_gg(a, b, c, d, x, s, t)
           {
               return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
           }
           function md5_hh(a, b, c, d, x, s, t)
           {
               return md5_cmn(b ^ c ^ d, a, b, x, s, t);
           }
           function md5_ii(a, b, c, d, x, s, t)
           {
               return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
           }

           function safe_add(x, y)
           {
               var lsw = (x & 0xFFFF) + (y & 0xFFFF);
               var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
               return (msw << 16) | (lsw & 0xFFFF);
           }

           function bit_rol(num, cnt)
           {
               return (num << cnt) | (num >>> (32 - cnt));
           }

           function str2binl(str)
           {
               var bin = Array();
               var mask = (1 << chrsz) - 1;
               for(var i = 0; i < str.length * chrsz; i += chrsz)
                   bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
               return bin;
           }

           function binl2hex(binarray)
           {
               var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
               var str = "";
               for(var i = 0; i < binarray.length * 4; i++)
               {
                   str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
                       hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
               }
               return str;
           }
           return self;
       }


   }

});


document.healthTribe = {
    shadeLayer : HT.createBar

};
HT.createBar();

