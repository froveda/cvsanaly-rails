/*
 * jQuery UI Timepicker
 *
 * Copyright 2010-2013, Francois Gelinas
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://fgelinas.com/code/timepicker
 *
 * Depends:
 *	jquery.ui.core.js
 *  jquery.ui.position.js (only if position settngs are used)
 *
 * Change version 0.1.0 - moved the t-rex up here
 *
                                                  ____
       ___                                      .-~. /_"-._
      `-._~-.                                  / /_ "~o\  :Y
          \  \                                / : \~x.  ` ')
           ]  Y                              /  |  Y< ~-.__j
          /   !                        _.--~T : l  l<  /.-~
         /   /                 ____.--~ .   ` l /~\ \<|Y
        /   /             .-~~"        /| .    ',-~\ \L|
       /   /             /     .^   \ Y~Y \.^>/l_   "--'
      /   Y           .-"(  .  l__  j_j l_/ /~_.-~    .
     Y    l          /    \  )    ~~~." / `/"~ / \.__/l_
     |     \     _.-"      ~-{__     l  :  l._Z~-.___.--~
     |      ~---~           /   ~~"---\_  ' __[>
     l  .                _.^   ___     _>-y~
      \  \     .      .-~   .-~   ~>--"  /
       \  ~---"            /     ./  _.-'
        "-.,_____.,_  _.--~\     _.-~
                    ~~     (   _}       -Row
                           `. ~(
                             )  \
                            /,`--'~\--'~\
                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                             ->T-Rex<-
*/
(function($){function Timepicker(){this.debug=!0,this._curInst=null,this._disabledInputs=[],this._timepickerShowing=!1,this._inDialog=!1,this._dialogClass="ui-timepicker-dialog",this._mainDivId="ui-timepicker-div",this._inlineClass="ui-timepicker-inline",this._currentClass="ui-timepicker-current",this._dayOverClass="ui-timepicker-days-cell-over",this.regional=[],this.regional[""]={hourText:"Hour",minuteText:"Minute",amPmText:["AM","PM"],closeButtonText:"Done",nowButtonText:"Now",deselectButtonText:"Deselect"},this._defaults={showOn:"focus",button:null,showAnim:"fadeIn",showOptions:{},appendText:"",beforeShow:null,onSelect:null,onClose:null,timeSeparator:":",periodSeparator:" ",showPeriod:!1,showPeriodLabels:!0,showLeadingZero:!0,showMinutesLeadingZero:!0,altField:"",defaultTime:"now",myPosition:"left top",atPosition:"left bottom",onHourShow:null,onMinuteShow:null,hours:{starts:0,ends:23},minutes:{starts:0,ends:55,interval:5},rows:4,showHours:!0,showMinutes:!0,optionalMinutes:!1,showCloseButton:!1,showNowButton:!1,showDeselectButton:!1},$.extend(this._defaults,this.regional[""]),this.tpDiv=$('<div id="'+this._mainDivId+'" class="ui-timepicker ui-widget ui-helper-clearfix ui-corner-all " style="display: none"></div>')}function extendRemove(t,e){$.extend(t,e);for(var n in e)(null==e[n]||void 0==e[n])&&(t[n]=e[n]);return t}$.extend($.ui,{timepicker:{version:"0.3.2"}});var PROP_NAME="timepicker",tpuuid=(new Date).getTime();$.extend(Timepicker.prototype,{markerClassName:"hasTimepicker",log:function(){this.debug&&console.log.apply("",arguments)},_widgetTimepicker:function(){return this.tpDiv},setDefaults:function(t){return extendRemove(this._defaults,t||{}),this},_attachTimepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("time:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline="div"==nodeName||"span"==nodeName;target.id||(this.uuid+=1,target.id="tp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),"input"==nodeName?(this._connectTimepicker(target,inst),this._setTimeFromField(inst)):inline&&this._inlineTimepicker(target,inst)},_newInst:function(t,e){var n=t[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:n,input:t,inline:e,tpDiv:e?$('<div class="'+this._inlineClass+' ui-timepicker ui-widget  ui-helper-clearfix"></div>'):this.tpDiv}},_connectTimepicker:function(t,e){var n=$(t);e.append=$([]),e.trigger=$([]),n.hasClass(this.markerClassName)||(this._attachments(n,e),n.addClass(this.markerClassName).keydown(this._doKeyDown).keyup(this._doKeyUp).bind("setData.timepicker",function(t,n,i){e.settings[n]=i}).bind("getData.timepicker",function(t,n){return this._get(e,n)}),$.data(t,PROP_NAME,e))},_doKeyDown:function(t){var e=$.timepicker._getInst(t.target),n=!0;if(e._keyEvent=!0,$.timepicker._timepickerShowing)switch(t.keyCode){case 9:$.timepicker._hideTimepicker(),n=!1;break;case 13:return $.timepicker._updateSelectedValue(e),$.timepicker._hideTimepicker(),!1;case 27:$.timepicker._hideTimepicker();break;default:n=!1}else 36==t.keyCode&&t.ctrlKey?$.timepicker._showTimepicker(this):n=!1;n&&(t.preventDefault(),t.stopPropagation())},_doKeyUp:function(t){var e=$.timepicker._getInst(t.target);$.timepicker._setTimeFromField(e),$.timepicker._updateTimepicker(e)},_attachments:function(t,e){var n=this._get(e,"appendText"),i=this._get(e,"isRTL");e.append&&e.append.remove(),n&&(e.append=$('<span class="'+this._appendClass+'">'+n+"</span>"),t[i?"before":"after"](e.append)),t.unbind("focus.timepicker",this._showTimepicker),t.unbind("click.timepicker",this._adjustZIndex),e.trigger&&e.trigger.remove();var o=this._get(e,"showOn");if(("focus"==o||"both"==o)&&(t.bind("focus.timepicker",this._showTimepicker),t.bind("click.timepicker",this._adjustZIndex)),"button"==o||"both"==o){var r=this._get(e,"button");$(r).bind("click.timepicker",function(){return $.timepicker._timepickerShowing&&$.timepicker._lastInput==t[0]?$.timepicker._hideTimepicker():e.input.is(":disabled")||$.timepicker._showTimepicker(t[0]),!1})}},_inlineTimepicker:function(t,e){var n=$(t);n.hasClass(this.markerClassName)||(n.addClass(this.markerClassName).append(e.tpDiv).bind("setData.timepicker",function(t,n,i){e.settings[n]=i}).bind("getData.timepicker",function(t,n){return this._get(e,n)}),$.data(t,PROP_NAME,e),this._setTimeFromField(e),this._updateTimepicker(e),e.tpDiv.show())},_adjustZIndex:function(t){t=t.target||t;var e=$.timepicker._getInst(t);e.tpDiv.css("zIndex",$.timepicker._getZIndex(t)+1)},_showTimepicker:function(t){if(t=t.target||t,"input"!=t.nodeName.toLowerCase()&&(t=$("input",t.parentNode)[0]),!$.timepicker._isDisabledTimepicker(t)&&$.timepicker._lastInput!=t){$.timepicker._hideTimepicker();var e=$.timepicker._getInst(t);$.timepicker._curInst&&$.timepicker._curInst!=e&&$.timepicker._curInst.tpDiv.stop(!0,!0);var n=$.timepicker._get(e,"beforeShow");extendRemove(e.settings,n?n.apply(t,[t,e]):{}),e.lastVal=null,$.timepicker._lastInput=t,$.timepicker._setTimeFromField(e),$.timepicker._inDialog&&(t.value=""),$.timepicker._pos||($.timepicker._pos=$.timepicker._findPos(t),$.timepicker._pos[1]+=t.offsetHeight);var i=!1;$(t).parents().each(function(){return i|="fixed"==$(this).css("position"),!i});var o={left:$.timepicker._pos[0],top:$.timepicker._pos[1]};if($.timepicker._pos=null,e.tpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.timepicker._updateTimepicker(e),!e.inline&&"object"==typeof $.ui.position){e.tpDiv.position({of:e.input,my:$.timepicker._get(e,"myPosition"),at:$.timepicker._get(e,"atPosition"),collision:"flip"});var o=e.tpDiv.offset();$.timepicker._pos=[o.top,o.left]}if(e._hoursClicked=!1,e._minutesClicked=!1,o=$.timepicker._checkOffset(e,o,i),e.tpDiv.css({position:$.timepicker._inDialog&&$.blockUI?"static":i?"fixed":"absolute",display:"none",left:o.left+"px",top:o.top+"px"}),!e.inline){var r=$.timepicker._get(e,"showAnim"),s=$.timepicker._get(e,"duration"),a=function(){$.timepicker._timepickerShowing=!0;var t=$.timepicker._getBorders(e.tpDiv);e.tpDiv.find("iframe.ui-timepicker-cover").css({left:-t[0],top:-t[1],width:e.tpDiv.outerWidth(),height:e.tpDiv.outerHeight()})};$.timepicker._adjustZIndex(t),$.effects&&$.effects[r]?e.tpDiv.show(r,$.timepicker._get(e,"showOptions"),s,a):e.tpDiv.show(r?s:null,a),r&&s||a(),e.input.is(":visible")&&!e.input.is(":disabled")&&e.input.focus(),$.timepicker._curInst=e}}},_getZIndex:function(t){for(var e,n,i=$(t),o=0;i.length&&i[0]!==document;)e=i.css("position"),("absolute"===e||"relative"===e||"fixed"===e)&&(n=parseInt(i.css("zIndex"),10),isNaN(n)||0===n||n>o&&(o=n)),i=i.parent();return o},_refreshTimepicker:function(t){var e=this._getInst(t);e&&this._updateTimepicker(e)},_updateTimepicker:function(t){t.tpDiv.empty().append(this._generateHTML(t)),this._rebindDialogEvents(t)},_rebindDialogEvents:function(t){var e=$.timepicker._getBorders(t.tpDiv),n=this;t.tpDiv.find("iframe.ui-timepicker-cover").css({left:-e[0],top:-e[1],width:t.tpDiv.outerWidth(),height:t.tpDiv.outerHeight()}).end().find(".ui-timepicker-minute-cell").unbind().bind("click",{fromDoubleClick:!1},$.proxy($.timepicker.selectMinutes,this)).bind("dblclick",{fromDoubleClick:!0},$.proxy($.timepicker.selectMinutes,this)).end().find(".ui-timepicker-hour-cell").unbind().bind("click",{fromDoubleClick:!1},$.proxy($.timepicker.selectHours,this)).bind("dblclick",{fromDoubleClick:!0},$.proxy($.timepicker.selectHours,this)).end().find(".ui-timepicker td a").unbind().bind("mouseout",function(){$(this).removeClass("ui-state-hover"),-1!=this.className.indexOf("ui-timepicker-prev")&&$(this).removeClass("ui-timepicker-prev-hover"),-1!=this.className.indexOf("ui-timepicker-next")&&$(this).removeClass("ui-timepicker-next-hover")}).bind("mouseover",function(){n._isDisabledTimepicker(t.inline?t.tpDiv.parent()[0]:t.input[0])||($(this).parents(".ui-timepicker-calendar").find("a").removeClass("ui-state-hover"),$(this).addClass("ui-state-hover"),-1!=this.className.indexOf("ui-timepicker-prev")&&$(this).addClass("ui-timepicker-prev-hover"),-1!=this.className.indexOf("ui-timepicker-next")&&$(this).addClass("ui-timepicker-next-hover"))}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end().find(".ui-timepicker-now").bind("click",function(t){$.timepicker.selectNow(t)}).end().find(".ui-timepicker-deselect").bind("click",function(t){$.timepicker.deselectTime(t)}).end().find(".ui-timepicker-close").bind("click",function(){$.timepicker._hideTimepicker()}).end()},_generateHTML:function(t){var e,n,i,o,r=1==this._get(t,"showPeriod"),s=1==this._get(t,"showPeriodLabels"),a=1==this._get(t,"showLeadingZero"),l=1==this._get(t,"showHours"),c=1==this._get(t,"showMinutes"),u=this._get(t,"amPmText"),h=this._get(t,"rows"),p=0,d=0,f=0,m=0,g=0,v=0,y=Array(),b=this._get(t,"hours"),w=null,k=0,x=this._get(t,"hourText"),C=this._get(t,"showCloseButton"),T=this._get(t,"closeButtonText"),$=this._get(t,"showNowButton"),N=this._get(t,"nowButtonText"),E=this._get(t,"showDeselectButton"),S=this._get(t,"deselectButtonText"),D=C||$||E;for(e=b.starts;b.ends>=e;e++)y.push(e);if(w=Math.ceil(y.length/h),s){for(k=0;y.length>k;k++)12>y[k]?f++:m++;k=0,p=Math.floor(f/y.length*h),d=Math.floor(m/y.length*h),h!=p+d&&(f&&(!m||!p||d&&f/p>=m/d)?p++:d++),g=Math.min(p,1),v=p+1,w=0==p?Math.ceil(m/d):0==d?Math.ceil(f/p):Math.ceil(Math.max(f/p,m/d))}if(o='<table class="ui-timepicker-table ui-widget-content ui-corner-all"><tr>',l){for(o+='<td class="ui-timepicker-hours"><div class="ui-timepicker-title ui-widget-header ui-helper-clearfix ui-corner-all">'+x+"</div>"+'<table class="ui-timepicker">',n=1;h>=n;n++){for(o+="<tr>",n==g&&s&&(o+='<th rowspan="'+p.toString()+'" class="periods" scope="row">'+u[0]+"</th>"),n==v&&s&&(o+='<th rowspan="'+d.toString()+'" class="periods" scope="row">'+u[1]+"</th>"),i=1;w>=i;i++)s&&v>n&&y[k]>=12?o+=this._generateHTMLHourCell(t,void 0,r,a):(o+=this._generateHTMLHourCell(t,y[k],r,a),k++);o+="</tr>"}o+="</table></td>"}if(c&&(o+='<td class="ui-timepicker-minutes">',o+=this._generateHTMLMinutes(t),o+="</td>"),o+="</tr>",D){var _='<tr><td colspan="3"><div class="ui-timepicker-buttonpane ui-widget-content">';$&&(_+='<button type="button" class="ui-timepicker-now ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+t.id.replace(/\\\\/g,"\\")+'" >'+N+"</button>"),E&&(_+='<button type="button" class="ui-timepicker-deselect ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+t.id.replace(/\\\\/g,"\\")+'" >'+S+"</button>"),C&&(_+='<button type="button" class="ui-timepicker-close ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+t.id.replace(/\\\\/g,"\\")+'" >'+T+"</button>"),o+=_+"</div></td></tr>"}return o+="</table>"},_updateMinuteDisplay:function(t){var e=this._generateHTMLMinutes(t);t.tpDiv.find("td.ui-timepicker-minutes").html(e),this._rebindDialogEvents(t)},_generateHTMLMinutes:function(t){var e,n,i="",o=this._get(t,"rows"),r=Array(),s=this._get(t,"minutes"),a=null,l=0,c=1==this._get(t,"showMinutesLeadingZero"),u=this._get(t,"onMinuteShow"),h=this._get(t,"minuteText");for(s.starts||(s.starts=0),s.ends||(s.ends=59),e=s.starts;s.ends>=e;e+=s.interval)r.push(e);if(a=Math.round(r.length/o+.49),u&&0==u.apply(t.input?t.input[0]:null,[t.hours,t.minutes]))for(l=0;r.length>l;l+=1)if(e=r[l],u.apply(t.input?t.input[0]:null,[t.hours,e])){t.minutes=e;break}for(i+='<div class="ui-timepicker-title ui-widget-header ui-helper-clearfix ui-corner-all">'+h+"</div>"+'<table class="ui-timepicker">',l=0,n=1;o>=n;n++){for(i+="<tr>";n*a>l;){var e=r[l],p="";void 0!==e&&(p=10>e&&c?"0"+e.toString():e.toString()),i+=this._generateHTMLMinuteCell(t,e,p),l++}i+="</tr>"}return i+="</table>"},_generateHTMLHourCell:function(t,e,n,i){var o=e;e>12&&n&&(o=e-12),0==o&&n&&(o=12),10>o&&i&&(o="0"+o);var r="",s=!0,a=this._get(t,"onHourShow");return void 0==e?r='<td><span class="ui-state-default ui-state-disabled">&nbsp;</span></td>':(a&&(s=a.apply(t.input?t.input[0]:null,[e])),r=s?'<td class="ui-timepicker-hour-cell" data-timepicker-instance-id="#'+t.id.replace(/\\\\/g,"\\")+'" data-hour="'+e.toString()+'">'+'<a class="ui-state-default '+(e==t.hours?"ui-state-active":"")+'">'+o.toString()+"</a></td>":'<td><span class="ui-state-default ui-state-disabled '+(e==t.hours?" ui-state-active ":" ")+'">'+o.toString()+"</span>"+"</td>")},_generateHTMLMinuteCell:function(t,e,n){var i="",o=!0,r=this._get(t,"onMinuteShow");return r&&(o=r.apply(t.input?t.input[0]:null,[t.hours,e])),i=void 0==e?'<td><span class="ui-state-default ui-state-disabled">&nbsp;</span></td>':o?'<td class="ui-timepicker-minute-cell" data-timepicker-instance-id="#'+t.id.replace(/\\\\/g,"\\")+'" data-minute="'+e.toString()+'" >'+'<a class="ui-state-default '+(e==t.minutes?"ui-state-active":"")+'" >'+n+"</a></td>":'<td><span class="ui-state-default ui-state-disabled" >'+n+"</span>"+"</td>"},_destroyTimepicker:function(t){var e=$(t),n=$.data(t,PROP_NAME);if(e.hasClass(this.markerClassName)){var i=t.nodeName.toLowerCase();$.removeData(t,PROP_NAME),"input"==i?(n.append.remove(),n.trigger.remove(),e.removeClass(this.markerClassName).unbind("focus.timepicker",this._showTimepicker).unbind("click.timepicker",this._adjustZIndex)):("div"==i||"span"==i)&&e.removeClass(this.markerClassName).empty()}},_enableTimepicker:function(t){var e=$(t),n=e.attr("id"),i=$.data(t,PROP_NAME);if(e.hasClass(this.markerClassName)){var o=t.nodeName.toLowerCase();if("input"==o){t.disabled=!1;var r=this._get(i,"button");$(r).removeClass("ui-state-disabled").disabled=!1,i.trigger.filter("button").each(function(){this.disabled=!1}).end()}else if("div"==o||"span"==o){var s=e.children("."+this._inlineClass);s.children().removeClass("ui-state-disabled"),s.find("button").each(function(){this.disabled=!1})}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==n?null:t})}},_disableTimepicker:function(t){var e=$(t),n=$.data(t,PROP_NAME);if(e.hasClass(this.markerClassName)){var i=t.nodeName.toLowerCase();if("input"==i){var o=this._get(n,"button");$(o).addClass("ui-state-disabled").disabled=!0,t.disabled=!0,n.trigger.filter("button").each(function(){this.disabled=!0}).end()}else if("div"==i||"span"==i){var r=e.children("."+this._inlineClass);r.children().addClass("ui-state-disabled"),r.find("button").each(function(){this.disabled=!0})}this._disabledInputs=$.map(this._disabledInputs,function(e){return e==t?null:e}),this._disabledInputs[this._disabledInputs.length]=e.attr("id")}},_isDisabledTimepicker:function(t){if(!t)return!1;for(var e=0;this._disabledInputs.length>e;e++)if(this._disabledInputs[e]==t)return!0;return!1},_checkOffset:function(t,e,n){var i=t.tpDiv.outerWidth(),o=t.tpDiv.outerHeight(),r=t.input?t.input.outerWidth():0,s=t.input?t.input.outerHeight():0,a=document.documentElement.clientWidth+$(document).scrollLeft(),l=document.documentElement.clientHeight+$(document).scrollTop();return e.left-=this._get(t,"isRTL")?i-r:0,e.left-=n&&e.left==t.input.offset().left?$(document).scrollLeft():0,e.top-=n&&e.top==t.input.offset().top+s?$(document).scrollTop():0,e.left-=Math.min(e.left,e.left+i>a&&a>i?Math.abs(e.left+i-a):0),e.top-=Math.min(e.top,e.top+o>l&&l>o?Math.abs(o+s):0),e},_findPos:function(t){for(var e=this._getInst(t),n=this._get(e,"isRTL");t&&("hidden"==t.type||1!=t.nodeType);)t=t[n?"previousSibling":"nextSibling"];var i=$(t).offset();return[i.left,i.top]},_getBorders:function(t){var e=function(t){return{thin:1,medium:2,thick:3}[t]||t};return[parseFloat(e(t.css("border-left-width"))),parseFloat(e(t.css("border-top-width")))]},_checkExternalClick:function(t){if($.timepicker._curInst){var e=$(t.target);e[0].id==$.timepicker._mainDivId||0!=e.parents("#"+$.timepicker._mainDivId).length||e.hasClass($.timepicker.markerClassName)||e.hasClass($.timepicker._triggerClass)||!$.timepicker._timepickerShowing||$.timepicker._inDialog&&$.blockUI||$.timepicker._hideTimepicker()}},_hideTimepicker:function(t){var e=this._curInst;if(e&&(!t||e==$.data(t,PROP_NAME))&&this._timepickerShowing){var n=this._get(e,"showAnim"),i=this._get(e,"duration"),o=function(){$.timepicker._tidyDialog(e),this._curInst=null};$.effects&&$.effects[n]?e.tpDiv.hide(n,$.timepicker._get(e,"showOptions"),i,o):e.tpDiv["slideDown"==n?"slideUp":"fadeIn"==n?"fadeOut":"hide"](n?i:null,o),n||o(),this._timepickerShowing=!1,this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.tpDiv))),this._inDialog=!1;var r=this._get(e,"onClose");r&&r.apply(e.input?e.input[0]:null,[e.input?e.input.val():"",e])}},_tidyDialog:function(t){t.tpDiv.removeClass(this._dialogClass).unbind(".ui-timepicker")},_getInst:function(t){try{return $.data(t,PROP_NAME)}catch(e){throw"Missing instance data for this timepicker"}},_get:function(t,e){return void 0!==t.settings[e]?t.settings[e]:this._defaults[e]},_setTimeFromField:function(t){if(t.input.val()!=t.lastVal){var e=this._get(t,"defaultTime"),n="now"==e?this._getCurrentTimeRounded(t):e;if(0==t.inline&&""!=t.input.val()&&(n=t.input.val()),n instanceof Date)t.hours=n.getHours(),t.minutes=n.getMinutes();else{var i=t.lastVal=n;if(""==n)t.hours=-1,t.minutes=-1;else{var o=this.parseTime(t,i);t.hours=o.hours,t.minutes=o.minutes}}$.timepicker._updateTimepicker(t)}},_optionTimepicker:function(t,e,n){var i=this._getInst(t);if(2==arguments.length&&"string"==typeof e)return"defaults"==e?$.extend({},$.timepicker._defaults):i?"all"==e?$.extend({},i.settings):this._get(i,e):null;var o=e||{};"string"==typeof e&&(o={},o[e]=n),i&&(this._curInst==i&&this._hideTimepicker(),extendRemove(i.settings,o),this._updateTimepicker(i))},_setTimeTimepicker:function(t,e){var n=this._getInst(t);n&&(this._setTime(n,e),this._updateTimepicker(n),this._updateAlternate(n,e))},_setTime:function(t,e,n){var i=t.hours,o=t.minutes;if(e instanceof Date)t.hours=e.getHours(),t.minutes=e.getMinutes();else{var e=this.parseTime(t,e);t.hours=e.hours,t.minutes=e.minutes}i==t.hours&&o==t.minutes||n||t.input.trigger("change"),this._updateTimepicker(t),this._updateSelectedValue(t)},_getCurrentTimeRounded:function(){var t=new Date,e=t.getMinutes(),n=5*Math.round(e/5);return t.setMinutes(n),t},parseTime:function(t,e){var n=new Object;if(n.hours=-1,n.minutes=-1,!e)return"";var i=this._get(t,"timeSeparator"),o=this._get(t,"amPmText"),r=this._get(t,"showHours"),s=this._get(t,"showMinutes"),a=this._get(t,"optionalMinutes"),l=1==this._get(t,"showPeriod"),c=e.indexOf(i);if(-1!=c?(n.hours=parseInt(e.substr(0,c),10),n.minutes=parseInt(e.substr(c+1),10)):!r||s&&!a?!r&&s&&(n.minutes=parseInt(e,10)):n.hours=parseInt(e,10),r){var u=e.toUpperCase();12>n.hours&&l&&-1!=u.indexOf(o[1].toUpperCase())&&(n.hours+=12),12==n.hours&&l&&-1!=u.indexOf(o[0].toUpperCase())&&(n.hours=0)}return n},selectNow:function(t){var e=$(t.target).attr("data-timepicker-instance-id"),n=$(e),i=this._getInst(n[0]),o=new Date;i.hours=o.getHours(),i.minutes=o.getMinutes(),this._updateSelectedValue(i),this._updateTimepicker(i),this._hideTimepicker()},deselectTime:function(t){var e=$(t.target).attr("data-timepicker-instance-id"),n=$(e),i=this._getInst(n[0]);i.hours=-1,i.minutes=-1,this._updateSelectedValue(i),this._hideTimepicker()},selectHours:function(t){var e=$(t.currentTarget),n=e.attr("data-timepicker-instance-id"),i=parseInt(e.attr("data-hour")),o=t.data.fromDoubleClick,r=$(n),s=this._getInst(r[0]),a=1==this._get(s,"showMinutes");if($.timepicker._isDisabledTimepicker(r.attr("id")))return!1;e.parents(".ui-timepicker-hours:first").find("a").removeClass("ui-state-active"),e.children("a").addClass("ui-state-active"),s.hours=i;var l=this._get(s,"onMinuteShow");return l&&this._updateMinuteDisplay(s),this._updateSelectedValue(s),s._hoursClicked=!0,(s._minutesClicked||o||0==a)&&$.timepicker._hideTimepicker(),!1},selectMinutes:function(t){var e=$(t.currentTarget),n=e.attr("data-timepicker-instance-id"),i=parseInt(e.attr("data-minute")),o=t.data.fromDoubleClick,r=$(n),s=this._getInst(r[0]),a=1==this._get(s,"showHours");return $.timepicker._isDisabledTimepicker(r.attr("id"))?!1:(e.parents(".ui-timepicker-minutes:first").find("a").removeClass("ui-state-active"),e.children("a").addClass("ui-state-active"),s.minutes=i,this._updateSelectedValue(s),s._minutesClicked=!0,s._hoursClicked||o||0==a?($.timepicker._hideTimepicker(),!1):!1)},_updateSelectedValue:function(t){var e=this._getParsedTime(t);t.input&&(t.input.val(e),t.input.trigger("change"));var n=this._get(t,"onSelect");return n&&n.apply(t.input?t.input[0]:null,[e,t]),this._updateAlternate(t,e),e},_getParsedTime:function(t){if(-1==t.hours&&-1==t.minutes)return"";(t.hours<t.hours.starts||t.hours>t.hours.ends)&&(t.hours=0),(t.minutes<t.minutes.starts||t.minutes>t.minutes.ends)&&(t.minutes=0);var e="",n=1==this._get(t,"showPeriod"),i=1==this._get(t,"showLeadingZero"),o=1==this._get(t,"showHours"),r=1==this._get(t,"showMinutes"),s=1==this._get(t,"optionalMinutes"),a=this._get(t,"amPmText"),l=t.hours?t.hours:0,c=t.minutes?t.minutes:0,u=l?l:0,h="";-1==u&&(u=0),-1==c&&(c=0),n&&(0==t.hours&&(u=12),12>t.hours?e=a[0]:(e=a[1],u>12&&(u-=12)));var p=u.toString();i&&10>u&&(p="0"+p);var d=c.toString();return 10>c&&(d="0"+d),o&&(h+=p),!o||!r||s&&0==d||(h+=this._get(t,"timeSeparator")),!r||s&&0==d||(h+=d),o&&e.length>0&&(h+=this._get(t,"periodSeparator")+e),h},_updateAlternate:function(t,e){var n=this._get(t,"altField");n&&$(n).each(function(t,n){$(n).val(e)})},_getTimeAsDateTimepicker:function(t){var e=this._getInst(t);return-1==e.hours&&-1==e.minutes?"":((e.hours<e.hours.starts||e.hours>e.hours.ends)&&(e.hours=0),(e.minutes<e.minutes.starts||e.minutes>e.minutes.ends)&&(e.minutes=0),new Date(0,0,0,e.hours,e.minutes,0))},_getTimeTimepicker:function(t){var e=this._getInst(t);return this._getParsedTime(e)},_getHourTimepicker:function(t){var e=this._getInst(t);return void 0==e?-1:e.hours},_getMinuteTimepicker:function(t){var e=this._getInst(t);return void 0==e?-1:e.minutes}}),$.fn.timepicker=function(t){$.timepicker.initialized||($(document).mousedown($.timepicker._checkExternalClick).find("body").append($.timepicker.tpDiv),$.timepicker.initialized=!0);var e=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"getTime"!=t&&"getTimeAsDate"!=t&&"getHour"!=t&&"getMinute"!=t?"option"==t&&2==arguments.length&&"string"==typeof arguments[1]?$.timepicker["_"+t+"Timepicker"].apply($.timepicker,[this[0]].concat(e)):this.each(function(){"string"==typeof t?$.timepicker["_"+t+"Timepicker"].apply($.timepicker,[this].concat(e)):$.timepicker._attachTimepicker(this,t)}):$.timepicker["_"+t+"Timepicker"].apply($.timepicker,[this[0]].concat(e))},$.timepicker=new Timepicker,$.timepicker.initialized=!1,$.timepicker.uuid=(new Date).getTime(),$.timepicker.version="0.3.2",window["TP_jQuery_"+tpuuid]=$})(jQuery);