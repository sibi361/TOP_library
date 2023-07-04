const MAX_TEXT_INPUT_LENGTH = 100;
const MAX_PAGE_COUNT = 10000;
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

function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}

function addRemoveClass(className, toRemove, toAdd) {
    toRemove.classList.remove(className);
    addClass(toAdd, className);
}

function hideElement(element) {
    addClass(element, "hidden");
}

function highlightError(field) {
    addClass(field, "invalid-input");
    field.focus();
}

function addBookFromUser() {
    const title = formTitle.value.slice(0, MAX_TEXT_INPUT_LENGTH);
    const author = formAuthor.value.slice(0, MAX_TEXT_INPUT_LENGTH);
    const pages = formPages.value;
    if (title.length === 0) {
        highlightError(formTitle);
    } else if (bookAlreadyExists(title)) {
    } else if (author.length === 0) {
        highlightError(formAuthor);
    } else if (
        Number(pages) > MAX_PAGE_COUNT ||
        (pages.length !== 0 && // pages field is not mandatory, only then do non-number
            isNaN(pages)) //  detection https://stackoverflow.com/a/175787
    ) {
        highlightError(formPages);
    } else {
        const book = new newBook(title, author, Number(pages), formReadSwitch);
        library.push(book);
        addBookToDomLibrary(book, true);
    }
}

function newBook(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.fav = false;
}

function bookAlreadyExists(givenTitle) {
    const titleLc = givenTitle.toLocaleLowerCase();
    if (library.find((book) => book.title.toLocaleLowerCase() === titleLc)) {
        highlightError(formTitle);
        const cards = libraryRoot.querySelectorAll(".card");
        cards.forEach((card) => {
            const cardBookTitle = card.querySelector(".card-title").textContent;
            if (cardBookTitle.toLocaleLowerCase() === titleLc) {
                highlightError(card);
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

formSubmit.addEventListener("click", (e) => {
    e.stopPropagation();
    addBookFromUser();
});

function addBookToDomLibrary(book, scrollToCard = false) {
    const cardInner = document.createElement("div");
    addClass(cardInner, "card-inner");

    const title = document.createElement("div");
    addClass(title, "card-title");
    title.textContent = book.title;
    const author = document.createElement("div");
    addClass(author, "card-text");
    author.textContent = book.author;
    if (book.pages !== 0) {
        const pages = document.createElement("div");
        addClass(pages, "card-text");
        pages.textContent = `${book.pages} pages`;
        cardInner.append(title, author, pages);
    } else cardInner.append(title, author);

    const card = document.createElement("div");
    addClass(card, "card");
    card.append(cardInner);
    card.innerHTML += cardButtonsTemplate;

    const notFavBtn = card.querySelector(".not-fav");
    const favBtn = card.querySelector(".fav");
    if (book.fav) hideElement(notFavBtn);
    else hideElement(favBtn);

    const unreadBtn = card.querySelector(".unread");
    const readBtn = card.querySelector(".read");
    if (book.read) hideElement(unreadBtn);
    else hideElement(readBtn);

    const toggleBtnList = [notFavBtn, favBtn, unreadBtn, readBtn];
    toggleBtnList.forEach((btn) =>
        btn.addEventListener("click", toggleCardButtonState)
    );

    const deleteBtn = card.querySelector(".delete");
    deleteBtn.addEventListener("click", deleteBook);

    libraryRoot.append(card);

    if (scrollToCard) {
        arollIntoView();
        addClass(card, "new-card");
    }
}

let cardButtonsTemplate = "";
function initFillLibrary() {
    cardButtonsTemplate = templateCardButtons.outerHTML;
    templateCard.remove();

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

function toggleCardButtonState() {
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
        addRemoveClass("hidden", offBtn, onBtn);
    } else {
        library[bookIndex][key] = true;
        addRemoveClass("hidden", onBtn, offBtn);
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

// toggleHeaderFormReadState
let formReadSwitch = false;
[formUnread, formRead].forEach((btn) =>
    btn.addEventListener("click", () => {
        if (!btn.classList.contains("selected")) {
            if (formUnread.classList.contains("selected")) {
                formReadSwitch = true;
                addRemoveClass("selected", formUnread, formRead);
            } else {
                formReadSwitch = false;
                addRemoveClass("selected", formRead, formUnread);
            }
        }
    })
);

document.body.addEventListener("click", () => {
    const newCard = document.querySelector(".new-card");
    removeClass(newCard, "new-card");
});

let library = SAMPLE_BOOKS;
initFillLibrary();
