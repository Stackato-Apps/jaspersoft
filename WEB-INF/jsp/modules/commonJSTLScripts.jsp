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

<%-- JavaScript which is common to all pages and requires JSTL access --%>

<script type="text/javascript">
    //common URL context
    var urlContext = "${pageContext.request.contextPath}";

    <%--default search text --%>
    var defaultSearchText = "<spring:message code='SEARCH_BOX_DEFAULT_TEXT'/>";
    var serverIsNotResponding = "<spring:message code='confirm.slow.server'/>";

    layoutModule.fixNavigation();
</script>

<%--section for navigation's json action model data - needs its own script tag with id --%>
<script type="text/javascript" id="navigationActionModel">
    <%--get action model data for main navigation menu--%>
    //if you don't use quotes firebug complains saying variable has bad label name. So we put quotes around it. However,
    //we need to eval() it twice since we want to extract the JSON object from the stringed version.
    '<%=NavigationActionModelSupport.getInstance().getClientActionModelDocument("navigation", request)%>'
</script>