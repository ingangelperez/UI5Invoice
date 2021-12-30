sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
],
    /**
     * 
     * @param {typeof sap.ui.base.ManageObject} ManageObject 
     * @param {typeof sa.ui.core.Fragment} Fragment 
     */
    function (ManageObject, Fragment) {
        "use strict";

        return ManageObject.extend("aapg.sapui5.controller.HelloDialog", {

            constructor: function (oView) {
                this._oView = oView;
            },

            exit: function () {
                delete this._oView;
            },

            open: function () {

                var oView = this._oView;

                //Create Dialog lazily
                if (!oView.byId("helloDialog")) {

                    var oFragmentController = {

                        onCloseDialog: function () {
                            oView.byId("helloDialog").close();
                        }

                    }

                    //Load asyncronous xml fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: "aapg.sapui5.view.HelloDialog",
                        controller: oFragmentController
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });

                } else {

                    oView.byId("helloDialog").open();

                }

            }

        })

    });