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
 * Dialogs Module.
 *
 * @author Yuriy Plakosh
 */
var dialogs = {};

///////////////////////////////////////////
// System confirm object and methods
///////////////////////////////////////////

/**
 * System confirm is used to show system confirm about the last action.
 * It fades up rapidly after the action completes, and fades away on the next mouseDown anywhere on the page.
 */
dialogs.systemConfirm = {
    _dom: null,

    /**
     * The identifier of the DOM element.
     */
    DOM_ID: "systemConfirm",

    _refresh: function() {

        //TODO: find a way to update jquery`s elements without reinitialization

        //initialize all variables
        var jQ = jQuery,
            panel = jQ("#" + this.DOM_ID);

        //prepare hiding function
        this.hidePanel = function(visitor) {

            var useAsDuration = (typeof(visitor) === "number" ||
                                 typeof(visitor) === "string");
            //collect args
            var args = [
                {"opacity": 0}
            ];
            if (useAsDuration) {
                args.push(visitor);
            }else{
                panel.stop(true, true);
            }
            args.push(function() {
                panel.addClass("hidden");
                jQ(document).unbind("click.dialogs.systemConfirm");
            });
            //invoke animation
            panel.animate.apply(panel, args);
        };

        this.label = jQ("#" + this.DOM_ID + " .message");
        this.panel = panel;

    },

    /**
     * Shows system confirm with specified message.
     *
     * @param message
     * @param duration (optional) message will auto hide after duration has elapsed
     */
    show: function(message, duration) {

        if (!message || message.blank()) {
            return;
        }

        //reinitialize jquery elements
        this._refresh();

        //stop any previous animation
        this.panel.stop(true, true);

        //apply message content to the panel
        this.label.text(message);
        this.panel.css("opacity", 1);
        this.panel.removeClass("hidden");

        //auto hide if duration specified
        if (duration){
            this.hidePanel(duration);
        }

        //hide on click too
        jQuery(document).bind("click.dialogs.systemConfirm", this.hidePanel);
    }

};

//////////////////////////////////////////////
// Ajax Error Popup Dialog object and methods
//////////////////////////////////////////////

/**
 * Ajax Error dialog is used then any ajax call returns and server side error which was not
 * catched by server. It show popup dialog with stackrtace and close button.
 */
dialogs.errorPopup = {
    _dom: null,

    _content: null,

    /**
     * The identifier of the DOM element.
     */
    _DOM_ID: "standardAlert",

    /**
     * The identifier of the element there error content should be placed.
     */
    _CONTENT_ID: "errorPopupContents",

    /**
     * Pattern of element in response where error is placed
     */
    _PAGE_CONTENT_PATTERN: "#errorPageContent",

    _DIALOG_WIDTH: "546px",

    _DIALOG_HEIGHT: "350px",

    clickHandler: null,

    /**
     * Shows popup dialog.
     *
     * @param errorContent error content to be showed
     */
    show: function(errorContent) {
        var fromSource = Builder.node('DIV', {style:'display:none'});
        fromSource.innerHTML = errorContent;
        document.body.insertBefore(fromSource, document.body.firstChild);
        var content = $$(this._PAGE_CONTENT_PATTERN)[0];
        var contentText = content ? content.innerHTML : errorContent;
        var isStackTrace = (content && content.innerHTML);

        fromSource.remove(); 
        
        if (contentText) {
           if (!this._dom) {
                this._dom = $(this._DOM_ID);
                this._content = $(this._CONTENT_ID);
                this.clickHandler = this._clickHandler.bindAsEventListener(this);
            }

            if (this._dom) {
                var finalContent = contentText;

                //If error is a plain text - wrap it into <p> element
                if (!isStackTrace) {
                    finalContent = Builder.node('P', {'class':'message'});
                    finalContent.update(contentText);
                }

                this._content.update(finalContent);
                this._dom.observe('click', this.clickHandler);

                this._dom.setStyle({height: this._DIALOG_HEIGHT, width: this._DIALOG_WIDTH});
                dialogs.popup.show(this._dom);
                
                var st = document.getElementById('completeStackTrace');
                if(st) {
                	isIPad() && new TouchController(st,st.parentNode,{noInit3d:true});
                }   
            }
        }
    },

    /**
     * Hides popup dialog.
     */
    _hide: function() {
        if (this._dom) {
            this._dom.stopObserving('click', this.clickHandler);
            dialogs.popup.hide(this._dom);
        }
    },

    /*
     * Mouse click handler for close button
     */
    _clickHandler: function(event) {
        var element = event.element();

        if (matchAny(element, ['button'], true)) {
            this._hide();
        }
    }
};

/**
 * generic 'popup' dialog controller
 * @param {Object} elem
 */
dialogs.popup = {
	show: function(elem, showDimmer, options) {
        if (elem) { //dimmer
            showDimmer && pageDimmer.show();
            elem = $(elem);
            //ensure body is parent
            reParent(elem, document.body);
            
            elem.setOpacity(0);
            
            elem.removeClassName(layoutModule.HIDDEN_CLASS);

			isIE7() && !elem.match(".sizeable") && setWidthStyleByReflection(elem, '.content');

            layoutModule.createMover.call(layoutModule, elem);           
            layoutModule.createSizer.call(layoutModule, elem);

            if (options && options.cascade) {
                //cascade
                cascadeElement(elem, {position: options.position, number: options.number, horzOffset: 40, vertOffset: 40});
            } else {
                //center
                centerElement(elem, {horz: true, vert: true});
            }
            //raise if necessary
            dialogs.popup._setMaxZIndex(elem);

            isIPad() ? elem.setOpacity(1.0) : appear(elem, 0.4);	
            
            //focus
            elem.tabIndex = -1;
            elem.focus();

            elem.observe('click', dialogs.popup.zIndexHandler);
        }
	},

	hide: function(elem) {
		elem = $(elem);

        if (elem) { //hide dialog and dimmer
            if (!elem.hasClassName(layoutModule.HIDDEN_CLASS)) {
                elem.addClassName(layoutModule.HIDDEN_CLASS);
                pageDimmer.hide();
            }
            elem.stopObserving('click', dialogs.popup.zIndexHandler);
        }
	},

    /**
     * Handler for dialog z-index change on click.
     */
    zIndexHandler: function(event) {
        var element = Event.element(event);

        var dialog = matchMeOrUp(element, layoutModule.DIALOG_PATTERN);
        dialogs.popup._setMaxZIndex(dialog);
    },

    _setMaxZIndex: function(dialog) {
        if (dialog) {
            var zIndex = 0;

            var dialogs = document.body.select(layoutModule.DIALOG_PATTERN);
            var zIndexResolver = function(currentDialog) {
                // If visible and not loading dialog (it should have the highest z-index).
                if (currentDialog.visible() && !currentDialog.match(layoutModule.DIALOG_LOADING_PATTERN)) {
                    zIndex = Math.max(zIndex, currentDialog.getStyle('zIndex'),layoutModule.DIMMER_Z_INDEX + 1);
                }
            };
            dialogs.length == 1 ? zIndexResolver(dialogs[0]) : dialogs.each(zIndexResolver);

            dialog.setStyle({
                zIndex : Math.max(zIndex + 1, dialog.getStyle('zIndex'))
            });
        }
    }



};

