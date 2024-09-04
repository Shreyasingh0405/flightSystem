// import jwt from "jsonwebtoken";
// import CONFIG from "../config/config.js";
// const authorized = async (req, res, next) => {
// 	try {
// 		const token = req.cookies.userToken;
// 		if (token == null) {
// 			return res.status(401).send("Unauthorized Access");
// 		}
// 		if (token) {
// 			const signToken = jwt.verify(token, CONFIG.JWT_KEY);
// 			if (!signToken) {
// 				return res.status(401).send("Unauthorized Access");
// 			}
// 			if (signToken) {
// 				const checkcreator = await db.findSingleDocument("user", {
// 					email: signToken.email,
// 					_id: new mongoose.Types.ObjectId(signToken.userId),
// 				});
// 				if (!checkcreator) {
// 					return res.status(401).send("Unauthorized Access");
// 				} else {
// 					if (checkcreator.status !== 1) {
// 						return res.status(401).send("Unauthorized Access");
// 					} else {
// 						res.locals.userData = signToken;
// 						next();
// 					}
// 				}
// 			}
// 		}
// 	} catch (error) {
// 		return res.status(401).send("Unauthorized Access");
// 	}
// };
// module.exports = { authorized };