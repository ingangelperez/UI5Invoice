sap.ui.define([
    "aapg/sapui5/localService/mockserver",
    "sap/ui/test/opaQunit",
    "./pages/HelloPanel"
],
    /**
     * 
     * @param {typeof aapg.sapui5.localService.mockserver} mockserver 
     * @param {typeof sap.ui.test.opaQunit} opaQunit 
     */
    function (mockserver, opaQunit) {
        "use strict";

        QUnit.module("Navigation");

        opaQunit("Should Open The Hello Dialog", function (Given, When, Then) {

            //Initialize the mockserver
            mockserver.init();
            
            //Arrangements
            Given.iStartMyUIComponent({
                componentConfig: {
                    name: "aapg.sapui5"
                }
            });

            //Actions
            When.onTheAppPage.iSayHelloDialogButton();

            //Assertions
            Then.onTheAppPage.iSeeTheHelloDialog();

            //Cleanup
            Then.iTeardownMyApp();
        });

    });