TW.Runtime.Widgets.DatePickerNoIcon = function () {
    this.renderHtml = function () {
        // return any HTML you want rendered for your widget
        // If you want it to change depending on properties that the user
        // has set, you can use this.getProperty(propertyName). In
        // this example, we'll just return static HTML
        return `<div class="widget-content widget-DatePickerNoIcon"></div>`;
    };

    // };

    this.updateProperty = function (updatePropertyInfo) {
        // TargetProperty tells you which of your bound properties changed

        this.setProperty(
            updatePropertyInfo.TargetProperty,
            updatePropertyInfo.SinglePropertyValue
        );

        // if (updatePropertyInfo.TargetProperty === "DataMaintanance") {
        //     // //console.log("updatePropertyInfo.RawDataFromInvoke.rows");
        //     // //console.log(updatePropertyInfo.RawDataFromInvoke.rows);
        //     this.setProperty(
        //         "DataMaintanance",
        //         updatePropertyInfo.RawDataFromInvoke.rows
        //     );
        // }



        this.setupWidget();
    };

    this.afterRender = function () {
        this.setupWidget();
    };

    this.serviceInvoked = function (serviceName) {
        // if (serviceName == "OpenFile"){
        //     document.getElementById("inputexcel").click();
        // }else if (serviceName == "RemoveFile"){
        //     document.getElementById('inputexcel').value = "";
        //     this.setProperty("fileName","");
        //     this.setProperty("JSONOutdata",JSON.stringify({ data : []}) );
        // }
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
        //     //console.log("widgetProps running clcik trigger");
        //     //console.log(widgetProps);
        // } catch (error) {
        //     //console.log("error");
        //     //console.log(error);
        // }
        // this.setupWidget();
        // d3.select("#inputexcel").on("click")();
    };

    this.setupWidget = function () {
        var widgetID = this.jqElementId;

        // Remove all old/existing DOM element
        d3.select(`#${widgetID}`).selectAll("*").remove();
        // Handle Properties
        try {
            var allWidgetProps = this.properties;
            //console.log("allWidgetProps widget-DatePickerNoIcon")

            //console.log(allWidgetProps)

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

            console.log("widgetProps running widget-DatePickerNoIcon");
            console.log(widgetProps);
        } catch (error) {
            //console.log("error");
            //console.log(error);
        }

        var width = widgetProps.WidthDatePicker ||  120;
        var height = widgetProps.HeightDatePicker || 30;

  
        var fontsizetooltipstring = widgetProps.StyleButtonDatePicker.textSize;
        var backgroundcolortooltip = widgetProps.StyleButtonDatePicker.backgroundColor;
        let textcolortooltip = widgetProps.StyleButtonDatePicker.foregroundColor;

       

        var idunique = widgetProps.IdRandom

        var dateasdate = new Date(widgetProps.ValuedateasDate)
        //batas input

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

        if ( stringtodate(dateasdate) != "DD/MM/YYYY"){
            this.jqElement.triggerHandler("OnChange");
        }

    


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
            .attr("id", "datepicker_toggle_button"+idunique)
            .style("font-size", convertFontSize(fontsizetooltipstring))
            .style("background-color", backgroundcolortooltip)
            .style("color", textcolortooltip)
            .text(stringtodate(dateasdate));
        datepicker_toggle
            .append("input")
            .attr("type", "date")
            .attr("class", "datepicker-input")
            .attr("id", "datepicker_input"+idunique);

   

        const textInput = document.querySelector("#datepicker_toggle_button"+idunique);
        
        const dateInput = document.querySelector("#datepicker_input"+idunique);
 
        dateInput.addEventListener("change", (event) => {
            console.log(event.target.value);
            textInput.innerHTML = stringtodate(event.target.value);
            this.setProperty("ValuedateasDate", new Date(event.target.value));
            this.jqElement.triggerHandler("OnChange");
            // Reset the value so the picker always
            // opens in a fresh state regardless of
            // what was last picked
            // event.target.value = "";
        });
        
    };
};
