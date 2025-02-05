import mongoose from 'mongoose';
const objectId = mongoose.Schema.Types.ObjectId;

const flightSchema = new mongoose.Schema({
    airline: {
        type: objectId,
        ref: "airlines",
        required: true,
        trim: true
    },
    flightNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    route: {
        type: objectId,
        ref: "routes",
        required: true
    },
    flightWay: {
        type: String,
        enum: ['One-way', 'Round-trip', 'Multi-city'],
        required: true
    },
    schedules: [
        {
            dayOfWeek: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                required: true
            },
            dates: {
                type: Date,
                required: true,
                trim: true
            },
            departureTime: {
                type: String,
                required: true
            },
            arrivalTime: {
                type: String,
                required: true
            },
            flightStatus: {
                type: String,
                enum: ['On Time', 'Delayed', 'Cancelled', 'Landed'],
                default: 'On Time'
            }
        },
    ],
    aircraftType: {
        type: String,
        required: true,
        trim: true
    },
    classes: [
        {
            type: {
                type: String,
                enum: ['Economy', 'Business', 'First'],
                required: true
            },
            availableSeats: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        },
    ],
    amenities: [
        {
            type: {
                type: String,
                enum: ['WiFi', 'In-flight Entertainment', 'Meals', 'Extra Legroom', 'Power Outlets', 'Blankets', 'Priority Boarding'],
            },
            menu: [
                {
                    type: {
                        type: String,
                        enum: ['Veg', 'Non-Veg'],
                    },
                    price: {
                        type: Number,
                    },
                    quantityAvailable: {
                        type: Number,
                    },
                    quantityNeeded: {
                        type: Number,
                        default: 0
                    }
                },
            ]
        },
    ],
    createdBy: {
        type: objectId,
        ref: "users",
        required: true,
        trim: true
    },
    status: {
        type: Number,
        enum: [0, 1], // 0:active,1:deleted
        default: 0
    }
},
    { timestamps: true, versionKey: false });

export default mongoose.model('Flight', flightSchema);
