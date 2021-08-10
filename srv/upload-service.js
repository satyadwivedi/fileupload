const cds = require('@sap/cds')
module.exports = function () {
    const {
        FileHeader,
        FileItems
    } = cds.entities("sap.poc.upload");
    // this.on ('submitOrder', (req)=>{...}) //> custom actions
    this.before ('CREATE', `FileHeader`, (req, res)=>{
         if (req.data) {
             
         }
    });
    //this.before ('UPDATE',`*`, (req)=>{...})
    //this.after ('READ',`Books`, (each)=>{...})
    /*this.before('CREATE', `FileHeader`, async (req, res) => {
        let tx = cds.transaction(req);
        if (req.data) {
            var fileID = req.data.fileID;
            var appName = req.data.appName;
           //var HeaderSql = `INSERT INTO "778197AE293946F9ACA52F8AC923DBCA"."SAP_POC_UPLOAD_FILEHEADER" VALUES('${fileID}', '${appName}')`;
            var HeaderSql = `INSERT INTO "778197AE293946F9ACA52F8AC923DBCA"."SAP_POC_UPLOAD_FILEHEADER" (fileID, appName) VALUES ('${fileID}', '${appName}')`;

            var itemsNo = req.data.Items[0].itemsNo;
            var appName = req.data.Items[0].appName;
            var fileName = req.data.Items[0].fileName;
            var mediatype = req.data.Items[0].mediatype;
            var content = req.data.Items[0].content;

           // var ItemSql =    `INSERT INTO FileItems VALUES(${itemsNo}, ${appName}, ${fileName}, ${mediatype}, ${content})`;
            var ItemSql = `INSERT INTO "778197AE293946F9ACA52F8AC923DBCA"."SAP_POC_UPLOAD_FILEITEMS" (itemsNo, appName, fileName, mediatype, content)
             VALUES ('${itemsNo}', '${appName}', '${fileName}', '${mediatype}', '${content}')`;

            try {
               // const oHeaderFile = await tx.run(HeaderSql);
               // const oItem = await tx.run(ItemSql);

            } catch (error) {
                   // return error 
            }

           // return "success";

        } else {
          //  res = 0;
        }
        //return res;
    }) */
}
