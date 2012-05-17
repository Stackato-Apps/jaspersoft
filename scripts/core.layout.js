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
 * @author Angus Croll
 */
var layoutModule = {
    ELEMENT_CONTEXTMENU: "element:contextmenu",

    //predefine CSS patterns for element sifting
    SIZEABLE_PATTERN: '.sizeable',
    SIZER_PATTERN: '.sizer',
    MOVEABLE_PATTERN: '.moveable',
    MOVER_PATTERN: '.mover',
    MINIMIZER_PATTERN: '.minimize',
    MINIMIZED_PATTERN: '.minimized .minimize',
    TRUNCATE_PATTERN: '.trunc',
    TREE_LEAF_PATTERN: 'a.>node',
    TREE_CONTAINER_PATTERN: '.collapsible',
    TOOLBAR_CAPSULE_PATTERN: '#toolbar .capsule',
    NAVIGATION_MUTTON_PATTERN: 'li.mutton',
    NAVIGATION_PATTERN: '#navigationOptions li',
    NAVIGATION_HOVER_PATTERN: '#navigationOptions li.over',
    META_LINKS_PATTERN: '#metaLinks #main_logOut_link',
    BUTTON_SET_BUTTON: '.buttonSet > .',
    TABSET_TAB_PATTERN: '.tab',
    BUTTON_PATTERN: '.button',
    PRESSED_PATTERN: '.pressed',
    SELECTED_PATTERN: '.selected',
    LIST_ITEM_PATTERN: '.list.responsive > li',
    LIST_ITEM_WRAP_PATTERN: '.wrap',
    DISCLOSURE_BUTTON_PATTERN: ".disclosure",
    MENU_LIST_PATTERN: '#menu li',
    SEPARATOR_PATTERN: '.separator',	
    MESSAGE_WARNING_PATTERN: '.message.warning',
    COLUMN_NODE_WRAPPER_PATTERN: ".node > .wrap > .column",
    COLUMN_LEAF_WRAPPER_PATTERN: ".leaf > .wrap > .column",
    SEARCH_LOCKUP_PATTERN: ".searchLockup",
    DIALOG_PATTERN: ".dialog",
    DIALOG_LOADING_PATTERN: ".dialog.loading",
    SWIPE_SCROLL_PATTERN: ".swipeScroll",
    SCROLL_WRAPPER_PATTERN: ".scrollWrapper",

    //classes
    ADHOC_MODE_OPTION_CLASS: 'tab mode horizontal', //not used?
    DRAGGING_CLASS: 'dragging',
    COPY_CLASS: 'copy',
    PRESSED_CLASS : 'pressed',
    SELECTED_CLASS : 'selected',
    DISABLED_CLASS : 'disabled',
    HOVERED_CLASS : 'over',
    ERROR_CLASS : 'error',
    UP_CLASS : 'up',
    LAST_CLASS : 'last',
    FIRST_CLASS : 'first',
    SCHEDULED_CLASS: 'scheduled',
    NODE_CLASS: 'node',
    LEAF_CLASS: 'leaf',
    ICON_CLASS: 'icon',	
    OPEN_CLASS: 'open',
    CLOSED_CLASS: 'closed',
    LOADING_CLASS: 'loading',
    NOTHING_TO_DISPLAY_CLASS: 'nothingToDisplay',
    COLLAPSIBLE_CLASS: "collapsible",
    RESPONSIVE_CLASS: "responsive",
    HIDDEN_CLASS: "hidden",
    EMPHASIS_CLASS: "emphasis",    
    ASCENDING_CLASS: "ascending",
    DESCENDING_CLASS: "descending",
    CANCELLABLE_CLASS: "cancellable",
    DROP_TARGET_CLASS: "dropTarget",
    BUTTON_CLASS: "button",
    ONE_COLUMN_CLASS: "oneColumn",
    CONTROL_PAGE_CLASS: "controlPage",

    //attributes
    DISABLED_ATTR_NAME: "disabled",
    SELECTED_ATTR_NAME: "selected",
    OPEN_ATTR_NAME: "open",
    CLOSED_ATTR_NAME: "closed",
    READONLY_ATTR_NAME: "readonly",

    // Predefined DOM elements IDs.
    DIMMER_ID: "pageDimmer",
    PAGE_BODY_ID: "display",
    MENU_ID: "menu",
    MAIN_NAVIGATION_ID: "mainNavigation",
    MAIN_NAVIGATION_HOME_ITEM_ID: "main_home",


    // DnD
    SCROLL_SENSITIVITY: 50,

	//dimmer
	DIMMER_Z_INDEX: 900,

    //Resizable folders/filters/properties/fields panels
    FOLDERS_RESIZABLE_PANEL_ID: 'folders',
    FILTERS_RESIZABLE_PANEL_ID: 'filters',
    PROPERTIES_RESIZABLE_PANEL_ID: 'properties',
    FIELDS_RESIZABLE_PANEL_ID: 'fields',

    FOLDERS_RESIZABLE_PANEL_COOKIE_NAME: 'foldersPanelWidth',
    FOLDERS_MINIMIZED_PANEL_COOKIE_NAME: 'foldersMinimized',

    FILTERS_RESIZABLE_PANEL_COOKIE_NAME: 'filtersPanelWidth',
    FILTERS_MINIMIZED_PANEL_COOKIE_NAME: 'filtersMinimized',

    PROPERTIES_RESIZABLE_PANEL_COOKIE_NAME: 'propertiesPanelWidth',
    PROPERTIES_MINIMIZED_PANEL_COOKIE_NAME: 'propertiesMinimized',

    FIELDS_RESIZABLE_PANEL_COOKIE_NAME: 'fieldsPanelWidth',
    FIELDS_MINIMIZED_PANEL_COOKIE_NAME: 'fieldsMinimized',

    PANEL_WIDTH: 'PanelWidth',
    MINIMIZED: 'Minimized',

    // swipe scroll
    scrolls: $H(),

    //////////////////////////////////////////////////////////////////////
    // Initialize: Programmatically modifies the DOM objects upfront
    //////////////////////////////////////////////////////////////////////

    initialize: function(container){
		container = $(container) || $(document.body);

        var helpLink = $('helpLink');
		if (window.webHelpModule && helpLink) {
            helpLink.observe('click',webHelpModule.displayWebHelp);
		} 

        //truncate matching patterns
        new Truncator(container.select(layoutModule.TRUNCATE_PATTERN));

		//IE7 needs explicit style set (no sensible alternative to browser sniffing here)
		isIE7() && this.fixIE7Sizes();

        container.select(this.SIZEABLE_PATTERN).each(this.createSizer.bind(this));
 		//NW.Dom.select(this.SIZEABLE_PATTERN, container, layoutModule.createSizer);

        //init moveables (note: DOM elements created after page load will need to be initialized for move after creation)
        container.select(this.MOVEABLE_PATTERN).each(this.createMover.bind(this));
 		//NW.Dom.select(this.MOVEABLE_PATTERN, container, layoutModule.createMover);

        //elements for centering (note: DOM elements created after page load will need to be initialized for center after creation)
        container.select('.centered_horz,.centered_vert').each(function(elem){
            var fn = parseFunc(elem, 'centered_fn_');
            fn || (fn = centerElement);

            fn(elem, {
                horz: elem.match('.centered_horz'),
                vert: elem.match('.centered_vert')
            });
        });
	
		//page dimmer init
        if ($(layoutModule.DIMMER_ID) != null) {
            $(layoutModule.DIMMER_ID).style.zIndex = layoutModule.DIMMER_Z_INDEX;
        } 

        $A($$(layoutModule.SWIPE_SCROLL_PATTERN)).each(function(scroll) {
        	var o = {};
        	if(scroll.hasAttribute('no_scrollbars')){
        		o.hScroll = false;
        		o.vScroll = false;
        		o.hScrollbar = false;
        		o.vScrollbar = false;
        	}
            //layoutModule.createScroller(scroll,o);
        });
        
        if(isIPad()) {
        	/*
        	window.addEventListener('orientationchange',function(e){
        	    var orientation = window.orientation;
        	    switch(orientation){
        	        case 0:
        	        	$(document.body).select('.centered_horz,.centered_vert').each(function(elem){
        	                centerElement(elem, {
        	                    horz: elem.match('.centered_horz'),
        	                    vert: elem.match('.centered_vert')
        	                });
        	            });
        	        	break;  
        	        case 90:
        	    		$(document.body).select('.centered_horz,.centered_vert').each(function(elem){
        	                centerElement(elem, {
        	                    horz: elem.match('.centered_horz'),
        	                    vert: elem.match('.centered_vert')
        	                });
        	            });
        	            break;
        	        case -90:
                		$(document.body).select('.centered_horz,.centered_vert').each(function(elem){
                            centerElement(elem, {
                                horz: elem.match('.centered_horz'),
                                vert: elem.match('.centered_vert')
                            });
                        });
        	            break;
        	    }        		
        	})
        	*/
        }

        layoutModule.fixNavigation();
    },

    updateOnOrientation: function(){
    },
    
    //////////////////////////////////////////////////////////////////////
    // panel scrolling
    //////////////////////////////////////////////////////////////////////

    createScroller : function(scrollContainer, options){
        if (scrollContainer) {
            var existingScroll = layoutModule.scrolls.get(scrollContainer.identify());
            existingScroll && existingScroll.destroy();

            var disableTransformFor = ["mainTableContainer", "resultsContainer", "filtersPanel",
                "foldersPodContent"];

            scrollContainer.identify().startsWith("iframeScroll_") && disableTransformFor.push(scrollContainer.identify());
            options = Object.extend({
            	hideScrollbar: false,
                useTransform: !disableTransformFor.include(scrollContainer.identify()),
                bounce: ["resultsContainer"].include(scrollContainer.identify())
                //checkDOMChanges: true

            }, options || {});
            var scroll = new iScroll(scrollContainer, options);
            layoutModule.scrolls.set(scrollContainer.identify(), scroll);

            return scroll;
        }

        return null;
    },

    //////////////////////////////////////////////////////////////////////
    // panel resizing
    //////////////////////////////////////////////////////////////////////

    createSizer : function(sizeable){
        //sizeable is the element we will resize
        //sizer is the handle we drag to resize it
        var sizer = sizeable.down(this.SIZER_PATTERN); //get first descendant with class sizer
        if (!sizer || matchMeOrUp(sizeable,"." + layoutModule.HIDDEN_CLASS)) {return;}           
        var sizerType = this.getSizerType(sizer);
        var sizerAlign = this.alignmentModule.getSizerAlignment(sizer, sizerType);

        var dragger = new Draggable(sizer);
        dragger.resizeablePanel = sizeable;
        dragger.primaryPanel = $(sizeable).siblings().find(function(s){
            return s.match('.primary')
        });

        var sizerMousedownCallback = function() {
            return function(evt) {
                //set co-ords now - if we wait until drag start it is too late - mouse already moved a bit
                dragger.pointerX = evt.pointerX();
                dragger.pointerY = evt.pointerY();
            }
        }();

        //have to observer at this level - otherwise draggable has already swallowed up event
        sizer.observe('mousedown', sizerMousedownCallback);
        jQuery(sizer).bind({
        	'touchstart':function(e){
        		sizerMousedownCallback(e.originalEvent);
        		this.style.background = '#666';
        	},
        	'touchend':function(){
        		this.style.background = '#eee';
        	}
        	
        })
        dragger.sizerType = sizerType;
        dragger.alignment = sizerAlign;

        dragger.options = {
            constraint: ((sizerType === 'diagonal') ? '' : sizerType),
            onStart: layoutModule.beginSizerDragging.bind(layoutModule),
            onDrag: !isIPad() ? layoutModule.respondToDrag.bind(layoutModule) : doNothing,
            onEnd: layoutModule.endSizerDragging.bind(layoutModule)
        }

    },

    getSizerType: function(sizer) {
        return (sizer.match('.horizontal') && 'horizontal') ||
                (sizer.match('.vertical') && 'vertical') ||
                (sizer.match('.diagonal') && 'diagonal');
    },

    alignmentModule: {

        alignments: [
            ['left','right'],
            ['top','bottom']
        ],

        alignmentIndexes: {
            'horizontal':0,
            'vertical':1
        },

        dimensions: ['width','height'],

        /**
         * which edge(s) of the sizeable object is the sizer aligned with
         * @param {Object} sizer
         * @param {Object} sizerType
         * @return (Array) ['left', 'right' or '']['top', 'bottom' or '']
         */
        getSizerAlignment: function(sizer, sizerType){
            var result = ['',''];
            if (sizerType==='diagonal') {
                //diagonals sizer always the same alignment
                return ['right','bottom'];
            }
            var alignmentIndex = this.alignmentIndexes[sizerType]; //0 or 1
            var alignmentStyles = this.alignments[alignmentIndex]; //['left','right'] or ['top','bottom']
            var alignmentOffsets = [0,1].map(
				function(al) {
					return parseInt(sizer.getStyle(alignmentStyles[al]))
			});
            //calculate sizer anchorage by testing which offset is smaller (NaN mean not anchored - therefore not aligned)
			var alignment = (isNaN(alignmentOffsets[0]) || (alignmentOffsets[0] > alignmentOffsets[1])) ? 
				alignmentStyles[1] : alignmentStyles[0];	
            //now set the appropriate element
            result[alignmentIndex] = alignment;
            //e.g. for horizontal: ['right',''];
            return result;
        }
    },

    beginSizerDragging : function(dragger, event) {
        var sizer = dragger.element;
        dragger.parentOffset = [sizer.getStyle(dragger.alignment[0]), sizer.getStyle(dragger.alignment[1])];
        dragger.offsetUnit = 'px'; //TODO: fix me
        dragger.pointerX = dragger.pointerX || event.pointerX();
        dragger.pointerY = dragger.pointerY || event.pointerY();
        dragger.element.addClassName(layoutModule.DRAGGING_CLASS);
    },

    endSizerDragging : function(dragger, event){
        layoutModule.respondToDrag(dragger, event);
        dragger.element.removeClassName(layoutModule.DRAGGING_CLASS);
        //fire custom event so that we can know when we have finished sizing
        document.fire("dragger:sizer", {targetEvent:event, element: dragger.element});
    },

    respondToDrag : function(dragger, event) {
        //no else stmt - diagonal sizer will do both
        if (dragger.sizerType !== 'vertical') { //includes diagonal
            this.resizeOnDrag(dragger, event, 'horizontal');
        }
        if (dragger.sizerType !== 'horizontal') { //includes diagonal
            this.resizeOnDrag(dragger, event, 'vertical');
        }
    },

    resizeOnDrag : function(dragger, event, orientation) {
        //set vars based on dragger orientation
        var dragData = {};
        dragData.axis = (orientation == 'horizontal') ? 0 : 1;
        dragData.myAlignments = this.alignmentModule.alignments[dragData.axis];
        dragData.dimension = this.alignmentModule.dimensions[dragData.axis];
        dragData.sizeProperty = dragData.axis ? 'offsetHeight' : 'offsetWidth';

        var pointerName = dragData.axis ? 'pointerY' : 'pointerX';
        var c = {
        	pointerY: 'clientY',
        	pointerX: 'clientX'
        }
        //generic code starts here
        var sizer = dragger.element;
        dragData.sizeableAnchorage = (dragger.alignment[dragData.axis] === dragData.myAlignments[0]) ? dragData.myAlignments[1] : dragData.myAlignments[0];

        var p = event.changedTouches ?  event.changedTouches[0][c[pointerName]] : event[pointerName]();
        var dragDelta = dragger[pointerName] ? p - dragger[pointerName] : 0;     
        dragDelta = (dragger.alignment[dragData.axis] === dragData.myAlignments[1]) ? dragDelta : 0 - dragDelta; //directional correction
        dragData.dragDelta = dragDelta;
        dragger[pointerName] = event[pointerName]();

        this.resizePanelsOnDrag(dragger, dragData);
    },

    resizePanelsOnDrag : function(dragger, dragData) {
        var sizeTracker = this.getSizeTracker();
        sizeTracker.checkpoint(dragger.resizeablePanel[dragData.sizeProperty]);

        //size the panel
		var panelSize = getDimensionInPx(dragger.resizeablePanel, dragData.dimension); //worsk for % or px
        if (this.isInBounds(dragger, dragData) || (!this.isInBounds(dragger, dragData) && dragData.dragDelta < 0)) {
            dragger.resizeablePanel.setStyle(dragData.dimension + ':' + (panelSize + dragData.dragDelta) + 'px');
        }

        new JSCookie(dragger.resizeablePanel.identify() + layoutModule.PANEL_WIDTH, dragger.resizeablePanel.getWidth());
//        //if resizeablePanel is folders panel then put resizeablePanel.width into cookie
//        if (dragger.resizeablePanel.id == this.FOLDERS_RESIZABLE_PANEL_ID) {
//            new JSCookie(this.FOLDERS_RESIZABLE_PANEL_COOKIE_NAME, dragger.resizeablePanel.getWidth());
//        }
//        //if resizeablePanel is filters panel then put resizeablePanel.width into cookie
//        if (dragger.resizeablePanel.id == this.FILTERS_RESIZABLE_PANEL_ID) {
//            new JSCookie(this.FILTERS_RESIZABLE_PANEL_COOKIE_NAME, dragger.resizeablePanel.getWidth());
//        }
//        //if resizeablePanel is properties panel then put resizeablePanel.width into cookie
//        if (dragger.resizeablePanel.id == this.PROPERTIES_RESIZABLE_PANEL_ID) {
//            new JSCookie(this.PROPERTIES_RESIZABLE_PANEL_COOKIE_NAME, dragger.resizeablePanel.getWidth());
//        }
//        //if resizeablePanel is fields panel then put resizeablePanel.width into cookie
//        if (dragger.resizeablePanel.id == this.FIELDS_RESIZABLE_PANEL_ID) {
//            new JSCookie(this.FIELDS_RESIZABLE_PANEL_COOKIE_NAME, dragger.resizeablePanel.getWidth());
//        }

        //could not size the panel? restore position of sizer and style of panel
        if (!sizeTracker.changed(dragger.resizeablePanel[dragData.sizeProperty])) {
			var actualSize = getActualDimension(dragger.resizeablePanel, dragData.dimension);
            if (dragger.alignment[dragData.axis] != dragData.myAlignments[0]) {
                //if sizer not naturally left/top aligned, remove left/top styling added by scriptaculous dragger
                dragger.element.style[dragData.myAlignments[0]] = "";
            }
            dragger.element.setStyle(dragger.alignment[dragData.axis] + ':' + dragger.parentOffset[dragData.axis]);
            dragger.resizeablePanel.setStyle(dragData.dimension + ':' + actualSize + 'px');
        	if (dragger.primaryPanel && (dragger.primaryPanel.style.zIndex == dragger.resizeablePanel.style.zIndex)) {
				dragger.primaryPanel.setStyle(dragData.sizeableAnchorage + ':' + (actualSize) + 'px');
			}
            return;
        }

        //size primary panel if any (and in same layer)
        if (dragger.primaryPanel && (dragger.primaryPanel.style.zIndex == dragger.resizeablePanel.style.zIndex)) {
			var primaryOffset = getDimensionInPx(dragger.primaryPanel, dragData.sizeableAnchorage);
            dragger.primaryPanel.setStyle(dragData.sizeableAnchorage + ':' + (primaryOffset + dragData.dragDelta) + 'px'); //resize main (middle) panel if any
        }

        //finally restore sizer`s alignment w/ respect to its parent
        if (dragger.alignment[dragData.axis] != dragData.myAlignments[0]) {
            dragger.element.style[dragData.myAlignments[0]] = "";
        }
        dragger.element.setStyle(dragger.alignment[dragData.axis] + ':' + dragger.parentOffset[dragData.axis]);
        
        jQuery.event.trigger('layout_update');
    },

    isInBounds: function(dragger, dragData) {
        //just init variables
        var primaryMinMeasurement,sizeableAnchorageMeasurement,
            avaliableParentMeasurement,pimaryPanelMarginMeasurement, outerDimentionFunc,
            primaryPanel = jQuery(dragger.primaryPanel),
            primaryPanelParent = primaryPanel.parent(),
            dimention = dragData.dimension;

        if (dragger.primaryPanel) {
            //uppercase first charter
            dimention = dimention.replace(dimention.charAt(0), dimention.charAt(0).toUpperCase());
            //chose function to get current dimmention
            outerDimentionFunc = jQuery.fn['outer'+dimention];

            //calculate measurement
            pimaryPanelMarginMeasurement = outerDimentionFunc.call(primaryPanel, true) - outerDimentionFunc.call(primaryPanel);
            primaryMinMeasurement = parseInt(primaryPanel.css("min-" + dragData.dimension));
            if (isNaN(primaryMinMeasurement)) {
                primaryMinMeasurement = 0;
            }
            sizeableAnchorageMeasurement = parseInt(primaryPanel.css(dragData.sizeableAnchorage));
            avaliableParentMeasurement = parseInt(primaryPanelParent.css(dragData.dimension));

            //if parent container has other divs then include their distentions in bound validation
            var panels = primaryPanelParent.children('div:visible:not(.minimized)');
            jQuery.each(panels, function() {
                var elem = jQuery(this),
                    isTemplatable = elem.width() === 0 || elem.height() === 0;
                if (dragger.resizeablePanel != this && dragger.primaryPanel != this && !isTemplatable) {
                    avaliableParentMeasurement -= outerDimentionFunc.call(elem, true);
                }
            });

            return avaliableParentMeasurement - sizeableAnchorageMeasurement - dragData.dragDelta > primaryMinMeasurement + pimaryPanelMarginMeasurement;
        } else {
            return true;
        }
    },

    getSizeTracker: function() {
        lastSize = -1;

        return {
            checkpoint: function(size){
                lastSize = size;
            },
            changed: function(size){
                return size != lastSize;
            }
        }
    },

    ///////////////////////////////////////////////////////////////////////////////////
    // Make moveable
    ///////////////////////////////////////////////////////////////////////////////////


    createMover : function(movable){
        //movable is the element we will move
        //mover is the handle we drag to move it
        var mover = movable.down(this.MOVER_PATTERN); //get first descendant with class mover
        if (!mover || matchMeOrUp(movable,"." + layoutModule.HIDDEN_CLASS)) {return;}           
		

        var dragger = new Draggable(movable, {handle: mover});
    },

    ///////////////////////////////////////////////////////////////////////////////////
    // Minimizer / Maximizer
    ///////////////////////////////////////////////////////////////////////////////////

    maximize : function(element, noEffects){
    	noEffects = isIPad() ? true : noEffects;
    	
        var toMaximize = element.hasClassName('column') ? element : element.up('.column');
        
        var aligments = layoutModule.alignmentModule.alignments[0];
        var offsets = aligments.map(function(al) {
            return parseInt(toMaximize.getStyle(al));
        });
        var thisAlignment = aligments[offsets[0] === 0 ? 0 : 1]; //left at 0, right at 1
        var primaryPanel = toMaximize.siblings().find(function(s) {
            return s.match('.primary')
        });
        var ppOffset;
        if (primaryPanel) {
            ppOffset = new JSCookie(toMaximize.identify() + layoutModule.PANEL_WIDTH).value;
        }

        if (ppOffset && !isNaN(ppOffset)) {
            ppOffset += 'px';

            toMaximize.setStyle({width: ppOffset});
            if (noEffects) {
                primaryPanel.style[thisAlignment] = ppOffset;
                toMaximize.removeClassName('minimized_if_vertical_orientation');
                toMaximize.removeClassName('minimized');
                new JSCookie(toMaximize.identify() + layoutModule.MINIMIZED, false);
                jQuery('div.content',toMaximize).show();
            } else {
                function saveState() {
                    toMaximize.removeClassName('minimized_if_vertical_orientation');
                    toMaximize.removeClassName('minimized');
                    new JSCookie(toMaximize.identify() + layoutModule.MINIMIZED, false);
                    jQuery('div.content',toMaximize).show();
                }
                //This...
                new Effect.Morph(primaryPanel, {style: thisAlignment + ":" + ppOffset, duration: 0.6, afterFinish: function(){jQuery.event.trigger('layout_update');}});
                //...runs parallel to these two...
                new Effect.Opacity(toMaximize, {to: 0, from: 1, duration: 0.3, queue: {position: 'front', scope: 'sidePanel'},
                    afterFinish: saveState});
                new Effect.Opacity(toMaximize, {to: 1, from: 0, duration: 0.3, queue: {position: 'end', scope: 'sidePanel'}});
            }
        }
        jQuery.event.trigger('layout_update');
        jQuery('.column.secondary > div.content > .body').show().height();
    },

    minimize : function(element, noEffects){
        var primaryPanel, ppOffset;

        noEffects = isIPad() ? true : noEffects;
        
        //MINIMIZE
        var toMinimize = element.hasClassName('column') ? element : element.up('.column');
        var isMinimized = new JSCookie(toMinimize.identify() + layoutModule.MINIMIZED).value == 'true';
        
        !isMinimized && new JSCookie(toMinimize.identify() + layoutModule.PANEL_WIDTH, toMinimize.getWidth());

        //figure out alignment (left or right)
        var aligments = layoutModule.alignmentModule.alignments[0];
        var offsets = aligments.map(function(al){
            return parseInt(toMinimize.getStyle(al));
        });
        var thisAlignment = aligments[offsets[0] === 0 ? 0 : 1]; //left at 0, right at 1

        primaryPanel = toMinimize.siblings().find(function(s) {return s.match('.primary')});

        if (primaryPanel) {
            ppOffset = primaryPanel.getStyle(thisAlignment);
            if (noEffects) {
            	primaryPanel.style[thisAlignment] = '0px';
                toMinimize.hasClassName('minimized') || toMinimize.addClassName("minimized");
                toMinimize.removeClassName('minimized_if_vertical_orientation');
                new JSCookie(toMinimize.identify() + layoutModule.MINIMIZED, true);
                jQuery('div.content',toMinimize).hide();
            } else {
                function saveState() {
                    toMinimize.hasClassName('minimized') || toMinimize.addClassName("minimized");
                    toMinimize.removeClassName('minimized_if_vertical_orientation');

                    new JSCookie(toMinimize.identify() + layoutModule.MINIMIZED, true);

                    layoutModule.refreshPanelScroll(toMinimize);
                    jQuery('div.content',toMinimize).hide();
                }
                //This...
                new Effect.Morph(primaryPanel, {style: thisAlignment + ':0px', duration: 0.6, afterFinish: function(){jQuery.event.trigger('layout_update');}});
                //...runs parallel to these two...
                new Effect.Opacity(toMinimize, {to: 0, from: 1, duration: 0.3, queue: {position: 'front', scope: 'sidePanel'},
                    afterFinish: saveState});
                new Effect.Opacity(toMinimize, {to: 1, from: 0, duration: 0.3, queue: {position: 'end', scope: 'sidePanel'}});
            }
        }
        jQuery.event.trigger('layout_update');
    },

    resizeOnClient: function(leftPanelID, mainPanelID, rightPanelID) {
        var panels = [];

        leftPanelID && panels.push({id: leftPanelID, isLeft: true});
        rightPanelID && panels.push({id: rightPanelID});


        panels.each(function(panel) {
            var panelElement = $(panel.id);
            if (panelElement) {
                var width = new JSCookie(panel.id + layoutModule.PANEL_WIDTH).value;
                var minimized = new JSCookie(panel.id + layoutModule.MINIMIZED).value;

                var isMinimized = panelElement.hasClassName("minimized");
                if (!Object.isUndefined(minimized)) {
                    isMinimized = (minimized == "true");
                }
                panelElement.removeClassName("minimized");

                if (isMinimized) {
                    layoutModule.minimize(panelElement, true);
                } else {
                    width && $(mainPanelID).setStyle(panel.isLeft ? {left: width + 'px'} : {right: width + 'px'});
                    width && panelElement.setStyle({width: width + 'px'});
                    layoutModule.refreshPanelScroll(panelElement);
                }

            }
        });
    },

    refreshPanelScroll: function(panelElement) {
        var scrollContainers = panelElement.select(".content > .swipeScroll");
        if(scrollContainers.length > 0) {
            var scroll = layoutModule.scrolls.get(scrollContainers[0].identify());
            scroll && scroll.refresh();
        }
    },

    autoMaximize: function(element) {
        var minimized = new JSCookie(element.identify() + layoutModule.MINIMIZED).value;

        if (minimized == 'true') {
            element.hasClassName('minimized') && layoutModule.maximize(element, true);
        } else {
            !element.hasClassName('minimized') && layoutModule.minimize(element, true);
        }
    },

    autoMinimize: function(element) {
        var minimized = new JSCookie(element.identify() + layoutModule.MINIMIZED).value;
        if (minimized == 'false') {
            layoutModule.minimize(element, true);
        } else {
            element.removeClassName('minimized');
        }
    },

	fixIE7Sizes: function() {
		$$(".control.tabSet.buttons.vertical").each(function(elem) {
			elem.immediateDescendants().each(function(child) {
				child.style.width = elem.clientWidth || elem.offsetWidth;
			});
		});
	},

    fixNavigation: function() {
        if(screen.width <= 1024 || screen.width <= 768) {
            var nav = jQuery('#' + this.MAIN_NAVIGATION_ID);
            if(nav.length) {
                nav.appendTo('#frame > .content');
            }
            jQuery('#frame > .content > .header').remove();
        }
    }
};



