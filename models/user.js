
const getDb = require("../util/database").getDb;

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }
  // static -> não precisa instanciar um objeto para usar a função, async -> garantir que não tenha uma promessa
  static async findOne(email, password) {
    const db = getDb();
    const user = await db.collection('users').findOne({ email: email, password: password });
    return user;
  }
}

module.exports = User;