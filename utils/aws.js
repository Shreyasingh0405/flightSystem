import { getSignedUrl} from "@aws-sdk/s3-request-presigner";
import{ Upload } from "@aws-sdk/lib-storage";
import{
	GetObjectCommand,
	S3,
	S3Client,
	HeadObjectCommand,
} from "@aws-sdk/client-s3";
import config from "../config/config.js";

const s3 = new S3({
	credentials: {
		accessKeyId: config.ACCESS_KEY,
		secretAccessKey: config.SECRET_KEY,
	},
	region: config.REGION,
});

const client = new S3Client({
	region: config.REGION,
	credentials: {
		accessKeyId: config.ACCESS_KEY,
		secretAccessKey: config.SECRET_KEY,
	},
});

async function uploadFile(params, fileObject) {
	try {
		params.ContentDisposition = "inline";
		await new Upload({
			client: s3,
			params,
		}).done();
		return fileObject;
	} catch (error) {
		throw new Error(error.message);
	}
}

const uploadToAws = async (mainFolder, folder, files) => {
	// Check if the main folder exists
	const mainFolderExists = await checkIfFolderExists(
		config.BUCKET_NAME,
		mainFolder
	);

	// If the main folder doesn't exist, create it
	if (!mainFolderExists) {
		await createFolder(config.BUCKET_NAME, mainFolder);
	}

	const filesArray = Array.isArray(files) ? files : [files];
	const uploadPromises = filesArray.map((file) => {
		const params = {
			Bucket: config.BUCKET_NAME,
			Key: `${mainFolder}/${folder}/${file.name}`, // Include the main folder in the Key
			Body: file.data,
			ContentType: "image/jpg/pdf/jpeg",
		};

		return uploadFile(params, {
			href: `${mainFolder}/${folder}/${file.name}`,
			name: file.name,
			size: file.size,
		});
	});

	try {
		const locations = await Promise.all(uploadPromises);
		return locations.filter(Boolean);
	} catch (error) {
		console.error("Error uploading files:", error);
		// Handle the error as needed
		throw new Error(error.message);
	}
};

// Function to check if a folder exists
const checkIfFolderExists = async (bucketName, folderName) => {
	try {
		await client.send(
			new HeadObjectCommand({ Bucket: bucketName, Key: folderName + "/" })
		);
		return true; // Folder exists
	} catch (error) {
		if (error.$metadata?.httpStatusCode === 404) {
			// doesn't exist and permission policy includes s3:ListBucket
			return false;
		} else if (error.$metadata?.httpStatusCode === 403) {
			// doesn't exist, permission policy WITHOUT s3:ListBucket
			return false;
		} else {
			throw error; // Other error occurred
		}
	}
};

// Function to create a folder
const createFolder = async (bucketName, folderName) => {
	const params = {
		Bucket: bucketName,
		Key: folderName + "/", // Add trailing slash to indicate it's a folder
		Body: "", // Empty body for creating a folder
	};

	try {
		await new Upload({
			client: s3,
			params,
		}).done();
	} catch (error) {
		console.error("Error creating folder:", error);
		// Handle the error as needed
		throw new Error(error.message);
	}
};

async function getS3SignedUrl(fileName) {
	try {
		return await getSignedUrl(
			s3,
			new GetObjectCommand({
				Bucket: config.BUCKET_NAME,
				Key: fileName,
			}),
			{
				expiresIn: 60 * 60,
			}
		);
	} catch (error) {
		throw new Error(error.message);
	}
}

const deleteFile = async (fileLocation) => {
	try {
		await s3.deleteObject({
			Bucket: config.BUCKET_NAME,
			Key: fileLocation,
		});
		console.log("File deleted successfully");
	} catch (error) {
		throw new Error(error.message);
	}
};

exports = {
	uploadToAws,
	deleteFile,
	createFolder,
	getSignedUrl: getS3SignedUrl,
};