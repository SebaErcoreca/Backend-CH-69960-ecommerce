import Express from "express"
import ProductsRouter from "./routers/products.router.js"
import CartsRouter from "./routers/carts.router.js"
import Handlebars from "express-handlebars"
import ViewsRouter from "./routers/views.router.js"
import __dirname from "./dirname.js"
import path from "path"
import fs from "fs"
import { Server } from "socket.io"

const app = Express()
const PORT = 8080

// App Configuration
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
//app.use(Express.static(path.resolve(__dirname, "../public")))

const server = app.listen(PORT, () => {
    console.log(`[Listening on port ${PORT}: http://localhost:${PORT}/ 👀]`)
})

app.use('/api/products', ProductsRouter)
app.use('/api/carts', CartsRouter)

app.engine("hbs", Handlebars.engine({extname: "hbs", defaultLayout: "main",}))

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`)
app.use(Express.static(path.resolve(__dirname, "../public")))
app.use("/", ViewsRouter)

// Socket.io configuration
const io = new Server(server)

const products = JSON.parse(fs.readFileSync("./storage/products.json", "utf-8"))

io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`)
    })

    socket.emit("getProducts", products);
})