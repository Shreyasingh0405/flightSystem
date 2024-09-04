import { promises as fs } from 'fs';
import jwt from "jsonwebtoken";
import  crypto from "crypto";

// Create Dir
const createDir = async (path) => {
	await fs.mkdir(path, { recursive: true }, (err) => {
		if (err) throw err;
	});
};

// create File
const createFile = async (filePath, fileData, fileEncoding) => {
	await fs.writeFile(filePath, fileData, { encoding: fileEncoding });
};

const otpGenerate = () => {
	let otp = Math.random().toString().substring(2, 8);
	if (otp.length !== 6) {
		otpGenerate();
	} else {
		return otp;
	}
};
function generateUniqueToken() {
	return crypto.randomBytes(20).toString("hex");
}
const checkAccess = function (role) {
	return async (req, res, next) => {
		try {
			let token, verifyAccessToken;
			// Check if the token is present in cookies instead of the Authorization header
			token = req.cookies.userToken;
			if (!token) {
				return res.status(401).send("Unauthorized Access");
			}
			const privateKey = await fs.readFile("privateKey.key", "utf8");
			try {
				// Verify the token using the private key
				verifyAccessToken = jwt.verify(token, privateKey, {
					algorithms: ["RS256"],
				});
			} catch (error) {
				return res.status(401).send("Unauthorized Access");
			}
			// Check if the user's role is allowed
			if (!role.includes(verifyAccessToken.role)) {
				return res.status(401).send("Unauthorized Access");
			}
			// If the token is valid and the role is allowed, proceed to the next middleware or route handler
			next();
		} catch (error) {
			next(error);
		}
	};
};


export default{
	createDir,
	createFile,
	checkAccess,
	otpGenerate,
	generateUniqueToken,
};