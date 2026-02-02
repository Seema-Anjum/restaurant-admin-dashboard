import dotenv from "dotenv";
dotenv.config();
import MenuItem from "./models/menuItem.js";
import connectDB from "./config/db.js";

const menuItems = [
  {
    name: "Paneer Tikka",
    description: "Marinated paneer cubes grilled to perfection",
    category: "Appetizer",
    price: 220,
    ingredients: ["Paneer", "Yogurt", "Spices"],
    preparationTime: 15,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYAud3G3kRsjZe3N5xs6NHI4uw-wx0BqJb1Q&s",
  },
  {
    name: "Veg Manchurian",
    description: "Crispy vegetable balls tossed in Indo-Chinese sauce",
    category: "Appetizer",
    price: 180,
    ingredients: ["Cabbage", "Carrot", "Garlic", "Soy Sauce"],
    preparationTime: 12,
    imageUrl: "https://lh3.googleusercontent.com/proxy/Zluv_eL_oFUxzPWXRgTxPRk_oZD8syjxeZQiHN3HfUH2Toabt2exXxuTDx0NcTQ797A1VifMzoWCQ-y4ZzYyf96Hjzj4gkUZ-2HZNGZqnSaxRRvxrFBOgWhukQ",
  },
  {
    name: "Butter Chicken",
    description: "Classic creamy tomato-based chicken curry",
    category: "Main Course",
    price: 320,
    ingredients: ["Chicken", "Butter", "Tomato", "Cream"],
    preparationTime: 25,
    imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReT_rsrvh4738w-auhOt8j7qaLMbWLcTWUCw&s",
  },
  {
    name: "Paneer Butter Masala",
    description: "Rich and creamy paneer curry",
    category: "Main Course",
    price: 280,
    ingredients: ["Paneer", "Tomato", "Butter", "Cream"],
    preparationTime: 20,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2GVSX6yMjCLHtHBaQwyqjUw1rkC1sF9H8g&s",
  },
  {
    name: "Gulab Jamun",
    description: "Soft milk-solid dumplings soaked in sugar syrup",
    category: "Dessert",
    price: 120,
    ingredients: ["Milk Solids", "Sugar", "Cardamom"],
    preparationTime: 8,
    imageUrl: "https://www.cadburydessertscorner.com/hubfs/dc-website-2022/articles/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know.webp",
  },
  {
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie with rich cocoa flavor",
    category: "Dessert",
    price: 150,
    ingredients: ["Cocoa", "Flour", "Butter"],
    preparationTime: 10,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIzmbySkOEQSrSvM9BKtzXFoMwyUtxoDA0tg&s",
  },
  {
    name: "Fresh Lime Soda",
    description: "Refreshing lime soda (sweet or salted)",
    category: "Beverage",
    price: 90,
    ingredients: ["Lime", "Soda", "Sugar", "Salt"],
    preparationTime: 3,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZc9PFuEKJI9vS31hU5xrhZyQDD7JDabJo5g&s",
  },
  {
    name: "Cold Coffee",
    description: "Chilled coffee blended with milk and ice",
    category: "Beverage",
    price: 140,
    ingredients: ["Coffee", "Milk", "Ice Cream"],
    preparationTime: 5,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwb39dnHXFMWaZpGnWUWIvlUVgdsP40iDTUQ&s",
  },
];

const seedMenu = async () => {
    try{
        await connectDB();
        console.log("MongoDB connected"); 

        await MenuItem.deleteMany();
        console.log("Existing menu cleared");

        await MenuItem.insertMany(menuItems);
        console.log("Menu items seeded successfully");

        process.exit();
    } catch(err) {
        console.log("Error", err.message);
        process.exit(1);
    }
};

seedMenu();