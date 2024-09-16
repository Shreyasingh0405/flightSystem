import { check, validationResult } from "express-validator";

const flightRouteValidation = [
	check("originCity").notEmpty().withMessage("originCity required"),
	check("destinationCity").notEmpty().withMessage("destinationCity required"),
	check("createdBy").isMongoId().notEmpty().withMessage("createdBy required"),
	check("travelDuration").notEmpty().withMessage("travelDuration is required"),
	(req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];

const routeIdValidation= [
	check("routesId").isMongoId().notEmpty().withMessage("routesId should be required "),
    (req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];
export {
    flightRouteValidation,
    routeIdValidation 
};