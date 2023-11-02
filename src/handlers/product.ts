import prisma from '../db'

export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  })

  res.status(200).json({ data: user.products })
}

export const getProductById = async (req, res) => {
  const { id } = req.params

  const product = await prisma.product.findFirst({
    where: { id, belongsToId: req.user.id },
  })

  res.status(200).json({ data: product })
}

export const createProduct = async (req, res, next) => {
  try {
    const body = req.body

    const createdProduct = await prisma.product.create({
      data: {
        name: body.name,
        belongsToId: req.user.id,
      },
    })

    res.status(201).json({ data: createdProduct })
  } catch (e) {
    next(e)
  }
}

export const updateProductById = async (req, res) => {
  const body = req.body
  const { id } = req.params

  const updatedProduct = await prisma.product.update({
    where: {
      id_belongsToId: {
        id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: body.name,
    },
  })

  res.status(200).json({ data: updatedProduct })
}

export const deleteProductById = async (req, res) => {
  await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  })

  res.status(204)
}
