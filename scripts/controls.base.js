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

var ControlsBase = {
    INPUT_CONTROLS_FORM: "inputControlsForm",
    INPUT_CONTROLS_CONTAINER: "inputControlsContainer",
    INPUT_CONTROLS_DIALOG: "inputControls",
    SAVE_REPORT_OPTIONS_DIALOG: "saveValues",
    REPORT_OPTIONS_SELECTOR: "savedValues",
    EDIT_REPORT_OPTIONS_PAGE_FORM: "reportOptions",
    TOOLBAR_CONTROLS_BUTTON: 'ICDialog',


    _BUTTON_OK: "ok",
    _BUTTON_SAVE: "save",
    _BUTTON_APPLY: "apply",
    _BUTTON_CANCEL: "cancel",

    TEMP_REPORT_CONTAINER: 'tempReportContainer',
    WRAPPER_ERROR_FLAG_PREFIX_SELECTOR: 'div[id^=error_]',
    WRAPPERS_ERRORS_DIV: 'wrappersErrors',
    EVAL_SCRIPT_ELEMENT_NAME: "_evalScript",

    _messages: {},
    getMessage: function(messageId, object) {
        var message = this._messages[messageId];
        return message ? new Template(message).evaluate(object ? object : {}) : "";
    },

    setControlError: function(errorDiv, error) {
        if (!errorDiv) return;
        errorDiv = $(errorDiv);

        if (error) {
            errorDiv.up().addClassName(layoutModule.ERROR_CLASS);
            errorDiv.nextSiblings()[0].update(error);
        } else {
            errorDiv.up().removeClassName(layoutModule.ERROR_CLASS);
            errorDiv.nextSiblings()[0].update('');
        }
    },

    setControlsErrors: function(errors) {
        var errorDivs = $$(ControlsBase.WRAPPER_ERROR_FLAG_PREFIX_SELECTOR);
        errorDivs.each(function(div) {
            var error = false;
            errors && errors.each(function(pair) {
                if (div.id.indexOf(pair[0]) > -1) {
                    ControlsBase.setControlError(div, pair[1]);
                    error = true;
                    throw $break;
                }
            });

            if (!error) {
                ControlsBase.setControlError(div, '');
            }
        });
    },

    evalScripts: function() {
        var elements = document.getElementsByName(ControlsBase.EVAL_SCRIPT_ELEMENT_NAME);
        for (var i = 0; i < elements.length; i++) {
            window.eval(elements[i].value);
        }

        ControlsBase.removeEvalScripts(elements);
    },

    removeEvalScripts: function(scriptElements) {
        var elements = scriptElements ? scriptElements : document.getElementsByName(ControlsBase.EVAL_SCRIPT_ELEMENT_NAME);

        // Remove evaluated elements so they newer will be evaluated twice.
        $A(elements).clone().each(function(elem) {
            $(elem).remove();
        })
    }

};

//////////////////////////
//  Input Controls dialog
//////////////////////////
var ControlDialog = function(buttonActions) {
    this._dom = $(ControlsBase.INPUT_CONTROLS_DIALOG);

    this.buttonActions = buttonActions;

    if (isIPad()) {
        var el = $(ControlsBase.INPUT_CONTROLS_FORM).up();
        new TouchController(el, el.up());
    }

    this._dom.observe('click', this._dialogClickHandler.bindAsEventListener(this));
};

// observe buttons
ControlDialog.addMethod("_dialogClickHandler", function(e) {
    var element = e.element();

    // observe buttons
    for (var pattern in this.buttonActions) {
        if (matchAny(element,  [pattern], true)) {
            this.buttonActions[pattern]();
            e.stop();
            return;
        }
    }
});

ControlDialog.addMethod("show", function() {
    dialogs.popup.show(this._dom);
});

ControlDialog.addMethod("hide", function() {
    dialogs.popup.hide(this._dom);
});


///////////////////////////////
//  Save Report Options dialog
///////////////////////////////
var OptionsDialog = function(buttonActions) {
    this._dom = $(ControlsBase.SAVE_REPORT_OPTIONS_DIALOG);
    this.input = this._dom.select('input#savedValuesName')[0];
    this.overwrite = false;

    this.buttonActions = buttonActions;
    this._dom.observe('click', this._dialogClickHandler.bindAsEventListener(this));

};

// observe buttons
OptionsDialog.addMethod("_dialogClickHandler", function(e) {
    var element = e.element();

    // observe buttons
    for (var pattern in this.buttonActions) {
        if (matchAny(element,  [pattern], true)) {
            this.buttonActions[pattern]();
            e.stop();
            return;
        }
    }
});

OptionsDialog.addMethod("show", function() {
    dialogs.popup.show(this._dom);
});

OptionsDialog.addMethod("hide", function() {
    dialogs.popup.hide(this._dom);
});

