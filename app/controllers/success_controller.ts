import type { HttpContext } from '@adonisjs/core/http'

export default class SuccessController {
  public async handle({ view, session }: HttpContext) {
    session.forget('can_view_success')

    return view.render('pages/success')
  }
}
