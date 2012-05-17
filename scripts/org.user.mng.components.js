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

//////////////////////////////////
// Panel which shows users list
//////////////////////////////////
orgModule.userManager.userList = {
    CE_LIST_TEMPLATE_ID: "tabular_twoColumn",
    CE_ITEM_TEMPLATE_ID: "tabular_twoColumn:leaf",
    PRO_LIST_TEMPLATE_ID: "tabular_threeColumn",
    PRO_ITEM_TEMPLATE_ID: "tabular_threeColumn:leaf",

    USER_ID_PATTERN: ".ID > a",
    USER_NAME_PATTERN: ".name",
    USER_ORGANIZATION_PATTERN: ".organization",

    initialize: function(options) {
        orgModule.entityList.initialize({
            listTemplateId: (isProVersion()) ? this.PRO_LIST_TEMPLATE_ID : this.CE_LIST_TEMPLATE_ID,
            itemTemplateId: (isProVersion()) ? this.PRO_ITEM_TEMPLATE_ID : this.CE_ITEM_TEMPLATE_ID,
            onLoad: function() {
                orgModule.fire(orgModule.userManager.Event.SEARCH_NEXT, {});
            },
            onSearch: function(text) {
                orgModule.fire(orgModule.userManager.Event.SEARCH, {text: text});
            },
            toolbarModel: options.toolbarModel,
            text: options.text
        });

        orgModule.entityList._createEntityItem = function(value) {
            var item = new dynamicList.ListItem({
                    label: value.userName.escapeHTML(),
                    value: value
                });

            item.processTemplate = function(element) {
                var id = element.select(orgModule.userManager.userList.USER_ID_PATTERN)[0];
                var name = element.select(orgModule.userManager.userList.USER_NAME_PATTERN)[0];

                id.update(this.getValue().userName.escapeHTML());
                name.update(this.getValue().fullName.escapeHTML());

                var tenantId = this.getValue().tenantId;
                if (isProVersion() && tenantId) {
                    var org = element.select(orgModule.userManager.userList.USER_ORGANIZATION_PATTERN)[0];
                    org.update(tenantId.escapeHTML());
                }

                return element;
            };

            return item;
        }

    }
};

////////////////////////////////////////
// Panel which shows user's properties
////////////////////////////////////////
orgModule.userManager.properties = {
    USER_NAME_PATTERN: "#userName",
    USER_ID_PATTERN: "#propUserID",
    EMAIL_PATTERN: "#email",
    ENABLE_USER_PATTERN: "#enableUser",
    EXTERNAL_USER_PATTERN: "#externalUser",
    PASSWORD_PATTERN: "#password",
    PASSWORD_CONFIRM_PATTERN: "#confirmPassword",

    _LOGIN_AS_USER_BUTTON: "loginAsUser",

    user: null,

    initialize: function(options) {
        this.profileAttributesList = new dynamicList.List("profileAttributes", {
            listTemplateDomId: "list_type_attributes",
            itemTemplateDomId: "list_type_attributes:profileAttribute"
        });

        orgModule.properties.initialize({
            viewAssignedListTemplateDomId: "list_type_attributes",
            viewAssignedItemTemplateDomId: "list_type_attributes:role",
            searchAssigned: false,
            showAssigned: true
        });

        var panel = $(orgModule.properties._id);
        this.name = panel.select(this.USER_NAME_PATTERN)[0];
        this.id = panel.select(this.USER_ID_PATTERN)[0];
        this.email = panel.select(this.EMAIL_PATTERN)[0];
        this.enabled = panel.select(this.ENABLE_USER_PATTERN)[0];
        this.external = panel.select(this.EXTERNAL_USER_PATTERN)[0];
        this.pass = panel.select(this.PASSWORD_PATTERN)[0];
        this.confirmPass = panel.select(this.PASSWORD_CONFIRM_PATTERN)[0];

        this.email.blurValidator = orgModule.createEmailValidator(this.email, "invalidEmail");
        this._validators = [
            this.email.blurValidator,
            orgModule.createBlankValidator(this.pass, "passwordIsEmpty"),
            orgModule.createSameValidator(this.confirmPass, this.pass, "invalidConfirmPassword")
        ];

        this._initCustomEvents();

        var signedUser = options.currentUser;
        orgModule.properties.setProperties = function(properties) {
            var umProperties = orgModule.userManager.properties;

            umProperties.name.setValue(properties.fullName);
            umProperties.id.setValue(properties.userName);
            umProperties.email.setValue(properties.email);
            umProperties.enabled.checked = properties.enabled;
            umProperties.external.checked = properties.external;
            umProperties.pass.setValue(properties.password);
            umProperties.confirmPass.setValue(properties.password);

            if (properties.external) {
                umProperties.external.up("fieldset").removeClassName(layoutModule.HIDDEN_CLASS);
            } else {
                umProperties.external.up("fieldset").addClassName(layoutModule.HIDDEN_CLASS);
            }

            this.setAssignedEntities(properties.roles);

            orgModule.userManager.properties.setProfileAttributes(properties.attributes);

            if (properties.enabled && properties.getNameWithTenant() != signedUser) {
                buttonManager.enable(umProperties._LOGIN_AS_USER_BUTTON);
            } else {
                buttonManager.disable(umProperties._LOGIN_AS_USER_BUTTON);
            }
            
            if (properties.getNameWithTenant() !== signedUser) {
                buttonManager.enable(this._DELETE_BUTTON_ID);
            } else {
                buttonManager.disable(this._DELETE_BUTTON_ID);
            }
        };

        orgModule.properties._deleteEntity = function() {
            invokeClientAction("delete", {entity: this._value});
        };

        orgModule.properties._loginAsUser = function() {
            invokeManagerAction("login", {user: this._value});
        };

        orgModule.properties._editEntity = function() {
            var umProperties = orgModule.userManager.properties;

            this.resetValidation([umProperties.USER_NAME_PATTERN, umProperties.EMAIL_PATTERN,
                umProperties.PASSWORD_CONFIRM_PATTERN]);
            this.changeReadonly(true, [umProperties.USER_NAME_PATTERN, umProperties.EMAIL_PATTERN]);

            var disabled = this._value.getNameWithTenant() !== signedUser;
            this.changeDisable(disabled, [umProperties.ENABLE_USER_PATTERN]);
        };

        orgModule.properties._showEntity = function() {
            var umProperties = orgModule.userManager.properties;

            this.resetValidation([umProperties.USER_NAME_PATTERN, umProperties.EMAIL_PATTERN,
                umProperties.PASSWORD_CONFIRM_PATTERN]);
            this.changeReadonly(false, [umProperties.USER_NAME_PATTERN, umProperties.EMAIL_PATTERN]);
            this.changeDisable(false, [umProperties.ENABLE_USER_PATTERN]);
        };

        orgModule.properties.validate = function() {
            var umProperties = orgModule.userManager.properties;
            return ValidationModule.validate(umProperties._validators);
        };

        orgModule.properties.isChanged = function() {
            var umProperties = orgModule.userManager.properties;

            var oldUser = this._value;
            var user = umProperties._toUser();

            return this.isEditMode && (oldUser.fullName != user.fullName || oldUser.email != user.email ||
                    oldUser.enabled != user.enabled || oldUser.password != user.password ||
                    this.getAssignedEntities().length > 0 || this.getUnassignedEntities().length > 0);
        };

        orgModule.properties.save = function() {
            var umProperties = orgModule.userManager.properties;

            var user = umProperties._toUser();
            if (this._value.tenantId) {
                user.tenantId = this._value.tenantId;
            }

            user.roles = this.getAssignedEntities();

            invokeServerAction("update", {
                entityName: this._value.getNameWithTenant(),
                entity: user,
                assigned: this.getAssignedEntities(),
                unassigned: this.getUnassignedEntities()
            });
        };

        orgModule.properties.cancel = function() {
            this.setProperties(this._value);
        };
    },

    _initCustomEvents: function(roles) {
        var panel = $(orgModule.properties._id);

        this.id.regExp = new RegExp(orgModule.Configuration.userNameNotSupportedSymbols);
        this.id.unsupportedSymbols =
                new RegExpRepresenter(orgModule.Configuration.userNameNotSupportedSymbols).getRepresentedString();

        panel.observe('keyup', function(event) {
            var input = event.element();

            input.inputValidator && ValidationModule.validate(input.inputValidator);
            
            if (input == this.id) {
                ValidationModule.validate([orgModule.createInputRegExValidator(input)]);
                event.stop();
            }
        }.bindAsEventListener(this));

        this.email.observe('blur', function(event) {
            var input = event.element();

            if (input.blurValidator) {
                if (ValidationModule.validate(input.blurValidator)) {
                    input.inputValidator && (input.inputValidator = null);
                } else {
                    input.inputValidator = input.blurValidator;
                    input.focus();
                    return false;
                }
            }
        });

        $(orgModule.properties._BUTTONS_CONTAINER_ID).observe('click', function(event) {
            var button = matchAny(event.element(), [layoutModule.BUTTON_PATTERN], true);

            var loginAs = $(this._LOGIN_AS_USER_BUTTON);
            if (button == loginAs && !buttonManager.isDisabled(loginAs)) {
                orgModule.properties._loginAsUser();
            }

        }.bindAsEventListener(this));
    },

    _toUser: function() {
        var panel = $(orgModule.properties._id);

        return new orgModule.User({
            fullName: this.name.getValue(),
            userName: this.id.getValue(),
            email: this.email.getValue(),
            enabled: this.enabled.checked,
            external: this.external.checked,
            password: this.pass.getValue()
        });
    },

    setProfileAttributes: function(attributes) {
        var items = attributes.collect(function(attribute, index) {
            var templateDomId = attributes.length - 1 == index ? "list_type_attributes:profileAttribute:last" :
                    "list_type_attributes:profileAttribute";

            var item = new dynamicList.ListItem({
                value: attribute,
                templateDomId: templateDomId
            });

            item.processTemplate = function(element) {
                var content = element.innerHTML;

                element.update("[" + attribute.name.escapeHTML() + ":" + attribute.value.escapeHTML() + "]" + content);

                return element;
            };

            return item;
        }.bind(this));

        this.profileAttributesList.setItems(items);
        this.profileAttributesList.show();
    }
};

////////////////////////////////////////
// Create user dialog
////////////////////////////////////////
orgModule.userManager.addDialog = {
    _ADD_USER_ID: 'addUser',
    _ADD_BUTTON_ID: 'addUserBtn',
    _CANCEL_BUTTON_ID: 'cancelUserBtn',
    _FULL_NAME_ID: 'addUserFullName',
    _USER_NAME_ID: 'addUserID',
    _USER_EMAIL_ID: 'addUserEmail',
    _ENABLE_USER_ID: 'addUserEnableUser',
    _PASSWORD_ID: 'addUserPassword',
    _CONFIRM_PASSWORD_ID: 'addUserConfirmPassword',

    _ADD_BUTTON_TITLE_PATTERN: '.wrap',

    initialize: function() {
        this.addUser = $(this._ADD_USER_ID);
        this.addBtn = $(this._ADD_BUTTON_ID);
        this.cancelBtn = $(this._CANCEL_BUTTON_ID);
        this.fullName = $(this._FULL_NAME_ID);
        this.userName = $(this._USER_NAME_ID);
        this.userEmail = $(this._USER_EMAIL_ID);
        this.enableUser = $(this._ENABLE_USER_ID);
        this.password = $(this._PASSWORD_ID);
        this.confirmPassword = $(this._CONFIRM_PASSWORD_ID);

        this.userName.regExp = new RegExp(orgModule.Configuration.userNameNotSupportedSymbols);
        this.userName.regExpForReplacement = new RegExp(orgModule.Configuration.userNameNotSupportedSymbols, "g");
        this.userName.unsupportedSymbols =
                new RegExpRepresenter(orgModule.Configuration.userNameNotSupportedSymbols).getRepresentedString();

        this.userName.inputValidator = orgModule.createInputRegExValidator(this.userName);
        this.userEmail.blurValidator = orgModule.createEmailValidator(this.userEmail, "invalidEmail");
//        this.password.inputValidator = orgModule.createBlankValidator(this.password, "passwordIsEmpty"),
        this.confirmPassword.blurValidator =
                orgModule.createSameValidator(this.confirmPassword, this.password, "invalidConfirmPassword"),

        this._validators = [
            orgModule.createBlankValidator(this.userName, "userNameIsEmpty"),
            orgModule.createBlankValidator(this.password, "passwordIsEmpty",
                    function(validator) { validator.element.inputValidator = null; },
                    function(validator) { validator.element.inputValidator = validator; }),
            this.confirmPassword.blurValidator,
            this.userEmail.blurValidator,
            this.userName.inputValidator
        ];
        
        this.addUser.observe('keyup', function(event) {
            var input = event.element();

            input.inputValidator && ValidationModule.validate(input.inputValidator);
            
            if (input == this.userName) {
                if (!input.changedByUser) {
                    input.changedByUser = input.getValue() != input.prevValue;
                }
            } else if (input == this.fullName) {
                if (!this.userName.changedByUser) {
                    if (!this.userName.regExp.test(this.fullName.getValue())) {
                        this.userName.setValue(input.getValue());
                    } else {
                        this.userName.setValue(input.getValue().replace(this.userName.regExpForReplacement, '_'));
                    }
                }
                event.stop();
            }
        }.bindAsEventListener(this));

        [this.userEmail, this.confirmPassword].invoke('observe' , 'blur', function(event) {
            var input = event.element();

            if (input.blurValidator) {
                if (ValidationModule.validate(input.blurValidator)) {
                    input.inputValidator && (input.inputValidator = null);
                } else {
                    input.inputValidator = input.blurValidator;
//                    input.focus();
                    return false;
                }
            }
        });

        this.addUser.observe('keydown', function(event) {
            var input = event.element();

            if (this.userName == input) {
                this.userName.prevValue = this.userName.getValue();
            }
        }.bindAsEventListener(this));

        this.addUser.observe('click', function(event) {
            var button = matchAny(event.element(), [layoutModule.BUTTON_PATTERN], true);

            if (button == this.addBtn) {
                this._doAdd();
            } else if(button == this.cancelBtn) {
                this.hide();
            }
        }.bindAsEventListener(this));
    },

    show: function(organization) {
        this.organization = organization;

        [this.userName, this.password, this.confirmPassword, this.userEmail].each(function(e) {
            ValidationModule.hideError(e);
            e.changedByUser = false;
        });
        
        var title = this.addBtn.select(this._ADD_BUTTON_TITLE_PATTERN)[0];
        if (title) {
            var msg = (this.organization && !this.organization.isRoot()) ?
                    orgModule.getMessage('addUserTo', {
                        organizationName: orgModule.truncateOrgName(this.organization.id) 
                    }) :
                    orgModule.getMessage('addUser');

            title.update(msg);
        }

        this.addBtn.title = (this.organization && !this.organization.isRoot()) ?
                    orgModule.getMessage('addUserTo', { organizationName: this.organization.id }) :
                    orgModule.getMessage('addUser');

		dialogs.popup.show(this.addUser, true);

        try {
            this.fullName.focus();
        } catch(e) {}
    },

    hide: function() {
		dialogs.popup.hide(this.addUser);

        this.userName.setValue("");
        this.fullName.setValue("");
        this.userEmail.setValue("");
        this.enableUser.checked = true;
        this.password.setValue("");
        this.confirmPassword.setValue("");
    },

    _validate: function() {
        return ValidationModule.validate(this._validators);
    },

    _autoFill:function() {
        
    },

    _doAdd:function() {
        if (this._validate()) {
            var defaultRole = orgModule.Configuration.userDefaultRole;
            var user = new orgModule.User({
                userName: this.userName.getValue(),
                fullName: this.fullName.getValue(),
                email: this.userEmail.getValue(),
                enabled: this.enableUser.checked,
                password: this.password.getValue(),
                roles: defaultRole ? [{roleName : defaultRole}] : []
            });

            if (this.organization && !this.organization.isRoot()) { user.tenantId = this.organization.id; }

            invokeServerAction(orgModule.ActionMap.EXIST, {
                entity: user,
                onExist: function() {
                    ValidationModule.showError(this.userName, orgModule.messages['userNameIsAlreadyInUse']);
                }.bind(this),
                onNotExist: function() {
                    ValidationModule.hideError(this.userName);

                    invokeServerAction(orgModule.ActionMap.CREATE, {
                        entity: user
                    });
                }.bind(this)
            });
        }
    }
};

