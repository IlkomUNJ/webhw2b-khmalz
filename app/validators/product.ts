import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(3)
      .unique(async (db, value) => {
        const product = await db.from('products').where('name', value).first()
        return !product
      }),
    price: vine.number().positive(),
    imageUrl: vine.string().url(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(3)
      .unique(async (db, value, field) => {
        const productId = field.meta.productId
        const product = await db
          .from('products')
          .where('name', value)
          .whereNot('id', productId)
          .first()
        return !product
      }),
    price: vine.number().positive(),
    imageUrl: vine.string().url(),
  })
)
