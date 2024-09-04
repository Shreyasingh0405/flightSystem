import users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";
import common from "../utils/common.js";
import sendEmail from "../utils/nodemailer.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs/promises";
import { ObjectId } from "mongodb"; // Correct import for ObjectId

// Use this to get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registration = async (req, res) => {
    try {
        const register = req.body;
        const checkIsEmailExist = await users.findOne({ email: register.email }); // Corrected to findOne
        if (checkIsEmailExist) {
            return res.send({ status: 0, msg: "Email already exists" }); // Changed status to 0 to reflect an error state
        }
        register.password = bcrypt.hashSync(register.password, 10);
        const registerData = await users.create(register);
        if (registerData) {
            return res.send({
                status: 1,
                message: "Data inserted successfully",
            });
        } else {
            return res.send({ status: 0, message: "Something went wrong" });
        }
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
};

const loginUser = async function (req, res) {
    const { email, password } = req.body
    try {
        const checkUserEmail = await users.findOne({ email })
        if (!checkUserEmail) {
            return res.status(404).send({ status: 0, message: "No user found" });
        }
        bcrypt.compare(password, checkUserEmail.password, function (err, result) {
            if (result === true) {
                const token = jwt.sign(
                    {
                        userId: checkUserEmail._id,
                        email: checkUserEmail.email,
                        //role: checkUserEmail.role,
                    },
                    CONFIG.JWT_KEY,
                    { algorithm: "RS256", expiresIn: "1d" }
                );
                if (token) {
                    return res.send({
                        status: 1,
                        msg: "login succesfully",
                        data: token,
                    });
                }
            } else if (err) {
                return res.send({
                    status: 0,
                    msg: "User name or Password is Invalid",
                });
            }
            return res.send({
                status: 0,
                msg: "User name or Password is Invalid",
            });
        });

    }
    catch (error) {
        console.log("Error in Login", error.message);
        return res.send({
            status: 0,
            msg: "Error While Logging in Please Try Again",
        });
    };
}


const verifyOTP = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        // Find the user with the provided userId and otp
        const otpVerification = await users.findOne({
            _id: new ObjectId(userId),
            otp: otp,
        });

        if (otpVerification && otpVerification.otp === otp) {
            const currentTime = new Date();

            // Check if the OTP is expired
            if (currentTime >= otpVerification.otpExpiration) {
                return res.send({ status: 0, msg: "OTP timeout" });
            }

            // Delete OTP and expiration time after verification
            const updateResult = await users.updateOne(
                { _id: new ObjectId(userId) },
                { $unset: { otp: "", otpExpiration: "" } }
            );

            if (updateResult.modifiedCount > 0) {
                const emailTemplatePath = path.join(__dirname, "..", "views", "registrationSuccessfulVerifiedOtp.ejs");
                const emailTemplate = await fs.readFile(emailTemplatePath, "utf8");
                const emailContent = ejs.render(emailTemplate, { userId });

                const mailOptions = {
                    from: CONFIG.SMTP_USER,
                    to: otpVerification.email,
                    subject: "OTP Verification",
                    html: emailContent,
                };

                // Send the email notification
                await sendEmail(mailOptions);

                // Send a success response
                return res.send({
                    status: 1,
                    msg: "OTP verified successfully",
                });
            } else {
                return res.send({ status: 0, msg: "Failed to remove OTP data" });
            }
        } else {
            return res.send({ status: 0, msg: "Invalid OTP" });
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message });
    }
};

const forgotPasswordEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await users.findOne({ email });

        if (!user) {
            return res.send({ status: 0, msg: "User not found" });
        }

        const otp = common.otpGenerate();
        const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

        const forgotPassword = await users.findOneAndUpdate(
            { email },
            { otp, otpExpiration: expirationTime }
        );

        if (forgotPassword) {
            const templatePath = path.join(__dirname, "..", "views", "forgotPasswordEmail.ejs");
            const htmlContent = await ejs.renderFile(templatePath, { otp, expirationTime });

            const mailOptions = {
                from: CONFIG.SMTP_USER,
                to: email,
                subject: "Reset Your Password",
                html: htmlContent,
            };

            await sendEmail(mailOptions);

            return res.send({
                status: 1,
                message: "OTP sent to email successfully",
            });
        } else {
            return res.send({
                status: 0,
                message: "Failed to process request",
            });
        }
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword, confirmNewPassword } = req.body;
        // Check if new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).send({ status: 0, msg: "New password and confirm password do not match" });
        }

        // Fetch user from the database by userId
        const user = await users.findById(userId);

        if (!user) {
            return res.status(404).send({ status: 0, msg: "User not found" });
        }

        // Check if the old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({ status: 0, msg: "Old password is incorrect" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds

        // Update user's password in the database
        user.password = hashedPassword;
        await user.save();

        return res.send({ status: 1, msg: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).send({ status: 0, msg: error.message });
    }
};

const getData = async (req, res) => {
    try {
        const registeredData = await users.find();
        if (registeredData.length > 0) {
            return res.status(200).send({
                status: 1,
                message: "Data retrieved successfully",
                data: registeredData,
            });
        } else {
            return res.status(404).send({ status: 0, message: "No data found" });
        }
    } catch (error) {
        console.error("Error during data retrieval:", error);
        return res.status(500).send({ status: 0, message: error.message });
    }
};

const getDataById = async (req, res) => {
    const getUserDataById = req.body
    try {
        const getId = await users.findById(getUserDataById._id).select('-password -updatedAt -createdAt');
        if (getId) {
            return res.send({ status: 1, msg: "data fetch successfully", data: getId })
        } else {
            return res.send({ status: 0, msg: "no data found" })
        }
    } catch (error) {
        console.error("Error during data retrieval:", error);
        return res.status(500).send({ status: 0, message: error.message });
    }
}

const updateDataById = async function(req,res){
    const { userId, ...updateData } = req.body;
    try {
        const updateUserData = await users.findByIdAndUpdate(
            userId,
            updateData,
             {new: true},

        )
        if (
			updateUserData.matchedCount !== 0 &&
			updateUserData.modifiedCount !== 0
		){
        return res.send({
            status: 1,
            message: "data updated successfully",
        });
    } else {
        return res.send({
            status: 0,
            message: "Facing issue in update data",
        });
    }
    } catch (error) {
        console.error("Error during data retrieval:", error);
        return res.status(500).send({ status: 0, message: error.message });
    }
}

export {
    getData,
    registration,
    loginUser,
    verifyOTP,
    forgotPasswordEmail,
    getDataById,
    resetPassword,
    updateDataById
};
