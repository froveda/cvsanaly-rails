(function(t){var e;t.filters=e={options:{regional:{datePicker:{dateFormat:"mm/dd/yy"}}},append:function(e,n,i,o,r,s,a){var l="f["+n+"]["+a+"][v]",c="f["+n+"]["+a+"][o]";switch(i){case"boolean":var u='<select class="input-small" name="'+l+'">'+'<option value="_discard">...</option>'+'<option value="true"'+("true"==o?'selected="selected"':"")+">True</option>"+'<option value="false"'+("false"==o?'selected="selected"':"")+">False</option>"+'<option disabled="disabled">---------</option>'+"<option "+("_present"==o?'selected="selected"':"")+' value="_present">Is present</option>'+"<option "+("_blank"==o?'selected="selected"':"")+' value="_blank"  >Is blank</option>'+"</select>";break;case"date":case"datetime":case"timestamp":var u='<select class="switch-additionnal-fieldsets input-small" name="'+c+'">'+"<option "+("default"==r?'selected="selected"':"")+' data-additional-fieldset="default" value="default">Date ...</option>'+"<option "+("between"==r?'selected="selected"':"")+' data-additional-fieldset="between" value="between">Between ... and ...</option>'+"<option "+("today"==r?'selected="selected"':"")+' value="today">Today</option>'+"<option "+("yesterday"==r?'selected="selected"':"")+' value="yesterday">Yesterday</option>'+"<option "+("this_week"==r?'selected="selected"':"")+' value="this_week">This week</option>'+"<option "+("last_week"==r?'selected="selected"':"")+' value="last_week">Last week</option>'+'<option disabled="disabled">---------</option>'+"<option "+("_not_null"==r?'selected="selected"':"")+' value="_not_null">Is present</option>'+"<option "+("_null"==r?'selected="selected"':"")+' value="_null" >Is blank</option>'+"</select>",h='<input class="date additional-fieldset default input-small" style="display:'+(r&&"default"!=r?"none":"inline-block")+';" type="text" name="'+l+'[]" value="'+(o[0]||"")+'" /> '+'<input placeholder="-∞" class="date additional-fieldset between input-small" style="display:'+("between"==r?"inline-block":"none")+';" type="text" name="'+l+'[]" value="'+(o[1]||"")+'" /> '+'<input placeholder="∞" class="date additional-fieldset between input-small" style="display:'+("between"==r?"inline-block":"none")+';" type="text" name="'+l+'[]" value="'+(o[2]||"")+'" />';break;case"enum":var p=o instanceof Array?!0:!1,u='<select style="display:'+(p?"none":"inline-block")+'" '+(p?"":'name="'+l+'"')+' data-name="'+l+'" class="select-single input-small">'+'<option value="_discard">...</option>'+"<option "+("_present"==o?'selected="selected"':"")+' value="_present">Is present</option>'+"<option "+("_blank"==o?'selected="selected"':"")+' value="_blank">Is blank</option>'+'<option disabled="disabled">---------</option>'+s+"</select>"+'<select multiple="multiple" style="display:'+(p?"inline-block":"none")+'" '+(p?'name="'+l+'[]"':"")+' data-name="'+l+'[]" class="select-multiple input-small">'+s+"</select> "+'<a href="#" class="switch-select"><i class="icon-'+(p?"minus":"plus")+'"></i></a>';break;case"string":case"text":case"belongs_to_association":var u='<select class="switch-additionnal-fieldsets input-small" value="'+r+'" name="'+c+'">'+'<option data-additional-fieldset="additional-fieldset"'+("like"==r?'selected="selected"':"")+' value="like">Contains</option>'+'<option data-additional-fieldset="additional-fieldset"'+("is"==r?'selected="selected"':"")+' value="is">Is exactly</option>'+'<option data-additional-fieldset="additional-fieldset"'+("starts_with"==r?'selected="selected"':"")+' value="starts_with">Starts with</option>'+'<option data-additional-fieldset="additional-fieldset"'+("ends_with"==r?'selected="selected"':"")+' value="ends_with">Ends with</option>'+'<option disabled="disabled">---------</option>'+"<option "+("_present"==r?'selected="selected"':"")+' value="_present">Is present</option>'+"<option "+("_blank"==r?'selected="selected"':"")+' value="_blank">Is blank</option>'+"</select>",h='<input class="additional-fieldset input-small" style="display:'+("_blank"==r||"_present"==r?"none":"inline-block")+';" type="text" name="'+l+'" value="'+o+'" /> ';break;case"integer":case"decimal":case"float":var u='<select class="switch-additionnal-fieldsets input-small" name="'+c+'">'+"<option "+("default"==r?'selected="selected"':"")+' data-additional-fieldset="default" value="default">Number ...</option>'+"<option "+("between"==r?'selected="selected"':"")+' data-additional-fieldset="between" value="between">Between ... and ...</option>'+'<option disabled="disabled">---------</option>'+"<option "+("_not_null"==r?'selected="selected"':"")+' value="_not_null">Is present</option>'+"<option "+("_null"==r?'selected="selected"':"")+' value="_null" >Is blank</option>'+"</select>",h='<input class="additional-fieldset default input-small" style="display:'+(r&&"default"!=r?"none":"inline-block")+';" type="'+i+'" name="'+l+'[]" value="'+(o[0]||"")+'" /> '+'<input placeholder="-∞" class="additional-fieldset between input-small" style="display:'+("between"==r?"inline-block":"none")+';" type="'+i+'" name="'+l+'[]" value="'+(o[1]||"")+'" /> '+'<input placeholder="∞" class="additional-fieldset between input-small" style="display:'+("between"==r?"inline-block":"none")+';" type="'+i+'" name="'+l+'[]" value="'+(o[2]||"")+'" />';break;default:var u='<input type="text" class="input-small" name="'+l+'" value="'+o+'"/> '}var d='<p class="filter form-search"><span class="label label-info form-label"><a href="#" class="delete"><i class="icon-trash icon-white"></i></a> '+e+"</span> "+u+" "+(h||"")+"</p> ";t("#filters_box").append(d),t("#filters_box .date").datepicker(this.options.regional.datePicker),t("hr.filters_box:hidden").show("slow")}},t(document).on("click","#filters a",function(e){e.preventDefault(),t.filters.append(t(this).data("field-label"),t(this).data("field-name"),t(this).data("field-type"),t(this).data("field-value"),t(this).data("field-operator"),t(this).data("field-options"),t.now().toString().slice(6,11))}),t(document).on("click","#filters_box .delete",function(e){e.preventDefault(),form=t(this).parents("form"),t(this).parents(".filter").remove(),!t("#filters_box").children().length&&t("hr.filters_box:visible").hide("slow")}),t(document).on("click","#filters_box .switch-select",function(e){e.preventDefault();var n=t(this).siblings("select:visible"),i=t(this).siblings("select:hidden");i.attr("name",i.data("name")).show("slow"),n.attr("name",null).hide("slow"),t(this).find("i").toggleClass("icon-plus icon-minus")}),t(document).on("change","#filters_box .switch-additionnal-fieldsets",function(){var e=t(this).find("option:selected");(klass=t(e).data("additional-fieldset"))?(t(this).siblings(".additional-fieldset:not(."+klass+")").hide("slow"),t(this).siblings("."+klass).show("slow")):t(this).siblings(".additional-fieldset").hide("slow")})})(jQuery);