import { check, validationResult } from "express-validator";

const userRegisterationValidation = [
	check("firstName").notEmpty().withMessage("firstName required"),
	check("lastName").notEmpty().withMessage("lastName required"),
	check("email").notEmpty().withMessage("email required").isEmail().withMessage("email should be in proper format"),
	check("password").notEmpty().withMessage("password is required"),
	check("mobileNo").notEmpty().withMessage("mobileNo is  required"),
    check("dob").notEmpty().withMessage("dob is  required"),
    check("age").notEmpty().withMessage("age is  required"),

	(req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];
const loginUserValidation = [
	check("email")
		.notEmpty()
		.isEmail()
		.withMessage("Email should be required and in proper format"),
	check("password").notEmpty().withMessage("Password should be required"),
	(req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];

const forgotPasswordValidation= [
	check("email")
		.notEmpty()
		.isEmail()
		.withMessage("Email should be required and in proper format"),
	(req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];

const verifyOtpValidation= [
	check("userId").isMongoId().notEmpty().withMessage("userId should be required "),
    check("otp").notEmpty().withMessage("otp is  required"),
    (req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];

const passwordResetValidation= [
	check("userId").isMongoId().notEmpty().withMessage("userId should be required "),
    check("oldPassword").notEmpty().withMessage("oldPassword is  required"),
    check("newPassword").notEmpty().withMessage("newPassword is  required"),
    check("confirmNewPassword").notEmpty().withMessage("confirmNewPassword is  required"),
    (req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];

const userIdDataValidation= [
	check("userId").isMongoId().notEmpty().withMessage("userId should be required "),
    (req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];
export {
    userRegisterationValidation,
    loginUserValidation,
    forgotPasswordValidation,
    verifyOtpValidation,
    passwordResetValidation,
    userIdDataValidation 
};