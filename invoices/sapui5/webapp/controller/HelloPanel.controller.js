sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/base/Log"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeOf sap.m.MessageToast} MessageToast
     * @param {typeOf sap.base.Log} Log
     */
    function (Controller, MessageToast, Log) {
        "use strict";

        return Controller.extend("aapg.sapui.controller.HelloPanel", {

            onInit: function () { 

            },

            onBeforeRendering: function(){ 
                
                //Log test
                var sMessage = "Log Message - onBeforeRendering";

                Log.info(sMessage);
                Log.error(sMessage);

            },

            onAfterRendering: function() {
                //debugger;
            },

            onShowHello: function () {

                //Get text from i18n
                var oBundle = this.getView().getModel("i18n").getResourceBundle();

                //Get text from view model
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");

                //Prepare and display message
                var sMessage = oBundle.getText("messageSayHello", [sRecipient]);
                MessageToast.show(sMessage);
            },

            onOpenHelloDialog: function () {
                this.getOwnerComponent().openHelloDialog();
            }

        });

    });