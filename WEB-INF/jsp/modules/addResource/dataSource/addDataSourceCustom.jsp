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
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ page import="com.jaspersoft.jasperserver.war.dto.StringOption" %>


<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle">
        <c:choose>
            <c:when test="${dataResource.editMode}"><spring:message
                    code="resource.datasource.jdbc.page.title.edit"/></c:when>
            <c:otherwise><spring:message code="resource.datasource.jdbc.page.title.add"/></c:otherwise>
        </c:choose>
    </t:putAttribute>
    <t:putAttribute name="bodyID" value="addResource_dataSource_JDBC"/>
    <t:putAttribute name="bodyClass" value="oneColumn flow wizard oneStep"/>

    <t:putAttribute name="headerContent">
        <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/resource.base.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/resource.dataSource.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/scripts/resource.locate.js"></script>
    </t:putAttribute>

    <t:putAttribute name="bodyContent">
        <form method="post">
            <input id="theFirstButtonInForm" class="hidden" type="submit"/>

            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                <t:putAttribute name="containerClass" value="column decorated primary"/>
                <t:putAttribute name="containerTitle">
                    <c:choose>
                        <c:when test="${dataResource.editMode}"><spring:message code='resource.dataSource.title.edit'/></c:when>
                        <c:otherwise><spring:message code='resource.dataSource.title.add'/></c:otherwise>
                    </c:choose>
                </t:putAttribute>

                <t:putAttribute name="swipeScroll" value="${isIPad}"/>

                <t:putAttribute name="bodyContent">
                    <div id="flowControls"></div>
                    <div id="stepDisplay">
                        <fieldset class="row instructions">
                            <legend class="offLeft"><span><spring:message
                                    code='resource.dataSource.instructions'/></span></legend>
                            <h2 class="textAccent02"><spring:message code='resource.dataSource.instructions1'/></h2>
                            <h4><spring:message code='resource.dataSource.instructions2'/></h4>
                        </fieldset>

                        <fieldset class="row inputs oneColumn">
                            <legend class="offLeft"><span><spring:message code='resource.dataSource.inputs'/></span>
                            </legend>

                            <t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
                                <t:putAttribute name="containerClass" value="column primary"/>
                                <t:putAttribute name="containerTitle"><spring:message code='resource.dataSource.type'/></t:putAttribute>
                                <t:putAttribute name="headerContent">
                                    <label class="control select inline" for="typeID" title="Data Source Type">
                                        <span class="wrap offLeft"><spring:message
                                                code='resource.dataSource.dstype'/></span>
                                        <select id="typeID" name="type"
                                                <c:if test='${dataResource.editMode}'>disabled="disabled"</c:if>>
                                            <option value="bean"><spring:message
                                                    code='resource.dataSource.dstypeBean'/></option>
                                            <option value="jdbc"><spring:message
                                                    code='resource.dataSource.dstypeJDBC'/></option>
                                            <option value="jndi"><spring:message
                                                    code='resource.dataSource.dstypeJNDI'/></option>
                                            <c:forEach items="${allTypes}" var="type1">
                                                <option value="${type1.key}" <c:if test='${type1.key==type}'>selected="true"</c:if>>${type1.value}</option>
										    </c:forEach>
                                        </select>
                                        <span class="message warning">error message here</span>
                                    </label>

                                </t:putAttribute>

                                <t:putAttribute name="bodyContent">
                                    <fieldset class="group">
                                        <legend class="offLeft"><span><spring:message
                                                code='resource.dataSource.nameanddesc'/></span></legend>

                                        <spring:bind path="dataResource.reportDataSource.label">
                                            <label class="control input text <c:if test="${status.error}"> error </c:if>"
                                                   class="required" for="labelID"
                                                   title="<spring:message code='resource.dataSource.labelIDtitle'/>">
                                                <span class="wrap"><spring:message
                                                        code='resource.dataSource.name'/> (<spring:message
                                                        code='required.field'/>):</span>
                                                <input class="" type="text" value="${status.value}"
                                                       name="${status.expression}"
                                                       id="labelID"/>
                                            <span class="message warning">
                                                <c:if test="${status.error}">${status.errorMessage}</c:if>
                                            </span>
                                            </label>
                                        </spring:bind>

                                        <spring:bind path="dataResource.reportDataSource.name">
                                            <label class="control input text <c:if test="${status.error}"> error </c:if>"
                                                   for="nameID"
                                                   title="<spring:message code='resource.dataSource.nameIDtitle'/>">
                                            <span class="wrap"><spring:message code='resource.dataSource.resource'/>
                                                <c:choose>
                                                    <c:when test="${dataResource.editMode}"> (<spring:message
                                                            code='dialog.value.readOnly'/>):</c:when>
                                                    <c:otherwise> (<spring:message
                                                            code='required.field'/>):</c:otherwise>
                                                </c:choose>
                                            </span>
                                                <input class="" id="nameID" type="text" value="${status.value}"
                                                       name="${status.expression}"
                                                       <c:if test="${dataResource.editMode}">readonly="readonly"</c:if>/>
                                            <span class="message warning">
                                                <c:if test="${status.error}">${status.errorMessage}</c:if>
                                            </span>
                                            </label>
                                        </spring:bind>

                                        <spring:bind path="dataResource.reportDataSource.description">
                                            <label class="control textArea" for="descriptionID">
                                                <span class="wrap"><spring:message
                                                        code='resource.dataSource.description'/></span>
                                                <textarea id="descriptionID" name="${status.expression}"
                                                          type="text"><c:out value='${status.value}'/></textarea>
                                            <span class="message warning">
                                                <c:if test="${status.error}">${status.errorMessage}</c:if>
                                            </span>
                                            </label>
                                        </spring:bind>
                                    </fieldset>
                                    <fieldset class="group">
                                        <legend class="offLeft"><span><spring:message
                                                code='resource.dataSource.accessProp'/></span></legend>

                                        <c:forEach var="prop" items="${dataResource.customProperties}">
                                            <spring:bind path="dataResource.reportDataSource.propertyMap[${prop.name}]">
                                                <label class="control input text <c:if test="${status.error}"> error </c:if>"
                                                       class="required" for=""
                                                       title="">
                                                    <span class="wrap"><spring:message code="${prop.label}"/>  <c:if
                                                            test="${prop.mandatory != null}">(<spring:message
                                                            code='required.field'/>)</c:if></span>
                                                    <c:choose>
                                                        <c:when test="${prop.type eq 'boolean'}">
                                                            <input type="hidden" name="_${status.expression}"
                                                                   value="visible"/>
                                                            <input name="${status.expression}" type="checkbox"
                                                                   <c:if test="${status.value eq 'on' || status.value eq 'true'}">checked="true"</c:if>
                                                                   value="true">
                                                        </c:when>

                                                        <c:otherwise>
                                                            <c:choose>
                                                                <c:when test="${prop.displayHeight != null}">
                                                                    <textarea name="${status.expression}"
                                                                              rows="${prop.displayHeight}"
                                                                              cols="<c:choose><c:when test="${prop.displayWidth != null}">${prop.displayWidth}</c:when><c:otherwise>40</c:otherwise></c:choose>"
                                                                              class="fnormal"><c:out
                                                                            value='${status.value}'/></textarea>
                                                                </c:when>
                                                                <c:otherwise>
                                                                    <input name="${status.expression}"
                                                                           type="<c:choose><c:when test="${prop.name eq 'password'}">password</c:when><c:otherwise>text</c:otherwise></c:choose>"
                                                                           class="fnormal"
                                                                           size="<c:choose><c:when test="${prop.displayWidth != null}">${prop.displayWidth}</c:when><c:otherwise>40</c:otherwise></c:choose>"
                                                                           value="<c:out value='${status.value}'/>"/>
                                                                </c:otherwise>
                                                            </c:choose>
                                                        </c:otherwise>
                                                    </c:choose>

                                           <span class="message warning">
                                                <c:if test="${status.error}">${status.errorMessage}</c:if>
                                            </span>
                                                </label>
                                            </spring:bind>
                                        </c:forEach>
                                    </fieldset>
                                    <fieldset class="group">
                                    <spring:bind path="dataResource.reportDataSource.parentFolder">
                                        <label class="control browser<c:if test="${status.error}"> error</c:if>" for="folderUri" title="">
                                            <span class="wrap"><spring:message code="dialog.datasource.destination"/>:</span>
                                            <input id="folderUri" type="text" name="${status.expression}" value="${status.value}" <c:if test="${dataResource.editMode}">disabled="disabled"</c:if>/>
                                            <button id="browser_button" class="button action" <c:if test="${dataResource.editMode}">disabled="disabled"</c:if>><span class="wrap"><spring:message code="button.browse"/><span class="icon"></span></span></button>
                                            <c:if test="${status.error}">
                                                <span class="message warning">${status.errorMessage}</span>
                                            </c:if>
                                        </label>
                                    </spring:bind>
                                    </fieldset>
                                </t:putAttribute>
                            </t:insertTemplate>
                        </fieldset>
                        <!--/.row.inputs-->
                    </div>
                    <t:putAttribute name="footerContent">
                        <fieldset id="wizardNav">
                            <button id="previous" type="submit" class="button action up"><span
                                    class="wrap"><spring:message
                                    code='button.previous'/></span><span class="icon"></span></button>
                            <button id="next" type="submit" class="button action up"><span class="wrap"><spring:message
                                    code='button.next'/></span><span class="icon"></span></button>
                            <button id="save" type="submit" class="button primary action up"
                                    name="_eventId_save"><span
                                    class="wrap"><spring:message code='button.submit'/></span><span
                                    class="icon"></span></button>
                            <button id="dsCancel" type="submit" class="button action up" name="_eventId_cancel"><span
                                    class="wrap"><spring:message
                                    code='button.cancel'/></span><span class="icon"></span></button>
                        </fieldset>

                    </t:putAttribute>
                </t:putAttribute>
            </t:insertTemplate>

            <div id="ajaxbuffer" style="display:none"></div>
            <input type="hidden" id="_flowExecutionKey" name="_flowExecutionKey" value="${flowExecutionKey}"/>
            <input type="hidden" name="_eventId_initAction" id="submitEvent"/>
        </form>

         <t:insertTemplate template="/WEB-INF/jsp/templates/selectFromRepository.jsp">
                <t:putAttribute name="containerClass">hidden</t:putAttribute>
                <t:putAttribute name="bodyContent">
                    <ul id="addFileTreeRepoLocation"></ul>
                </t:putAttribute>
            </t:insertTemplate>

        <jsp:include page="addDataSourceState.jsp"/>
    </t:putAttribute>
</t:insertTemplate>