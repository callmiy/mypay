(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['appShellTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"utf-8\">\n\n  <link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"/favicon/apple-icon-57x57.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"60x60\" href=\"/favicon/apple-icon-60x60.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"/favicon/apple-icon-72x72.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"/favicon/apple-icon-76x76.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"/favicon/apple-icon-114x114.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"/favicon/apple-icon-120x120.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"/favicon/apple-icon-144x144.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"/favicon/apple-icon-152x152.png\">\n  <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/favicon/apple-icon-180x180.png\">\n\n  <link rel=\"icon\" type=\"image/png\" sizes=\"192x192\" href=\"/favicon/android-icon-192x192.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"512x512\" href=\"/favicon/android-icon-512x512.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"36x36\" href=\"/favicon/android-icon-36x36.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"48x48\" href=\"/favicon/android-icon-48x48.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"72x72\" href=\"/favicon/android-icon-72x72.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"/favicon/android-icon-96x96.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"144x144\" href=\"/favicon/android-icon-144x144.png\">\n\n  <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/favicon/favicon-32x32.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"/favicon/favicon-96x96.png\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/favicon/favicon-16x16.png\">\n\n  <link rel=\"icon\" type=\"image/x-icon\" href=\"/favicon/favicon.ico\">\n\n  <link rel=\"manifest\" href=\"/favicon/manifest.json\">\n  <meta name=\"msapplication-TileColor\" content=\"#21ba45\">\n  <meta name=\"msapplication-TileImage\" content=\"/ms-icon-144x144.png\">\n  <meta name=\"theme-color\" content=\"#21ba45\">\n\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <meta name=\"description\" content=\"wages shift work clocks clock wage pay salary\">\n\n\n  <title>\n"
    + container.escapeExpression(((helper = (helper = helpers.pageTitle || (depth0 != null ? depth0.pageTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageTitle","hash":{},"data":data}) : helper)))
    + "  </title>\n\n"
    + ((stack1 = ((helper = (helper = helpers.mainCss || (depth0 != null ? depth0.mainCss : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mainCss","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "    \n\n"
    + ((stack1 = ((helper = (helper = helpers.pageMainCss || (depth0 != null ? depth0.pageMainCss : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageMainCss","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "          "
    + ((stack1 = ((helper = (helper = helpers.pageOtherCss || (depth0 != null ? depth0.pageOtherCss : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageOtherCss","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n\n\n\n</head>\n\n<body>\n\n  <!-- MAIN CHILD TEMPLATE INSERT -->\n  <main role=\"main\" class=\"app-container\">\n            "
    + ((stack1 = ((helper = (helper = helpers.pageMainContent || (depth0 != null ? depth0.pageMainContent : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageMainContent","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n  </main>\n  <!-- /MAIN CHILD TEMPLATE INSERT -->\n  <div class=\"insert-new-app-available-ui\" id=\"insert-new-app-available-ui\"></div>\n\n\n    <script> window.appInterface = {nsuNNSuenjsms3nsnn: 29234020301393939393}; </script>\n"
    + ((stack1 = ((helper = (helper = helpers.mainJs || (depth0 != null ? depth0.mainJs : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mainJs","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "      \n\n"
    + ((stack1 = ((helper = (helper = helpers.pageMainJs || (depth0 != null ? depth0.pageMainJs : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageMainJs","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "            "
    + ((stack1 = ((helper = (helper = helpers.pageOtherJs || (depth0 != null ? depth0.pageOtherJs : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageOtherJs","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n</body>\n\n</html>\n";
},"useData":true});
templates['indexMenuTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui inverted menu index-route-menu \">\n  <div class=\"ui container\">\n    <a id=\"sidebar-trigger\" class=\"item\">\n      <i class=\"content icon\"></i>\n    </a>\n\n    <div id=\"index-route-menu__title\" class=\"item index-route-menu__title\">\n    </div>\n\n    <div class=\"right menu\">\n      <div class=\"ui right aligned category search item\">\n        <div class=\"ui transparent icon input \">\n          <input class=\"prompt\" type=\"text\" placeholder=\"Search dates...\">\n          <i class=\"search link icon inverted\"></i>\n        </div>\n        <div class=\"results\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['indexTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"main-index\">\n"
    + ((stack1 = container.invokePartial(partials.indexMenuTemplate,depth0,{"name":"indexMenuTemplate","data":data,"indent":" ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n          <div id=\"shifts-for-months\" class=\"shifts-for-months\">\n          </div>\n\n          <!-- LINK TO NEW SHIFT -->\n          <a id=\"new-shift-trigger\" class=\"new-shift-trigger\" data-off-line-link=\"true\" href=\""
    + container.escapeExpression(((helper = (helper = helpers.newShiftPath || (depth0 != null ? depth0.newShiftPath : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"newShiftPath","hash":{},"data":data}) : helper)))
    + "\">\n            <span class=\"\">&plus;</span>\n          </a>\n          <!-- /LINK TO NEW SHIFT -->\n</div>\n";
},"usePartial":true,"useData":true});
templates['modalTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div id=\"body-modal-dimmer\" class=\"ui dimmer modal page transition body-modal-dimmer body-modal-dismisser animating visible active\">\n  <div class=\"ui modal transition animating visible active\">\n    <div id=\"body-modal-content\" class=\"content\">"
    + ((stack1 = ((helper = (helper = helpers.modalContent || (depth0 != null ? depth0.modalContent : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"modalContent","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n    <div class=\"actions\">\n      <div class=\"ui cancel button body-modal-dismisser animating visible active\">\n        Dismiss\n      </div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['newMetaFormTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form id=\"new-meta-form\" class=\"ui form new-meta-form\">\n  <div id=\"new-meta-form__error-main\" class=\"ui negative message hidden new-meta-form__error-main\">\n  </div>\n\n  <div class=\"new-meta-form__fields\">\n    <div class=\"new-meta-form__field form__field\">\n      <label class=\"new-meta-form__label\" for=\"break_time_secs\">\n        Break time\n      </label>\n\n      <div class=\"ui right labeled input new-meta-form__labeled_input\">\n        <input class=\"new-meta-form__control\" type=\"text\" placeholder=\"Break time\" name=\"breakTimeSecs\" autocomplete=\"off\">\n\n        <div class=\"ui label \">\n          <div class=\"text \"> min </div>\n        </div>\n      </div>\n\n      <div class=\"new-meta-form__error form__error hidden\"></div>\n    </div>\n    <div class=\"new-meta-form__field form__field\">\n      <label class=\"new-meta-form__label\" for=\"pay_per_hr\">\n        Pay per hour\n      </label>\n\n      <div class=\"ui left labeled input new-meta-form__labeled_input \">\n        <div class=\"ui label \">\n          <div class=\"text \"> &euro; </div>\n        </div>\n\n        <input class=\"new-meta-form__control\" type=\"text \" placeholder=\"Pay per hour\" name=\"payPerHr\" autocomplete=\"off\">\n      </div>\n\n      <div class=\"new-meta-form__error form__error hidden\"></div>\n    </div>\n  </div>\n\n  <div class=\"new-meta-form__fields\">\n    <div class=\"new-meta-form__field form__field\">\n      <label class=\"new-meta-form__label\" for=\"night_suppl_pay_pct\">\n        Night Suppl.\n      </label>\n\n      <div class=\"ui right labeled input new-meta-form__labeled_input \">\n        <input class=\"new-meta-form__control\" type=\"text \" placeholder=\"Night supplement pay percnt\" name=\"nightSupplPayPct\" autocomplete=\"off\">\n\n        <div class=\"ui label \">\n          <div class=\"text \"> &percnt; </div>\n        </div>\n      </div>\n\n      <div class=\"new-meta-form__error form__error hidden\"></div>\n    </div>\n\n    <div class=\"new-meta-form__field form__field\">\n      <label class=\"new-meta-form__label\" for=\"sunday_suppl_pay_pct\">\n        Sunday Suppl.\n      </label>\n\n      <div class=\"ui right labeled input new-meta-form__labeled_input \">\n        <input class=\"new-meta-form__control\" type=\"text \" placeholder=\"Sunday pay supplement %\" name=\"sundaySupplPayPct\" autocomplete=\"off\">\n\n        <div class=\"ui label \">\n          <div class=\"text \"> &percnt; </div>\n        </div>\n      </div>\n\n      <div class=\"new-meta-form__error form__error hidden\"></div>\n    </div>\n  </div>\n\n  <div class=\"new-meta-form__buttons\">\n    <div class=\"ui buttons\">\n      <button id=\"new-meta-form-submit\" type=\"button\" class=\"ui positive button\">\n        Save\n      </button>\n\n      <div class=\"or\"></div>\n\n      <button id=\"new-meta-form-reset\" type=\"button\" class=\"ui button\">\n        Reset\n      </button>\n    </div>\n  </div>\n</form>\n";
},"useData":true});
templates['newShiftConfirmSubmitButtonsTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui buttons\">\n  <button id=\"new-shift-confirm__submit\" type=\"button\" class=\"ui positive button new-shift-confirm__submit\">\n    Save\n  </button>\n\n  <div class=\"or\"></div>\n\n  <button id=\"new-shift-confirm__edit\" type=\"button\" class=\"ui button new-shift-confirm__edit\">\n    Edit\n  </button>\n</div>\n";
},"useData":true});
templates['newShiftConfirmTemplate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.topMessage || (depth0 != null ? depth0.topMessage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"topMessage","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"3":function(container,depth0,helpers,partials,data) {
    return " Please Confirm Before Saving! ";
},"5":function(container,depth0,helpers,partials,data) {
    return " Congrats! Successfully Saved 😃😃 ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, alias4=helpers.helperMissing;

  return "<div class=\"new-shift-confirm\">\n\n  "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.topMessage : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n  <div class=\"ui top label new-shift-confirm__header\">\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.saving : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
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

  return "<div class=\"ui inverted menu new-shift-route-menu \">\n  <div class=\"ui container\">\n    <a id=\"go-back-from-shift-route\" class=\"item\" href=\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.goBackUrl : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n      <i class=\"arrow left icon\"></i>\n    </a>\n\n    <div class=\"item new-shift-route-menu__title\">\n      Create New Shift\n    </div>\n\n    <div class=\"right menu\">\n      <div class=\"ui right aligned category search item\">\n        <div class=\"ui transparent icon input \">\n          <input class=\"prompt\" type=\"text\" placeholder=\"Search dates...\">\n          <i class=\"search link icon inverted\"></i>\n        </div>\n        <div class=\"results\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n";
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

  return "<div class=\"new-shift-main\">\n"
    + ((stack1 = container.invokePartial(partials.newShiftMenuTemplate,depth0,{"name":"newShiftMenuTemplate","data":data,"blockParams":blockParams,"indent":" ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n          <form id=\"new-shift-form\" class=\"ui form new-shift-form\">\n            <div id=\"new-shift-form__error-main\" class=\"ui negative message hidden new-shift-form__error-main\">\n            </div>\n\n            <!-- SELECT OR CREATE META -->\n            <div class=\"ui top attached segment form__field select-meta\">\n              <div class=\"ui top attached label\">\n                Select Meta or create new.\n              </div>\n\n              <div class=\"meta-id ui right labeled input\">\n                <select name=\"metaId\" id=\"select-meta\" class=\"ui search dropdown fluid\">\n<option value=\"\">-----</option>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.metas : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                </select>\n\n                <div id=\"show-new-meta-form-button\" class=\"ui label form__show-new-meta-form-button\">\n                  <i class=\"plus icon\"></i>\n                </div>\n              </div>\n\n              <div class=\"new-shift-form__error form__error hidden\"></div>\n              <input type=\"hidden\" id=\"metaId-default\" value=\"\">\n            </div>\n            <!-- /SELECT OR CREATE META -->\n\n            <!-- SHIFT DATE -->\n            <div class=\"ui top attached segment date-segment form__field\">\n              <div class=\"ui top attached label\">\n                Date\n              </div>\n\n              <div id=\"new-shift-form-date-segment-template\" class=\"new-shift-form__fields three\">\n                      "
    + ((stack1 = ((helper = (helper = helpers.dateHtml || (depth0 != null ? depth0.dateHtml : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"dateHtml","hash":{},"data":data,"blockParams":blockParams}) : helper))) != null ? stack1 : "")
    + "\n              </div>\n            </div>\n            <!-- /SHIFT DATE -->\n\n            <!-- START TIME -->\n            <div class=\"ui top attached segment start-time-segment form__field\">\n              <div class=\"ui top attached label\">\n                Start time\n              </div>\n\n              <div class=\"new-shift-form__fields two\">\n                <div>\n                  <input name=\"startTimeHr\" id=\"start-time-hour\" name=\"start-time-hour\" type=\"number\" min=\"0\" max=\"23\" placeholder=\"HH\" autocomplete=\"off\"\n                    maxlength=\"2\">\n\n                  <div class=\"new-shift-form__error form__error hidden\"></div>\n                </div>\n\n                <div>\n                  <input name=\"startTimeMin\" id=\"start-time-min\" name=\"start-time-min\" type=\"number\" min=\"0\" max=\"59\" placeholder=\"MM\" autocomplete=\"off\"\n                    maxlength=\"2\">\n\n                  <div class=\"new-shift-form__error form__error hidden\"></div>\n                </div>\n              </div>\n            </div>\n            <!-- /START TIME -->\n\n            <!-- END TIME -->\n            <div class=\"ui top attached segment end-time-segment form__field\">\n              <div class=\"ui top attached label\">\n                End time\n              </div>\n\n              <div class=\"new-shift-form__fields two\">\n                <div>\n\n                  <input name=\"endTimeHr\" id=\"end-time-hour\" name=\"end-time-hour\" type=\"number\" min=\"0\" max=\"23\" placeholder=\"HH\" autocomplete=\"off\"\n                    maxlength=\"2\">\n\n                  <div class=\"new-shift-form__error form__error hidden\"></div>\n                </div>\n\n                <div>\n                  <input name=\"endTimeMin\" id=\"end-time-min\" name=\"end-time-min\" type=\"number\" min=\"0\" max=\"59\" placeholder=\"MM\" autocomplete=\"off\"\n                    maxlength=\"2\">\n\n                  <div class=\"new-shift-form__error form__error hidden\"></div>\n                </div>\n              </div>\n            </div>\n            <!-- /END TIME -->\n\n            <div class=\"new-shift-form__buttons\">\n              <div class=\"ui buttons\">\n                <button id=\"new-shift-form-submit\" type=\"submit\" class=\"ui positive button\">\n                  Save\n                </button>\n\n                <div class=\"or\"></div>\n\n                <button id=\"new-shift-form-reset\" type=\"button\" class=\"ui button\">\n                  Reset\n                </button>\n              </div>\n            </div>\n          </form>\n</div>\n";
},"usePartial":true,"useData":true,"useBlockParams":true});
templates['shiftDetailTemplate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.id : stack1), depth0));
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1._id : stack1), depth0));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "  \n\n\n      <div id=\"shift-detail-row-"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.id : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\" class=\"shift-detail-row\" data-value=\""
    + container.escapeExpression((helpers.jsonStringify || (depth0 && depth0.jsonStringify) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.shift : depth0),{"name":"jsonStringify","hash":{},"data":data}))
    + "\">\n"
    + ((stack1 = container.invokePartial(partials.shiftDetailRowTemplate,depth0,{"name":"shiftDetailRowTemplate","hash":{"shift":(depth0 != null ? depth0.shift : depth0)},"data":data,"indent":"              ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "      </div>\n";
},"usePartial":true,"useData":true});
templates['shiftsForMonthTemplate'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "  <div class=\"shift-row\">\n    <div class=\"shift-summaries\">\n      <div id=\"shift__earnings-summary\" class=\"shift__earnings-summary\">\n"
    + ((stack1 = container.invokePartial(partials.shiftSummaryTemplate,depth0,{"name":"shiftSummaryTemplate","hash":{"summary":((stack1 = blockParams[0][0]) != null ? stack1.summary : stack1)},"data":data,"blockParams":blockParams,"indent":"              ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "      </div>\n\n      <div class=\"hours-earnings header\">\n        <span>Type</span>\n        <span>Hours</span>\n        <span>Earning</span>\n      </div>\n\n    </div>\n\n    <div id=\"index-route-shifts-details\" class=\"index-route-shifts-details\">\n                "
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = blockParams[0][0]) != null ? stack1.shifts : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n    </div>\n  </div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return " "
    + ((stack1 = container.invokePartial(partials.shiftDetailTemplate,depth0,{"name":"shiftDetailTemplate","hash":{"shift":blockParams[0][0]},"data":data,"blockParams":blockParams,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.shiftsData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useBlockParams":true});
templates['partials/newShiftMenuTemplate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.goBackUrl || (depth0 != null ? depth0.goBackUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"goBackUrl","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "/";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"ui inverted menu new-shift-route-menu \">\n  <div class=\"ui container\">\n    <a id=\"go-back-from-shift-route\" class=\"item\" href=\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.goBackUrl : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n      <i class=\"arrow left icon\"></i>\n    </a>\n\n    <div class=\"item new-shift-route-menu__title\">\n      Create New Shift\n    </div>\n\n    <div class=\"right menu\">\n      <div class=\"ui right aligned category search item\">\n        <div class=\"ui transparent icon input \">\n          <input class=\"prompt\" type=\"text\" placeholder=\"Search dates...\">\n          <i class=\"search link icon inverted\"></i>\n        </div>\n        <div class=\"results\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['partials/shiftDetailRowTemplate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " ("
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.hoursGross : stack1), depth0))
    + " hrs) ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "  <input type=\"hidden\" style=\"display: none\" id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n  <div class=\"date-times\">\n    <span>\n"
    + alias2((helpers.formatWeekDayMonthNum || (depth0 && depth0.formatWeekDayMonthNum) || helpers.helperMissing).call(alias3,((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.date : stack1),{"name":"formatWeekDayMonthNum","hash":{},"data":data}))
    + "    </span>\n\n    <div class=\"times\">\n      <span>\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.startTime : stack1), depth0))
    + "      </span>\n      -\n      <span>\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.endTime : stack1), depth0))
    + "      </span>\n    </div>\n\n    <span>\n            "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.hoursGross : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </span>\n  </div>\n\n  <div class=\"hours-earnings-container\">\n    <div class=\"hours-earnings detail\">\n      <span>Normal</span>\n      <span>\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.normalHours : stack1), depth0))
    + "      </span>\n      <span>&euro;\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.normalPay : stack1), depth0))
    + "      </span>\n    </div>\n\n    <div class=\"hours-earnings detail\">\n      <span>Night</span>\n      <span>\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.nightHours : stack1), depth0))
    + "      </span>\n      <span>&euro;\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.nightSupplPay : stack1), depth0))
    + "      </span>\n    </div>\n\n    <div class=\"hours-earnings detail\">\n      <span>Sunday</span>\n      <span>\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.sundayHours : stack1), depth0))
    + "      </span>\n      <span>&euro;\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.sundaySupplPay : stack1), depth0))
    + "      </span>\n    </div>\n  </div>\n\n  <div class=\"total-earning\"> Total: &euro;\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.shift : depth0)) != null ? stack1.totalPay : stack1), depth0))
    + "  </div>\n";
},"useData":true});
templates['partials/shiftSummaryTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<span id=\"earnings-summary__label\" class=\"earnings-summary__label\">\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.date : stack1), depth0))
    + "    &nbsp;&nbsp;&nbsp;&nbsp; &euro;\n    <span class=\"earnings-summary__earnings\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.totalEarnings : stack1), depth0))
    + "</span>\n    &nbsp;&nbsp; / &nbsp;&nbsp;\n    <span class=\"earnings-summary__hours\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.totalNormalHours : stack1), depth0))
    + "</span> hours\n</span>\n";
},"useData":true});
})();