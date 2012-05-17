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
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="js" uri="/WEB-INF/jasperserver.tld" %>

<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle"><spring:message code="report.scheduling.list.title"/></t:putAttribute>
    <t:putAttribute name="bodyID" value="scheduler_jobList"/>
    <t:putAttribute name="bodyClass" value="oneColumn"/>
	
		<t:putAttribute name="bodyContent" >
		
			<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
			    <t:putAttribute name="containerClass" value="column decorated primary showingToolBar"/>
			    <t:putAttribute name="containerTitle"><spring:message code="report.scheduling.list.header"/> <span class="path">${ownerURI}</span></t:putAttribute>

		    
			    <t:putAttribute name="headerContent">	
                    <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/report.schedule.js"></script>
                    <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/report.schedule.list.js"></script>
                    <%@ include file="jobCommonState.jsp" %>

					<div class="toolbar">
						<ul class="list buttonSet">
							<li class="node open">
								<ul class="list buttonSet">
									<li class="leaf"><button id="back" class="button capsule up"><span class="wrap"><spring:message code="button.back"/></span><span class="icon"></span></button></li>
								</ul>
							</li>
							<li class="node open">
								<ul class="list buttonSet">
									<li class="leaf"><button id="scheduleJob" class="button capsule first up"><span class="wrap"><spring:message code="report.scheduling.list.button.new"/></span><span class="icon"></span></button></li>
									<li class="leaf"><button id="runNow" class="button capsule last up"><span class="wrap"><spring:message code="report.scheduling.list.button.now"/></span><span class="icon"></span></button></li>
								</ul>
							</li>
							<li class="node open">
								<ul class="list buttonSet">
									<li class="leaf"><button id="refresh" class="button capsule up"><span class="wrap"><spring:message code="report.scheduling.list.button.refresh"/></span><span class="icon"></span></button></li>
								</ul>
							</li>
						</ul>
					</div>
			
				</t:putAttribute>

                <%--<t:putAttribute name="swipeScroll" value="${isIPad}"/>--%>

                <t:putAttribute name="bodyContent">

                    <t:insertTemplate template="/WEB-INF/jsp/templates/nothingToDisplay.jsp">
                        <t:putAttribute name="bodyContent">
                            <p class="message"><spring:message code="report.scheduling.list.no.jobs"/></p>
                        </t:putAttribute>
                    </t:insertTemplate>

                    <ol class="list tabular" id="jobContainer">
                        <li class="leaf">
                            <div class="wrap header">
                                <div class="column one">
                                    <spring:message code="report.scheduling.list.header.id"/>
                                </div>
                                <div class="column two">
                                    <spring:message code="report.scheduling.list.header.label"/>
                                </div>
                                <div class="column three">
                                    <spring:message code="report.scheduling.list.header.owner"/>
                                </div>
                                <div class="column four">
                                    <spring:message code="report.scheduling.list.header.state"/>
                                </div>
                                <div class="column five">
                                    <spring:message code="report.scheduling.list.header.prevFireTime"/>
                                </div>
                                <div class="column six">
                                    <spring:message code="report.scheduling.list.header.nextFireTime"/>
                                </div>
                                <div class="column seven">

                                </div>
                            </div>
                        </li>

                        <c:forEach items="${requestScope.jobs}" var="job" varStatus="status">
                            <li id="jobItem_${job.id}" class="leaf">
                                <div class="wrap">
                                    <div class="column one">
                                        ${job.id}
                                    </div>
                                    <div class="column two">
                                        ${job.label}
                                    </div>
                                    <div class="column three">
                                        ${job.username}
                                    </div>
                                    <div class="column four">
                                        <spring:message code="report.scheduling.list.state.${job.runtimeInformation.state}"/>&nbsp;
                                    </div>
                                    <div class="column five">
                                        <c:if test="${job.runtimeInformation.previousFireTime != null}">
                                            <js:formatDate value="${job.runtimeInformation.previousFireTime}"/>
                                        </c:if>&nbsp;
                                    </div>
                                    <div class="column six">
                                        <c:if test="${job.runtimeInformation.nextFireTime != null}">
                                            <js:formatDate value="${job.runtimeInformation.nextFireTime}"/>
                                        </c:if>&nbsp;
                                    </div>
                                    <div class="column seven">
                                        <a id="edit" class="launcher" name="${job.id}"><spring:message code="report.scheduling.list.label.edit"/></a> | <a id="remove" class="launcher" name="${job.id}"><spring:message code="report.scheduling.list.label.remove"/></a>
                                    </div>
                                </div>
                            </li>
                        </c:forEach>


                    </ol>

                    <div class="hidded">
                        <form id="navigationForm" action="">
                            <input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}"/>
                            <input type="hidden" name="_eventId" value=""/>
                            <input type="hidden" name="editJobId" value=""/>
                        </form>
                    </div>

                    <div id="ajaxbuffer"></div>

                </t:putAttribute>
            </t:insertTemplate>
			
	    </t:putAttribute>

</t:insertTemplate>
