(function(){var t;t=jQuery,t(document).on("click","#list input.toggle",function(){return t("#list [name='bulk_ids[]']").prop("checked",t(this).is(":checked"))}),t(document).on("click",".pjax",function(e){if(e.which>1||e.metaKey||e.ctrlKey);else{if(t.support.pjax)return e.preventDefault(),t.pjax({container:t(this).data("pjax-container")||"[data-pjax-container]",url:t(this).data("href")||t(this).attr("href"),timeout:2e3});if(t(this).data("href"))return window.location=t(this).data("href")}}),t(document).on("submit",".pjax-form",function(e){return t.support.pjax?(e.preventDefault(),t.pjax({container:t(this).data("pjax-container")||"[data-pjax-container]",url:this.action+(-1!==this.action.indexOf("?")?"&":"?")+t(this).serialize(),timeout:2e3})):void 0}),t(document).on("pjax:start",function(){return t("#loading").show()}).on("pjax:end",function(){return t("#loading").hide()}),t(document).on("click","[data-target]",function(){if(!t(this).hasClass("disabled")){if(t(this).has("i.icon-chevron-down").length)return t(this).removeClass("active").children("i").toggleClass("icon-chevron-down icon-chevron-right"),t(t(this).data("target")).select(":visible").hide("slow");if(t(this).has("i.icon-chevron-right").length)return t(this).addClass("active").children("i").toggleClass("icon-chevron-down icon-chevron-right"),t(t(this).data("target")).select(":hidden").show("slow")}}),t(document).on("click",".form-horizontal legend",function(){return t(this).has("i.icon-chevron-down").length?(t(this).siblings(".control-group:visible").hide("slow"),t(this).children("i").toggleClass("icon-chevron-down icon-chevron-right")):t(this).has("i.icon-chevron-right").length?(t(this).siblings(".control-group:hidden").show("slow"),t(this).children("i").toggleClass("icon-chevron-down icon-chevron-right")):void 0}),t(document).on("click","form .tab-content .tab-pane a.remove_nested_one_fields",function(){return t(this).children('input[type="hidden"]').val(t(this).hasClass("active")).siblings("i").toggleClass("icon-check icon-trash")}),t(document).ready(function(){return t(document).trigger("rails_admin.dom_ready")}),t(document).on("pjax:end",function(){return t(document).trigger("rails_admin.dom_ready")}),t(document).on("rails_admin.dom_ready",function(){return t(".animate-width-to").each(function(){var e,n;return e=t(this).data("animate-length"),n=t(this).data("animate-width-to"),t(this).animate({width:n},e,"easeOutQuad")}),t(".form-horizontal legend").has("i.icon-chevron-right").each(function(){return t(this).siblings(".control-group").hide()}),t(".table").tooltip({selector:"th[rel=tooltip]"})}),t(document).on("click","#fields_to_export label input#check_all",function(){var e;return e=t("#fields_to_export label input"),t("#fields_to_export label input#check_all").is(":checked")?t(e).prop("checked",!0):t(e).prop("checked",!1)})}).call(this);