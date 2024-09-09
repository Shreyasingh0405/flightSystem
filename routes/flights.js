export default async (app) => {
    try {
        //===================controllers===================//
        const { 
            flightInsertion, 
            getFlightsDetails, 
            getFlightsByFlightId, 
            updateFlightsDetailsById, 
            deleteFlights,
            searchFlightsAccordingToRequirement 
        } = await import("../controllers/flights.js");

        //==================API Routes=========================//
        app.post("/flightInsertion", flightInsertion);
        app.get("/getFlightsDetails", getFlightsDetails);
        app.post("/getFlightsByFlightId", getFlightsByFlightId);
        app.post("/updateFlightsDetailsById", updateFlightsDetailsById);
        app.post("/deleteFlights", deleteFlights);
        app.post("/searchFlightsAccordingToRequirement",searchFlightsAccordingToRequirement)

    } catch (error) {
        console.error("Error setting up airline routes:", error.message);
    }
};
