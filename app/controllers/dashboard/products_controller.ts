import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const products = await Product.all()

    return view.render('pages/dashboard/products/index', { products })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/dashboard/products/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createProductValidator)

    await Product.create(payload)

    session.flash('success', 'Product created successfully!')
    return response.redirect().toRoute('dashboard.products.index')
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    return view.render('pages/dashboard/products/edit', { product })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, session }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    const payload = await request.validateUsing(updateProductValidator, {
      meta: {
        productId: params.id,
      },
    })

    product.merge(payload)
    await product.save()

    session.flash('success', 'Product updated successfully!')
    return response.redirect().toRoute('dashboard.products.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.delete()

    return response.redirect().toRoute('dashboard.products.index')
  }
}
