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
    Usage: allows user to edit and validate the complex expression of dynamic filters

Usage:

    <t:insertTemplate template="/WEB-INF/jsp/templates/complexExpression.jsp">
    </t:insertTemplate>
    
--%>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>

<t:useAttribute id="containerClass" name="containerClass" classname="java.lang.String" ignore="true"/>
<t:useAttribute id="availableFilters" name="availableFilters" classname="java.lang.String" ignore="true"/>

<!--/WEB-INF/jsp/templates/complexExpression.jsp revision A-->
<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
    <t:putAttribute name="containerClass">panel dialog overlay editComplexExpression moveable sizeable centered_horz centered_vert ${containerClass}</t:putAttribute>
    <t:putAttribute name="containerElements"><div class="sizer diagonal"></div></t:putAttribute>
    <t:putAttribute name="containerID" value="editComplexExpressionDialog" />
    <t:putAttribute name="containerTitle"><spring:message code="ADH_1226_DYNAMIC_FILTER_ADVANCED_EDIT" javaScriptEscape="true"/></t:putAttribute>
    <%--<t:putAttribute name="containerElements"><div class="sizer diagonal"></div></t:putAttribute>--%>
    <t:putAttribute name="headerClass" value="mover"/>
    <t:putAttribute name="bodyContent">

            <label class="control input text" for="complexExpressionInput" title="<spring:message code="ADH_1227_DYNAMIC_FILTER_ADVANCED_EDIT_LABEL"/>">
                <span class="wrap"><spring:message code="ADH_1227_DYNAMIC_FILTER_ADVANCED_EDIT_LABEL"/></span>
                    <input class="" id="complexExpressionInput" type="text" value=""/>
            </label>

            <button id="validate" class="button action up"><span class="wrap"><spring:message code="ADH_1228_DYNAMIC_FILTER_ADVANCED_VALIDATE"/></span></button>
            <span class="wrap success"></span><span class="wrap warning"></span>
        
            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                <t:putAttribute name="containerClass" value="control groupBox fillParent"/>
                    <t:putAttribute name="bodyContent">${availableFilters}</t:putAttribute>
            </t:insertTemplate>

    </t:putAttribute>
    <t:putAttribute name="footerContent">
        <button id="submit" class="button action primary up" tabindex="3"><span class="wrap"><spring:message code="button.submit" javaScriptEscape="true"/></span></button>
        <button id="cancel" class="button action up" tabindex="4"><span class="wrap"><spring:message code="button.cancel" javaScriptEscape="true"/></span></button>
    </t:putAttribute>
</t:insertTemplate>
