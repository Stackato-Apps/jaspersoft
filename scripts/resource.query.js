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

var resourceQuery = {
    STEP1_PAGE_ID: "addResource_query_step1",
    LABEL_ID: "query.label",
    RESOURCE_ID_ID: "query.name",
    DESCRIPTION_ID: "query.description",
    JUMP_TO_PAGE_ID: "jumpToPage",
    NEXT_BUTTON_ID: "next",
    JUMP_TO_BUTTON_ID: "jumpButton",
    NEW_DATA_SOURCE_LINK_ID: "newDataSourceLink",
    LOCAL_DATA_SOURCE_ID: "LOCAL",

    _canGenerateId: true,

    initialize: function(options) {
        this._step1Page = $(this.STEP1_PAGE_ID);

        if (this._step1Page) {
            this._form = $(document.body).select('form')[0];
            this._label = $(this.LABEL_ID);
            this._resourceId = $(this.RESOURCE_ID_ID);
            this._description = $(this.DESCRIPTION_ID);

            this._label.validator = resource.labelValidator.bind(this);
            this._resourceId.validator = resource.resourceIdValidator.bind(this);
            this._description.validator = resource.descriptionValidator.bind(this);

        }
        this._nextButton = $(this.NEXT_BUTTON_ID);

        this._jumpToPage = $(this.JUMP_TO_PAGE_ID);
        this._jumpButton = $(this.JUMP_TO_BUTTON_ID);

        this._newDataSourceLink = $(this.NEW_DATA_SOURCE_LINK_ID);
        this._localDataSource = $(this.LOCAL_DATA_SOURCE_ID);

        this._isEditMode = options ? options.isEditMode : false;

        window.resourceLocator && resourceLocator.initialize({
            resourceInput : 'resourceUri',
            browseButton : 'browser_button',
            newResourceLink : 'newDataSourceLink',
            treeId : 'queryTreeRepoLocation',
            providerId : 'dsTreeDataProvider',
            dialogTitle : resource.messages["resource.Query.Title"],
            selectLeavesOnly: true
        });

        this._initEvents();
    },

    _initEvents: function() {
        if (this._step1Page) {
            this._nextButton.observe('click', function(e) {
                if (!this._isDataValid()) {
                    e.stop();
                }
            }.bindAsEventListener(this));

            this._form.observe('keyup', function(e) {
                var element = e.element();
                var targetElements = [this._label, this._resourceId, this._description];

                if (targetElements.include(element)) {
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
        }
        
        if (this._newDataSourceLink) {
            this._newDataSourceLink.observe('click', function(e) {
                if (this._localDataSource.checked) {
                    this._nextButton.click();
                }
            }.bindAsEventListener(this));
        }
    },

    _isDataValid: function() {
        var elementsToValidate = [this._label, this._resourceId, this._description];

        return ValidationModule.validate(resource.getValidationEntries(elementsToValidate));
    },

    jumpTo: function(pageTo) {
        this._jumpToPage.setValue(pageTo);
        this._jumpButton.click();
        
        return false;
    }
};

document.observe("dom:loaded", function() {
    resourceQuery.initialize(localContext.initOptions);
});
