sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    /**
     * 
     * @param {typeOf sap.ui.model.json.JSONModel} JSONModel 
     * @param {typeOf sap.ui.Device} Device
     */
    function (JSONModel, Device) {
        "use strict";

        return {

            createRecipient: function () {

                var oData = {
                    recipient: {
                        name: "World"
                    }
                };

                return new JSONModel(oData);

            },

            createDeviceModel: function(){

                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
                
            }

        };

    });