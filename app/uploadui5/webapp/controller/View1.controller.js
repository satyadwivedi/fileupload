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
                var that = this;
                var sFileName = oEvent.getParameter("files")[0].name;;
                var reader = new FileReader();
                var file = oEvent.getParameter("files")[0];
                var oPromise = new Promise(function (resolve, reject) {
                    reader.onload = function (e) {
                        //that.raw = e.target.result;
                        resolve(e.target.result);
                    };
                });

                reader.onerror = function (e) {
                    sap.m.MessageToast.show("error");
                };
                //reader.readAsArrayBuffer(file);
                reader.readAsDataURL(file);
                oPromise.then(function (resolve) {
                    that.onStartUpload(sFileName, resolve);
                });


            },


            onStartUpload: function (fileName, base64data) {
                /* var that = this;
                const fileUploader = this.getView().byId("UploadCollection");
                if (fileUploader.getItems().length === 0) {
                    MessageToast.show("file missing");
                    return;
                }*/
                //const fileUploader = this.getView().byId("UploadCollection");
                var that = this;


                var oPayload = {
                    fileID: "0022",
                    appName: "SF",
                    Items: [
                        {
                            fileID: "0022",
                            itemsNo: "00010",
                            fileName: fileName,
                            mediaType: "application/octet-stream",
                            content: base64data //this.raw
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
                        // that.getView().byId("UploadCollection").setModel(new JSONModel({"items": oData.d.Items.results}));
                        MessageToast.show("File upload");
                        that.onComplete(oData.d.Items.results);
                    },
                    error: function (error) {
                        MessageToast.show("Error in file upload");
                        //console.log(`Error ${error}`);
                    }
                });
            },

            onSelectionChange: function () {
                var oUploadCollection = this.byId("UploadCollection");
                // If there's any item selected, sets download button enabled
                if (oUploadCollection.getSelectedItems().length > 0) {
                    this.byId("downloadButton").setEnabled(true);
                } else {
                    this.byId("downloadButton").setEnabled(false);
                }
            },

            onComplete: function (aData) {
                var oData = this.byId("UploadCollection").getModel().getData();
                // var aItems = xtend({}, oData).items;
                //var oItem = {};
                if (oData && oData.items && oData.items.length > 0) {
                    oData.items.unshift({
                        "documentId": Date.now().toString(), // generate Id,
                        "fileName": aData[0].fileName,
                        "mimeType": "",
                        "thumbnailUrl": "",
                        "url": "",
                        "edit": false,
                        "delete": true,
                        "attributes": [
                            {
                                "title": "Uploaded By",
                                "text": "You"
                            },
                            {
                                "title": "Uploaded On",
                                "text": new Date().toLocaleDateString()
                            },
                            {
                                "title": "File Size",
                                "text": "505000"
                            },
                            {
                                "title": "Version",
                                "text": "1"
                            }
                        ]

                    });
                } else {
                    oData = {};
                    oData.items = [];
                    oData.items.push({
                        "documentId": Date.now().toString(), // generate Id,
                        "fileName": aData[0].fileName,
                        "mimeType": "",
                        "thumbnailUrl": "",
                        "url": "",
                        "attributes": [
                            {
                                "title": "Uploaded By",
                                "text": "You"
                            },
                            {
                                "title": "Uploaded On",
                                "text": new Date().toLocaleDateString()
                            },
                            {
                                "title": "File Size",
                                "text": "505000"
                            },
                            {
                                "title": "Version",
                                "text": "1"
                            }
                        ]

                    })

                }
                this.getView().byId("UploadCollection").setModel(new JSONModel({ "items": oData.items }));
                /*this.byId("UploadCollection").getModel().setData({
                    "items": oData.items
                });*/
                // Sets the text to the label
                this.byId("attachmentTitle").setText(this.getAttachmentTitleText());

            },

            getAttachmentTitleText: function () {
                var aItems = this.byId("UploadCollection").getItems();
                return "Uploaded (" + aItems.length + ")";
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
                        //that.getView().byId("idFileTable").setModel(new JSONModel(oData.d.results), "File");
                        //that.onComplete(oData.d.results);
                        var d = {};
                        d.items = [];
                        for (var i = 0; i < oData.d.results.length; i++) {
                            d.items.push({
                                "documentId": Date.now().toString(), // generate Id,
                                "fileName": oData.d.results[i].fileName,
                                "mimeType": "",
                                "thumbnailUrl": "",
                                "url": "",
                                 "edit": false,
                                "delete": false,
                                "attributes": [
                                    {
                                        "title": "Uploaded By",
                                        "text": "You"
                                    },
                                    {
                                        "title": "Uploaded On",
                                        "text": new Date().toLocaleDateString()
                                    },
                                    {
                                        "title": "File Size",
                                        "text": "505000"
                                    },
                                    {
                                        "title": "Version",
                                        "text": "1"
                                    }
                                ]

                            })

                        };
                    
                    that.getView().byId("UploadCollection").setModel(new JSONModel({ "items": d.items }));
                },
                    error: function (error) {
                        console.log(`Error ${error}`);
                    }
                });
    },

    onDownloadFile: function (oEvent) {
        var oSource = oEvent.getSource();
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
