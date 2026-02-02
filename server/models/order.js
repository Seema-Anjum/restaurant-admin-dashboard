import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true },
    items: [
        {
            menyItem:{ type:mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
            quantity: { type: Number, required:true },
            price: { type: Number,required: true },
        },
    ],
    totalAmount: Number,
    status: {
        type: String,
        enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
        default: "Pending",
    },
    customerName: String,
    tableNumber: Number,
},
{ timestamps: true } // createdAt, updatedAt
);

// Auto-generate order number 
orderSchema.pre("save", function() {
    if (!this.orderNumber) {
        this.orderNumber = `ORD-${Date.now()}`;
    }
});

export default mongoose.model("Order", orderSchema);