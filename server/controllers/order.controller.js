import Order from "../models/order.js";

// GET orders
export const getOrder = async(req, res) => {
    const { status, page=1, limit=10 } = req.query;

    const filter = status ? { status } : {};
    const orders = await Order.find(filter)
    .skip((page-1) * limit)
    .limit(Number(limit))
    .sort({createdAt: -1});

    res.json(orders);
};

// GET order by id 
export const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "items.menuItem",
        "name price category"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
};

//POST the order 
export const createOrder = async (req, res) => {
    const { items } = req.body;

    const totalAmount = items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0 
    );

    const order = await Order.create({
        ...req.body,
        totalAmount, 
    });

    res.status(201).json(order);
};

// PATCH - update order status 
export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
};
