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
Default rendering HTML fragment for a JR report called from the JasperViewerTag.

 Expects attributes:
    pageIndex:          Integer         Current page in report
    lastPageIndex:      Integer         Greatest page number in report
    page:               String          URL for surrounding page
    exporter:           JRHtmlExporter  The wrapped JasperPrint
    pageIndexParameter:     String      parameter name in URL for paging
--%>

<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<%@ page import="net.sf.jasperreports.engine.export.*" %>
<%@ page import="net.sf.jasperreports.engine.*" %>
<%@ page import="com.jaspersoft.jasperserver.war.action.ExporterConfigurationBean" %>
<%@ page import="com.jaspersoft.jasperserver.api.metadata.jasperreports.domain.ReportUnit" %>
<%@ page errorPage="/WEB-INF/jsp/modules/system/errorPage.jsp" %>



<div id="reportOutput" class="hidden">

    <%@ include file="DefaultJasperViewerState.jsp" %>


    <%--  Optional Pagination  --%>

    <c:if test="${innerPagination and !emptyReport and (lastPageIndex > 0 or configurationBean.paginationForSinglePageReport)}">
        <table cellpadding="0" cellspacing="0" border="0" id="innerPagination" style="margin: 0 auto">
            <tr>
                <c:choose>
                    <c:when test="${pageIndex > 0}">
                        <td width="1"><a href="javascript:Report.navigateToReportPage(0);" title="<spring:message code="jasper.report.view.hint.first.page"/>"><img border="0" src="${pageContext.request.contextPath}/themes/default/images/first.gif" alt="<spring:message code="jasper.report.view.hint.first.page"/>" /></a></td>
                        <td width="1"><a href="javascript:Report.navigateToReportPage(${pageIndex-1});" title="<spring:message code="jasper.report.view.hint.previous.page"/>"><img border="0" src="${pageContext.request.contextPath}/themes/default/images/prev.gif" alt="<spring:message code="jasper.report.view.hint.previous.page"/>" /></a></td>
                    </c:when>
                    <c:otherwise>
                        <td width="1"><img src="${pageContext.request.contextPath}/themes/default/images/first-d.gif" alt="<spring:message code="jasper.report.view.hint.first.page"/>" class="imageborder"/></td>
                        <td width="1"><img src="${pageContext.request.contextPath}/themes/default/images/prev-d.gif" alt="<spring:message code="jasper.report.view.hint.previous.page"/>" class="imageborder"/></td>
                    </c:otherwise>
                </c:choose>

                <td align="center" nowrap="nowrap">
                    <spring:message code="jasper.report.view.page.intro"/>
                    <input type="text" name="currentPage" style="text-align: right;width:40px" value="${pageIndex+1}" onchange="javascript:Report.goToPage(this.value);return false;"/>
                    <spring:message code="jasper.report.view.page.of"/>${lastPageIndex + 1}
                </td>

                <c:choose>
                    <c:when test="${pageIndex < lastPageIndex}">
                        <td width="1"><a href="javascript:Report.navigateToReportPage(${pageIndex+1});" title="<spring:message code="jasper.report.view.hint.next.page"/>"><img border="0" src="${pageContext.request.contextPath}/themes/default/images/next.gif" alt="<spring:message code="jasper.report.view.hint.next.page"/>" /></a></td>
                        <td width="1"><a href="javascript:Report.navigateToReportPage(${lastPageIndex});" title="<spring:message code="jasper.report.view.hint.last.page"/>"><img border="0" src="${pageContext.request.contextPath}/themes/default/images/last.gif" alt="<spring:message code="jasper.report.view.hint.last.page"/>" /></a></td>
                    </c:when>
                    <c:otherwise>
                        <td width="1"><img src="${pageContext.request.contextPath}/themes/default/images/next-d.gif" alt="<spring:message code="jasper.report.view.hint.next.page"/>"/></td>
                        <td width="1"><img src="${pageContext.request.contextPath}/themes/default/images/last-d.gif" alt="<spring:message code="jasper.report.view.hint.last.page"/>"/></td>
                    </c:otherwise>
                </c:choose>
            </tr>
            <tr>
                <td colspan="7">
                    <div id="checkErrorsRow" class="hidden" style="display:none">
                        <span class="message warning"><spring:message code="jasper.report.view.error.invalid.pagenumber"/></span>
                    </div>
                </td>
            </tr>
        </table>
    </c:if>


    <%--  Report Output  --%>

    <c:if test="${!emptyReport}">
        <jsp:useBean id="exporter" type="JRExporter" scope="request"/>
        <%
          StringBuffer buffer = new StringBuffer();
          exporter.setParameter(JRExporterParameter.OUTPUT_STRING_BUFFER, buffer);
          exporter.exportReport();
          out.print(buffer);
          request.setAttribute("reportBuffer", buffer);
        %>

        <textarea class="hidden" style="display:none" name="_evalScript">
            $('emptyReportID') && $('emptyReportID').addClassName('hidden');

            <c:if test="${lastPageIndex == 0}">
                $('pagination') && $('pagination').addClassName('hidden');
            </c:if>
            <c:if test="${lastPageIndex != 0}">
                $('pagination') && $('pagination').removeClassName('hidden');
            </c:if>
        </textarea>

        <jsp:include page="FusionChartsIEFix.jsp"/>
    </c:if>
    <c:if test="${emptyReport}">
        <textarea class="hidden" style="display:none" name="_evalScript">
            $('pagination') && $('pagination').addClassName('hidden');
            if ($('emptyReportID')) {
                $('emptyReportID').removeClassName('hidden');
                centerElement($('emptyReportID'), {horz: true, vert: true});
            }
        </textarea>
    </c:if>

</div>