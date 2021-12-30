sap.ui.define([
    "aapg/sapui5/model/InvoicesFormatter",
    "sap/ui/model/resource/ResourceModel"
], 
    /**
     * 
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel 
     */
    function(InvoicesFormatter, ResourceModel) {
    "use strict";

    QUnit.module("QInvoice Status", {
        
        beforeEach : function(){
            this._oResourceModel = new ResourceModel({
                bundleUrl : sap.ui.require.toUrl("aapg/sapui5") + "/i18n/i18n.properties"
            });
        },

        afterEach : function(){
            this._oResourceModel.destroy();
        }

    });

    QUnit.test("", function(assert){

        var oModel = this.stub();
        oModel.withArgs("i18n").returns(this._oResourceModel);

        var oViewStub = {
            getModel: oModel
        };

        var oControllerStub = {
            getView: this.stub().returns(oViewStub)
        }

        var fnIsolateFormatter = InvoicesFormatter.invoiceStatus.bind(oControllerStub);

        //Assert
        assert.strictEqual(fnIsolateFormatter("A"), "New", "The Invoice Status For A Is Correct");
        assert.strictEqual(fnIsolateFormatter("B"), "In Progress", "The Invoice Status For B Is Correct");
        assert.strictEqual(fnIsolateFormatter("C"), "Done", "The Invoice Status For C Is Correct");

    });
    
});