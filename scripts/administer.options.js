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


var Options = {

    BUTTON_FLASH: 'flushOLAPCache',

    initialize: function() {
        $('display').observe('click', function(e) {
            var elem = e.element();

            // observe navigation
            for (var pattern in Administer.menuActions) {
                if (matchAny(elem, [pattern], true) && !(matchMeOrUp(elem.parentNode, 'li').hasClassName('selected'))) {
                    document.location = Administer.menuActions[pattern]();
                    return;
                }
            }

            if (matchAny(elem, ['#' + Options.BUTTON_FLASH], true)) {
                Event.stop(e);
                Options.flushCache();
            }
        });
    },

    flushCache: function() {
        var url = 'flush.html';
        Administer._sendRequest(url, null, Options._flushCallback);
    },

    _flushCallback: function(response) {
        if (response.error) {
            dialogs.systemConfirm.show(Administer.getMessage("jsp.olap.flush.error") + ": " + response.error);
        } else {
            dialogs.systemConfirm.show(Administer.getMessage(response.result));
        }

    }
}

document.observe('dom:loaded',Options.initialize.bind(Options));
