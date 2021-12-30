sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("aapg.sapui.controller.App", {
            //Comentario
            onInit: function () {
                //Set content density class
                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            },

            onOpenHelloDialog: function () {
                this.getOwnerComponent().openHelloDialog();
            }

        });

    });