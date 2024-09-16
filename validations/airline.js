import { check, validationResult } from "express-validator";

const airlineValidation = [
	check("airlineName").notEmpty().withMessage("airlineName required"),
	check("airlineCode").notEmpty().withMessage("airlineCode required"),
	check("createdBy").isMongoId().notEmpty().withMessage("createdBy required"),
    check("contactInfo.email").isEmail().notEmpty().withMessage("email is required"),
    check("contactInfo.mobileNo").notEmpty().withMessage("mobile is required"),
    check("contactInfo.address").notEmpty().withMessage("address required"),
        (req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];

const airlineIdValidation= [
	check("airlinesId").notEmpty().withMessage("airlinesId should be required "),
    (req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];
export {
    airlineValidation,
    airlineIdValidation 
};