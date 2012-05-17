/*
 * Copyright (C) 2005 - 2010 Jaspersoft Corporation. All rights reserved.
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

var resource = {
    messages: {},

    resourceLabelMaxLength: 100,
    resourceIdMaxLength: 100,
    resourceDescriptionMaxLength: 250,
    
    PROPAGATE_EVENT: 'propagateEvent',
    STEP_DISPLAY_ID: "stepDisplay",
    FLOW_CONTROLS_ID: "flowControls",

    initSwipeScroll: function() {

        var display = $(resource.STEP_DISPLAY_ID);
//        var hasControls = $(resource.FLOW_CONTROLS_ID).childElements().length > 0;
//
//        var scrollElement = hasControls ? display.up() : display;
        display && new TouchController(display.up(), display.up(1), {
//            debug: true
        });
    },

    submitForm: function(formId, params, fillForm) {
        if (!params) {
            return;
        }

        // prepare action url
        var url = buildActionUrl(params);

        fillForm && fillForm();

        // write form attributes and submit it
        $(formId).writeAttribute('method', 'post').writeAttribute('action', url);
        $(formId).submit();
    },

    // Setup main event handler for click events on Add Resource pages.
    registerClickHandlers: function(handlers, observeElementSelector, addAtBeginning) {
        if (resource._bodyClickEventHandlers) {
            //If we want some handlers to fire before others we should pass addAtBeginning = true
            (addAtBeginning ? Array.prototype.unshift : Array.prototype.push).
                    apply(resource._bodyClickEventHandlers, handlers);
            return;
        }

        resource._bodyClickEventHandlers = handlers;
        var selector = observeElementSelector ? observeElementSelector : 'body';
        $$(selector)[0].observe('click', function(event) {

            resource._bodyClickEventHandlers && resource._bodyClickEventHandlers.each(function(clickEventHandler) {
                var result = clickEventHandler(event);

                //if handler returns some result
                //this means that we have found necessary handler so
                //do not need to process other
                if (result) {
                    if (result !== resource.PROPAGATE_EVENT) {
                        Event.stop(event);
                    }
                    throw $break;
                }
            });
        });
    },

    basicClickEventHandler : function(event, factory) {
        var result = null;
        factory.each(function(pair) {
            var selector = pair.key, handler = pair.value;

            var element = event.findElement(selector);
            if (element) {
                result = handler(element);
                throw $break;
            }
        });
        return result;
    },

    TreeWrapper :  function(options) {
        var that = this;
        this._treeId = options.treeId;
        this._resourceUriInput = $(options.resourceUriInput || 'resourceUri');
        this._uri = this._resourceUriInput && this._resourceUriInput.getValue() || options.uri || '/';

        if (!options.providerId) throw "There is no tree provider set for tree #{id}".
                interpolate({id: this._treeId});

        // Setup folders tree
        var treeOptions = ['providerId', 'rootUri', 'organizationId', 'publicFolderUri', 'urlGetNode', 'urlGetChildren'].
                inject({}, function(treeOptions, key) {
                    options[key] !== null && (treeOptions[key] = options[key]);
                    return treeOptions;
                });
        this._tree = new dynamicTree.createRepositoryTree(this._treeId, treeOptions);

        this._tree.observe('tree:loaded', function() {
            that._tree.openAndSelectNode($(that._resourceUriInput).getValue());
        });

        this._tree.observe('leaf:selected', function(event) {
            that._uri = event.memo.node.param.uri;
            that._resourceUriInput.setValue(that._uri);
        });

        this._tree.observe('node:selected', function() {
            that._resourceUriInput.setValue(that._uri = '');
        });

        return {

            getTreeId: function() {
                return that._treeId;
            },

            getTree: function() {
                return that._tree;
            },

            selectFolder: function(folderUri) {
                that._tree.openAndSelectNode(folderUri);
            },

            getSelectedFolderUri: function() {
                return that._uri;
            }
        };
    },

    ////////////////////////////////
    // Utility Methods
    ////////////////////////////////
    switchButtonState : function(button, state) {
        buttonManager[state ? 'enable' : 'disable'].call(buttonManager, button);
    },

    switchDisableState : function(element, disable) {
        (element = $(element)) && element[disable ? 'disable' : 'enable'].call(element);
    },

    generateResourceId: function(name) {
        if (localContext && localContext.initOptions && localContext.initOptions.resourceIdNotSupportedSymbols) {
            return name.replace(new RegExp(localContext.initOptions.resourceIdNotSupportedSymbols, "g"), '_');
        } else {
            throw "There is no resourceIdNotSupportedSymbols property in init options.";
        }
    },

    testResourceId: function(resourceId) {
        if (localContext && localContext.initOptions && localContext.initOptions.resourceIdNotSupportedSymbols) {
            return new RegExp(localContext.initOptions.resourceIdNotSupportedSymbols, "g").test(resourceId);
        } else {
            throw "There is no resourceIdNotSupportedSymbols property in init options.";
        }
    },

    labelValidator: function(value) {
        var isValid = true;
        var errorMessage = "";

        if (value.blank()) {
            errorMessage = resource.messages['labelIsEmpty'];
            isValid = false;
        } else if (value.length > resource.resourceLabelMaxLength) {
            errorMessage = resource.messages['labelToLong'];
            isValid = false;
        }

        return {
            isValid: isValid,
            errorMessage: errorMessage
        };
    },

    /**
     * The context of this method should contain _isEditMode property. Id it is true then validator will not validate
     * the value but will return isValid=true.
     */
    resourceIdValidator: function(value) {
        var isValid = true;
        var errorMessage = "";

        if (!this._isEditMode) {
            if (value.blank()) {
                errorMessage = resource.messages['resourceIdIsEmpty'];
                isValid = false;
            } else if (value.length > resource.resourceIdMaxLength) {
                errorMessage = resource.messages['resourceIdToLong'];
                isValid = false;
            } else if (resource.testResourceId(value)) {
                errorMessage = resource.messages['resourceIdInvalidChars'];
                isValid = false;
            }
        }

        return {
            isValid: isValid,
            errorMessage: errorMessage
        };
    },

    descriptionValidator: function(value) {
        var isValid = true;
        var errorMessage = "";

        if (value.length > resource.resourceDescriptionMaxLength) {
            errorMessage = resource.messages['descriptionToLong'];
            isValid = false;
        }

        return {
            isValid: isValid,
            errorMessage: errorMessage
        };
    },

    getValidationEntries: function(elementsToValidate) {
        // To use this method all elements should have validator property set.
        return elementsToValidate.collect(function(element) {
            return {validator: element.validator, element: element};
        });
    }
};

isIPad() && document.observe("dom:loaded", resource.initSwipeScroll.bind(resource));
