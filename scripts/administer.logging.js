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

var logging = {

    initialize: function() {
        layoutModule.resizeOnClient('filters', 'settings');

        this.initEvents();
    },

    initEvents: function() {
        $('display').observe('click', function(e) {
            var elem = e.element();

            var button = matchAny(elem, [layoutModule.BUTTON_PATTERN], true);
            if (button) {
                // observe navigation
                for (var pattern in Administer.menuActions) {
                    if (button.match(pattern) && !button.up('li').hasClassName('selected')) {
                        document.location = Administer.menuActions[pattern]();
                        return;
                    }
                }

            }

        });
    }

};

document.observe('dom:loaded', function() {
    logging.initialize();
});

function setLevel(logger, level) {
    document.location = 'log_settings.html?logger=' + logger + '&level=' + level;
}