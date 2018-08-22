(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['appShellTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"utf-8\">\n\n  <link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"/favicon/apple-icon-57x57.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"60x60\" href=\"/favicon/apple-icon-60x60.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"/favicon/apple-icon-72x72.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"/favicon/apple-icon-76x76.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"/favicon/apple-icon-114x114.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"/favicon/apple-icon-120x120.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"/favicon/apple-icon-144x144.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"/favicon/apple-icon-152x152.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/favicon/apple-icon-180x180.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"192x192\" href=\"/favicon/android-icon-192x192.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"512x512\" href=\"/favicon/android-icon-512x512.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/favicon/favicon-32x32.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"/favicon/favicon-96x96.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/favicon/favicon-16x16.png\">\n  <link rel=\"manifest\" href=\"/favicon/manifest.json\">\n  <meta name=\"msapplication-TileColor\" content=\"#21ba45\">\n  <meta name=\"msapplication-TileImage\" content=\"/ms-icon-144x144.png\">\n  <meta name=\"theme-color\" content=\"#21ba45\">\n\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <meta name=\"description\" content=\"wages shift work clocks clock wage\">\n\n\n  <title>\n"
    + container.escapeExpression(((helper = (helper = helpers.pageTitle || (depth0 != null ? depth0.pageTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageTitle","hash":{},"data":data}) : helper)))
    + "  </title>\n\n"
    + ((stack1 = ((helper = (helper = helpers.mainCss || (depth0 != null ? depth0.mainCss : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mainCss","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "    \n\n"
    + ((stack1 = ((helper = (helper = helpers.pageMainCss || (depth0 != null ? depth0.pageMainCss : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageMainCss","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "          "
    + ((stack1 = ((helper = (helper = helpers.pageOtherCss || (depth0 != null ? depth0.pageOtherCss : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageOtherCss","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n\n\n\n</head>\n\n<body>\n\n  <!-- APP SIDEBAR -->\n  <div id=\"app-sidebar\" class=\"ui left vertical inverted sidebar labeled icon menu\">\n    <a class=\"item\">\n      <i class=\"home icon\"></i>\n      Home\n    </a>\n    <a class=\"item\">\n      <i class=\"block layout icon\"></i>\n      Topics\n    </a>\n    <a class=\"item\">\n      <i class=\"smile icon\"></i>\n      Friends\n    </a>\n  </div>\n  <!-- /APP SIDEBAR -->\n\n\n\n  <div id=\"app-container\" class=\"app-container\">\n\n    <!-- TOP MENU (if exported by child) -->\n    <div class=\"app-main-menu\">\n\n"
    + ((stack1 = ((helper = (helper = helpers.pageTopMenu || (depth0 != null ? depth0.pageTopMenu : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageTopMenu","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "    </div>\n    <!-- /TOP MENU -->\n\n    <!-- MAIN CHILD TEMPLATE INSERT -->\n    <main role=\"main\">\n\n"
    + ((stack1 = ((helper = (helper = helpers.pageMainContent || (depth0 != null ? depth0.pageMainContent : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageMainContent","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "    </main>\n    <!-- /MAIN CHILD TEMPLATE INSERT -->\n  </div>\n\n  <!-- MODAL CONTAINER -->\n  <div id=\"body-modal-dimmer\" class=\"ui dimmer modals page transition body-modal-dimmer  body-modal-dismisser\">\n\n    <div id=\"body-modal\" class=\"ui modal transition\">\n      <div id=\"body-modal-content\" class=\"content\"></div>\n\n      <div class=\"actions\">\n        <div id=\"body-modal-dismiss\" class=\"ui cancel button body-modal-dismisser\">\n          Dismiss\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- /MODAL CONTAINER -->\n\n  <div class=\"insert-new-app-available-ui\" id=\"insert-new-app-available-ui\"></div>\n\n  <script>\n    window.appInterface = {};\n  </script>\n"
    + ((stack1 = ((helper = (helper = helpers.mainJs || (depth0 != null ? depth0.mainJs : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mainJs","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "    \n\n"
    + ((stack1 = ((helper = (helper = helpers.pageMainJs || (depth0 != null ? depth0.pageMainJs : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageMainJs","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "          "
    + ((stack1 = ((helper = (helper = helpers.pageOtherJs || (depth0 != null ? depth0.pageOtherJs : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageOtherJs","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n</body>\n\n</html>\n";
},"useData":true});
templates['indexMenuTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"ui inverted menu index-route-menu \">\n  <div class=\"ui container\">\n    <a id=\"sidebar-trigger\" class=\"item\">\n      <i class=\"content icon\"></i>\n    </a>\n\n    <div id=\"index-route-menu__title\" class=\"item index-route-menu__title\">\n"
    + container.escapeExpression(((helper = (helper = helpers.currentMonth || (depth0 != null ? depth0.currentMonth : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"currentMonth","hash":{},"data":data}) : helper)))
    + "    </div>\n\n    <div class=\"right menu\">\n      <div class=\"ui right aligned category search item\">\n        <div class=\"ui transparent icon input \">\n          <input class=\"prompt\" type=\"text\" placeholder=\"Search dates...\">\n          <i class=\"search link icon inverted\"></i>\n        </div>\n        <div class=\"results\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['indexTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "\n  <div class=\"main-index\">\n    <div class=\"shift-summaries\">\n      <div id=\"shift__earnings-summary\" class=\"shift__earnings-summary\">\n      </div>\n\n      <div class=\"hours-earnings header\">\n        <span>Type (Net)</span>\n        <span>Hours worked</span>\n        <span>Earning</span>\n      </div>\n\n    </div>\n\n    <div id=\"index-route-shifts-details\" class=\"index-route-shifts-details\">\n\n    </div>\n\n    <!-- LINK TO NEW SHIFT -->\n\n    <a id=\"new-shift-trigger\" class=\"new-shift-trigger\" data-off-line-link=\"true\" href=\""
    + container.escapeExpression(((helper = (helper = helpers.newShiftPath || (depth0 != null ? depth0.newShiftPath : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"newShiftPath","hash":{},"data":data}) : helper)))
    + "\">\n      <span class=\"\">&plus;</span>\n    </a>\n\n    <!-- /LINK TO NEW SHIFT -->\n\n  </div>\n";
},"useData":true});
templates['newShiftConfirmSubmitButtonsTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui buttons\">\n  <button id=\"new-shift-confirm__submit\" type=\"button\" class=\"ui positive button new-shift-confirm__submit\">\n    Save\n  </button>\n\n  <div class=\"or\"></div>\n\n  <button id=\"new-shift-confirm__edit\" type=\"button\" class=\"ui button new-shift-confirm__edit\">\n    Edit\n  </button>\n</div>\n";
},"useData":true});
templates['newShiftConfirmTemplate'] = template({"1":function(container,depth0,helpers,partials,data) {
    return " Please Confirm Before Saving! ";
},"3":function(container,depth0,helpers,partials,data) {
    return " Congrats! Successfully Saved 😃😃 ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, alias4=helpers.helperMissing;

  return "<div class=\"new-shift-confirm\">\n\n  <div class=\"ui top label new-shift-confirm__header\">\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.saving : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  </div>\n  <!-- META INFO -->\n  <div class=\"ui top attached segment new-shift-confirm__segment new-shift-confirm__segment--meta\">\n    <div class=\"ui top attached label\">\n      Meta\n    </div>\n\n    <div class=\"new-shift-confirm__detail--meta new-shift-confirm__detail\">\n      <div class=\"new-shift-confirm__detail__item new-shift-confirm__detail__item--wage\">\n        <div class=\"new-shift-confirm__detail__title\">Wage</div>\n        <div>&euro; "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.payPerHr : stack1), depth0))
    + " /hr</div>\n      </div>\n\n      <div class=\"new-shift-confirm__detail__item new-shift-confirm__detail__item--break\">\n        <div class=\"new-shift-confirm__detail__title\">Break</div>\n        <div>"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.breakTimeSecs : stack1), depth0))
    + " min</div>\n      </div>\n\n      <div class=\"new-shift-confirm__detail__item new-shift-confirm__detail__item--night-suppl-pay-pct\">\n        <div class=\"new-shift-confirm__detail__title\">Add. Night Pay</div>\n        <div> "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.nightSupplPayPct : stack1), depth0))
    + " &percnt;</div>\n      </div>\n\n      <div class=\"new-shift-confirm__detail__item new-shift-confirm__detail__item--sunday-suppl-pay-pct\">\n        <div class=\"new-shift-confirm__detail__title\">Add. Sunday Pay</div>\n        <div> "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.sundaySupplPayPct : stack1), depth0))
    + " &percnt;</div>\n      </div>\n    </div>\n  </div>\n  <!-- /META INFO -->\n\n  <!-- DATE AND TIMES -->\n  <div class=\"ui top attached segment new-shift__date\">\n    <div class=\"ui top attached label\">\n      Date and times\n    </div>\n\n    <div id=\"new-shift-confirm__detail--date\" class=\"new-shift-confirm__detail new-shift-confirm__detail--date\">\n      <div class=\"new-shift-confirm__detail__item new-shift-confirm__detail__item--date\">\n        <div class=\"new-shift-confirm__detail__title\">Date</div>\n        <div>"
    + alias3((helpers.formatWeekDayMonthNumMonthNameYear || (depth0 && depth0.formatWeekDayMonthNumMonthNameYear) || alias4).call(alias1,((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.date : stack1),{"name":"formatWeekDayMonthNumMonthNameYear","hash":{},"data":data}))
    + "</div>\n      </div>\n\n      <div class=\"new-shift-confirm__detail__item new-shift-confirm__detail__item--start-time\">\n        <div class=\"new-shift-confirm__detail__title\">Start Time</div>\n        <div>"
    + alias3((helpers.formatTimeAmPm || (depth0 && depth0.formatTimeAmPm) || alias4).call(alias1,((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.startTime : stack1),{"name":"formatTimeAmPm","hash":{},"data":data}))
    + "</div>\n      </div>\n\n      <div class=\"new-shift-confirm__detail__item new-shift-confirm__detail__item--end-time\">\n        <div class=\"new-shift-confirm__detail__title\">End Time</div>\n        <div>"
    + alias3((helpers.formatTimeAmPm || (depth0 && depth0.formatTimeAmPm) || alias4).call(alias1,((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.endTime : stack1),{"name":"formatTimeAmPm","hash":{},"data":data}))
    + "</div>\n      </div>\n    </div>\n  </div>\n  <!-- /DATE AND TIMES -->\n\n  <div class=\"new-shift-confirm__buttons\">\n    "
    + ((stack1 = ((helper = (helper = helpers.buttons || (depth0 != null ? depth0.buttons : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias1,{"name":"buttons","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n  </div>\n</div>\n";
},"useData":true});
templates['newShiftDateTemplate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "              <option value=\""
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" "
    + alias4(((helper = (helper = helpers.selected || (depth0 != null ? depth0.selected : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"selected","hash":{},"data":data}) : helper)))
    + ">\n                "
    + alias4(((helper = (helper = helpers.display || (depth0 != null ? depth0.display : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"display","hash":{},"data":data}) : helper)))
    + "\n              </option>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "              <option value=\""
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" "
    + alias4(((helper = (helper = helpers.selected || (depth0 != null ? depth0.selected : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"selected","hash":{},"data":data}) : helper)))
    + ">\n                "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\n              </option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div>\n  <select name=\"dayOfMonth\" id=\"day-of-month\" class=\"ui search dropdown\">\n    <option value=\"\">Day</option>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.daysOfMonth : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </select>\n\n  <div class=\"new-shift-form__error form__error hidden\"></div>\n</div>\n\n<div>\n  <select name=\"monthOfYear\" id=\"month-of-year\" class=\"ui search dropdown\">\n    <option value=\"\">Month</option>\n\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.monthOfYear : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </select>\n\n  <div class=\"new-shift-form__error form__error hidden\"></div>\n</div>\n\n<div>\n  <select name=\"year\" id=\"year\" class=\"ui search dropdown\">\n    <option value=\"\">Year</option>\n\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.years : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </select>\n\n  <div class=\"new-shift-form__error form__error hidden\"></div>\n</div>\n";
},"useData":true});
templates['newShiftMenuTemplate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.goBackUrl || (depth0 != null ? depth0.goBackUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"goBackUrl","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "/";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"ui inverted menu shift-route-menu \">\n  <div class=\"ui container\">\n    <a id=\"go-back-from-shift-route\" class=\"item\" href=\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.goBackUrl : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n      <i class=\"arrow left icon\"></i>\n    </a>\n\n    <div class=\"item shift-route-menu__title\">\n      Create New Shift\n    </div>\n\n    <div class=\"right menu\">\n      <div class=\"ui right aligned category search item\">\n        <div class=\"ui transparent icon input \">\n          <input class=\"prompt\" type=\"text\" placeholder=\"Search dates...\">\n          <i class=\"search link icon inverted\"></i>\n        </div>\n        <div class=\"results\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['newShiftMetasSelectTemplate'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "        <option value=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.id : stack1), depth0))
    + "\" "
    + alias2(((helper = (helper = helpers.selected || (depth0 != null ? depth0.selected : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"selected","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + " data-value=\""
    + alias2((helpers.jsonStringify || (depth0 && depth0.jsonStringify) || alias4).call(alias3,blockParams[0][0],{"name":"jsonStringify","hash":{},"data":data,"blockParams":blockParams}))
    + "\">\n          "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.breakTimeSecs : stack1), depth0))
    + " min | &euro; "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.payPerHr : stack1), depth0))
    + " night: "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.nightSupplPayPct : stack1), depth0))
    + " &percnt; sunday: "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.sundaySupplPayPct : stack1), depth0))
    + "\n          &percnt;\n        </option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "<option value=\"\">-----</option>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.metas : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
templates['newShiftTemplate'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "        <option value=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.id : stack1), depth0))
    + "\" "
    + alias2(((helper = (helper = helpers.selected || (depth0 != null ? depth0.selected : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"selected","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + " data-value=\""
    + alias2((helpers.jsonStringify || (depth0 && depth0.jsonStringify) || alias4).call(alias3,blockParams[0][0],{"name":"jsonStringify","hash":{},"data":data,"blockParams":blockParams}))
    + "\">\n          "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.breakTimeSecs : stack1), depth0))
    + " min | &euro; "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.payPerHr : stack1), depth0))
    + " night: "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.nightSupplPayPct : stack1), depth0))
    + " &percnt; sunday: "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.sundaySupplPayPct : stack1), depth0))
    + "\n          &percnt;\n        </option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"new-shift-main\">\n  <form id=\"new-shift-form\" class=\"ui form new-shift-form\">\n    <div id=\"new-shift-form__error-main\" class=\"ui negative message hidden new-shift-form__error-main\">\n    </div>\n\n    <!-- SELECT OR CREATE META -->\n    <div class=\"ui top attached segment form__field select-meta\">\n      <div class=\"ui top attached label\">\n        Select Meta or create new.\n      </div>\n\n      <div class=\"meta-id ui right labeled input\">\n        <select name=\"metaId\" id=\"select-meta\" class=\"ui search dropdown fluid\">\n<option value=\"\">-----</option>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.metas : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "        </select>\n\n        <div id=\"show-new-meta-form-button\" class=\"ui label\">\n          <i class=\"plus icon\"></i>\n        </div>\n      </div>\n\n      <div class=\"new-shift-form__error form__error hidden\"></div>\n      <input type=\"hidden\" id=\"metaId-default\" value=\"\">\n    </div>\n    <!-- /SELECT OR CREATE META -->\n\n    <!-- SHIFT DATE -->\n    <div class=\"ui top attached segment date-segment form__field\">\n      <div class=\"ui top attached label\">\n        Date\n      </div>\n\n      <div id=\"new-shift-form-date-segment-template\" class=\"new-shift-form__fields three\">\n              "
    + ((stack1 = ((helper = (helper = helpers.dateHtml || (depth0 != null ? depth0.dateHtml : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"dateHtml","hash":{},"data":data,"blockParams":blockParams}) : helper))) != null ? stack1 : "")
    + "\n      </div>\n    </div>\n    <!-- /SHIFT DATE -->\n\n    <!-- START TIME -->\n    <div class=\"ui top attached segment start-time-segment form__field\">\n      <div class=\"ui top attached label\">\n        Start time\n      </div>\n\n      <div class=\"new-shift-form__fields two\">\n        <div>\n          <input name=\"startTimeHr\" id=\"start-time-hour\" name=\"start-time-hour\" type=\"number\" min=\"0\" max=\"23\" placeholder=\"HH\" autocomplete=\"off\"\n            maxlength=\"2\">\n\n          <div class=\"new-shift-form__error form__error hidden\"></div>\n        </div>\n\n        <div>\n          <input name=\"startTimeMin\" id=\"start-time-min\" name=\"start-time-min\" type=\"number\" min=\"0\" max=\"59\" placeholder=\"MM\" autocomplete=\"off\"\n            maxlength=\"2\">\n\n          <div class=\"new-shift-form__error form__error hidden\"></div>\n        </div>\n      </div>\n    </div>\n    <!-- /START TIME -->\n\n    <!-- END TIME -->\n    <div class=\"ui top attached segment end-time-segment form__field\">\n      <div class=\"ui top attached label\">\n        End time\n      </div>\n\n      <div class=\"new-shift-form__fields two\">\n        <div>\n\n          <input name=\"endTimeHr\" id=\"end-time-hour\" name=\"end-time-hour\" type=\"number\" min=\"0\" max=\"23\" placeholder=\"HH\" autocomplete=\"off\"\n            maxlength=\"2\">\n\n          <div class=\"new-shift-form__error form__error hidden\"></div>\n        </div>\n\n        <div>\n          <input name=\"endTimeMin\" id=\"end-time-min\" name=\"end-time-min\" type=\"number\" min=\"0\" max=\"59\" placeholder=\"MM\" autocomplete=\"off\"\n            maxlength=\"2\">\n\n          <div class=\"new-shift-form__error form__error hidden\"></div>\n        </div>\n      </div>\n    </div>\n    <!-- /END TIME -->\n\n    <div class=\"new-shift-form__buttons\">\n      <div class=\"ui buttons\">\n        <button id=\"new-shift-form-submit\" type=\"submit\" class=\"ui positive button\">\n          Save\n        </button>\n\n        <div class=\"or\"></div>\n\n        <button id=\"new-shift-form-reset\" type=\"button\" class=\"ui button\">\n          Reset\n        </button>\n      </div>\n    </div>\n  </form>\n</div>\n";
},"useData":true,"useBlockParams":true});
templates['shiftDetailTemplate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "    <div class=\"shift-detail-row\">\n      <div class=\"date-times\">\n        <span>\n"
    + alias3((helpers.formatWeekDayMonthNum || (depth0 && depth0.formatWeekDayMonthNum) || alias2).call(alias1,(depth0 != null ? depth0.date : depth0),{"name":"formatWeekDayMonthNum","hash":{},"data":data}))
    + "        </span>\n\n        <div class=\"times\">\n          <span>\n"
    + alias3((helpers.truncateString || (depth0 && depth0.truncateString) || alias2).call(alias1,(depth0 != null ? depth0.startTime : depth0),{"name":"truncateString","hash":{},"data":data}))
    + "          </span>\n          -\n          <span>\n"
    + alias3((helpers.truncateString || (depth0 && depth0.truncateString) || alias2).call(alias1,(depth0 != null ? depth0.endTime : depth0),{"name":"truncateString","hash":{},"data":data}))
    + "          </span>\n        </div>\n\n        <span>\n          "
    + alias3(((helper = (helper = helpers.hoursGross || (depth0 != null ? depth0.hoursGross : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"hoursGross","hash":{},"data":data}) : helper)))
    + " hours &nbsp;&nbsp; (gross)\n        </span>\n      </div>\n\n      <div class=\"hours-earnings-container\">\n        <div class=\"hours-earnings detail\">\n          <span>Shift</span>\n          <span>\n"
    + alias3(((helper = (helper = helpers.normalHours || (depth0 != null ? depth0.normalHours : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"normalHours","hash":{},"data":data}) : helper)))
    + "          </span>\n          <span>&euro;\n"
    + alias3(((helper = (helper = helpers.normalPay || (depth0 != null ? depth0.normalPay : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"normalPay","hash":{},"data":data}) : helper)))
    + "          </span>\n        </div>\n\n        <div class=\"hours-earnings detail\">\n          <span>Night</span>\n          <span>\n"
    + alias3(((helper = (helper = helpers.nightHours || (depth0 != null ? depth0.nightHours : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"nightHours","hash":{},"data":data}) : helper)))
    + "          </span>\n          <span>&euro;\n"
    + alias3(((helper = (helper = helpers.nightSupplPay || (depth0 != null ? depth0.nightSupplPay : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"nightSupplPay","hash":{},"data":data}) : helper)))
    + "          </span>\n        </div>\n\n        <div class=\"hours-earnings detail\">\n          <span>Sunday</span>\n          <span>\n"
    + alias3(((helper = (helper = helpers.sundayHours || (depth0 != null ? depth0.sundayHours : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"sundayHours","hash":{},"data":data}) : helper)))
    + "          </span>\n          <span>&euro;\n"
    + alias3(((helper = (helper = helpers.sundaySupplPay || (depth0 != null ? depth0.sundaySupplPay : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"sundaySupplPay","hash":{},"data":data}) : helper)))
    + "          </span>\n        </div>\n      </div>\n\n      <div class=\"total-earning\"> Total: &euro;\n"
    + alias3(((helper = (helper = helpers.totalPay || (depth0 != null ? depth0.totalPay : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"totalPay","hash":{},"data":data}) : helper)))
    + "      </div>\n\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.shifts : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['shiftEarningSummaryTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span id=\"earnings-summary__label\" class=\"earnings-summary__label\">\n  Total Earnings &nbsp; &nbsp;\n"
    + alias4(((helper = (helper = helpers.currentMonthYear || (depth0 != null ? depth0.currentMonthYear : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentMonthYear","hash":{},"data":data}) : helper)))
    + "</span>\n\n<span class=\"earnings-summary__amount\">\n  &euro;\n"
    + alias4(((helper = (helper = helpers.totalEarnings || (depth0 != null ? depth0.totalEarnings : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalEarnings","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"useData":true});
})();