using { cuid, managed, sap } from '@sap/cds/common';
namespace sap.poc.upload;

entity FileHeader : managed {
   key fileID : String(4);
      appName : String(20);
   Items: Composition of many FileItems on Items.parent=$self;
}


entity FileItems: cuid {
    fileID : String(4);
    itemsNo : String(5);
    fileName : String(111);
    @Core.IsMediaType : true
    mediaType : String; // @Core.IsMediaType;
    content : LargeBinary @Core.MediaType: mediaType @Core.ContentDisposition.Filename: fileName;
    parent: Association to FileHeader;
}

entity Test : managed {
   key ID : String(4);
    Name: String(20);
    college: String(55);
  } 