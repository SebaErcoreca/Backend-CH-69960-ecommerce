import { Router } from "express";
import { ProductManager } from "../managers/productManager.js";
import { CartManager } from "../managers/cartManager.js";

const CartRouter = Router();
const productManager = new ProductManager();
const cartManager = new CartManager(productManager);

CartRouter.get("/:cid", async (req, res) => {
  try {
    const result = await cartManager.getProductsFromCartByID(req.params.cid);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

CartRouter.post("/", async (req, res) => {
  try {
    const result = await cartManager.createCart();
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

CartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const result = await cartManager.addProductByID(
      req.params.cid,
      req.params.pid
    );
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

CartRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const result = await cartManager.deleteProductByID(
      req.params.cid,
      req.params.pid
    );
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

CartRouter.put("/:cid", async (req, res) => {
  try {
    const result = await cartManager.updateAllProducts(
      req.params.cid,
      req.body.products
    );
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

CartRouter.put("/:cid/product/:pid", async (req, res) => {
  try {
    const result = await cartManager.updateProductByID(
      req.params.cid,
      req.params.pid,
      req.body.quantity
    );
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

CartRouter.delete("/:cid", async (req, res) => {
  try {
    const result = await cartManager.deleteAllProducts(req.params.cid);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});

export default CartRouter;