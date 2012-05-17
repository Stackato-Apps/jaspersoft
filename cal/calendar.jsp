<%--
  ~ Copyright (C) 2005 - 2011 Jaspersoft Corporation. All rights reserved.
  ~ http://www.jaspersoft.com.
  ~
  ~ Unless you have purchased  a commercial license agreement from Jaspersoft,
  ~ the following license terms  apply:
  ~
  ~ This program is free software: you can redistribute it and/or  modify
  ~ it under the terms of the GNU Affero General Public License  as
  ~ published by the Free Software Foundation, either version 3 of  the
  ~ License, or (at your option) any later version.
  ~
  ~ This program is distributed in the hope that it will be useful,
  ~ but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  ~ GNU Affero  General Public License for more details.
  ~
  ~ You should have received a copy of the GNU Affero General Public  License
  ~ along with this program. If not, see <http://www.gnu.org/licenses/>.
  --%>

<%@ taglib uri="/spring" prefix="spring"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/cal.calendar.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/cal.calendarSetup.js"></script>

<script id="calendar" type="text/javascript" >
// full day names
Calendar._DN = new Array
('<spring:message code="CAL_sunday" javaScriptEscape="true"/>',
 '<spring:message code="CAL_monday" javaScriptEscape="true"/>',
 '<spring:message code="CAL_tuesday" javaScriptEscape="true"/>',
 '<spring:message code="CAL_wednesday" javaScriptEscape="true"/>',
 '<spring:message code="CAL_thursday" javaScriptEscape="true"/>',
 '<spring:message code="CAL_friday" javaScriptEscape="true"/>',
 '<spring:message code="CAL_saturday" javaScriptEscape="true"/>',
 '<spring:message code="CAL_sunday" javaScriptEscape="true"/>');

// short day names
Calendar._SDN = new Array
('<spring:message code="CAL_sunday_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_monday_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_tuesday_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_wednesday_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_thursday_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_friday_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_saturday_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_sunday_short" javaScriptEscape="true"/>');

// First day of the week. "0" means display Sunday first, "1" means display
// Monday first, etc.
Calendar._FD =  '<spring:message code="CAL_first_day"/>';

// full month names
Calendar._MN = new Array
('<spring:message code="CAL_january" javaScriptEscape="true"/>',
 '<spring:message code="CAL_february" javaScriptEscape="true"/>',
 '<spring:message code="CAL_march" javaScriptEscape="true"/>',
 '<spring:message code="CAL_april" javaScriptEscape="true"/>',
 '<spring:message code="CAL_may" javaScriptEscape="true"/>',
 '<spring:message code="CAL_june" javaScriptEscape="true"/>',
 '<spring:message code="CAL_july" javaScriptEscape="true"/>',
 '<spring:message code="CAL_august" javaScriptEscape="true"/>',
 '<spring:message code="CAL_september" javaScriptEscape="true"/>',
 '<spring:message code="CAL_october" javaScriptEscape="true"/>',
 '<spring:message code="CAL_november" javaScriptEscape="true"/>',
 '<spring:message code="CAL_december" javaScriptEscape="true"/>');

// short month names
Calendar._SMN = new Array
('<spring:message code="CAL_january_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_february_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_march_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_april_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_may_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_june_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_july_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_august_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_september_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_october_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_november_short" javaScriptEscape="true"/>',
 '<spring:message code="CAL_december_short" javaScriptEscape="true"/>');

// tooltips
Calendar._TT = {};
Calendar._TT["INFO"] =  '<spring:message code="CAL_tooltip_info" javaScriptEscape="true"/>';

Calendar._TT["ABOUT"] = '<spring:message code="CAL_about_name" javaScriptEscape="true"/>' +
"\n(c) dynarch.com 2002-2005 / Author: Mihai Bazon\n" +
'<spring:message code="CAL_about_link" javaScriptEscape="true"/>' + "\n" +
'<spring:message code="CAL_about_license" javaScriptEscape="true"/>' + "\n\n" +
'<spring:message code="CAL_about_date" javaScriptEscape="true"/>' + "\n\t" +
'<spring:message code="CAL_about_year" javaScriptEscape="true"/>' + "\xab, \xbb \n\t" +
'<spring:message code="CAL_about_month" javaScriptEscape="true"/>' +
String.fromCharCode(0x2039) + ", " +
String.fromCharCode(0x203a) + "\n\t" +
'<spring:message code="CAL_about_mouse" javaScriptEscape="true"/>';

Calendar._TT["ABOUT_TIME"] = "\n\n" +
'<spring:message code="CAL_about_time" javaScriptEscape="true"/>' + "\n\t" +
'<spring:message code="CAL_about_time_increase" javaScriptEscape="true"/>' + "\n\t" +
'<spring:message code="CAL_about_time_decrease" javaScriptEscape="true"/>' + "\n\t" +
'<spring:message code="CAL_about_time_select_faster" javaScriptEscape="true"/>';

Calendar._TT["PREV_YEAR"] = '<spring:message code="CAL_prev_year" javaScriptEscape="true"/>' ;
Calendar._TT["PREV_MONTH"] = '<spring:message code="CAL_prev_month" javaScriptEscape="true"/>' ;
Calendar._TT["GO_TODAY"] = '<spring:message code="CAL_go_today" javaScriptEscape="true"/>';
Calendar._TT["NEXT_MONTH"] = '<spring:message code="CAL_next_month" javaScriptEscape="true"/>' ;
Calendar._TT["NEXT_YEAR"] = '<spring:message code="CAL_next_year" javaScriptEscape="true"/>' ;
Calendar._TT["SEL_DATE"] = '<spring:message code="CAL_select_date" javaScriptEscape="true"/>' ;
Calendar._TT["DRAG_TO_MOVE"] = '<spring:message code="CAL_drag_to_move" javaScriptEscape="true"/>' ;
Calendar._TT["PART_TODAY"] = " (" + '<spring:message code="CAL_today" javaScriptEscape="true"/>' + ")" ;

// the following is to inform that "%s" is to be the first day of week
// %s will be replaced with the day name.
Calendar._TT["DAY_FIRST"] = '<spring:message code="CAL_day_first" javaScriptEscape="true"/>' ;

// This may be locale-dependent.  It specifies the week-end days, as an array
// of comma-separated numbers.  The numbers are from 0 to 6: 0 means Sunday, 1
// means Monday, etc.
Calendar._TT["WEEKEND"] = '<spring:message code="CAL_weekend" javaScriptEscape="true"/>';

Calendar._TT["CLOSE"] = '<spring:message code="CAL_close" javaScriptEscape="true"/>';
Calendar._TT["TODAY"] = '<spring:message code="CAL_today" javaScriptEscape="true"/>' ;
Calendar._TT["TIME_PART"] = '<spring:message code="CAL_time_part" javaScriptEscape="true"/>' ;

// date formats
Calendar._TT["DEF_DATE_FORMAT"] = '<spring:message code="CAL_def_date_format" javaScriptEscape="true"/>';
Calendar._TT["TT_DATE_FORMAT"] = '<spring:message code="CAL_tt_date_format" javaScriptEscape="true"/>';

Calendar._TT["WK"] = '<spring:message code="CAL_week" javaScriptEscape="true"/>' ;
Calendar._TT["TIME"] = '<spring:message code="CAL_time" javaScriptEscape="true"/>' ;

</script>
