import type { HttpContext } from '@adonisjs/core/http'
import CartService from '#services/cart_service'
import router from '@adonisjs/core/services/router'

export default class CheckoutController {
  public async store({ response, session }: HttpContext) {
    const cartService = new CartService(session)

    const { cartCount } = await cartService.getTotals()

    if (cartCount === 0) {
      return response.badRequest({ message: 'Cart is empty' })
    }

    cartService.clear()
    session.put('can_view_success', true)

    const redirectUrl = router.builder().make('success')

    return response.json({ redirectUrl })
  }
}
