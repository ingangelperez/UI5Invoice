QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {

    "use strict";

    sap.ui.require([
        "aapg/sapui5/test/integration/NavigationJourney"
    ], function () {
        QUnit.start();
    })

});