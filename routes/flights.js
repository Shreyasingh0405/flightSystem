export default async (app) => {
    try {
        //===================controllers===================//
        const {
            flightInsertion,
            getFlightsDetails,
            getFlightsByFlightId,
            updateFlightsDetailsById,
            deleteFlights,
            filterAndSortFlights,
            searchFlightsAccordingToRequirement
        } = await import("../controllers/flights.js");

        //===============Validations=========================//
        const {
            airlineInsertionValidation,
            flightsByFlightIdValidation
        } = await import("../validations/flights.js")
        //==================API Routes=========================//
        app.post("/flightInsertion", airlineInsertionValidation, flightInsertion);
        app.get("/getFlightsDetails", getFlightsDetails);
        app.post("/getFlightsByFlightId", flightsByFlightIdValidation, getFlightsByFlightId);
        app.post("/updateFlightsDetailsById", flightsByFlightIdValidation, updateFlightsDetailsById);
        app.post("/deleteFlights", flightsByFlightIdValidation, deleteFlights);
        app.post("/searchFlightsAccordingToRequirement", searchFlightsAccordingToRequirement);
        app.post("/filterAndSortFlights", filterAndSortFlights)

    } catch (error) {
        console.error("Error setting up airline routes:", error.message);
    }
};
