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

////////////////////////////////////////////////
// Generic toolbar button utils
////////////////////////////////////////////////

var toolbarButtonModule = {

    UP : "up",
    DOWN : "down",
    OVER : "over",
    DISABLED : "disabled",
    PRESSED : "pressed",
    CONTENT_PREFIX : "toolbar_", //action model
    MenuClass : "menu vertical dropDown",
    TOOLBAR_MENU_CLASS : "menu vertical dropDown",
    ACTION_MODEL_TAG : "adhocActionModel",
    CAPSULE_PATTERN : "capsule",



    /**
     * Used by all toolbar components to show menu
     * @param event
     * @param object object we want the menu for
     */
    showButtonMenu : function(event, object){
        var context = this.CONTENT_PREFIX + $(object).readAttribute("id");
        var menuLeft = getBoxOffsets(object, null)[0];
        var menuTop =   getBoxOffsets(object, null)[1] + $(object).getHeight();
        var coordinates = {"menuLeft" : menuLeft, "menuTop" : menuTop};
        actionModel.showDynamicMenu(context, event, this.TOOLBAR_MENU_CLASS, coordinates, this.ACTION_MODEL_TAG);
        Event.observe($("frame"), 'mouseover', toolbarButtonModule.menuMouseOut);
    },




    /**
     * This is the action to be performed when we mouse out of the toolbar menu
     * @param event
     */
    showButtonMenuMouseOut : function(event){
        if ($('menu').hasClassName(this.TOOLBAR_MENU_CLASS)){
            var e = window.event ? window.event : event;
            var hovered = window.event? e.srcElement : e.target;

            if (!actionModel.isTopAncestorTheMenu(hovered)){
                actionModel.hideMenu();
                Event.stopObserving($("frame"), "mouseover", toolbarButtonModule.menuMouseOut);
            }
        }
    },

	menuMouseOut: function(event) {
        toolbarButtonModule.showButtonMenuMouseOut(event);
    },

    /**
     * Test to see if the button clicked is a toolbar type
     * @param button
     */
    isToolBarButton : function(button){
        if (button){
            return ($(button).hasClassName("capsule"));
        } else{
            return false;
        }

    },

    /**
     * Used to enable toolbar button
     * @param button
     * @param enable
     */
    enable : function(button, enable){
        buttonManager.enable(button);
    },


    /**
     * Used to disable toolbar button
     * @param button
     */
    disable : function(button){
        buttonManager.disable(button);
    },


    /**
     * Used to enable or disable button based on adhoc state variables
     * @param button
     * @param enable
     */
    setButtonState : function(button, enable){
        if(enable){
            this.enable(button);
        }else{
            this.disable(button);
        }
    },


    /**
     * Legacy code now. Called when there is a pull up on a button..
     * @param button
     */
    pullUp : function(button){
        if (button) {
            $(button).removeClassName(this.DOWN);
            $(button).addClassName(this.UP);
        }
    },


    /**
     * Legacy code now. Called when there is a push down on a button..
     * @param button
     */
    pushDown : function(button){
        if (button) {
            $(button).removeClassName(this.UP);
            $(button).addClassName(this.DOWN);
        }
    }

};



