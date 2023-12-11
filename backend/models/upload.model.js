import multer from 'multer';
import { MulterAzureStorage } from 'multer-azure-blob-storage';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

const resolveBlobName = (req, file) => {
    return new Promise((resolve, reject) => {
        const blobName = `${new Date().toJSON().slice(0, -1)}_${uuidv4()}_${file.originalname}`;
        resolve(blobName);
    });
};

const azureStorage = new MulterAzureStorage({
    accountName: process.env.AZURE_ACCOUNT,
    connectionString: process.env.AZURE_CONNECTIONSTRING,
    accessKey: process.env.AZURE_KEY,
    containerName: process.env.AZURE_CONTAINER,
    blobName: resolveBlobName,
});

const upload = multer({
    storage: azureStorage
});

export default upload;