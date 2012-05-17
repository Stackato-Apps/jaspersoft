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
Overview:
    Usage:permit user to add a system created object to the repository.

Usage:

    <t:insertTemplate template="/WEB-INF/jsp/templates/addFolder.jsp">
    </t:insertTemplate>
    
--%>

<%@ page import="com.jaspersoft.jasperserver.api.JSException" %>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>


<t:useAttribute id="containerClass" name="containerClass" classname="java.lang.String" ignore="true"/>
<t:useAttribute id="bodyContent" name="bodyContent" classname="java.lang.String" ignore="true"/>

<!--/WEB-INF/jsp/templates/calculatedFields.jsp revision A-->
<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
    <t:putAttribute name="containerClass">panel dialog calculatedField overlay moveable centered_horz centered_vert ${containerClass}</t:putAttribute>
    <t:putAttribute name="containerID" value="calculatedField" />
    <t:putAttribute name="containerTitle">
        <spring:message code="ADH_401_CUSTOM_FIELD_DIALOG_HEADER" javaScriptEscape="true"/>
    </t:putAttribute>
    <t:putAttribute name="headerClass" value="mover"/>
    <t:putAttribute name="bodyID" cascade="true">calculatedFields-container</t:putAttribute>
    <t:putAttribute name="bodyContent">
        <ul id="calculatedFieldOptions" class="list inputSet">
            <li id="basicFunctions" class="node">
                <p class="wrap">Basic Functions</p>
                <ul class="list inputSet">
                    <li class="leaf">
                        <div class="control radio" for="ADH_404_ADD_NUM" title="">
                            <input class="" id="ADH_404_ADD_NUM" type="radio" name="functions" value="" />
                            <span class="wrap argument one">[field name]</span>
                            <span class="wrap operator">+</span>
                            <span class="wrap argument two"><input class="" id="ADH_404_ADD_NUM.input" type="text" value=""/></span>
                            <span class="message warning">error message here</span>
                        </div>
                    </li>
                    <li class="leaf">
                        <div class="control radio" for="ADH_408_SUBTRACT_NUM" title="">
                            <input class="" id="ADH_408_SUBTRACT_NUM" type="radio" name="functions" value=""/>
                            <span class="wrap argument one">[field name]</span>
                            <span class="wrap operator">-</span>
                            <span class="wrap argument two"><input class="" id="ADH_408_SUBTRACT_NUM.input" type="text" value=""/></span>
                            <span class="message warning">error message here</span>
                        </div>
                    </li>
                    <li class="leaf">
                        <div class="control radio" for="ADH_409_MULTIPLY_BY_NUM" title="">
                            <input class="" id="ADH_409_MULTIPLY_BY_NUM" type="radio" name="functions" value=""/>
                            <span class="wrap argument one">[field name]</span>
                            <span class="wrap operator">*</span>
                            <span class="wrap argument two"><input class="" id="ADH_409_MULTIPLY_BY_NUM.input" type="text" value=""/></span>
                            <span class="message warning">error message here</span>
                        </div>
                    </li>
                    <li class="leaf">
                        <div class="control radio" for="ADH_410_DIVIDE_BY_NUM" title="">
                            <input class="" id="ADH_410_DIVIDE_BY_NUM" type="radio" name="functions" value=""/>
                            <span class="wrap argument one">[field name]</span>
                            <span class="wrap operator">/</span>
                            <span class="wrap argument two"><input class="" id="ADH_410_DIVIDE_BY_NUM.input" type="text" value=""/></span>
                            <span class="message warning">error message here</span>
                        </div>
                    </li>

                    <li class="leaf">
                        <button id="swap" class="button options up"><span class="wrap">Swap</span><span class="icon"></span></button>
                    </li>

                </ul>
            </li>
            <li id="advancedFunctions" class="node">
                <p class="wrap">Advanced Functions</p>
                <ul class="list inputSet">
                    <li class="leaf">
                        <label class="control radio" for="ADH_406_ROUND" title="">
                            <input class="" id="ADH_406_ROUND" type="radio" name="functions" value=""/>
                            <span class="wrap">Round([field name])</span>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_406_RANK" title="">
                            <input class="" id="ADH_406_RANK" type="radio" name="functions" value=""/>
                            <span class="wrap">Rank([field name])</span>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_406_PERCENT" title="">
                            <input class="" id="ADH_406_PERCENT" type="radio" name="functions" value=""/>
                            <span class="wrap">% of Total([field name])</span>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_406_PERCENT_OF_ROW_PARENT" title="">
                            <input class="" id="ADH_406_PERCENT_OF_ROW_PARENT" type="radio" name="functions" value=""/>
                            <span class="wrap">% of Row Group([field name])</span>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_406_PERCENT_OF_COLUMN_PARENT" title="">
                            <input class="" id="ADH_406_PERCENT_OF_COLUMN_PARENT" type="radio" name="functions" value=""/>
                            <span class="wrap">% of Column Group([field name])</span>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                </ul>
            </li>
            <li id="dateFunctions" class="node">
                <p class="wrap">Date Difference</p>
                <ul class="list inputSet">
                    <li class="leaf">
                        <label class="control radio" for="ADH_421_DATEDIFF_SECS_UNIT" title="">
                            <span class="wrap">Seconds</span>
                            <input class="" id="ADH_421_DATEDIFF_SECS_UNIT" type="radio" name="functions" value=""/>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_421_DATEDIFF_MINS_UNIT" title="">
                            <span class="wrap">Minutes</span>
                            <input class="" id="ADH_421_DATEDIFF_MINS_UNIT" type="radio" name="functions" value=""/>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_421_DATEDIFF_HOURS_UNIT" title="">
                            <span class="wrap">Hours</span>
                            <input class="" id="ADH_421_DATEDIFF_HOURS_UNIT" type="radio" name="functions" value=""/>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_421_DATEDIFF_DAYS_UNIT" title="">
                            <span class="wrap">Days</span>
                            <input class="" id="ADH_421_DATEDIFF_DAYS_UNIT" type="radio" name="functions" value=""/>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_421_DATEDIFF_WEEKS_UNIT" title="">
                            <span class="wrap">Weeks</span>
                            <input class="" id="ADH_421_DATEDIFF_WEEKS_UNIT" type="radio" name="functions" value=""/>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_421_DATEDIFF_MONTHS_UNIT" title="">
                            <span class="wrap">Months</span>
                            <input class="" id="ADH_421_DATEDIFF_MONTHS_UNIT" type="radio" name="functions" value=""/>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_421_DATEDIFF_QUARTERS_UNIT" title="">
                            <span class="wrap">Quarters</span>
                            <input class="" id="ADH_421_DATEDIFF_QUARTERS_UNIT" type="radio" name="functions" value=""/>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_421_DATEDIFF_YEARS_UNIT" title="">
                            <span class="wrap">Years</span>
                            <input class="" id="ADH_421_DATEDIFF_YEARS_UNIT" type="radio" name="functions" value=""/>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>

                </ul>
            </li>
            <li id="multipleNumberFunctions" class="node">
                <p class="wrap">Multiple Number Functions</p>
                <ul class="list inputSet">
                    <li class="leaf">
                        <label class="control radio" for="ADH_405_ADD_ALL" title="">
                            <span class="wrap">Add All</span>
                            <input class="" id="ADH_405_ADD_ALL" type="radio" name="functions" value=""/>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                    <li class="leaf">
                        <label class="control radio" for="ADH_415_MULTIPLY_ALL" title="">
                            <span class="wrap">Multiply All</span>
                            <input class="" id="ADH_415_MULTIPLY_ALL" type="radio" name="functions" value=""/>
                            <span class="message warning">error message here</span>
                        </label>
                    </li>
                </ul>
            </li>

        </ul>
    </t:putAttribute>
    <t:putAttribute name="footerContent">
        <button id="createCalcField" class="button action primary up"><span class="wrap"><spring:message code="button.createField" javaScriptEscape="true"/></span><span class="icon"></span></button>
        <button id="updateCalcField" class="button action primary up hidden"><span class="wrap"><spring:message code="button.updateField" javaScriptEscape="true"/></span><span class="icon"></span></button>
        <button id="cancelCalcField" class="button action up"><span class="wrap"><spring:message code="button.cancel" javaScriptEscape="true"/><span class="icon"></span></button>
    </t:putAttribute>
</t:insertTemplate>
