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

var primaryNavModule = {


    NAVIGATION_MENU_CLASS : "menu vertical dropDown",
    ACTION_MODEL_TAG : "navigationActionModel",
    CONTEXT_POSTFIX : "_mutton",
    NAVIGATION_MUTTON_DOM_ID : "navigation_mutton",
    NAVIGATION_MENU_PARENT_DOM_ID : "navigationOptions",
    JSON : null,

    /**
     * Navigation paths used in the navigation menu
     */
    navigationPaths : {
        library : {url : "flow.html", params : "_flowId=searchFlow"},
        home : {url : "home.html"},
        logOut : {url : "exituser.html"},
        search : {url : "flow.html", params : "_flowId=searchFlow&mode=search"},
        report : {url : "flow.html", params : "_flowId=searchFlow&mode=search&filterId=resourceTypeFilter&filterOption=resourceTypeFilter-reports&searchText="},
        olap : {url : "flow.html", params : "_flowId=searchFlow&mode=search&filterId=resourceTypeFilter&filterOption=resourceTypeFilter-view&searchText="},
        event : {url : "flow.html", params : "_flowId=logEventFlow"},
        samples : {url : "flow.html", params : "_flowId=sampleFlow&page=dialogs"},
        adminHome : {url : "flow.html", params : "_flowId=adminHomeFlow"},
        organization : {url : "flow.html", params : "_flowId=tenantFlow"},
        etl : {url : "etl"},
        mondrianProperties : {url : "olap/properties.html"},
        flush : {url : "olap/flush.html"},
        user : {url : "flow.html", params : "_flowId=userListFlow"},
        role : {url : "flow.html", params : "_flowId=roleListFlow"},
        analysisOptions : {url : "flow.html", params : "_flowId=mondrianPropertiesFlow"},
        designerOptions : {url : "flow.html", params : "_flowId=designerOptionsFlow"},
        designerCache : {url : "flow.html", params : "_flowId=designerCacheFlow"},
        designer : {url : "flow.html", params : "_flowId=adhocFlow"},
        dashboard : {url : "flow.html", params : "_flowId=dashboardDesignerFlow&createNew=true"},
        domain : {url : "flow.html", params : "_flowId=createSLDatasourceFlow&ParentFolderUri="},
        logSettings : {url : "log_settings.html"}
    },

    /**
     * List of dom Id's for pages that require user confirmation before leaving.
     */
    bodyIds : {
        "designer" : "designerBase.confirmAndLeave",
        "dashboardDesigner" : "designerBase.confirmAndLeave",
        "repoBrowse": "repositorySearch.confirmAndLeave",
        "repoSearch": "repositorySearch.confirmAndLeave",
        "manage_users": "orgModule.confirmAndLeave",
        "manage_roles": "orgModule.confirmAndLeave",
        "manage_orgs": "orgModule.confirmAndLeave",
        "domainDesigner_tables": "domain.designer.confirmAndLeave",
        "domainDesigner_derivedTables": "domain.designer.confirmAndLeave",
        "domainDesigner_joins": "domain.designer.confirmAndLeave",
        "domainDesigner_calculatedFields": "domain.designer.confirmAndLeave",
        "domainDesigner_filters": "domain.designer.confirmAndLeave",
        "domainDesigner_display": "domain.designer.confirmAndLeave",
        "dataChooserDisplay": "domain.chooser.confirmAndLeave",
        "dataChooserFields": "domain.chooser.confirmAndLeave",
        "dataChooserPreFilters": "domain.chooser.confirmAndLeave",
        "dataChooserSaveAsTopic": "domain.chooser.confirmAndLeave"
    },



    /**
     * This method initializes the primary menu. This needs to be called only once.
     */
    initializeNavigation : function(){
        //check version. if pro inject create link
        var navKey;
        var navId;
        var navObject;
        this.JSON =  ($("navigationActionModel").text.evalJSON()).evalJSON();
        var re = /[A-Za-z]+[_]{1}[A-Za-z]+/;
        //go through json and get keys. Keys == action model context == nav menu muttons
        for(navKey in this.JSON){
            navId = re.exec(navKey)[0]; //strip out ids
            navObject = this.JSON[navKey][0];  //get labels
            if(isNotNullORUndefined(navObject)){
                this.createMutton(navId, navObject.text);
            }
        }
    },


    /**
     * helper to create dom object
     */
    createMutton : function(domId, label){
        var mutton = $(this.NAVIGATION_MUTTON_DOM_ID).cloneNode("true");
        var textPlacement = $(mutton).down(".button");

        $(mutton).setAttribute("id", domId);
        //TODO: see if we can do this with builder (maybe not)
        var text = document.createTextNode(label);
        textPlacement.appendChild(text);

        var navigationMenuParent = $(this.NAVIGATION_MENU_PARENT_DOM_ID);
        navigationMenuParent && navigationMenuParent.appendChild(mutton);
    },

    /**
     * Event for fired on mouse over. Used to show a menu.
     * @param event
     * @param object
     */
    showNavButtonMenu : function(event, object){
        var context = $(object).readAttribute("id") + this.CONTEXT_POSTFIX;
        var menuLeft = getBoxOffsets(object, null)[0];
        var menuTop =   getBoxOffsets(object, null)[1] + $(object).getHeight();
        var coordinates = {"menuLeft" : menuLeft, "menuTop" : menuTop};
        //navigation menu will need to reference the button that launched it
        actionModel.showDynamicMenu(context, event, this.NAVIGATION_MENU_CLASS, coordinates, this.ACTION_MODEL_TAG);
        $("menu").parentId = $(object).readAttribute("id");
        //hide menu if mouseover anything *except* the menu
        primaryNavModule.mouseOutHandler = primaryNavModule.navigationButtonMouseOut.bind(primaryNavModule);
        $("frame").observe('mouseover', primaryNavModule.mouseOutHandler);
    },

    /**
     * Event fired on mouse out
     * @param event
     */
    navigationButtonMouseOut : function(event){
        if ($('menu').hasClassName(this.NAVIGATION_MENU_CLASS)){
            event = getEvent(event);
            var hovered = getEventTarget(event);
            if (!this.isNavButton(hovered) && !relatedTargetInElementSubtree(event,hovered) && !actionModel.isTopAncestorTheMenu(hovered)){
                actionModel.hideMenu();
                //deselect object.
                $$('#navigationOptions li.over').each(function(object){
                    buttonManager.out(object);
                });
            }
            $("frame").stopObserving('mouseover', primaryNavModule.mouseOutHandler);
        }
    },



    /**
     * Used to determine if a element is part of the navigation button
     * @param object
     */
    isNavButton : function(object){
        return ($(object).hasClassName("mutton") || $(object).hasClassName("icon"));

    },


    /**
     * Object based method used to create a url based on the navigation path object
     * @param option
     */
    setNewLocation : function(option){
        var locObj = this.navigationPaths[option];
        if(locObj){
            var path = locObj.url;
            var queryParams = locObj.params ? "?" + locObj.params : "";
            window.location.href = urlContext +"/" + path + queryParams;
        }
    },


    /**
     * Method used to create a url based on the navigation path object
     * @param option
     */
    navigationOption : function(option){
        var bodyId = $(document.body).readAttribute("id");
        if(primaryNavModule.bodyIds[bodyId]){
            var execFunction = primaryNavModule.bodyIds[bodyId];
            var executableFunction = getAsFunction(execFunction);
            var answer = executableFunction();
            if(answer){
                primaryNavModule.setNewLocation(option);
            }
        }else{
            primaryNavModule.setNewLocation(option);
        }
    }
};
