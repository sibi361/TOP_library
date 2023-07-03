const libraryRoot = document.querySelector(".content-inner");
const templateCard = document.querySelector("#template-card");
const templateCardButtons = templateCard.querySelector(".card-buttons");

const SAMPLE_BOOKS = [
    {
        author: "Chinua Achebe",
        pages: 209,
        title: "Things Fall Apart",
        read: true,
        fav: true,
    },
    {
        author: "Hans Christian Andersen",
        pages: 784,
        title: "Fairy tales",
        read: true,
        fav: false,
    },
    {
        author: "Dante Alighieri",
        pages: 928,
        title: "The Divine Comedy",
        read: true,
        fav: true,
    },

    {
        author: "Jane Austen",
        pages: 226,
        title: "Pride and Prejudice",
        read: true,
        fav: true,
    },
    {
        author: "Honor\u00e9 de Balzac",
        pages: 443,
        title: "Le P\u00e8re Goriot",
        read: false,
        fav: false,
    },
    {
        author: "Samuel Beckett",
        pages: 256,
        title: "Molloy, Malone Dies, The Unnamable, The Trilogy",
        read: false,
        fav: false,
    },
    {
        author: "Giovanni Boccaccio",
        pages: 1024,
        title: "The Decameron",
        read: false,
        fav: false,
    },
];

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//     this.fav = false;
// }

// booksList.forEach((book) => {
//     const newBook = Book(book, author, pages, read)
// });

function addBookToDomLibrary(book) {
    const title = document.createElement("div");
    title.classList.add("card-title");
    title.textContent = book.title;
    const author = document.createElement("div");
    author.classList.add("card-text");
    author.textContent = book.author;
    const pages = document.createElement("div");
    pages.classList.add("card-text");
    pages.textContent = `${book.pages} pages`;

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    cardInner.append(title, author, pages);

    const card = document.createElement("div");
    card.classList.add("card");
    card.append(cardInner);
    card.innerHTML += cardButtonsHtml;

    const notFavBtn = card.querySelector(".not-fav");
    const favBtn = card.querySelector(".fav");
    if (book.fav) notFavBtn.classList.add("hidden");
    else favBtn.classList.add("hidden");

    notFavBtn.addEventListener("click", toggleFavState);
    favBtn.addEventListener("click", toggleFavState);

    const unreadBtn = card.querySelector(".unread");
    const readBtn = card.querySelector(".read");
    if (book.read) unreadBtn.classList.add("hidden");
    else readBtn.classList.add("hidden");

    unreadBtn.addEventListener("click", toggleReadState);
    readBtn.addEventListener("click", toggleReadState);

    const deleteBtn = card.querySelector(".delete");
    deleteBtn.addEventListener("click", deleteBook);

    libraryRoot.append(card);
}

let cardButtonsHtml = "";
function initFillLibrary() {
    cardButtonsHtml = templateCardButtons.outerHTML;
    templateCardButtons.remove();

    libraryRoot.innerHTML = "";
    library.forEach((book) => {
        addBookToDomLibrary(book);
    });
}

function toggleFavState() {
    const cardButtons = this.parentElement;

    const bookTitle =
        cardButtons.parentElement.previousSibling.querySelector(
            ".card-title"
        ).textContent;
    const bookIndex = library.findIndex((book) => book.title === bookTitle);

    const notFavBtn = cardButtons.querySelector(".not-fav");
    const favBtn = cardButtons.querySelector(".fav");

    if (notFavBtn.classList.contains("hidden")) {
        library[bookIndex].fav = false;

        notFavBtn.classList.remove("hidden");
        favBtn.classList.add("hidden");
    } else {
        library[bookIndex].fav = true;

        notFavBtn.classList.add("hidden");
        favBtn.classList.remove("hidden");
    }
}

function toggleReadState() {
    const cardButtons = this.parentElement;

    const bookTitle =
        cardButtons.parentElement.previousSibling.querySelector(
            ".card-title"
        ).textContent;
    const bookIndex = library.findIndex((book) => book.title !== bookTitle);

    const unreadBtn = cardButtons.querySelector(".unread");
    const readBtn = cardButtons.querySelector(".read");

    if (unreadBtn.classList.contains("hidden")) {
        library[bookIndex].read = false;

        unreadBtn.classList.remove("hidden");
        readBtn.classList.add("hidden");
    } else {
        library[bookIndex].read = true;

        unreadBtn.classList.add("hidden");
        readBtn.classList.remove("hidden");
    }
    console.log(library[bookIndex]);
}

function deleteBook() {
    const bookTitle =
        this.parentElement.previousSibling.querySelector(
            ".card-title"
        ).textContent;

    library = library.filter((book) => book.title !== bookTitle);

    this.parentElement.parentElement.remove();
    if (libraryRoot.childElementCount === 0) {
        libraryRoot.textContent = "No Books Saved";
    }
}

let library = SAMPLE_BOOKS;
initFillLibrary();
