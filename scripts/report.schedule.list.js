
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

var ScheduleList = {

    JOB_CONTAINER: "jobContainer",
    JOB_ITEM_PFX: "jobItem_",

    navigationForm: null,



    initialize: function() {

        var buttonActions = {
                'button#back': 'back',
                'button#scheduleJob': 'new',
                'button#runNow': 'now',
                'button#refresh': 'refresh'
        }

        $(Schedule.PAGE_JOB_LIST).observe('click', function(e) {
            // observe navigation buttons
            var button = matchAny(e.element(), [layoutModule.BUTTON_PATTERN], true);
            if (button) {
                for (var pattern in buttonActions) {
                        if (button.match(pattern)) {
                                if (pattern == 'button#back') {
                                    // disable back button after first click
                                    toolbarButtonModule.disable('back');
                                }
                                Schedule.submitForm(ScheduleList.navigationForm, buttonActions[pattern]);
                                return;
                      }
                }
            }

            var elem = e.element();
            // observe edit/remove
            if (elem.match('a#edit')) {
                ScheduleList.editJob(elem);
                return;
            }
            if (elem.match('a#remove')) {
                ScheduleList.removeJob(elem);
            }
        });

        var jobContainer = $(this.JOB_CONTAINER);

        this.navigationForm = $('navigationForm');

        if (!jobContainer.select('a#remove')[0]) {
            var nothingToDisplay = $('nothingToDisplay');
            nothingToDisplay.removeClassName(layoutModule.HIDDEN_CLASS);
            centerElement(nothingToDisplay, {horz: true, vert: true});
            document.body.addClassName(layoutModule.NOTHING_TO_DISPLAY_CLASS);
        }


        isIPad() && new TouchController(jobContainer, jobContainer.up(), {
//            debug: true
        });

    },

    editJob: function(element) {
        ScheduleList.navigationForm.editJobId.value = element.name;
        Schedule.submitForm(ScheduleList.navigationForm, "edit");
    },


    removeJob: function(element) {

        var id = element.name;

        var params = {
            selectedJobs: id
        };

        var deleteCallback = function(response) {
            if (response) {
                if (response.empty) {
                    var nothingToDisplay = $('nothingToDisplay');
                    nothingToDisplay.removeClassName(layoutModule.HIDDEN_CLASS);
                    centerElement(nothingToDisplay, {horz: true, vert: true});
                    document.body.addClassName(layoutModule.NOTHING_TO_DISPLAY_CLASS);
                } else if (response.result) {
                    $(ScheduleList.JOB_ITEM_PFX + response.id).remove();
                }
                dialogs.systemConfirm.show(Schedule.getMessage("report.scheduling.list.job.removed"));
            }
        };

        Schedule.sendInfo('delete', params, deleteCallback);
    }

}

document.observe('dom:loaded', ScheduleList.initialize.bind(ScheduleList));

