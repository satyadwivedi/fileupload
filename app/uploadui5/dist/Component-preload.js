//@ui5-bundle com/satya/upload/uploadui5/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/satya/upload/uploadui5/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/satya/upload/uploadui5/model/models"],function(e,t,i){"use strict";return e.extend("com.satya.upload.uploadui5.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"com/satya/upload/uploadui5/controller/View1.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/m/MessageToast","sap/m/UploadCollectionParameter","sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,t,o,n,a,i){"use strict";return e.extend("com.satya.upload.uploadui5.controller.View1",{onInit:function(){this.oModel=this.getOwnerComponent().getModel()},onChange:function(e){var t=e.getSource();var o=this;var n=new FileReader;var a=e.getParameter("files")[0];n.onload=function(e){o.raw=e.target.result};n.onerror=function(e){sap.m.MessageToast.show("error")};n.readAsDataURL(a)},onStartUpload:function(e){var n=this;const a=this.getView().byId("UploadCollection");if(a.getItems().length===0){o.show("file missing");return}var i={fileID:"0010",appName:"SF",Items:[{fileID:"0010",itemsNo:"00010",fileName:a.getItems()[0].getFileName(),mediaType:"application/octet-stream",content:this.raw}]};i=JSON.stringify(i);$.ajax({url:"/v2/browseUpload/FileHeader",type:"POST",data:i,contentType:"application/json",success:function(e){var o=e.d.Items.results[0].ID;t.success("File Uploaded successfully")},error:function(e){console.log(`Error ${e}`)}})},onDisplayFiles:function(){var e=this;$.ajax({url:"/v2/browseUpload/FileItems",type:"GET",success:function(t){e.getView().byId("idFileTable").setModel(new a(t.d.results),"File")},error:function(e){console.log(`Error ${e}`)}})},onDownloadFile:function(e){var t=e.getSource();var n=t.getBindingContext("File").getObject().fileName;var a=t.getBindingContext("File").getObject().ID;$.ajax({url:`/v2/browseUpload/FileItems(guid'${a}')/content`,type:"GET",contentType:"application/octet-stream",success:function(e){var t=document.createElement("a");t.innerHTML="Download PDF file";t.download=n;t.href=e;t.click();o.show("File Downloaded")},error:function(e){o.show(e)}})}})});
},
	"com/satya/upload/uploadui5/i18n/i18n.properties":'title=File Upload & Download POC\nappTitle=File Upload & Download POC\nappDescription=File Upload & Download POC\n',
	"com/satya/upload/uploadui5/manifest.json":'{"_version":"1.32.0","sap.app":{"id":"com.satya.upload.uploadui5","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","ach":"ach","dataSources":{"mainService":{"uri":"v2/browseUpload/","type":"OData","settings":{"odataVersion":"2.0","localUri":"localService/metadata.xml"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"sap-icon://task","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":false,"rootView":{"viewName":"com.satya.upload.uploadui5.view.View1","type":"XML","async":true,"id":"View1"},"dependencies":{"minUI5Version":"1.66.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.satya.upload.uploadui5.i18n.i18n"}},"":{"dataSource":"mainService","preload":true}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.satya.upload.uploadui5.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":"RouteView1","target":["TargetView1"]}],"targets":{"TargetView1":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"}}}}}',
	"com/satya/upload/uploadui5/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/satya/upload/uploadui5/view/View1.view.xml":'<mvc:View\n    controllerName="com.satya.upload.uploadui5.controller.View1"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns:u="sap.ui.unified"\n    xmlns:core="sap.ui.core"\n    displayBlock="true"\n    xmlns="sap.m"\n><Shell id="shell"><App id="app"><pages><Page id="page" title="{i18n>title}"><content ><VBox class="sapUiTinyMargin" renderType="Bare"><MessageStrip\n                        class="sapUiTinyMarginBottom"\n                        visible="{=!${device>/browser/mobile}}"\n                        showIcon="true"\n                        type="Information"\n                        text="To add files, you can also use drag &amp; drop on your desktop or tablet." /></VBox><UploadCollection\n                            id="UploadCollection"\n                            maximumFilenameLength="55"\n                            maximumFileSize="10"\n                            multiple="true"\n                            fileType="png,jpeg,gif,svg,jpg,pdf,txt,xlsx,docx"\n                            sameFilenameAllowed="true"\n                            instantUpload="false"\n                            noDataDescription="Drop files or use the &quot;Add&quot; button to keep files ready for upload"\n                            change="onChange"\n                            fileDeleted="onFileDeleted"\n                            filenameLengthExceed="onFilenameLengthExceed"\n                            fileSizeExceed="onFileSizeExceed"\n                            typeMissmatch="onTypeMissmatch"\n                            uploadComplete="onUploadComplete"\n                            beforeUploadStarts="onBeforeUploadStarts" /><Button id="Button" text="Upload Now" press="onStartUpload" /><VBox><Table id="idFileTable"\n                        inset="false"\n                        items="{\n                            path: \'File>/\',\n                            sorter: {\n                                path: \'Name\'\n                            }\n                        }"><headerToolbar><OverflowToolbar><content><Title text="Files" level="H2"/><ToolbarSpacer /><Button text="Display Files" press="onDisplayFiles" /></content></OverflowToolbar></headerToolbar><columns><Column width="12em"><Text text="File Name" /></Column><Column><Text text="Content Download" /></Column></columns><items><ColumnListItem><cells><Text text="{File>fileName} - {File>fileID}" /><Link text="{File>ID}" press="onDownloadFile" /></cells></ColumnListItem></items></Table></VBox></content></Page></pages></App></Shell></mvc:View>\n'
}});