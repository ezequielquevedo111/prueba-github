class ProductManager {
  static #products = [];
  constructor() {}
  create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Title, photo, price, stock are required");
      } else {
        const one = {
          id:
            ProductManager.#products.length === 0
              ? 1
              : ProductManager.#products[ProductManager.#products.length - 1]
                  .id + 1,
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };
        ProductManager.#products.push(one);
        return one;
      }
    } catch (error) {
      return error.message;
    }
  }
  read() {
    try {
      const allproducts = ProductManager.#products;
      if (allproducts.length === 0) {
        throw new Error("There arent products");
      } else {
        return allproducts;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    try {
      const oneProduct = ProductManager.#products.find(
        (each) => each.id === Number(id)
      );
      if (oneProduct) {
        return oneProduct;
      } else {
        throw new Error("There is no product");
      }
    } catch (error) {
      return error.message;
    }
  }
}
const products = new ProductManager();
console.log(products.read());
const productone = products.create({
  title: "lapices",
  photo: "lapiz.png",
  price: 12,
  stock: 203,
});
const producttwo = products.create({
  title: "hojas",
  photo: "hoja.png",
  price: 3,
  stock: 2030,
});
const productthree = products.create({
  title: "tijera",
  price: 12,
});
console.log(productone, producttwo, productthree);
console.log(products.read());
console.log(products.readOne(1));
console.log(products.readOne(10));
