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

<%--
 IE in Quirks mode doesn't allow to set FlashVars parameter of &lt;object&rt; element
 then ajax request is seted through innerHTML.
 This code find all occurences of FusionCharts flash objects
 and passes script which should be evaluated on client side.

 Evaluated script sets outerHTML of all FusionCharts flash objects only for IE.
--%>

<%@ page import="java.util.regex.Matcher" %>
<%@ page import="java.util.regex.Pattern" %>

<%
  StringBuffer buffer = (StringBuffer)request.getAttribute("reportBuffer");
  String flashVarsRegexp = "<object\\s+.*\\s+id=\"([^\"]*)\">(\\n?<param\\s+name=\"[^\"]+\"\\s+value=\"[^\"]+\"/>)*\\n?<param\\s+name=\"FlashVars\"\\s+value=\"([^\"]+)\"/>(\\n?<param\\s+name=\"[^\"]+\"\\s+value=\"[^\"]+\"/>)*\\n?<embed\\s+src=\"[^\"]+\"\\s+FlashVars=\"([^\"]+)\"[^>]+>\\n?</object>";
  Matcher matcher = Pattern.compile(flashVarsRegexp).matcher(buffer);

  int i = 0;
  while (matcher.find(i)) {
      String script = "if (isIE()) {$$('#" + matcher.group(1) + "')[0].outerHTML='" + matcher.group(0).replaceAll("'", "\\\\\'").replaceAll("\r\n", "").replaceAll("\n", "") + "'}";
      pageContext.setAttribute("evalScript", script);
      i = matcher.end();
%>
      <textarea class="hidden" style="display:none" name="_evalScript">${evalScript}</textarea>
<%
  }
%>