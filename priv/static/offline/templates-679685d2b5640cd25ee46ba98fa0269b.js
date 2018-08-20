!function(){var n=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e.appShellTemplate=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,l){var t,s,o=null!=e?e:n.nullContext||{},r=a.helperMissing,d="function";return'<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="utf-8">\n\n  <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png">\n  <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png">\n  <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png">\n  <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png">\n  <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png">\n  <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png">\n  <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png">\n  <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png">\n  <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png">\n  <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png">\n  <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">\n  <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png">\n  <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">\n  <link rel="manifest" href="/favicon/manifest.json">\n  <meta name="msapplication-TileColor" content="#21ba45">\n  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">\n  <meta name="theme-color" content="#21ba45">\n\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="wages shift work clocks clock wage">\n\n\n  <title>\n'+n.escapeExpression((s=null!=(s=a.pageTitle||(null!=e?e.pageTitle:e))?s:r,typeof s===d?s.call(o,{name:"pageTitle",hash:{},data:l}):s))+"  </title>\n\n"+(null!=(s=null!=(s=a.mainCss||(null!=e?e.mainCss:e))?s:r,t=typeof s===d?s.call(o,{name:"mainCss",hash:{},data:l}):s)?t:"")+"    \n\n"+(null!=(s=null!=(s=a.pageMainCss||(null!=e?e.pageMainCss:e))?s:r,t=typeof s===d?s.call(o,{name:"pageMainCss",hash:{},data:l}):s)?t:"")+"          "+(null!=(s=null!=(s=a.pageOtherCss||(null!=e?e.pageOtherCss:e))?s:r,t=typeof s===d?s.call(o,{name:"pageOtherCss",hash:{},data:l}):s)?t:"")+'\n\n\n\n\n</head>\n\n<body>\n\n  \x3c!-- APP SIDEBAR --\x3e\n  <div id="app-sidebar" class="ui left vertical inverted sidebar labeled icon menu">\n    <a class="item">\n      <i class="home icon"></i>\n      Home\n    </a>\n    <a class="item">\n      <i class="block layout icon"></i>\n      Topics\n    </a>\n    <a class="item">\n      <i class="smile icon"></i>\n      Friends\n    </a>\n  </div>\n  \x3c!-- /APP SIDEBAR --\x3e\n\n\n\n  <div id="app-container" class="app-container">\n\n    \x3c!-- TOP MENU (if exported by child) --\x3e\n    <div class="app-main-menu">\n\n'+(null!=(s=null!=(s=a.pageTopMenu||(null!=e?e.pageTopMenu:e))?s:r,t=typeof s===d?s.call(o,{name:"pageTopMenu",hash:{},data:l}):s)?t:"")+'    </div>\n    \x3c!-- /TOP MENU --\x3e\n\n    \x3c!-- MAIN CHILD TEMPLATE INSERT --\x3e\n    <main role="main">\n\n'+(null!=(s=null!=(s=a.pageMainContent||(null!=e?e.pageMainContent:e))?s:r,t=typeof s===d?s.call(o,{name:"pageMainContent",hash:{},data:l}):s)?t:"")+'    </main>\n    \x3c!-- /MAIN CHILD TEMPLATE INSERT --\x3e\n  </div>\n\n  \x3c!-- MODAL CONTAINER --\x3e\n  <div id="body-modal-dimmer" class="ui dimmer modals page transition body-modal-dimmer  body-modal-dismisser">\n\n    <div id="body-modal" class="ui modal transition">\n      <div id="body-modal-content" class="content"></div>\n\n      <div class="actions">\n        <div id="body-modal-dismiss" class="ui cancel button body-modal-dismisser">\n          Dismiss\n        </div>\n      </div>\n    </div>\n  </div>\n  \x3c!-- /MODAL CONTAINER --\x3e\n\n  <div class="insert-new-app-available-ui" id="insert-new-app-available-ui"></div>\n\n  <script>\n    window.appInterface = {};\n  <\/script>\n'+(null!=(s=null!=(s=a.mainJs||(null!=e?e.mainJs:e))?s:r,t=typeof s===d?s.call(o,{name:"mainJs",hash:{},data:l}):s)?t:"")+"    \n\n"+(null!=(s=null!=(s=a.pageMainJs||(null!=e?e.pageMainJs:e))?s:r,t=typeof s===d?s.call(o,{name:"pageMainJs",hash:{},data:l}):s)?t:"")+"          "+(null!=(s=null!=(s=a.pageOtherJs||(null!=e?e.pageOtherJs:e))?s:r,t=typeof s===d?s.call(o,{name:"pageOtherJs",hash:{},data:l}):s)?t:"")+"\n\n</body>\n\n</html>\n"},useData:!0}),e.indexMenuTemplate=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,l){var t;return'<div class="ui inverted menu index-route-menu ">\n  <div class="ui container">\n    <a id="sidebar-trigger" class="item">\n      <i class="content icon"></i>\n    </a>\n\n    <div id="index-route-menu__title" class="item index-route-menu__title">\n'+n.escapeExpression((t=null!=(t=a.currentMonth||(null!=e?e.currentMonth:e))?t:a.helperMissing,"function"==typeof t?t.call(null!=e?e:n.nullContext||{},{name:"currentMonth",hash:{},data:l}):t))+'    </div>\n\n    <div class="right menu">\n      <div class="ui right aligned category search item">\n        <div class="ui transparent icon input ">\n          <input class="prompt" type="text" placeholder="Search dates...">\n          <i class="search link icon inverted"></i>\n        </div>\n        <div class="results"></div>\n      </div>\n    </div>\n  </div>\n</div>\n'},useData:!0}),e.indexTemplate=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,l){var t;return'\n  <div class="main-index">\n    <div class="shift-summaries">\n      <div id="shift__earnings-summary" class="shift__earnings-summary">\n      </div>\n\n      <div class="hours-earnings header">\n        <span>Type (Net)</span>\n        <span>Hours worked</span>\n        <span>Earning</span>\n      </div>\n\n    </div>\n\n    <div id="index-route-shifts-details" class="index-route-shifts-details">\n\n    </div>\n\n    \x3c!-- LINK TO NEW SHIFT --\x3e\n\n    <a id="new-shift-trigger" class="new-shift-trigger" data-off-line-link="true" href="'+n.escapeExpression((t=null!=(t=a.newShiftPath||(null!=e?e.newShiftPath:e))?t:a.helperMissing,"function"==typeof t?t.call(null!=e?e:n.nullContext||{},{name:"newShiftPath",hash:{},data:l}):t))+'">\n      <span class="">&plus;</span>\n    </a>\n\n    \x3c!-- /LINK TO NEW SHIFT --\x3e\n\n  </div>\n'},useData:!0}),e.newShiftMenuTemplate=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,l){var t;return'<div class="ui inverted menu shift-route-menu ">\n  <div class="ui container">\n    <a id="go-back-from-shift-route" class="item" href="'+n.escapeExpression((t=null!=(t=a.goBackUrl||(null!=e?e.goBackUrl:e))?t:a.helperMissing,"function"==typeof t?t.call(null!=e?e:n.nullContext||{},{name:"goBackUrl",hash:{},data:l}):t))+'">\n      <i class="arrow left icon"></i>\n    </a>\n\n    <div class="item shift-route-menu__title">\n      Create New Shift\n    </div>\n\n    <div class="right menu">\n      <div class="ui right aligned category search item">\n        <div class="ui transparent icon input ">\n          <input class="prompt" type="text" placeholder="Search dates...">\n          <i class="search link icon inverted"></i>\n        </div>\n        <div class="results"></div>\n      </div>\n    </div>\n  </div>\n</div>\n'},useData:!0}),e.newShiftTemplate=n({1:function(n,e,a,i,l){var t,s=null!=e?e:n.nullContext||{},o=a.helperMissing,r="function",d=n.escapeExpression;return'                    <option value="'+d((t=null!=(t=a.id||(null!=e?e.id:e))?t:o,typeof t===r?t.call(s,{name:"id",hash:{},data:l}):t))+'" '+d((t=null!=(t=a.selected||(null!=e?e.selected:e))?t:o,typeof t===r?t.call(s,{name:"selected",hash:{},data:l}):t))+">\n                      "+d((t=null!=(t=a.breakTimeSecs||(null!=e?e.breakTimeSecs:e))?t:o,typeof t===r?t.call(s,{name:"breakTimeSecs",hash:{},data:l}):t))+" min | &euro; "+d((t=null!=(t=a.payPerHr||(null!=e?e.payPerHr:e))?t:o,typeof t===r?t.call(s,{name:"payPerHr",hash:{},data:l}):t))+" night: "+d((t=null!=(t=a.nightSupplPayPct||(null!=e?e.nightSupplPayPct:e))?t:o,typeof t===r?t.call(s,{name:"nightSupplPayPct",hash:{},data:l}):t))+" &percnt; sunday: "+d((t=null!=(t=a.sundaySupplPayPct||(null!=e?e.sundaySupplPayPct:e))?t:o,typeof t===r?t.call(s,{name:"sundaySupplPayPct",hash:{},data:l}):t))+" &percnt;\n                    </option>\n"},3:function(n,e,a,i,l){var t,s=null!=e?e:n.nullContext||{},o=a.helperMissing,r=n.escapeExpression;return'                      <option value="'+r((t=null!=(t=a.key||l&&l.key)?t:o,"function"==typeof t?t.call(s,{name:"key",hash:{},data:l}):t))+'" '+r((t=null!=(t=a.selected||(null!=e?e.selected:e))?t:o,"function"==typeof t?t.call(s,{name:"selected",hash:{},data:l}):t))+">\n                        "+r((t=null!=(t=a.display||(null!=e?e.display:e))?t:o,"function"==typeof t?t.call(s,{name:"display",hash:{},data:l}):t))+"\n                      </option>\n"},5:function(n,e,a,i,l){var t,s=null!=e?e:n.nullContext||{},o=a.helperMissing,r=n.escapeExpression;return'                      <option value="'+r((t=null!=(t=a.key||l&&l.key)?t:o,"function"==typeof t?t.call(s,{name:"key",hash:{},data:l}):t))+'" '+r((t=null!=(t=a.selected||(null!=e?e.selected:e))?t:o,"function"==typeof t?t.call(s,{name:"selected",hash:{},data:l}):t))+">\n                        "+r((t=null!=(t=a.key||l&&l.key)?t:o,"function"==typeof t?t.call(s,{name:"key",hash:{},data:l}):t))+"\n                      </option>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,i,l){var t,s,o=null!=e?e:n.nullContext||{},r=a.helperMissing,d=n.escapeExpression;return'<div class="new-shift-main">\n  <form id="new-shift-form" class="ui form new-shift-form">\n    <div id="new-shift-form__error-main" class="ui negative message hidden new-shift-form__error-main">\n    </div>\n\n    \x3c!-- SELECT OR CREATE META --\x3e\n    <div class="ui top attached segment form__field select-meta">\n      <div class="ui top attached label">\n        Select Meta or create new.\n      </div>\n\n      <div class="meta-id ui right labeled input">\n        <select name="metaId" id="select-meta" class="ui search dropdown fluid">\n          <option value="">-----</option>\n\n'+(null!=(t=a.each.call(o,null!=e?e.metas:e,{name:"each",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?t:"")+'        </select>\n\n        <div id="get-new-meta-form-button" class="ui label">\n          <i class="plus icon"></i>\n        </div>\n      </div>\n\n      <div class="new-shift-form__error form__error hidden"></div>\n      <input type="hidden" id="metaId-default" value="">\n    </div>\n    \x3c!-- /SELECT OR CREATE META --\x3e\n\n    \x3c!-- SHIFT DATE --\x3e\n    <div class="ui top attached segment date-segment form__field">\n      <div class="ui top attached label">\n        Date\n      </div>\n\n      <div class="new-shift-form__fields three">\n        <div>\n          <select name="dayOfMonth" id="day-of-month" class="ui search dropdown">\n            <option value="">Day</option>\n\n'+(null!=(t=a.each.call(o,null!=e?e.daysOfMonth:e,{name:"each",hash:{},fn:n.program(3,l,0),inverse:n.noop,data:l}))?t:"")+'          </select>\n\n          <div class="new-shift-form__error form__error hidden"></div>\n        </div>\n\n        <div>\n          <select name="monthOfYear" id="month-of-year" class="ui search dropdown">\n            <option value="">Month</option>\n\n\n'+(null!=(t=a.each.call(o,null!=e?e.monthOfYear:e,{name:"each",hash:{},fn:n.program(3,l,0),inverse:n.noop,data:l}))?t:"")+'          </select>\n\n          <div class="new-shift-form__error form__error hidden"></div>\n        </div>\n\n        <div>\n          <select name="year" id="year" class="ui search dropdown">\n            <option value="">Year</option>\n\n\n'+(null!=(t=a.each.call(o,null!=e?e.years:e,{name:"each",hash:{},fn:n.program(5,l,0),inverse:n.noop,data:l}))?t:"")+'          </select>\n\n          <div class="new-shift-form__error form__error hidden"></div>\n        </div>\n      </div>\n\n\n      <input type="hidden" id="dayOfMonth-default" value="">\n\n      <input type="hidden" id="monthOfYear-default" value="">\n\n      <input type="hidden" id="year-default" value="">\n    </div>\n    \x3c!-- /SHIFT DATE --\x3e\n\n    \x3c!-- START TIME --\x3e\n    <div class="ui top attached segment start-time-segment form__field">\n      <div class="ui top attached label">\n        Start time\n      </div>\n\n      <div class="new-shift-form__fields two">\n        <div>\n            <input name="startTimeHr" id="start-time-hour" name="start-time-hour" type="number" min="0" max="23" placeholder="HH" autocomplete="off"\n              maxlength="2" value="'+d((s=null!=(s=a.startTimeHr||(null!=e?e.startTimeHr:e))?s:r,"function"==typeof s?s.call(o,{name:"startTimeHr",hash:{},data:l}):s))+'">\n\n            <div class="new-shift-form__error form__error hidden"></div>\n        </div>\n\n        <div>\n          <input name="startTimeMin" id="start-time-min" name="start-time-min" type="number" min="0" max="59" placeholder="MM" autocomplete="off"\n            maxlength="2" value="'+d((s=null!=(s=a.startTimeMin||(null!=e?e.startTimeMin:e))?s:r,"function"==typeof s?s.call(o,{name:"startTimeMin",hash:{},data:l}):s))+'">\n\n          <div class="new-shift-form__error form__error hidden"></div>\n        </div>\n      </div>\n\n      <input type="hidden" id="startTimeHr-default" value="">\n\n      <input type="hidden" id="startTimeMin-default" value="">\n    </div>\n    \x3c!-- /START TIME --\x3e\n\n    \x3c!-- END TIME --\x3e\n    <div class="ui top attached segment end-time-segment form__field">\n      <div class="ui top attached label">\n        End time\n      </div>\n\n      <div class="new-shift-form__fields two">\n        <div>\n            <input name="endTimeHr" id="end-time-hour" name="end-time-hour" type="number" min="0" max="23" placeholder="HH" autocomplete="off"\n              maxlength="2" value="'+d((s=null!=(s=a.endTimeHr||(null!=e?e.endTimeHr:e))?s:r,"function"==typeof s?s.call(o,{name:"endTimeHr",hash:{},data:l}):s))+'">\n\n            <div class="new-shift-form__error form__error hidden"></div>\n        </div>\n\n        <div>\n          <input name="endTimeMin" id="end-time-min" name="end-time-min" type="number" min="0" max="59" placeholder="MM" autocomplete="off"\n            maxlength="2" value="'+d((s=null!=(s=a.endTimeMin||(null!=e?e.endTimeMin:e))?s:r,"function"==typeof s?s.call(o,{name:"endTimeMin",hash:{},data:l}):s))+'">\n\n          <div class="new-shift-form__error form__error hidden"></div>\n        </div>\n      </div>\n\n\n      <input type="hidden" id="endTimeHr-default" value="">\n\n      <input type="hidden" id="endTimeMin-default" value="">\n    </div>\n    \x3c!-- /END TIME --\x3e\n\n    <div class="new-shift-form__buttons">\n      <div class="ui buttons">\n        <button id="new-shift-form-submit" type="submit" class="ui positive button">\n          Save\n        </button>\n\n        <div class="or"></div>\n\n        <button id="new-shift-form-reset" type="button" class="ui button">\n          Reset\n        </button>\n      </div>\n    </div>\n  </form>\n\n</div>\n'},useData:!0}),e.shiftDetailTemplate=n({1:function(n,e,a,i,l){var t,s=null!=e?e:n.nullContext||{},o=a.helperMissing,r=n.escapeExpression,d="function";return'    <div class="shift-detail-row">\n      <div class="date-times">\n        <span>\n'+r((a.formatWeekDayMonthNum||e&&e.formatWeekDayMonthNum||o).call(s,null!=e?e.date:e,{name:"formatWeekDayMonthNum",hash:{},data:l}))+'        </span>\n\n        <div class="times">\n          <span>\n'+r((a.truncateString||e&&e.truncateString||o).call(s,null!=e?e.startTime:e,{name:"truncateString",hash:{},data:l}))+"          </span>\n          -\n          <span>\n"+r((a.truncateString||e&&e.truncateString||o).call(s,null!=e?e.endTime:e,{name:"truncateString",hash:{},data:l}))+"          </span>\n        </div>\n\n        <span>\n          "+r((t=null!=(t=a.hoursGross||(null!=e?e.hoursGross:e))?t:o,typeof t===d?t.call(s,{name:"hoursGross",hash:{},data:l}):t))+' hours &nbsp;&nbsp; (gross)\n        </span>\n      </div>\n\n      <div class="hours-earnings-container">\n        <div class="hours-earnings detail">\n          <span>Shift</span>\n          <span>\n'+r((t=null!=(t=a.normalHours||(null!=e?e.normalHours:e))?t:o,typeof t===d?t.call(s,{name:"normalHours",hash:{},data:l}):t))+"          </span>\n          <span>&euro;\n"+r((t=null!=(t=a.normalPay||(null!=e?e.normalPay:e))?t:o,typeof t===d?t.call(s,{name:"normalPay",hash:{},data:l}):t))+'          </span>\n        </div>\n\n        <div class="hours-earnings detail">\n          <span>Night</span>\n          <span>\n'+r((t=null!=(t=a.nightHours||(null!=e?e.nightHours:e))?t:o,typeof t===d?t.call(s,{name:"nightHours",hash:{},data:l}):t))+"          </span>\n          <span>&euro;\n"+r((t=null!=(t=a.nightSupplPay||(null!=e?e.nightSupplPay:e))?t:o,typeof t===d?t.call(s,{name:"nightSupplPay",hash:{},data:l}):t))+'          </span>\n        </div>\n\n        <div class="hours-earnings detail">\n          <span>Sunday</span>\n          <span>\n'+r((t=null!=(t=a.sundayHours||(null!=e?e.sundayHours:e))?t:o,typeof t===d?t.call(s,{name:"sundayHours",hash:{},data:l}):t))+"          </span>\n          <span>&euro;\n"+r((t=null!=(t=a.sundaySupplPay||(null!=e?e.sundaySupplPay:e))?t:o,typeof t===d?t.call(s,{name:"sundaySupplPay",hash:{},data:l}):t))+'          </span>\n        </div>\n      </div>\n\n      <div class="total-earning"> Total: &euro;\n'+r((t=null!=(t=a.totalPay||(null!=e?e.totalPay:e))?t:o,typeof t===d?t.call(s,{name:"totalPay",hash:{},data:l}):t))+"      </div>\n\n    </div>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,i,l){var t;return null!=(t=a.each.call(null!=e?e:n.nullContext||{},null!=e?e.shifts:e,{name:"each",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?t:""},useData:!0}),e.shiftEarningSummaryTemplate=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,i,l){var t,s=null!=e?e:n.nullContext||{},o=a.helperMissing,r=n.escapeExpression;return'<span id="earnings-summary__label" class="earnings-summary__label">\n  Total Earnings &nbsp; &nbsp;\n'+r((t=null!=(t=a.currentMonthYear||(null!=e?e.currentMonthYear:e))?t:o,"function"==typeof t?t.call(s,{name:"currentMonthYear",hash:{},data:l}):t))+'</span>\n\n<span class="earnings-summary__amount">\n  &euro;\n'+r((t=null!=(t=a.totalEarnings||(null!=e?e.totalEarnings:e))?t:o,"function"==typeof t?t.call(s,{name:"totalEarnings",hash:{},data:l}):t))+"</span>\n"},useData:!0})}();