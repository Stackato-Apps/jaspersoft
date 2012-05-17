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
<%@ taglib prefix="authz" uri="http://www.springframework.org/security/tags" %>

<script type="text/javascript">
    repositorySearch.messages["action.create.folder"]  = '<spring:message code="SEARCH_CREATE_FOLDER" javaScriptEscape="true"/>';
    repositorySearch.messages["action.create.folder.name"]  = '<spring:message code="RM_NEW_FOLDER" javaScriptEscape="true"/>';
    repositorySearch.messages["SEARCH_SORT_BY"] = '<spring:message code="SEARCH_SORT_BY" javaScriptEscape="true"/>';
    repositorySearch.messages["RM_BUTTON_DELETE_RESOURCE"] = '<spring:message code="RM_BUTTON_DELETE_RESOURCE" javaScriptEscape="true"/>';
    repositorySearch.messages["RM_BUTTON_CANCEL"] = '<spring:message code="RM_BUTTON_CANCEL" javaScriptEscape="true"/>';
    repositorySearch.messages["SEARCH_DELETE_CONFIRM_MSG"] = '<spring:message code="SEARCH_DELETE_CONFIRM_MSG" javaScriptEscape="true"/>';
    repositorySearch.messages["SEARCH_BULK_DELETE_CONFIRM_MSG"] = '<spring:message code="SEARCH_BULK_DELETE_CONFIRM_MSG" javaScriptEscape="true"/>';
    repositorySearch.messages["SEARCH_DELETE_FOLDER_CONFIRM_MSG"] = '<spring:message code="SEARCH_DELETE_FOLDER_CONFIRM_MSG" javaScriptEscape="true"/>';
    repositorySearch.messages['permission.modify'] = '<spring:message code="RM_PERMISSION_MODIFY" javaScriptEscape="true"/>';
    repositorySearch.messages['permission.readOnly'] = '<spring:message code="RM_PERMISSION_READ_ONLY" javaScriptEscape="true"/>';
    repositorySearch.messages['permission.delete'] = '<spring:message code="RM_BUTTON_DELETE_RESOURCE" javaScriptEscape="true"/>';
    repositorySearch.messages['permission.administer'] = '<spring:message code="RM_PERMISSION_ADMINISTRATE" javaScriptEscape="true"/>';
    repositorySearch.messages['RE_INVALID_DESC_SIZE'] = '<spring:message code="RE_INVALID_DESC_SIZE" javaScriptEscape="true"/>';
    repositorySearch.messages['RE_INVALID_NAME_SIZE'] = '<spring:message code="RE_INVALID_NAME_SIZE" javaScriptEscape="true"/>';
    repositorySearch.messages['RE_INVALID_FILE_TYPE'] = '<spring:message code="RE_INVALID_FILE_TYPE" javaScriptEscape="true"/>';
    repositorySearch.messages['RE_ENTER_FILE_NAME'] = '<spring:message code="RE_ENTER_FILE_NAME" javaScriptEscape="true"/>';
    repositorySearch.messages["RM_NEW_THEME_NAME"]  = '<spring:message code="RM_NEW_THEME_NAME" javaScriptEscape="true"/>';
    repositorySearch.messages["RM_UPLOAD_THEME_ERROR"]  = '<spring:message code="RM_UPLOAD_THEME_ERROR" javaScriptEscape="true"/>';

    repositorySearch.messages['RM_CANCEL_EDIT_MESSAGE'] = '<spring:message code="RM_CANCEL_EDIT_MESSAGE" javaScriptEscape="true"/>';

    dynamicList.messages['listNItemsSelected'] = '<spring:message code="RM_N_RESOURCES_SELECTED" javaScriptEscape="true"/>'; 

    <c:forEach var="customFilter" items="${configuration.customFilters}">
        <c:forEach var="option" items="${customFilter.options}">repositorySearch.messages["${option.labelId}"] = '<spring:message code="${option.labelId}" javaScriptEscape="true"/>';</c:forEach>
    </c:forEach>

    <c:forEach var="permission" items="${permissions}">
        repositorySearch.messages["${permission.labelId}"] = '<spring:message code="${permission.labelId}" javaScriptEscape="true"/>';
    </c:forEach>

    <c:forEach var="sorter" items="${configuration.customSorters}">repositorySearch.messages["${sorter.labelId}"] = '<spring:message code="${sorter.labelId}" javaScriptEscape="true"/>';</c:forEach>

    // Initialization of repository search init object.
    localContext.rsInitOptions = {
        flowExecutionKey: '${flowExecutionKey}',
        state: ${state},
        configuration: ${jsonConfiguration},
        organizationId: "<spring:message code='${organizationId}' javaScriptEscape="true"/>",
        publicFolderUri: "${publicFolderUri}",
        tempFolderUri: "${tempFolderUri}",
        rootFolderUri: "${rootFolderUri}",
        organizationsFolderUri: "${organizationsFolderUri}",
        folderSeparator: "${folderSeparator}",
        mode: "${mode}",
        systemConfirm: "${systemConfirm}",
        isAnalysisFeatureEnabled: ${isAnalysisFeatureEnabled},
        isDashboardFeatureEnabled: ${isDashboardFeatureEnabled},
        isAdHocFeatureEnabled: ${isAdHocFeatureEnabled},
        isAdministrator: false,
        errorPopupMessage: "<spring:message code='${requestScope.errorPopupMessage}' javaScriptEscape="true"/>"
    };
    
    <authz:authorize ifAllGranted="ROLE_ADMINISTRATOR">
        localContext.rsInitOptions.isAdministrator = true;
    </authz:authorize>
</script>
<%-- Insert CSRF script here, which is responsible for sending CSRF security token --%>
<script src="<c:url value="/JavaScriptServlet"/>"></script>
