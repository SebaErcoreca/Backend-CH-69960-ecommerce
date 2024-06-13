import { Router } from "express";
import fs from "fs"

const ProductsRouter = Router();

const products = JSON.parse(fs.readFileSync('./storage/products.json', 'utf-8'));

ProductsRouter.get("/", (req, res) => {
    res.json(products);
})

ProductsRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params;    
    const product = await products.find(product => product.id == pid);

    if(isNaN(pid) || pid < 1 || pid % 1 !== 0) {
        res.status(404).json({ error: "Couldnt find the product" })
    } else {
        res.json(product);
    }
})

ProductsRouter.post('/', (req, res) => {
    const { title, description, code, price, stock, category } = req.body;
    const newId = products[products.length - 1].id + 1;

    if(!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'All fields are required' })
    } else {
            const newProduct = {
                id: newId,
                title,
                description,
                code,
                price,
                status: true,
                stock,
                category
            }

            products.push(newProduct);
            fs.writeFileSync('./storage/products.json', JSON.stringify(products, null, '\t'));
        }
        res.json(products); 
} 
)

ProductsRouter.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, stock, category } = req.body;

    if(!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'All fields are required' })
    } else {
        const product = products.find(product => product.id == pid);

        if(isNaN(pid) || pid < 1 || pid % 1 !== 0) {
            res.status(404).json({ error: 'Couldnt find product' })
        } else {
            product.title = title;
            product.description = description;
            product.code = code;
            product.price = price;
            product.stock = stock;
            product.category = category;
            fs.writeFileSync('./storage/products.json', JSON.stringify(products, null, '\t'));
            res.json(product);
        }
    }
})

ProductsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    const productIndex = products.findIndex(product => product.id == pid)
    
    if (pid > products[products.length - 1].id) {
        res.status(400).json(`Couldnt find product with id: ${pid}`);
    } else {
        try{
            const product = await products.splice(productIndex, 1)
            res.json(product);
        } catch(err) {
            res.status(400).err;
        };
    }
})

export default ProductsRouter