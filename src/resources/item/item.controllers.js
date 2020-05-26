// import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'
import mongoose from 'mongoose'

import { connect } from '../../utils/db'

/**
 * CRUD
 * C = create
 * R = find, findOne, findMany
 * U = update, findByIdAndUpdate, findOneAndUpdate
 * D = remove, findByIdAndRemove, findOneAndRemove
 */

const run = async () => {
  await connect('mongodb://localhost:27017/api-test')
  // [C]RUD
  const item = await Item.create({
    name: 'Jake Peralta',
    createdBy: mongoose.Types.ObjectId(),
    list: mongoose.Types.ObjectId()
  })

  // console.log(item)

  // C[R]UD
  // console.log(await Item.findById(item._id).exec())
  // find all
  console.log(await Item.find({}).exec())

  // CR[U]D
  const updated = await Item.findByIdAndUpdate(
    item._id,
    { name: 'Mike Basdeo' },
    { new: true }
  ).exec()

  // CRU[D]
  const removed = await Item.findByIdAndRemove(item._id).exec()

  console.log(removed)
}

run()

// export default crudControllers(Item)
