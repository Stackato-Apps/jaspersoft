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

<%--
Overview:
    shows information about JasperServer

Usage:
    <t:insertTemplate template="/WEB-INF/jsp/templates/aboutBox.jsp">
        <t:putAttribute name="containerClass">[OPTIONAL]</t:putAttribute>
        <t:putAttribute name="bodyContent">[REQUIRED]</t:putAttribute>
    </t:insertTemplate>

--%>

<%@ taglib prefix="spring" uri="/spring"%>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>


<!--/WEB-INF/jsp/templates/inputControls.jsp revision A-->
<t:useAttribute name="containerClass" id="containerClass" classname="java.lang.String" ignore="true"/>
<t:useAttribute name="bodyContent" id="bodyContent" classname="java.lang.String" ignore="false"/>
<t:useAttribute name="hasReportOptions" id="hasReportOptions" classname="java.lang.String" ignore="true"/>

<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
    <t:putAttribute name="containerClass">panel dialog overlay inputControls centered_horz centered_vert moveable sizeable <c:if test="${not empty requestScope.reportOptionsList}">showingSubHeader</c:if> ${containerClass}</t:putAttribute>
    <t:putAttribute name="containerElements"><div class="sizer diagonal"></div></t:putAttribute>
    <t:putAttribute name="headerClass" value="mover"/>
    <t:putAttribute name="containerID" value="inputControls"/>
    <t:putAttribute name="sizeable" value="${true}"/>
    <t:putAttribute name="containerTitle"><spring:message code="resource.report.inputControls"/></t:putAttribute>
    <c:if test="${isPro}">
	    <t:putAttribute name="headerContent">
			<div class="sub header ${not empty requestScope.reportOptionsList ? '' : 'hidden'}">
				<label id="savedValuesSelectorOnPupup" class="control select inline" for="savedValues" title="Select saved values">
					<span class="wrap"><spring:message code="report.options.select.label"/></span>
                    <select id="savedValues"  name="reportOptionsURI">
                        <option selected="selected" value=""><spring:message code="report.options.select.empty.label"/></option>
                        <c:forEach items="${requestScope.reportOptionsList}" var="option">
                        <option value="${option.URIString}"
                            <c:if test="${option.URIString == requestScope.reportOptionsURI}">selected="selected"</c:if>>
                            <c:out value="${option.label}"/>
                        </option>
                        </c:forEach>
                    </select>
				</label>
			</div>
		</t:putAttribute>
	</c:if>
    <t:putAttribute name="bodyContent" cascade="true">

        <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
            <t:putAttribute name="containerClass" value="groupBox"/>
            <t:putAttribute name="containerID" value="groupBox"/>
            <t:putAttribute name="bodyContent">${bodyContent}</t:putAttribute>
        </t:insertTemplate>
    </t:putAttribute>
    <t:putAttribute name="footerContent">
	         <button id="apply" class="button action primary up"><span class="wrap"><spring:message code="button.apply" javaScriptEscape="true"/><span class="icon"></span></span></button>
	         <button id="ok" class="button action up"><span class="wrap"><spring:message code="button.ok" javaScriptEscape="true"/><span class="icon"></span></button>
	         <button id="reset" class="button action up"><span class="wrap"><spring:message code="button.reset" javaScriptEscape="true"/><span class="icon"></span></button>
             <button id="cancel" class="button action up"><span class="wrap"><spring:message code="button.cancel" javaScriptEscape="true"/><span class="icon"></span></span></button>
            <c:if test="${isPro}">
                <button id="save" class="button action up"><span class="wrap"><spring:message code="button.save" javaScriptEscape="true"/><span class="icon"></span></span></button>
            </c:if>
	    </t:putAttribute>
</t:insertTemplate>
