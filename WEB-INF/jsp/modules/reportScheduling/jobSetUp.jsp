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

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<%@ page import="java.util.Set,java.util.List,java.util.TimeZone,
		com.jaspersoft.jasperserver.war.dto.ByteEnum,
		com.jaspersoft.jasperserver.war.dto.StringOption"%>

<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle"><spring:message code="report.scheduling.job.edit.title"/></t:putAttribute>
    <t:putAttribute name="bodyID" value="scheduler_jobSetUp"/>
    <t:putAttribute name="bodyClass" value="oneColumn flow wizard firstStep"/>
    
    <t:putAttribute name="bodyContent" >
    <form id="pageForm" action="">
        <input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}"/>
        <input type="hidden" name="_eventId" value=""/>
		<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
			<t:putAttribute name="containerClass" value="column decorated primary"/>
		    <t:putAttribute name="containerTitle"><spring:message code="report.scheduling.scheduler"/></t:putAttribute>

            <t:putAttribute name="headerContent">
                <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/report.schedule.js"></script>
                <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/report.schedule.setup.js"></script>
                <%@ include file="jobCommonState.jsp" %>
                <%@ include file="jobSetUpState.jsp" %>
            </t:putAttribute>

            <t:putAttribute name="swipeScroll" value="${isIPad}"/>

		    <t:putAttribute name="bodyContent">
			<div id="flowControls">
				
                <ul class="list stepIndicator">
                    <li class="leaf selected" ${isRunNowMode ? 'disabled' : ''}><p class="wrap"><b class="icon"></b><spring:message code="report.scheduling.job.edit.button"/></p></li>
                    <li class="leaf ${hasReportParameters ? '' : 'disabled'}"><p class="wrap"><b class="icon"></b><spring:message code="report.scheduling.job.edit.parameters.button"/></p></li>
                    <li class="leaf"><p class="wrap"><b class="icon"></b><spring:message code="report.scheduling.job.edit.output.button"/></p></li>
                </ul>

			</div>						
				<div id="stepDisplay">
					<fieldset class="row instructions">
						<legend class="offLeft"><span>Instructions</span></legend>
						<h2 class="textAccent02"><spring:message code="report.scheduling.job.edit.header"/></h2>
						<h4><spring:message code="report.scheduling.job.edit.header.instuctions"/></h4>
					</fieldset>
				
					<fieldset class="row inputs oneColumn">
						<legend class="title"><spring:message code="report.scheduling.job.edit.label.report"/> <span class="path">${job.source.reportUnitURI}</span></legend>
						
							<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
							    <t:putAttribute name="containerClass" value="column primary"/>
							    <t:putAttribute name="footerClass" value="hidden"/>
							    <t:putAttribute name="bodyContent">
                                    <spring:bind path="job.trigger">
                                        <c:if test="${status.error}">
                                            <fieldset class="group error">
                                                <c:forEach items="${status.errorMessages}" var="error">
                                                    <span class="message warning"><c:out value="${error}"/></span>
                                                </c:forEach>
                                            </fieldset>
                                        </c:if>
                                    </spring:bind>

                                    <fieldset class="group">
                                        <spring:bind path="job.label">
                                            <legend class="offLeft"><span>Name and Description</span></legend>
                                            <label class="control input text ${status.error ? "error" : ""}" for="jobName" title="<spring:message code="report.scheduling.job.edit.tooltip.name"/>">
                                                <span class="wrap"><spring:message code="report.scheduling.job.edit.label.label"/> (<spring:message code='required.field'/>):</span>
                                                <input class="" id="jobName" type="text" name="${status.expression}" value="${status.value}"/>
                                                <c:if test="${status.error}">
                                                   <c:forEach items="${status.errorMessages}" var="error">
                                                      <span class="message warning"><c:out value="${error}"/></span>
                                                   </c:forEach>
                                                </c:if>
                                            </label>
                                        </spring:bind>

                                        <spring:bind path="job.description">
                                            <label class="control textArea ${status.error ? "error" : ""}" for="description">
                                                <span class="wrap"><spring:message code="report.scheduling.job.edit.label.description"/></span>
                                                <textarea id="description" type="text" name="${status.expression}"><c:out value="${status.value}"/></textarea>
                                                <c:if test="${status.error}">
                                                  <c:forEach items="${status.errorMessages}" var="error">
                                                    <span class="message warning"><c:out value="${error}"/></span>
                                                  </c:forEach>
                                                </c:if>
                                            </label>
                                        </spring:bind>

                                    </fieldset>
                                    <fieldset class="group" id="jobCommon">
                                            <legend class=""><span><spring:message code="report.scheduling.job.edit.trigger.start.job"/></span></legend>
                                            <ul class="list inputSet">
                                                <li class="leaf">
                                                    <div class="control radio" title="<spring:message code="report.scheduling.job.edit.tooltip.immediately"/>">
                                                        <label class="wrap" for="startImmediately"><spring:message code="report.scheduling.job.edit.trigger.start.immediately"/></label>
                                                        <spring:bind path="job.trigger.startType">
                                                            <input id="startImmediately" type="radio" value="1" name="${status.expression}" ${status.value == 1 ? 'checked="checked"' : ''}/>
                                                        </spring:bind>
                                                    </div>
                                                </li>
                                                <li class="leaf">
                                                    <div id="startDateLabel" class="control radio" title="<spring:message code="report.scheduling.job.edit.tooltip.start"/>">
                                                        <label class="wrap" for="startDate" ><spring:message code="report.scheduling.job.edit.trigger.start.date.before"/> </label>
                                                        <spring:bind path="job.trigger.startType">
                                                            <input id="startDate" type="radio" value="2" name="${status.expression}" ${status.value == 2 ? 'checked="checked"' : ''}/>
                                                        </spring:bind>
                                                        <spring:bind path="job.trigger.startDate">
                                                            <span class="control picker inline ${status.error ? "error" : ""}" id="startOn" title="<spring:message code="report.scheduling.job.edit.trigger.recurrence.type.calendar"/>">

                                                                <js:calendarInput name="${status.expression}" value="${status.value}" imageTipMessage="report.scheduling.job.edit.trigger.date.picker"
                                                                        timezoneOffset="ScheduleSetup.selectedTimezoneOffset"/>
                                                                <c:forEach items="${status.errorMessages}" var="error">
                                                                  <span class="message warning"><c:out value="${error}"/></span>
                                                                </c:forEach>
                                                            </span>
                                                        </spring:bind>
                                                    </div>
                                                </li>
                                            </ul>

                                        <c:if test="${!(empty requestScope.timeZones)}">
                                            <spring:bind path="job.trigger.timezone">
                                                <label class="control select inline ${status.error ? "error" : ""}" for="timeZone" title="<spring:message code="report.scheduling.job.edit.tooltip.time.zone"/>">
                                                    <span class="wrap"><spring:message code="report.scheduling.job.edit.trigger.label.timezone"/></span>
                                                    <select id="timeZone" name="${status.expression}">
                                                        <c:forEach items="${requestScope.timeZones}" var="timeZone">
                                                            <option value="${timeZone.code}" <c:if test="${status.value == timeZone.code or (empty status.value and preferredTimezone == timeZone.code)}">selected</c:if>>
                                                                <spring:message code="timezone.option"
                                                                    arguments='<%= new String[]{((StringOption) pageContext.getAttribute("timeZone")).getCode(), ((StringOption) pageContext.getAttribute("timeZone")).getDescription()} %>'/>
                                                            </option>
                                                        </c:forEach>
                                                   </select>
                                                   <c:forEach items="${status.errorMessages}" var="error">
                                                     <span class="message warning"><c:out value="${error}"/></span>
                                                   </c:forEach>
                                                </label>
                                            </spring:bind>
                                        </c:if>
                                    </fieldset>

                                    <fieldset id="recurrenceInputs" class="group">
                                        <legend class="offLeft"><span><spring:message code="report.scheduling.job.edit.trigger.recurrence"/></span></legend>
                                        <ul id="recurrenceSelector" class="tabSet text control horizontal">
                                            <li class="label"><p class="wrap"><spring:message code="report.scheduling.job.edit.trigger.recurrence.header"/></p></li>
                                            <li id="none" class="tab first ${requestScope.triggerRecurrenceType == 1 ? "selected" : ""}"><p class="wrap button"><spring:message code="report.scheduling.job.edit.trigger.recurrence.type.none"/></p></li>
                                            <li id="simple" class="tab ${requestScope.triggerRecurrenceType == 2 ? "selected" : ""}"><p class="wrap button"><spring:message code="report.scheduling.job.edit.trigger.recurrence.type.simple"/></p></li>
                                            <li id="calendar" class="tab last ${requestScope.triggerRecurrenceType == 3 ? "selected" : ""}"><p class="wrap button"><spring:message code="report.scheduling.job.edit.trigger.recurrence.type.calendar"/></p></li>
                                        </ul>

            <!--==== No recurence ====-->
                                        <c:if test="${requestScope.triggerRecurrenceType == 1}">
                                            <spring:bind path="job.trigger.endDate">
                                              <input type="hidden" name="${status.expression}" id="${status.expression}" class="fnormal" value=""/>
                                            </spring:bind>
                                        </c:if>

            <!--==== Simple recurence ====-->
                                        <c:if test="${requestScope.triggerRecurrenceType == 2}">
                                            <fieldset id="simpleRecurrence">

                                                <spring:bind path="job.trigger.occurrenceCount">
                                                    <c:set var="occurrenceCountValue" value="${status.value}"/>
                                                    <c:set var="occurrenceCountError" value="${status.error}"/>
                                                    <input id="repeatOccurrenceCount" type="hidden" name="${status.expression}" value="${status.value}"/>
                                                </spring:bind>
                                                <spring:bind path="job.trigger.endDate">
                                                    <c:set var="endDateValue" value="${status.value}"/>
                                                </spring:bind>


                                                <div class="control inline">
                                                    <span class="wrap"><spring:message code="report.scheduling.job.edit.trigger.label.recurrence"/></span>
                                                    <spring:bind path="job.trigger.recurrenceInterval">
                                                        <input id="intervalIncrement" type="text" name="${status.expression}" value="${status.value}" class=""/>
                                                        <span class="control inline ${status.error ? "error" : ""}" >
                                                            <c:forEach items="${status.errorMessages}" var="error">
                                                              <span class="message warning"><c:out value="${error}"/></span>
                                                            </c:forEach>
                                                        </span>
                                                    </spring:bind>
                                                    <spring:bind path="job.trigger.recurrenceIntervalUnit">
                                                        <select id="interval" name="${status.expression}">
                                                            <c:forEach var="intervalUnit" items="${requestScope.intervalUnits}">
                                                                <option value="${intervalUnit.code}" <c:if test="${status.value == intervalUnit.code}">selected</c:if>><spring:message code="${intervalUnit.labelMessage}"/></option>
                                                            </c:forEach>
                                                        </select>
                                                        <span class="wrap">(required)</span>
                                                        <span class="control inline ${status.error ? "error" : ""}" >
                                                            <c:forEach items="${status.errorMessages}" var="error">
                                                              <span class="message warning"><c:out value="${error}"/></span>
                                                            </c:forEach>
                                                        </span>
                                                    </spring:bind>
                                                </div>

                                                <ul class="list inputSet">
                                                    <li class="leaf">
                                                        <div class="control radio"  title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.interval.indefinitely"/>">
                                                            <label class="wrap" for="indefiniteRepeat"><spring:message code="report.scheduling.job.edit.trigger.recurrence.indefinitely"/></label>
                                                            <input id="indefiniteRepeat" type="radio" name="_recurrenceType" value="2" <c:if test="${not occurrenceCountError and occurrenceCountValue == -1 and empty endDateValue}">checked="checked"</c:if>/>
                                                        </div>
                                                    </li>
                                                    <li class="leaf">
                                                        <spring:bind path="job.trigger.occurrenceCount">
                                                            <div class="control radio" title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.interval.number"/>">
                                                                <label class="wrap" for="fixedRepeat"><spring:message code="report.scheduling.job.edit.trigger.recurrence.times"/></label>
                                                                <input id="fixedRepeat" type="radio" name="_recurrenceType" value="4"  <c:if test="${status.error or status.value != -1}">checked="checked"</c:if> />
                                                                <span class="control inline ${status.error ? "error" : ""}" title="<spring:message code="report.scheduling.job.edit.trigger.recurrence.type.calendar"/>">
                                                                    <input class="" id="maxOccurrences" type="text" value="${(status.error or status.value != -1) ? status.value : ""}" />
                                                                    <c:forEach items="${status.errorMessages}" var="error">
                                                                      <span class="message warning"><c:out value="${error}"/></span>
                                                                    </c:forEach>
                                                                </span>
                                                            </div>
                                                        </spring:bind>
                                                    </li>
                                                    <li class="leaf">
                                                        <spring:bind path="job.trigger.endDate">
                                                            <div id="calendarRepeatSet" class="control radio"  title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.start.date"/>">
                                                                <label class="wrap" for="calendarRepeat"><spring:message code="report.scheduling.job.edit.simple.trigger.end.date.before"/></label>
                                                                <input id="calendarRepeat" type="radio" name="_recurrenceType" value="3" <c:if test="${not empty status.value}">checked="checked"</c:if>/>
                                                                <span class="control picker inline ${status.error ? "error" : ""}" id="repeatEndDate" title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.calendar"/>">
                                                                    <js:calendarInput name="${status.expression}" value="${status.value}" imageTipMessage="report.scheduling.job.edit.trigger.date.picker"
                                                                        timezoneOffset="ScheduleSetup.selectedTimezoneOffset"/>
                                                                    <c:forEach items="${status.errorMessages}" var="error">
                                                                      <span class="message warning"><c:out value="${error}"/></span>
                                                                    </c:forEach>
                                                                </span>
                                                            </div>
                                                        </spring:bind>
                                                    </li>
                                                </ul>
                                            </fieldset>
                                        </c:if>


                <!--==== Calendar recurence ====-->
                                        <c:if test="${requestScope.triggerRecurrenceType == 3}">
                                            <fieldset id="calendarRecurrence">
                                                <ul class="list inputSet">
                                                    <li id="months" class="node"><span class="wrap label"><spring:message code="report.scheduling.job.edit.trigger.label.months"/></span>
                                                        <spring:bind path="job.trigger.months">
                                                            <c:set var="monthTypeValue" value='<%= status.getValue() != null && ((Set) status.getValue()).size() == ((List) request.getAttribute("allMonths")).size()  %>'/>
                                                        </spring:bind>
                                                        <ul class="list">
                                                            <li class="leaf">
                                                                <div class="control radio" title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.every.month"/>">
                                                                    <label class="wrap" for="everyMonth_radio"><spring:message code="report.scheduling.job.edit.trigger.label.months.all"/></label>
                                                                    <input id="everyMonth_radio" type="radio" name="monthly" ${monthTypeValue ? "checked" : "" } />
                                                                </div>
                                                            </li>
                                                            <li class="leaf">
                                                                <div id="selectedMonths" class="control radio" title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.particular.month"/>">
                                                                    <label class="wrap" for="selectedMonths_radio"><spring:message code="report.scheduling.job.edit.trigger.label.months.selected"/></label>
                                                                    <input id="selectedMonths_radio" type="radio" name="monthly" ${monthTypeValue ? "" : "checked" }/>
                                                                    <spring:bind path="job.trigger.months">
                                                                        <input type="hidden" name="_${status.expression}" value=""/>
                                                                        <span class="control select multiple ${status.error ? "error" : ""}" for="theMonths" title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.ctrl.for.multiple"/>">
                                                                            <select id="theMonths" name="${status.expression}" multiple="multiple">
                                                                                <c:forEach var="month" items="${requestScope.allMonths}" varStatus="it">
                                                                                    <option value="${month.code}" <%= status.getValue() != null && ((Set) status.getValue()).contains(new Byte(((ByteEnum) pageContext.getAttribute("month")).getCode())) ? "selected" : "" %>><spring:message code="${month.labelMessage}"/></option>
                                                                                </c:forEach>
                                                                            </select>
                                                                            <c:forEach items="${status.errorMessages}" var="error">
                                                                                <span class="message warning"><c:out value="${error}"/></span>
                                                                            </c:forEach>
                                                                        </span>
                                                                    </spring:bind>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>

                                                    <li id="days" class="node"><span class="wrap label"><spring:message code="report.scheduling.job.edit.trigger.label.days"/></span>
                                                        <ul class="list">
                                                            <li class="leaf">
                                                                <div class="control radio" title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.recur.daily"/>">
                                                                    <label class="wrap" for="everyDay_radio"><spring:message code="report.scheduling.job.edit.trigger.label.days.all"/></label>
                                                                    <spring:bind path="job.trigger.daysType">
                                                                        <input id="everyDay_radio" type="radio" name="${status.expression}" value="1" <c:if test="${status.value == 1}">checked="checked"</c:if>/>
                                                                    </spring:bind>
                                                                </div>
                                                            </li>
                                                            <li class="leaf">
                                                                <div id="weekDays" class="control radio" title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.particular.days.of.week"/>">
                                                                    <label class="wrap" for="weekDays_radio"><spring:message code="report.scheduling.job.edit.trigger.label.days.week"/></label>
                                                                    <spring:bind path="job.trigger.daysType">
                                                                        <c:set var="daysTypeValue" value="${status.value}"/>
                                                                        <input id="weekDays_radio" type="radio" name="${status.expression}" value="2" <c:if test="${status.value == 2}">checked="checked"</c:if>/>
                                                                    </spring:bind>
                                                                    <spring:bind path="job.trigger.weekDays">
                                                                        <%-- <input type="hidden" name="_${status.expression}" value=""/> --%>
                                                                        <span class="control select multiple  ${status.error ? "error" : ""}" for="theWeekDays" title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.ctrl.for.multiple"/>">
                                                                            <select id="theWeekDays" name="${status.expression}" multiple="multiple">
                                                                                <c:forEach var="day" items="${requestScope.allWeekDays}" varStatus="it">
                                                                                    <option value="${day.code}" <%= status.getValue() != null && ((Set) status.getValue()).contains(new Byte(((ByteEnum) pageContext.getAttribute("day")).getCode())) ? "selected" : "" %>><spring:message code="${day.labelMessage}"/></option>
                                                                                </c:forEach>
                                                                             </select>
                                                                            <c:forEach items="${status.errorMessages}" var="error">
                                                                              <span class="message warning"><c:out value="${error}"/></span>
                                                                            </c:forEach>
                                                                        </span>
                                                                    </spring:bind>
                                                                </div>
                                                            </li>
                                                            <li class="leaf">
                                                                <div id="monthDays" class="control radio"  title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.particular.days.of.month"/>">
                                                                    <label class="wrap" for="monthDays_radio"><spring:message code="report.scheduling.job.edit.trigger.label.days.month"/></label>
                                                                    <spring:bind path="job.trigger.daysType">
                                                                        <input id="monthDays_radio" type="radio" name="${status.expression}" value="3" <c:if test="${status.value == 3}">checked="checked"</c:if>/>
                                                                    </spring:bind>
                                                                    <spring:bind path="job.trigger.monthDays">
                                                                        <div class="control input text ${status.error ? "error" : ""}">
                                                                            <input class="" id="theMonthDays" type="text" name="${status.expression}" value="${status.value}" />
                                                                            <c:forEach items="${status.errorMessages}" var="error">
                                                                              <span class="message warning"><c:out value="${error}"/></span>
                                                                            </c:forEach>
                                                                        </div>
                                                                    </spring:bind>
                                                                </div>
                                                            </li>
                                                            <spring:bind path="job.trigger.daysType">
                                                                <c:if test="${status.error}">
                                                                    <li class="leaf error">
                                                                        <c:forEach items="${status.errorMessages}" var="error">
                                                                          <span class="message warning"><c:out value="${error}"/></span>
                                                                        </c:forEach>
                                                                    </li>
                                                                </c:if>
                                                            </spring:bind>
                                                        </ul>
                                                    </li>
                                                    <li id="repeatTimes" class="node"><span class="wrap label"><spring:message code="report.scheduling.job.edit.trigger.label.times"/></span>
                                                        <ul class="list">
                                                            <li class="leaf">
                                                                <spring:bind path="job.trigger.hours">
                                                                    <label class="control inline ${status.error ? "error" : ""}">
                                                                        <input class="inline" type="text" name="${status.expression}" value="${status.value}"/>
                                                                        <span class="wrap"><spring:message code="report.scheduling.job.edit.trigger.label.hours"/></span>
                                                                        <c:forEach items="${status.errorMessages}" var="error">
                                                                            <span class="message warning"><c:out value="${error}"/></span>
                                                                        </c:forEach>
                                                                        <p class="message hint"><spring:message code="report.scheduling.job.edit.trigger.label.hours.hint"/></p>
                                                                    </label>
                                                                </spring:bind>
                                                            </li>
                                                            <li class="leaf">
                                                                <spring:bind path="job.trigger.minutes">
                                                                    <label class="control inline ${status.error ? "error" : ""}">
                                                                        <input class="inline" type="text" name="${status.expression}" value="${status.value}"/>
                                                                        <span class="wrap"><spring:message code="report.scheduling.job.edit.trigger.label.minutes"/></span>
                                                                        <c:forEach items="${status.errorMessages}" var="error">
                                                                            <span class="message warning"><c:out value="${error}"/></span>
                                                                        </c:forEach>
                                                                        <p class="message hint"><spring:message code="report.scheduling.job.edit.trigger.label.minutes.hint"/></p>
                                                                    </label>
                                                                </spring:bind>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                                <spring:bind path="job.trigger.endDate">
                                                    <label class="control picker ${status.error ? "error" : ""}" for="${status.expression}" title="<spring:message code="report.scheduling.job.edit.trigger.tooltip.calendar"/>">
                                                        <span class="wrap"><spring:message code="report.scheduling.job.edit.trigger.label.end"/></span>
                                                        <js:calendarInput name="${status.expression}" value="${status.value}" imageTipMessage="report.scheduling.job.edit.trigger.date.picker"
                                                            timezoneOffset="ScheduleSetup.selectedTimezoneOffset"/>
                                                        <c:forEach items="${status.errorMessages}" var="error">
                                                            <span class="message warning"><c:out value="${error}"/></span>
                                                        </c:forEach>
                                                    </label>
                                                </spring:bind>
                                            </fieldset>
                                        </c:if>

                                     </fieldset>
                                </t:putAttribute>

							    </t:insertTemplate>												
					</fieldset><!--/.row.inputs-->
					</div>
				<t:putAttribute name="footerContent">
					<fieldset id="wizardNav">
						<button id="previous" type="submit" class="button action up" disabled="disabled"><span class="wrap"><spring:message code='button.previous'/></span><span class="icon"></span></button>
						<button id="next" type="submit" class="button action up"><span class="wrap"><spring:message code='button.next'/></span><span class="icon"></span></button>
						<button id="done" type="submit" class="button primary action up"><span class="wrap"><spring:message code='button.submit'/></span><span class="icon"></span></button>
						<button id="cancel" type="submit" class="button action up"><span class="wrap"><spring:message code='button.cancel'/></span><span class="icon"></span></button>
				    </fieldset>
				</t:putAttribute>

			</t:putAttribute>	    
		</t:insertTemplate>
		
    </form>
    </t:putAttribute>

</t:insertTemplate>