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
 * Usage:
 *      Within HTML markup. (Not working with button element)
 *
 *      <code>
 *      &lt;li tooltiptext="Hello"&gt;Item 1&lt;/li&gt;
 *      &lt;li tooltiptext="Hello" tooltiplabel="URA!"&gt;Item 1&lt;/li&gt;
 *      &lt;li tooltiptext="Hello" tooltiplabel="URA!" tooltiptemplate="tID"&gt;Item 1&lt;/li&gt;
 *      </code>
 *
 *      Within JavaScript
 *      <code>
 *      new JSTooltip(element, { text: "tooltipText" }).show();
 *      new JSTooltip(element, { text: "tooltipText", offsets: [100, 50] }).show();
 *      new JSTooltip(element, { text: "tooltipText" }).show([100, 50]);
  *     new JSTooltip(element, { label: "tooltipLabel", text: "tooltipText", templateId: "templateId" });
 *      new JSTooltip(element, { label: ["tooltipLabel1", "tooltipLabel2"], text: ["tooltipText1", "tooltipText2", "tooltipText3"], templateId: "templateId" });
 *
 *      tooltipModule.showJSTooltip(element, [100, 50]);
 *      tooltipModule.hideJSTooltip(element);
 *      </code>
 * @param element
 * @param options {Object}
 * <ul>
 *      <li>label {String} - Label for the tooltip</li>
 *      <li>label {Array} - List of labels for complex tooltip</li>
 *      <li>text {String} - Text for the tooltip</li>
 *      <li>text {Array} - List of messages for complex tooltip</li>
 *      <li>templateId {String} - DOM ID of template for the tooltip </li>
 *      <li>offsets {Array} - Used to show the tooltip in position. First item in array is the X point adn second is the Y point </li>
 *      <li>showBelow {Boolean} - Show bellow element</li>
 * </ul>
 *
 */
function JSTooltip(element, options) {
    if (element) {
        this.srcElement = element;

        if (options) {
            this.label = options.label;
            this.text = options.text;
            this.offsets = options.offsets;
            this.showBelow = !! options.showBelow;
            this.templateId = options.templateId;
        }

        if (this.templateId) {
            this._toAttribute(this.TOOLTIP_TEMPLATE, this.templateId);
        } else {
            var id = this._fromAttribute(this.TOOLTIP_TEMPLATE);
            this.templateId = (id && id.length > 0) ? id : this.TOOLTIP_TEMPLATE_ID;
        }
        if (this.label) {
            this._toAttribute(this.TOOLTIP_LABEL, this.label);
        } else {
            this.label = this._fromAttribute(this.TOOLTIP_LABEL);
        }
        if (this.text) {
            this._toAttribute(this.TOOLTIP_TEXT, this.text);
        } else {
            this.text = this._fromAttribute(this.TOOLTIP_TEXT);
        }

        this.srcElement.jsTooltip = this;

        tooltipModule.tooltips.push(this);
    }
}

JSTooltip.addVar("SEPARATOR", "@@");
JSTooltip.addVar("TOOLTIP_LABEL", "tooltiplabel");
JSTooltip.addVar("TOOLTIP_TEXT", "tooltiptext");
JSTooltip.addVar("TOOLTIP_TEMPLATE", "tooltiptemplate");
JSTooltip.addVar("TOOLTIP_TEMPLATE_ID", "jsTooltip");
JSTooltip.addVar("LABEL_PATTERN", ".message.label");
JSTooltip.addVar("TEXT_PATTERN", ".message:not(.label)");

JSTooltip.addMethod("_toAttribute", function(attrName, value) {
    if(this.srcElement) {
        this.srcElement.writeAttribute(attrName, isArray(value) ? value.join(this.SEPARATOR) : value);
    }
});

JSTooltip.addMethod("_fromAttribute", function(attrName) {
    if(this.srcElement && this.srcElement.hasAttribute(attrName)) {
        var value = this.srcElement.readAttribute(attrName);
        return value.include(this.SEPARATOR) ? value.split(this.SEPARATOR) : value;
    }

    return null;
});

JSTooltip.addMethod("_setValues", function(elements, values) {
    elements.each(function (element, index) {
        if (values[index]) {
            element.update(values[index]);
        }
    });
});

JSTooltip.addMethod("show", function(offsets) {
    if(offsets) {
        this.offsets = offsets;
    }

    this._element = $(this.templateId).cloneNode(true);
    this._element.writeAttribute("id", "").identify();

    var offsets;

    if (this.showBelow) {
        offsets = getBoxOffsets(this.srcElement);
        offsets[1] += this.srcElement.clientHeight + 5;
    } else {
        offsets = [getScrollLeft(), getScrollTop() + 5];
    }

    if (this.offsets) {
        offsets[0] += this.offsets[0];
        offsets[1] += this.offsets[1];
    }

    this._element.setStyle({
        position: "absolute",
        left: offsets[0] + 'px',
        top: offsets[1] + 'px'
    });

    var labelElements = this._element.select(this.LABEL_PATTERN);
    var textElements = this._element.select(this.TEXT_PATTERN);

    if(this.label) {
        this._setValues(labelElements, isArray(this.label) ? this.label : [this.label]);
    }
    if(this.text) {
        this._setValues(textElements, isArray(this.text) ? this.text : [this.text]);
    }

    this._element.removeClassName(layoutModule.HIDDEN_CLASS);
    $(document.body).insert(this._element);

    return this;
});

JSTooltip.addMethod("hide", function() {
    if (this._element) {
        this._element.addClassName(layoutModule.HIDDEN_CLASS);

        if (this._element.parentNode) {
            this._element.remove();
        } else {
            this._element = null;
        }
    }
});

var tooltipModule = {
    TOOLTIP_PATTERN: "*[tooltiptext] > *",
    ELEMENT_WITH_TOOLTIP_PATTERN: "*[tooltiptext]",

    tooltips: [],

    showJSTooltip: function(element, offsets) {
        if (!element.jsTooltip) {
            element.jsTooltip = new JSTooltip(element, {});
        }

        this.cleanUp();
        
        return element.jsTooltip.show(offsets);
    },

    hideJSTooltip: function(element) {
        if (element && element.jsTooltip) {
            element.jsTooltip.hide();
        }

        this.cleanUp();
    },

    cleanUp: function() {
        if (this.tooltips && this.tooltips.length > 0) {
            var removed = [];
            this.tooltips.each(function(tooltip) {
                if (!tooltip.srcElement.parentNode) {
                    tooltip.hide();
                    removed.push(tooltip);
                }
            });

            if (removed.length > 0) {
                this.tooltips = this.tooltips.reject(function(t) {
                    return removed.include(t);
                });
            }
        }
    }
};

document.observe('mouseover', function(evt){
    var element = evt.element();

    var matched = matchAny(element, [tooltipModule.ELEMENT_WITH_TOOLTIP_PATTERN], true);
    matched && tooltipModule.showJSTooltip(matched, [evt.clientX, evt.clientY]);
});

document.observe('mouseout', function(evt){
    var element = evt.element();

    var matched = matchAny(element, [tooltipModule.ELEMENT_WITH_TOOLTIP_PATTERN], true);
    matched && tooltipModule.hideJSTooltip(matched);
});

document.observe('click', function(evt){
    var element = evt.element();

    var matched = matchAny(element, [tooltipModule.ELEMENT_WITH_TOOLTIP_PATTERN], true);
    matched && tooltipModule.hideJSTooltip(matched);
});
