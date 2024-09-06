import routesSchema from "../models/routesSchema.js";
const routesInsertion = async function (req, res) {
const routesDataInsertion = req.body
    try {
        const routesInsertion = await routesSchema.create(routesDataInsertion)
        if (routesInsertion) {
            return res.send({ status: 1, msg: "data inserted successfully" })
        } else {
            return res.send({ status: 0, msg: "something went wrong" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const getRoutesDetails = async function (req, res) {
    try {
        const routesDetails = await routesSchema.find()
        if (routesDetails) {
            return res.send({ status: 1, msg: "data fetch successfully", data: routesDetails })
        } else {
            return res.send({ status: 0, msg: "data not found", data: "[]" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const getRoutesByRouteId = async (req, res) => {
    const routesId = req.body
    try {
        const routesDetailsById = await routesSchema.findById({ _id: routesId.routesId })
        if (routesDetailsById) {
            return res.send({ status: 1, msg: "data fetch successfully", data: routesDetailsById })
        } else {
            return res.send({ status: 0, msg: "data not found", data: "[]" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const updateRoutesDetailsById = async (req, res) => {
    const { routesId, ...updateRoutesDetailsById } = req.body
    try {
        const updateRoutesDetails = await routesSchema.findByIdAndUpdate(
            routesId,
            updateRoutesDetailsById,
            { new: true }
        )
        if (updateRoutesDetails) {
            return res.send({ status: 1, msg: "data update successfully" })
        } else {
            return res.send({ status: 0, msg: "something went wrong" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

const deleteRoutes=async(req,res)=>{
    const deleteRoutes = req.body
    try {
        const deleteRoutesDetails = await routesSchema.findByIdAndUpdate({_id:deleteRoutes.routesId},
            {$set:{status:1}}
        )
        if(deleteRoutesDetails){
            return res.send({ status: 1, msg: "data deleted successfully" })
        } else {
            return res.send({ status: 0, msg: "something went wrong" })
        }
     } catch (error) {
        return res.send({ status: 0, msg: error.message })
     }
    }

export { routesInsertion, getRoutesDetails, getRoutesByRouteId, updateRoutesDetailsById,deleteRoutes }