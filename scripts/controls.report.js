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

var Controls = {};

Controls = {

	_messages:{},
	
    controlDialog: null,
    reportOptionsDialog: null,

    inputControlsLocation: null,
    separatePageICLayoutFirstShow: false,
    toggleControlsOn: false,

    initialize : function() {

        this.buttonActions = {
            'button#apply': Controls.applyInputValues,
            'button#cancel': Controls.cancel,
            'button#reset': Controls.reset,
            'button#save': Controls.save
        };

        var dialogButtonActions = {
            'button#ok': function() {Controls.applyInputValues('Ok')},
            'button#cancel': Controls.cancel,
            'button#reset': Controls.reset,
            'button#apply': Controls.applyInputValues,
            'button#save': Controls.save
        };

        var optionsButtonActions = {
            'button#saveAsBtnSave': function() {Controls.saveReportOptions()},
            'button#saveAsBtnCancel': function() {Controls.reportOptionsDialog.hide()}
        };

        if ($(ControlsBase.INPUT_CONTROLS_DIALOG)) {
            this.controlDialog = new ControlDialog(dialogButtonActions);
        }

        if ($(ControlsBase.SAVE_REPORT_OPTIONS_DIALOG)) {
            this.reportOptionsDialog = new OptionsDialog(optionsButtonActions);
        }

        if ($(ControlsBase.INPUT_CONTROLS_FORM)) {
            $(ControlsBase.INPUT_CONTROLS_FORM).observe('click', function(e) {
                var elem = e.element();

                // observe Input Controls buttons
                for (var pattern in this.buttonActions) {
                    if (matchAny(elem, [pattern], true)) {
                        this.buttonActions[pattern]();
                        e.stop();
                        return;
                    }
                }

            }.bindAsEventListener(this));
        }

        if ($(ControlsBase.REPORT_OPTIONS_SELECTOR)) {
            $(ControlsBase.REPORT_OPTIONS_SELECTOR).observe('change', function(e) {
                var elem = e.element();
                var value = elem.options[elem.selectedIndex].value;
                if (value != "") {            	
                    autoCascade(Report.reportUnitURI,value);
                   
                } else {
                    this.reset();
                }
                /**
                 * Bug 24505 fix. Google Chrome specific. 
                 */
                jQuery('#inputControlsForm').find('input').eq(0).focus();
            }.bindAsEventListener(this));
        }

        this.inputControlsLocation = $(ControlsBase.INPUT_CONTROLS_CONTAINER) ? $(ControlsBase.INPUT_CONTROLS_CONTAINER) : $(ControlsBase.INPUT_CONTROLS_FORM);
        this.toggleControlsOn = $(ControlsBase.TOOLBAR_CONTROLS_BUTTON).hasClassName('down');
    },

    cancel: function() {
        if (Report.reportControlsLayout == 1) {
            Controls.controlDialog.hide();
            Controls.resetInputValues('revertToSaved');
        } else if (Report.reportControlsLayout == 2) {
            if (Controls.separatePageICLayoutFirstShow) {
                Report.goBack();
            } else {
                Controls.resetInputValues('revertToSaved');
                Controls.showReport();
            }
        }
    },

    reset: function() {
        autoCascade(Report.reportUnitURI,Report.reportOptionsURI);
        // resetReportOptionsSelect();              
        
        if(location.href.indexOf('reportOptionsURI=') >= 0){
        	Controls.resetInputValues('revertToSaved'); // fix for bug #23276
        } else {
        	Controls.resetInputValues('resetToDefaults'); // fix for bug #23933
        }
    },


    save: function() {
        var saveAction = function(hasErrors) {
            if (!hasErrors) {
                var params = {};
                var callback = function(response) {
                    var dlg = Controls.reportOptionsDialog;
                    dlg.input.setValue(response.name);
                    dlg.overwrite = false;

                    ValidationModule.hideError(dlg.input);
                    dlg.show();
                    selectAndFocusOn(dlg.input);
                }
                Controls._sendInfo('getOptionsName', params, callback);
            } else {
                // todo: scroll to error
            }
        }
        Controls.setInputValues(null, saveAction);
    },


    saveReportOptions: function () {

        var optionName =  Controls.reportOptionsDialog.input.getValue();

        var params = {
            optionsName: optionName,
            overwriteOptions: Controls.reportOptionsDialog.overwrite
        };

        var callback = function(response) {

            if (response.result == 'exists') {
                ValidationModule.showError(Controls.reportOptionsDialog.input, response.message);
                Controls.reportOptionsDialog.overwrite = true;

            } else if (response.result == 'error') {
                ValidationModule.showError(Controls.reportOptionsDialog.input, response.message);

            } else if (response.result == 'saved') {
                dialogs.systemConfirm.show(Controls._messages["jasper.report.option.saved"]);
                Controls.reportOptionsDialog.hide();

                // show Report Options selector and update it with the new option
                if (Controls.controlDialog) {
                    Controls.controlDialog._dom.addClassName('showingSubHeader');
                } else {
                    $(ControlsBase.INPUT_CONTROLS_FORM).addClassName('showingSubHeader');
                }

                var headerPattern = Report.reportControlsLayout == 3
                        ? '.panel.pane.inputControls > .content > .header'
                        : 'div.sub.header';
                $$(headerPattern)[0].removeClassName(layoutModule.HIDDEN_CLASS);

                if (!response.overwritten) {
					var el = document.createElement("option");
					el.value = response.value;
					el.update(response.name);
					el.selected = true;
					$(ControlsBase.REPORT_OPTIONS_SELECTOR).appendChild(el);
                } else {
                    var ele = $(ControlsBase.REPORT_OPTIONS_SELECTOR).options;
                    for (var i = 0; i < ele.length; i++) {
                        if (ele[i].value == response.value) {
                            ele[i].selected = true;
                            break;
                        }
                    }
                }

            }
        }

        ValidationModule.hideError(Controls.reportOptionsDialog.input);

        Controls._sendInfo('saveOptions', params, callback);
    },



    resetInputValues: function(eventId, callback) {
        var url = buildActionUrl({flowExecutionKey: Report.reportExecutionKey(), eventId: eventId, require: 'ajaxresponse'});

        var internalCallback = function() {
            ControlsBase.evalScripts();
            resetReportOptionsSelect();
            callback && callback();
            //resetReportOptionsMultiSelect();
        };

        var options =  {
            callback: internalCallback,
            fillLocation: Controls.inputControlsLocation,
            errorHandler: baseErrorHandler
        };

        ajaxTargettedUpdate(url, options);
    },

    applyInputValues: function(actionName, postAction) {
        var setInputValuesCallback = function(hasErrors) {
            if (!hasErrors) {
                $('reportContainer').update($('reportOutput').innerHTML);
                $('reportOutput').update(); //it's need to avoid duplicate id's of elements
                Report.reportRefreshed();
                if (actionName == 'Ok' && Controls.controlDialog) {
                    Controls.controlDialog.hide();
                }

                if (Report.reportControlsLayout == 2) {
                    if (Report.nothingToDisplay) {
                        Report.nothingToDisplay.addClassName(layoutModule.HIDDEN_CLASS);
                    }
                    Controls.showReport();
                    // pagination shouldn't be centered any more: bug #24625. Commenting it out:
                    //  centerElement($(Report.PAGINATION_CONTAINER), {horz: true});
                    if (Controls.separatePageICLayoutFirstShow) {
                        Controls.separatePageICLayoutFirstShow = false;
                    }
                }
            } else {
                // todo: scroll to error
            }
            postAction && postAction(hasErrors);
        };
        ControlsBase.removeEvalScripts();
        Controls.setInputValues(actionName, setInputValuesCallback);
    },

    show : function() {
        switch (Report.reportControlsLayout) {
            case 2:
                Controls.showControls();
                break;
            case 3:
                Controls.toggleControls();
                break;
            default:
                Controls.showDialog();
        }
    },

    toggleControls: function() {
        if (Controls.toggleControlsOn) {
            $(ControlsBase.TOOLBAR_CONTROLS_BUTTON).removeClassName('down').addClassName('up');
            $$('.panel.pane.inputControls')[0].addClassName(layoutModule.HIDDEN_CLASS);
        } else {
            $(ControlsBase.TOOLBAR_CONTROLS_BUTTON).removeClassName('up').addClassName('down');
            $$('.panel.pane.inputControls')[0].removeClassName(layoutModule.HIDDEN_CLASS);
        }

        Controls.toggleControlsOn = !Controls.toggleControlsOn;
        
        isIPad() && Report.touchController.reset();
        /**
         * Fix to force rendering of input controls on webkit.
         */
        jQuery('#'+ControlsBase.INPUT_CONTROLS_FORM).show().height();
    },

    showDialog : function() {
        Controls.controlDialog.show();
    },

    showReport : function() {
        $(layoutModule.PAGE_BODY_ID).
                removeClassName(layoutModule.CONTROL_PAGE_CLASS).addClassName(layoutModule.ONE_COLUMN_CLASS);
    },

    showControls : function() {
        $(layoutModule.PAGE_BODY_ID).
                removeClassName(layoutModule.ONE_COLUMN_CLASS).addClassName(layoutModule.CONTROL_PAGE_CLASS);
        
        document.getElementById(ControlsBase.INPUT_CONTROLS_FORM) && jQuery('#'+ControlsBase.INPUT_CONTROLS_FORM).show();
    },

//////////////////////////////
// Communication with server
//////////////////////////////

    _sendInfo: function(eventId, params, callback) {
        var urlData = {flowId: 'viewReportFlow', flowExecutionKey: Report.flowExecutionKey, eventId: eventId};
        Controls.sendAjaxRequest(urlData, params, callback);
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
    },

    cancelExecutionErrorHandler: function(ajaxAgent) {
        var isErrorPage = ajaxAgent.getResponseHeader("JasperServerError");
        if (isErrorPage && Report.refreshReportCanceled) {
            Report.refreshReportCanceled = false;
            // do not show error if report execution was canceled
            Controls._enableOkAndApplyButtons(true);
			return true;
		} else {
			return baseErrorHandler(ajaxAgent);
		}
    },

   _enableOkAndApplyButtons: function(enable) {
        [ControlsBase._BUTTON_OK, ControlsBase._BUTTON_APPLY].each(function(button) {
            if ($(button)) {
                !enable && $(button).removeClassName(layoutModule.HOVERED_CLASS);
                $(button).writeAttribute(layoutModule.DISABLED_ATTR_NAME, enable ? null : layoutModule.DISABLED_ATTR_NAME);
            }
        });
    },

    setInputValues: function (actionName, postAction) {
        var url = "flow.html?_flowExecutionKey=" + Report.reportExecutionKey() + "&decorate=no";

        var tempContainer = Builder.node('DIV', {id: ControlsBase.TEMP_REPORT_CONTAINER, style: 'display:none'});
        document.body.insertBefore(tempContainer, document.body.firstChild);

        //Added to avoid double-click on ok and apply buttons
        Controls._enableOkAndApplyButtons(false);

        var setInputValuesCallback = function() {
            var tempContainer = $(ControlsBase.TEMP_REPORT_CONTAINER);
            var errorDivs = $$(ControlsBase.WRAPPER_ERROR_FLAG_PREFIX_SELECTOR);
            var errors = $(ControlsBase.WRAPPERS_ERRORS_DIV) ? $H(window.eval('(' + $(ControlsBase.WRAPPERS_ERRORS_DIV).innerHTML + ')')) : false;
            ControlsBase.setControlsErrors(errors);

            postAction && postAction(errors);
            tempContainer.remove();
            Controls._enableOkAndApplyButtons(true);
        };
        
        ajaxTargettedFormSubmit(
            ControlsBase.INPUT_CONTROLS_FORM,
            url,
            {
                extraPostData: {"_eventId": "applyParameter"},
                fillLocation: tempContainer,
                //fromLocation: "reportOutput",
                callback: setInputValuesCallback,
                errorHandler: Controls.cancelExecutionErrorHandler
            });
    }
};

