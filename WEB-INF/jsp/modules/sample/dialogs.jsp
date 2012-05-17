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

<%@ taglib uri="/spring" prefix="spring"%>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>

<t:insertTemplate template="/WEB-INF/jsp/templates/page.jsp">
    <t:putAttribute name="pageTitle" value="Dialog Samples"/>
    <t:putAttribute name="bodyID" value="dialogs"/>
    <t:putAttribute name="pageClass" value="test"/>
    <t:putAttribute name="bodyClass" value="twoColumn"/>
    <t:putAttribute name="headerContent" >
        <link rel="stylesheet" href="${pageContext.request.contextPath}/<spring:theme code='samples.css'/>" type="text/css" />
		<style type="text/css">
				#sampleGrid .rowHeader {width:3%;}
				#sampleGrid .example {width:40%;padding:0;}
				.panel {position: relative;}
		</style>
    </t:putAttribute>
    <t:putAttribute name="bodyContent" >
	
		<t:insertTemplate template="/WEB-INF/jsp/templates/container.jsp">
		    <t:putAttribute name="containerClass" value="column decorated primary"/>
		    <t:putAttribute name="containerTitle"><spring:message code="JIF.titledialogs"/></t:putAttribute>
		    <t:putAttribute name="bodyClass" value="oneColumn"/>
		    <t:putAttribute name="bodyContent" >
	        
	        	<table id="sampleGrid">
	        		<thead>
		        		<tr>
		        			<td class="rowHeader"></td>
		        			<td class="example"></td>
		        		</tr>
		        		<tr>
		        			<th class="rowHeader"><spring:message code="JIF.titledialogs"/></th>
		        			<th class="example"><spring:message code="JIF.descriptortitledialogs"/></th>
		        		</tr>

	        		</thead>
					
					<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#login</th>
		        			<td ><spring:message code="JIF.login"/></td>
		        		</tr>
		        		<!--
<tr>
		        			<th>[default]</th>
		        			<th>.fillParent</th>
		        		</tr>
-->
		        		<tr>
		        			<td class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/login.jsp">
                                    <t:putAttribute name="jsEdition" value="pro"/>
                                    <t:putAttribute name="allowUserPasswordChange" value="true"/>
                                    <t:putAttribute name="localeOptions">
                                        <option selected="" value="en_US"> en_US - English (United States) </option>
                                        <option value="en"> en - English </option>
                                        <option value="fr"> fr - French </option>
                                        <option value="it"> it - Italian </option>
                                        <option value="es"> es - Spanish </option>
                                        <option value="de"> de - German </option>
                                        <option value="ro"> ro - Romanian </option>
                                        <option value="ja"> ja - Japanese </option>
                                        <option value="zh_TW"> zh_TW - Chinese (Taiwan) </option>
                                        <option value="zh_CN"> zh_CN - Chinese (China) </option>
                                    </t:putAttribute>
                                    <t:putAttribute name="timezoneOptions">
                                        <option selected="" value="America/Los_Angeles"> America/Los_Angeles - Pacific Standard Time </option>
                                        <option value="America/Denver"> America/Denver - Mountain Standard Time </option>
                                        <option value="America/Chicago"> America/Chicago - Central Standard Time </option>
                                        <option value="America/New_York"> America/New_York - Eastern Standard Time </option>
                                        <option value="Europe/London"> Europe/London - Greenwich Mean Time </option>
                                        <option value="Europe/Berlin"> Europe/Berlin - Central European Time </option>
                                        <option value="Europe/Bucharest"> Europe/Bucharest - Eastern European Time </option>
                                    </t:putAttribute>
                                </t:insertTemplate>
		        			</td>
		        		</tr>
	        		</tbody>
					<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#sortDialog</th>
		        			<td colspan="2"><spring:message code="JIF.sortDialog"/></td>
		        		</tr>
		        		<!--
<tr>
		        			<th>[default]</th>
		        			<th>.fillParent</th>
		        		</tr>
-->
		        		<tr>
		        			<td class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/sortDialog.jsp">
                                	<t:putAttribute name="bodyContent">
									
									    <t:putAttribute name="availableFields">
									     	<ul class="list responsive collapsible fields hideRoot">
												<li class="leaf"><div class="wrap button"><b class="icon button noBubble"></b>Account Name</div></li>
												<li class="leaf"><div class="wrap button"><b class="icon button noBubble"></b>Account City</div></li>
											</ul>
									    </t:putAttribute>
									    
									    <t:putAttribute name="selectedFields">
										    <ul class="list responsive collapsible fields hideRoot column simple">
												<li class="leaf ascending"><div class="wrap button"><b class="icon button noBubble"></b>Account State</div></li>
												<li class="leaf descending"><div class="wrap button"><b class="icon button noBubble"></b>Account Zip</div></li>
											</ul>
									    </t:putAttribute>

                                	</t:putAttribute>
                                </t:insertTemplate>
		        			</td>

		        		</tr>
	        		</tbody>
	        		<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#selectFields</th>
		        			<td colspan="2"><spring:message code="JIF.selectFields"/></td>
		        		</tr>
		        		<!--
<tr>
		        			<th>[default]</th>
		        			<th>.fillParent</th>
		        		</tr>
-->
		        		<tr>
		        			<td class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/selectFields.jsp">
                                	<t:putAttribute name="bodyContent">
									
									    <t:putAttribute name="availableFields">
									     	<ul class="list responsive collapsible fields hideRoot">
												<li class="leaf"><div class="wrap button"><b class="icon"></b>Account Name</div></li>
												<li class="leaf"><div class="wrap button"><b class="icon"></b>Account City</div></li>
											</ul>
									    </t:putAttribute>
									    
									    <t:putAttribute name="selectedFields">
										    <ul class="list responsive collapsible fields hideRoot">
												<li class="leaf"><div class="wrap button"><b class="icon"></b>Account State</div></li>
												<li class="leaf"><div class="wrap button"><b class="icon"></b>Account Zip</div></li>
											</ul>
									    </t:putAttribute>

                                	</t:putAttribute>
                                </t:insertTemplate>
		        			</td>

		        		</tr>
	        		</tbody>
					<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#propertiesResource</th>
		        			<td colspan="2"><spring:message code="JIF.propertiesResource"/></td>
		        		</tr>
		        		<!--
<tr>
		        			<th>[default]</th>
		        			<th>.fillParent</th>
		        		</tr>
-->
		        		<tr>
		        			<td class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/propertiesResource.jsp">
                                </t:insertTemplate>
		        			</td>

		        		</tr>
	        		</tbody>

					<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#permissions</th>
		        			<td ><spring:message code="JIF.permissions"/></td>
		        		</tr>
		        		<!--
<tr>
		        			<th>[default]</th>
		        			<th>.fillParent</th>
		        		</tr>
-->
		        		<tr>
		        			<td colspan="2" class="example">
								<t:insertTemplate template="/WEB-INF/jsp/templates/permissions.jsp">
									<t:putAttribute name="bodyContent">
										<ul class="list setLeft tabular twoColumn">
											<li class="leaf">
												<div class="wrap"><b class="icon" title=""></b>
													<p class="column one"><a class="launcher">ROLE_DEMO</a></p>
													<p class="column two">
														<select name="">
						        							<option selected="selected" value="">No Access</option>
						        							<option value="">Administer</option>
						        							<option value="">Read Only</option>
						        							<option value="">Read + Delete</option>
						        							<option value="">Read + Write + Delete</option>
						        						</select>
													</p>
												</div>
											</li>
											<li class="leaf">
												<div class="wrap"><b class="icon" title=""></b>
													<p class="column one"><a class="launcher">ROLE_DEMO</a></p>
													<p class="column two">
														<select name="">
						        							<option selected="selected" value="">No Access</option>
						        							<option value="">Administer</option>
						        							<option value="">Read Only</option>
						        							<option value="">Read + Delete</option>
						        							<option value="">Read + Write + Delete</option>
						        						</select>
													</p>
												</div>
											</li>
									</t:putAttribute>
                                </t:insertTemplate>

		        			</td>

		        		</tr>
	        		</tbody>
					<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#permissions</th>
		        			<td ><spring:message code="JIF.permissions"/></td>
		        		</tr>
		        		<!--
<tr>
		        			<th>[default]</th>
		        			<th>.fillParent</th>
		        		</tr>
-->
		        		<tr>
		        			<td colspan="2" class="example">
								
                                <t:insertTemplate template="/WEB-INF/jsp/templates/customURL.jsp">
									<t:putAttribute name="bodyContent">
										<ul class="list setLeft tabular twoColumn">
											<li class="leaf">
												<div class="wrap header"><b class="icon" title=""></b>
													<p class="column one">
														<span class="label">Input Control</span>
													</p>
													<p class="column two">
														<span class="label">URL Parameter</span>
													</p>
												</div>
											</li>
											<li class="leaf">
												<div class="wrap"><b class="icon" title=""></b>
													<p class="column one">
                                                        <div class="control checkBox">
                                                            <label class="wrap" for="parameter_1">
                                                                Country
                                                            </label>
                                                            <input class="" id="parameter_1" type="checkbox" value=""/>
                                                        </div>
													</p>
													<p class="column two">
														<label class="control input text" for="parameter_1_value">
															<input class="" id="parameter_1_value" type="text" value="Country"/>
														</label>
													</p>
												</div>
											</li>
											<li class="leaf">
												<div class="wrap"><b class="icon" title=""></b>
													<p class="column one">
                                                        <div class="control checkBox">
                                                            <label class="wrap" for="parameter_1">
                                                                City
                                                            </label>
                                                            <input class="" id="parameter_2" type="checkbox" value=""/>
                                                        </div>
													</p>
													<p class="column two">
														<label class="control input text" for="parameter_2_value">
															<input class="" id="parameter_1_value" type="text" value="City"/>
														</label>
													</p>
												</div>
											</li>
									</t:putAttribute>
                                </t:insertTemplate>


		        			</td>

		        		</tr>
	        		</tbody>

	        		<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#systemConfirm</th>
		        			<td colspan="2"><spring:message code="JIF.systemConfirm"/></td>
		        		</tr>
		        		<!--
<tr>
		        			<th>[default]</th>
		        			<th></th>
		        		</tr>
-->
		        		<tr>
		        			<td class="example">
		        				<t:insertTemplate template="/WEB-INF/jsp/templates/systemConfirm.jsp">
								    <t:putAttribute name="messageContent">
											<spring:message code="JIF.labelmessage"/>
								    </t:putAttribute>								
								</t:insertTemplate>		        			
		        			</td>
		        		</tr>
	        		</tbody>

					<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#standardConfirm</th>
		        			<td colspan="2"><spring:message code="JIF.standardConfirm"/></td>
		        		</tr>
		        		<!--
<tr>
		        			<th>[default]</th>
		        			<th>.fillParent</th>
		        		</tr>
-->
		        		<tr>
		        			<td colspan="2" class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/standardConfirm.jsp">
                                    <t:putAttribute name="bodyContent">
                                        <p class="message">Are you sure you want to delete Accounts Report?</p>
                                        <p class="message">This action cannot be undone.</p>
                                    </t:putAttribute>
                                    <t:putAttribute name="okLabel" value="Yes"/>
                                    <t:putAttribute name="cancelLabel" value="No"/>
                                </t:insertTemplate>
		        			</td>

		        		</tr>
	        		</tbody>
	        							<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#standardAlert</th>
		        			<td colspan="2"><spring:message code="JIF.standardAlert"/></td>
		        		</tr>
		        		<!--
<tr>
		        			<th>[default]</th>
		        			<th>.fillParent</th>
		        		</tr>
-->
		        		<tr>
		        			<td colspan="2" class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/standardAlert.jsp">
                                    <t:putAttribute name="bodyContent">
                                        <p class="message">The report cannot be rendered.</p>
                                    </t:putAttribute>
                                </t:insertTemplate>
		        			</td>

		        		</tr>
	        		</tbody>

	        		<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#loading</th>
		        			<td colspan="2"><spring:message code="JIF.loading"/></td>
		        		</tr>
		        		<tr>
		        			<td colspan="2" class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/loading.jsp">
                                </t:insertTemplate>
		        			</td>
		        			
		        			<td colspan="2" class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/loading.jsp">
                                	<t:putAttribute name="containerClass" value="cancellable"/>
                                </t:insertTemplate>
		        			</td>

		        		</tr>
	        		</tbody>
	        		<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#detail</th>
		        			<td colspan="2"><spring:message code="JIF.detail"/></td>
		        		</tr>
		        		<tr>
		        			<td colspan="2" class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/detail.jsp">
                                    <t:putAttribute name="bodyContent">
                                        <div class="FPOonly c"></div>
                                    </t:putAttribute>
                                </t:insertTemplate>
		        			</td>
		        			
		        			<td colspan="2" class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/detail.jsp">
                                	<t:putAttribute name="containerClass" value="sizeable"/>
                                	<t:putAttribute name="bodyContent">
                                        <div class="FPOonly c"></div>
                                    </t:putAttribute>
                                </t:insertTemplate>
		        			</td>

		        		</tr>
	        		</tbody>

<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#saveAs</th>
		        			<td colspan="2"><spring:message code="JIF.saveAs"/></td>
		        		</tr>

		        		<tr>
		        			<td class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/saveAs.jsp">
                                	 <t:putAttribute name="bodyContent" >
                                	 <ul class="responsive collapsible folders">
															<li class="node open"><p class="wrap"><b class="icon"></b>Organization</p>
																<ul class="responsive">
																	<li class="node open"><p class="wrap"><b class="icon"></b>Ad Hoc Components</p>
																		<ul class="responsive">
																			<li class="node open"><p class="wrap"><b class="icon"></b>Topics</p>
																				<ul class="responsive">
																					<li class="leaf"><p class="wrap"><b class="icon"></b>All Accounts Report</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>Cascading multi select topic</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>Customer Report</p></li>
																					<li class="leaf selected"><p class="wrap"><b class="icon"></b>demo for adhoc</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>Employees</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>foodmart data for crosstab</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>i18n columns</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>MDX example</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>Parameterized Report</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>Simple Domain Topic</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>SuperMart Products</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>SuperMart Promotions</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>SuperMart Stores</p></li>
																				</ul>
																			</li>	
																		</ul>	
																	</li>
																</ul>	
															</li>
														</ul>
                                	 </t:putAttribute>
                                </t:insertTemplate>

		        			</td>

		        		</tr>
	        		</tbody>
<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#manageDataSource</th>
		        			<td colspan="2"><spring:message code="JIF.manageDataSource"/></td>
		        		</tr>

		        		<tr>
		        			<td class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/manageDataSource.jsp">
                                	 <t:putAttribute name="bodyContent" >
                                	 <ul class="responsive collapsible folders">
															<li class="node open"><p class="wrap"><b class="icon"></b>Organization</p>
																<ul class="responsive">
																	<li class="node open"><p class="wrap"><b class="icon"></b>Ad Hoc Components</p>
																		<ul class="responsive">
																			<li class="node open"><p class="wrap"><b class="icon"></b>Topics</p>
																				<ul class="responsive">
																					<li class="leaf"><p class="wrap"><b class="icon"></b>All Accounts Report</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>Cascading multi select topic</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>Customer Report</p></li>
																					<li class="leaf selected"><p class="wrap"><b class="icon"></b>demo for adhoc</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>Employees</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>foodmart data for crosstab</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>i18n columns</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>MDX example</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>Parameterized Report</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>Simple Domain Topic</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>SuperMart Products</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>SuperMart Promotions</p></li>
																					<li class="leaf"><p class="wrap"><b class="icon"></b>SuperMart Stores</p></li>
																				</ul>
																			</li>	
																		</ul>	
																	</li>
																</ul>	
															</li>
														</ul>
                                	 </t:putAttribute>
                                </t:insertTemplate>

		        			</td>

		        		</tr>
	        		</tbody>

					<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#saveValues</th>
		        			<td colspan="2"><spring:message code="JIF.saveValues"/></td>
		        		</tr>

		        		<tr>
		        			<td class="example">
                            <t:insertTemplate template="/WEB-INF/jsp/templates/saveValues.jsp">
                            </t:insertTemplate>
							</td>
		        		</tr>
	        		</tbody>
					<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#addFolder</th>
		        			<td colspan="2"><spring:message code="JIF.addFolder"/></td>
		        		</tr>

		        		<tr>
		        			<td class="example">

                            <t:insertTemplate template="/WEB-INF/jsp/templates/addFolder.jsp">
                            </t:insertTemplate>
							</td>
		        		</tr>
	        		</tbody>
	        		<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#selectFile</th>
		        			<td colspan="2"><spring:message code="JIF.selectFile"/></td>
		        		</tr>

		        		<tr>
		        			<td class="example">

                            <t:insertTemplate template="/WEB-INF/jsp/templates/selectFile.jsp">
                            	<t:putAttribute name="containerTitle">Add Security File</t:putAttribute>
                            </t:insertTemplate>
							</td>
		        		</tr>
	        		</tbody>
	        		<%-- 
					<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#selectPalette</th>
		        			<td colspan="2"><spring:message code="JIF.selectPalette"/></td>
		        		</tr>

		        		<tr>
		        			<td class="example">

                            <t:insertTemplate template="/WEB-INF/jsp/templates/selectPalette.jsp"></t:insertTemplate>
							</td>
		        		</tr>
	        		</tbody>
	        		--%>
	        		<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#selectFromRepository</th>
		        			<td colspan="2"><spring:message code="JIF.selectFromRepository"/></td>
		        		</tr>

		        		<tr>
		        			<td class="example">

                            <t:insertTemplate template="/WEB-INF/jsp/templates/selectFromRepository.jsp">
                            	<t:putAttribute name="containerTitle">Select from the Repository</t:putAttribute>
                                <t:putAttribute name="bodyContent">
                                <ul class="responsive collapsible folders hideRoot" id="addFileTreeRepoLocation" style="position: relative;">
                                <li id="node1" class="node open ">
                                    <p class="wrap"><b class="icon" id="handler1"></b></p>
                                <ul class="responsive" id="node1sub"><li id="node2" class="node open selected ">
                                    <p class="wrap"><b class="icon" id="handler2"></b>Organization</p>
                                <ul class="responsive" id="node2sub"><li id="node3" class="node closed ">
                                    <p class="wrap"><b class="icon" id="handler3"></b>Ad Hoc Components</p>
                                </li><li id="node4" class="node closed ">
                                    <p class="wrap"><b class="icon" id="handler4"></b>Analysis Components</p>
                                </li><li id="node5" class="node closed ">
                                    <p class="wrap"><b class="icon" id="handler5"></b>Content Files</p>
                                </li><li id="node6" class="node closed ">
                                    <p class="wrap"><b class="icon" id="handler6"></b>Dashboards</p>
                                </li><li id="node7" class="node closed ">
                                    <p class="wrap"><b class="icon" id="handler7"></b>Data Sources</p>
                                </li><li id="node9" class="node closed ">
                                    <p class="wrap"><b class="icon" id="handler9"></b>Domains</p>
                                </li><li id="node10" class="node closed ">
                                    <p class="wrap"><b class="icon" id="handler10"></b>Images</p>
                                </li><li id="node8" class="node closed ">
                                    <p class="wrap"><b class="icon" id="handler8"></b>Input Data Types</p>
                                </li><li id="node11" class="node closed ">
                                    <p class="wrap"><b class="icon" id="handler11"></b>Organizations</p>
                                </li><li id="node12" class="node closed ">
                                    <p class="wrap"><b class="icon" id="handler12"></b>Reports</p>
                                </li></ul></li><li id="node13" class="node closed ">
                                    <p class="wrap"><b class="icon" id="handler13"></b>Public</p>
                                </li></ul></li></ul>
                                </t:putAttribute>
                            </t:insertTemplate>
							</td>
		        		</tr>
	        		</tbody>
					<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#aboutBox</th>
		        			<td colspan="2"><spring:message code="JIF.aboutBox"/></td>
		        		</tr>

		        		<tr>
		        			<td class="example">

                                <t:insertTemplate template="/WEB-INF/jsp/templates/aboutBox.jsp">
                                    <t:putAttribute name="bodyContent">
                                        <p class="message">Product Version: <span class="emphasis">3.7.0.1</span></p>
                                        <p class="message">Build: <span class="emphasis">20100426_1008</span></p>
                                    </t:putAttribute>
                                </t:insertTemplate>
							</td>
		        		</tr>
	        		</tbody>
	        		<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#calculatedFields</th>
		        			<td colspan="2"><p><spring:message code="JIF.calculatedFields"/></p> 
		        				<ol>
		        					<li>#calculatedFields: <spring:message code="JIF.calculatedFieldsVar1"/></li>
		        					<li>#calculatedFields.twoNumbers: <spring:message code="JIF.calculatedFieldsVar2"/></li>
		        					<li>#calculatedFields.multipleNumbers: <spring:message code="JIF.calculatedFieldsVar3"/></li>
		        					<li>#calculatedFields.twoDates: <spring:message code="JIF.calculatedFieldsVar4"/></li>
		        				</ol>
		        				<p> <spring:message code="JIF.calculatedFieldsVar5"/></p>
		        			</td>
		        		</tr>
		        		<!--
<tr>
		        			<th>[default]</th>
		        			<th>.fillParent</th>
		        		</tr>
-->
		        		<tr>
		        			<td class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/calculatedField.jsp">
                                </t:insertTemplate>
		        			</td>

		        		</tr>
	        		</tbody>
	        		<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#addUser</th>
		        			<td colspan="2"><p><spring:message code="JIF.addUser"/></p></td>
		        		</tr>
		        		<!--
<tr>
		        			<th>[default]</th>
		        			<th>.fillParent</th>
		        		</tr>
-->
		        		<tr>
		        			<td class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/addUser.jsp"/>
		        			</td>

		        		</tr>
	        		</tbody>
	        		<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#addRole</th>
		        			<td colspan="2"><p><spring:message code="JIF.addRole"/></p></td>
		        		</tr>
		        		<tr>
		        			<td class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/addRole.jsp"/>
		        			</td>
		        		</tr>
	        		</tbody>
	        		<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#uploadTheme</th>
		        			<td colspan="2"><p><spring:message code="JIF.uploadTheme"/></p></td>
		        		</tr>
		        		<tr>
		        			<td class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/uploadTheme.jsp"/>
		        			</td>
		        		</tr>
	        		</tbody>
	        		<tbody>
		        		<tr>
		        			<th class="rowHeader" rowspan="2">#heartbeatOptin</th>
		        			<td colspan="2"><p><spring:message code="JIF.heartbeatOptin"/></p></td>
		        		</tr>
		        		<tr>
		        			<td class="example">
                                <t:insertTemplate template="/WEB-INF/jsp/templates/heartbeatOptin.jsp"/>
		        			</td>
		        		</tr>
	        		</tbody>
				 </table>
	        
			</t:putAttribute>
		    <t:putAttribute name="footerContent">
		    	<!-- custom content here; remove this comment -->
		    </t:putAttribute>
		</t:insertTemplate>		
		
		<t:insertTemplate template="/WEB-INF/jsp/modules/sample/sampleIndex.jsp"/>

    </t:putAttribute>
</t:insertTemplate>