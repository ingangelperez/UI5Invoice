sap.ui.define([
    "sap/ui/core/UIComponent",
    "aapg/sapui5/model/Models",
    "./controller/HelloDialog",
    "sap/ui/Device"
],
    /**
     * 
     * @param {typeOf sap.ui.core.UIComponent} UIComponent 
     * @param {typeOf aapg.sapui5.model.Models} Models
     * @param {typeOf aapg.sapui5.controller.HelloDialog} HelloDialog
     * @param {typeOf sap.ui.Device} Device
     */
    function (UIComponent, Models, HelloDialog, Device) {
        "use strict";

        return UIComponent.extend("aapg.sapui5.Component", {

            metadata: {
                manifest: "json"
            },

            init: function () {

                //Call the init function of the parent
                UIComponent.prototype.init.apply(this, arguments);

                //Set data model
                this.setModel(Models.createRecipient());

                //Hello Dialog
                this._helloDialog = new HelloDialog(this.getRootControl());

                //Init router
                this.getRouter().initialize();

                //Set device model
                this.setModel(Models.createDeviceModel(), "device");

            },

            exit: function () {
                this._helloDialog.destroy();
                delete this._helloDialog;
            },

            openHelloDialog: function () {
                this._helloDialog.open();
            },

            getContentDensityClass: function(){
                
                if(!Device.support.touch){
                    this._sContentDensityClass = "sapUiSizeCompact";
                }else{
                    this._sContentDensityClass = "sapUiSizeCozy";
                }

                return this._sContentDensityClass;

            }

        });

    });