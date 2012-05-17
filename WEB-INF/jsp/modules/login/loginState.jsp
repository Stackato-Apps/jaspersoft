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

<%@ taglib prefix="spring" uri="/spring" %>

<script type="text/javascript">
	isIPad() && jQuery('#frame').hide();
    document.observe('dom:loaded', function() {
        loginBox.initialize({
            showLocaleMessage: '<spring:message code="jsp.Login.link.showLocale" javaScriptEscape="true"/>',
            hideLocaleMessage: '<spring:message code="jsp.Login.link.hideLocale" javaScriptEscape="true"/>',
            allowUserPasswordChange: ${allowUserPasswordChange},
            changePasswordMessage: '<spring:message code="jsp.Login.link.changePassword" javaScriptEscape="true"/>',
            cancelPasswordMessage: '<spring:message code="jsp.Login.link.cancelPassword" javaScriptEscape="true"/>',
            passwordExpirationInDays: ${passwordExpirationInDays},
            nonEmptyPasswordMessage: '<spring:message code="jsp.Login.link.nonEmptyPassword" javaScriptEscape="true"/>',
            passwordNotMatchMessage: '<spring:message code="jsp.Login.link.passwordNotMatch" javaScriptEscape="true"/>'
        });
    
		if(isIPad()){		
	 		var orientation = window.orientation;
	    	switch(orientation){
	   	        case 0:
	   	        	jQuery('#welcome').get(0).style.webkitTransform = 'scale(0.8) translate3d(-60px,0,0)';
	   	        	jQuery('h2.textAccent').css('font-size','14px').parent().css('width','39%');
	   	        	jQuery('#copy').css('width','600px');
					jQuery('#loginForm').css({
    	        		left:'524px',
    	        		right: ''
    	        	});  	
	   	        	break;  
	   	        case 90:
	   	        	jQuery('#welcome').get(0).style.webkitTransform = 'scale(1.0) translate3d(0,0,0)';
	   	        	jQuery('h2.textAccent').css('font-size','16px').parent().css('width','46%');
	   	        	jQuery('#copy').css('width','766px');
	   	            break;
	   	        case -90:
	   	        	jQuery('#welcome').get(0).style.webkitTransform = 'scale(1.0) translate3d(0,0,0)';
	   	        	jQuery('h2.textAccent').css('font-size','16px').parent().css('width','46%');
	   	        	jQuery('#copy').css('width','766px');
	   	            break;
	   	    }     
			jQuery('#frame').show();
	       	window.addEventListener('orientationchange',function(e){
	       	    var orientation = window.orientation;
	       	    switch(orientation){
	       	        case 0:
	       	        	jQuery('#welcome').get(0).style.webkitTransform = 'scale(0.75) translate3d(-60px,0,0)';
	       	        	jQuery('h2.textAccent').css('font-size','14px').parent().css('width','39%');
	       	        	jQuery('#copy').css('width','600px');
						jQuery('#loginForm').css({
							left:'524px',
							right: ''
						});  	
	       	        	break;  
	       	        case 90:
	       	        	jQuery('#welcome').get(0).style.webkitTransform = 'scale(1.0) translate3d(0,0,0)';
	       	        	jQuery('h2.textAccent').css('font-size','16px').parent().css('width','46%');
	       	        	jQuery('#copy').css('width','766px');
						jQuery('#loginForm').css({
        	        		left:'',
        	        		right: '-10px'
        	        	});
	       	            break;
	       	        case -90:
	       	        	jQuery('#welcome').get(0).style.webkitTransform = 'scale(1.0) translate3d(0,0,0)';
	       	        	jQuery('h2.textAccent').css('font-size','16px').parent().css('width','46%');
	       	        	jQuery('#copy').css('width','766px');
						jQuery('#loginForm').css({
        	        		left:'',
        	        		right: '-10px'
        	        	});
	       	            break;
	       	    }        		
	       	})        	
       	}
    });
</script>
        
       
