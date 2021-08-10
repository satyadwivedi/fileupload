using { sap.poc.upload as up, sap.common } from '../db/upload-model';
@(impl:'./upload-service.js')
service uploadService @(path:'/browseUpload') {

entity FileHeader as projection on up.FileHeader;
entity FileItems as projection on up.FileItems;
entity Test as projection on up.Test; 


//function createFile(appName: String(20)) returns FileItems;
  
}