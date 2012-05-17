
/*
 * Copyright (C) 2005 - 2011 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased  a commercial license agreement from Jaspersoft,
 * the following license terms  apply:
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License  as
 * published by the Free Software Foundation, either version 3 of  the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero  General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public  License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

var ScheduleParams = {

    reportOptionsDialog: null,

    initialize: function() {
        Schedule.initSwipeScroll();

        var optionsButtonActions = {
            'button#saveAsBtnSave': function() {ScheduleParams.saveReportOptions()},
            'button#saveAsBtnCancel': function() {ScheduleParams.reportOptionsDialog.hide()}
        };

        if ($(ControlsBase.SAVE_REPORT_OPTIONS_DIALOG)) {
            this.reportOptionsDialog = new OptionsDialog(optionsButtonActions);
        }

        $(Schedule.PAGE_JOB_PARAMETERS).observe('click', function(e) {
            var elem = e.element();

            // observe navigation buttons
            var link = matchAny(e.element(), ['a','button','li'], true);
            if (link) {
                for (var pattern in Schedule.buttonActions) {
                    if (link.match(pattern)) {
                        e.stop();

                        // if pro, call applyParameters before next or back.
                        if (isProVersion() && Schedule.buttonActions[pattern] == 'next') {
                            ScheduleParams.next();
                        } else if (isProVersion() && Schedule.buttonActions[pattern] == 'back') {
                            ScheduleParams.back();
                        } else {
                            Schedule.submitForm($(Schedule.STEP_DISPLAY_FORM), Schedule.buttonActions[pattern]);
                        }

                        return;
                    }
                }

                if (link.match('button#save')) {
                    e.stop();
                    ScheduleParams.save();
                    return;
                }

            }
        });

        if ($(ControlsBase.REPORT_OPTIONS_SELECTOR)) {
            $(ControlsBase.REPORT_OPTIONS_SELECTOR).observe('change', function(e) {
                var elem = e.element();
                var value = elem.options[elem.selectedIndex].value;
                if (value != "") {
                    autoCascade(ScheduleParams.reportUnitURI,value);
                } else {
                    this.reset();
                }
            }.bindAsEventListener(this));
        }
        
        // disable Previous button if Run Now Mode
        if (Schedule.isRunNowMode) {
            buttonManager.disable($('previous'));
        }

    },

    next: function() {
        var nextAction = function(hasErrors) {
            if (!hasErrors) {
                Schedule.submitForm(Schedule.submitForm($(Schedule.STEP_DISPLAY_FORM), 'next'));
            }
        }
        ScheduleParams.checkInputValues(null, nextAction);
    },

    back: function() {
        var backAction = function(hasErrors) {
            if (!hasErrors) {
                Schedule.submitForm(Schedule.submitForm($(Schedule.STEP_DISPLAY_FORM), 'back'));
            }
        }
        ScheduleParams.checkInputValues(null, backAction);
    },

    save: function() {
        var saveAction = function(hasErrors) {
            if (!hasErrors) {
                var params = {};
                var callback = function(response) {
                    var dlg = ScheduleParams.reportOptionsDialog;
                    dlg.input.setValue(response.name);
                    dlg.overwrite = false;

                    ValidationModule.hideError(dlg.input);
                    dlg.show();
                    selectAndFocusOn(dlg.input);
                }

                ScheduleParams._sendInfo('getOptionsName', params, callback);
            } else {
                // todo: scroll to error
            }
        }
        ScheduleParams.checkInputValues(null, saveAction);
    },

    reset: function() {
        autoCascade(ScheduleParams.reportUnitURI,ScheduleParams.reportOptionsURI);
    },

    checkInputValues: function (actionName, postAction) {
        var url = "flow.html?_flowExecutionKey=" + Schedule.flowExecutionKey + "&decorate=no";

        var tempContainer = Builder.node('DIV', {id: ControlsBase.TEMP_REPORT_CONTAINER, style: 'display:none'});
        document.body.insertBefore(tempContainer, document.body.firstChild);

        var setInputValuesCallback = function() {
            var tempContainer = $(ControlsBase.TEMP_REPORT_CONTAINER);
            var errorDivs = $$(ControlsBase.WRAPPER_ERROR_FLAG_PREFIX_SELECTOR);
            var errors = $(ControlsBase.WRAPPERS_ERRORS_DIV) ? $H(window.eval('(' + $(ControlsBase.WRAPPERS_ERRORS_DIV).innerHTML + ')')) : false;
            ControlsBase.setControlsErrors(errors);

            postAction && postAction(errors);
            tempContainer.remove();
        };

        ajaxTargettedFormSubmit(
            Schedule.STEP_DISPLAY_FORM,
            url,
            {
                extraPostData: {"_eventId": "applyParameter"},
                fillLocation: tempContainer,
                //fromLocation: "reportOutput",
                callback: setInputValuesCallback,
                errorHandler: baseErrorHandler
            });
    },



    saveReportOptions: function () {

        var overwrite = ScheduleParams.reportOptionsDialog.overwrite.checked;
        var optionName =  ScheduleParams.reportOptionsDialog.input.getValue();

        var params = {
            optionsName: optionName,
            overwriteOptions: overwrite
        };

        var callback = function(response) {

            if (response.result == 'exists') {
                ValidationModule.showError(ScheduleParams.reportOptionsDialog.input, response.message);
                var dialog = ScheduleParams.reportOptionsDialog.overwrite.parentNode;
                dialog && dialog.removeClassName(layoutModule.HIDDEN_CLASS);
            } else if (response.result == 'error') {
                ValidationModule.showError(ScheduleParams.reportOptionsDialog.input, response.message);

            } else if (response.result == 'saved') {
                dialogs.systemConfirm.show("Option saved");
                ScheduleParams.reportOptionsDialog.hide();

                // show Report Options selector and update it with the new option
                $('savedValuesSelector').removeClassName(layoutModule.HIDDEN_CLASS);

                var el = document.createElement("option");
                el.value = response.value;
                el.update(response.name);
                el.selected = true;
                $(ControlsBase.REPORT_OPTIONS_SELECTOR).appendChild(el);

            }
        }

        ValidationModule.hideError(ScheduleParams.reportOptionsDialog.input);

        ScheduleParams._sendInfo('saveOptions', params, callback);
    },



    _sendInfo: function(eventId, params, callback) {
        var urlData = {flowId: 'reportJobFlow', flowExecutionKey: Schedule.flowExecutionKey, eventId: eventId};
        ScheduleParams.sendAjaxRequest(urlData, params, callback);
    },

    // Sends AJAX request to the given action.
    sendAjaxRequest : function(urlData, postData, callback, params) {
        var actionURL = buildActionUrl(urlData);
        var options =  {
            postData: Object.toQueryString(postData),
            callback: callback,
            errorHandler: this._serverErrorHandler,
            mode: AjaxRequester.prototype.EVAL_JSON
        };
        params && Object.extend(options, params);

        ajaxTargettedUpdate(actionURL, options);
    }
}

document.observe('dom:loaded', ScheduleParams.initialize.bind(ScheduleParams));

