import Order from "../models/order.js";

export const getTopSellers = async (req, res) => {
try{
   const data = await Order.aggregate([
    { $unwind: "$items" },
    { $group: {
        _id: "$items.menuItem",
        totalQty: { $sum: "$items.quantity" }
    }},
    { $lookup: {
        from: "menuitems",
        localField: "_id",
        foreignField: "_id",
        as: "details"
    }},
    { $sort: { totalQty: -1 } },
    { $limit: 5 }
  ]);

  res.json(data);
} catch (err) {
    res.status(500).json({message: err.message});
}
};
