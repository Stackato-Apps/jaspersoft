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
<%@ page import="com.jaspersoft.jasperserver.war.action.ReportParametersAction" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/spring" prefix="spring"%>
<%@ taglib uri="/WEB-INF/jasperserver.tld" prefix="js" %>

<c:set var="maxMultiSelectSize" value="7"/>
<%-- Define null substitute for jsp context --%>
<% pageContext.setAttribute("nullSubstitute", ReportParametersAction.NULL_SUBSTITUTE);%>
<% pageContext.setAttribute("nullSubstituteLabel", ReportParametersAction.NULL_SUBSTITUTE_LABEL);%>
<% pageContext.setAttribute("nothingSubstitute", ReportParametersAction.NOTHING_SUBSTITUTE);%>
<% pageContext.setAttribute("nothingSubstituteLabel", ReportParametersAction.NOTHING_SUBSTITUTE_LABEL);%>

<c:set var="hasValueError" value="false"/>
<c:set var="wrappersUUIDkey" value="${wrappersUUID}"/>

<c:forEach items="${sessionScope.wrappers[wrappersUUIDkey]}" var="wrapper">
	<c:if test="${not empty wrapper.errorMessage}">
		<c:set var="hasErrors" value="true"/>
	</c:if>
</c:forEach>

<li class="hidden"><%-- accordingly to doctype only <li> tags shoud be placed inside <ul> so wrapping everything with <li> --%>
    <input type="hidden" name="report" value="${param.report}"/>
    <input type="hidden" id="reportUnitURI" value="${requestScope.reportUnitObject.URI}">	<%-- this is needed for cascading logic --%>
    <input type="hidden" name="_flowExecutionKey" value="${flowExecutionKey}"/>
    <input type="hidden" id="_inputValuesErrors" value="${hasErrors}"/>
</li>

<c:remove var="hasErrors"/>

	<c:forEach items="${sessionScope.wrappers[wrappersUUIDkey]}" var="wrapper">
		<c:set value="${wrapper.inputControl}" var="control" scope="page"/>
		<c:set value="${inputNamePrefix != null ? inputNamePrefix : ''}${control.name}" var="inputName"/>
		<c:set value="${readOnlyForm or control.readOnly}" var="readOnly"/>

        <li class="hidden"><%-- accordingly to doctype only <li> tags shoud be placed inside <ul> so wrapping everything with <li> --%>
            <script>
              if (typeof firstInputControlName == 'undefined' || !firstInputControlName) {
                var firstInputControlName = '<c:out value="${inputName}"/>';
              }

              maxMultiSelectSize = "${maxMultiSelectSize}";
              resetButtonLabel = '<spring:message code="button.reset" javaScriptEscape="true"/>';
            </script>

            <c:if test="${!control.visible}">
                <c:set var="controlHiddenValue" value="${wrapper.formattedValue}"/>
                <%-- if no default value and the input control type is InputControl.TYPE_SINGLE_SELECT_QUERY --%>
                <c:if test="${empty controlHiddenValue and control.type == 4}">
                    <c:forEach items="${wrapper.queryResults}" var="item" varStatus="status">
                        <%-- if only one value, set it --%>
                        <c:if test="${status.first and status.last}">
                            <c:set var="controlHiddenValue" value="${item.key}"/>
                        </c:if>
                    </c:forEach>
                </c:if>
                <input type="hidden" name="<c:out value="${inputName}"/>" value="${controlHiddenValue}"/>
            </c:if>
        </li>
		<c:if test="${control.visible}">

			<c:choose>

				<%-- ##########   BOOLEAN   ########## --%>
				<c:when test="${control.type == 1}">  <%-- Boolean : InputControl.TYPE_BOOLEAN --%>
                    <li class="leaf" id="jsCtrl_${inputName}">
                        <label class="control input checkBox" for="${inputName}" title="<spring:message code="input.control.tooltip.filter.value"/>">
                            <span class="wrap">
                                <js:inputControlLabel control="${wrapper}" messageSource="${messageSource}"/>
                            </span>
                            <input class="" id="${inputName}" name="${inputName}" type="checkbox"
                                   <c:if test="${readOnly}">disabled</c:if>
                                   <c:if test="${wrapper.value}">checked</c:if>
                                   onchange="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly} );"
                                    />
                        </label>
                        <c:set var="initAggregate_1">
                            initAggregate('${wrapper.resourceUriPrefix}', '${inputName}', ${control.type}, ${readOnly},
                                                        <c:choose><c:when test="${wrapper.value}">'true'</c:when><c:otherwise>'false'</c:otherwise></c:choose>);
                        </c:set>
                        <script>
                            ${initAggregate_1}
                        </script>
                        <textarea name="_evalScript" class="hidden" style="display:none">
                            ${initAggregate_1}
                        </textarea>
                    </li>
				</c:when>


				<%-- ##########   SINGLE_VALUE   ########## --%>
				<c:when test="${control.type == 2}">  <%-- Single value : InputControl.TYPE_SINGLE_VALUE --%>
                    <li class="leaf" id="jsCtrl_${inputName}">
                        <c:choose>
                            <c:when test="${control.dataType.localResource.type == 3 or control.dataType.localResource.type == 4}">
                                <c:set var="controlClass" value="picker"/>
                            </c:when>
                            <c:otherwise>
                                <c:set var="controlClass" value="text"/>
                            </c:otherwise>
                        </c:choose>
                        <label class="control input ${controlClass}" for="${inputName}" title="<spring:message code="input.control.tooltip.filter.value"/>">
                            <span class="wrap">
                                <js:inputControlLabel control="${wrapper}" messageSource="${messageSource}"/>:
                            </span>
                            <c:choose>
                                <c:when test="${control.dataType.localResource.type == 3}">
                                    <js:calendarInput name="${inputName}" value="${wrapper.formattedValue}"
                                        formatPattern="${requestScope.calendarDatePattern}"
                                        readOnly="${readOnly}" time="false"
                                        imageTipMessage="jsp.defaultParametersForm.pickDate"
                                        onchange="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});"/>
                                </c:when>
                                <c:when test="${control.dataType.localResource.type == 4}">
                                    <js:calendarInput name="${inputName}" value="${wrapper.formattedValue}"
                                        formatPattern="${requestScope.calendarDatetimePattern}"
                                        readOnly="${readOnly}"
                                        imageTipMessage="jsp.defaultParametersForm.pickDate"
                                        onchange="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});"/>
                                </c:when>
                                <c:otherwise>
                                    <input type="text" name="<c:out value="${inputName}"/>" id="<c:out value="${inputName}"/>" value="<c:out value="${wrapper.formattedValue}"/>" <c:if test="${readOnly}">disabled</c:if>
                                        onchange="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});"/>
                                </c:otherwise>
                            </c:choose>
                            <c:if test="${wrapper.errorMessage != null}">
                                <c:set var="hasValueError" value="true"/>
                            </c:if>
                            <div id="error_${inputName}"></div>
                            <span class="message warning"><c:out value="${wrapper.errorMessage}"/></span>
                       </label>
                        <c:set var="initAggregate_2">
                            initAggregate('${wrapper.resourceUriPrefix}'  ,'${inputName}',${control.type}, ${readOnly}, '<spring:escapeBody javaScriptEscape="true">${wrapper.formattedValue}</spring:escapeBody>');
                        </c:set>
                        <script>
                            ${initAggregate_2}
                        </script>
                        <textarea name="_evalScript" class="hidden" style="display:none">
                            ${initAggregate_2}
                        </textarea>
                    </li>
				</c:when>


				<%-- ##########   SINGLE_SELECT_LIST_OF_VALUES   ########## --%>
				<c:when test="${control.type == 3}">  <%-- Single value selected from list: InputControl.TYPE_SINGLE_SELECT_LIST_OF_VALUES --%>
                    <li class="leaf" id="jsCtrl_${inputName}">
                        <label class="control select" for="${inputName}" title="<spring:message code="input.control.tooltip.filter.value"/>">
                            <span class="wrap">
                                <js:inputControlLabel control="${wrapper}" messageSource="${messageSource}"/>:
                            </span>
                            <select id="<c:out value="${inputName}"/>" name="<c:out value="${inputName}"/>" <c:if test="${readOnly}">disabled</c:if>
                                onchange="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});">
                                <c:if test="${!control.mandatory}"><option value=""/></c:if>
                                <c:forEach items="${control.listOfValues.localResource.values}" var="item">
                                    <option value="<c:out value="${item.value}"/>" <c:if test="${wrapper.value == item.value}">selected</c:if>><js:label key="${item.label}" messageSource="${messageSource}"/></option>
                                </c:forEach>
                            </select>
                            <c:if test="${wrapper.errorMessage != null}">
                                <c:set var="hasValueError" value="true"/>
                            </c:if>
                            <div id="error_${inputName}"></div>
                            <span class="message warning"><c:out value="${wrapper.errorMessage}"/></span>
                        </label>
                        <c:set var="initAggregate_3">
                            initAggregate('${wrapper.resourceUriPrefix}'  ,'${inputName}', ${control.type}, ${readOnly}, '<spring:escapeBody javaScriptEscape="true">${wrapper.value}</spring:escapeBody>');
                        </c:set>
                        <script>
                            ${initAggregate_3}
                        </script>
                        <textarea name="_evalScript" class="hidden" style="display:none">
                            ${initAggregate_3}
                        </textarea>
                    </li>
				</c:when>


				<%-- ##########   MULTI_SELECT_LIST_OF_VALUES   ########## --%>
                <c:when test="${control.type == 6}">  <%-- Multi value selected from list: InputControl.TYPE_MULTI_SELECT_LIST_OF_VALUES --%>
                    <li class="leaf" id="jsCtrl_${inputName}">
                        <label class="control select multiple" for="${inputName}" title="<spring:message code="input.control.tooltip.filter.value"/>">
                            <span class="wrap">
                                <js:inputControlLabel control="${wrapper}" messageSource="${messageSource}"/>:
                            </span>
                            <select id="<c:out value="${inputName}"/>" name="<c:out value="${inputName}"/>" multiple="multiple" <c:if test="${readOnly}">disabled</c:if>
                                    <c:choose>
                                            <c:when test="${wrapper.collectionSize le maxMultiSelectSize}">
                                                    size="${wrapper.collectionSize}"
                                            </c:when>
                                            <c:otherwise>
                                                    size="${maxMultiSelectSize}"
                                            </c:otherwise>
                                    </c:choose>
                                    <c:if test="${readOnly}">disabled</c:if>
                                    onchange="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});"
                            >
                                    <c:forEach items="${control.listOfValues.localResource.values}" var="item">
                                            <option value="<c:out value="${item.value}"/>"
                                                    <c:if test="${wrapper.collectionValueIndicator[item.value]}">selected="selected"</c:if>
                                            ><js:label key="${item.label}" messageSource="${messageSource}"/></option>
                                    </c:forEach>
                            </select>
                            <c:if test="${wrapper.errorMessage != null}">
                                <c:set var="hasValueError" value="true"/>
                            </c:if>
                            <div id="error_${inputName}"></div>
                            <span class="message warning"><c:out value="${wrapper.errorMessage}"/></span>
                        </label>
                        <c:set var="initAggregate_4">
                            initAggregate('${wrapper.resourceUriPrefix}'  ,'${inputName}', ${control.type}, ${readOnly}, '<spring:escapeBody javaScriptEscape="true">${wrapper.collectionValueIndicator}</spring:escapeBody>' );
                        </c:set>
                        <script>
                            ${initAggregate_4}
                        </script>
                        <textarea name="_evalScript" class="hidden" style="display:none">
                            ${initAggregate_4}
                        </textarea>
                    </li>
				</c:when>

				
				
				<%-- ##########    SINGLE_SELECT_QUERY    ########## --%>
				<c:when test="${control.type == 4}">  <%-- Single value selected from list created from a query: InputControl.TYPE_SINGLE_SELECT_QUERY --%>
                    <li class="leaf" id="jsCtrl_${inputName}">
                        <label class="control select" for="${inputName}" title="<spring:message code="input.control.tooltip.filter.value"/>">
                            <span class="wrap">
                                <js:inputControlLabel control="${wrapper}" messageSource="${messageSource}"/>:
                            </span>

                            <div id="jsSaved_${inputName}">
                                <select id="<c:out value="${inputName}"/>" name="<c:out value="${inputName}"/>" <c:if test="${readOnly}">disabled</c:if>
                                    onchange="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});">
                                    <c:if test="${!control.mandatory}">
                                        <option value="<c:out value="${pageScope.nothingSubstitute}"/>" <c:if test="${wrapper.value == wrapper.controlInfo.defaultValue}">selected="selected"</c:if>><c:out value="${pageScope.nothingSubstituteLabel}"/></option>
                                    </c:if>
                                    <c:forEach items="${wrapper.queryResults}" var="item" varStatus="status">
                                        <c:choose>
                                            <c:when test="${item.key == null}">
                                                <%--<c:if test="${control.mandatory}">--%>
                                                    <option value="<c:out value="${pageScope.nullSubstitute}"/>" <c:if test="${item.key == wrapper.value}">selected="selected"</c:if>><c:out value="${pageScope.nullSubstituteLabel}"/></option>
                                                <%--</c:if>--%>
                                            </c:when>
                                            <c:otherwise>
                                                <option value="<c:out value="${item.key}"/>" <c:if test="${item.key == wrapper.value}">selected="selected"</c:if>><c:out value="${item.value[1]}"/></option>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                </select>
                            </div>

                            <c:if test="${wrapper.errorMessage != null}">
                                <c:set var="hasValueError" value="true"/>
                            </c:if>
                            <div id="error_${inputName}"></div>
                            <span class="message warning"><c:out value="${wrapper.errorMessage}"/></span>
                        </label>
                        <c:set var="initAggregate_5">
                            initAggregate('${wrapper.resourceUriPrefix}'  ,'${inputName}',${control.type}, ${readOnly}, '<spring:escapeBody javaScriptEscape="true">${wrapper.value}</spring:escapeBody>');
                        </c:set>
                        <script>
                            ${initAggregate_5}
                        </script>
                        <textarea name="_evalScript" class="hidden" style="display:none">
                            ${initAggregate_5}
                        </textarea>
                    </li>
				</c:when>

				
				
				<%-- ##########    MULTI_SELECT_QUERY    ########## --%>
				<c:when test="${control.type == 7}">  <%-- Multi value selected from list created from a query: InputControl.TYPE_MULTI_SELECT_QUERY --%>
                    <li class="leaf" id="jsCtrl_${inputName}">
                        <label class="control select multiple" for="${inputName}" title="<spring:message code="input.control.tooltip.filter.value"/>">
                            <span class="wrap">
                                <js:inputControlLabel control="${wrapper}" messageSource="${messageSource}"/>:
                            </span>
                            <select multiple="multiple" id="<c:out value="${inputName}"/>" name="<c:out value="${inputName}"/>" <c:if test="${readOnly}">disabled</c:if>
                                    <c:choose>
                                            <c:when test="${wrapper.collectionSize le maxMultiSelectSize}">
                                                    size="${wrapper.collectionSize}"
                                            </c:when>
                                            <c:otherwise>
                                                    size="${maxMultiSelectSize}"
                                            </c:otherwise>
                                    </c:choose>
                                    <c:if test="${readOnly}">disabled</c:if>
                                            onchange="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});">
                                    <c:forEach items="${wrapper.queryResults}" var="item" varStatus="status">
                                        <c:choose>
                                            <c:when test="${item.key == null}">
                                                <option value="<c:out value="${pageScope.nullSubstitute}"/>" <c:if test="${wrapper.collectionValueIndicator[pageScope.nullSubstitute]}">selected="selected"</c:if>><c:out value="${pageScope.nullSubstituteLabel}"/></option>
                                            </c:when>
                                            <c:otherwise>
                                                <option value="<c:out value="${item.key}"/>" <c:if test="${wrapper.collectionValueIndicator[item.key]}">selected="selected"</c:if>><c:out value="${item.value[1]}"/></option>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                            </select>
                            <c:if test="${wrapper.errorMessage != null}">
                                <c:set var="hasValueError" value="true"/>
                            </c:if>
                            <div id="error_${inputName}"></div>
                            <span class="message warning"><c:out value="${wrapper.errorMessage}"/></span>
                        </label>
                        <c:set var="initAggregate_6">
                            initAggregate('${wrapper.resourceUriPrefix}'  ,'${inputName}',${control.type}, ${readOnly}, '<spring:escapeBody javaScriptEscape="true">${wrapper.collectionValueIndicator}</spring:escapeBody>');
                        </c:set>
                        <script>
                            ${initAggregate_6}
                        </script>
                        <textarea name="_evalScript" class="hidden" style="display:none">
                            ${initAggregate_6}
                        </textarea>
                    </li>
 				</c:when>

				

				<%-- ##########    SINGLE_SELECT_LIST_OF_VALUES_RADIO    ########## --%>
                <c:when test="${control.type == 8}">    <%-- InputControl.TYPE_SINGLE_SELECT_LIST_OF_VALUES_RADIO --%>
                    <li class="leaf" id="jsCtrl_${inputName}">
                        <label class="control select multiple" for="${inputName}" title="<spring:message code="input.control.tooltip.filter.value"/>">
                            <span class="wrap">
                                <js:inputControlLabel control="${wrapper}" messageSource="${messageSource}"/>:
                            </span>
                            <ul class="list inputSet">
                               <c:forEach items="${control.listOfValues.localResource.values}" var="item" varStatus="it">
                                   <c:if test="${it.count == 1 and !control.mandatory}">
                                       <li class="">
                                           <button class="button action up" onclick="if (resetRadio(this.form.${inputName})) { ${onInputChange}; }">
                                               <span class="wrap"><spring:message code="button.reset"/></span>
                                           </button>
                                       </li>
                                   </c:if>

                                   <li class="">
                                       <label class="radio">
                                           <input type="radio" name="<c:out value="${inputName}"/>" value="<c:out value="${item.value}"/>" style="position:relative"
                                               <c:if test="${wrapper.value == item.value}">checked="checked"</c:if>
                                               <c:if test="${readOnly}">disabled="disabled"</c:if>
                                               onclick="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});"
                                           />
                                           <span class=""><js:label key="${item.label}" messageSource="${messageSource}"/></span>
                                       </label>
                                   </li>
                               </c:forEach>
                           </ul>
                            <c:if test="${wrapper.errorMessage != null}">
                                <c:set var="hasValueError" value="true"/>
                            </c:if>
                            <div id="error_${inputName}"></div>
                            <span class="message warning"><c:out value="${wrapper.errorMessage}"/></span>
                        </label>
                        <c:set var="initAggregate_7">
                            initAggregate('${wrapper.resourceUriPrefix}'  ,'${inputName}',${control.type}, ${readOnly}, '<spring:escapeBody javaScriptEscape="true">${wrapper.value}</spring:escapeBody>');
                        </c:set>
                        <script>
                            ${initAggregate_7}
                        </script>
                        <textarea name="_evalScript" class="hidden" style="display:none">
                            ${initAggregate_7}
                        </textarea>
                    </li>
                </c:when>



                <%-- ##########    SINGLE_SELECT_QUERY_RADIO    ########## --%>
                <c:when test="${control.type == 9}">  <%-- InputControl.TYPE_SINGLE_SELECT_QUERY_RADIO --%>
                    <li class="leaf" id="jsCtrl_${inputName}">
                        <label class="control select multiple" for="${inputName}" title="<spring:message code="input.control.tooltip.filter.value"/>">
                            <span class="wrap">
                                <js:inputControlLabel control="${wrapper}" messageSource="${messageSource}"/>:
                            </span>
                            <ul class="list inputSet">
                               <c:forEach items="${wrapper.queryResults}" var="item" varStatus="it">
                                   <c:if test="${it.first and !control.mandatory}">
                                       <li class="">
                                           <button class="button action up"
                                                   onclick="if (resetRadio(this.form.${inputName})) { fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly}); }">
                                               <span class="wrap"><spring:message code="button.reset"/></span>
                                           </button>
                                       </li>
                                   </c:if>

                                   <li class="">
                                       <label class="radio">
                                           <c:choose>
                                               <c:when test="${item.key == null}">
                                                   <c:if test="${control.mandatory}">
                                                       <input type="radio" name="<c:out value="${inputName}"/>" value="<c:out value="${pageScope.nullSubstitute}"/>" style="position:relative"
                                                           <c:if test="${wrapper.value == item.key}">checked="checked"</c:if>
                                                           <c:if test="${readOnly}">disabled="disabled"</c:if>
                                                           onclick="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});"
                                                       />
                                                       <span class=""><c:out value="${pageScope.nullSubstituteLabel}"/></span>
                                                   </c:if>
                                               </c:when>
                                               <c:otherwise>
                                                   <input type="radio" name="<c:out value="${inputName}"/>" value="<c:out value="${item.key}"/>" style="position:relative"
                                                       <c:if test="${wrapper.value == item.key}">checked="checked"</c:if>
                                                       <c:if test="${readOnly}">disabled="disabled"</c:if>
                                                       onclick="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});"
                                                   />
                                                   <span class=""><c:out value="${item.value[1]}"/></span>
                                               </c:otherwise>
                                           </c:choose>
                                       </label>
                                   </li>
                               </c:forEach>
                           </ul>
                            <c:if test="${wrapper.errorMessage != null}">
                                <c:set var="hasValueError" value="true"/>
                            </c:if>
                            <div id="error_${inputName}"></div>
                            <span class="message warning"><c:out value="${wrapper.errorMessage}"/></span>
                        </label>
                        <c:set var="initAggregate_8">
                            initAggregate('${wrapper.resourceUriPrefix}'  ,'${inputName}',${control.type}, ${readOnly}, '<spring:escapeBody javaScriptEscape="true">${wrapper.value}</spring:escapeBody>');
                        </c:set>
                        <script>
                            ${initAggregate_8}
                        </script>
                        <textarea name="_evalScript" class="hidden" style="display:none">
                            ${initAggregate_8}
                        </textarea>
                    </li>
                </c:when>


				
				<%-- ##########    MULTI_SELECT_LIST_OF_VALUES_CHECKBOX    ########## --%>
                <c:when test="${control.type == 10}">   <%-- InputControl.TYPE_MULTI_SELECT_LIST_OF_VALUES_CHECKBOX --%>
                    <li class="leaf" id="jsCtrl_${inputName}">
                        <label class="control select multiple" for="${inputName}" title="<spring:message code="input.control.tooltip.filter.value"/>">
                            <span class="wrap">
                                <js:inputControlLabel control="${wrapper}" messageSource="${messageSource}"/>:
                            </span>
                            <ul class="list inputSet">
                               <c:forEach items="${control.listOfValues.localResource.values}" var="item" varStatus="it">
                                   <li class="">
                                       <label class="checkBox">
                                           <input type="checkbox" name="<c:out value="${inputName}"/>" value="<c:out value="${item.value}"/>" style="position:relative"
                                               <c:if test="${readOnly}">disabled="disabled"</c:if>
                                               <c:if test="${wrapper.collectionValueIndicator[item.value]}">checked="checked"</c:if>
                                               onclick="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});"
                                           />
                                           <span class=""><js:label key="${item.label}" messageSource="${messageSource}"/></span>
                                       </label>
                                   </li>
                               </c:forEach>
                           </ul>
                            <c:if test="${wrapper.errorMessage != null}">
                                <c:set var="hasValueError" value="true"/>
                            </c:if>
                            <div id="error_${inputName}"></div>
                            <span class="message warning"><c:out value="${wrapper.errorMessage}"/></span>
                        </label>
                        <c:set var="initAggregate_9">
                            initAggregate('${wrapper.resourceUriPrefix}'  ,'${inputName}',${control.type}, ${readOnly}, '<spring:escapeBody javaScriptEscape="true">${wrapper.collectionValueIndicator}</spring:escapeBody>');
                        </c:set>
                        <script>
                            ${initAggregate_9}
                        </script>
                        <textarea name="_evalScript" class="hidden" style="display:none">
                            ${initAggregate_9}
                        </textarea>
                    </li>
                </c:when>


				
				<%-- ##########    MULTI_SELECT_QUERY_CHECKBOX    ########## --%>
                <c:when test="${control.type == 11}">    <%-- InputControl.TYPE_MULTI_SELECT_QUERY_CHECKBOX --%>
                    <li class="leaf" id="jsCtrl_${inputName}">
                        <label class="control select multiple" for="${inputName}" title="<spring:message code="input.control.tooltip.filter.value"/>">
                            <span class="wrap">
                                <js:inputControlLabel control="${wrapper}" messageSource="${messageSource}"/>:
                            </span>
                            <ul class="list inputSet">
                               <c:forEach items="${wrapper.queryResults}" var="item" varStatus="it">
                                    <li class="">
                                        <label class="checkBox">
                                             <c:choose>
                                                 <c:when test="${item.key == null}">
                                                     <input type="checkbox" name="<c:out value="${inputName}"/>" value="<c:out value="${pageScope.nullSubstitute}"/>" style="position:relative"
                                                         <c:if test="${readOnly}">disabled="disabled"</c:if>
                                                         <c:if test="${wrapper.collectionValueIndicator[pageScope.nullSubstitute]}">checked="checked"</c:if>
                                                         onclick="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});"
                                                     />
                                                     <span class=""><c:out value="${pageScope.nullSubstituteLabel}"/></span>
                                                 </c:when>
                                                 <c:otherwise>
                                                     <input type="checkbox" name="<c:out value="${inputName}"/>" value="<c:out value="${item.key}"/>" style="position:relative"
                                                         <c:if test="${readOnly}">disabled="disabled"</c:if>
                                                         <c:if test="${wrapper.collectionValueIndicator[item.value[0]]}">checked="checked"</c:if>
                                                         onclick="fireCascade('${requestScope.reportUnitObject.URI}','${wrapper.resourceUriPrefix}','${inputName}', ${control.type}, ${readOnly});"
                                                     />
                                                     <span class=""><c:out value="${item.value[1]}"/></span>
                                                 </c:otherwise>
                                             </c:choose>
                                        </label>
                                    </li>
                               </c:forEach>
                           </ul>
                            <c:if test="${wrapper.errorMessage != null}">
                                <c:set var="hasValueError" value="true"/>
                            </c:if>
                            <div id="error_${inputName}"></div>
                            <span class="message warning"><c:out value="${wrapper.errorMessage}"/></span>
                        </label>
                        <c:set var="initAggregate_10">
                            initAggregate('${wrapper.resourceUriPrefix}'  ,'${inputName}',${control.type}, ${readOnly}, '<spring:escapeBody javaScriptEscape="true">${wrapper.collectionValueIndicator}</spring:escapeBody>');
                        </c:set>
                        <script>
                            ${initAggregate_10}
                        </script>
                        <textarea name="_evalScript" class="hidden" style="display:none">
                            ${initAggregate_10}
                        </textarea>
                    </li>
                </c:when>

				<c:otherwise>
					<li class="leaf"><c:out value="${control.label}"/>&nbsp;<b><spring:message code="jsp.defaultParametersForm.notImplemented"/></b></li>
				</c:otherwise>

			</c:choose>

		</c:if>
	</c:forEach>

	<%-- call server to initialize image of parameter inputs --%>
    <c:set var="initCascadeScript">
        <c:choose>
            <c:when test="${not empty reportOptionsURI}">
                    autoCascade('${requestScope.reportUnitObject.URI}','${reportOptionsURI}');
            </c:when>
            <c:otherwise>
                    initCascade('${requestScope.reportUnitObject.URI}');
            </c:otherwise>
        </c:choose>
    </c:set>

<li class="hidden">
	<script>
        ${initCascadeScript}
	</script>
    <textarea name="_evalScript" class="hidden" style="display:none">
        ${initCascadeScript}
    </textarea>
</li>