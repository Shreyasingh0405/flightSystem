export default async (app) => {
    try {
        //===================controllers===================//
        const { 
            airlinesInsertion, 
            getAirlineDetails, 
            getAirlinesDetailsByairlinesId, 
            updateAirlinesDetailsById, 
            deleteAirlines 
        } = await import("../controllers/airlines.js");
        //==================validations=======================//
        const{
            airlineValidation,
            airlineIdValidation 
        }= await import("../validations/airline.js")
        //==================API Routes=========================//
        app.post("/airlineInsertion",airlineValidation, airlinesInsertion);
        app.get("/getAirlineDetails", getAirlineDetails);
        app.post("/getAirlinesDetailsByairlinesId",airlineIdValidation,getAirlinesDetailsByairlinesId);
        app.post("/updateAirlinesDetailsById",airlineIdValidation, updateAirlinesDetailsById);
        app.post("/deleteAirlines",airlineIdValidation, deleteAirlines);

    } catch (error) {
        console.error("Error setting up airline routes:", error.message);
    }
};
