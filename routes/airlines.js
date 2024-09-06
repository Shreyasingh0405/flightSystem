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

        //==================API Routes=========================//
        app.post("/airlineInsertion", airlinesInsertion);
        app.get("/getAirlineDetails", getAirlineDetails);
        app.post("/getAirlinesDetailsByairlinesId", getAirlinesDetailsByairlinesId);
        app.post("/updateAirlinesDetailsById", updateAirlinesDetailsById);
        app.post("/deleteAirlines", deleteAirlines);

    } catch (error) {
        console.error("Error setting up airline routes:", error.message);
    }
};
