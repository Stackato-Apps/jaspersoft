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
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%@ page import="java.util.Set,java.util.TimeZone,
		com.jaspersoft.jasperserver.war.dto.ByteEnum,
		com.jaspersoft.jasperserver.war.common.UserLocale,
		com.jaspersoft.jasperserver.war.dto.StringOption"%>

<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle"><spring:message code="report.scheduling.job.edit.output.title"/></t:putAttribute>
    <t:putAttribute name="bodyID" value="scheduler_jobOutput"/>
    <t:putAttribute name="bodyClass" value="oneColumn flow wizard lastStep"/>
    <!--NOTE: if the report has input controls, then the class attribute for this step would NOT include selector 'lastStep' -->

    <t:putAttribute name="bodyContent" >
    <form id="pageForm" action="">
        <input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}"/>
        <input type="hidden" name="_eventId" value=""/>
		<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
			<t:putAttribute name="containerClass" value="column decorated primary"/>
		    <t:putAttribute name="containerTitle"><spring:message code="report.scheduling.scheduler"/></t:putAttribute>
		

            <t:putAttribute name="headerContent">
                <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/report.schedule.js"></script>
                <script type="text/javascript" language="JavaScript" src="${pageContext.request.contextPath}/scripts/report.schedule.output.js"></script>
                <%@ include file="jobCommonState.jsp" %>
            </t:putAttribute>

            <t:putAttribute name="swipeScroll" value="${isIPad}"/>

		    <t:putAttribute name="bodyContent">
                <div id="flowControls">
                    <ul class="list stepIndicator">
                        <li class="leaf first " ${isRunNowMode ? 'disabled' : ''}><p class="wrap"><b class="icon"></b><spring:message code="report.scheduling.job.edit.button"/></p></li>
                        <li class="leaf ${hasReportParameters ? '' : 'disabled="disabled"'}"><p class="wrap"><b class="icon"></b><spring:message code="report.scheduling.job.edit.parameters.button"/></p></li>
                        <li class="leaf last selected"><p class="wrap"><b class="icon"></b><spring:message code="report.scheduling.job.edit.output.button"/></p></li>
                    </ul>
                </div>

				<div id="stepDisplay">
					<fieldset class="row instructions">
						<legend class="offLeft"><span>Instructions</span></legend>
						<h2 class="textAccent02"><spring:message code="report.scheduling.job.edit.output.header"/></h2>
						<h4><spring:message code="report.scheduling.job.edit.output.header.instructions"/></h4>
					</fieldset>
				
					<fieldset class="row inputs twoColumn_equal">
						<legend class="title"><spring:message code="report.scheduling.job.edit.label.report"/> <span class="path">${job.source.reportUnitURI}</span></legend>
						
							<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
							    <t:putAttribute name="containerClass" value="column primary"/>

							    <t:putAttribute name="bodyContent">
							    
										<fieldset class="group">
											<legend class=""><span><spring:message code="report.scheduling.job.edit.output.label.output.location"/></span></legend>
                                            <spring:bind path="job.contentRepositoryDestination.folderURI">
                                                <input type="hidden" id="outputLocation" name="${status.expression}" value="${status.value}"/>
                                                <span class="${status.error ? "error" : ""}">
                                                    <c:forEach items="${status.errorMessages}" var="error">
                                                        <span class=" warning"><c:out value="${error}"/></span>
                                                    </c:forEach>
                                                </span>

                                                <div title="" class="control browser">
                                                    <label class="wrap" for="browseOutputLocation"><spring:message code="report.scheduling.job.edit.output.label.output.to"/>:</label>
                                                    <input type="text" value="${status.value}" name="" id="browseOutputLocation">
                                                    <button class="button action" id="browser_button"><span class="wrap"><spring:message code="button.browse"/><span class="icon"></span></span></button>
                                                </div>

                                            </spring:bind>


                                            <ul id="fileNameSettings" class="list inputSet">

                                                    <li class="leaf">
                                                        <div class="control checkBox" title="<spring:message code="report.scheduling.job.edit.parameters.tooltip.create.sequential.names"/>">
                                                            <label for="sequential" class="wrap"><spring:message code="report.scheduling.job.edit.repository.label.sequentialFilenames"/></label>

                                                            <spring:bind path="job.contentRepositoryDestination.sequentialFilenames">
                                                                <c:set var="sequentialFilenames" value="${status.value}"/>
                                                                <input type="hidden" name="_${status.expression}"/>
                                                                <input class="" id="sequential" type="checkbox" name="${status.expression}" <c:if test="${status.value}">checked</c:if> />
                                                            </spring:bind>

                                                        </div>

                                                        <label class="control input text" for="timestampPatternText" title="<spring:message code="report.scheduling.job.edit.parameters.tooltip.timestamp.pattern.sequential"/>">
                                                            <spring:bind path="job.contentRepositoryDestination.timestampPattern">
                                                                <span id="timestampPattern" class="control input text ${status.error ? "error" : ""}" class="">
                                                                    <span class="wrap"><spring:message code="report.scheduling.job.edit.repository.label.timestampPattern"/></span>
                                                                    <input id="timestampPatternInput" name="${status.expression}" type="hidden" value="${status.value}"/>

                                                                    <input class="" type="text" id="timestampPatternText" maxlength="100"  title="<spring:message code="report.scheduling.job.edit.parameters.tooltip.timestamp.pattern.simple.data"/>"
                                                                        <c:choose>
                                                                            <c:when test="${not sequentialFilenames}">
                                                                                disabled="disabled"
                                                                            </c:when>
                                                                            <c:when test="${empty status.value}">
                                                                                value="<spring:message code="report.scheduling.job.edit.repository.inline.hint.timestampPattern"/>"
                                                                            </c:when>
                                                                            <c:otherwise>
                                                                                value="${status.value}"
                                                                            </c:otherwise>
                                                                        </c:choose>
                                                                    />

                                                                    <c:forEach items="${status.errorMessages}" var="error">
                                                                        <span class="message warning"><c:out value="${error}"/></span>
                                                                    </c:forEach>
                                                                </span>
                                                            </spring:bind>

                                                        </label>
                                                    </li>
                                                    <li class="leaf">

                                                        <spring:bind path="job.contentRepositoryDestination.overwriteFiles">
                                                            <div class="control checkBox ${status.error ? "error" : ""}" title="<spring:message code="report.scheduling.job.edit.parameters.tooltip.files.overwrite"/>">
                                                                <label  for="overwrite" class="wrap"><spring:message code="report.scheduling.job.edit.repository.label.overwriteFiles"/></label>
                                                                <input type="hidden" name="_${status.expression}"/>
                                                                <input class="" id="overwrite" type="checkbox" name="${status.expression}" <c:if test="${status.value}">checked</c:if> />
                                                                <c:forEach items="${status.errorMessages}" var="error">
                                                                    <span class="message warning"><c:out value="${error}"/></span>
                                                                </c:forEach>
                                                            </div>
                                                        </spring:bind>

                                                    </li>
                                            </ul>
                                        </fieldset>
                                    </t:putAttribute>
                                </t:insertTemplate>
								
								<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
							    	<t:putAttribute name="containerClass" value="column secondary"/>
									<t:putAttribute name="bodyContent">	

											<fieldset id="output" class="group">
							                    <legend class=""><span><spring:message code="report.scheduling.job.edit.output.identification"/></span></legend>

                                                <spring:bind path="job.baseOutputFilename">
                                                    <label class="control input text ${status.error ? "error" : ""}" for="outputFileName"
                                                           title="<spring:message code="report.scheduling.job.edit.parameters.tooltip.baseFileName"/>">
                                                        <span class="wrap"><spring:message code="report.scheduling.job.edit.output.label.baseFileName"/></span>
                                                        <input class="" id="outputFileName" type="text" name="${status.expression}" value="<c:out value="${status.value}"/>" maxlength="200"/>
                                                        <c:forEach items="${status.errorMessages}" var="error">
                                                            <span class="message warning"><c:out value="${error}"/></span>
                                                        </c:forEach>
                                                    </label>
                                                </spring:bind>

                                                <spring:bind path="job.contentRepositoryDestination.outputDescription">
                                                    <label class="control textArea ${status.error ? "error" : ""}" for="outputDescription">
                                                        <span class="wrap"><spring:message code="report.scheduling.job.edit.output.label.outputDescription"/></span>
                                                        <textarea class="" id="outputDescription" type="text" name="${status.expression}"><c:out value='${status.value}'/></textarea>
                                                        <c:forEach items="${status.errorMessages}" var="error">
                                                            <span class="message warning"><c:out value="${error}"/></span>
                                                        </c:forEach>
                                                    </label>
                                                </spring:bind>

							                </fieldset>

                                            <fieldset id="outputFormat" class="group">

                                                <spring:bind path="job.outputFormats">
                                                    <input type="hidden" name="_${status.expression}"/>
                                                    <legend class=""><span><spring:message code="report.scheduling.job.edit.output.label.outputFormat"/></span></legend>
                                                    <ul class="list inputSet">
                                                        <c:forEach var="outputFormat" items="${requestScope.allOutputFormats}">
                                                            <li class="leaf">
                                                                <div class="control checkBox">
                                                                     <label class="wrap" for="box_${outputFormat.code}" title="<spring:message code="${outputFormat.labelMessage}.tooltip"/>">
                                                                         <spring:message code="${outputFormat.labelMessage}"/>
                                                                     </label>
                                                                     <input class="" id="box_${outputFormat.code}" name="${status.expression}" value="${outputFormat.code}" type="checkbox"
                                                                           <%= status.getValue() != null && ((Set) status.getValue()).contains(new Byte(((ByteEnum) pageContext.getAttribute("outputFormat")).getCode())) ? "checked" : "" %>
                                                                    />
                                                                </div>
                                                            </li>
                                                        </c:forEach>
                                                    </ul>
                                                </spring:bind>

                                            </fieldset>

                                            <c:if test="${!(empty requestScope.outputLocales)}">
							                <fieldset id="outputLocale" class="group">

                                                <spring:bind path="job.outputLocale">
                                                    <legend class=""><span><spring:message code="report.scheduling.job.edit.output.label.locale"/></span></legend>
                                                    <select id="locale" name="${status.expression}">
                                                        <option value="" <c:if test="${empty status.value}">selected</c:if>><spring:message code="report.scheduling.job.edit.output.locale.default"/></option>
                                                        <c:forEach items="${requestScope.outputLocales}" var="locale">
                                                            <option value="${locale.code}" <c:if test="${status.value == locale.code}">selected</c:if>>
                                                                <spring:message code="locale.option" arguments='<%= new String[]{((UserLocale) pageContext.getAttribute("locale")).getCode(), ((UserLocale) pageContext.getAttribute("locale")).getDescription()} %>'/>
                                                            </option>
                                                        </c:forEach>
                                                   </select>
                                                    <span class="${status.error ? "error" : ""}">
                                                        <c:forEach items="${status.errorMessages}" var="error">
                                                          <span class="message warning"><c:out value="${error}"/></span>
                                                        </c:forEach>
                                                    </span>
                                                </spring:bind>

                                            </fieldset>
                                            </c:if>

						                	<fieldset id="email" class="group">
							                    <legend class=""><span><spring:message code="report.scheduling.job.edit.email.header"/></span></legend>

                                                <spring:bind path="job.mailNotification.toAddresses">
                                                    <label class="control input text ${status.error ? "error" : ""}" for="email_to">
                                                        <span class="wrap"><spring:message code="report.scheduling.job.edit.email.label.to"/></span>
                                                        <input class="" id="email_to" type="text" name="${status.expression}" value="${status.value}" title="<spring:message code="report.scheduling.job.edit.email.label.to.title"/>" maxlength="1000"/>
                                                        <span class="message hint"><spring:message code="report.scheduling.job.edit.email.label.to.hint"/></span>
                                                        <c:forEach items="${status.errorMessages}" var="error">
                                                            <span class="message warning"><c:out value="${error}"/></span>
                                                        </c:forEach>
                                                    </label>
                                                </spring:bind>


                                                <spring:bind path="job.mailNotification.subject">
                                                    <label class="control input text ${status.error ? "error" : ""}" class="required" for="email_subject">
                                                        <span class="wrap"><spring:message code="report.scheduling.job.edit.email.label.subject"/></span>
                                                        <input class="" id="email_subject" type="text" name="${status.expression}" value="${status.value}" title="<spring:message code="report.scheduling.job.edit.email.label.subject.title"/>" maxlength="100"/>
                                                        <c:forEach items="${status.errorMessages}" var="error">
                                                            <span class="message warning"><c:out value="${error}"/></span>
                                                        </c:forEach>
                                                    </label>
                                                </spring:bind>


                                                <spring:bind path="job.mailNotification.messageText">
                                                    <label class="control textArea ${status.error ? "error" : ""}" for="email_message">
                                                        <span class="wrap"><spring:message code="report.scheduling.job.edit.email.label.message"/></span>
                                                        <textarea class="" id="email_message" name="${status.expression}" type="text"><c:out value="${status.value}"/></textarea>
                                                        <c:forEach items="${status.errorMessages}" var="error">
                                                            <span class="message warning"><c:out value="${error}"/></span>
                                                        </c:forEach>
                                                    </label>
                                                </spring:bind>


                                                <ul class="list inputSet">

                                                    <spring:bind path="job.mailNotification.resultSendType">
                                                        <input type="hidden" id="attach" name="${status.expression}" value="${status.value}"/>
                                                        <li class="leaf">
						        							<div class="control checkBox ${status.error ? "error" : ""}"  title="<spring:message code="report.scheduling.job.edit.parameters.tooltip.attach.output"/>">
			                       								<label for="attachBox" class="wrap"><spring:message code="report.scheduling.job.edit.email.label.attachFiles"/></label>
                                                                <input class="" id="attachBox" type="checkbox" <c:if test="${status.value == 2}">checked</c:if>/>
                                                                <c:forEach items="${status.errorMessages}" var="error">
                                                                    <span class="message warning"><c:out value="${error}"/></span>
                                                                </c:forEach>
			                   								</div>
						        						</li>
                                                    </spring:bind>

                                                    <spring:bind path="job.mailNotification.skipEmptyReports">
						        						<li class="leaf">
							        						<div class="control checkBox ${status.error ? "error" : ""}"  title="<spring:message code="report.scheduling.job.edit.parameters.tooltip.attach.defer.email"/>">
			                       								<label for="skipEmpty" class="wrap"><spring:message code="report.scheduling.job.edit.email.label.skipEmptyReports"/></label>
                                                                <input type="hidden" name="_${status.expression}" value="${status.value}"/>
			                        							<input class="" id="skipEmpty" type="checkbox" name="${status.expression}" <c:if test="${status.value}">checked</c:if>/>
                                                                <c:forEach items="${status.errorMessages}" var="error">
                                                                    <span class="message warning"><c:out value="${error}"/></span>
                                                                </c:forEach>
			                   								</div>
						        						</li>
                                                    </spring:bind>

                                                </ul>
						                	</fieldset>
									</t:putAttribute>
									</t:insertTemplate>
									<!-- end two columns -->
												
					</fieldset><!--/.row.inputs-->
					</div>
				<t:putAttribute name="footerContent">
					<fieldset id="wizardNav">
						<button id="previous" type="submit" class="button action up"><span class="wrap"><spring:message code='button.previous'/></span><span class="icon"></span></button>
						<button id="next" type="submit" class="button action up"><span class="wrap"><spring:message code='button.next'/></span><span class="icon"></span></button>
						<button id="done" type="submit" class="button primary action up"><span class="wrap"><spring:message code='button.submit'/></span><span class="icon"></span></button>
						<button id="cancel" type="submit" class="button action up"><span class="wrap"><spring:message code='button.cancel'/></span><span class="icon"></span></button>
				    </fieldset>
				</t:putAttribute>

			</t:putAttribute>	    
		</t:insertTemplate>
		
    </form>
    <div id="ajaxbuffer"></div>

    <t:insertTemplate template="/WEB-INF/jsp/templates/selectFromRepository.jsp">
        <t:putAttribute name="containerClass">hidden</t:putAttribute>
        <t:putAttribute name="bodyContent">
            <ul class="responsive collapsible folders hideRoot" id="repoTree"> </ul>
        </t:putAttribute>
    </t:insertTemplate>

    </t:putAttribute>

</t:insertTemplate>