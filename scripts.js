const SAMPLE_BOOKS = [
    {
        author: "Chinua Achebe",
        pages: 209,
        title: "Things Fall Apart",
        read: true,
        fav: true,
    },
    {
        author: "The Jungle Book",
        pages: 176,
        title: "Rudyard Kipling",
        read: true,
        fav: true,
    },
    {
        author: "Jane Austen",
        pages: 226,
        title: "Pride and Prejudice",
        read: true,
        fav: false,
    },
    {
        author: "Frank Herbert",
        pages: 896,
        title: "Dune",
        read: false,
        fav: false,
    },
    {
        author: "Jules Verne",
        pages: 280,
        title: "Around the World in Eighty Days",
        read: true,
        fav: true,
    },
    {
        author: "Agatha Christie",
        pages: 272,
        title: "And Then There Were None",
        read: false,
        fav: false,
    },
];

const formTitle = document.querySelector("#book-title");
const formAuthor = document.querySelector("#book-author");
const formPages = document.querySelector("#book-pageCount");
const formUnread = document.querySelector('img[alt="unread"]');
const formRead = document.querySelector('img[alt="read"]');
const formSubmit = document.querySelector("#submit");
const libraryRoot = document.querySelector(".content-inner");
const templateCard = document.querySelector("#template-card");
const templateCardButtons = templateCard.querySelector(".card-buttons");

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

    const unreadBtn = card.querySelector(".unread");
    const readBtn = card.querySelector(".read");
    if (book.read) unreadBtn.classList.add("hidden");
    else readBtn.classList.add("hidden");

    const toggleBtnList = [notFavBtn, favBtn, unreadBtn, readBtn];
    toggleBtnList.forEach((btn) => btn.addEventListener("click", toggleState));

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

function getBookTitle(cardButtons, getIndexInstead = false) {
    let bookTitle =
        cardButtons.parentElement.previousSibling.querySelector(
            ".card-title"
        ).textContent;
    if (getIndexInstead) {
        bookTitle = bookTitle.toLocaleLowerCase();
        return library.findIndex(
            (book) => book.title.toLocaleLowerCase() === bookTitle
        );
    }
    return bookTitle;
}

function toggleState() {
    const cardButtons = this.parentElement;
    const bookIndex = getBookTitle(cardButtons, true);

    const options = this.parentElement.dataset.options
        .split("|")
        .map((op) => `.${op}`);
    const offBtn = cardButtons.querySelector(options[0]);
    const onBtn = cardButtons.querySelector(options[1]);
    const key = options[1];

    if (offBtn.classList.contains("hidden")) {
        library[bookIndex][key] = false;

        offBtn.classList.remove("hidden");
        onBtn.classList.add("hidden");
    } else {
        library[bookIndex][key] = true;

        offBtn.classList.add("hidden");
        onBtn.classList.remove("hidden");
    }
}

function deleteBook() {
    const bookTitle = getBookTitle(this);

    library = library.filter((book) => book.title !== bookTitle);

    this.parentElement.parentElement.remove();
    if (libraryRoot.childElementCount === 0) {
        libraryRoot.textContent = "No Books Saved";
    }
}

// toggleNewBookFormReadState
let formReadSwitch = false;
[formUnread, formRead].forEach((btn) =>
    btn.addEventListener("click", () => {
        if (formUnread.classList.contains("selected")) {
            formReadSwitch = true;
            formUnread.classList.remove("selected");
            formRead.classList.add("selected");
        } else {
            formReadSwitch = false;
            formUnread.classList.add("selected");
            formRead.classList.remove("selected");
        }
    })
);

function newBook(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.fav = false;
}

function addBookFromUser() {
    const title = formTitle.value;
    const author = formAuthor.value;
    const pages = formPages.value;
    if (title.length === 0) {
        formTitle.classList.add("invalid-input");
    } else if (author.length === 0) {
        formAuthor.classList.add("invalid-input");
    } else if (
        pages.length === 0 ||
        isNaN(pages) // non-number detection https://stackoverflow.com/a/175787
    ) {
        formPages.classList.add("invalid-input");
    } else if (bookAlreadyExists(title)) {
    } else {
        const book = new newBook(title, author, Number(pages), formReadSwitch);
        library.push(book);
        addBookToDomLibrary(book);
    }
}

function bookAlreadyExists(givenTitle) {
    const titleLc = givenTitle.toLocaleLowerCase();
    if (library.find((book) => book.title.toLocaleLowerCase() === titleLc)) {
        formTitle.classList.add("invalid-input");
        const cards = libraryRoot.querySelectorAll(".card");
        cards.forEach((card) => {
            const cardBookTitle = card.querySelector(".card-title").textContent;
            if (cardBookTitle.toLocaleLowerCase() === titleLc) {
                card.classList.add("invalid-input");
            }
        });
        return true;
    }
    return false;
}

// reset errors
[formTitle, formAuthor, formPages].forEach((btn) =>
    btn.addEventListener("keypress", (e) => {
        e.target.classList.remove("invalid-input");
        const cards = libraryRoot.querySelectorAll(".card");
        cards.forEach((card) => {
            card.classList.remove("invalid-input");
        });
    })
);

formSubmit.addEventListener("click", () => {
    addBookFromUser();
});

let library = SAMPLE_BOOKS;
initFillLibrary();
