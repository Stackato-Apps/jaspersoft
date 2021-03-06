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
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>

<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle" value="ChangeMe"/>
    <t:putAttribute name="bodyID" value="ChangeMe"/>
    <t:putAttribute name="bodyClass" value="oneColumn"/>
    <t:putAttribute name="bodyContent" >
		<div class="sizeable row">
			<div class="sizer vertical"></div>
			<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
			    <t:putAttribute name="containerClass" value="column decorated primary"/>
			    <t:putAttribute name="containerTitle">You must provide a title</t:putAttribute>
			    <t:putAttribute name="bodyClass" value=""/>
			    <t:putAttribute name="bodyContent">
					<!-- custom content here; remove this comment -->
			    </t:putAttribute>
			    <t:putAttribute name="footerContent">
			    	<!-- custom content here; remove this comment -->
			    </t:putAttribute>
			</t:insertTemplate>
		
		</div>
		<div class=" row">
			<!-- <div class="sizer horizontal"></div> -->
			<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
			    <t:putAttribute name="containerClass" value="column decorated primary"/>
			    <t:putAttribute name="containerTitle">You must provide a title</t:putAttribute>
			    <t:putAttribute name="bodyClass" value=""/>
			    <t:putAttribute name="bodyContent">
					<!-- custom content here; remove this comment -->
			    </t:putAttribute>
			    <t:putAttribute name="footerContent">
			    	<!-- custom content here; remove this comment -->
			    </t:putAttribute>
			</t:insertTemplate>
		
		</div>

		
	</t:putAttribute>
		
</t:insertTemplate>