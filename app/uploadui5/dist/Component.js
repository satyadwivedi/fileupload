sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/satya/upload/uploadui5/model/models"],function(e,t,i){"use strict";return e.extend("com.satya.upload.uploadui5.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});