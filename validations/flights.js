import { check, validationResult } from "express-validator";

const airlineInsertionValidation = [
	check("airline").isMongoId().notEmpty().withMessage("airlineId required"),
	check("flightNumber").notEmpty().withMessage("flightNumber required"),
	check("route").isMongoId().notEmpty().withMessage("routeId is required"),
	check("flightWay").notEmpty().withMessage("flightWay is required"),
	check("schedules.*.dates").notEmpty().withMessage("dates is  required"),
    check("schedules.*.departureTime").notEmpty().withMessage("departureTime is  required"),
    check("schedules.*.arrivalTime").notEmpty().withMessage("arrivalTime is  required"),
    check("schedules.*.flightStatus").notEmpty().withMessage("flightStatus is  required"),
    check("schedules.*.dayOfWeek").notEmpty().withMessage("day of week is  required"),
    check("aircraftType").notEmpty().withMessage("aircraftType is  required"),
    check("classes.*.type").notEmpty().withMessage("type is required"),
	check("classes.*.availableSeats").notEmpty().withMessage("availableSeats required"),
	check("classes.*.price").notEmpty().withMessage("price is required"),
	check("createdBy").isMongoId().notEmpty().withMessage("flightWay is required"),

	(req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];
const flightsByFlightIdValidation= [
	check("flightId").isMongoId().notEmpty().withMessage("flightId should be required "),
    (req, res, next) => {
		const errors = validationResult(req).array();
		if (errors.length > 0) {
			return res.send({ status: 0, message: errors[0].msg });
		}
		return next();
	},
];
export {
    airlineInsertionValidation,
    flightsByFlightIdValidation
};