# lite-library

Book library initially made using Vanilla CSS and JS as part of [The Odin Project](https://www.theodinproject.com/). Later upgraded to a full stack web app using Express JS and sqlite.

DEMO: https://lite-library.onrender.com/

Frontend only demo: https://sibi361.github.io/TOP_library/

## Features

-   [x] Add books along with the author name, page count, etc.
-   [x] Books stored on server, available from any device
-   [x] Password-based User Auth
-   [x] Ability to delete, favourite books and mark their read status
-   [x] Mobile friendly UI

## Installation

1. Clone the repository

    ```
    git clone https://github.com/sibi361/lite-library.git
    ```

1. Generate a [bcrypt salt](https://blog.logrocket.com/password-hashing-node-js-bcrypt/) and place it in [`.env`](.env) as `SALT`

    ```
    # https://blog.logrocket.com/password-hashing-node-js-bcrypt/
    bcrypt
    .genSalt(saltRounds)
    .then(salt => {
       console.log('Salt: ', salt)
       return bcrypt.hash(password, salt)
    })
    ```

1. Generate a [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) secret token using the below snippet and save it as `JWT_SECRET` in [`.env`](.env)

    ```
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
    ```

1. Run the server at given port, for e.g. 8080

    ```
    npm run start -- 8080
    ```

## Legal

This project is licensed under the terms of the [MIT License](LICENSE).

Books data credit: https://github.com/benoitvallon/100-best-books/blob/master/books.json
