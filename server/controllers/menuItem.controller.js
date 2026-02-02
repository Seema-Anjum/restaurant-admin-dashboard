import mongoose from "mongoose";
import MenuItem from "../models/menuItem.js"; 

// GET all items in the menu
export const getMenuItems = async (req, res) => {
    try {
        const { category, isAvailable, minPrice, maxPrice } = req.query;
        
        const filter = {};
        if (category) filter.category = category;
        if (isAvailable !== undefined) 
            filter.isAvailable = isAvailable === "true";
        if (minPrice || maxPrice)
            filter.price = {
              $gte: Number(minPrice) || 0,
              $lte: Number(maxPrice) || Number.MAX_SAFE_INTEGER,        
            };
        
        const items = await MenuItem.find(filter).sort({createdAt: -1}); 
        res.json(items);
    } catch (error) {
        console.log("Error in fetching menuItems:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

// GET items by name or ingredients 
export const searchMenuItems = async (req, res) => {
    try{
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: "Query required" });

        const items = await MenuItem.find({ $text: { $search: query } });
        res.json(items);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

//GET item by id 
export const getMenuItemById = async (req, res) => {
    const item = await MenuItem.findById(req.params.id);
    if(!item) return res.status(404).json({message: "Menu item not found" });
    res.json(item);
};

//POST item 
export const createMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.create(req.body);
        console.log("Item added successfully");
        res.status(201).json({message: "Item added successfully", item});
    } catch(err) {
        res.status(400).json({message: err.message})
    }
};

// PUT - Update item 
export const updateMenuItem = async (req, res) => {
    const item = await MenuItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    else {
        res.json(item);
        console.log("Item Updated Successfully");
    }   
};

//DELETE item 
export const deleteMenuItem = async (req, res) => {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.status(204).send().json({message:"Item Deleted Successfully"});
};

// PATCH 
export const toggleAvailability = async (req, res) => {
    const item = await MenuItem.findById(req.params.id);
    if(!item) return res.status(404).json({message: "Menu item not found"});

    item.isAvailable = !item.isAvailable;
    await item.save();
    res.json({ message: "Toggled availability Status", item });
};