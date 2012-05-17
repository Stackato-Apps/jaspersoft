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


var Administer = {

    _messages: {},
    urlContext: null,

    getMessage: function(messageId, object) {
        var message = this._messages[messageId];
        return message ? new Template(message).evaluate(object ? object : {}) : "";
    },

    menuActions: {
        // Url context is necessary because some uf links has 2 levels or urls e.g. /olap/properties.html
        // Analysis options button has different id's for different versions of JS
        'p#navAnalysisOptions': function() {return Administer.urlContext + "/flow.html?_flowId=mondrianPropertiesFlow"},
        'p#navAnalysisOptionsCE': function() {return Administer.urlContext + "/olap/properties.html"},
        'p#navDesignerOptions': function() {return Administer.urlContext + "/flow.html?_flowId=designerOptionsFlow"},
        'p#navDesignerCache': function() {return Administer.urlContext + "/flow.html?_flowId=designerCacheFlow"},
        'p#navLogSettings': function() {return Administer.urlContext + "/log_settings.html"}
    },

    _sendRequest: function(url,data,callback) {
            ajaxTargettedUpdate(
                url,
                {
                postData: data,
				callback: callback,
                mode: AjaxRequester.prototype.EVAL_JSON,
                errorHandler: this._errorHandler
                });
    },
    _errorHandler: function(ajaxAgent) {
           if (ajaxAgent.getResponseHeader("LoginRequested")) {
       		  window.location = 'flow.html?_flowId=designerCacheFlow';
            return true;
        }

        return baseErrorHandler(ajaxAgent);
    }



}