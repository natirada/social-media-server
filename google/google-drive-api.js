/* 
Google Drive API:
Demonstration to:
1. upload 
2. delete 
3. create public URL of a file.
required npm package: googleapis
*/
const { google } = require('googleapis');
const fs = require('fs');

const CLIENT_ID = process.env.CLIENT_ID_GOOGLE_DRIVE;
const CLIENT_SECRET = process.env.CLIENT_SECRET_GOOGLE_DRIVE;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = process.env.REFRESH_TOKEN_GOOGLE_DRIVE;

const oauth2Client = new google.auth.OAuth2(
   CLIENT_ID,
   CLIENT_SECRET,
   REDIRECT_URI,
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
   version: 'v3',
   auth: oauth2Client,
});

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/

async function uploadFile(file) {
   try {
      return drive.files.create({
         requestBody: {
            name: file.filename,
            mimeType: file.mimetype,
         },
         media: {
            mimeType: file.mimetype,
            body: fs.createReadStream(file.path),
         },
      });
   } catch (error) {
      console.log(error.message);
   }
}

// uploadFile();

async function deleteFile(fileId) {
   try {
      const response = await drive.files.delete({
         fileId,
      });
      console.log(response.data, response.status);
   } catch (error) {
      console.log(error.message);
   }
}

// deleteFile();

async function generatePublicUrl(fileId = '1Bc_wIMxMBGPYPz0JP7nIDp3MIJrmwGec') {
   try {
      await drive.permissions.create({
         fileId,
         requestBody: {
            role: 'reader',
            type: 'anyone',
         },
      });

      /* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */
      const result = await drive.files.get({
         fileId: fileId,
         fields: 'webViewLink, webContentLink',
      });
      console.log(result.data);
   } catch (error) {
      console.log(error.message);
   }
}

// generatePublicUrl();

module.exports = { uploadFile, deleteFile, generatePublicUrl };
