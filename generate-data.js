const faker = require('faker')
const fs = require('fs')

faker.locale = 'vi'

const randomCategory = (quantity) => {
  if (quantity < 1) return []

  const categoryList = []

  for (let i = 0; i < quantity; i++) {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    categoryList.push(category)
  }

  return categoryList

}

const randomProduct = (categoryList, quantityOfProducts) => {
  if (quantityOfProducts < 1) return []

  const categoryLength = categoryList.length

  const productList = []

  for (let i = 0; i < categoryLength; i++) {
    for (let j = 0; j < quantityOfProducts; j++) {
      const product = {
        categoryId: categoryList[i].id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnailUrl: faker.image.imageUrl(400, 400)
      }

      productList.push(product)
    }
  }

  return productList
}

const generateData = () => {

  const categoryList = randomCategory(4)
  const productList = randomProduct(categoryList, 5)

  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'Khanh Junior'
    }
  }

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully...')
  })
}

generateData()