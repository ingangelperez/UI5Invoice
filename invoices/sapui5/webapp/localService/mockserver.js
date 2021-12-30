sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],
    /**
     * 
     * @param {typeof sap.ui.core.util.MockServer} MockServer 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
     * @param {typeof sap.base.util.UriParameters} UriParameters 
     * @param {typeof sap.base.Log} Log 
     */
    function (MockServer, JSONModel, UriParameters, Log) {
        "use strict";

        var oMockServer;
        var _sAppPath = "aapg/sapui5/";
        var _sJsonFilesPath = _sAppPath + "localService/mockdata";

        var oMockServerInterface = {

            init: function (oOptionsParameters) {

                var oOptions = oOptionsParameters || {};

                return new Promise(function (fnResolve, fnReject) {

                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json");
                    var oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function () {

                        var oUriParameters = new UriParameters();

                        //Parse manifest for local metadata uri
                        var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                        var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                        var sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

                        //Ensure there is a trailing slash
                        var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                        //Create the mock server instance or stop the existing one to reinitialize
                        if (!oMockServer) {

                            oMockServer = new MockServer({
                                rootUri: sMockServerUrl
                            });

                        } else {
                            oMockServer.stop();
                        }

                        //Configure the mock server with the given options or a default delay of 0.5s
                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500)
                        });

                        //Simulate all request using mock data
                        oMockServer.simulate(sMetadataUrl, {
                            sMockDataBaseUrl: sJsonFilesUrl,
                            bGenerateMissingMockData: true
                        });

                        var aRequests = oMockServer.getRequests();

                        //Compose an error response for each request
                        var fnResponse = function (iErrorCode, sMessage, aRequest) {
                            aRequest.response = function (oXhr) {
                                oXhr.respond(iErrorCode, { "Content-Type": "text/plain;charset=utf-8" }, sMessage);
                            };
                        };

                        //Simulate metadata errors
                        if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                            aRequests.forEach(function (aEntry) {
                                if (aEntry.path.toString().indexOf("$metadata") > -1) {
                                    fnResponse(500, "metadara Error", aEntry);
                                }
                            });
                        }

                        //Simulate request errors
                        var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                        var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                        if (sErrorParam) {
                            aRequests.forEach(function (aEntry) {
                                fnResponse(iErrorCode, sErrorParam, aEntry);
                            });
                        }

                        //Set requests and start the server
                        oMockServer.setRequests(aRequests);
                        oMockServer.start();

                        Log.info("Running app with mock data");
                        fnResolve();

                    });

                    oManifestModel.attachRequestFailed(function () {
                        var sError = "Failed to load the application manifest";
                        Log.error(sError);

                        fnReject(new Error(sError));

                    });

                });

            }

        };

        return oMockServerInterface;

    });