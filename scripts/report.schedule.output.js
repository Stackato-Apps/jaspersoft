
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

var ScheduleOutput = {

    initialize: function() {
        Schedule.initSwipeScroll();

        var timestampPatternInput = $('timestampPatternInput');
        var timestampPatternText = $('timestampPatternText');

        function checkTimestampPattern(checkbox) {
            timestampPatternInput.setValue("");
            if (checkbox.checked) {
                timestampPatternText.setValue(Schedule.getMessage('TIMESTAMP_PATTERN_DEFAULT'));
                timestampPatternText.disabled = false;
            } else {
                timestampPatternText.setValue("");
                timestampPatternText.disabled = true;
            }
        }


        var inputsClickActions = {
            'input#attachBox': function(elem) { $('attach').setValue(elem.checked ? 2 : 1)},
            'input#sequential': checkTimestampPattern
        }

        $(Schedule.PAGE_JOB_OUTPUT).observe('click', function(e) {
            // observe inputs click
            var elem = e.element();
            for (pattern in inputsClickActions) {
                if (elem.match(pattern)) {
                    inputsClickActions[pattern](elem);
                    return;
                }
            }

            // observe navigation buttons
            var link = matchAny(e.element(), ['a','button','li'], true);
            if (link) {
                for (var pattern in Schedule.buttonActions) {
                    if (link.match(pattern)) {
                        e.stop();
                        Schedule.submitForm($(Schedule.STEP_DISPLAY_FORM), Schedule.buttonActions[pattern]);
                        return;
                    }
                }
            }
        });

        timestampPatternText.observe('focus', function(){
            timestampPatternText.setValue(timestampPatternInput.getValue());
        });
        
        timestampPatternText.observe('blur', function(){
            timestampPatternInput.setValue(this.getValue());
            if (this.value == '') {
                this.value = Schedule.getMessage('TIMESTAMP_PATTERN_DEFAULT');
            }
        });

        // disable Previous button if Run Now Mode
        if (Schedule.isRunNowMode && !Schedule.hasReportParameters) {
            buttonManager.disable($('previous'));
        }

        //////////////////////////////
        // init output location tree
        //////////////////////////////

        var outputLocation = $('outputLocation');
        var outputUri = outputLocation.getValue();
        if (outputUri == '') {
            outputUri = Schedule.jobSource.substring(0,Schedule.jobSource.lastIndexOf('/'));
            outputLocation.setValue(outputUri);
        }

        var uriInput = $('browseOutputLocation');
        uriInput.setValue(outputUri);

        //listen for user input
        uriInput.observe('change', function(){
            outputLocation.setValue(this.getValue());
        });

        //bind 'browse' button with inputs
        new picker.FileSelector({
            treeId: 'repoTree',
            providerId: 'repositoryTreeFoldersProvider',
            treeOptions: {
                organizationId: Schedule.organizationId,
                publicFolderUri: Schedule.publicFolderUri
            },
            uriTextboxId: uriInput.readAttribute('id'),
            browseButtonId: 'browser_button',
            title: Schedule.getMessage('browse.title'),
            onOk: function() {
                outputLocation.setValue(uriInput.getValue());
            }
        });
    }

}

document.observe('dom:loaded', ScheduleOutput.initialize.bind(ScheduleOutput));

