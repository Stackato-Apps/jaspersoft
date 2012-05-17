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

<script type="text/javascript">


    Report._messages["jasper.report.view.page.of"]  = '<spring:message code="jasper.report.view.page.of" javaScriptEscape="true"/>';
	Controls._messages["jasper.report.option.saved"] = '<spring:message code="jasper.report.view.option.saved" javaScriptEscape="true"/>';
	
    Report.flowExecutionKey = '${flowExecutionKey}';
    Report.reportUnitURI = '${requestScope.reportUnit}';
    Report.reportOptionsURI = '${requestScope.reportOptionsURI}';
    Report.reportForceControls = ${reportForceControls};
    Report.needsInput = ${needsInput};
    Report.reportControlsLayout = ${reportControlsLayout};
    wrappersUUID = "${wrappersUUID}";
    <c:if test="${needsInput && reportControlsLayout == 2}">
        Controls.separatePageICLayoutFirstShow = true;
    </c:if>
	
    function printRequest(){
    	// Leave empty. This function is invoked by Flash charts in report for managed print.
    	// Printing is not available in report view, only in dashboard view.
    }
    function FC_Rendered(DOMId){
        jQuery('#'+DOMId).hide().show();
    }
</script>
