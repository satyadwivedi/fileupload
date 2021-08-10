sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/UploadCollectionParameter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, MessageBox, MessageToast, UploadCollectionParameter, JSONModel, Device) {
        "use strict";

        return Controller.extend("com.satya.upload.uploadui5.controller.View1", {
            onInit: function () {
                this.oModel = this.getOwnerComponent().getModel();
            },

            onChange: function (oEvent) {
                var oUploadCollection = oEvent.getSource();
                var that = this;
                var reader = new FileReader();
                var file = oEvent.getParameter("files")[0];
                reader.onload = function (e) {
                    that.raw = e.target.result;
                };

                reader.onerror = function (e) {
                    sap.m.MessageToast.show("error");
                };
                //reader.readAsArrayBuffer(file);
                reader.readAsDataURL(file);
            },


            onStartUpload: function (oEvent) {
                var that = this;
                const fileUploader = this.getView().byId("UploadCollection");
                if (fileUploader.getItems().length === 0) {
                    MessageToast.show("file missing");
                    return;
                }

                var oPayload = {
                    fileID: "0010",
                    appName: "SF",
                    Items: [
                        {
                            fileID: "0010",
                            itemsNo: "00010",
                            fileName: fileUploader.getItems()[0].getFileName(),
                            mediaType: "application/octet-stream",
                            content: this.raw
                        }
                    ]
                };
                oPayload = JSON.stringify(oPayload);
                $.ajax({
                    url: '/v2/browseUpload/FileHeader',
                    type: "POST",
                    data: oPayload,
                    contentType: "application/json",
                    success: function (oData) {
                        var id = oData.d.Items.results[0].ID;
                        MessageBox.success("File Uploaded successfully"); 
                    },
                    error: function (error) {
                        console.log(`Error ${error}`);
                    }
                });
            },

         /*   uploadMedia: function (id) {
                $.ajax({
                    url: `/v2/browseUpload/FileItems(${id})/content`,
                    type: "PUT",
                    data: oPayload,
                    contentType: "application/octet-stream",
                    success: function (oData) {
                        var id = oData;
                    },
                    error: function (error) {
                        console.log(`Error ${error}`);
                    }
                });
            },*/

            /*onBeforeUploadStarts: function (oEvent) {
                var oCustomerHeaderSlug = new UploadCollectionParameter({
                    name: "slug",
                    value: oEvent.getParameter("fileName")
                });
                oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);
            },*/

           /* onUploadComplete: function (oEvent) {
                var sUploadedFileName = oEvent.getParameter("files")[0].fileName;
                MessageToast.show(" uploadComplete ");

            },*/

            onDisplayFiles: function () {
                var that = this;
                $.ajax({
                    url: '/v2/browseUpload/FileItems',
                    type: "GET",
                    success: function (oData) {
                        that.getView().byId("idFileTable").setModel(new JSONModel(oData.d.results), "File");
                    },
                    error: function (error) {
                        console.log(`Error ${error}`);
                    }
                });
            },

            onDownloadFile: function (oEvent) {
                var oSource= oEvent.getSource();
               // var ID = oEvent.getSource().getProperty('text');
                var fileName = oSource.getBindingContext("File").getObject().fileName
                 var ID = oSource.getBindingContext("File").getObject().ID
                $.ajax({
                    url: `/v2/browseUpload/FileItems(guid'${ID}')/content`,
                    type: "GET",
                    contentType: "application/octet-stream",
                    success: function (oData) {
                        var link = document.createElement('a');
                        link.innerHTML = 'Download PDF file';
                        link.download = fileName;
                        link.href = oData;
                        link.click();
                        MessageToast.show("File Downloaded");
                    },
                    error: function (error) {
                       // console.log(`Error ${error}`);
                       MessageToast.show(error);
                    }
                });

            },

            //==========================================================================

    




        });
    });
