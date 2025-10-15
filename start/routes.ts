/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const HomeController = () => import('#controllers/home_controller')
const ProductsController = () => import('#controllers/products_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const CartController = () => import('#controllers/api/cart_controller')
const CheckoutController = () => import('#controllers/api/checkout_controller')
const SuccessController = () => import('#controllers/success_controller')
const ProductDashboardController = () => import('#controllers/dashboard/products_controller')

router.get('/', [HomeController, 'handle']).as('home')
router.on('/about').render('pages/about').as('about')
router.get('/products', [ProductsController, 'index']).as('products.index')

router.get('/register', [RegisterController, 'index']).as('register.index')
router.post('/register', [RegisterController, 'store']).as('register.store')

router.get('/login', [LoginController, 'index']).as('login.index')
router.post('/login', [LoginController, 'store']).as('login.store')

router.post('/logout', [LoginController, 'destroy']).as('logout')

router.get('/cart', [CartController, 'index']).as('cart.index').use(middleware.auth())
router.post('/checkout', [CheckoutController, 'store']).as('checkout.store').use(middleware.auth())
router.get('/success', [SuccessController, 'handle']).as('success').use(middleware.canViewSuccess())

// DASHBOARD

router
  .group(() => {
    router.on('').render('pages/dashboard/index').as('index')
    router.resource('products', ProductDashboardController).as('products').except(['show'])
  })
  .use(middleware.admin())
  .as('dashboard')
  .prefix('/dashboard')
