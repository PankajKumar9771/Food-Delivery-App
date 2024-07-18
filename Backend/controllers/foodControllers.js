import foodModel from "../models/foodModels.js";
import fs from "fs";

//add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  // console.log(image_filename);
  // console.log(req.body);
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error  " });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

const removeFood = async (req, res) => {
  try {
    console.log(req.body.id);
    const food = await foodModel.findById(req.body.id);
    console.log(food);
     fs.unlink(`uploads/${food.image}`, () => { });
   
    await foodModel.findByIdAndDelete(req.body.id);
    // await foodModel.deleteMany({});
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};
export { addFood, listFood, removeFood };
