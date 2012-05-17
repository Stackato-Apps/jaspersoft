

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

//////////////////////////////////////////
// Event handling for toolbar
//////////////////////////////////////////

toolbarButtonModule.initialize = function(actionMap){
    toolbarButtonModule.actionMap = actionMap;
    if (document.body) {
        var body = $(document.body);
        /**
         * Mouse up event. Allow to trickle up the dom chain
         */
        body.stopObserving('mouseup', toolbarButtonModule.mouseUpHandler);
        body.observe('mouseup', toolbarButtonModule.mouseUpHandler);


        /**
         * Mouse over event. Allow to trickle up the dom chain
         */
        body.stopObserving('mouseover', toolbarButtonModule.mouseOverHandler);
        body.observe('mouseover', toolbarButtonModule.mouseOverHandler);


        /**
         * Mouse out event. Allow to trickle up the dom chain
         */
        body.stopObserving('mouseout',toolbarButtonModule.mouseOutHandler);
        body.stopObserving('mouseout').observe('mouseout', toolbarButtonModule.mouseOutHandler);
    }

};


toolbarButtonModule.mouseUpHandler = function(evt){
    var element = evt.element();
    if (element.nodeName != "BUTTON") {
        var temp = element;
        element = matchMeOrUp(element.parentNode,"button");
        if (!(element)) {
            element = temp;
        }
    }

    if (element.hasClassName(toolbarButtonModule.CAPSULE_PATTERN)) {
        var elementId = element.readAttribute("id");
        var execFunction = toolbarButtonModule.actionMap[elementId];
        if (execFunction) {
            var executableFunction = getAsFunction(execFunction);
            executableFunction(evt);
            evt.stop();
        }
    }
};



toolbarButtonModule.mouseOverHandler = function(evt){
    var element = evt.element();
    if (element.nodeName != "BUTTON") {
        var temp = element;
        element = matchMeOrUp(element.parentNode,"button");
        if (!(element)) {
            element = temp;
        }
    }

    if (element.hasClassName(toolbarButtonModule.CAPSULE_PATTERN)) {
        if (element.hasClassName("mutton") && !buttonManager.isDisabled(element)) {
            toolbarButtonModule.showButtonMenu(evt, element);
        }
    }
};



toolbarButtonModule.mouseOutHandler = function(evt){
    var element = evt.element();
    if (element.nodeName != "BUTTON") {
        var temp = element;
        element = matchMeOrUp(element.parentNode,"button");
        if (!isNotNullORUndefined(element)) {
            element = temp;
        }
    }
};


