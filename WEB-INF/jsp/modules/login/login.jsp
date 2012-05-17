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

<%@ taglib prefix="spring" uri="/spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>

<%@ page import="com.jaspersoft.jasperserver.war.dto.StringOption" %>
<%@ page import="com.jaspersoft.jasperserver.war.common.UserLocale" %>
<%@ page import="java.util.Random" %>

<%@ include file="../common/jsEdition.jsp" %>
<c:choose>
    <c:when test="${isProVersion}">
        <c:set var="jsEditionClass" value="pro"/>
    </c:when>
    <c:otherwise>
        <c:set var="jsEditionClass" value="community"/>
    </c:otherwise>
</c:choose>

<%-- Rotating page count. --%>
<c:set var='rotatingPageCount' value='1'/>

<%-- Random rotating page number. --%>
<c:set var='randomRotatingPageNumber' value='<%=new Random().nextInt(Integer.parseInt(pageContext.getAttribute("rotatingPageCount").toString()))%>'/>

<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle"><spring:message code='jsp.Login.title'/></t:putAttribute>
    <t:putAttribute name="headerContent">
        <meta name="noMenu" content="true">
        <meta name="pageHeading" content="<spring:message code='jsp.Login.pageHeading'/>"/>

        <% response.setHeader("LoginRequested","true");
           session.removeAttribute("js_uname");
           session.removeAttribute("js_upassword");
        %>

        <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/components.loginBox.js"></script>
    </t:putAttribute>
    <t:putAttribute name="bodyID" value="loginPage"/>
    <t:putAttribute name="bodyClass">oneColumn ${jsEditionClass}</t:putAttribute>
    <t:putAttribute name="bodyContent" >

        <!--[if IE 6]>
        <script type="text/javascript">
            alert("<spring:message code="LOGIN_UNSUPPORTED_BROWSER" javaScriptEscape="true"/>");
        </script>
        <![endif]-->

        <c:set var='showPasswordChange' value='<%=request.getParameter("showPasswordChange")%>'/>

        <div class="wrapper">
            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                <t:putAttribute name="containerClass" value="panel info"/>
                <t:putAttribute name="containerID" value="copy"/>
                <t:putAttribute name="bodyContent">
                    <div id="welcome" class="row">
                        <h1 class="textAccent02"><spring:message code='LOGIN_WELCOME_OS'/></h1>
                    </div>
                    <div id="buttons" class="row">
                        <div class="primary">
                            <c:choose>
                                <c:when test="${isProVersion}">
                                    <button id="documentationButton" class="button action primary up"><span class="wrap"><spring:message code='BUTTON_DOCUMENTATION'/></span><span class="icon"></span></button>
                                </c:when>
                                <c:otherwise>
                                    <button id="gotoJasperForge" class="button action primary up"><span class="wrap"><spring:message code='BUTTON_GOTO_JASPERFORGE'/></span><span class="icon"></span></button>
                                </c:otherwise>
                            </c:choose>
                        </div>
                        <div class="secondary">
                            <button id="contactSalesButton" class="button action primary up"><span class="wrap"><spring:message code='BUTTON_CONTACT_SALES'/></span><span class="icon"></span></button>
                        </div>
                    </div>
                    <div  id="rotating" class="row">
                        <jsp:include page="rotating/login_rotating_${jsEditionClass}_${randomRotatingPageNumber}.jsp"/>
                    </div>
                </t:putAttribute>
            </t:insertTemplate>
            
            <form id="loginForm" method="POST" action="j_spring_security_check"
                    <c:if test="${autoCompleteLoginForm == 'false'}">autocomplete="off"</c:if>>
                <t:insertTemplate template="/WEB-INF/jsp/templates/login.jsp">
                    <t:putAttribute name="jsEdition">${jsEditionClass}</t:putAttribute>
                    <t:putAttribute name="allowUserPasswordChange" value="${allowUserPasswordChange}"/>
                    <t:putAttribute name="errorMessages">
                        <c:choose>
                            <c:when test="${isProVersion}">
                                <c:choose>
                                    <c:when test="${usersExceeded && banUser}">
                                        <p class="errorMessage">
                                            <spring:message code="LIC_017_license.block.user"/>
                                        </p>
                                    </c:when>
                                    <c:when test="${usersExceeded && !banUser}">
                                        <p class="errorMessage">
                                            <spring:message code="LIC_017_license.user.count.exceeded.login.box"/>
                                        </p>
                                    </c:when>
                                </c:choose>
                            </c:when>
                        </c:choose>
                        <c:if test="${paramValues.error != null && !usersExceeded && !banUser}">
                        <c:choose>
                            <c:when test="${exception!=null}">
                              <p class="errorMessage">${exception}</p>
                            </c:when>
                            <c:otherwise>
                                <p class="errorMessage"><spring:message code='jsp.loginError.invalidCredentials1'/></p>
                                <p class="errorMessage"><spring:message code='jsp.loginError.invalidCredentials2'/></p>
                            </c:otherwise>
                        </c:choose>
                        </c:if>
                        <c:if test="${showPasswordChange eq 'true'}">
                            <p class="errorMessage"><spring:message code='jsp.loginError.expiredPassword1'/></p>
                            <p class="errorMessage"><spring:message code='jsp.loginError.expiredPassword2'/></p>
                        </c:if>
                        <p id="customError" class="errorMessage hidden"></p>
                    </t:putAttribute>
                    <t:putAttribute name="localeOptions">
                        <c:forEach items="${userLocales}" var="locale">
                            <option value="${locale.code}" <c:if test="${preferredLocale == locale.code}">selected</c:if>>
                                <spring:message code="locale.option"
                                    arguments='<%= new String[]{((UserLocale) pageContext.getAttribute("locale")).getCode(), ((UserLocale) pageContext.getAttribute("locale")).getDescription()} %>'/>
                            </option>
                        </c:forEach>
                    </t:putAttribute>
                    <t:putAttribute name="timezoneOptions">
                        <c:forEach items="${userTimezones}" var="timezone">
                            <option value="${timezone.code}" <c:if test="${preferredTimezone == timezone.code}">selected</c:if>>
                                <spring:message code="timezone.option"
                                    arguments='<%= new String[]{((StringOption) pageContext.getAttribute("timezone")).getCode(), ((StringOption) pageContext.getAttribute("timezone")).getDescription()} %>'/>
                            </option>
                        </c:forEach>
                    </t:putAttribute>
                </t:insertTemplate>
            </form>
        </div>

        <!-- Login Help Dialog -->
        <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
            <t:putAttribute name="containerClass" value="panel dialog overlay moveable centered_horz centered_vert hidden"/>
            <t:putAttribute name="containerID" value="helpLoggingIn"/>
            <t:putAttribute name="containerTitle"><spring:message code='LOGIN_HELP'/></t:putAttribute>
            <t:putAttribute name="headerClass" value="mover"/>
            <t:putAttribute name="bodyContent">
                <p class="message"><spring:message code='LOGIN_SIGN_IN_AS'/>:</p>
             <ul class="decorated">
                  <c:if test="${isProVersion}">
                      <li><span class="emphasis">superuser</span> <spring:message code='LOGIN_SUPERUSER_USER'/></li>
                  </c:if>
                       <li><span class="emphasis">jasperadmin</span> <spring:message code='LOGIN_ADMIN_USER'/></li>
                      <li><span class="emphasis">joeuser/joeuser</span> <spring:message code='LOGIN_JOEUSER'/></li>
                  <c:if test="${isProVersion}">
                      <li><span class="emphasis">demo/demo</span> <spring:message code='LOGIN_TO_VIEW_DEMO'/></li>
                  </c:if>
             </ul>                              
                <p class="message"><spring:message code='CONTACT_ADMIN'/>.</p>
            </t:putAttribute>

            <t:putAttribute name="footerContent">
                <button type="submit" class="button action primary up"><span class="wrap"><spring:message code='button.ok'/></span><span class="icon"></span></button>
            </t:putAttribute>
        </t:insertTemplate>

        <jsp:include page="loginState.jsp"/>
    </t:putAttribute>
</t:insertTemplate>
