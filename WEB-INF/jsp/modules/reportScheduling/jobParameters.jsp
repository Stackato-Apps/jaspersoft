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
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<c:set var="hasErrors" value="false"/>
<c:set var="wrappersUUIDkey" value="${wrappersUUID}"/>
<c:forEach items="${sessionScope.wrappers[wrappersUUIDkey]}" var="wrapper">
	<c:if test="${not empty wrapper.errorMessage}">
		<c:set var="hasErrors" value="true"/>
	</c:if>
</c:forEach>


<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle"><spring:message code="report.scheduling.job.edit.parameters.title"/></t:putAttribute>
    <t:putAttribute name="bodyID" value="scheduler_jobParameters"/>
    <t:putAttribute name="bodyClass" value="oneColumn flow wizard"/>
    
    <t:putAttribute name="bodyContent" >
    <form id="pageForm" action="">
        <input type="hidden" id="_inputValuesErrors" value="${hasErrors}"/>
        <c:remove var="hasErrors"/>
        <input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}"/>
        <input type="hidden" name="_eventId" value=""/>
		<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
			<t:putAttribute name="containerClass" value="column decorated primary"/>
		    <t:putAttribute name="containerTitle"><spring:message code="report.scheduling.scheduler"/></t:putAttribute>
		
            <t:putAttribute name="headerContent">
                <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/report.schedule.js"></script>
                <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/report.schedule.params.js"></script>
                <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/controls.base.js"></script>

                <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/dwr/interface/RemoteCascadeDirector.js"></script>
                <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/dwr/engine.js"></script>
                <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/dwr/util.js"></script>
                <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/cascade.cascade.js"></script>
                <%@ include file="jobCommonState.jsp" %>
                <%@ include file="jobParametersState.jsp" %>
            </t:putAttribute>

            <t:putAttribute name="swipeScroll" value="${isIPad}"/>

		    <t:putAttribute name="bodyContent">
                <div id="flowControls">
                    <ul class="list stepIndicator">
                        <li class="leaf first ${isRunNowMode ? 'disabled' : ''}"><p class="wrap"><b class="icon"></b><spring:message code="report.scheduling.job.edit.button"/></p></li>
                        <li class="leaf selected"><p class="wrap"><b class="icon"></b><spring:message code="report.scheduling.job.edit.parameters.button"/></p></li>
                        <li class="leaf last"><p class="wrap"><b class="icon"></b><spring:message code="report.scheduling.job.edit.output.button"/></p></li>
                    </ul>
                </div>

				<div id="stepDisplay">
					<fieldset class="row instructions">
						<legend class="offLeft"><span>Instructions</span></legend>
						<h2 class="textAccent02"><spring:message code="report.scheduling.job.edit.parameters.header"/></h2>
						<h4><spring:message code="report.scheduling.job.edit.parameters.header.instructions"/></h4>
					</fieldset>
				
					<fieldset class="row inputs oneColumn">
						<legend class="title"><spring:message code="report.scheduling.job.edit.label.report"/> <span class="path">${job.source.reportUnitURI}</span></legend>
							
							<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
								<t:putAttribute name="containerClass" value="column primary showingSubHeader"/>
								<t:putAttribute name="headerContent">
                                    <c:if test="${isPro}">
                                        <div class="sub header">
                                            <label id="savedValuesSelector" class="control select inline ${not empty requestScope.reportOptionsList ? '' : 'hidden'}" for="savedValues" >
                                                <span class="wrap"><spring:message code="report.options.select.label"/></span>
                                                <c:set var="selectedOptions" value="${empty requestScope.reportOptionsURI ? requestScope.selectedReportOptionsURI : requestScope.reportOptionsURI}"/>
                                                <select id="savedValues" name="reportOptionsURI" title="<spring:message code='SCHEDULER_SELECT_SAVED_VALUES_TITLE' javaScriptEscape="true"/> " ${readOnlyJobInputs ? 'disabled':''}>
                                                    <option selected="selected" value=""><spring:message code="report.options.select.empty.label"/></option>
                                                    <c:forEach items="${requestScope.reportOptionsList}" var="option">
                                                        <option value="${option.URIString}"
                                                            <c:if test="${option.URIString == selectedOptions}">selected="selected"</c:if>>
                                                            <c:out value="${option.label}"/>
                                                        </option>
                                                    </c:forEach>
                                                </select>
                                            </label>
                                            <button id="save" class="button options up" ${readOnlyJobInputs ? 'disabled="disabled"':''}><span class="wrap"><spring:message code="report.options.button.save.values"/></span><span class="icon"></span></button>
                                        </div>
                                    </c:if>
                                </t:putAttribute>
                                
							    <t:putAttribute name="bodyContent">

				                    <ul class="list inputControls">
                                        <js:parametersForm reportName="${reportUnitURI}"/>
								   	</ul>
								
								</t:putAttribute>
							</t:insertTemplate>
					</fieldset>
					</div>
				<t:putAttribute name="footerContent">
					<fieldset id="wizardNav" >
						<button id="previous" class="button action up"><span class="wrap"><spring:message code='button.previous'/></span><span class="icon"></span></button>
						<button id="next" class="button action up"><span class="wrap"><spring:message code='button.next'/></span><span class="icon"></span></button>
						<button id="done" class="button primary action up"><span class="wrap"><spring:message code='button.submit'/></span><span class="icon"></span></button>
						<button id="cancel" class="button action up"><span class="wrap"><spring:message code='button.cancel'/></span><span class="icon"></span></button>						
				    </fieldset>
				</t:putAttribute>

			</t:putAttribute>	    
		</t:insertTemplate>
		
    </form>

        <!-- ========== SAVE REPORT OPTIONS DIALOG =========== -->
        <c:if test="${isPro}">
            <t:insertTemplate template="/WEB-INF/jsp/templates/saveValues.jsp">
                <t:putAttribute name="containerClass" value="hidden"/>
            </t:insertTemplate>
        </c:if>
        
    </t:putAttribute>

</t:insertTemplate>