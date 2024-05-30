import Express from "express"
import productsRoutes from "./src/routers/products.router.js"
import cartRoutes from "./src/routers/carts.router.js"

const app = Express();

const PORT = 8080;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`[Listening on port ${PORT}: http://localhost:${PORT}/ 👀]`)
})

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartRoutes);