class UserManager {
  static #users = [];
  constructor() {}
  create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, photo, email are require");
      } else {
        const user = {
          id:
            UserManager.#users.length === 0
              ? 1
              : UserManager.#users[UserManager.#users.length - 1].id + 1,
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        UserManager.#users.push(user);
        return user;
      }
    } catch (error) {
      return error.message;
    }
  }
  read() {
    try {
      const allUsers = UserManager.#users;
      if (allUsers.length === 0) {
        throw new Error("There aren't users");
      } else {
        return allUsers;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    try {
      const oneUser = UserManager.#users.find((each) => each.id === Number(id));
      if (oneUser) {
        return oneUser;
      } else {
        throw new Error("There isnt user with ID" + id);
      }
    } catch (error) {
      return error.message;
    }
  }
}

const user = new UserManager();
let users = user.read();
console.log(users);
const user1 = user.create({ name: "Eze", photo: "photo", email: "email" });
const user2 = user.create({ name: "Mauro", photo: "photo", email: "email" });
const user3 = user.create({ name: "Mauro" });
console.log(user1, user2, user3);
users = user.read();
console.log(users);
const one = user.readOne(1);
const three = user.readOne(3);
console.log(one, three);
