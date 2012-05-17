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

<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib uri="/spring" prefix="spring"%>

<script type="text/javascript" defer="defer">
    <%--orgModule.messages[""]  = '<spring:message code="" javaScriptEscape="true"/>';--%>
    orgModule.messages['userNameIsAlreadyInUse'] = '<spring:message code="jsp.userManager.userCreator.validation.userNameIsAlreadyInUse" javaScriptEscape="true"/>';
    orgModule.messages['invalidEmail'] = '<spring:message code="jsp.userManager.userCreator.validation.invalidEmail" javaScriptEscape="true"/>';
    orgModule.messages['invalidConfirmPassword'] = '<spring:message code="jsp.userManager.userCreator.validation.invalidConfirmPassword" javaScriptEscape="true"/>';
    orgModule.messages['userNameIsEmpty'] = '<spring:message code="jsp.userManager.userCreator.validation.userNameIsEmpty" javaScriptEscape="true"/>';
    orgModule.messages['passwordIsEmpty'] = '<spring:message code="jsp.userManager.userCreator.validation.passwordIsEmpty" javaScriptEscape="true"/>';
    orgModule.messages['addUser'] = '<spring:message code="jsp.userManager.userCreator.add" javaScriptEscape="true"/>';
    orgModule.messages['addUserTo'] = '<spring:message code="jsp.userManager.userCreator.addTo" javaScriptEscape="true"/>';
    orgModule.messages['deleteMessage'] = '<spring:message code="jsp.userManager.deleteUserMessage" javaScriptEscape="true"/>';
    orgModule.messages['deleteAllMessage'] = '<spring:message code="jsp.userManager.deleteAllUserMessage" javaScriptEscape="true"/>';
    orgModule.messages['cancelEdit'] = '<spring:message code="jsp.userManager.cancelUserEditMessage" javaScriptEscape="true"/>';
    orgModule.messages['unsupportedSymbols'] = '<spring:message code="jsp.userManager.userCreator.notSupportedSymbols" javaScriptEscape="true"/>';

    // Initialization of repository search init object.
    localContext.flowExecutionKey = '${flowExecutionKey}';
    localContext.userMngInitOptions = {
        state: ${state},
        defaultUser: '<spring:message code="${defaultUser}" javaScriptEscape="true"/>',
        defaultEntity: '<spring:message code="${defaultEntity}" javaScriptEscape="true"/>',
        currentUser: '<spring:message code="${signedUser}" javaScriptEscape="true"/>',
        currentUserRoles: ${currentUserRoles}
    };

    orgModule.Configuration = ${configuration};
</script>
<%-- Insert CSRF script here, which is responsible for sending CSRF security token --%>
<script src="<c:url value="/JavaScriptServlet"/>"></script>
