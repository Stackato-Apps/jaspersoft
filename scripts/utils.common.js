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
 * A collection of Common Utilities.
 */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **IMPORTANT - PLEASE READ!!!****
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// In order to keep this file organized and readable please consider which section to add your new function
// Also check if there is already something there you can use or extend
// Remember also we have prototype.js at our disposal
//
// These are the sections:
//
// Operating System check
// Browser Sniffing
// Generic Functions
// DOM Navigation
// Element Inspection
// Element Positioning
// Element Displaying and Effects
// Element Overlays
// Element Enabling
// Mousepointer
// Table Utils
// Window Inspection
// Window Positioning
// Window Creation
// IFRAME Utils
// Event Utils
// String Utils
// URL Utils
// Object Utils
// Function Utils
// Arithmetic Utils
// Busy Monitor
// In Place Editor
// <Script> utils
// CSS utils
// CSS Selector utils
// Dialog events
// Ajax utils
// Tracer Utils
// Validation module
// Cookie Util
// Session management
// Webflow utils
// Page Dimmer
// File upload method (Ajax IFrame Upload)
// Touch Utils
// Keyboard events
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var log = '';

///////////////////////////////////////////
// Operating System check.
///////////////////////////////////////////
/**
 * Are we on a Mac?
 */
function isMacOS(){
    return isOS('mac');
}

/**
 * Are we on a Windows PC?
 */
function isWindowsOS(){
    return isOS('win');
}

/**
 * Are we on a Linux PC?
 */
function isLinuxOS(){
    return isOS('linux');
}

/**
 * Generic Operating System tester
 * @param {Object} osName - string to test OS against
 */
function isOS(osName) {
    return navigator.appVersion.toLowerCase().include(osName);
}

function isSupportsTouch(){
    if (Object.isUndefined(window.supportsTouch)) {
        window.supportsTouch = ('createTouch' in document);
    }
    return window.supportsTouch;
}
///////////////////////////////////////////
// Browser Sniffing.
///////////////////////////////////////////

function isMozilla() {
    return navigator.appName==="Netscape";
}

function isFirefox(){
    return (navigator.userAgent.toLowerCase().include("firefox"));
}

function isWebKitEngine(){
    return (Prototype.Browser.WebKit);
}

function isIPad(){
    return navigator.platform == "iPad";
}

function isIE() {
    return navigator.appName==="Microsoft Internet Explorer";
}

function isIE6() {
    return isIEVersion(6);
}

function isIE7() {
    return isIEVersion(7);
}

function isIE8() {
    return isIEVersion(8);
}


function isIEVersion7Upwards() {
    return getIEVersion() >= 7;
}

function isIEVersion(testVersion) {
    return getIEVersion() === testVersion;
}

function getIEVersion() {
    if (isIE()) {
        var version = navigator.appVersion.split("MSIE");
        version = parseFloat(version[1]);
        return version;
    }
    return 0; // not IE
}

/////////////////////////////////////////////
// .prototype Overrides
/////////////////////////////////////////////


/**
 * Provide Function with a convenience method to add a new method to its prototype
 * With thanks to "JavaScript: The Good Parts by Douglas Crockford. Copyright 2008 Yahoo! Inc., 978-0596-51774-8"
 * @param {Object} name
 * @param {Object} func
 */
Function.prototype.addMethod = function (name, func) {
    this.prototype[name] = func;
    return this;
};

/**
 * Provide Function with a convenience method to add a new var to its prototype
 * Identical to addMethod - but renaming for better semantics
 * @param {Object} name
 * @param {Object} func
 */
Function.prototype.addVar = function (name, value) {
    this.prototype[name] = value;
    return this;
};

Function.prototype.compose = function(argFunction) {
    var invokingFunction = this;
    return function() {
        return invokingFunction.call(this,argFunction.apply(this,arguments));
    }
}


///////////////////////////////////////////
// Generic Functions
///////////////////////////////////////////

function doNothing() {
    //what it says
}

//////////////////////////////////////////////////////////////////////////////////
// Type checking
//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
// typically just apply the prototype methods in the imlementations below
// directly to the objects - but these methods added for backwards compatability...
//////////////////////////////////////////////////////////////////////////////////


function exists(obj) {
    return !Object.isUndefined(obj);
}

function isArray(obj) {
    return Object.isArray(obj);
}

function isNumber(obj) {
    return Object.isNumber(obj);
}


/**
 * Test to esure object is not null or undefined
 * @param object
 */
function isNotNullORUndefined(object){
    return (typeof(object) !== 'undefined' && object != null);
}


///////////////////////////////////////////
// DOM Navigation
///////////////////////////////////////////
function getParentDiv(elem) {
    return elem.up('div');
}

function getParentRow(clicked) {
    return elem.up('tr');
}

function getParentCell(clicked) {
    return elem.up('td');
}

function getParentTable(clicked) {
    return elem.up('table');
}

function getAbsoluteParent(child) {
    var nextOne = child;
    while (!nextOne.style || nextOne.style.position !== 'absolute') {
        if (nextOne.tagName.toLowerCase() === 'body') return null;
        nextOne = nextOne.up();
    }
    return nextOne;
}

function getElementWithIdAndTagAndParent(id,tagName,parentElem) {
    var elems = parentElem.getElementsByTagName(tagName);
    for (var i=0; i<elems.length; i++) {
        if (elems[i].getAttribute("id")===id)
            return elems[i];
    }
    return null;
}

/**
 * based on prototype`s up() method
 * see http://www.prototypejs.org/api/element/up
 * @param {Object} cssRule
 */
function getClosestAncestor(elem, cssRule) {
    var result;
    while(!result) {
        result = $(elem).up(cssRule);
        if (!result) {
            elem = elem.parentNode;
            if (!elem || elem.tagName !== "DIV") {
                return null; //reached root - no matches available
            }
        }
    }
    return result;
}

/**
 * @deprecated - prototype does this too
 * @param {Object} child
 * @param {Object} parent
 */
function isDescendantOf(child, parent) {
    while(child.tagName != "BODY") {
        if (child==parent) {
            return true;
        }
        child = child.parentNode;
    }
    return false;
}

function getCellIndex(cell) {
    return cell.cellIndex;
}

function getRowIndex(row) {
    return row.rowIndex;
}

///////////////////////////////////////////
// Element Inspection
///////////////////////////////////////////

/**
 * @param {Element} elem
 * @return true if elem or ancestor has disabled attribute
 */
function isDisabled(elem) {
    if (!elem.readAttribute) {
        //e.g. document - which is never disabled
        return false;
    }
    var hasAttribute = !!elem.readAttribute('disabled') || elem.ancestors().any(function(s) {return s.readAttribute('disabled')});
    //TODO className check is only temporary - all disabled elems should have disabled attribute
    var hasClassName = matchAny(elem,[".disabled"], true);
    return hasAttribute || hasClassName;
}

/**
 * Return the element if it matches any of these css selectors
 * Optionally return matching ancestor as alternative
 * @param {Element} elem - the element (object or id)
 * @param {Array} array of Css Selector Patterns
 * @param {boolean} true if we are to return closest matching ancestor if no direct match
 */
function matchAny(elem, patterns, includeAncestors) {
    if (!elem) {
        return null;
    }

    //check direct hits first...
    for (var i=0; i<patterns.length; ++i) {
        if (elem.match && elem.match(patterns[i])) {
            return elem;
        }
    }
    //...then ancestors
    if (includeAncestors) {
        for (var i = 0; i < patterns.length; ++i) {
            var upMatch = elem.up && elem.up(patterns[i]);
            if (upMatch) {
                return upMatch;
            }
        }
    }

    return null;
}

/**
 * Return the element if it or any of its ancestors match given pattern
 * @param elem
 * @param css pattern
 * @return matching element
 */
function matchMeOrUp(elem, pattern) {
    //return elem && ((elem.match(pattern) && elem) || elem.up(pattern));
    var match;
    while (elem && !match) {
        match = elem.match && elem.match(pattern) && elem;
        elem = elem.parentNode;
    }
    return match;
}

/**
 * Do the given styles match
 * @param {Element} elem1 first Element (object or id)
 * @param {Element} elem2 second Element (object or id)
 */
function stylesMatch(elem1, elem2, styleName) {
    return $(elem1).getStyle(styleName) === $(elem2).getStyle(styleName);
}

/**
 * get the next sibling that matches the pattern
 * @param {Element} elem1 first Element (object or id)
 * @param {String} css pattern too match
 */
function getNextMatchingSibling(elem, pattern) {
    while (elem = elem.nextSibling) {
        if (elem.match && elem.match(pattern)) {
            return elem;
        }
    }
    return null;
}

/**
 * get the next sibling that does not match the pattern
 * @param {Element} elem1 first Element (object or id)
 * @param {String} css pattern too match
 */
function getNextNonMatchingSibling(elem, pattern) {
    while (elem = elem.nextSibling) {
        if (elem.match && !elem.match(pattern)) {
            return elem;
        }
    }
    return null;
}

/**
 * get the previous sibling that matches the pattern
 * @param {Element} elem1 first Element (object or id)
 * @param {String} css pattern too match
 */
function getPreviousMatchingSibling(elem, pattern) {
    while (elem = elem.previousSibling) {
        if (elem.match && elem.match(pattern)) {
            return elem;
        }
    }
    return null;
}

/**
 * get the previous sibling that does not match the pattern
 * @param {Element} elem1 first Element (object or id)
 * @param {String} css pattern too match
 */
function getPreviousNonMatchingSibling(elem, pattern) {
    while (elem = elem.previousSibling) {
        if (elem.match && !elem.match(pattern)) {
            return elem;
        }
    }
    return null;
}

/**
 * deprecated - use getBoxOffsets() below
 */
function getAbsoluteOffsets(thisObj) {
    var oLeft = thisObj.offsetLeft;
    var oTop = thisObj.offsetTop;
    var thisParent = thisObj.offsetParent;
    while (thisParent.tagName.toUpperCase() != "BODY" && thisParent.style.position != "absolute") {
        var oLeft = oLeft + thisParent.offsetLeft;
        var oTop = oTop + thisParent.offsetTop;
        thisParent = thisParent.offsetParent;
    }
    //add co-ords of absolute parent
    if (thisParent.style.position == "absolute") {
        oLeft = oLeft + thisParent.offsetLeft;
        oTop = oTop + thisParent.offsetTop;
    }
    if (isIE()) {
        //minor adjustment because IE handles offset slightly differently;
        //oLeft=oLeft+1;
        oTop=oTop+1;
    }
    return new Array(oLeft,oTop, oLeft + thisObj.offsetWidth, oTop + thisObj.offsetHeight);
}

/**
 * deprecated - use getBoxOffsets()[1] below
 * but keep this as a fallthrough method
 */
function getAbsoluteTopOffset(thisObj) {
    var oTop = thisObj.offsetTop;
    var thisParent = thisObj.offsetParent;
    while (thisParent.tagName.toUpperCase() != "BODY" && thisParent.style.position != "absolute") {
        var oTop = oTop + thisParent.offsetTop;
        thisParent = thisParent.offsetParent;
    }
    //add co-ords of absolute parent
    if (thisParent.style.position == "absolute") {
        oTop = oTop + thisParent.offsetTop;
    }
    if (isIE()) {
        //minor adjustment because IE handles offset slightly differently;
        oTop=oTop+1;
    }
    return oTop;
}

/**
 * re-implemenation of getAbsoluteOffsets()
 * but leaving original for now in case results vary slightly
 * @param theObj - the element who`s offsets we are calculating
 * @param includeScrollOffsets - consider scrolling in results (origin will be outside viewport)
 */
function getBoxOffsets(thisObj, includeScrollOffsets) {
    var offsets = $(thisObj).cumulativeOffset();
    var posLeft = offsets[0];
    var posTop = offsets[1];

    if (includeScrollOffsets) {
        var scrollOffsets = $(thisObj).cumulativeScrollOffset();
        posLeft = posLeft - scrollOffsets[0];
        posTop = posTop - scrollOffsets[1];
    }
    return new Array(posLeft,posTop);

}

function getInnerText(elem) {
    return isNotNullORUndefined(elem.innerText) ? elem.innerText : elem.textContent;
}


function isPointOverlayingObject(x,y,obj) {
    //    var offsets = getAbsoluteOffsets(obj);
    //    //window.status = offsets[0]+'-'+x+'-'+offsets[2]+'-'+offsets[1]+'-'+y+'-'+offsets[3];
    //    return x>offsets[0]&&x<offsets[2]&&y>offsets[1]&&y<offsets[3];

    //TODO: this is deprecated in prototype but not yet replaced in scriptaculous
    //using it for now - watch for changes in future prototype releases
    return Position.within(obj, x, y);

}

function boxesOverlap(leftA, topA, rightA, bottomA,leftB, topB, rightB, bottomB) {
    return !((topA>bottomB) || (bottomA<topB) || (leftA>rightB) || (rightA<leftB));
}

function boxesOverlapVertically(leftA, rightA, leftB, rightB) {
    return !((leftA>=rightB) || (rightA<=leftB));
}

function boxesOverlapHorizontally(topA, bottomA, topB, bottomB) {
    return !((topA>=bottomB) || (bottomA<=topB));
}

function getOuterHeight(elem) {
    if (!elem.clientHeight) {
        return 0; //not visible
    }
    return new Number((elem.getStyle('height')).replace(/[^\d\.]/g, '')) + getBufferHeight(elem, true);
}

function getOuterWidth(elem) {
    if (!elem.clientWidth) {
        return 0; //not visible
    }
    return new Number((elem.getStyle('width')).replace(/[^\d\.]/g, '')) + getBufferWidth(elem, true);
}

function getBufferHeight(elem, includeMargins) {
    if (!elem.visible()) {
        return 0;
    }
    //do new Number instead of parseInt to avoid rounding errors
    var result = 0;
    if (includeMargins) {
        result =
                new Number(elem.getStyle('marginTop').replace(/[^\d\.]/g, '')).ceil() +
                        new Number(elem.getStyle('marginBottom').replace(/[^\d\.]/g, '')).ceil();
    }
    result +=
            new Number(elem.getStyle('borderBottomWidth').replace(/[^\d\.]/g, '')).ceil() +
                    new Number(elem.getStyle('borderTopWidth').replace(/[^\d\.]/g, '')).ceil() +
                    new Number(elem.getStyle('paddingTop').replace(/[^\d\.]/g, '')).ceil() +
                    new Number(elem.getStyle('paddingBottom').replace(/[^\d\.]/g, '')).ceil();
    return result;
}

function getBufferWidth(elem, includeMargins) {
    if (!elem.visible()) {
        return 0;
    }
    //do new Number instead of parseInt to avoid rounding errors
    var result = 0;
    if (includeMargins) {
        result =
                new Number(elem.getStyle('marginLeft').replace(/[^\d\.]/g, '')).ceil() +
                        new Number(elem.getStyle('marginRight').replace(/[^\d\.]/g, '')).ceil();
    }
    result +=
            new Number(elem.getStyle('borderLeftWidth').replace(/[^\d\.]/g, '')).ceil() +
                    new Number(elem.getStyle('borderRightWidth').replace(/[^\d\.]/g, '')).ceil() +
                    new Number(elem.getStyle('paddingLeft').replace(/[^\d\.]/g, '')).ceil() +
                    new Number(elem.getStyle('paddingRight').replace(/[^\d\.]/g, '')).ceil();
    return result;
}

/**
 * looks up any dimension style (left,top,width,height) in units of px or % and returns the px value
 * throws exception if unit is not % or px or parent unit is not px
 * @param {Object} element
 * @param {Object} dimension
 * @return {number} px value
 */
function getDimensionInPx(element, dimension) {

    var parentDimension = {
        left: 'width',
        right: 'width',
        width: 'width',
        top: 'height',
        bottom: 'height',
        height: 'height'
    }

    var measurement = element.getStyle(dimension);
    if (measurement.include('%')) {
        var parentNode = element.parentNode;
        var parentMeasurement = parentNode.getStyle(parentDimension[dimension]);
        if (!parentMeasurement.include('px')) {
            throw "cannot convert to px , because parent dimension not measured in px"
        }
        return (parseInt(measurement) * parseInt(parentMeasurement)) / 100
    }
    if (measurement.include('px')) {
        return parseInt(measurement);
    }
    throw "cannot convert to px, because unit is neither px or %"
}

/**
 * takes a style (width or height) for an element and returns the equivalent actual size
 * @param {Object} asStyle
 */
function getActualDimension(elem, style) {
	var conversion = {
		'width' : 'clientWidth',
		'height' : 'clientHeight'
	}
	return elem[conversion[style]]; 
}

/**
 * nullify and remove all children
 * return true if succesful
 * @param {Object} elem
 */
function purgeChildElements(elem){
	try {
		var kids = elem && elem.children;
		if(!kids) {return};
		for (var i = 0, l = kids.length; i < l; i++) {
			purge(kids[i]);
			purgeChildElements(kids[i]);
			kids[i] = null;
			kids[i] = elem.removeChild(kids[i]);
		}
		return elem.children.length == 0;
	} catch(e) {
		//debugger	
	}		
		
}	

function purge(d) {
    var a = d.attributes, i, l, n;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            n = a[i].name;
            if (typeof d[n] === 'function') {
                d[n] = null;
            }
        }
    }
    a = d.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            purge(d.childNodes[i]);
        }
    }
}


///////////////////////////////////////////
// Element Detection
///////////////////////////////////////////

/**
 * Answer true if the DOM element is nearly scrolled into view
 * @param {Object} theElem - dom elem to check for
 * @param {Object} offset - how close is almost (in pixels)
 */
function isAlmostInView(theElem, offset) {
    var theElemTop = parseInt(getBoxOffsets(theElem)[1]);
    var pageTop = $(theElem).cumulativeScrollOffset()[1];
    var viewableHeight = getWindowHeight();
    return theElemTop < pageTop + viewableHeight + offset;
}

function getTouchedElement(evt) {
    var touches = evt.changedTouches;
    if (touches && touches.length > 0) {
        return $(document.elementFromPoint(touches[0].clientX, touches[0].clientY ));
    } else {
        return evt.element();
    }
}
///////////////////////////////////////////
// Element Positioning
///////////////////////////////////////////

/**
 * @param {Object} obj
 * @deprecated Use centerElement
 */
// Note assumes obj display is NOT none
function centerLayer(obj) {
    obj.style.left=parseInt(((getWindowWidth()-parseInt(obj.clientWidth))/2)+getScrollLeft()) + "px";
    obj.style.top=parseInt(((getWindowHeight()-parseInt(obj.clientHeight))/2)+getScrollTop()) + "px";
}

/**
 * center the element  in the axis specified
 * must have appropraite
 * @param {Object} elem
 * @param {Object} options
 */
function centerElement(elem, options) {
    if (options.horz) {
        if (!elem.hasClassName('centered_horz')) {
            throw("Element's className " + elem.className + " must include 'centered_horz' for function centerLayer to work with these arguments");
        }
        var theWidth = parseInt(elem.getStyle('width'));
        var theBufferedWidth = theWidth + getBufferWidth(elem, true);
        var parentWidth = elem.up().getWidth();
        //if >= parent width nothing to do
        if (theBufferedWidth < parentWidth) {
            elem.style.marginLeft = -(theWidth/2) + 'px';
            elem.style.left = '50%';
        }
    }
    if (options.vert) {
        if (!elem.hasClassName('centered_vert')) {
            throw("Element's className " + elem.className + " must include 'centered_vert' for function centerLayer to work with these arguments");
        }
        var theHeight = parseInt(elem.getStyle('height'));
        var theBufferedHeight = theHeight + getBufferHeight(elem, true);
        var parentHeight = elem.up().getHeight();
        //if >= parent height nothing to do
        if (theBufferedHeight < parentHeight) {
            elem.style.marginTop = -(theHeight/2) + 'px';
            elem.style.top = '50%';
        }
    }
}

function parseFunc(elem, prefix) {
    var className = elem.className;
    var index = className.indexOf(prefix);
    if(index > -1) {
        var cssClasses = className.substring(index).split(' ');
        if (cssClasses.length > 0) {
            var name = cssClasses[0].replace(prefix, '');
            return (typeof window[name] === "function") ? window[name] : null;
        }
    }

    return null;
}

function cascadeElement(elem, options) {
    // Horizontal cascade
    var theWidth = parseInt(elem.getStyle('width'));
    var theBufferedWidth = theWidth + getBufferWidth(elem, true);
    var parentWidth = elem.up().getWidth();
    var horzOffset = -(options.horzOffset * options.number / 2) + options.position * options.horzOffset;
    if (theBufferedWidth < parentWidth) {
        elem.style.left = (parentWidth - theBufferedWidth) / 2  + horzOffset + 'px';
    }

    var theHeight = parseInt(elem.getStyle('height'));
    var theBufferedHeight = theHeight + getBufferHeight(elem, true);
    var parentHeight = elem.up().getHeight();
    var vertOffset = -(options.vertOffset * options.number / 2) + options.position * options.vertOffset;
    if (theBufferedHeight < parentHeight) {
        elem.style.top = (parentHeight - theBufferedHeight) / 2  + vertOffset + 'px';
    }
}

//left, top, width, height are optional overrides
function fitObjectIntoScreen(obj, thisLeft, thisTop, thisWidth, thisHeight) {
    var l = thisLeft ? parseInt(thisLeft) : parseInt(obj.offsetLeft);
    var t = thisTop ? parseInt(thisTop) : parseInt(obj.offsetTop);
    var w = thisWidth ? parseInt(thisWidth) : parseInt(obj.clientWidth);
    var h = thisHeight ? parseInt(thisHeight) : parseInt(obj.clientHeight);
    var sl = getScrollLeft();
    var st = getScrollTop();
    var sw = getWindowWidth();
    var sh = getWindowHeight();

    //scrollbar adjustment
    w = w + 20;
    h = h + 20;

    if (t + h > st + sh) t = st + sh - h;
    if (t < st) t = st;
    if (l + w > sl + sw) l = sl + sw - w;
    if (l < sl) l = sl;

    obj.style.left = l + "px";
    obj.style.top = t + "px";
}


function setWidthStyleByReflection(elem, cssSelector) {
	elem = cssSelector ? $(elem).select(cssSelector)[0] : elem;
	elem && (elem.style.width = (elem.clientWidth || elem.offsetWidth) + "px");
}

///////////////////////////////////////////
// Element Displaying and Effects
///////////////////////////////////////////

function focusOn(id) {
    $(id).focus();
}

function selectAndFocusOn(id){
    var el = $(id);
    el.select();
    el.focus();
}


///////////////////////////////////////////
// Element Overlays
///////////////////////////////////////////

//haze out the entire usable page
function renderHazeLayer(left,top) {
    var theBody = document.body;
    return renderOverlay(left,top,theBody.scrollWidth,theBody.scrollHeight,'haze')
}

function renderOverlay(left,top,width,height,style) {
    var overlayObject = document.createElement("DIV");
    overlayObject.className=style;
    overlayObject.style.position="absolute";
    //overlayObject.style.zIndex=80;
    overlayObject.style.left=left;
    overlayObject.style.top=top;
    overlayObject.style.width=width;
    overlayObject.style.height=height;
    document.body.appendChild(overlayObject);

    return overlayObject;
}

function removeOverlay(overlayObject) {
    if (overlayObject && overlayObject.parentNode) {
        overlayObject.parentNode.removeChild(overlayObject);
    }
    if (overlayObject) {
        overlayObject = null;
    }
}

/**
 * set obj as a child of the Parent
 * if parent already set do nothing
 * @param {Object} obj
 * @param {Object} newParent
 */
function reParent(obj, newParent) {
    if (!obj) {
        return;
    }
    if (!obj.parentNode || (obj.parentNode != newParent)) {
        newParent.appendChild(obj);
    }
}

/**
 * Use this for positioning an overlay parented by an absolute element (not body)
 * IE needs to take scroll into account, Mozilla doesn`t
 * @param {Object} target
 */
function getScrollLeftForAbsoluteParent(parentObj) {
    return isIE() ? parentObj.scrollLeft : 0;
}
function getScrollTopForAbsoluteParent(parentObj) {
    return isIE() ? parentObj.scrollTop : 0;
}

function renderTransparentIFrame(left, top, width, height)
{
    var IFRAME_MARGIN = 5;
    var iframe = document.createElement("IFRAME");
    iframe.frameBorder = 0;
    iframe.style["filter"] = "alpha(opacity=0)";
    iframe.style.position = "absolute";
    iframe.style.left = left - IFRAME_MARGIN;
    iframe.style.top = top - IFRAME_MARGIN;
    iframe.style.width = width - 2*IFRAME_MARGIN;
    iframe.style.height = height - 2*IFRAME_MARGIN;
    document.body.appendChild(iframe);
    return iframe;
}


/////////////////////////////////////////////////////////////////////////////////////
// Overlay management form common-utils.js. Consolidate with above
/////////////////////////////////////////////////////////////////////////////////////

//make this non global
var overlayObjectStack = new Array();

function pushOverlayObject(elementId, style, zIndex)
{
    var off = getAbsoluteOffsets($(elementId));
    pushOverlayObjectAtOffsets(off, style, zIndex);
}

function pushTotalOverlayObject(style, zIndex)
{
    var offsets = new Array(0, 0,
            document.body.scrollWidth, document.body.scrollHeight);
    pushOverlayObjectAtOffsets(offsets, style, zIndex);
}

function pushOverlayObjectAtOffsets(off, style, zIndex)
{
    if (isIE())
    {
        //render a transparent IFrame to hide selects
        var iframe = renderTransparentIFrame(off[0], off[1], off[2]-off[0], off[3]-off[1]);
        overlayObjectStack.push(iframe);
    }

    var overlayObject = renderOverlay(off[0], off[1], off[2]-off[0], off[3]-off[1], style);
    if (zIndex)
    {
        overlayObject.style.zIndex = zIndex;
    }
    overlayObjectStack.push(overlayObject);
}

function popOverlayObject()
{
    if (overlayObjectStack.length > 0)
    {
        var overlayObject = overlayObjectStack.pop();
        removeOverlay(overlayObject);

        if (isIE() && overlayObjectStack.length > 0)
        {
            //remove the transparent IFrame
            removeOverlay(overlayObjectStack.pop());
        }
    }
}

function popAllOverlayObjects()
{
    while (overlayObjectStack.length > 0)
    {
        var overlayObject = overlayObjectStack.pop();
        removeOverlay(overlayObject);
    }
}


//////////////////////////////////////
// Element Enabling
//////////////////////////////////////
function disableSelection(target){
    if (target) {
        if (typeof target.style.KhtmlUserSelect!="undefined") { //Safari route
            //        target.style.KhtmlUserSelect = "none";
            //        target.style.userSelect = "none";
            target.onselectstart=function(){return false}
        } else if (typeof target.onselectstart!="undefined") //IE route
            target.onselectstart=function(){return false}
        else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
            target.style.MozUserSelect="none"
        else //All other route (ie: Opera)
            ;//target.onmousedown=function(){return false}
        target.style.cursor = "default"
    }
}


function disableSelectionWithoutCursorStyle(target){
    if (target) {
        if (typeof target.style.KhtmlUserSelect!="undefined") { //Safari route
            //        target.style.KhtmlUserSelect = "none";
            //        target.style.userSelect = "none";
            target.onselectstart=function(){return false};
        } else if (typeof target.onselectstart!="undefined") //IE route
            target.onselectstart=function(){return false}
        else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
            target.style.MozUserSelect="none"
        else //All other route (ie: Opera)
            ;//target.onmousedown=function(){return false}
    }
}


function enableSelection(target){
    if (target) {
        if (typeof target.style.KhtmlUserSelect!="undefined") {
            //Safari route
            //            target.style.KhtmlUserSelect = "text";
            //            target.style.userSelect = "text";
            target.onselectstart = function(){ return true }
        } else if (typeof target.onselectstart != "undefined") {
            //IE route
            target.onselectstart = function(){
                return true
            }
        } else if (typeof target.style.MozUserSelect != "undefined") {
            //Firefox route
            target.style.MozUserSelect = "text"
        } else {
            //All other route (e.g. Opera)
        }
        target.style.cursor = "default"
    }
}

///////////////////////////////////////////
// Mousepointer
///////////////////////////////////////////

function setCursor(theState) {
    document.body.style.cursor = theState;
}

function cursorDefault() {
    setCursor('default');
}

function cursorPointer() {
    setCursor('pointer');
}

function cursorWait() {
    setCursor('wait');
}

///////////////////////////////////////////
// Table Utils
///////////////////////////////////////////

function getCellAtColumn(cells,columnIndex) {
    columnCount = 0;
    for (i=0;i<cells.length;i++) {
        columnCount += cells.colspan;
        if (columnCount>=columnIndex)
            return cells[i];
    }
    return null;
}

// columnIndex indicates which column (within the supplied rows) we are interested in
function getCellAtRow(rows,columnIndex,rowIndex) {
    rowCount = 0;
    for (i=0;i<rows.length;i++) {
        var thisCell = rows[i].cells[columnIndex];
        rowCount += thisCell.rowspan;
        if (rowCount>=rowIndex)
            thisCell;
    }
    return null;
}

//fromT and toT can be TABLE or TBODY
function copyTable(fromT,toT,replace,paramsAreTBody) {
    var fromBody= paramsAreTBody ? fromT : $(fromT).select('tbody')[0];
    var toBody= paramsAreTBody ? toT : $(toT).select('tbody.copyTo')[0];   //copy to main tbody (class==body)
    if (replace) {
        clearTable(toT);
    }
    try {
        toBody.insert(fromBody.innerHTML);
    } catch (e) {
        //nothing to copy?
    }
}

function clearTable(myTable) {
    if (document.all) {
        while(myTable.rows[0]) {
            myTable.deleteRow(0);
        }
    } else {
        myTable.innerHTML = "";
    }
}

///////////////////////////////////////////
// Window Inspection
///////////////////////////////////////////

function getWindowWidth() {
    if (isMozilla())
        return innerWidth;
    return document.body.clientWidth;
}

function getWindowHeight() {
    if (isMozilla())
        return innerHeight;
    return document.body.clientHeight;
}

function getScrollLeft() {
    if (isMozilla()) {
        return window.scrollX;
    }
    return document.body.scrollLeft;
}

function getScrollTop() {
    if (isMozilla()) {
        return window.scrollY;
    }
    return document.body.scrollTop;
}

///////////////////////////////////////////
// Window Positioning
///////////////////////////////////////////

function scrollXToMiddle(theBody) {
    //scroll to half the difference between page width and window width (if any)
    var excess = theBody.scrollWidth-getWindowWidth();
    if (excess>0)
        theBody.scrollLeft=excess/2;
}

///////////////////////////////////////////
// Window Creation
///////////////////////////////////////////

function launchNewWindow(url) {
    window.open(url);
}

///////////////////////////////////////////
// IFRAME Utils
///////////////////////////////////////////

function getIFrameDocument(iFrame) {
    var doc = iFrame.contentWindow || iFrame.contentDocument;
    if (doc.document) {
        doc = doc.document;
    }
    return doc;
}


///////////////////////////////////////////
// Event Utils
///////////////////////////////////////////

function getEvent(evt) {
    return (evt) ? evt : window.event;
}

//used to smother an event
function popEvent(e) {
    cancelEventBubbling(e?e:event);
}

/**
 * Is the related target of this event equal to, or descendant from the given element
 * @param {Object} event
 * @param {Object} element
 */
function relatedTargetInElementSubtree(event, element) {
    if (!event.relatedTarget) {
        return false;
    }

    if (element === event.relatedTarget) {
        return true;
    }

    return event.relatedTarget.descendantOf(element);
}

function cancelEventBubbling(evt)
{
    evt = getEvent(evt);
    evt.cancelBubble = true;
    if (evt.stopPropagation) evt.stopPropagation();
}

function cancelEventAndPreventDefault(e) {
    e.preventDefault();
    e.stop();
}


function enterKeyHit(evt) {
    var charCode = whichKeyHit(evt);
    return  (charCode == 13 || charCode == 3);
}

function whichKeyHit(evt) {
    evt = getEvent(evt);
    var charCode = (evt.charCode) ? evt.charCode :
        ((evt.which) ? evt.which : evt.keyCode);
        return charCode;
}

function isCtrlHeld(evt) {
    evt = getEvent(evt);
    return !!(evt && evt.ctrlKey);
}

function isShiftHeld(evt) {
    evt = getEvent(evt);
    return !!(evt && evt.shiftKey);
}

function getEventTarget(evt) {
    evt = getEvent(evt);
    return evt && (evt.target || evt.srcElement);
}


function isNavigationInput(evt){
    evt = getEvent(evt);
    var code = evt.keyCode ? evt.keyCode : evt.which;
    return (code == Keys.DOM_VK_LEFT || code == Keys.DOM_VK_RIGHT ||
            code == Keys.DOM_VK_TAB || code == Keys.DOM_VK_BACK_SPACE || code == Keys.DOM_VK_ENTER);
}


function verifyIsDigitInput(evt){
    evt = getEvent(evt);
    var code = evt.keyCode ? evt.keyCode : evt.which;
    //ascii code check
    return ((code >= Keys.DOM_VK_0 && code <= Keys.DOM_VK_9) || isNavigationInput(evt));
}



function verifyIsInputNumericGroupSeparator(evt){
    evt = getEvent(evt);
    var keyPad = evt.keyCode ? evt.keyCode : evt.which;
    var keyChar = String.fromCharCode(keyPad);
    return (keyChar === groupingSeparator);
}


function verifyIsInputNumericDecimalSeparator(evt){
    evt = getEvent(evt);
    var keyPad = evt.keyCode ? evt.keyCode : evt.which;
    var keyChar = String.fromCharCode(keyPad);
    return (keyChar === decimalSeparator);
}



function numberOfDecimals(someNumericValue){
    var wordLen = someNumericValue.length;
    var count = 0;
    for(var index = 0; index < wordLen; index++){
        if(someNumericValue.charAt(index) === decimalSeparator){
            count++;
        }
    }
    return count;
}



/**
 * This function checks to see if the event is a mac style right click action using the keyboard.
 * This supports clicking the right, left of middle buttons on a mouse
 * @param evt the event object
 */
function macOSKeyboardRightClick(evt){
    var evt = getEvent(evt); 
	if(evt.ctrlKey){
        return (evt.button == 0 || evt.button == 1 || evt.button == 2);
    }else{
        return false;
    }
}




/**
 * This function check to see if the  macOS-style Rightmouseclick has been clicked.
 * @param evt the event object
 * @return boolean to indicate whether or not the key has been pressed.
 */
function macOSMouseRightClick(evt){
    var evt = getEvent(evt); 	
    var buttonRightclick = false;
    evt = evt || window.event;
    if(evt.which){
        buttonRightclick = (evt.which == 3);
    }else if(evt.button){
        buttonRightclick = (evt.button == 2);
    }
    return buttonRightclick;
}




/**
 * I implemented this right click function because prototype's isRightClick method didn't/doesn't work with Safari.
 * The reason for this is due to the way WebKit's engine deals with right click events. Accroding to the current
 * w3c spec of HTML the button events and codes are listed below.. (prototype works with this)
 * 0 - Left button
 * 1 - Middle button
 * 2 - Right button
 *
 * Microsoft (Trident) on the other hand uses the ff... (prototype works with this)
 * 1 - Left button
 * 4 - Middle button
 * 2 - Right button
 *
 * Safari (Webkit) for some reason intercepts the Right click event and prevents custom made context menus from coming up
 * to enable safari based context. To get around this, we can use the "which" property that belongs to mouse events.
 * 0 - Left button
 * 1 - Middle button
 * 2 - Right button
 * Note: All Mac browsers only detect the left button, even if the mouse has more than one button. @see http://www.quirksmode.org/dom/w3c_events.html#mousepos
 *
 *
 * @param evt the event object
 * @return boolean to indicate whether or not the key has been pressed.
 *
 *
 **/
function isRightClick(evt){
    if(isMacOS()){
        var keyboardClick = macOSKeyboardRightClick(evt);
        var mouseClick = macOSMouseRightClick(evt);
        return (keyboardClick || mouseClick);
    }else{
        return Event.isRightClick(evt);
    }
}

function isLeftClick(evt){
    return Event.isLeftClick(evt);
}


/**
 * This function is used to determine whether or not the control key on PC or the command key on Mac OS x has
 * been pressed.
 * @param evt The event being passed.
 * @param macUsesAlt soemtimes mac uses alt not command to map to ctrl (e.g for copy)
 * @return boolean to indicate whether or not the key has been pressed.
 */
function isMetaHeld (evt, macUsesAlt){
    var evt = getEvent(evt);
    if(getEvent(evt)){
        if(isMacOS()){
            return (macUsesAlt ? evt.altKey : evt.metaKey);
        }else{
            return isCtrlHeld(evt);
        }
    }else{
        return false;
    }
}



////////////////////////////////////////
// String Utils
////////////////////////////////////////

function trim(thisStr) {
    return thisStr.strip();
}

function startsWith(string1,string2) {
    return string1.startsWith(string2);
}

function getTextAfterUnderscore(theText) {
    return getTextAfterSubstring(theText,'_')
}

function getTextBeforeUnderscore(theText) {
    return getTextBeforeSubstring(theText,'_')
}

function extractNumber(str) {
    var result = str.match(/\d/g);
    result = result.join("");
    return result;
}

function getTextAfterSubstring(theText,theSubstring) {
    var ssIndex = (theText.toLowerCase()).indexOf(theSubstring.toLowerCase());
    if (ssIndex==-1)
        return null;
    else
        return theText.substring(ssIndex+theSubstring.length);
}

function getTextBeforeSubstring(theText,theSubstring) {
    var ssIndex = (theText.toLowerCase()).indexOf(theSubstring.toLowerCase());
    if (ssIndex==-1)
        return theText;
    else
        return theText.substring(0,ssIndex);
}

function removeTrailingSlash(theString) {
    var lastChar = theString.substring(theString.length-1);
    if (lastChar == '/') {
        return theString.substring(0,theString.length-1);
    } else {
        return theString;
    }
}

function removeTrailingPound(theString) {
    var lastChar = theString.substring(theString.length-1);
    if (lastChar == '#') {
        return theString.substring(0,theString.length-1);
    } else {
        return theString;
    }
}

function removeChars(theString, charArray) {
    var i=0;
    for (i;i<charArray.length;i++) {
        while (theString.indexOf(charArray[i])>-1) {
            theString = theString.replace(charArray[i],"");
        }
    }
    return theString;
}

/**
 * replaces all instances of str1 in str with str2
 * note: assumes str2 does not contain str1!
 */
function replaceAll(str,str1,str2) {
    str.gsub(str1,str2);
}

/**
 * @deprecated - user protoype's hash
 * var h = new Hash({ a: 'apple', b: 'banana', c: 'coconut' });
 * h.get('a'); // -> 'apple'
 */
// Used to create maps from JSON string, takes any even number of parameters
// var a = Hash(key1, value1, key2, value2);
function jsHash() {
    var ret = new Array();
    ret.clazz = 'Hash';
    for (var i = 0; i < arguments.length; i += 2) {
        if (typeof(arguments[i + 1]) != 'undefined') {
            ret[arguments[i]] = arguments[i + 1];
            ret.push(arguments[i]);
        }
    }
    return ret;
}

function textCounter(field, maxlimit) {
    if (field.value.length > maxlimit){
        field.value = field.value.substring(0, maxlimit);
        return false;
    }
    return true;
}



/**
 * This method is a convenience method that enables us save a value to a parameter and reset the original to ""
 * In this case, we are saving the value of saveString to myString and setting saveString to ""
 * @param myString
 * @param saveString
 */
function saveAndClear(myString, saveString){
    myString = saveString;
    saveString = "";
}


/**
 * Use this method to replace illegal characters in string by legal replacements.
 * Examples:
 * escapeString('/illegal string/', [/\//g, /\s/g], '_') -> '_illegal_string_';
 * escapeString('illegal string', 'illegal', 'legal') -> 'legal string';
 *
 * @param str - string to escape
 * @param patterns - regexp, string or array of regexp or strings to be replaced
 * @param escapeChars - string or array of string which will be used as replacements.
 *        If escapeChars is array and it's length is equal to patterns length then
 *        i-th pattern will be replaced with i-th replacement from escapeChars
 *        else first replacement from escapeChars always will be used.
 */
function escapeString(str, patterns, escapeChars) {
    if (!str || !patterns || escapeChars === undefined || escapeChars === null) {
        return str;
    }

    var alwaysUseFirstPattern =
            typeof(escapeChars) === 'string' || (Object.isArray(escapeChars) && escapeChars.length < patterns.length);
    var firstPattern = Object.isArray(escapeChars) ? escapeChars.first() : escapeChars;

    if (!Object.isArray(patterns)) {
        return str.replace(patterns, firstPattern);
    }

    patterns.each(function(pattern, index) {
        var escapeChar = alwaysUseFirstPattern ? firstPattern : escapeChars[index];
        str = str.replace(pattern, escapeChar);
    });

    return str;
}

///////////////////////////////////////////////////
// URL utils
///////////////////////////////////////////////////

/**
 * if no protocol specified assume http://
 */
function checkURLProtocol(urlString, enforcePrefix) {
    if (!enforcePrefix) {
        return urlString;
    }
    if (startsWith(urlString,"/")) {
        //relative URL
        return urlString;
    }

    var commonProtocols = new Array("http://","https://","file://","mailto://","ftp://");
    for (var i=0; i<commonProtocols.length; i++) {
        if (startsWith(urlString,commonProtocols[i])) {
            return urlString;
        }
    }
    //no protocol specified so assume http://
    return commonProtocols[0] + urlString;
}

/**
 * do we use a '?'or an '&' or nothing?
 */
function getSymbolToAppendNextParam(urlSoFar) {
    var lastChar = urlSoFar.substring(urlSoFar.length-1)
    if ((lastChar == '?')||(lastChar == '&')) {
        return "";
    }
    if (urlSoFar.indexOf('?')>-1) {
        return "&";
    } else {
        return "?";
    }

}


function showBusyCursor() {
    theBody.style.cursor="wait";
}


function restoreDefaultCursor() {
    theBody.style.cursor="";
}



// encoding function for text fields that we submit
// encodeURIComponent() converts Unicode to UTF-8, then encodes those bytes in '%xx' hex format.
// Tomcat will decode '%xx' into bytes, but it interprets those bytes as ISO-8859-1, not UTF-8.
// In order to get around this, we double encode, so that the servlet will pass through the '%xx' format.
// This can be decoded correctly inside AdhocAction, which handles all these requests.

function encodeText(str) {
    return encodeURIComponent(encodeURIComponent(str));
}

function decodeText(str){
    return decodeURIComponent(str);
}

///////////////////////////////////////////
// Arithmetic Utils
///////////////////////////////////////////

/**
 * return n or range limit
 */
function constrain(n, lower, upper) {
    if (n > upper) {
        return upper;
    }
    if (n < lower) {
        return lower;
    }
    return n;
}

///////////////////////////////////////////
// Obejct Utils
///////////////////////////////////////////

function deepClone(obj) {
    if(typeof obj != "object") {
        //cannot deep clone non-objects
        return obj;
    }
    var clone = Object.isArray(obj) ? [] : {};
    for(var i in obj) {
        if(typeof(obj[i])=="object") {
            clone[i] = deepClone(obj[i]);
        } else {
            clone[i] = obj[i];
        }
    }
    return clone;
}

function cloneCustomAttributes(fromElement, toElement) {
    var attributes = fromElement ? fromElement.attributes : {};
    for (var attribute in attributes) {
        var name = attributes[attribute] && attributes[attribute].name;
        if (name && name.startsWith("data")) {
            $(toElement).writeAttribute(name, $(fromElement).readAttribute(name));
        }
    }
}

///////////////////////////
// Logging
////////////////////////////

function initLog() {
    log="";
}

function logIt(task) {
    log=log+"||" + task + "-" + (new Date()).getTime();
}

/**
 * Common purpose debug function. Writes messages to Firebug, Chrome Safari or IE>7 console.
 *
 * @param {String} message Debug message.
 */
function debug(message) {
    window.console && window.console.debug(message);
}

var timer = {};

function startTimer(key) {
    window.console && window.console.time ?
        console.time(key) :
        timer[key] = +new Date;
}

function stopTimer(key) {
    if (window.console && window.console.timeEnd) {
        console.timeEnd(key)
    } else {
        if (timer[key]) {
            var response = key + ": " + ((+new Date) - timer[key]);
            timer[key] = undefined;
            window.console ? console.log(response) : window.status = response;
        }
    }
}


///////////////////////////////////////////
// Object utils
///////////////////////////////////////////

/**
 * @return line-break delimited string of properties and values of myObj
 */
var inspect = function(myObj) {
    var properties = [];
    for (var property in myObj) {
        if (myObj.hasOwnProperty(property)) {
            properties.push(property + " = " + myObj[property]);
        }
    }
    return properties.join('\n');
}


///////////////////////////////////////////
// Function Utils
///////////////////////////////////////////

/**
 *
 * @param {String} dotNotationString e.g. "aaa.bbb.ccc"
 * @return {String} blockNotationString e.g. "['aaa']['bbb']['ccc']"
 */
function toBlockNotation(dotNotationString){
    if (!dotNotationString) {
        return "";
    }
    return dotNotationString.split('.').map(function(e) {return "['" + e + "']"}).join('');
}

var getLocalContextFunction = toFunction.compose(function(functionName) {return 'localContext.' + functionName});

//temp function until we make action models call toFunction directly
var getAsFunction = function(functionName){
    return toFunction(functionName) || getLocalContextFunction(functionName);
};

/**
 * @param {Object} context - optional - function context in dot notataion
 * @param {Object} theFunction - function or functionName
 */
function toFunction(theFunction) {
    if (typeof(theFunction) !== "string") {
        return theFunction;
    } else {
        var blockReference = toBlockNotation(theFunction);
        return eval("window" + blockReference); //e.g. "window['localContext']['addFieldAsColumn']"
    }
}


/////////////////////////////////////////////////////////////////////////////////////
// Busy Monitor
/////////////////////////////////////////////////////////////////////////////////////

/**
 * monitors for run requests, and only invokes function after specified quiet time
 */
function BusyMonitor(waitTime,theFunction) {
    this.waitTime = waitTime;
    this.theFunction = theFunction;
    this.timer = null;
}

/**
 * @param arguments - optionally pass in arguments to be used when function is invoked
 */
BusyMonitor.prototype.run = function() {
    var args = arguments;
    if (this.timer != null) {
        //recent activity - so start a new timeout
        clearTimeout(this.timer);
    }
    var functionToCall = function(){
        this.theFunction.apply(null, args);
    };
    this.timer = setTimeout(functionToCall.bind(this),this.waitTime);
};


BusyMonitor.prototype.cancel = function(){
    this.timer && clearTimeout(this.timer);
};

////////////////////////////////////////
// In Place Editor
////////////////////////////////////////


function InPlaceEditor(elem){
    this.elem = $(elem);
    this.id = elem.identify(); //id for both states
    this.editing = false;
    this.value = getInnerText(elem);
}

InPlaceEditor.prototype.makeEditable = function(options){
    var self = this;
    var inputId = this.elem.id + "Input";
    var inputValue = this.value.strip();
    var inputBox = Builder.node("input", {className: "control input text", id: inputId, value: inputValue});
    this.elem.update(inputBox);


    this.editing = true;
    
    $(inputId).select();
	$(inputId).focus();
	
    if(options){
        if(options['blur']){
            $(inputId).onblur = function(evt){
                evt = (evt) ? evt : window.event;
                var onblurFunction = options['blur'];
                var executable = getAsFunction(onblurFunction);
                executable.call(self, evt);
//                Event.stop(evt);
            }
        }

        if(options['onEnter'] || options['onTab']){
            $(inputId).onkeypress = function(evt){
                var onkeyPressFunction = null;
                var executable = null;
                evt = (evt) ? evt : window.event;
                if(enterKeyHit(evt)){
                    onkeyPressFunction = options['onEnter'];
                    executable = getAsFunction(onkeyPressFunction);
                    executable.call(self, evt);
//                    Event.stop(evt);
                }else if(evt.keyCode == Event.KEY_TAB){
                    onkeyPressFunction = options['onTab'];
                    executable = getAsFunction(onkeyPressFunction);
                    executable.call(self, evt);
//                    Event.stop(evt);
                }
            }
        }


        if(options['onMouseup']){
            var mouseHandler = function(evt){
                evt = (evt) ? evt : window.event;
                if($(Event.element(evt)) != $(inputId)){
                    var onclickFunction = options['onMouseup'];
                    var executable = getAsFunction(onclickFunction);
                    executable.call(self, evt);
//                    Event.stop(evt);
                }
            }
            if(isIPad()){
                document.body.ontouchend = mouseHandler;
            } else {
                document.body.onmousedown = mouseHandler;
            }
        }

        if(options['onEsc']){
            document.body.onkeydown = function(evt){
                evt = (evt) ? evt : window.event;
                if(evt.keyCode == Event.KEY_ESC){
                    var onescFunction = options['onEsc'];
                    var executable = getAsFunction(onescFunction);
                    executable.call(self, evt);
//                    Event.stop(evt);
                }
            }
        }
    }
};


InPlaceEditor.prototype.makeNonEditable = function(purge){
    if (this.elem && this.elem.firstDescendant() && this.editing) {
        //we want to replace double quotes with single quotes
        var text = this.elem.firstDescendant().value;
        text = text.replace(/"/g,'\'');
        //this means remove all html tags or script tags
        if(purge){
            text = text.replace(/<\/?[^>]+(>|$)/g, "");
            //little hack
            text = text.replace("<>", "");
        }
        this.elem.update(text);
        this.editing = false;
    }
};



InPlaceEditor.prototype.revertEdit = function(){
    this.elem.update(this.value);
    this.editing = false;
};

//////////////////////////////////////////
// <Script> utils
//////////////////////////////////////////

function evaluateScripts(containerObj){
    var root;
    if (!containerObj) {
        root = document;
    } else {
        root = $(containerObj);
    }
    var scripts = root.getElementsByTagName('SCRIPT');
    if (scripts != null) {
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            if (script && script.text) {
                globalEval(script.text);
            }
        }
    }
}

function evaluateScript(scriptId){
    var script = $(scriptId);
    if (script && script.text) {
        globalEval(script.text);
    }
}


function globalEval(scriptText){
    window.eval.call(window, scriptText);
}

/**
 * @param {Array} scriptLibraryArray
 */
function loadJSFiles(scriptLibraryArray){
    if (scriptLibraryArray && Object.isArray(scriptLibraryArray)) {
        scriptLibraryArray.each(function(thisFile) {loadJSFile(thisFile)});
    }
}

function loadJSFile(thisFile){
    //unload the old one if any (tags only - for clean up)...
    if ($(thisFile)) {
        $(thisFile).parentNode.removeChild($(thisFile));
    }
    var script = new Element("script");
    script.setAttribute("id", thisFile);
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", thisFile);
//    $$("head")[0].insert(script,'bottom');
    $$("head")[0].appendChild(script);
}

/**
 * only unloads the script tag
 */
function unloadAllScripts(){
    var scripts = document.getElementsByTagName('SCRIPT');
    if (scripts != null) {
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            script.parentNode.removeChild(script);
        }
    }
}

//////////////////////////////////////////
// CSS utils
//////////////////////////////////////////

/**
 * @param {Array} cssFileArray
 * @param addToBody - if true appends CSS to body (if possible), if false to head
 */
function loadCSSFiles(cssFileArray, addToBody){
    if (cssFileArray && Object.isArray(cssFileArray)) {
        cssFileArray.each(function(thisFile) {loadCSSFile(thisFile, addToBody)});
    }
}

function loadCSSFile(thisFile, addToBody){
    //unload existing versions of this file so that new ones are at bottom of file
    unloadCSSFile(thisFile);

    var cssLink = new Element("link");
    cssLink.setAttribute('id', escape(thisFile));
    cssLink.setAttribute("rel", "stylesheet");
    cssLink.setAttribute("type", "text/css");
    cssLink.setAttribute("href", thisFile);
    if (addToBody && document.body) {
        document.body.appendChild(cssLink);
    } else {
        $$("head")[0].insert(cssLink, 'bottom');
    }
}

/**
 * @param {Array} cssFileArray
 */
function unloadCSSFiles(cssFileArray){
    if (cssFileArray && Object.isArray(cssFileArray)) {
        cssFileArray.each(function(thisFile) {unloadCSSFile(thisFile)});
    }
}

function unloadCSSFile(thisFile){
    if ($(escape(thisFile))) {
        try {
            $(escape(thisFile)).parentNode.removeChild($(escape(thisFile)));
        }
        catch (ex) {
            alert (ex);
        }
    }
}

function createCSSRule(cssString) {
    var style = document.createElement('style');

    style.type = 'text/css';

    style.innerHTML = cssString;

    document.getElementsByTagName('head')[0].appendChild(style);
}
//////////////////////////////////////////
// CSS selector utils
//////////////////////////////////////////

/**
 * return frist object to matych CSS selector or null
 * @param {Object} cssSelector
 */
function getFirstMatch(cssSelector) {
    return $$(cssSelector)[0];
}

////////////////////////////
// Dialog events
////////////////////////////

/**
 * NOTE: requires drag.js library
 * @param {Object} event
 */
function dialogOnMouseDown(event) {
    var evt = (event != null) ? event : window.event;

    //if the target is the same as the one saved by cancelEventDrag(), do not initiate drag
    if (cancelEventDragTarget && cancelEventDragTarget == getEventTarget(evt)) {
        return;
    }

    new Dragger(
            evt,
            [getAbsoluteParent(window.event ? evt.srcElement : evt.target)],
            true,
            true,
            2,
            new DragListener());
}

//used by cancelEventDrag() to save the target for which drag is to be cancelled
var cancelEventDragTarget = null;

function cancelEventDrag(event) {
    //save the event target
    cancelEventDragTarget = getEventTarget(event);
}

///////////////////////////////////////////
// Ajax utils
///////////////////////////////////////////
function encodeUriParameter(string) {
    return encodeURIComponent(encodeURIComponent(string));
}

function replaceHTML(container,html){
    if (isIE()) {
        container.innerHTML = html;
        return;
    }
    var container = $(container);
    var nextSibling = container.nextSibling;
    var parent = container.parentNode;
    parent.removeChild(container);
    container.innerHTML = html;
    if (nextSibling) {
        parent.insertBefore(container, nextSibling);
    } else {
        parent.appendChild(container);
    }
}



///////////////////////////////////////////
// Return to default flow
///////////////////////////////////////////
function gotoDefaultLocation(params) {
    window.location.href="flow.html?_flowId=searchFlow" + ((params) ? "&" + params : "");
}

function gotoFolderExplorer(folderUri) {
    window.location.href="flow.html?_flowId=searchFlow";
    document.location="flow.html?_flowId=searchFlow&showFolder=" + folderUri;
}

///////////////////////////////////////////
// Temp
///////////////////////////////////////////

function switchDesign(switchTo) {
    var thisUrl = document.location.href;
    var hasDecParam = thisUrl.include('&decorator');
    if (switchTo==="old") {
        if (hasDecParam) {
            thisUrl = thisUrl.replace('main', 'mainOld');
        } else {
            thisUrl = thisUrl + '&decorator=mainOld&confirm=true';
        }
    } else {
        if (hasDecParam) {
            thisUrl = thisUrl.replace('mainOld', 'main');
        } else {
            thisUrl = thisUrl + '&decorator=main&confirm=true';
        }
    }
    document.location.href = thisUrl;
}

///////////////////////////////////////////////////
// importerd from jasperserver.js (merge these)
///////////////////////////////////////////////////

function showDiv(divId)
{
    var div = document.getElementById(divId);

    var width = document.body.clientWidth;
    var height = document.body.clientHeight;

    var oldZindex = div.style.zIndex;
    div.style.zIndex = -100;
    div.style.display= 'block';

    centerLayer(div);
    div.style.zIndex = oldZindex;
}

function hideDiv(divId)
{
    var div = document.getElementById(divId)
    div.style.display= 'none';
    return true;
}

function borderImage(which, color)
{
    //if IE 4+ or NS 6+
    if (document.all||document.getElementById)
    {
        which.style.borderColor=color
    }
}

function resetRadio(radio)
{
    var changed = false;
    if (radio.length)
    {
        for (var i = 0; i < radio.length; ++i)
        {
            if (radio[i].checked)
            {
                radio[i].checked = false;
                changed = true;
            }
        }
    }
    else
    {
        if (radio.checked)
        {
            radio.checked = false;
            changed = true;
        }
    }
    return changed;
}




function launchAboutDlg() {
    var aboutPanel = document.getElementById('about');
    aboutPanel.style.display="block";
    centerLayer(aboutPanel);
}


function hideAboutDlg() {
    var aboutPanel = document.getElementById('about');
    aboutPanel.style.display="none";
}



function unSelectAll(event){
    if(typeof(window['selObjects']) != "undefined" ){
        selObjects.clear();
    }
}

/////////////////////////////////////////////////////////////////
// Tracer utils IE8+, FF, Chrome, Safari
//////////////////////////////////////////////////////////////////

String.prototype.times = function(count) {
    return count < 1 ? '' : new Array(count + 1).join(this);
}

var tracer = {
    nativeCodeEx: /\[native code\]/,
    indentCount: -4,
    tracing: [],

    traceMe: function(func, methodName) {
        var traceOn = function() {
                var startTime = +new Date;
                var indentString = " ".times(tracer.indentCount += 4);
                console.info(indentString + methodName + '(' + Array.prototype.slice.call(arguments).join(', ') + ')');
                var result = func.apply(this, arguments);
                console.info(indentString + methodName, '-> ', result, "(", new Date - startTime, 'ms', ")");
                tracer.indentCount -= 4;
                return result;
        }
        traceOn.traceOff = func;
        for (var prop in func) {
            traceOn[prop] = func[prop];
        }
        console.log("tracing " + methodName);
        return traceOn;
    },

    traceAll: function(root, recurse) {
        if ((root == window) || !((typeof root == 'object') || (typeof root == 'function'))) {return;}
        for (var key in root) {
            if ((root.hasOwnProperty(key)) && (root[key] != root)) {
                var thisObj = root[key];
                if (typeof thisObj == 'function') {
                    if ((this != root) && !thisObj.traceOff && !this.nativeCodeEx.test(thisObj)) {
                        root[key] = this.traceMe(root[key], key);
                        this.tracing.push({obj:root,methodName:key});
                    }
                }
                recurse && this.traceAll(thisObj, true);
             }
        }
    },

    untraceAll: function() {
        for (var i=0; i<this.tracing.length; ++i) {
            var thisTracing = this.tracing[i];
            thisTracing.obj[thisTracing.methodName] =
                thisTracing.obj[thisTracing.methodName].traceOff;
        }
        console.log("tracing disabled");
        tracer.tracing = [];
    }
}

////////////////////////////////
// Validation module
////////////////////////////////
var ValidationModule = {
    /**
     * Performs validation of validation entries, highlights invalid form elements and shows error message.
     *
     * @param validationEntries an object or array of validation entries. Each validation entry is JSON object with the
     * following properties:
     *  <ul>
     *      <li>validator - the validator function. It performs validation and return JSON object with the
     *      following properties:
     *          <ul>
     *              <li>isValid - <code>true</code> if the value is valid, <code>false</code> otherwise</li>
     *              <li>errorMessage - an error message if isValid=false, otherwise it is empty</li>
     *              <li>onValid - an callback if isValid=true</li>
     *              <li>onInvalid - an callback if isValid=false</li>
     *          </ul>
     *      </li>
     *      <li>element - the element for which validation should be done using specified validator</li>
     *  </ul>
     */
    validate: function(validationEntries, showError) {
        var isValid = true, elemsWithErrors = [];

        validationEntries = isArray(validationEntries) ? validationEntries : [validationEntries];
        showError = (showError !== false);


        validationEntries.each(function(validationEntry) {
            var result = validationEntry.validator.call(ValidationModule, validationEntry.element.getValue());

            result.isValid ?
                    (validationEntry.onValid && validationEntry.onValid(validationEntry)) :
                    (validationEntry.onInvalid && validationEntry.onInvalid(validationEntry));

            if (!result.isValid && !elemsWithErrors.include(validationEntry.element)) {
                elemsWithErrors.push(validationEntry.element);
                showError && ValidationModule.showError(validationEntry.element, result.errorMessage);
                isValid = false;
            } else if (!elemsWithErrors.include(validationEntry.element)) {
                showError && ValidationModule.hideError(validationEntry.element);
            }
        });

        return isValid;
    },
    /**
     * Shows error message for the specified form element.
     *
     * @param element the form element.
     * @param errorMessage the error message.
     */
    showError: function(element, errorMessage) {
        $(element.parentNode).select(layoutModule.MESSAGE_WARNING_PATTERN)[0].update(errorMessage);
        element.parentNode.addClassName(layoutModule.ERROR_CLASS);
    },
    /**
     * Hides error message for the specified form element.
     *
     * @param element the form element.
     */
    hideError: function(element) {
        $(element.parentNode).removeClassName(layoutModule.ERROR_CLASS);
    }
};

///////////////////////////////////////////////
// Class Name Builder - Please do not use
//////////////////////////////////////////////
var ClassNameBuilder = function(element) {
    this.element = $(element);

    if (this.element.classNameBuilder) {
        return this.element.classNameBuilder;
    }

    this.names = this.element.className.split(" ");
    this.names = this.names.compact().uniq();

    this.element.classNameBuilder = this;
};

ClassNameBuilder.
        addMethod('add', function(name) {

            var newNames = [];
            if (Object.isString(name)) {
                newNames = name.split(" ");
            } else if (isArray(name)) {
                newNames = name;
            } else {
                return this;
            }

            newNames.each(function(name) {
                if (!this.names.include(name)) {
                    this.names.push(name);
                }
            }.bind(this));

            return this;
        }).
        addMethod('remove', function(name) {
            this.names = this.names.without(name);
            return this;
        }).
        addMethod('clean', function() {
            this.names = [];
            return this;
        }).
        addMethod('toClassName', function() {
            this.element.className = this.names.join(" ");
            return this.element.className;
        });



///////////////////////////////
// Cookie util
///////////////////////////////

/**
 * This util can be used to store and retrieve cookie in the browser.
 *
 * Usage:
 *    new JSCookie("name", "value", 5); - Create new cookie or updates current value. Cookie will be stored for 5 days
 *    new JSCookie("name", "value"); - Create new cookie or updates current value. By default cookie will be stored for 30 days
 *    new JSCookie("name").value; - retrieves value of the cookie
 *
 * @param name of the cookie
 * @param value  of the cookie
 * @param days  Store time in days
 */
var JSCookie = function(name, value, days) {
    if (!Object.isString(name)) { throw "Invalid name"; }

    this.name = name;
    this.value = value;

    if(Object.isUndefined(value)) {
        this.value = this._getCookies()[name];
    } else {
        this._setCookie(this.name, this.value, days);
    }
};

JSCookie.addVar('daysToExpiration', 30);
JSCookie.addVar('cookieTemplate', new Template('#{name}=#{value}; expires={expires}; path=/;'));

JSCookie.addMethod('_getCookies', function() {
    var cookies = {};

    document.cookie.split(';').invoke('strip').each(function(s) {
        var nv = s.split('=');
        cookies[nv[0].strip()] = decodeURI(nv[1]);
    });

    return cookies;
});

JSCookie.addMethod('_setCookie', function(name, value, days) {
    document.cookie = this.cookieTemplate.evaluate({
        name: name,
        value: encodeURI(new String(value)),
        expires: this._getExpiresDate(days).toGMTString()
    });
});

JSCookie.addMethod('_getExpiresDate', function(days){
    var date = new Date();
    date.setTime(date.getTime() + ((days) ? days : this.daysToExpiration * 24 * 60 * 60 * 1000));

    return date;
});

///////////////////////////////////////////
// Session management
///////////////////////////////////////////
var sessionManager = {
    RESET_SESSION_MIN_TIME: 1000,

    resetSession: function(flowExecutionKey) {
        var time = (new Date()).getTime();
        if (this._lastSessionResetTime
                && (time - this._lastSessionResetTime < this.RESET_SESSION_MIN_TIME)) {
            return;
        }

        this._lastSessionResetTime = time;

        var url = buildActionUrl({flowExecutionKey: flowExecutionKey, eventId: 'resetSession'});
        var options = {
            errorHandler: this.errorHandler
        };
        ajaxNonReturningUpdate(url, options);
    },

    errorHandler: function (ajaxAgent) {
        var sessionTimeout = ajaxAgent.getResponseHeader("LoginRequested");

        if (sessionTimeout) {
            document.location = urlContext;
            return true;
        }
    }
};

///////////////////////////////////////////
// Webflow utils
///////////////////////////////////////////
var buildActionUrl = function(params) {
    if (!params) {
        return;
    }

    var paramsClone = deepClone(params);

    $w('flowId flowExecutionKey eventId').each(function(key) {
        if (paramsClone[key]) {
            paramsClone['_' + key] = paramsClone[key];
            delete paramsClone[key];
        }
    });

    return 'flow.html?' + Object.toQueryString(paramsClone);
};

///////////////////////////////////////////
// Page Dimmer object and methods
///////////////////////////////////////////

/**
 * Page dimmer is used to show/hide page dimmer.
 */
var pageDimmer = {
    _dom: null,

    /**
     * The identifier of the DOM element.
     */
    DOM_ID: "pageDimmer",

    /**
     * Shows page dimmer.
     */
    show: function() {
        if (this._dom == null) {
            this._dom = $(this.DOM_ID);
        }
        this._dom.removeClassName('hidden');
    },

    /**
     * Hides page dimmer.
     */
    hide: function() {
        if (this._dom != null) {
            this._dom.addClassName('hidden');
        }
    }
};

//////////////////////////////////////////////
// IFRAME Ajax -> move to core.ajax.iframe
/////////////////////////////////////////////
/**
*   Uses the AJAX IFRAME METHOD (AIM)
*   http://www.webtoolkit.info/
*   Copyright � 2006-2010 � webtoolkit
*/
var fileSender = {};
/**
* Upload a file to the server.
*
* @param input - the file input object (<input type=file ...>)
* @param flowId
* @param options - these options will be sent to server along with the file.
*   Required ones:
*     options._eventId
*     options._flowExecutionKey
* @param callback - function is being invoked after the file is uploaded
*
*/
fileSender.upload = function (input, flowId, options, callback) {

    var form = Builder.node('FORM', {action: "flow.html?_flowId=" + flowId, method: "post", enctype:"multipart/form-data"});

    var fileInput = input.cloneNode(true);

    input.writeAttribute('id', null);
    input.addClassName('hidden');

    if (form.file) {
        form.file.remove();
    }

    //Move event listeners to newly created object
    var eventNames = Element.getStorage(input).get('prototype_event_registry');
    eventNames && eventNames.keys().each(function(eventName) {
        var handlers = Element.getStorage(input).get('prototype_event_registry').get(eventName);
        handlers.each(function(handler) {
            fileInput.observe(eventName, handler);
        });
    });

    eventNames && eventNames.keys().each(function(eventName) {
        var handlers = Element.getStorage(input).get('prototype_event_registry').get(eventName);
        handlers.each(function(handler) {
            input.stopObserving(eventName, handler);
        });
    });

    input.insert({after: fileInput});
    input.remove();
    form.insert(input);

    for (var key in options) {
        var inp = Builder.node('INPUT', {type: "hidden", name: key, value:options[key]});
        form.insert(inp);
    }

    form.addClassName('hidden');
    document.body.insert(form);

    fileSender.submit(form, {'onStart' : null, 'onComplete' : callback});
    form.submit();
}


fileSender.frame = function(c) {
    var n = 'f' + Math.floor(Math.random() * 99999);

    var i = $('ajax-upload-iframe').cloneNode(true);
    i.writeAttribute('id', n);
    i.writeAttribute('name', n);
    document.body.insert(i);

    var loaded = function() {
        fileSender.loaded(n);
    }
    i.observe('load', loaded);
    if (c && typeof(c.onComplete) == 'function') {
        i.onComplete = c.onComplete;
    }

    return n;
}

fileSender.form = function (f, name) {
    f.setAttribute('target', name);
}

/**
* Use fileSender.submit(formElement, {'onStart' : startUpload, 'onComplete' : callback}) to prepare the form.
* @param formElement - the DOM form object containing the file input
* @param startUpload - function is being invoked before start uploading
* @param callback - function is being invoked after file is uploaded
*
*/
fileSender.submit = function (f, c) {
    fileSender.form(f, fileSender.frame(c));
    if (c && typeof(c.onStart) == 'function') {
        return c.onStart();
    } else {
        return true;
    }
}

fileSender.loaded = function(id) {
    var i = document.getElementById(id);
    var d;
    if (i.contentDocument) {
        d = i.contentDocument;
    } else if (i.contentWindow) {
        d = i.contentWindow.document;
    } else {
        d = window.frames[id].document;
    }
    if (d.location.href == "about:blank") {
        return;
    }

    if (fileSender.sessionTimeoutHandler(d)) {
        return;
    }

    if (typeof(i.onComplete) == 'function') {
        i.onComplete(d.body.innerHTML);
    }
}

fileSender.sessionTimeoutHandler = function(doc) {
    var metas = doc.getElementsByTagName("meta");
    for (var i = 0; i < metas.length; i++) {
        if (metas[i].name == 'pageHeading' && metas[i].content == 'LOGIN PAGE') {
            document.location = '.';
            return true;
        }
    }
    return false;
}
/**
* Download a file using iframe as a receiving container.
* If file is ready, browser will show Save As dialog.
* If error occured, iframe will receive the error information
* @param url - server URL to call for the file
* @param options - an object with call parameters
*                  options.onload is a function to call when iframe is loaded; use as error handler
*/
function ajaxIframeDownload(url, options) {
    var iframe = $('ajax-download-iframe');
    if (options) {
        iframe.onload = options.onload;
    }
    iframe.src = url;
}
/*
 * Keyboard events / codes
 */
Keys = new Object();
Keys.DOM_VK_BACK_SPACE = 8;
Keys.DOM_VK_ENTER = 13;
Keys.DOM_VK_PAGE_UP = 33;
Keys.DOM_VK_DOWN = 40;
Keys.DOM_VK_INSERT = 45;
Keys.DOM_VK_DELETE = 46;
Keys.DOM_VK_0 = 48;
Keys.DOM_VK_9 = 57;
Keys.DOM_VK_NUMPAD0 = 96;
Keys.DOM_VK_NUMPAD9 = 105;
Keys.DOM_VK_DECIMAL = 110;
Keys.DOM_VK_COMMA = 188;
Keys.DOM_VK_PERIOD = 190;
Keys.DOM_VK_CANCEL = 3;
Keys.DOM_VK_HELP = 6;
Keys.DOM_VK_TAB = 9;
Keys.DOM_VK_CLEAR = 12;
Keys.DOM_VK_RETURN = 13;
Keys.DOM_VK_SHIFT = 16;
Keys.DOM_VK_CONTROL = 17;
Keys.DOM_VK_ALT = 18;
Keys.DOM_VK_PAUSE = 19;
Keys.DOM_VK_CAPS_LOCK = 20;
Keys.DOM_VK_ESCAPE = 27;
Keys.DOM_VK_SPACE = 32;
Keys.DOM_VK_PAGE_DOWN = 34;
Keys.DOM_VK_END = 35;
Keys.DOM_VK_HOME = 36;
Keys.DOM_VK_LEFT = 37;
Keys.DOM_VK_UP = 38;
Keys.DOM_VK_RIGHT = 39;
Keys.DOM_VK_PRINTSCREEN = 44;
Keys.DOM_VK_1 = 49;
Keys.DOM_VK_2 = 50;
Keys.DOM_VK_3 = 51;
Keys.DOM_VK_4 = 52;
Keys.DOM_VK_5 = 53;
Keys.DOM_VK_6 = 54;
Keys.DOM_VK_7 = 55;
Keys.DOM_VK_8 = 56;
Keys.DOM_VK_SEMICOLON = 59;
Keys.DOM_VK_EQUALS = 61;
Keys.DOM_VK_A = 65;
Keys.DOM_VK_B = 66;
Keys.DOM_VK_C = 67;
Keys.DOM_VK_D = 68;
Keys.DOM_VK_E = 69;
Keys.DOM_VK_F = 70;
Keys.DOM_VK_G = 71;
Keys.DOM_VK_H = 72;
Keys.DOM_VK_I = 73;
Keys.DOM_VK_J = 74;
Keys.DOM_VK_K = 75;
Keys.DOM_VK_L = 76;
Keys.DOM_VK_M = 77;
Keys.DOM_VK_N = 78;
Keys.DOM_VK_O = 79;
Keys.DOM_VK_P = 80;
Keys.DOM_VK_Q = 81;
Keys.DOM_VK_R = 82;
Keys.DOM_VK_S = 83;
Keys.DOM_VK_T = 84;
Keys.DOM_VK_U = 85;
Keys.DOM_VK_V = 86;
Keys.DOM_VK_W = 87;
Keys.DOM_VK_X = 88;
Keys.DOM_VK_Y = 89;
Keys.DOM_VK_Z = 90;
Keys.DOM_VK_CONTEXT_MENU = 93;
Keys.DOM_VK_NUMPAD1 = 97;
Keys.DOM_VK_NUMPAD2 = 98;
Keys.DOM_VK_NUMPAD3 = 99;
Keys.DOM_VK_NUMPAD4 = 100;
Keys.DOM_VK_NUMPAD5 = 101;
Keys.DOM_VK_NUMPAD6 = 102;
Keys.DOM_VK_NUMPAD7 = 103;
Keys.DOM_VK_NUMPAD8 = 104;
Keys.DOM_VK_MULTIPLY = 106;
Keys.DOM_VK_ADD = 107;
Keys.DOM_VK_SEPARATOR = 108;
Keys.DOM_VK_SUBTRACT = 109;
Keys.DOM_VK_SUBTRACT_UNDERSCORE_IE = 189;
Keys.DOM_VK_DIVIDE = 111;
Keys.DOM_VK_F1 = 112;
Keys.DOM_VK_F2 = 113;
Keys.DOM_VK_F3 = 114;
Keys.DOM_VK_F4 = 115;
Keys.DOM_VK_F5 = 116;
Keys.DOM_VK_F6 = 117;
Keys.DOM_VK_F7 = 118;
Keys.DOM_VK_F8 = 119;
Keys.DOM_VK_F9 = 120;
Keys.DOM_VK_F10 = 121;
Keys.DOM_VK_F11 = 122;
Keys.DOM_VK_F12 = 123;
Keys.DOM_VK_F13 = 124;
Keys.DOM_VK_F14 = 125;
Keys.DOM_VK_F15 = 126;
Keys.DOM_VK_F16 = 127;
Keys.DOM_VK_F17 = 128;
Keys.DOM_VK_F18 = 129;
Keys.DOM_VK_F19 = 130;
Keys.DOM_VK_F20 = 131;
Keys.DOM_VK_F21 = 132;
Keys.DOM_VK_F22 = 133;
Keys.DOM_VK_F23 = 134;
Keys.DOM_VK_F24 = 135;
Keys.DOM_VK_NUM_LOCK = 144;
Keys.DOM_VK_SCROLL_LOCK = 145;
Keys.DOM_VK_SLASH = 191;
Keys.DOM_VK_BACK_QUOTE = 192;
Keys.DOM_VK_OPEN_BRACKET = 219;
Keys.DOM_VK_BACK_SLASH = 220;
Keys.DOM_VK_CLOSE_BRACKET = 221;
Keys.DOM_VK_QUOTE = 222;
Keys.DOM_VK_META = 224;











