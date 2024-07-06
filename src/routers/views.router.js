import { Router } from 'express';
import { ProductManager } from '../managers/productManager.js';
import { CartManager } from '../managers/cartManager.js';

const ViewsRouter = Router();
const productManager = new ProductManager();
const CartService = new CartManager(productManager);

ViewsRouter.get('/', async (req, res) => {
  const products = await productManager.getAllProducts(req.query);

  res.render(
    'index',
    {
      title: 'Products',
      style: 'style.css',
      products: JSON.parse(JSON.stringify(products.docs)),
      prevLink: {
        exist: products.prevLink ? true : false,
        link: products.prevLink
      },
      nextLink: {
        exist: products.nextLink ? true : false,
        link: products.nextLink
      }
    }
  )
});

ViewsRouter.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getAllProducts(req.query);
  res.render(
    'realTimeProducts',
    {
      title: 'Products',
      style: 'style.css',
      products: JSON.parse(JSON.stringify(products.docs))
    }
  )
});

ViewsRouter.get('/cart/:cid', async (req, res) => {
  const response = await CartService.getProductsFromCartByID(req.params.cid);

  if (response.status === 'error') {
    return res.render(
      'notFound',
      {
        title: 'Not Found',
        style: 'style.css'
      }
    );
  }

  res.render(
    'cart',
    {
      title: 'Cart',
      style: 'style.css',
      products: JSON.parse(JSON.stringify(response.products))
    }
  )
});

export default ViewsRouter;