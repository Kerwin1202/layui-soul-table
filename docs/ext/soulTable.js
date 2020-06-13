/**
 *
 * @name:  表格增强插件
 * @author: yelog
 * @link: https://github.com/yelog/layui-soul-table
 * @license: MIT
 * @version: v1.5.13
 */
layui.define(["table","tableFilter","tableChild","tableMerge"],function(exports){var tableFilter=layui.tableFilter,tableChild=layui.tableChild,tableMerge=layui.tableMerge,$=layui.$,table=layui.table,HIDE="layui-hide",tables={},originCols={},defaultConfig={fixTotal:!1,drag:!0,rowDrag:!1,autoColumnWidth:!0,contextmenu:!1,fixResize:!0,overflow:!1,fixFixedScroll:!0,filter:!1},mod={render:function(e){tables[e.id]=e;var t=$.extend({},defaultConfig,e);if(t.filter&&t.filter.cache){var i=location.pathname+location.hash+e.id,l=this.deepStringify(e.cols);if(!originCols[e.id]){originCols[e.id]=this.deepClone(e.cols);var a=localStorage.getItem(i);a&&l===localStorage.getItem("origin"+i)?this.updateCols(e,this.deepParse(a)):(localStorage.setItem("origin"+i,l),localStorage.removeItem(i))}}else this.clearCache(e);tableFilter.render(e),tableChild.render(e),tableMerge.render(e),t.fixTotal&&this.fixTotal(e),t.drag&&this.drag(e,t.drag),t.rowDrag&&this.rowDrag(e,t.rowDrag),t.autoColumnWidth&&this.autoColumnWidth(e,t.autoColumnWidth),this.contextmenu(e,t.contextmenu),t.fixResize&&this.fixResizeRightFixed(e),t.overflow&&this.overflow(e,t.overflow),t.fixFixedScroll&&this.fixFixedScroll(e)},config:function(e){"object"==typeof e&&$.extend(!0,defaultConfig,e)},updateCols:function(a,n){var r,o,d,e={},t=[],i=[],l=$(a.elem).next().children(".layui-table-box"),s=l.children(".layui-table-fixed").children(".layui-table-header").children("table"),c=$.merge(l.children(".layui-table-header").children("table"),s),h=l.children(".layui-table-header").children("table"),f=l.children(".layui-table-fixed").children(".layui-table-body").children("table"),u=l.children(".layui-table-body").children("table"),b=$.merge(l.children(".layui-table-body").children("table"),f);for(r=0;r<a.cols.length;r++)for(o=0;o<a.cols[r].length;o++)a.cols[r][o].oldPos=r+"-"+o,e[a.cols[r][o].key]=a.cols[r][o];for(r=0;r<n.length;r++){for(i=[],o=0;o<n[r].length;o++){if(d=a.index+"-"+n[r][o].key,n[r][o].width&&e[n[r][o].key]!==n[r][o].width&&this.getCssRule(a,d,function(e){e.style.width=(n[r][o].width?n[r][o].width:0)+"px"}),e[n[r][o].key].hide!==n[r][o].hide&&(c.find('th[data-key="'+d+'"]')[n[r][o].hide?"addClass":"removeClass"]("layui-hide"),b.find('td[data-key="'+d+'"]')[n[r][o].hide?"addClass":"removeClass"]("layui-hide")),(e[n[r][o].key].oldPos!==r+"-"+o||e[n[r][o].key].fixed!==n[r][o].fixed)&&n[r][o].fixed!==e[n[r][o].key].fixed)return a.cols=n,void table.reload(a.id);e[n[r][o].key].fixed=n[r][o].fixed,e[n[r][o].key].width=n[r][o].width,e[n[r][o].key].hide=n[r][o].hide,i.push(e[n[r][o].key])}t.push(i)}function y(e,t){for(r=0;r<n.length;r++)for(o=0;o<n[r].length;o++){d=a.index+"-"+n[r][o].key;var i=$(e).children(t+":eq("+o+")").attr("data-key");if(i!==d&&($(e).children(t+":eq("+o+")").before($(e).children(t+'[data-key="'+d+'"]')),n[r][o].fixed)){var l=("th"===t?s:f).children().children("th"===t?"tr":'tr[data-index="'+$(e).attr("data-index")+'"]');l.children(t+'[data-key="'+i+'"]').before(l.children(t+'[data-key="'+d+'"]'))}}}h.children().children("tr").each(function(){y(this,"th")}),u.children().children("tr").each(function(){y(this,"td")}),a.cols=t,tableFilter.resize(a)},export:function(e,t){tableFilter.export(e.config||e,t)},getCssRule:function(e,i,l){var t=e.elem.next().find("style")[0],a=t.sheet||t.styleSheet||{},n=a.cssRules||a.rules;layui.each(n,function(e,t){if(t.selectorText===".laytable-cell-"+i)return l(t),!0})},autoColumnWidth:function(e,n){var t=this;function i(c,l){var e=$(l.elem),t=e.next().children(".layui-table-box").children(".layui-table-header").children("table").children("thead").children("tr").children("th"),i=e.next().children(".layui-table-box").children(".layui-table-fixed").children(".layui-table-header").children("table").children("thead").children("tr").children("th"),h=e.next().children(".layui-table-box").children(".layui-table-body").children("table").children("tbody").children("tr"),f=e.next().children(".layui-table-total").find("tr");function a(e,t,i){var l=t.data("field"),a=t.data("key");if(!(1<t.attr("colspan"))&&i){var n=t.text().width(t.css("font"))+21,r=t.css("font");if(h.children('td[data-key="'+a+'"]').each(function(e,t){var i=0;$(this).children().children()&&0<$(this).children().children().length?i+=$(this).children().html().width(r):i=$(this).text().width(r),n<i&&(n=i)}),0<f.length){var o=f.children('td[data-key="'+a+'"]').text().width(r);n<o&&(n=o)}n+=32,c.getCssRule(e,a,function(e){e.style.width=n+"px"});for(var d=0;d<e.cols.length;d++)for(var s=0;s<e.cols[d].length;s++)if(e.cols[d][s].field===l){e.cols[d][s].width=n;break}}}String.prototype.width=function(e){var t=e||$("body").css("font"),i=$("<div>"+this+"</div>").css({position:"absolute",float:"left","white-space":"nowrap",visibility:"hidden",font:t}).appendTo($("body")),l=i.width();return i.remove(),l},void 0!==n&&void 0!==n.dblclick&&!n.dblclick||t.add(i).on("dblclick",function(e){var t=$(this),i=e.clientX-t.offset().left;a(l,t,0<t.parents(".layui-table-fixed-r").length?i<=10:t.width()-i<=10)}),n&&n.init&&t.add(i).each(function(e){var t=$(this).attr("data-key").split("-");!1===l.cols[t[1]][t[2]].autoWidth||Array.isArray(n.init)&&-1===n.init.indexOf($(this).attr("data-field"))||a(l,$(this),!0)})}"object"==typeof e?i(t,e):"string"==typeof e?i(t,tables[e]):void 0===e&&layui.each(tables,function(){i(t,this)})},drag:function(I,e){if(!(1<I.cols.length)){var F=this,t=$(I.elem),W=t.next().children(".layui-table-box"),s=$.merge(W.children(".layui-table-header").children("table"),W.children(".layui-table-fixed").children(".layui-table-header").children("table")),T=W.children(".layui-table-fixed").children(".layui-table-body").children("table"),c=W.children(".layui-table-body").children("table"),z=$.merge(W.children(".layui-table-body").children("table"),T),X=t.next().children(".layui-table-total").children("table"),E=t.next().children(".layui-table-total").children("table.layui-table-total-fixed"),h=t.next().children(".layui-table-total").children("table:eq(0)"),_=I.id,D="simple"===e||e&&"simple"===e.type,N=e&&e.toolbar,O=!1,q=!1;if(!s.attr("drag")){if(s.attr("drag",!0),N){W.append('<div class="soul-drag-bar"><div data-type="left">左固定</div><div data-type="none">不固定</div><div data-type="right">右固定</div></div>');var P=W.children(".soul-drag-bar");P.children("div").on("mouseenter",function(){$(this).addClass("active")}).on("mouseleave",function(){$(this).removeClass("active")})}s.find("th").each(function(){var k=$(this),w=k.data("field"),C=k.data("key");if(C){var e=C.split("-"),d=I.cols[e[1]][e[2]],S=e[1]+"-"+e[2],R=0<k.parents(".layui-table-fixed").length;$(this).find("span:first,.laytable-cell-checkbox").css("cursor","move").on("mousedown",function(e){if(0===e.button){e.preventDefault();var y=k.clone().css("visibility","hidden"),t=k.position().left,p=k.offset().top,v=e.clientX-t,x=k.parents("tr:eq(0)").css("background-color"),m=k.width(),o=$(this),g=d.fixed;q=!0,$(document).bind("selectstart",function(){return!1}),$("body").on("mousemove",function(e){if(q&&y){W.removeClass("no-left-border"),O||(N&&(P.attr("data-type",g||"none"),P.addClass("active")),k.after(y),k.addClass("isDrag").css({position:"absolute","z-index":1,"border-left":"1px solid #e6e6e6","background-color":x,width:m+1}),D||((R?T:z).find('td[data-key="'+C+'"]').each(function(){$(this).after($(this).clone().css("visibility","hidden").attr("data-clone","")),$(this).addClass("isDrag").css({position:"absolute","z-index":1,"border-left":"1px solid #e6e6e6","background-color":$(this).css("background-color"),width:m+1})}),0<X.length&&(R?E:X).find('td[data-key="'+C+'"]').each(function(){$(this).after($(this).clone().css("visibility","hidden").attr("data-clone","")),$(this).addClass("isDrag").css({position:"absolute","z-index":1,"background-color":$(this).parents("tr:eq(0)").css("background-color"),width:m+1})}))),O=!0;var t,i,l,a,n,r=e.clientX-v,o=y.prev().prev(),d=0<o.length,s=d?o.data("key").split("-"):[],c=y.next().hasClass("layui-table-patch")?[]:y.next(),h=0<c.length,f=h?c.data("key").split("-"):[],u=d&&y.position().left-r>o.width()/2,b=h&&r-y.position().left>c.width()/2;if(Math.abs(y.position().left-r),0<y.position().left-r?!d||!!g!=!!I.cols[s[1]][s[2]].fixed:!h||!!g!=!!I.cols[f[1]][f[2]].fixed)return k.css("left",y.position().left),z.find('td[data-key="'+C+'"][data-clone]').each(function(e){$(this).prev().css("left",y.position().left)}),0<X.length&&X.find('td[data-key="'+C+'"][data-clone]').each(function(e){$(this).prev().css("left",y.position().left)}),void W.addClass("no-left-border");if(k.css("left",r),u){for(y.after(o),$("#soul-columns"+_+'>li[data-value="'+w+'"]').after($("#soul-columns"+_+'>li[data-value="'+w+'"]').prev()),l=0;l<I.cols.length;l++){for(a=0;a<I.cols[l].length;a++)if(I.cols[l][a].key===S){t=l,i=a;break}if(void 0!==t&&void 0!==i)break}n=I.cols[t][i-1],I.cols[t][i-1]=I.cols[t][i],I.cols[t][i]=n,F.fixTableRemember(I)}else if(b){for(y.prev().before(c),$("#soul-columns"+_+'>li[data-value="'+w+'"]').before($("#soul-columns"+_+'>li[data-value="'+w+'"]').next()),l=0;l<I.cols.length;l++){for(a=0;a<I.cols[l].length;a++)if(I.cols[l][a].key===S){t=l,i=a;break}if(void 0!==t&&void 0!==i)break}n=I.cols[t][i+1],I.cols[t][i+1]=I.cols[t][i],I.cols[t][i]=n,F.fixTableRemember(I)}z.find('td[data-key="'+C+'"][data-clone]').each(function(){$(this).prev().css("left",r),u?0!==$(this).prev().prev().length&&$(this).after($(this).prev().prev()):b&&0!==$(this).next().length&&$(this).prev().before($(this).next())}),0<X.length&&X.find('td[data-key="'+C+'"][data-clone]').each(function(){$(this).prev().css("left",r),u?0!==$(this).prev().prev().length&&$(this).after($(this).prev().prev()):b&&0!==$(this).next().length&&$(this).prev().before($(this).next())}),e.clientY-p<-15?(0===$("#column-remove").length&&$("body").append('<i id="column-remove" class="layui-red layui-icon layui-icon-delete"></i>'),$("#column-remove").css({top:e.clientY-$("#column-remove").height()/2,left:e.clientX-$("#column-remove").width()/2,"font-size":p-e.clientY+"px"}),$("#column-remove").show()):$("#column-remove").hide()}}).on("mouseup",function(){if($(document).unbind("selectstart"),$("body").off("mousemove").off("mouseup"),q&&y){if(q=!1,O){"checkbox"!==d.type&&o.on("click",function(e){e.stopPropagation()}),O=!1,W.removeClass("no-left-border"),k.removeClass("isDrag").css({position:"relative","z-index":"inherit",left:"inherit","border-left":"inherit",width:"inherit","background-color":"inherit"}),k.next().remove();var t=k.prev().data("key");if(g){var e=W.children(".layui-table-header").children("table").find('th[data-key="'+C+'"]');t?e.parent().children('th[data-key="'+t+'"]').after(e):"right"===g?0<k.siblings().length&&W.children(".layui-table-header").children("table").find('th[data-key="'+k.next().data("key")+'"]').prev().after(e):(e.parent().prepend('<th class="layui-hide"></th>'),e.parent().children("th:first").after(e),e.parent().children("th:first").remove())}if(D?(z.find('td[data-key="'+C+'"]').each(function(){if(t)$(this).parent().children('td[data-key="'+t+'"]').after($(this));else if("right"===g){if(0<k.siblings().length){var e=$(this).parent().children('td[data-key="'+k.next().data("key")+'"]').prev();0<e.length?e.after($(this)):($(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove())}}else $(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove()}),0<X.length&&X.find('td[data-key="'+C+'"]').each(function(){if(t)$(this).parent().children('td[data-key="'+t+'"]').after($(this));else if("right"===g){var e=$(this).parent().children('td[data-key="'+k.next().data("key")+'"]').prev();0<e.length?e.after($(this)):($(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove())}else $(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove()})):R?(c.find('td[data-key="'+C+'"]').each(function(){if(t)$(this).parent().children('td[data-key="'+t+'"]').after($(this));else if("right"===g){if(0<k.siblings().length){var e=$(this).parent().children('td[data-key="'+k.next().data("key")+'"]').prev();0<e.length?e.after($(this)):($(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove())}}else $(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove()}),T.find('td[data-key="'+C+'"][data-clone]').each(function(){$(this).prev().removeClass("isDrag").css({position:"relative","z-index":"inherit",left:"inherit","border-left":"inherit",width:"inherit","background-color":"inherit"}),$(this).remove()}),0<X.length&&(h.find('td[data-key="'+C+'"]').each(function(){if(t)$(this).parent().children('td[data-key="'+t+'"]').after($(this));else if("right"===g){var e=$(this).parent().children('td[data-key="'+k.next().data("key")+'"]').prev();0<e.length?e.after($(this)):($(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove())}else $(this).parent().prepend('<td class="layui-hide"></td>'),$(this).parent().children("td:first").after($(this)),$(this).parent().children("td:first").remove()}),E.find('td[data-key="'+C+'"][data-clone]').each(function(){$(this).prev().removeClass("isDrag").css({position:"relative","z-index":"inherit",left:"inherit",width:"inherit","background-color":"inherit"}),$(this).remove()}))):(z.find('td[data-key="'+C+'"][data-clone]').each(function(){$(this).prev().removeClass("isDrag").css({position:"relative","z-index":"inherit",left:"inherit",width:"inherit","background-color":"inherit"}),$(this).remove()}),0<X.length&&X.find('td[data-key="'+C+'"][data-clone]').each(function(){$(this).prev().removeClass("isDrag").css({position:"relative","z-index":"inherit",left:"inherit",width:"inherit","background-color":"inherit"}),$(this).remove()})),y=null,N){if(0<P.children(".active").length&&P.children(".active").attr("data-type")!==P.attr("data-type")){var i,l,a,n,r=P.children(".active").attr("data-type");for(i=0;i<I.cols.length;i++)for(l=0;l<I.cols[i].length;l++)"right"===r||"none"===r&&"right"===P.attr("data-type")?void 0===n&&("right"===I.cols[i][l].fixed?n={x:i,y:l}:l===I.cols[i].length-1&&(n={x:i,y:l+1})):void 0!==n||I.cols[i][l].fixed&&"right"!==I.cols[i][l].fixed||(n={x:i,y:l}),I.cols[i][l].key===S&&(a={x:i,y:l});d.fixed="none"!==r&&r,a.y!==n.y&&(I.cols[a.x].splice(a.y,1),a.y<n.y&&--n.y,I.cols[n.x].splice(n.y,0,d),F.fixTableRemember(I)),table.reload(_)}P.removeClass("active")}}else o.unbind("click");$("#column-remove").is(":visible")&&(s.find("thead>tr>th[data-key="+C+"]").addClass(HIDE),z.find('tbody>tr>td[data-key="'+C+'"]').addClass(HIDE),X.find('tbody>tr>td[data-key="'+C+'"]').addClass(HIDE),d.hide=!0,F.fixTableRemember(I),$("#soul-columns"+_).find('li[data-value="'+w+'"]>input').prop("checked",!1),tableFilter.resize(I)),$("#column-remove").hide()}})}})}})}}},rowDrag:function(h,v){var x,e,m=this,g=$(h.elem),k=g.next().children(".layui-table-box"),w=k.children(".layui-table-fixed").children(".layui-table-body").children("table"),C=k.children(".layui-table-body").children("table"),t=$.merge(k.children(".layui-table-body").children("table"),w),S=h.id,R=!1,i=v.trigger||"row",I=!1!==v.numbers,F=null,W=0,l="row"===i?t.children("tbody").children("tr"):t.find(i);for("row"!==i&&t.find(i).css("cursor","move"),x=0;x<h.cols.length;x++)for(e=0;e<h.cols[x].length;e++)if("numbers"===h.cols[x][e].type){F=h.index+"-"+x+"-"+e,W=parseInt(C.find('td[data-key="'+F+'"]:first').text());break}l.on("mousedown",function(e){if(0===e.button){var s="row"===i?$(this):$(this).parents("tr:eq(0)"),c=parseInt(s.data("index")),f=C.children("tbody").children("tr[data-index="+c+"]"),u=f.clone().css("visibility","hidden"),b=w.children("tbody").children("tr[data-index="+c+"]"),y=k.children(".layui-table-body").scrollTop(),t=s.position().top,p=e.clientY-t;$("body").on("mousemove",function(e){if(!R){R=!0;var t=g.next().find("style")[0],i=t.sheet||t.styleSheet||{};m.addCSSRule(i,".layui-table-view .layui-table td","cursor: move"),m.addCSSRule(i,".layui-table tr","transition: none"),k.addClass("noselect"),f.after(u),f.css({position:"absolute","z-index":1}),b.each(function(){$(this).after($(this).clone().css("visibility","hidden")),$(this).css({position:"absolute","z-index":102})})}var l=e.clientY-p+(k.children(".layui-table-body").scrollTop()-y),a=u.position().top,n=f.prev(),r=0<n.length,o=u.next(),d=0<o.length,s=r&&a-l>n.height()/2,c=d&&l-a>o.height()/2;if(0<a-l?!r:!d)return f.css("top",a),void b.each(function(){$(this).css("top",a)});function h(e,t){var i=parseInt(e.data("index"))+t;return e.data("index",i),e.attr("data-index",i),e}f.css("top",l),b.each(function(){$(this).css("top",l)}),s?(h(f,-1),u.after(h(n,1)),b.each(function(){h($(this),-1),$(this).next().after(h($(this).prev(),1))})):c&&(h(f,1).before(h(o,-1)),b.each(function(){h($(this),1),$(this).before(h($(this).next().next(),-1))}))}).on("mouseup",function(e){if($("body").off("mousemove").off("mouseup"),R){R=!1,k.removeClass("noselect"),f.css({position:"inherit","z-index":"inherit"}),f.next().remove(),b.each(function(){$(this).css({position:"inherit","z-index":"inherit"}),$(this).next().remove()});var t=g.next().find("style")[0],i=t.sheet||t.styleSheet||{},l=i.cssRules||i.rules;layui.each(l,function(e,t){".layui-table-view .layui-table td"===t.selectorText&&(t.style.cursor="default")});var a=s.index();if(a!==c){var n=table.cache[S],r=n.splice(c,1)[0];if(n.splice(a,0,r),F&&I){var o=[a,c].sort();for(x=o[0];x<=o[1];x++){var d=W+x;w.find('td[data-key="'+F+'"]:eq('+x+")").children().html(d),C.find('td[data-key="'+F+'"]:eq('+x+")").children().html(d),n[x][table.config.indexName]=d-1}}"function"==typeof v.done&&v.done.call(h,{row:r,newIndex:a,oldIndex:c,cache:n})}}})}})},fixTableRemember:function(e,t){if(void 0===e.filter?defaultConfig.filter&&defaultConfig.filter.cache:e.filter.cache){t&&t.rule&&(e.cols[t.rule.selectorText.split("-")[3]][t.rule.selectorText.split("-")[4]].width=t.rule.style.width.replace("px",""));var i=location.pathname+location.hash+e.id;localStorage.setItem(i,this.deepStringify(e.cols))}},clearCache:function(e){var t;e&&(t="object"==typeof e?void 0!==e.config?e.config.id:e.id:e,localStorage.removeItem(location.pathname+location.hash+t),originCols[t]&&this.updateCols(tables[t],this.deepClone(originCols[t])))},overflow:function(e,t){var i={};if("string"==typeof t)i={type:t};else{if("object"!=typeof t)return;i=t}var n,r,l=$(e.elem),a=l.next().find(".layui-table-header"),o=l.next().find(".layui-table-body"),d=l.next().find(".layui-table-total"),s=i.hoverTime||0,c=i.color||"white",h=i.bgColor||"black",f=i.minWidth||300,u=i.maxWidth||300;if("tips"===i.type){function b(e){clearTimeout(r);var t=$(this),i=t.children(".layui-table-cell"),l=i.outerWidth(),a=l<f?f:u<l?u:l;t.data("off")||(e?layer.close(n):i.prop("scrollWidth")>l&&(n=layer.tips('<span style="color: '+c+'">'+$(this).text()+"</span>",this,{tips:[1,h],maxWidth:a,time:0})))}o.off("mouseenter","td").off("mouseleave","td").on("mouseenter","td",function(){var e=this;r=setTimeout(function(){b.call(e)},s)}).on("mouseleave","td",function(){b.call(this,"hide")}),i.header&&a.off("mouseenter","th").off("mouseleave","th").on("mouseenter","th",function(){var e=this;r=setTimeout(function(){b.call(e)},s)}).on("mouseleave","th",function(){b.call(this,"hide")}),i.total&&d.off("mouseenter","td").off("mouseleave","td").on("mouseenter","td",function(){var e=this;r=setTimeout(function(){b.call(e)},s)}).on("mouseleave","td",function(){b.call(this,"hide")})}else"title"===i.type&&(o.off("mouseenter","td").on("mouseenter","td",function(){var e=$(this),t=e.children(".layui-table-cell");e.data("off")||t.prop("scrollWidth")>t.outerWidth()&&t.attr("title",$(this).text())}),i.header&&a.off("mouseenter","th").on("mouseenter","th",function(){var e=$(this),t=e.children(".layui-table-cell");e.data("off")||t.prop("scrollWidth")>t.outerWidth()&&t.attr("title",$(this).text())}),i.total&&d.off("mouseenter","td").on("mouseenter","td",function(){var e=$(this),t=e.children(".layui-table-cell");e.data("off")||t.prop("scrollWidth")>t.outerWidth()&&t.attr("title",$(this).text())}))},contextmenu:function(h,e){for(var t=$(h.elem),i=t.next().children(".layui-table-box"),l=$.merge(i.children(".layui-table-header").children("table"),i.children(".layui-table-fixed").children(".layui-table-header").children("table")),a=i.children(".layui-table-fixed").children(".layui-table-body").children("table"),n=$.merge(i.children(".layui-table-body").children("table"),a),r=t.next().children(".layui-table-total").children("table"),f=h.id,o={header:{box:l,tag:"th",opts:e?e.header:"",cols:{}},body:{box:n,tag:"td",opts:e?e.body:"",cols:{},isBody:!0},total:{box:r,tag:"td",opts:e?e.total:"",cols:{}}},d=!1,s=0;s<h.cols.length;s++)for(var c=0;c<h.cols[s].length;c++)h.cols[s][c].contextmenu&&(d=!0,o.header.cols[h.cols[s][c].key]=h.cols[s][c].contextmenu.header,o.body.cols[h.cols[s][c].key]=h.cols[s][c].contextmenu.body,o.total.cols[h.cols[s][c].key]=h.cols[s][c].contextmenu.total);if(e||d){for(var u in o)!function(i){o[i].box.find(o[i].tag).on("contextmenu",function(e){$("#soul-table-contextmenu-wrapper").remove(),$("body").append('<div id="soul-table-contextmenu-wrapper"></div>'),$("#soul-table-contextmenu-wrapper").on("click",function(e){e.stopPropagation()});var t=o[i].cols[$(this).data("key").substr($(this).data("key").indexOf("-")+1)];return!1!==t&&(t&&0<t.length?(b($("#soul-table-contextmenu-wrapper"),e.pageX,e.pageY,t,$(this),o[i].box,o[i].tag,o[i].isBody),!1):!1!==o[i].opts&&(o[i].opts&&0<o[i].opts.length?(b($("#soul-table-contextmenu-wrapper"),e.pageX,e.pageY,o[i].opts,$(this),o[i].box,o[i].tag,o[i].isBody),!1):void 0))})}(u);$("body").on("click",function(){$("#soul-table-contextmenu-wrapper").remove()})}function b(e,t,i,l,r,o,d,s){var a,n=[];for(n.push('<ul class="soul-table-contextmenu">'),a=0;a<l.length;a++)n.push('<li data-index="'+a+'" class="'+(l[a].children&&0<l[a].children.length?"contextmenu-children":"")+'">'),l[a].icon?n.push('<i class="prefixIcon '+l[a].icon+'" />'):n.push('<i class="prefixIcon" />'),n.push(l[a].name),l[a].children&&0<l[a].children.length&&n.push('<i class="endIcon layui-icon layui-icon-right" />'),n.push("</li>");n.push("</ul>"),e.append(n.join(""));var c=e.children().last();for(i+c.outerHeight()>$("body").prop("scrollHeight")&&(i-=c.outerHeight())<0&&(i=0),"left"===e.parent().data("direction")&&0<e.offset().left-c.outerWidth()?(t=-c.outerWidth(),c.data("direction","left")):t+c.outerWidth()+e.offset().left>$("body").prop("scrollWidth")&&((t=t-c.outerWidth()-e.outerWidth())+e.offset().left<0&&(t=-e.offset().left),c.data("direction","left")),c.css({top:i+"px",left:t+"px"}),a=0;a<l.length;a++)"function"==typeof l[a].click&&function(t){e.children(".soul-table-contextmenu:last").children('li[data-index="'+t+'"]').on("click",function(){var e=r.parents("tr:eq(0)").data("index"),a=o.find('tr[data-index="'+e+'"]'),n=layui.table.cache[f][e];l[t].click.call(h,{cell:r,elem:"th"===d?r:s?o.children("tbody").children('tr[data-index="'+e+'"]').children('[data-key="'+r.data("key")+'"]'):o.find('[data-key="'+r.data("key")+'"]'),trElem:o.children("tbody").children('tr[data-index="'+e+'"]'),text:r.text(),field:r.data("field"),del:s?function(){table.cache[f][e]=[],a.remove(),table.resize(f)}:"",update:s?function(e){e=e||{},layui.each(e,function(i,e){if(i in n){var l,t=a.children('td[data-field="'+i+'"]');n[i]=e,table.eachCols(f,function(e,t){t.field==i&&t.templet&&(l=t.templet)}),t.children(".layui-table-cell").html(l?"function"==typeof l?l(n):layui.laytpl($(l).html()||e).render(n):e),t.data("content",e)}})}:"",row:s?n:{}}),$("#soul-table-contextmenu-wrapper").remove()})}(a);e.children(".soul-table-contextmenu:last").children("li").on("mouseenter",function(e){e.stopPropagation(),$(this).siblings(".contextmenu-children").children("ul").remove(),$(this).hasClass("contextmenu-children")&&b($(this),$(this).outerWidth(),$(this).position().top,l[$(this).data("index")].children,r,o,d,s)})}},fixTotal:function(e){var t=$(e.elem),i=t.next().children(".layui-table-total"),l=t.next().find("style")[0],a=l.sheet||l.styleSheet||{};if(0<i.length){var n=t.next().children(".layui-table-box"),r=n.children(".layui-table-fixed-l").children(".layui-table-body").children("table").children("tbody").children("tr:eq(0)").children("td"),o=n.children(".layui-table-fixed-r").children(".layui-table-body").children("table").children("tbody").children("tr:eq(0)").children("td"),d=[];i.children(".layui-table-total-fixed").remove(),0<r.length&&(this.addCSSRule(a,".layui-table-total-fixed-l .layui-table-patch","display: none"),t.next().css("position","relative"),d.push('<table style="position: absolute;background-color: #fff;left: 0;top: '+(i.position().top+1)+'px" cellspacing="0" cellpadding="0" border="0" class="layui-table layui-table-total-fixed layui-table-total-fixed-l"><tbody><tr>'),r.each(function(){$(this).data("key")&&d.push(i.children("table:eq(0)").find('[data-key="'+$(this).data("key")+'"]').prop("outerHTML"))}),d.push("</tr></tbody></table>"),i.append(d.join(""))),0<o.length&&(this.addCSSRule(a,".layui-table-total-fixed-r td:first-child","border-left:1px solid #e6e6e6"),this.addCSSRule(a,".layui-table-total-fixed-r td:last-child","border-left: none"),t.next().css("position","relative"),(d=[]).push('<table style="position: absolute;background-color: #fff;right: 0;top: '+(i.position().top+1)+'px" cellspacing="0" cellpadding="0" border="0" class="layui-table layui-table-total-fixed layui-table-total-fixed-r"><tbody><tr>'),o.each(function(){d.push(i.children("table:eq(0)").find('[data-key="'+$(this).data("key")+'"]').prop("outerHTML"))}),d.push("</tr></tbody></table>"),i.append(d.join("")))}},fixResizeRightFixed:function(l){var i,a=this,e=$(l.elem).next().children(".layui-table-box").children(".layui-table-fixed-r").children(".layui-table-header").children("table"),n={},r=$("body"),t=$(document),o="layui-table-sort",d="layui-table-sort-invalid";0<e.length&&(e.find("th").off("mousemove").on("mousemove",function(e){var t=$(this),i=t.offset().left,l=e.clientX-i;t.data("unresize")||n.resizeStart||(t.width()-l<=10&&r.css("cursor","initial"),n.allowResize=l<=10,r.css("cursor",n.allowResize?"col-resize":""))}).off("mousedown").on("mousedown",function(e){var i=$(this);if(n.allowResize){i.find("."+o).removeClass(o).addClass(d);var t=i.data("key");e.preventDefault(),n.resizeStart=!0,n.offset=[e.clientX,e.clientY],a.getCssRule(l,t,function(e){var t=e.style.width||i.outerWidth();n.rule=e,n.ruleWidth=parseFloat(t),n.othis=i,n.minWidth=i.data("minwidth")||l.cellMinWidth})}}),t.on("mousemove",function(e){if(n.resizeStart){if(layui.soulTable.fixTableRemember(l,n),e.preventDefault(),n.rule){var t=n.ruleWidth-e.clientX+n.offset[0];t<n.minWidth&&(t=n.minWidth),n.rule.style.width=t+"px"}i=1}}).on("mouseup",function(e){n.resizeStart&&setTimeout(function(){n.othis.find("."+d).removeClass(d).addClass(o),r.css("cursor",""),n={},a.scrollPatch(l)},30),2===i&&(i=null)}))},fixFixedScroll:function(e){var t=$(e.elem),i=t.next().children(".layui-table-box").children(".layui-table-fixed"),l=t.next().children(".layui-table-box").children(".layui-table-main");i.on("mouseenter",function(){$(this).children(".layui-table-body").addClass("soul-fixed-scroll").on("scroll",function(){var e=$(this).scrollTop();l.scrollTop(e)})}).on("mouseleave",function(){$(this).children(".layui-table-body").removeClass("soul-fixed-scroll").off("scroll")})},scrollPatch:function(e){function t(e){if(s&&c){if(!(e=e.eq(0)).find(".layui-table-patch")[0]){var t=$('<th class="layui-table-patch"><div class="layui-table-cell"></div></th>');t.find("div").css({width:s}),e.find("tr").append(t)}}else e.find(".layui-table-patch").remove()}var i=$(e.elem),l=i.next().children(".layui-table-box").children(".layui-table-header"),a=i.next().children(".layui-table-total"),n=i.next().children(".layui-table-box").children(".layui-table-main"),r=i.next().children(".layui-table-box").children(".layui-table-fixed"),o=i.next().children(".layui-table-box").children(".layui-table-fixed-r"),d=n.children("table"),s=n.width()-n.prop("clientWidth"),c=n.height()-n.prop("clientHeight"),h=d.outerWidth()-n.width();t(l),t(a);var f=n.height()-c;r.find(".layui-table-body").css("height",d.height()>=f?f:"auto"),o[0<h?"removeClass":"addClass"](HIDE),o.css("right",s-1)},copy:function(e){var t;e?((t=document.createElement("div")).id="tempTarget",t.style.opacity="0",t.innerText=e,document.body.appendChild(t)):t=document.querySelector("#"+id);try{var i=document.createRange();i.selectNode(t),window.getSelection().removeAllRanges(),window.getSelection().addRange(i),document.execCommand("copy"),window.getSelection().removeAllRanges()}catch(e){console.log("复制失败")}e&&t.parentElement.removeChild(t)},addCSSRule:function(e,t,i,l){"insertRule"in e?e.insertRule(t+"{"+i+"}",l):"addRule"in e&&e.addRule(t,i,l)},deepStringify:function(e){var i="[[JSON_FUN_PREFIX_",l="_JSON_FUN_SUFFIX]]";return JSON.stringify(e,function(e,t){return"function"==typeof t?i+t.toString()+l:t})},deepParse:function(str){var JSON_SERIALIZE_FIX={PREFIX:"[[JSON_FUN_PREFIX_",SUFFIX:"_JSON_FUN_SUFFIX]]"};return JSON.parse(str,function(key,value){return"string"==typeof value&&0<value.indexOf(JSON_SERIALIZE_FIX.SUFFIX)&&0===value.indexOf(JSON_SERIALIZE_FIX.PREFIX)?eval("("+value.replace(JSON_SERIALIZE_FIX.PREFIX,"").replace(JSON_SERIALIZE_FIX.SUFFIX,"")+")"):value})||{}},clearFilter:function(e){tableFilter.clearFilter(e)},cache:tableFilter.cache,deepClone:function(e){var t=Array.isArray(e)?[]:{};if(e&&"object"==typeof e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e&&"object"==typeof e[i]?this.deepClone(e[i]):e[i]);return t},clearOriginCols:function(e){e?delete originCols[e]:originCols={}}};exports("soulTable",mod)});