import { Router } from "express";
import fs from "fs"

const CartsRouter = Router();

const products = JSON.parse(fs.readFileSync('./storage/products.json', 'utf-8'));
const carts = JSON.parse(fs.readFileSync('./storage/carts.json', 'utf-8'));

CartsRouter.get('/', (req, res) => {
    res.json(carts);
})

CartsRouter.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = carts.find(cart => cart.id == cid);
    
    if (cid > carts[carts.length - 1].id || cid < 1 || !cart) {
        res.status(400).json(`Couldnt find the cart with id: ${cid}, select one between 1 and ${carts[carts.length - 1].id}`)
    } else {
        try {
            res.json(cart);
        } catch (err) {
            console.log(err)
        }
    }
})

CartsRouter.post('/', (req, res) => {
    const newId = carts[carts.length - 1].id + 1;
    const newCart = {
        id: newId,
        products: []
    };

    carts.push(newCart);
    fs.writeFileSync('./storage/carts.json', JSON.stringify(carts, null, '\t'));
    res.json(carts);
})

CartsRouter.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;

    const cart = carts.find(cart => cart.id == cid);
    const product = products.find(product => product.id == pid);
    const isExistent = cart.products.find(product => product.product == pid);

    if (cid > carts[carts.length - 1].id || cid < 1 || !cart) {
        res.status(400).json(`Couldnt find the cart with id: ${cid}, select one between 1 and ${carts[carts.length - 1].id}`)
    } else if (!product) {
        res.status(400).json(`Couldnt find the product with id: ${pid}, select one between 1 and ${products[products.length - 1].id}`)
    } else {
        try {
            if (isExistent) {
                isExistent.quantity += 1;
            } else {
                cart.products.push({ product: product.id, quantity: 1 });
            }
            fs.writeFileSync('./storage/carts.json', JSON.stringify(carts, null, '\t'));
            res.json(cart);
        } catch (err) {
            console.log(err)
        }
    }
})

export default CartsRouter