const dotenv = require("dotenv");
const fs = require("fs");

const db = require("./utilsDb.js");
const utils = require("./utils.js");
const data = require("./startingData.json");
const books = require("./books.json");

dotenv.config();

fs.rmSync(process.env.DB_FOLDER, { recursive: true, force: true });
fs.mkdirSync(process.env.DB_FOLDER);

(async function () {
    await db.initUsersDb();
    data["users"].forEach(
        async (user) => await db.addNewUserRecord(user.username, user.hash)
    );
    console.log("DB: Users ready");

    const _books = books.slice(0);
    utils.shuffleArray(_books);
    await db.addNewUserBooks("demo123", _books.slice(0, 8));
    console.log("DB: Books ready");
})();
