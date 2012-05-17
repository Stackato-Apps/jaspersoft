
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

var ScheduleSetup = {

    initialize: function() {
        Schedule.initSwipeScroll();
        // Simple recurence action functions
        function resetOccurrenceCount() {
            $('repeatOccurrenceCount').value = -1;
            $('maxOccurrences').value = "";
        }
        function resetEndDate() {
            $('repeatEndDate').select('input')[0].value = "";
        }
        function setOccurrenceCountValue() {
            if (!$('maxOccurrences') || !$('repeatOccurrenceCount')) {
                return null;
            }

            var value = $('maxOccurrences').value.strip();
            $('repeatOccurrenceCount').value = (value == '') ? -1 : value;
            return value;
        }
        function checkOccurrenceCountValue() {
            resetEndDate();
            var value = setOccurrenceCountValue();
            selectRadio(value == '' ? 'indefiniteRepeat' : 'fixedRepeat');
        }
        function checkEndDateValue() {
            resetOccurrenceCount();
            var value = $('repeatEndDate').select('input')[0].value;
            selectRadio(value == '' ? 'indefiniteRepeat' : 'calendarRepeat');
        }
        function resetMonthDays() {
            $('theMonthDays').value = "";
        }
        // Common
        function selectRadio(id) {
            $(id).checked = true
        }
        function selectAllOptions(id) {
            var list = $(id).options;
            for (var i=0; i < list.length; i++) {
                list[i].selected = true;
            }
        }
        function clearOptions(id) {
            $(id).selectedIndex = -1;
        }
		function setFocus(id) {
			if ($(id).down('input')) {
				$(id).down('input').focus(); 
			}
			else {
				$(id).focus(); 
			}
        }

        // if ie7 or ie8, textbox will not retain the latest typed in value
        // so this essentially updates maxOccurrences just before form submit.
        // updating allows server validation to work.
        function updateMaxOccurrences() {
            if ( isIE7() || isIE8() ) {
                 setOccurrenceCountValue();
            }
        }

        var inputsChangeActions = {
            '#startOn > input': function() { selectRadio('startDate') },         // job.trigger.startType -> calendar input
            '#maxOccurrences': function() { checkOccurrenceCountValue() },      // simple recurence -> recurrenceType 4 (fixed times repeat)
            '#repeatEndDate > input': function() { checkEndDateValue() }         // simple recurence -> recurrenceType 3 (calendar repeat)
        }

        var inputsClickActions = {
            // start type
            'input#startImmediately': function() { $('startOn').select('input')[0].value = "" },                        // startImmediately
            '#startOn > ':            function() { selectRadio('startDate') },                                          // calendarInput

            // simple recurence
            '#indefiniteRepeat': function() { resetEndDate(); resetOccurrenceCount() },                                 // recurrenceType 2 (indefinite repeat)
            '#fixedRepeat':      function() { resetEndDate(); setOccurrenceCountValue(); setFocus('maxOccurrences') },                              // recurrenceType 4 (fixed times repeat)
            '#maxOccurrences':  function() { resetEndDate(); setOccurrenceCountValue(); selectRadio('fixedRepeat') },  // recurrenceType 4 (fixed times repeat)
            '#calendarRepeat':   function() { resetOccurrenceCount(); setFocus('repeatEndDate') },                                                 // recurrenceType 3 (calendar repeat)
            '#repeatEndDate > ': function() { resetOccurrenceCount(); selectRadio('calendarRepeat') },                  // recurrenceType 3 (calendar repeat) -> calendar input and button

            // calendar recurence
            '#everyMonth_radio': function() { selectAllOptions('theMonths') },                                          // Months -> every month
            '#everyDay_radio':   function() { selectAllOptions('theWeekDays'); resetMonthDays() },                      // Days -> every day
            '#weekDays_radio':   function() { resetMonthDays() },                                                       // Days -> week days
            '#monthDays_radio':  function() { clearOptions('theWeekDays') },                                            // Days -> month days (radio)
            '#theMonthDays':     function() { selectRadio('monthDays_radio'); clearOptions('theWeekDays') },            // Days -> month days (input)
			'#startDate':     	 function() { setFocus('startOn') } 
        }

        $(Schedule.PAGE_JOB_SETUP).observe('change', function(e) {
            var elem = e.element();

            for (var pattern in inputsChangeActions) {
                if (elem.match(pattern)) {
                    inputsChangeActions[pattern]();
                    return;
                }
            }
        });


        $(Schedule.PAGE_JOB_SETUP).observe('click', function(e) {
            var elem = e.element();

            // observe inputs click
            for (pattern in inputsClickActions) {
                if (elem.match(pattern)) {
                    inputsClickActions[pattern]();
                    return;
                }
            }

            // observe navigation buttons
            var link = matchAny(e.element(), ['a','button','li'], true);
            if (link) {
                for (var pattern in Schedule.buttonActions) {
                    if (link.match(pattern)) {
                        e.stop();
                        if (pattern==="button#next") {
                            updateMaxOccurrences();
                        }
                        Schedule.submitForm($(Schedule.STEP_DISPLAY_FORM), Schedule.buttonActions[pattern]);
                        return;
                    }
                }
            }
        });

    },

    selectedTimezoneOffset: function () {
        var tzSelect = $('timeZone');
        return Schedule.timezoneOffsets[tzSelect.options[tzSelect.selectedIndex].value];
    }

}

document.observe('dom:loaded', ScheduleSetup.initialize.bind(ScheduleSetup));

