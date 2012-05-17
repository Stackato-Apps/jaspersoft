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
  ~ License, or (at your step) any later version.
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

<script type="text/javascript">
    localContext.initOptions = {
        isEditMode: ${dataResource.editMode},
        type: "${type}",
        parentFolderUri: "${parentFolder}",
        connectionState: "${requestScope['connection.test']}",
        resourceIdNotSupportedSymbols: "<spring:message code="${resourceIdNotSupportedSymbols}" javaScriptEscape="true"/>"
    };

    resource.messages["labelToLong"] = '<spring:message code="ReportDataSourceValidator.error.too.long.reportDataSource.label" javaScriptEscape="true"/>';
    resource.messages["labelIsEmpty"] = '<spring:message code="ReportDataSourceValidator.error.not.empty.reportDataSource.label" javaScriptEscape="true"/>';
    resource.messages["resourceIdToLong"] = '<spring:message code="ReportDataSourceValidator.error.too.long.reportDataSource.name" javaScriptEscape="true"/>';
    resource.messages["resourceIdIsEmpty"] = '<spring:message code="ReportDataSourceValidator.error.not.empty.reportDataSource.name" javaScriptEscape="true"/>';
    resource.messages["resourceIdInvalidChars"] = '<spring:message code="ReportDataSourceValidator.error.invalid.chars.reportDataSource.name" javaScriptEscape="true"/>';
    resource.messages["descriptionToLong"] = '<spring:message code="ReportDataSourceValidator.error.too.long.reportDataSource.description" javaScriptEscape="true"/>';
    resource.messages["connectionFailed"] = '<spring:message code="resource.dataSource.connectionState.failed" javaScriptEscape="true"/>';
    resource.messages["connectionPassed"] = '<spring:message code="resource.dataSource.connectionState.passed" javaScriptEscape="true"/>';

    resource.messages["driverIsEmpty"] = '<spring:message code="ReportDataSourceValidator.error.not.empty.reportDataSource.driverClass" javaScriptEscape="true"/>';
    resource.messages["urlIsEmpty"] = '<spring:message code="ReportDataSourceValidator.error.not.empty.reportDataSource.connectionUrl" javaScriptEscape="true"/>';
    resource.messages["userNameIsEmpty"] = '<spring:message code="ReportDataSourceValidator.error.not.empty.reportDataSource.username" javaScriptEscape="true"/>';
    resource.messages["serviceIsEmpty"] = '<spring:message code="ReportDataSourceValidator.error.not.empty.reportDataSource.jndiName" javaScriptEscape="true"/>';
    resource.messages["beanNameIsEmpty"] = '<spring:message code="ReportDataSourceValidator.error.not.empty.reportDataSource.beanName" javaScriptEscape="true"/>';
    resource.messages["beanMethodIsEmpty"] = '<spring:message code="ReportDataSourceValidator.error.not.empty.reportDataSource.beanMethod" javaScriptEscape="true"/>';

    resource.messages["resource.Add.Files.Title"]='<spring:message code="resource.Add.Files.Title" javaScriptEscape="true"/>';
</script>