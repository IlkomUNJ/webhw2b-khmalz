import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle({ auth, response, session }: HttpContext, next: NextFn) {
    if (!auth.isAuthenticated) {
      return response.redirect().toRoute('login.index')
    }

    if (auth.user?.email !== 'admin@gmail.com') {
      session.flash('error', 'You do not have permission to access this page.')
      return response.redirect().toRoute('home')
    }

    await next()
  }
}
