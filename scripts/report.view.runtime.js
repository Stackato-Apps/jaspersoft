/*
 * Copyright (C) 2005 - 2011 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased  a commercial license agreement from Jaspersoft,
 * the following license terms  apply:
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License  as
 * published by the Free Software Foundation, either version 3 of  the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero  General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public  License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Report.toolbarActionMap = {
    'back' : "Report.goBack",
    'ICDialog' : "Controls.show",
    'export': "doNothing"
};

Report.initialize = function() {
    this.commonInit();

    typeof Controls !== "undefined" && Controls.initialize.bind(Controls)();

    Report.exportForm = $(Report.EXPORT_ACTION_FORM);
    this.nothingToDisplay = $('nothingToDisplay');

    if (this.nothingToDisplay) {
        centerElement(this.nothingToDisplay, {horz: true, vert: true});
    }
    
    /**
     *  Init toolbar
     */
    if (window.toolbarButtonModule) {
        toolbarButtonModule.ACTION_MODEL_TAG = Report.TOOLBAR_SUBMENU;
        toolbarButtonModule.initialize(Report.toolbarActionMap);
    }

    if ($(Report.PAGINATION_PAGE_CURRENT)) { // observe page navigation input
        $(Report.PAGINATION_PAGE_CURRENT).observe('change', function(e) {
            this.goToPage($(Report.PAGINATION_PAGE_CURRENT).getValue());
            e.stop();
        }.bindAsEventListener(this));


        // observe page navigation buttons
        $(this.PAGINATION_CONTAINER).observe('click', function(e) {
            var elem = e.element();
            e.stop();

            for (var pattern in this.pageActions) {
                if (matchAny(elem, [pattern], true)) {
                    this.navigateToReportPage(this.pageActions[pattern]);
                    return;
                }
            }
        }.bindAsEventListener(this));
    }

    if (document.location.href.indexOf("noReturn=true") > 0) {
//         jQuery('#back > span.wrap').html('Close');
        buttonManager.disable($('back'))
    }
    
    /**
     * If we need user inputs show input controls
     * otherwise get report data from server.
     */
    if (Report.needsInput) {
        if ($(ControlsBase.INPUT_CONTROLS_DIALOG)) {
            Controls.show();
        }
        if (this.nothingToDisplay) {
            this.nothingToDisplay.removeClassName(layoutModule.HIDDEN_CLASS);
            centerElement(this.nothingToDisplay, {horz: true, vert: true});
        }
    } else {
        this.refreshReport();
    }
}

Report.refreshExporters = function() {
    Report.exportersList.length > 0 ? buttonManager.enable($('export')) : buttonManager.disable($('export'));
}

Report.refreshPagination = function() {
    if (this.emptyReport || this.lastPageIndex <= 0) {
        buttonManager.disable($(Report.PAGINATION_PAGE_FIRST));
        buttonManager.disable($(Report.PAGINATION_PAGE_PREV));
        buttonManager.disable($(Report.PAGINATION_PAGE_CURRENT));
        buttonManager.disable($(Report.PAGINATION_PAGE_NEXT));
        buttonManager.disable($(Report.PAGINATION_PAGE_LAST));
        if ($(Report.PAGINATION_PAGE_CURRENT)) {
            $(Report.PAGINATION_PAGE_CURRENT).setValue("");
            $(Report.PAGINATION_PAGE_TOTAL).update("");
        }
        return;
    }

    if (this.pageIndex > 0) {
        buttonManager.enable($(Report.PAGINATION_PAGE_FIRST));
        buttonManager.enable($(Report.PAGINATION_PAGE_PREV));
    } else {
        buttonManager.disable($(Report.PAGINATION_PAGE_FIRST));
        buttonManager.disable($(Report.PAGINATION_PAGE_PREV));
    }

    if (this.pageIndex < this.lastPageIndex) {
        buttonManager.enable($(Report.PAGINATION_PAGE_NEXT));
        buttonManager.enable($(Report.PAGINATION_PAGE_LAST));
    } else {
        buttonManager.disable($(Report.PAGINATION_PAGE_NEXT));
        buttonManager.disable($(Report.PAGINATION_PAGE_LAST));
    }

    buttonManager.enable($(Report.PAGINATION_PAGE_CURRENT));
    if ($(Report.PAGINATION_PAGE_CURRENT)) {
        $(Report.PAGINATION_PAGE_CURRENT).setValue(this.pageIndex + 1);
        $(Report.PAGINATION_PAGE_TOTAL).update(this.getMessage("jasper.report.view.page.of") + (this.lastPageIndex + 1));
    }


    this.pageActions = {
        'button#page_first': 0,
        'button#page_prev': this.pageIndex - 1,
        'button#page_next': this.pageIndex + 1,
        'button#page_last': this.lastPageIndex
    };

}

Report.reportRefreshed = function() {
	var fr,r;
    /*
     * Adding following line to force Google chrome to display ajax content
     * injected into #reportContainer. Bug fix 23988.
     */
    if(typeof(JS) !== 'undefined' && JS.fid){
        fr = jQuery('#'+JS.fid, window.parent.document); 
    	r = fr.contents().find('#reportContainer');
    	fr.removeClass('hidden').show();
    	r.show();
        if(!isIPad()) fr.parent().parent().css('background-image','none');  
        var h = r.height(); 
        var w = r.width();
        if(isIPad()){
        	new TouchController(r.get(0),fr.get(0).parentNode.parentNode,{
        		use2Fingers:true,
        		showBorders:true,
        		noInit3d:true
        	});
        	
            r.children('div').bind({
            	'touchstart':function(){
            		fr.parent().parent().siblings().removeClass('over');
            		fr.parent().parent().addClass('over');
            	}
            })
        }
    } else {
    	var ic = $(ControlsBase.INPUT_CONTROLS_FORM);
    	if(isIPad()){
    		if(this.touchController){
    			this.touchController.reset();
    		} else {
//    			var scrollWrapper = document.getElementById('reportContainer').parentNode.parentNode;
    			var scrollWrapper =  jQuery('#reportContainer').parent().parent();
                var contentWidth = jQuery('#reportContainer > div').width();
                (scrollWrapper.width() < contentWidth) && (scrollWrapper.css('width', contentWidth + 'px'));
                this.touchController = new TouchController(scrollWrapper[0],scrollWrapper.parent()[0],{noInit3d:true});
    		} 		
    		var bm = jQuery('#' + ControlsBase.INPUT_CONTROLS_FORM + ' > button.minimize');
    		if(ic && bm && bm.is(":visible")){
    			var m = ic.hasClassName('minimized');
        		layoutModule.maximize(ic);
        		m && layoutModule.minimize(ic); 	
    		}
    	}
		jQuery('#reportContainer').show().height();
    }
    
    if (this.nothingToDisplay) {
        this.nothingToDisplay.addClassName(layoutModule.HIDDEN_CLASS);
    }
    
    ControlsBase.evalScripts();
    Report.refreshPagination();
    Report.refreshExporters();    
}

Report.exportReport = function(type, formAction) {
    var exportForm = Report.exportForm;

    exportForm.method = "post";
    exportForm._eventId.value = "export";
    exportForm.target='_blank';
    exportForm._flowExecutionKey.value = Report.reportExecutionKey();
    exportForm.output.value="" + type;

    var timeoutForm = "Report.exportForm.target='_self';";
    if (formAction)
    {
        timeoutForm += "Report.exportForm.action='" + exportForm.action + "';";
        exportForm.action = formAction;
    }
    setTimeout(timeoutForm, 500);

    exportForm.submit()
}

Report.goBack = function() {
    // disable back button after first click
    buttonManager.disable($('back'));

    // exportForm is used here to leave the page
    Report.exportForm._eventId.value = "close";
    Report.exportForm._flowExecutionKey.value = Report.reportExecutionKey();
    Report.exportForm.submit();
}

document.observe('dom:loaded', Report.initialize.bind(Report));

