export default async (app) => {
    try {
        //===================controllers===================//
        const {
            routesInsertion,
            getRoutesDetails,
            getRoutesByRouteId,
            updateRoutesDetailsById,
            deleteRoutes
        } = await import("../controllers/routesController.js");
        //===================validations==========================//
        const {
            flightRouteValidation,
            routeIdValidation
        } = await import("../validations/flightRoutes.js")
        //==================API Routes=========================//
        app.post("/routesInsertion", flightRouteValidation, routesInsertion);
        app.get("/getRoutesDetails", getRoutesDetails);
        app.post("/getRoutesByRouteId", routeIdValidation, getRoutesByRouteId);
        app.post("/updateRoutesDetailsById", routeIdValidation, updateRoutesDetailsById);
        app.post("/deleteRoutes", routeIdValidation, deleteRoutes);

    } catch (error) {
        console.error("Error setting up routes:", error.message);
    }
};
