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

        //==================API Routes=========================//
        app.post("/routesInsertion", routesInsertion);
        app.get("/getRoutesDetails", getRoutesDetails);
        app.post("/getRoutesByRouteId", getRoutesByRouteId);
        app.post("/updateRoutesDetailsById", updateRoutesDetailsById);
        app.post("/deleteRoutes", deleteRoutes);

    } catch (error) {
        console.error("Error setting up routes:", error.message);
    }
};
