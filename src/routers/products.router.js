import { Router } from "express";
import { ProductManager } from "../managers/productManager.js"

const ProductsRouter = Router();
const productManager = new ProductManager();

//get all products
ProductsRouter.get("/", async (req, res) => {
    try {
        const result = await productManager.getAllProducts(req.query);

        res.send({
            status: "success",
            payload: result,
        })

    } catch (error) {
        res.status(500).json({ error });
    }
});

//find product by id
ProductsRouter.get("/:pid", async (req, res) => {
    try {
        const result = await productManager.getProductByID(req.params.pid);
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

//create new product
ProductsRouter.post('/', async (req, res) => {
    try {
        const result = await productManager.createProduct(req.body);
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
})

ProductsRouter.put('/:pid', async (req, res) => {
    try {
        const result = await productManager.updateProduct(req.params.pid, req.body);
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
})

ProductsRouter.delete('/:pid', async (req, res) => {
    try {
        const result = await productManager.deleteProduct(req.params.pid);
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
})

export default ProductsRouter