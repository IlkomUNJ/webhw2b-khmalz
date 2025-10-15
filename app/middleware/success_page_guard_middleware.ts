import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SuccessPageGuardMiddleware {
  async handle({ session, response }: HttpContext, next: NextFn) {
    if (!session.get('can_view_success')) {
      return response.redirect().toRoute('home')
    }
    await next()
  }
}
