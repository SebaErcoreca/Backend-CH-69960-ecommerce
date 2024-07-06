import CartModel from "../models/cart.model.js";

class CartManager {
  constructor(ProductManager) {
    this.ProductManager = ProductManager;
  }

  async getAllCarts() {
    return CartModel.find();
  }

  async getProductsFromCartByID(cid) {
    const cart = await CartModel
      .findOne({ _id: cid })
      .populate("products.product");

    if (!cart) throw new Error(`The Cart ${cid} does not exist`);

    return cart;
  }

  async createCart() {
    return await CartModel.create({ products: [] });
  }

  async addProductByID(cid, pid) {
    await this.ProductManager.getProductByID(pid);

    const cart = await CartModel.findOne({ _id: cid });

    if (!cart) throw new Error(`The Cart ${cid} does not exist`);

    let i = null;
    const result = cart.products.filter((item, index) => {
      if (item.product.toString() === pid) i = index;
      return item.product.toString() === pid;
    });

    if (result.length > 0) {
      cart.products[i].quantity += 1;
    } else {
      cart.products.push({
        product: pid,
        quantity: 1,
      });
    }
    await CartModel.updateOne({ _id: cid }, { products: cart.products });

    return await this.getProductsFromCartByID(cid);
  }

  async deleteProductByID(cid, pid) {
    await this.ProductManager.getProductByID(pid);

    const cart = await CartModel.findOne({ _id: cid });

    if (!cart) throw new Error(`The Cart ${cid} does not exist`);

    let i = null;
    const newProducts = cart.products.filter(
      (item) => item.product.toString() !== pid
    );

    await CartModel.updateOne({ _id: cid }, { products: newProducts });

    return await this.getProductsFromCartByID(cid);
  }

  async updateAllProducts(cid, products) {
    //Validate if exist products
    for (let key in products) {
      await this.ProductManager.getProductByID(products[key].product);
    }

    await CartModel.updateOne({ _id: cid }, { products: products });

    return await this.getProductsFromCartByID(cid);
  }

  async updateProductByID(cid, pid, quantity) {
    if (!quantity || isNaN(parseInt(quantity)))
      throw new Error(`Please input a valid quantity`);

    await this.ProductManager.getProductByID(pid);

    const cart = await CartModel.findOne({ _id: cid });

    if (!cart) throw new Error(`The Cart ${cid} does not exist`);

    let i = null;
    const result = cart.products.filter((item, index) => {
      if (item.product.toString() === pid) i = index;
      return item.product.toString() === pid;
    });

    if (result.length === 0)
      throw new Error(`Product ${pid} does not exist on cart ${cid}`);

    cart.products[i].quantity = parseInt(quantity);

    await CartModel.updateOne({ _id: cid }, { products: cart.products });

    return await this.getProductsFromCartByID(cid);
  }

  async deleteAllProducts(cid) {
    await CartModel.updateOne({ _id: cid }, { products: [] });

    return await this.getProductsFromCartByID(cid);
  }
}

export { CartManager };