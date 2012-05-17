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

var resourceReport = {
    SET_UP_PAGE_ID: "addReport_SetUp",
    LABEL_ID: "label",
    RESOURCE_ID_ID: "resourceID",
    DESCRIPTION_ID: "reportUnit.description",
    FILE_PATH_ID: "filePath",
    RESOURCE_URI_ID: "resourceUri",
    FILE_SYSTEM_SOURCE_ID: "FILE_SYSTEM",
    CONTENT_REPOSITORY_SOURCE_ID: "CONTENT_REPOSITORY",

    RESOURCE_NAME_ID: "resourceName",
    EDIT_RESOURCE_BUTTON_ID: "editResourceButton",
    REMOVE_RESOURCE_BUTTON_ID: "removeResourceButton",
    ADD_RESOURCE_BUTTON_ID: "addResourceButton",
    EDIT_CONTROL_BUTTON_ID: "editControlButton",
    REMOVE_CONTROL_BUTTON_ID: "removeControlButton",
    ADD_CONTROL_BUTTON_ID: "addControlButton",

    SAVE_BUTTON_ID: "done",

    _canGenerateId: true,

    initialize: function(options) {
        this._setUpPage = $(this.SET_UP_PAGE_ID);

        if (this._setUpPage) {
            this._form = $(document.body).select('form')[0];
            this._label = $(this.LABEL_ID);
            this._resourceId = $(this.RESOURCE_ID_ID);
            this._description = $(this.DESCRIPTION_ID);
            this._filePath = $(this.FILE_PATH_ID);
            this._resourceUri = $(this.RESOURCE_URI_ID);

            this._fileSystemSource = $(this.FILE_SYSTEM_SOURCE_ID);
            this._contentRepositorySource = $(this.CONTENT_REPOSITORY_SOURCE_ID);

            this._saveButton = $(this.SAVE_BUTTON_ID);

            this._isEditMode = options ? options.isEditMode : false;
            this._initialSource =
                    this._fileSystemSource.checked ? this._fileSystemSource : this._contentRepositorySource;
            this._jrxmlFileResourceAlreadyUploaded = options.jrxmlFileResourceAlreadyUploaded;
            this._label.validator = resource.labelValidator.bind(this);
            this._resourceId.validator = resource.resourceIdValidator.bind(this);
            this._description.validator = resource.descriptionValidator.bind(this);
            this._filePath.validator = this._filePathValidator.bind(this);
            this._resourceUri.validator = this._resourceUriValidator.bind(this);

            this._initEvents();
        }

        // Resource locator.
        var resourceOptions =  {
            fileUploadInput : 'filePath',
            resourceInput : 'resourceUri',
            browseButton : 'browser_button',
            treeId: 'resourceTreeRepoLocation',
            dialogTitle: resource.messages["resource.Report.Title"],
            selectLeavesOnly: true
        };
        if (options && $(resourceOptions.browseButton)) {
            if (options.type == "fileResource") {
                resourceOptions.providerId = 'fileResourceTreeDataProvider';
            } else if (options.type == "jrxml") {
                resourceOptions.providerId = 'jrxmlTreeDataProvider';
            } else if (options.type == "olapMondrianSchema") {
                resourceOptions.providerId = 'olapSchemaTreeDataProvider';
            } else if (options.type == "folder") {
                resourceOptions.treeId = 'addFileTreeRepoLocation';
                resourceOptions.providerId = 'repositoryExplorerTreeFoldersProvider';
                resourceOptions.resourceInput = 'folderUri';
            }
            resourceLocator.initialize(resourceOptions);
        }
    },

    _initEvents: function() {
        this._saveButton.observe('click', function(e) {
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
    },

    _isDataValid: function() {
        var elementsToValidate = [this._label, this._resourceId, this._description, this._filePath, this._resourceUri];

        return ValidationModule.validate(resource.getValidationEntries(elementsToValidate));
    },

    _filePathValidator: function(value) {
        var isValid = true;
        var errorMessage = "";

        if (this._fileSystemSource.checked && value.blank()
                && (!this._isEditMode || this._initialSource != this._fileSystemSource)
                && !this._jrxmlFileResourceAlreadyUploaded) {
            errorMessage = resource.messages['filePathIsEmpty'];
            isValid = false;
        }

        return {
            isValid: isValid,
            errorMessage: errorMessage
        };
    },

    _resourceUriValidator: function(value) {
        var isValid = true;
        var errorMessage = "";

        if (this._contentRepositorySource.checked && value.blank()) {
            errorMessage = resource.messages['resourceUriIsEmpty'];
            isValid = false;
        }

        return {
            isValid: isValid,
            errorMessage: errorMessage
        };
    },

    editResource: function(resourceName) {
        $(this.RESOURCE_NAME_ID).setValue(resourceName);
        $(this.EDIT_RESOURCE_BUTTON_ID).click();
    },

    removeResource: function(resourceName) {
        $(this.RESOURCE_NAME_ID).setValue(resourceName);
        $(this.REMOVE_RESOURCE_BUTTON_ID).click();
    },

    addResource: function() {
        $(this.ADD_RESOURCE_BUTTON_ID).click();
    },

    editControl: function(resourceName) {
        $(this.RESOURCE_NAME_ID).setValue(resourceName);
        $(this.EDIT_CONTROL_BUTTON_ID).click();
    },

    removeControl: function(resourceName) {
        $(this.RESOURCE_NAME_ID).setValue(resourceName);
        $(this.REMOVE_CONTROL_BUTTON_ID).click();
    },

    addControl: function() {
        $(this.ADD_CONTROL_BUTTON_ID).click();
    }
};

document.observe("dom:loaded", function() {
    resourceReport.initialize(localContext.initOptions);
});
