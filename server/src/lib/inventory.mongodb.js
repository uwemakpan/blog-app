const database = 'inventory'
const collection = 'products'

use(database)

db.products.drop()

const productData = [
  { name: 'Belt', price: 9, category: 'Clothes', descritption: 'Clotghin' },
  { name: 'Shoe', price: 9, category: 'Leg walk', descritption: 'Clotghin' },
  {
    name: 'Umbrella',
    price: 9,
    category: 'Covering',
    descritption: 'Clotghin',
  },
  { name: 'Camera', price: 9, category: 'Snap shot', descritption: 'Clotghin' },
  { name: 'Onions', price: 9, category: 'Food', descritption: 'Clotghin' },
  { name: 'Bag', price: 9, category: 'Clothes', descritption: 'Clotghin' },
]

db.products.insertMany(productData)

db.products.find({})
