!function(){var n=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e.appShellTemplate=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){var l,s,r=null!=e?e:n.nullContext||{},o=a.helperMissing,d="function";return'<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="utf-8">\n\n  <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png">\n  <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png">\n  <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png">\n  <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png">\n  <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png">\n  <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png">\n  <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png">\n  <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png">\n  <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png">\n\n  <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png">\n  <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-icon-512x512.png">\n  <link rel="icon" type="image/png" sizes="36x36" href="/favicon/android-icon-36x36.png">\n  <link rel="icon" type="image/png" sizes="48x48" href="/favicon/android-icon-48x48.png">\n  <link rel="icon" type="image/png" sizes="72x72" href="/favicon/android-icon-72x72.png">\n  <link rel="icon" type="image/png" sizes="96x96" href="/favicon/android-icon-96x96.png">\n  <link rel="icon" type="image/png" sizes="144x144" href="/favicon/android-icon-144x144.png">\n\n  <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">\n  <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png">\n  <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">\n\n  <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico">\n\n  <link rel="manifest" href="/favicon/manifest.json">\n  <meta name="msapplication-TileColor" content="#21ba45">\n  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">\n  <meta name="theme-color" content="#21ba45">\n\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="wages shift work clocks clock wage pay salary">\n\n\n  <title>\n'+n.escapeExpression((s=null!=(s=a.pageTitle||(null!=e?e.pageTitle:e))?s:o,typeof s===d?s.call(r,{name:"pageTitle",hash:{},data:t}):s))+"  </title>\n\n"+(null!=(s=null!=(s=a.mainCss||(null!=e?e.mainCss:e))?s:o,l=typeof s===d?s.call(r,{name:"mainCss",hash:{},data:t}):s)?l:"")+"    \n\n"+(null!=(s=null!=(s=a.pageMainCss||(null!=e?e.pageMainCss:e))?s:o,l=typeof s===d?s.call(r,{name:"pageMainCss",hash:{},data:t}):s)?l:"")+"          "+(null!=(s=null!=(s=a.pageOtherCss||(null!=e?e.pageOtherCss:e))?s:o,l=typeof s===d?s.call(r,{name:"pageOtherCss",hash:{},data:t}):s)?l:"")+'\n\n\n\n\n</head>\n\n<body>\n\n  \x3c!-- MAIN CHILD TEMPLATE INSERT --\x3e\n  <main role="main" class="app-container">\n            '+(null!=(s=null!=(s=a.pageMainContent||(null!=e?e.pageMainContent:e))?s:o,l=typeof s===d?s.call(r,{name:"pageMainContent",hash:{},data:t}):s)?l:"")+'\n  </main>\n  \x3c!-- /MAIN CHILD TEMPLATE INSERT --\x3e\n  <div class="insert-new-app-available-ui" id="insert-new-app-available-ui"></div>\n\n\n    <script> window.appInterface = {nsuNNSuenjsms3nsnn: 29234020301393939393}; <\/script>\n'+(null!=(s=null!=(s=a.mainJs||(null!=e?e.mainJs:e))?s:o,l=typeof s===d?s.call(r,{name:"mainJs",hash:{},data:t}):s)?l:"")+"      \n\n"+(null!=(s=null!=(s=a.pageMainJs||(null!=e?e.pageMainJs:e))?s:o,l=typeof s===d?s.call(r,{name:"pageMainJs",hash:{},data:t}):s)?l:"")+"            "+(null!=(s=null!=(s=a.pageOtherJs||(null!=e?e.pageOtherJs:e))?s:o,l=typeof s===d?s.call(r,{name:"pageOtherJs",hash:{},data:t}):s)?l:"")+"\n\n</body>\n\n</html>\n"},useData:!0}),e.indexMenuTemplate=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){return'<div class="ui inverted menu index-route-menu ">\n  <div class="ui container">\n    <a id="sidebar-trigger" class="item">\n      <i class="content icon"></i>\n    </a>\n\n    <div id="index-route-menu__title" class="item index-route-menu__title">\n    </div>\n\n    <div class="right menu">\n      <div class="ui right aligned category search item">\n        <div class="ui transparent icon input ">\n          <input class="prompt" type="text" placeholder="Search dates...">\n          <i class="search link icon inverted"></i>\n        </div>\n        <div class="results"></div>\n      </div>\n    </div>\n  </div>\n</div>\n'},useData:!0}),e.indexTemplate=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){var l,s;return'<div class="main-index">\n'+(null!=(l=n.invokePartial(i.indexMenuTemplate,e,{name:"indexMenuTemplate",data:t,indent:" ",helpers:a,partials:i,decorators:n.decorators}))?l:"")+'\n          <div id="shifts-for-months" class="shifts-for-months">\n          </div>\n\n          \x3c!-- LINK TO NEW SHIFT --\x3e\n          <a id="new-shift-trigger" class="new-shift-trigger" data-off-line-link="true" href="'+n.escapeExpression((s=null!=(s=a.newShiftPath||(null!=e?e.newShiftPath:e))?s:a.helperMissing,"function"==typeof s?s.call(null!=e?e:n.nullContext||{},{name:"newShiftPath",hash:{},data:t}):s))+'">\n            <span class="">&plus;</span>\n          </a>\n          \x3c!-- /LINK TO NEW SHIFT --\x3e\n</div>\n'},usePartial:!0,useData:!0}),e.modalTemplate=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){var l,s;return'<div id="body-modal-dimmer" class="ui dimmer modal page transition body-modal-dimmer body-modal-dismisser animating visible active">\n  <div class="ui modal transition animating visible active">\n    <div id="body-modal-content" class="content">'+(null!=(s=null!=(s=a.modalContent||(null!=e?e.modalContent:e))?s:a.helperMissing,l="function"==typeof s?s.call(null!=e?e:n.nullContext||{},{name:"modalContent",hash:{},data:t}):s)?l:"")+'</div>\n    <div class="actions">\n      <div class="ui cancel button body-modal-dismisser animating visible active">\n        Dismiss\n      </div>\n    </div>\n  </div>\n</div>\n'},useData:!0}),e.newMetaFormTemplate=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){return'<form id="new-meta-form" class="ui form new-meta-form">\n  <div id="new-meta-form__error-main" class="ui negative message hidden new-meta-form__error-main">\n  </div>\n\n  <div class="new-meta-form__fields">\n    <div class="new-meta-form__field form__field">\n      <label class="new-meta-form__label" for="break_time_secs">\n        Break time\n      </label>\n\n      <div class="ui right labeled input new-meta-form__labeled_input">\n        <input class="new-meta-form__control" type="text" placeholder="Break time" name="breakTimeSecs" autocomplete="off">\n\n        <div class="ui label ">\n          <div class="text "> min </div>\n        </div>\n      </div>\n\n      <div class="new-meta-form__error form__error hidden"></div>\n    </div>\n    <div class="new-meta-form__field form__field">\n      <label class="new-meta-form__label" for="pay_per_hr">\n        Pay per hour\n      </label>\n\n      <div class="ui left labeled input new-meta-form__labeled_input ">\n        <div class="ui label ">\n          <div class="text "> &euro; </div>\n        </div>\n\n        <input class="new-meta-form__control" type="text " placeholder="Pay per hour" name="payPerHr" autocomplete="off">\n      </div>\n\n      <div class="new-meta-form__error form__error hidden"></div>\n    </div>\n  </div>\n\n  <div class="new-meta-form__fields">\n    <div class="new-meta-form__field form__field">\n      <label class="new-meta-form__label" for="night_suppl_pay_pct">\n        Night Suppl.\n      </label>\n\n      <div class="ui right labeled input new-meta-form__labeled_input ">\n        <input class="new-meta-form__control" type="text " placeholder="Night supplement pay percnt" name="nightSupplPayPct" autocomplete="off">\n\n        <div class="ui label ">\n          <div class="text "> &percnt; </div>\n        </div>\n      </div>\n\n      <div class="new-meta-form__error form__error hidden"></div>\n    </div>\n\n    <div class="new-meta-form__field form__field">\n      <label class="new-meta-form__label" for="sunday_suppl_pay_pct">\n        Sunday Suppl.\n      </label>\n\n      <div class="ui right labeled input new-meta-form__labeled_input ">\n        <input class="new-meta-form__control" type="text " placeholder="Sunday pay supplement %" name="sundaySupplPayPct" autocomplete="off">\n\n        <div class="ui label ">\n          <div class="text "> &percnt; </div>\n        </div>\n      </div>\n\n      <div class="new-meta-form__error form__error hidden"></div>\n    </div>\n  </div>\n\n  <div class="new-meta-form__buttons">\n    <div class="ui buttons">\n      <button id="new-meta-form-submit" type="button" class="ui positive button">\n        Save\n      </button>\n\n      <div class="or"></div>\n\n      <button id="new-meta-form-reset" type="button" class="ui button">\n        Reset\n      </button>\n    </div>\n  </div>\n</form>\n'},useData:!0}),e.newShiftConfirmSubmitButtonsTemplate=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){return'<div class="ui buttons">\n  <button id="new-shift-confirm__submit" type="button" class="ui positive button new-shift-confirm__submit">\n    Save\n  </button>\n\n  <div class="or"></div>\n\n  <button id="new-shift-confirm__edit" type="button" class="ui button new-shift-confirm__edit">\n    Edit\n  </button>\n</div>\n'},useData:!0}),e.newShiftConfirmTemplate=n({1:function(n,e,a,i,t){var l,s;return" "+(null!=(s=null!=(s=a.topMessage||(null!=e?e.topMessage:e))?s:a.helperMissing,l="function"==typeof s?s.call(null!=e?e:n.nullContext||{},{name:"topMessage",hash:{},data:t}):s)?l:"")+" "},3:function(n,e,a,i,t){return" Please Confirm Before Saving! "},5:function(n,e,a,i,t){return" Congrats! Successfully Saved 😃😃 "},compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){var l,s,r=null!=e?e:n.nullContext||{},o=n.lambda,d=n.escapeExpression,m=a.helperMissing;return'<div class="new-shift-confirm">\n\n  '+(null!=(l=a.if.call(r,null!=e?e.topMessage:e,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t}))?l:"")+'\n\n  <div class="ui top label new-shift-confirm__header">\n    '+(null!=(l=a.if.call(r,null!=e?e.saving:e,{name:"if",hash:{},fn:n.program(3,t,0),inverse:n.program(5,t,0),data:t}))?l:"")+'\n  </div>\n  \x3c!-- META INFO --\x3e\n  <div class="ui top attached segment new-shift-confirm__segment new-shift-confirm__segment--meta">\n    <div class="ui top attached label">\n      Meta\n    </div>\n\n    <div class="new-shift-confirm__detail--meta new-shift-confirm__detail">\n      <div class="new-shift-confirm__detail__item new-shift-confirm__detail__item--wage">\n        <div class="new-shift-confirm__detail__title">Wage</div>\n        <div>&euro; '+d(o(null!=(l=null!=e?e.meta:e)?l.payPerHr:l,e))+' /hr</div>\n      </div>\n\n      <div class="new-shift-confirm__detail__item new-shift-confirm__detail__item--break">\n        <div class="new-shift-confirm__detail__title">Break</div>\n        <div>'+d(o(null!=(l=null!=e?e.meta:e)?l.breakTimeSecs:l,e))+' min</div>\n      </div>\n\n      <div class="new-shift-confirm__detail__item new-shift-confirm__detail__item--night-suppl-pay-pct">\n        <div class="new-shift-confirm__detail__title">Add. Night Pay</div>\n        <div> '+d(o(null!=(l=null!=e?e.meta:e)?l.nightSupplPayPct:l,e))+' &percnt;</div>\n      </div>\n\n      <div class="new-shift-confirm__detail__item new-shift-confirm__detail__item--sunday-suppl-pay-pct">\n        <div class="new-shift-confirm__detail__title">Add. Sunday Pay</div>\n        <div> '+d(o(null!=(l=null!=e?e.meta:e)?l.sundaySupplPayPct:l,e))+' &percnt;</div>\n      </div>\n    </div>\n  </div>\n  \x3c!-- /META INFO --\x3e\n\n  \x3c!-- DATE AND TIMES --\x3e\n  <div class="ui top attached segment new-shift__date">\n    <div class="ui top attached label">\n      Date and times\n    </div>\n\n    <div id="new-shift-confirm__detail--date" class="new-shift-confirm__detail new-shift-confirm__detail--date">\n      <div class="new-shift-confirm__detail__item new-shift-confirm__detail__item--date">\n        <div class="new-shift-confirm__detail__title">Date</div>\n        <div>'+d((a.formatWeekDayMonthNumMonthNameYear||e&&e.formatWeekDayMonthNumMonthNameYear||m).call(r,null!=(l=null!=e?e.shift:e)?l.date:l,{name:"formatWeekDayMonthNumMonthNameYear",hash:{},data:t}))+'</div>\n      </div>\n\n      <div class="new-shift-confirm__detail__item new-shift-confirm__detail__item--start-time">\n        <div class="new-shift-confirm__detail__title">Start Time</div>\n        <div>'+d((a.formatTimeAmPm||e&&e.formatTimeAmPm||m).call(r,null!=(l=null!=e?e.shift:e)?l.startTime:l,{name:"formatTimeAmPm",hash:{},data:t}))+'</div>\n      </div>\n\n      <div class="new-shift-confirm__detail__item new-shift-confirm__detail__item--end-time">\n        <div class="new-shift-confirm__detail__title">End Time</div>\n        <div>'+d((a.formatTimeAmPm||e&&e.formatTimeAmPm||m).call(r,null!=(l=null!=e?e.shift:e)?l.endTime:l,{name:"formatTimeAmPm",hash:{},data:t}))+'</div>\n      </div>\n    </div>\n  </div>\n  \x3c!-- /DATE AND TIMES --\x3e\n\n  <div class="new-shift-confirm__buttons">\n    '+(null!=(s=null!=(s=a.buttons||(null!=e?e.buttons:e))?s:m,l="function"==typeof s?s.call(r,{name:"buttons",hash:{},data:t}):s)?l:"")+"\n  </div>\n</div>\n"},useData:!0}),e.newShiftDateTemplate=n({1:function(n,e,a,i,t){var l,s=null!=e?e:n.nullContext||{},r=a.helperMissing,o=n.escapeExpression;return'              <option value="'+o((l=null!=(l=a.key||t&&t.key)?l:r,"function"==typeof l?l.call(s,{name:"key",hash:{},data:t}):l))+'" '+o((l=null!=(l=a.selected||(null!=e?e.selected:e))?l:r,"function"==typeof l?l.call(s,{name:"selected",hash:{},data:t}):l))+">\n                "+o((l=null!=(l=a.display||(null!=e?e.display:e))?l:r,"function"==typeof l?l.call(s,{name:"display",hash:{},data:t}):l))+"\n              </option>\n"},3:function(n,e,a,i,t){var l,s=null!=e?e:n.nullContext||{},r=a.helperMissing,o=n.escapeExpression;return'              <option value="'+o((l=null!=(l=a.key||t&&t.key)?l:r,"function"==typeof l?l.call(s,{name:"key",hash:{},data:t}):l))+'" '+o((l=null!=(l=a.selected||(null!=e?e.selected:e))?l:r,"function"==typeof l?l.call(s,{name:"selected",hash:{},data:t}):l))+">\n                "+o((l=null!=(l=a.key||t&&t.key)?l:r,"function"==typeof l?l.call(s,{name:"key",hash:{},data:t}):l))+"\n              </option>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){var l,s=null!=e?e:n.nullContext||{};return'<div>\n  <select name="dayOfMonth" id="day-of-month" class="ui search dropdown">\n    <option value="">Day</option>\n\n'+(null!=(l=a.each.call(s,null!=e?e.daysOfMonth:e,{name:"each",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t}))?l:"")+'  </select>\n\n  <div class="new-shift-form__error form__error hidden"></div>\n</div>\n\n<div>\n  <select name="monthOfYear" id="month-of-year" class="ui search dropdown">\n    <option value="">Month</option>\n\n\n'+(null!=(l=a.each.call(s,null!=e?e.monthOfYear:e,{name:"each",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t}))?l:"")+'  </select>\n\n  <div class="new-shift-form__error form__error hidden"></div>\n</div>\n\n<div>\n  <select name="year" id="year" class="ui search dropdown">\n    <option value="">Year</option>\n\n\n'+(null!=(l=a.each.call(s,null!=e?e.years:e,{name:"each",hash:{},fn:n.program(3,t,0),inverse:n.noop,data:t}))?l:"")+'  </select>\n\n  <div class="new-shift-form__error form__error hidden"></div>\n</div>\n'},useData:!0}),e.newShiftMenuTemplate=n({1:function(n,e,a,i,t){var l;return n.escapeExpression((l=null!=(l=a.goBackUrl||(null!=e?e.goBackUrl:e))?l:a.helperMissing,"function"==typeof l?l.call(null!=e?e:n.nullContext||{},{name:"goBackUrl",hash:{},data:t}):l))},3:function(n,e,a,i,t){return"/"},compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){var l;return'<div class="ui inverted menu new-shift-route-menu ">\n  <div class="ui container">\n    <a id="go-back-from-shift-route" class="item" href="'+(null!=(l=a.if.call(null!=e?e:n.nullContext||{},null!=e?e.goBackUrl:e,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?l:"")+'">\n      <i class="arrow left icon"></i>\n    </a>\n\n    <div class="item new-shift-route-menu__title">\n      Create New Shift\n    </div>\n\n    <div class="right menu">\n      <div class="ui right aligned category search item">\n        <div class="ui transparent icon input ">\n          <input class="prompt" type="text" placeholder="Search dates...">\n          <i class="search link icon inverted"></i>\n        </div>\n        <div class="results"></div>\n      </div>\n    </div>\n  </div>\n</div>\n'},useData:!0}),e.newShiftMetasSelectTemplate=n({1:function(n,e,a,i,t,l){var s,r,o=n.lambda,d=n.escapeExpression,m=null!=e?e:n.nullContext||{},c=a.helperMissing;return'        <option value="'+d(o(null!=(s=l[0][0])?s.id:s,e))+'" '+d((r=null!=(r=a.selected||(null!=e?e.selected:e))?r:c,"function"==typeof r?r.call(m,{name:"selected",hash:{},data:t,blockParams:l}):r))+' data-value="'+d((a.jsonStringify||e&&e.jsonStringify||c).call(m,l[0][0],{name:"jsonStringify",hash:{},data:t,blockParams:l}))+'">\n          '+d(o(null!=(s=l[0][0])?s.breakTimeSecs:s,e))+" min | &euro; "+d(o(null!=(s=l[0][0])?s.payPerHr:s,e))+" night: "+d(o(null!=(s=l[0][0])?s.nightSupplPayPct:s,e))+" &percnt; sunday: "+d(o(null!=(s=l[0][0])?s.sundaySupplPayPct:s,e))+"\n          &percnt;\n        </option>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t,l){var s;return'<option value="">-----</option>\n\n'+(null!=(s=a.each.call(null!=e?e:n.nullContext||{},null!=e?e.metas:e,{name:"each",hash:{},fn:n.program(1,t,1,l),inverse:n.noop,data:t,blockParams:l}))?s:"")},useData:!0,useBlockParams:!0}),e.newShiftTemplate=n({1:function(n,e,a,i,t,l){var s,r,o=n.lambda,d=n.escapeExpression,m=null!=e?e:n.nullContext||{},c=a.helperMissing;return'        <option value="'+d(o(null!=(s=l[0][0])?s.id:s,e))+'" '+d((r=null!=(r=a.selected||(null!=e?e.selected:e))?r:c,"function"==typeof r?r.call(m,{name:"selected",hash:{},data:t,blockParams:l}):r))+' data-value="'+d((a.jsonStringify||e&&e.jsonStringify||c).call(m,l[0][0],{name:"jsonStringify",hash:{},data:t,blockParams:l}))+'">\n          '+d(o(null!=(s=l[0][0])?s.breakTimeSecs:s,e))+" min | &euro; "+d(o(null!=(s=l[0][0])?s.payPerHr:s,e))+" night: "+d(o(null!=(s=l[0][0])?s.nightSupplPayPct:s,e))+" &percnt; sunday: "+d(o(null!=(s=l[0][0])?s.sundaySupplPayPct:s,e))+"\n          &percnt;\n        </option>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t,l){var s,r,o=null!=e?e:n.nullContext||{};return'<div class="new-shift-main">\n'+(null!=(s=n.invokePartial(i.newShiftMenuTemplate,e,{name:"newShiftMenuTemplate",data:t,blockParams:l,indent:" ",helpers:a,partials:i,decorators:n.decorators}))?s:"")+'\n          <form id="new-shift-form" class="ui form new-shift-form">\n            <div id="new-shift-form__error-main" class="ui negative message hidden new-shift-form__error-main">\n            </div>\n\n            \x3c!-- SELECT OR CREATE META --\x3e\n            <div class="ui top attached segment form__field select-meta">\n              <div class="ui top attached label">\n                Select Meta or create new.\n              </div>\n\n              <div class="meta-id ui right labeled input">\n                <select name="metaId" id="select-meta" class="ui search dropdown fluid">\n<option value="">-----</option>\n\n'+(null!=(s=a.each.call(o,null!=e?e.metas:e,{name:"each",hash:{},fn:n.program(1,t,1,l),inverse:n.noop,data:t,blockParams:l}))?s:"")+'                </select>\n\n                <div id="show-new-meta-form-button" class="ui label form__show-new-meta-form-button">\n                  <i class="plus icon"></i>\n                </div>\n              </div>\n\n              <div class="new-shift-form__error form__error hidden"></div>\n              <input type="hidden" id="metaId-default" value="">\n            </div>\n            \x3c!-- /SELECT OR CREATE META --\x3e\n\n            \x3c!-- SHIFT DATE --\x3e\n            <div class="ui top attached segment date-segment form__field">\n              <div class="ui top attached label">\n                Date\n              </div>\n\n              <div id="new-shift-form-date-segment-template" class="new-shift-form__fields three">\n                      '+(null!=(r=null!=(r=a.dateHtml||(null!=e?e.dateHtml:e))?r:a.helperMissing,s="function"==typeof r?r.call(o,{name:"dateHtml",hash:{},data:t,blockParams:l}):r)?s:"")+'\n              </div>\n            </div>\n            \x3c!-- /SHIFT DATE --\x3e\n\n            \x3c!-- START TIME --\x3e\n            <div class="ui top attached segment start-time-segment form__field">\n              <div class="ui top attached label">\n                Start time\n              </div>\n\n              <div class="new-shift-form__fields two">\n                <div>\n                  <input name="startTimeHr" id="start-time-hour" name="start-time-hour" type="number" min="0" max="23" placeholder="HH" autocomplete="off"\n                    maxlength="2">\n\n                  <div class="new-shift-form__error form__error hidden"></div>\n                </div>\n\n                <div>\n                  <input name="startTimeMin" id="start-time-min" name="start-time-min" type="number" min="0" max="59" placeholder="MM" autocomplete="off"\n                    maxlength="2">\n\n                  <div class="new-shift-form__error form__error hidden"></div>\n                </div>\n              </div>\n            </div>\n            \x3c!-- /START TIME --\x3e\n\n            \x3c!-- END TIME --\x3e\n            <div class="ui top attached segment end-time-segment form__field">\n              <div class="ui top attached label">\n                End time\n              </div>\n\n              <div class="new-shift-form__fields two">\n                <div>\n\n                  <input name="endTimeHr" id="end-time-hour" name="end-time-hour" type="number" min="0" max="23" placeholder="HH" autocomplete="off"\n                    maxlength="2">\n\n                  <div class="new-shift-form__error form__error hidden"></div>\n                </div>\n\n                <div>\n                  <input name="endTimeMin" id="end-time-min" name="end-time-min" type="number" min="0" max="59" placeholder="MM" autocomplete="off"\n                    maxlength="2">\n\n                  <div class="new-shift-form__error form__error hidden"></div>\n                </div>\n              </div>\n            </div>\n            \x3c!-- /END TIME --\x3e\n\n            <div class="new-shift-form__buttons">\n              <div class="ui buttons">\n                <button id="new-shift-form-submit" type="submit" class="ui positive button">\n                  Save\n                </button>\n\n                <div class="or"></div>\n\n                <button id="new-shift-form-reset" type="button" class="ui button">\n                  Reset\n                </button>\n              </div>\n            </div>\n          </form>\n</div>\n'},usePartial:!0,useData:!0,useBlockParams:!0}),e.shiftDetailTemplate=n({1:function(n,e,a,i,t){var l;return n.escapeExpression(n.lambda(null!=(l=null!=e?e.shift:e)?l.id:l,e))},3:function(n,e,a,i,t){var l;return n.escapeExpression(n.lambda(null!=(l=null!=e?e.shift:e)?l._id:l,e))},compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){var l,s=null!=e?e:n.nullContext||{};return'  \n\n\n      <div id="shift-detail-row-'+(null!=(l=a.if.call(s,null!=(l=null!=e?e.shift:e)?l.id:l,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?l:"")+'" class="shift-detail-row" data-value="'+n.escapeExpression((a.jsonStringify||e&&e.jsonStringify||a.helperMissing).call(s,null!=e?e.shift:e,{name:"jsonStringify",hash:{},data:t}))+'">\n'+(null!=(l=n.invokePartial(i.shiftDetailRowTemplate,e,{name:"shiftDetailRowTemplate",hash:{shift:null!=e?e.shift:e},data:t,indent:"              ",helpers:a,partials:i,decorators:n.decorators}))?l:"")+"      </div>\n"},usePartial:!0,useData:!0}),e.shiftsForMonthTemplate=n({1:function(n,e,a,i,t,l){var s;return'  <div class="shift-row">\n    <div class="shift-summaries">\n      <div id="shift__earnings-summary" class="shift__earnings-summary">\n'+(null!=(s=n.invokePartial(i.shiftSummaryTemplate,e,{name:"shiftSummaryTemplate",hash:{summary:null!=(s=l[0][0])?s.summary:s},data:t,blockParams:l,indent:"              ",helpers:a,partials:i,decorators:n.decorators}))?s:"")+'      </div>\n\n      <div class="hours-earnings header">\n        <span>Type</span>\n        <span>Hours</span>\n        <span>Earning</span>\n      </div>\n\n    </div>\n\n    <div id="index-route-shifts-details" class="index-route-shifts-details">\n                '+(null!=(s=a.each.call(null!=e?e:n.nullContext||{},null!=(s=l[0][0])?s.shifts:s,{name:"each",hash:{},fn:n.program(2,t,1,l),inverse:n.noop,data:t,blockParams:l}))?s:"")+"\n    </div>\n  </div>\n"},2:function(n,e,a,i,t,l){var s;return" "+(null!=(s=n.invokePartial(i.shiftDetailTemplate,e,{name:"shiftDetailTemplate",hash:{shift:l[0][0]},data:t,blockParams:l,helpers:a,partials:i,decorators:n.decorators}))?s:"")+" "},compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t,l){var s;return null!=(s=a.each.call(null!=e?e:n.nullContext||{},null!=e?e.shiftsData:e,{name:"each",hash:{},fn:n.program(1,t,1,l),inverse:n.noop,data:t,blockParams:l}))?s:""},usePartial:!0,useData:!0,useBlockParams:!0}),e["partials/newShiftMenuTemplate"]=n({1:function(n,e,a,i,t){var l;return n.escapeExpression((l=null!=(l=a.goBackUrl||(null!=e?e.goBackUrl:e))?l:a.helperMissing,"function"==typeof l?l.call(null!=e?e:n.nullContext||{},{name:"goBackUrl",hash:{},data:t}):l))},3:function(n,e,a,i,t){return"/"},compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){var l;return'<div class="ui inverted menu new-shift-route-menu ">\n  <div class="ui container">\n    <a id="go-back-from-shift-route" class="item" href="'+(null!=(l=a.if.call(null!=e?e:n.nullContext||{},null!=e?e.goBackUrl:e,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?l:"")+'">\n      <i class="arrow left icon"></i>\n    </a>\n\n    <div class="item new-shift-route-menu__title">\n      Create New Shift\n    </div>\n\n    <div class="right menu">\n      <div class="ui right aligned category search item">\n        <div class="ui transparent icon input ">\n          <input class="prompt" type="text" placeholder="Search dates...">\n          <i class="search link icon inverted"></i>\n        </div>\n        <div class="results"></div>\n      </div>\n    </div>\n  </div>\n</div>\n'},useData:!0}),e["partials/shiftDetailRowTemplate"]=n({1:function(n,e,a,i,t){var l;return" ("+n.escapeExpression(n.lambda(null!=(l=null!=e?e.shift:e)?l.hoursGross:l,e))+" hrs) "},compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){var l,s=n.lambda,r=n.escapeExpression,o=null!=e?e:n.nullContext||{};return'  <input type="hidden" style="display: none" id="'+r(s(null!=(l=null!=e?e.shift:e)?l._id:l,e))+'">\n  <div class="date-times">\n    <span>\n'+r((a.formatWeekDayMonthNum||e&&e.formatWeekDayMonthNum||a.helperMissing).call(o,null!=(l=null!=e?e.shift:e)?l.date:l,{name:"formatWeekDayMonthNum",hash:{},data:t}))+'    </span>\n\n    <div class="times">\n      <span>\n'+r(s(null!=(l=null!=e?e.shift:e)?l.startTime:l,e))+"      </span>\n      -\n      <span>\n"+r(s(null!=(l=null!=e?e.shift:e)?l.endTime:l,e))+"      </span>\n    </div>\n\n    <span>\n            "+(null!=(l=a.if.call(o,null!=(l=null!=e?e.shift:e)?l.hoursGross:l,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t}))?l:"")+'\n    </span>\n  </div>\n\n  <div class="hours-earnings-container">\n    <div class="hours-earnings detail">\n      <span>Normal</span>\n      <span>\n'+r(s(null!=(l=null!=e?e.shift:e)?l.normalHours:l,e))+"      </span>\n      <span>&euro;\n"+r(s(null!=(l=null!=e?e.shift:e)?l.normalPay:l,e))+'      </span>\n    </div>\n\n    <div class="hours-earnings detail">\n      <span>Night</span>\n      <span>\n'+r(s(null!=(l=null!=e?e.shift:e)?l.nightHours:l,e))+"      </span>\n      <span>&euro;\n"+r(s(null!=(l=null!=e?e.shift:e)?l.nightSupplPay:l,e))+'      </span>\n    </div>\n\n    <div class="hours-earnings detail">\n      <span>Sunday</span>\n      <span>\n'+r(s(null!=(l=null!=e?e.shift:e)?l.sundayHours:l,e))+"      </span>\n      <span>&euro;\n"+r(s(null!=(l=null!=e?e.shift:e)?l.sundaySupplPay:l,e))+'      </span>\n    </div>\n  </div>\n\n  <div class="total-earning"> Total: &euro;\n'+r(s(null!=(l=null!=e?e.shift:e)?l.totalPay:l,e))+"  </div>\n"},useData:!0}),e["partials/shiftSummaryTemplate"]=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,t){var l,s=n.lambda,r=n.escapeExpression;return'<span id="earnings-summary__label" class="earnings-summary__label">\n'+r(s(null!=(l=null!=e?e.summary:e)?l.date:l,e))+'    &nbsp;&nbsp;&nbsp;&nbsp; &euro;\n    <span class="earnings-summary__earnings">'+r(s(null!=(l=null!=e?e.summary:e)?l.totalEarnings:l,e))+'</span>\n    &nbsp;&nbsp; / &nbsp;&nbsp;\n    <span class="earnings-summary__hours">'+r(s(null!=(l=null!=e?e.summary:e)?l.totalNormalHours:l,e))+"</span> hours\n</span>\n"},useData:!0})}();