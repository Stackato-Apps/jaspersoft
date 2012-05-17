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

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>


<script type="text/javascript">

    Schedule._messages["TIMESTAMP_PATTERN_DEFAULT"]  = '<spring:message code="report.scheduling.job.edit.repository.inline.hint.timestampPattern" javaScriptEscape="true"/>';
    Schedule._messages["report.scheduling.list.job.removed"]  = '<spring:message code="report.scheduling.list.job.removed" javaScriptEscape="true"/>';
    Schedule._messages["browse.title"]  = '<spring:message code="report.scheduling.job.edit.repository.header" javaScriptEscape="true"/>';


    var wrappersUUID = '${wrappersUUID}';


    Schedule.flowExecutionKey = '${flowExecutionKey}';
    Schedule.jobSource = '${job.source.reportUnitURI}';
    Schedule.isRunNowMode = ${isRunNowMode ? true : false};
    Schedule.hasReportParameters = ${hasReportParameters ? true : false};
    Schedule.organizationId = '${organizationId}';
    Schedule.publicFolderUri = '${publicFolderUri}';



</script>
