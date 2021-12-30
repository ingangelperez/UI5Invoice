/* eslint-disable no-undef */
sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/RatingIndicator",
    "sap/m/Label",
    "sap/m/Button"
],
    /**
     * 
     * @param {sap.ui.core.Control} Control
     * @param {sap.m.RatingIndicator} RatingIndicator
     * @param {sap.m.Label} Label
     * @param {sap.m.Button} Button
     */
    function (Control, RatingIndicator, Label, Button) {
        "use strict";

        return Control.extend("aapg.sapui5.control.ProductRating", {

            metadata: {
                properties: {
                    value: { type: "float", defaultValue: 0 }
                },
                aggregations: {
                    _rating: {
                        type: "sap.m.RatingIndicator",
                        multiple: false,
                        visibility: "hidden"
                    },
                    _label: {
                        type: "sap.m.Label",
                        multiple: false,
                        visibility: "hidden"
                    },
                    _button: {
                        type: "sap.m.Button",
                        multiple: false,
                        visibility: "hidden"
                    }
                },
                events: {
                    change: {
                        parameters: {
                            value: { type: "float" }
                        }
                    }
                }
            },

            init: function () {

                //Set aggregations
                this.setAggregation("_rating", new RatingIndicator({
                    value: this.getValue(),
                    iconSize: "2rem",
                    visualMode: "Half",
                    liveChange: this._onRate.bind(this)
                }));

                this.setAggregation("_label", new Label({
                    text: "{i18n>productRatingLabelInitial}"
                }).addStyleClass("sapUiSmallMargin"));

                this.setAggregation("_button", new Button({
                    text: "{i18n>productRatingButton}",
                    press: this._onSubmit.bind(this)
                }).addStyleClass("sapUiTinyMarginTopBottom"));

            },

            _onRate: function (oEvent) {

                var oResourceBundle = this.getModel("i18n").getResourceBundle();
                var fValue = oEvent.getParameter("value");

                this.setProperty("value", fValue, true);

                //Update aggregations
                this.getAggregation("_label").setText(oResourceBundle.getText("productRatingIndicator", [fValue, oEvent.getSource().getMaxValue()]));
                this.getAggregation("_label").setDesign("Bold");

            },

            _onSubmit: function (oEvent) {

                var oResourceBundle = this.getModel("i18n").getResourceBundle();

                //Update aggregations
                this.getAggregation("_rating").setEnabled(false);
                this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal"));
                this.getAggregation("_button").setEnabled(false);

                //Fire event change
                this.fireEvent("change", {
                    value: this.getValue()
                });

            },

            reset: function () {
                //Reset control

                var oResourceBundle = this.getModel("i18n").getResourceBundle();

                this.setValue(0);

                this.getAggregation("_rating").setEnabled(true);
                this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial"));
                this.getAggregation("_label").setDesign("Standard");
                this.getAggregation("_button").setEnabled(true);



            },

            setValue: function (fValue) {
                this.setProperty("value", fValue, true);
                this.getAggregation("_rating").setValue(fValue);
            },

            renderer: function (oRm, oControl) {
                oRm.openStart("div", oControl);
                oRm.class("productRating");
                oRm.openEnd();
                oRm.renderControl(oControl.getAggregation("_rating"));
                oRm.renderControl(oControl.getAggregation("_label"));
                oRm.renderControl(oControl.getAggregation("_button"));
                oRm.close("div");
            }

        });

    });