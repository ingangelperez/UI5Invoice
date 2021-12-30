sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.rounting.History} History
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     */
    function (Controller, History, UIComponent) {
        "use strict";
        //Comentario 2 
        return Controller.extend("aapg.sapui.controller.Details", {

            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatched, this);
            },

            _onObjectMatched: function (oEvent) {
                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                    model: "northwind"
                });

                //Reset ProductRating
                this.byId("rating").reset();

            },

            onRatingChange: function(oEvent){
                //Display message

                var fValue = oEvent.getParameter("value");
                var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                sap.m.MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));

            },

            onNavBack: function () {

                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if(sPreviousHash !== undefined){
                    window.history.go(-1);
                    console.info("Nav to previous hash");
                    
                }else{
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteApp", {}, true);
                    console.info("Nav RouteApp");
                }

            }

        });

    });