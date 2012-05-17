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

<t:insertTemplate template="/WEB-INF/jsp/templates/addFolder.jsp">
    <t:putAttribute name="containerClass" value="centered_vert centered_horz hidden"/>
</t:insertTemplate>

<t:insertTemplate template="/WEB-INF/jsp/templates/uploadTheme.jsp">
    <t:putAttribute name="containerClass" value="centered_vert centered_horz hidden"/>
</t:insertTemplate>

<div id="dndResourceTemplate" >
    <div class="dragging hidden">
    </div>
</div>

<div class="hidden">
    <t:insertTemplate template="/WEB-INF/jsp/templates/propertiesResource.jsp">
        <t:putAttribute name="containerClass">centered_vert centered_horz</t:putAttribute>
    </t:insertTemplate>
</div>
<div class="hidden">
    <t:insertTemplate template="/WEB-INF/jsp/templates/permissions.jsp">
        <t:putAttribute name="containerClass">centered_vert centered_horz</t:putAttribute>
        <t:putAttribute name="bodyContent">
            <ul id="permissionsList"></ul>
        </t:putAttribute>
    </t:insertTemplate>
</div>

<form id="redirectForm" action="flow.html" method="post" onsubmit="return false;" style="display:none;">
    <input id="_flowExecutionKey" name="_flowExecutionKey" value="${flowExecutionKey}" type="hidden" />
    <input id="_eventId" name="_eventId" value="redirect" type="hidden" />
    <input id="flowParams" name="flowParams" value="" type="hidden" />
</form>
