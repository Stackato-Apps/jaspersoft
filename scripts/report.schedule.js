
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

var Schedule = {
    _messages: {},

    STEP_DISPLAY_FORM: "pageForm",
    STEP_DISPLAY_ID: "stepDisplay",

    PAGE_JOB_LIST: "scheduler_jobList",
    PAGE_JOB_SETUP: "scheduler_jobSetUp",
    PAGE_JOB_PARAMETERS: "scheduler_jobParameters",
    PAGE_JOB_OUTPUT: "scheduler_jobOutput",

    getMessage: function(messageId, object) {
        var message = this._messages[messageId];
        return message ? new Template(message).evaluate(object ? object : {}) : "";
    },

    buttonActions: {
        'a#navSetUp': 'jobSetUp',
        'a#navParameters': 'jobParameters',
        'a#navOutput': 'jobOutput',
        'button#done': 'save',
        'button#cancel': 'cancel',
        'button#next': 'next',
        'button#previous': 'back',
        // recurence tabs on jobSetUp
        'li#none': 'noRecurrence',
        'li#simple': 'simpleRecurrence',
        'li#calendar': 'calendarRecurrence'
    },


//////////////////////////////
// Communication with server
//////////////////////////////

    submitForm: function(form, event) {
        form.method = "post";
        form._eventId.value = event;
        form.submit();
    },


    sendInfo: function(eventId, params, callback) {     // backend action method must return only JSON!!!

        var url = buildActionUrl({flowId: 'reportSchedulingFlow', flowExecutionKey: Schedule.flowExecutionKey, eventId: eventId});

        var options = {
            postData: appendPostData("", params),
            callback: callback,
            mode: AjaxRequester.prototype.EVAL_JSON
        };

        ajaxTargettedUpdate(url, options);
    },

    initSwipeScroll: function() {
        if(isIPad()){
            var display = $(Schedule.STEP_DISPLAY_ID);

            display && new TouchController(display.up(), display.up(1), {
//            debug: true
            });
        }
    }

};

