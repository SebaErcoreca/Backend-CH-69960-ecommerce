import Express from "express"
import ProductsRouter from "./routers/products.router.js"
import CartsRouter from "./routers/carts.router.js"
import Handlebars from "handlebars"
import handlebars from "express-handlebars"
import ViewsRouter from "./routers/views.router.js"
import __dirname from "./dirname.js"
import path from "path"
import mongoose from "mongoose"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { Server } from "socket.io";
import websocket from "./websocket.js";

//Mongo connection
mongoose
    .connect("mongodb+srv://user0:<pwd>@ecommerce-backend-proje.2h9ioq8.mongodb.net/")
    .then(() => console.log("[MongoDB connected ✅]"))
    .catch((err) => console.log(err))

// App Configuration
const app = Express()
const PORT = 8080

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

// Serve static files
app.use(Express.static(path.join(__dirname, "public")));

const httpServer = app.listen(PORT, () => {
    console.log(`[Listening on port ${PORT}: http://localhost:${PORT}/ 👀]`)
})

//Hbs config
app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
);

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views"));

//Routes
app.use('/api/products', ProductsRouter)
app.use('/api/carts', CartsRouter)
app.use('/', ViewsRouter)

// Socket io
const io = new Server(httpServer);
websocket(io);

app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);