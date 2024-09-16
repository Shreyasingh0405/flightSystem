import flight from "../models/flights.js";
import routes from "../models/flightRoutes.js"

const flightInsertion = async function (req, res) {
    const flightDataInsertion = req.body
    try {
        const flightInsertion = await flight.create(flightDataInsertion)
        if (flightInsertion) {
            return res.send({ status: 1, msg: "data inserted successfully" })
        } else {
            return res.send({ status: 0, msg: "something went wrong" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const getFlightsDetails = async function (req, res) {
    try {
        const flightDetails = await flight.find()
        if (flightDetails) {
            return res.send({ status: 1, msg: "data fetch successfully", data: flightDetails })
        } else {
            return res.send({ status: 0, msg: "data not found", data: "[]" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const getFlightsByFlightId = async (req, res) => {
    const flightId = req.body
    try {
        const flightDetailsById = await flight.findById({ _id: flightId.flightId })
        if (flightDetailsById) {
            return res.send({ status: 1, msg: "data fetch successfully", data: flightDetailsById })
        } else {
            return res.send({ status: 0, msg: "data not found", data: "[]" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const updateFlightsDetailsById = async (req, res) => {
    const { flightId, ...updateFlightsDetailsById } = req.body
    try {
        const updateFlightsDetails = await flight.findByIdAndUpdate(
            flightId,
            updateFlightsDetailsById,
            { new: true }
        )
        if (updateFlightsDetails) {
            return res.send({ status: 1, msg: "data update successfully" })
        } else {
            return res.send({ status: 0, msg: "something went wrong" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const deleteFlights = async (req, res) => {
    const deleteFlights = req.body
    try {
        const deleteFlightsDetails = await flight.findByIdAndUpdate({ _id: deleteFlights.flightsId },
            { $set: { status: 1 } }
        )
        if (deleteFlightsDetails) {
            return res.send({ status: 1, msg: "data deleted successfully" })
        } else {
            return res.send({ status: 0, msg: "something went wrong" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const searchFlightsAccordingToRequirement = async (req, res) => {
    const { flightWay, dates, originCity, destinationCity } = req.body;

    try {
        // Fetch route IDs based on city names
        const route = await routes.findOne({
            originCity: originCity,
            destinationCity: destinationCity,
            status: 0 // Assuming 0 means active
        });

        if (!route) {
            return res.send({ status: 0, msg: "No route found with the given origin and destination cities", data: [] });
        }

        // Fetch flights based on route ID and other parameters
        const flights = await flight.find({
            route: route._id,
            flightWay: flightWay,
            schedules: {
                $elemMatch: {
                    dates: dates
                }
            },
            status: 0 // Assuming 0 means active
        }).populate('airline') // Optionally populate the airline if needed
          //.populate('createdBy'); // Optionally populate the creator if needed

        if (flights.length > 0) {
            return res.send({ status: 1, msg: "Data fetched successfully", data: flights });
        } else {
            return res.send({ status: 0, msg: "No flights found", data: [] });
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message });
    }
}

const filterAndSortFlights = async (req, res) => {
    try {
      const { price, travelDuration, departureTime, classType, sortBy } = req.body;
      const filter = {};
      const sort = {};
        if (classType) {
        filter['classes.type'] = classType;
      }
        if (price && classType) {
        filter['classes.price'] = { $lte: Number(price) };
      }
        if (departureTime) {
        filter['schedules.departureTime'] = { $gte: departureTime };
      }
        if (travelDuration) {
        const routeRecords = await routes.find({ travelDuration: { $lte: travelDuration } }).select('_id');
        filter.route = { $in: routeRecords.map(route => route._id) };
      }
        const sortFields = {
        price: 'classes.price',
        departureTime: 'schedules.departureTime',
        travelDuration: 'route.travelDuration'
      };
  
      if (sortBy && sortFields[sortBy]) {
        sort[sortFields[sortBy]] = 1; // 1 for ascending order
      }
  
      // Find the flights based on filters and sort them
      const flights = await flight.find(filter)
        .populate('route', 'originCity destinationCity travelDuration') // Populate route details
        .populate('airline')
        .sort(sort);  // Sort based on the chosen criteria
  
      res.status(200).json(flights);
    } catch (err) {
      console.error('Error filtering and sorting flights:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

export { flightInsertion, getFlightsDetails, getFlightsByFlightId, updateFlightsDetailsById, deleteFlights, searchFlightsAccordingToRequirement,filterAndSortFlights }