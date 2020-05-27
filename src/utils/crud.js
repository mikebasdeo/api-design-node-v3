export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  const doc = await model.findOne({ _id: id, createdBy: userId }).exec()

  if (!doc) {
    return res.status(404).end()
  }
  res.status(200).json({ data: doc })
}

export const getMany = model => async (req, res) => {
  const userId = req.user._id
  const allTheirLists = await model.find({ createdBy: userId }).exec()
  // await model.findMany({ createdBy: userId }).exec()

  if (!allTheirLists) {
    return res.status(404).end()
  }
  res.status(200).json({ data: allTheirLists })
}

export const createOne = model => async (req, res) => {
  const userId = req.user._id
  const thingToCreate = await model.create({
    ...req.body,
    createdBy: userId
  })

  res.status(201).json({ data: thingToCreate })
}

export const updateOne = model => async (req, res) => {
  const updated = await model.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user._id
    },
    req.body,
    { new: true }
  )

  if (!updated) {
    return res.status(400).end()
  }

  res.status(200).json({ data: updated })
}

export const removeOne = model => async (req, res) => {
  const doc = await model
    .findOneAndRemove({
      _id: req.params.id,
      createdBy: req.user._id
    })
    .exec()
  if (!doc) {
    return res.status(400).end()
  }

  res.status(200).json({ data: doc })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
