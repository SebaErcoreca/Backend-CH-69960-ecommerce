import { Router } from "express"
import fs from "fs"

const ViewsRouter = Router()
let products = JSON.parse(fs.readFileSync("./storage/products.json", "utf-8"))

ViewsRouter.get("/", (req, res) => {
  res.render("home", { products })
})

ViewsRouter.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", { products })
})

export default ViewsRouter