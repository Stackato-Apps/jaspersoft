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

var resourceLocator = {
    CONTENT_REPOSITORY : 'CONTENT_REPOSITORY',
    LOCAL : 'LOCAL',
    NONE : 'NONE',
    FILE_SYSTEM : 'FILE_SYSTEM',
    LOCATE_EVENT : 'resource:locate',

    /**
     * Initializes Resource Locator common logic.
     * @param options Object with following properties:
     *     options = {
     *          fileUploadInput : 'filePath',
     *          resourceInput : 'resourceUri',
     *          browseButton : 'browser_button',
     *          newResourceLink : 'link_id',
     *          treeId : 'resourceBrowserTreeId',
     *          providerId : 'treeProviderId',
     *          dialogTitle : 'Select Resource From Repository'
     *      }
     *
     */
    initialize: function(options) {
        this.resourceUri = $(options.resourceInput);
        this.browseButton = $(options.browseButton);
        this.filePath = $(options.fileUploadInput);
        this.newResourceLink = $(options.newResourceLink);

        try {
            this._initFileSelector(options);
        } finally {
            this._initEvents();
        }
        return this;
    },

    _initEvents: function() {
        resource.registerClickHandlers([
            resource.basicClickEventHandler.bindAsEventListener(this, this._createClickHandlersFactory())]);
    },

    _createClickHandlersFactory : function() {
        return $H({
            'div > #CONTENT_REPOSITORY' : function(element) {
                this._updateResourceSelectorState(element.identify())
                element.fire(resourceLocator.LOCATE_EVENT);
                return resource.PROPAGATE_EVENT;
            }.bind(this),
            'div > #FILE_SYSTEM' : function(element) {
                this._updateResourceSelectorState(element.identify())
                element.fire(resourceLocator.LOCATE_EVENT);
                return resource.PROPAGATE_EVENT;
            }.bind(this),
            'div > #NONE' : function(element) {
                this._updateResourceSelectorState(element.identify())
                element.fire(resourceLocator.LOCATE_EVENT);
                return resource.PROPAGATE_EVENT;
            }.bind(this),
            'div > #LOCAL' : function(element) {
                this._updateResourceSelectorState(element.identify())
                element.fire(resourceLocator.LOCATE_EVENT);
                return resource.PROPAGATE_EVENT;
            }.bind(this)
        });
    },

    _updateResourceSelectorState : function(id) {
        // Update File upload component state.
        resource.switchButtonState(this.filePath, id === this.FILE_SYSTEM);
        // Update Resource selector component state: button + text input.
        resource.switchButtonState(this.browseButton, id === this.CONTENT_REPOSITORY);
        resource.switchDisableState(this.resourceUri, id !== this.CONTENT_REPOSITORY);
        // Update Create new resource link state.
        var classes = id === this.LOCAL ? ['disabled', 'launcher'] : ['launcher', 'disabled'];
        this._switchElementClasses(this.newResourceLink, classes);
    },

    _initFileSelector : function(options) {
        new picker.FileSelector({
            treeId: options.treeId,
            providerId: options.providerId,
            uriTextboxId: this.resourceUri,
            browseButtonId: this.browseButton,
            title: options.dialogTitle,
            selectLeavesOnly: options.selectLeavesOnly
        });
    },

    ///////////////////////////
    // Utility methods.
    ///////////////////////////
    _switchElementClasses : function(element, classes) {
        element && classes && element.removeClassName(classes[0]).addClassName(classes[1]);
    }
};
