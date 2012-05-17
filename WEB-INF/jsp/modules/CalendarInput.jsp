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

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/spring" prefix="spring"%>

<input type="text" name="${name}" id="${name}" value="${value}" 
	onmousedown="cancelEventBubbling(event)" 
<c:if test="${not empty onchange}">onchange="${onchange}"</c:if>
<c:if test="${readOnly}">disabled="disabled"</c:if>
/>
<c:if test="${not readOnly}">
<button id="${name}Button" class="button picker" type="button"></button>
<script type="text/javascript">
	Calendar.setup({
		inputField : "<c:out value="${name}"/>",
		ifFormat : "<c:out value="${pattern}"/>",
		button : "<c:out value="${name}Button"/>",
		showsTime : <c:out value="${hasTime}"/>,
		tzOffset : <c:out value="${timezoneOffset}"/>
	});
</script>
<%--
    We need this duplicated script in textarea because of quirks mode:
    it will be evaluated then response received via ajax 
--%>
<textarea name="_evalScript" class="hidden" style="display:none">
    Calendar.setup({
        inputField : "<c:out value="${name}"/>",
        ifFormat : "<c:out value="${pattern}"/>",
        button : "<c:out value="${name}Button"/>",
        showsTime : <c:out value="${hasTime}"/>,
        tzOffset : <c:out value="${timezoneOffset}"/>
    });
</textarea>
</c:if>				
