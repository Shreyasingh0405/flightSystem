import airlines from "../models/airlines.js";
const airlinesInsertion = async function (req, res) {
const airlinesDataInsertion = req.body
    try {
        const airlinesInsertion = await airlines.create(airlinesDataInsertion)
        if (airlinesInsertion) {
            return res.send({ status: 1, msg: "data inserted successfully" })
        } else {
            return res.send({ status: 0, msg: "something went wrong" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const getAirlineDetails = async function (req, res) {
    try {
        const airlinesDetails = await airlines.find()
        if (airlinesDetails) {
            return res.send({ status: 1, msg: "data fetch successfully", data: airlinesDetails })
        } else {
            return res.send({ status: 0, msg: "data not found", data: "[]" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const getAirlinesDetailsByairlinesId = async (req, res) => {
    const airlinesId = req.body
    try {
        const airlinesDetailsById = await airlines.findById({ _id: airlinesId.airlinesId })
        if (airlinesDetailsById) {
            return res.send({ status: 1, msg: "data fetch successfully", data: airlinesDetailsById })
        } else {
            return res.send({ status: 0, msg: "data not found", data: "[]" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const updateAirlinesDetailsById = async (req, res) => {
    const { airlinesId, ...updateAirlinesDetailsById } = req.body
    try {
        const updateAirlinesDetails = await airlines.findByIdAndUpdate(
            airlinesId,
            updateAirlinesDetailsById,
            { new: true }
        )
        if (updateAirlinesDetails) {
            return res.send({ status: 1, msg: "data update successfully" })
        } else {
            return res.send({ status: 0, msg: "something went wrong" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const deleteAirlines=async(req,res)=>{
    const deleteAirlines = req.body
    try {
        const deleteAirlinesDetails = await airlines.findByIdAndUpdate({_id:deleteAirlines.airlinesId},
            {$set:{status:1}}
        )
        if(deleteAirlinesDetails){
            return res.send({ status: 1, msg: "data deleted successfully" })
        } else {
            return res.send({ status: 0, msg: "something went wrong" })
        }
     } catch (error) {
        return res.send({ status: 0, msg: error.message })
     }
    }

export { airlinesInsertion, getAirlineDetails, getAirlinesDetailsByairlinesId, updateAirlinesDetailsById,deleteAirlines }