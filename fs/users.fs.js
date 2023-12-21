const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  static #users = [];
  init() {
    const exists = fs.existsSync(this.path);
    //console.log(exists);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      UserManager.#users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }
  constructor(path) {
    this.path = path;
    this.init();
  }
  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, photo, email are require");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        UserManager.#users.push(user);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );
        console.log("Created ID: " + user.id);
        return user.id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("There aren't users");
      } else {
        console.log(UserManager.#users);
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (one) {
        console.log(one);
        return one;
      } else {
        throw new Error("There isnt user with ID " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async destroy(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (one) {
        UserManager.#users = UserManager.#users.filter(
          (each) => each.id !== id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );
        console.log("Destroyed ID: " + id);
        return id;
      } else {
        throw new Error("There isnt user with ID " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const users = new UserManager("./fs/files/users.json");
//users.create({ name: "igna" });
users.create({ name: "igna", photo: "igna.png", email: "igna@coder.com" });
users.read();
//users.readOne("abc123");
users.readOne("527714c5b67510819467fd75");
//users.destroy("abc123");
users.destroy("beb4b63dd26b5e563f847737");
