TW.IDE.Widgets.DatePickerNoIcon = function () {
    // this.widgetIconUrl = function () {
    //     return "http://localhost:8015/Thingworx/Common/thingworx/widgets/mashup/mashup.ide.png";
    // };

    this.widgetProperties = function () {
        var properties = {
            name: "DatePickerNoIcon",
            description: "DatePickerNoIcon Chart",
            category: ["Common"],
            isExtension: true,
            supportsAutoResize: true,
            properties: {
                WidthDatePicker: {
                    baseType: "NUMBER",
                    defaultValue: 120,
                    isBindingTarget: true,
                },
                HeightDatePicker: {
                    baseType: "NUMBER",
                    defaultValue: 30,
                    isBindingTarget: true,
                },

                // ValueDate: {
                //     baseType: "STRING",
                //     defaultValue: "DD/MM/YYYY",
                //     isBindingSource: true,
                //     isBindingTarget: true,
                // },

                IdRandom: {
                    baseType: "STRING",
                    isBindingSource: true,
                    isBindingTarget: true,
                },

                ValuedateasDate: {
                    baseType: "DATETIME",
                    defaultValue: new Date("2015-01-28 00:00:00"),
                    isBindingSource: true,
                    isBindingTarget: true,
                },


                StyleButtonDatePicker: {
                    baseType: "STYLEDEFINITION",
                    defaultValue: "ButtonDatePickerStyle",
                },
                // DataMaintanance: {
                //     baseType: "INFOTABLE",
                //     isBindingTarget: true,
                // },
                // DataMaintanance: {
                //     baseType: "INFOTABLE",
                //     isBindingTarget: true,
                // },
                // JSONOutdata: {
                //     baseType: "JSON",
                //     defaultValue: JSON.stringify({ data : []}),
                //     isBindingSource: true,
                // },
                // Offest: {
                //     baseType: "NUMBER",
                //     defaultValue: 0,
                //     isBindingSource: true,
                // },
            },
        };

        return properties;
    };

    // The function is called before any property is updated in the ThingWorx Composer. You can perform validations on the new property value before it is committed. If the validation fails, you can return a message string to inform the user about the invalid input. The new property value is not be committed. If nothing is returned during the validation, then the value is assumed valid.
    this.beforeSetProperty = function (name, value) {};

    this.afterSetProperty = function (name, value) {
        this.updatedProperties();
        return true;
    };

    this.afterLoad = function () {};

    this.renderHtml = function () {
        return '<div class="widget-content widget-DatePickerNoIcon"></div>';
    };

    this.afterRender = function () {
        // console.log("widht screen detector after click", window.innerWidth)
        // console.log("heiht screen detector after click", window.innerHeight)
        // this.setProperty("ScreenWidth",  window.innerWidth);
        // this.setProperty("ScreenHeight", window.innerHeight);
        // try {
        //     var allWidgetProps = this.properties;

        //     var widgetProps = {};

        //     for (const [key, value] of Object.entries(allWidgetProps)) {
        //         if (key.includes("Style")) {
        //             widgetProps[key] = TW.getStyleFromStyleDefinition(
        //                 this.getProperty(key)
        //             );
        //         } else {
        //             widgetProps[key] = this.getProperty(key);
        //         }
        //     }

        //     console.log("widgetProps running ScreenDetectorv2 after click");
        //     console.log(widgetProps);
        // } catch (error) {
        //     console.log("error");
        //     console.log(error);
        // }

        this.setupWidget();
    };

    this.setupWidget = function () {
        var widgetID = this.jqElementId;

        d3.select(`#${widgetID}`).selectAll("*").remove();
        // Handle Properties
        try {
            var allWidgetProps = this.allWidgetProperties().properties;

            var widgetProps = {};

            for (const [key, value] of Object.entries(allWidgetProps)) {
                if (key.includes("Style")) {
                    widgetProps[key] = TW.getStyleFromStyleDefinition(
                        this.getProperty(key)
                    );
                } else {
                    widgetProps[key] = this.getProperty(key);
                }
            }

            console.log("widgetProps idle DatePickerNoIcon");
            console.log(widgetProps);
        } catch (error) {
            console.log("error");
            console.log(error);
        }

        var width = widgetProps.WidthDatePicker ||  120;
        var height = widgetProps.HeightDatePicker || 30;

  
        var fontsizetooltipstring = widgetProps.StyleButtonDatePicker.textSize;
        var backgroundcolortooltip = widgetProps.StyleButtonDatePicker.backgroundColor;
        let textcolortooltip = widgetProps.StyleButtonDatePicker.foregroundColor;

        var textdate = widgetProps.ValueDate || "DD/MM/YYYY";
        //batas input

        const convertFontSize = (textSize) => {
            var result = textSize;
            switch (textSize) {
                case "xsmall":
                    result = "9px";
                    break;
                case "small":
                    result = "10px";
                    break;
                case "normal":
                    result = "11px";
                    break;
                case "large":
                    result = "12px";
                    break;
                case "xlarge":
                    result = "14px";
                    break;
                case "xxl":
                    result = "16px";
                    break;
                case "2xl":
                    result = "18px";
                    break;
                case "3xl":
                    result = "22px";
                    break;
                default:
                    result = "22px";
            }

            return result;
        };

        var datepicker_toggle = d3
            .select(`#${widgetID}`)
            .append("span")
            .attr("class", "datepicker-toggle")
            .style("width", width + "px")
            .style("height", height + "px");

        datepicker_toggle
            .append("span")
            .attr("class", "datepicker-toggle-button")
            .style("font-size", convertFontSize(fontsizetooltipstring))
            .style("background-color", backgroundcolortooltip)
            .style("color", textcolortooltip)
            .text(textdate);
        datepicker_toggle
            .append("input")
            .attr("type", "date")
            .attr("class", "datepicker-input");

        const stringtodate = (datestring) => {
            var newdatemonthyear = new Date(datestring);

            var newdate =
                newdatemonthyear.getDate() < 10
                    ? "0" + newdatemonthyear.getDate()
                    : newdatemonthyear.getDate();
            var newmonth =
                newdatemonthyear.getMonth() + 1 < 10
                    ? "0" + (newdatemonthyear.getMonth() + 1)
                    : newdatemonthyear.getMonth() + 1;
            var newyear = newdatemonthyear.getFullYear();

            var tempnewdate = newdate + "/" + newmonth + "/" + newyear;

            return tempnewdate;
        };

        const textInput = document.querySelector(".datepicker-toggle-button");
        const dateInput = document.querySelector(".datepicker-input");
        dateInput.addEventListener("change", (event) => {
            console.log(event.target.value);
            textInput.innerHTML = stringtodate(event.target.value);

            // Reset the value so the picker always
            // opens in a fresh state regardless of
            // what was last picked
            // event.target.value = "";
        });
    };

    // this.widgetServices = function () {
    //     return {
    //         OpenFile: {
    //             description: "",
    //         },

    //         RemoveFile: {
    //             description: "",
    //         },

    //     };

    // };

    this.widgetEvents = function () {
        return {
            OnChange: {
                description: "",
            },
        };
    };
};
