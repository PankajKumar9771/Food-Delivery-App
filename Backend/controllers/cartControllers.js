import userModel from "../models/userModels.js";

//add cart items

const addToCart = async (req, res) => {
  try {
    // const userData = await userModel.findOne({ _id: req.body.userId });
    const userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    console.log(cartData[req.body.itemId]);
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: false, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "ERROR" });
  }
};

//remove from cart

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "ERROR" });
  }
};

//getItem from the cart

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "ERROR" });
  }
};

export { addToCart, removeFromCart, getCart };
