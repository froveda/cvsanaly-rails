(function(t){t.ajaxPrefilter(function(t){return t.iframe?"iframe":void 0}),t.ajaxTransport("iframe",function(e){function n(){t(l).each(function(){this.remove()}),t(c).each(function(){this.disabled=!1}),i.attr("action",r||"").attr("target",s||"").attr("enctype",a||""),o.attr("src","javascript:false;").remove()}var i=null,o=null,r=null,s=null,a=null,l=[],c=[],u=t(e.files).filter(":file:enabled");return e.dataTypes.shift(),u.length?(u.each(function(){null!==i&&this.form!==i&&jQuery.error("All file fields must belong to the same form"),i=this.form}),i=t(i),r=i.attr("action"),s=i.attr("target"),a=i.attr("enctype"),i.find(":input:not(:submit)").each(function(){!this.disabled&&("file"!=this.type||0>u.index(this))&&(this.disabled=!0,c.push(this))}),"string"==typeof e.data&&e.data.length>0&&jQuery.error("data must not be serialized"),t.each(e.data||{},function(e,n){t.isPlainObject(n)&&(e=n.name,n=n.value),l.push(t("<input type='hidden'>").attr("name",e).attr("value",n).appendTo(i))}),l.push(t("<input type='hidden' name='X-Requested-With'>").attr("value","IFrame").appendTo(i)),accepts=e.dataTypes[0]&&e.accepts[e.dataTypes[0]]?e.accepts[e.dataTypes[0]]+("*"!==e.dataTypes[0]?", */*; q=0.01":""):e.accepts["*"],l.push(t("<input type='hidden' name='X-Http-Accept'>").attr("value",accepts).appendTo(i)),{send:function(r,s){o=t("<iframe src='javascript:false;' name='iframe-"+t.now()+"' style='display:none'></iframe>"),o.bind("load",function(){o.unbind("load").bind("load",function(){var t=this.contentWindow?this.contentWindow.document:this.contentDocument?this.contentDocument:this.document,e=t.documentElement?t.documentElement:t.body,i=e.getElementsByTagName("textarea")[0],o=i?i.getAttribute("data-type"):null,r=i?parseInt(i.getAttribute("response-code")):200,a="OK",l={text:o?i.value:e?e.innerHTML:null},c="Content-Type: "+(o||"text/html");s(r,a,l,c),setTimeout(n,50)}),i.attr("action",e.url).attr("target",o.attr("name")).attr("enctype","multipart/form-data").get(0).submit()}),o.insertAfter(i)},abort:function(){null!==o&&(o.unbind("load").attr("src","javascript:false;"),n())}}):void 0})})(jQuery),function(t){var n;t.remotipart=n={setup:function(e){e.one("ajax:beforeSend.remotipart",function(i,o,r){return delete r.beforeSend,r.iframe=!0,r.files=t(t.rails.fileInputSelector,e),r.data=e.serializeArray(),r.processData=!1,void 0===r.dataType&&(r.dataType="script *"),r.data.push({name:"remotipart_submitted",value:!0}),t.rails.fire(e,"ajax:remotipartSubmit",[o,r])&&t.rails.ajax(r),n.teardown(e),!1}).data("remotipartSubmitted",!0)},teardown:function(t){t.unbind("ajax:beforeSend.remotipart").removeData("remotipartSubmitted")}},t(document).on("ajax:aborted:file","form",function(){var i=t(this);return n.setup(i),!t.support.submitBubbles&&"1.7">t().jquery&&t.rails.callFormSubmitBindings(i)===!1?t.rails.stopEverything(e):(t.rails.handleRemote(i),!1)})}(jQuery);