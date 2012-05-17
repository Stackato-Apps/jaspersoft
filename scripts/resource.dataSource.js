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

var resourceDataSource = {
    TYPE_ID: "typeID",
    PARAM_TYPE: "type",
    LABEL_ID: "labelID",
    RESOURCE_ID_ID: "nameID",
    DESCRIPTION_ID: "descriptionID",

    // JDBC
    DRIVER_ID: "driverID",
    URL_ID: "urlID",
    USER_NAME_ID: "userNameID",

    // JNDI
    SERVICE_ID: "serviceID",

    // Bean
    BEAN_NAME_ID: "beanNameID",
    BEAN_METHOD_ID: "beanMethodID",

    SUBMIT_BUTTON_ID: "save",
    SUBMIT_EVENT_ID: "submitEvent",
    TEST_BUTTON_ID: "testDataSource",
    CANCEL_BUTTON_ID: "dsCancel",

    THE_FIRST_BUTTON_IN_FORM: "theFirstButtonInForm",

    _canGenerateId: true,
    _alreadySubmitted: false,

    initialize: function(options) {
        $(this.THE_FIRST_BUTTON_IN_FORM).observe('click', function(e) {
            $(resourceDataSource.SUBMIT_BUTTON_ID).click();

            e.stop();
        });

        this._form = $(document.body).select('form')[0];
        this._submitEvent = $(this.SUBMIT_EVENT_ID);
        this._type = $(this.TYPE_ID);
        this._label = $(this.LABEL_ID);
        this._resourceId = $(this.RESOURCE_ID_ID);
        this._description = $(this.DESCRIPTION_ID);
        this._paramType = $(this.PARAM_TYPE);

        this._elementsToValidate = [this._label, this._resourceId, this._description];

        var type = this._type.getValue();
        if (type == "jdbc") {
            this._driver = $(this.DRIVER_ID);
            this._url = $(this.URL_ID);
            this._userName = $(this.USER_NAME_ID);

            this._driver.validator = this._driverValidator.bind(this);
            this._url.validator = this._urlValidator.bind(this);
            this._userName.validator = this._userNameValidator.bind(this);

            this._elementsToValidate.push(this._driver);
            this._elementsToValidate.push(this._url);
            this._elementsToValidate.push(this._userName);
        } else if (type == "jndi") {
            this._service = $(this.SERVICE_ID);

            this._service.validator = this._serviceValidator.bind(this);

            this._elementsToValidate.push(this._service);
        } else if (type == "bean") {
            this._beanName = $(this.BEAN_NAME_ID);
            this._beanMethod = $(this.BEAN_METHOD_ID);

            this._beanName.validator = this._beanNameValidator.bind(this);
            this._beanMethod.validator = this._beanMethodValidator.bind(this);

            this._elementsToValidate.push(this._beanName);
            this._elementsToValidate.push(this._beanMethod);
        }

        this._submitButton = $(this.SUBMIT_BUTTON_ID);
        this._testButton = $(this.TEST_BUTTON_ID);
        this._cancelButton = $(this.CANCEL_BUTTON_ID);

        this._isEditMode = options.isEditMode;
        this._initialType = options.type;
        this._parentFolderUri = options.parentFolderUri;
        this._connectionState = options.connectionState;

        this._label.validator = resource.labelValidator.bind(this);
        this._resourceId.validator = resource.resourceIdValidator.bind(this);
        this._description.validator = resource.descriptionValidator.bind(this);

        resourceLocator.initialize({
            resourceInput : 'folderUri',
            browseButton : 'browser_button',
            treeId : 'addFileTreeRepoLocation',
            providerId : 'repositoryExplorerTreeFoldersProvider',
            dialogTitle : resource.messages["resource.Add.Files.Title"]
        });

        this._sortTypeSelect();
        this._initEvents();
        this._showConnectionState();
    },

    _initEvents: function() {
        this._type.observe('change', function(e) {
            var currentType = e.element().getValue();

            if (this._initialType != currentType) {
//              document.location = 'flow.html?_flowId=addDataSourceFlow&type=' + currentType
//                            + '&ParentFolderUri=' + this._parentFolderUri;
                this._paramType = currentType;
                this._form.submit();
            }
        }.bindAsEventListener(this));

        var submitHandler = function(e) {
            if (!this._isDataValid()) {
                e.stop();
            } else {
               this._submitEvent.writeAttribute("disabled", "disabled");
            }
        }.bindAsEventListener(this);

        var cancelHandler = function(e) {
            this._submitEvent.writeAttribute("disabled", "disabled");
        }.bindAsEventListener(this);

        this._submitButton.observe('click', submitHandler);
        this._testButton && this._testButton.observe('click', submitHandler);
        this._cancelButton.observe('click', cancelHandler);
        this._form.observe('submit', function(e) {
            if (this._alreadySubmitted) {
                e.stop();
            } else {
                this._alreadySubmitted = true;
            }
        }.bindAsEventListener(this));

        this._form.observe('keyup', function(e) {
            var element = e.element();

            if (this._elementsToValidate.include(element)) {
                ValidationModule.validate(resource.getValidationEntries([element]));

                if (element == this._resourceId
                        && this._resourceId.getValue() != resource.generateResourceId(this._label.getValue())) {
                    this._canGenerateId = false;
                }

                if (element == this._label && !this._isEditMode && this._canGenerateId) {
                    this._resourceId.setValue(resource.generateResourceId(this._label.getValue()));

                    ValidationModule.validate(resource.getValidationEntries([this._resourceId]));
                }
            }
        }.bindAsEventListener(this));
    },

    _showConnectionState: function() {
        if (this._connectionState) {
            if (this._connectionState == "false"){
                dialogs.systemConfirm.show(resource.messages['connectionFailed']);
            } else  if (this._connectionState == "true") {
                dialogs.systemConfirm.show(resource.messages['connectionPassed']);
            }
        }
    },

    _isDataValid: function() {
        return ValidationModule.validate(resource.getValidationEntries(this._elementsToValidate));
    },

    _driverValidator: function(value) {
        var isValid = true;
        var errorMessage = "";

        if (value.blank()) {
            errorMessage = resource.messages['driverIsEmpty'];
            isValid = false;
        }

        return {
            isValid: isValid,
            errorMessage: errorMessage
        };
    },

    _urlValidator: function(value) {
        var isValid = true;
        var errorMessage = "";

        if (value.blank()) {
            errorMessage = resource.messages['urlIsEmpty'];
            isValid = false;
        }

        return {
            isValid: isValid,
            errorMessage: errorMessage
        };
    },

    _userNameValidator: function(value) {
        var isValid = true;
        var errorMessage = "";

        if (value.blank()) {
            errorMessage = resource.messages['userNameIsEmpty'];
            isValid = false;
        }

        return {
            isValid: isValid,
            errorMessage: errorMessage
        };
    },

    _serviceValidator: function(value) {
        var isValid = true;
        var errorMessage = "";

        if (value.blank()) {
            errorMessage = resource.messages['serviceIsEmpty'];
            isValid = false;
        }

        return {
            isValid: isValid,
            errorMessage: errorMessage
        };
    },

    _beanNameValidator: function(value) {
        var isValid = true;
        var errorMessage = "";

        if (value.blank()) {
            errorMessage = resource.messages['beanNameIsEmpty'];
            isValid = false;
        }

        return {
            isValid: isValid,
            errorMessage: errorMessage
        };
    },

    _beanMethodValidator: function(value) {
        var isValid = true;
        var errorMessage = "";

        if (value.blank()) {
            errorMessage = resource.messages['beanMethodIsEmpty'];
            isValid = false;
        }

        return {
            isValid: isValid,
            errorMessage: errorMessage
        };
    },

    _sortTypeSelect: function() {
        var types = $(this.TYPE_ID);
        var selected = types.getValue();
        var sorter = new Array();

        for (i = 0; i < types.length; i++) {
            sorter[i] = new Array();
            sorter[i][0] = types.options[i].text;
            sorter[i][1] = types.options[i].value;
        }

        sorter.sort();

        while (types.options.length > 0) {
            types.options[0] = null;
        }

        for (var i = 0; i < sorter.length; i++) {
            if (sorter[i][1] == selected) {
                types.options[i] = new Option(sorter[i][0], sorter[i][1], true, true);
            } else {
                types.options[i] = new Option(sorter[i][0], sorter[i][1], false, false);
            }
        }
    }
};

document.observe('dom:loaded', function() {
    resourceDataSource.initialize(localContext.initOptions);
});
