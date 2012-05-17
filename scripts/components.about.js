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

/**
 * About Module.
 *
 * @author Yuriy Plakosh
 */
var about = {

    /**
     * Initialize about module.
     */
    initialize: function() {
        $('about').observe('click', function() {
            about.aboutBox.show();
        });
    }
};

///////////////////////////
// About box component
///////////////////////////
about.aboutBox = {
    _dom: null,

    _processTemplate: function() {
        this._dom = $("aboutBox");
        this._closeButton = this._dom.select('button')[0];
    },

    /**
     * Shows about box.
     */
    show: function() {
        if (this._dom == null) {
            this._processTemplate();
        }

        if (this._dom.hasClassName('hidden')) {
            this._closeButton.observe('click', function(e) {
                this._hide();
                e.stop();
            }.bindAsEventListener(this));

            dialogs.popup.show(this._dom, true);
        }
    },

    _hide: function() {
        if (!this._dom.hasClassName('hidden')) {
            dialogs.popup.hide(this._dom);

            this._closeButton.stopObserving('click');
        }
    }
};

////////////////////////////////////////////
// Initialize about module when dom loaded
////////////////////////////////////////////
document.observe('dom:loaded', function() {
    about.initialize();
});
