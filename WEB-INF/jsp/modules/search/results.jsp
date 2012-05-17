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
<%@ page contentType="text/html" %>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/spring" prefix="spring"%>
<%@ taglib uri="/WEB-INF/jasperserver.tld" prefix="js" %>

<%@ page import="com.jaspersoft.jasperserver.search.model.SearchActionModelSupport" %>

<%@ include file="../common/jsEdition.jsp" %>      

<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle">
        <c:choose>
            <c:when test="${mode == 'search'}"><spring:message code="SEARCH_SEARCH_REPOSITORY" javaScriptEscape="true"/></c:when>
            <c:otherwise><spring:message code="SEARCH_BROWSE_REPOSITORY" javaScriptEscape="true"/></c:otherwise>
        </c:choose>
    </t:putAttribute>
    <t:putAttribute name="bodyID" value="${mode == 'search' ? 'repoSearch' : 'repoBrowse'}"/>
    <t:putAttribute name="bodyClass" value="twoColumn"/>
    <t:putAttribute name="headerContent" >
        <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/core.accessibility.js"></script>
        <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/tools.infiniteScroll.js"></script>
        <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/mng.common.js"></script>
        <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/repository.search.main.js"></script>
        <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/repository.search.components.js"></script>
        <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/repository.search.actions.js"></script>
        <c:if test="${isProVersion}">
              <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/repository.search.pro.js"></script>
        </c:if>

        <script type="text/javascript" id="searchActionModel">
            <%--get action model data for search menus--%>
            //if you don't use quotes firebug complains saying variable has bad label name. So we put quotes around it. However,
            //we need to eval() it twice since we want to extract the JSON object from the stringed version.
            '<%= SearchActionModelSupport.getInstance((String) request.getAttribute("mode")).getClientActionModelDocument(request) %>'
        </script>
    </t:putAttribute>
    <t:putAttribute name="bodyContent">
        <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
            <t:putAttribute name="containerID" value="results"/>
            <t:putAttribute name="containerClass" value="column decorated primary"/>
            <t:putAttribute name="containerTitle">
                <c:choose>
                    <c:when test="${mode == 'search'}"><spring:message code="SEARCH_SEARCH" javaScriptEscape="true"/></c:when>
                    <c:otherwise><spring:message code="SEARCH_TITLE" javaScriptEscape="true"/></c:otherwise>
                </c:choose>
            </t:putAttribute>
            <t:putAttribute name="headerContent">
                    <t:insertTemplate template="/WEB-INF/jsp/templates/control_searchLockup.jsp">
				        <t:putAttribute name="containerID" value="secondarySearchBox"/>
                        <t:putAttribute name="containerAttr">
                            <c:if test="${mode == 'search'}">data-tab-index="3" data-component-type="search"</c:if>
                        </t:putAttribute>
				        <t:putAttribute name="inputID" value="secondarySearchInput"/>
				    </t:insertTemplate>

                <!--
<form id="secondarySearchBox" class="searchLockup">
                    <label for="secondarySearchInput" class="offLeft"><spring:message code="button.search" javaScriptEscape="true"/></label>
                    <input class="" id="secondarySearchInput"/>
                    <b class="right"><button class="button searchClear"></button></b>
                    <button class="button search up"></button>
                </form>
-->

                <ul id="sortMode" class=""></ul>

                <div class="toolbar">
                    <ul class="list buttonSet">
                        <li class="leaf"><button id="run" class="button capsule up first"><span class="wrap"><spring:message code="RM_BUTTON_RUN" javaScriptEscape="true"/></span><span class="icon"></span></button></li>
                        <li class="leaf"><button id="edit" class="button capsule up middle"><span class="wrap"><spring:message code="RM_BUTTON_WIZARD" javaScriptEscape="true"/></span><span class="icon"></span></button></li>
                        <li class="leaf"><button id="open" class="button capsule up last"><span class="wrap"><spring:message code="RM_BUTTON_OPEN" javaScriptEscape="true"/></span><span class="icon"></span></button></li>
                        <li class="leaf separator"></li>
                        <li class="leaf"><button id="copy" class="button capsule up first"><span class="wrap"><spring:message code="RM_BUTTON_COPY_RESOURCE" javaScriptEscape="true"/></span><span class="icon"></span></button></li>
                        <li class="leaf"><button id="cut" class="button capsule up middle"><span class="wrap"><spring:message code="RM_BUTTON_MOVE_RESOURCE" javaScriptEscape="true"/></span><span class="icon"></span></button></li>
                        <li class="leaf"><button id="paste" class="button capsule up last"><span class="wrap"><spring:message code="RM_BUTTON_COPY_HERE" javaScriptEscape="true"/></span><span class="icon"></span></button></li>
                        <li class="leaf separator"></li>
                        <li class="leaf"><button id="remove" class="button capsule up"><span class="wrap"><spring:message code="SEARCH_BULK_DELETE" javaScriptEscape="true"/></span><span class="icon"></span></button></li>
                    </ul>
                </div>

                <div class="sub header hidden">
                    <ul id="filterPath" class=""></ul>
                </div>
            </t:putAttribute>
            <t:putAttribute name="bodyID" value="resultsContainer"/>
			<!-- Include swipeScroll here -->
            <t:putAttribute name="bodyContent">
                <ol id="resultsList" class="" tabIndex="-1" data-tab-index="4" data-component-type="list"></ol>
                <t:insertTemplate template="/WEB-INF/jsp/templates/nothingToDisplay.jsp">
                    <t:putAttribute name="bodyContent">
                        <p class="message">
                            <c:choose>
                                <c:when test="${mode == 'search'}"><spring:message code="repository.nothingToDisplay.search" javaScriptEscape="true"/></c:when>
                                <c:otherwise><spring:message code="repository.nothingToDisplay.browse" javaScriptEscape="true"/></c:otherwise>
                            </c:choose>
                        </p>
                    </t:putAttribute>
                </t:insertTemplate>
            </t:putAttribute>
        </t:insertTemplate>

        <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
            <t:putAttribute name="containerID" value="filters"/>
            <t:putAttribute name="containerClass" value="column decorated secondary sizeable"/>
            <t:putAttribute name="containerElements">
                <div class="sizer horizontal"></div>
                <button class="button minimize"></button>
            </t:putAttribute>
            <t:putAttribute name="containerTitle"><spring:message code="SEARCH_FILTERS" javaScriptEscape="true"/></t:putAttribute>
            <%--
            <t:putAttribute name="swipeScroll" value="${isIPad}"/>
             --%>
            <t:putAttribute name="bodyID" value="filtersPanelContent"/>
            <t:putAttribute name="bodyContent">
           		<div id="filtersPanel"></div>
            </t:putAttribute>
        </t:insertTemplate>

        <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
            <t:putAttribute name="containerID" value="folders"/>
            <t:putAttribute name="containerClass" value="column decorated secondary sizeable"/>
                <t:putAttribute name="containerElements">
                    <div class="sizer horizontal"></div>
                    <button class="button minimize"></button>
                </t:putAttribute>
            <t:putAttribute name="containerTitle"><spring:message code="SEARCH_FOLDERS" javaScriptEscape="true"/></t:putAttribute>
            <t:putAttribute name="swipeScroll" value="${isIPad}"/>
            <t:putAttribute name="bodyID">foldersPodContent</t:putAttribute>       
            <t:putAttribute name="bodyContent">
                <ul id="foldersTree" class="list responsive collapsible folders" ${mode == "browse" ? "data-tab-index='3' data-component-type='tree'" : ""}></ul>
                <div id="ajaxbuffer" style="display:none"></div>
                <%--<script type="text/javascript">console.log("Testing ${isIPad} ..,");</script>--%>

            </t:putAttribute>
        </t:insertTemplate>

        <jsp:include page="searchComponents.jsp"/>
        <jsp:include page="resultsState.jsp"/>
    </t:putAttribute>
</t:insertTemplate>
