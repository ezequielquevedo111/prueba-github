const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  static #products = [];
  init() {
    const exist = fs.existsSync(this.path);
    // console.log(exist);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      ProductManager.#products = JSON.parse(
        fs.readFileSync(this.path, "utf-8")
      );
    }
  }
  constructor(path) {
    this.path = path;
    this.init();
  }
  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Title, photo, price, stock are required");
      } else {
        const one = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };
        ProductManager.#products.push(one);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        console.log("Created ID: " + one.id);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("There arent products");
      } else {
        console.log(ProductManager.#products);
        return ProductManager.#products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readOne(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (one) {
        console.log(one);
        return one;
      } else {
        throw new Error("There is no product");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (one) {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id !== one.id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        console.log("Destroy ID: " + id);
        return one;
      } else {
        throw new Error("There is no product");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

async function manage() {
  const products = new ProductManager("./fs/files/products.json");

  await products.create({ title: "eze", photo: "aaa", price: 1234, stock: 45 });

  await products.create({ title: "aaa" });

  await products.read();

  await products.readOne("1");
  await products.readOne("a35c8fb621fa8febedbf7f2f");

  await products.destroy("1");
  await products.destroy("668149581743c8b5a984f886");
}

manage();
