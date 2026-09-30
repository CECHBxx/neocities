let cookies = {stylePreference: null, viewPreference: null};
let currentStyling = "default";

const defaultToggle = document.querySelector("#default-option");
const accessibleToggle = document.querySelector("#accessible-option");

let spoilerTagsToggle;
let showSpoilersToggle;
let dontShowSpoilersToggle;
let article;
let currentSpoilers;

defaultToggle.addEventListener("click", (event) => {
    switchView(accessibleToggle, defaultToggle, "default");
});

accessibleToggle.addEventListener("click", (event) => {
    switchView(defaultToggle, accessibleToggle, "accessible");
});

const switchView = (current, next, type) => {
    if (currentStyling != `${type}`) {
        next.classList.add("selected-toggle");
        current.classList.remove("selected-toggle");
        document.body.classList.remove(currentStyling);

        currentStyling = type;

        document.body.classList.add(currentStyling);
        document.cookie = `style-preference=${type};path=/`;
    }
}

const switchSpoilerView = (next, type) => {
    if (currentSpoilers != next) {
        article.classList = `article-content page-text-content ${type}`;
        next.classList.add("selected-toggle");
        currentSpoilers.classList.remove("selected-toggle");
        currentSpoilers = next;
    }
}

if (document.querySelector(".spoiler-options") != undefined) {
    spoilerTagsToggle = document.querySelector("#hover-option");
    dontShowSpoilersToggle = document.querySelector("#no-spoilers-option");
    showSpoilersToggle = document.querySelector("#spoilers-option");

    currentSpoilers = showSpoilersToggle;
    article = document.querySelector("#main-review-content");

    spoilerTagsToggle.addEventListener("click", (event) => {
        switchSpoilerView(spoilerTagsToggle, "spoiler-tags");
    });

    showSpoilersToggle.addEventListener("click", (event) => {
        switchSpoilerView(showSpoilersToggle, "spoilers");
    });

    dontShowSpoilersToggle.addEventListener("click", (event) => {
        switchSpoilerView(dontShowSpoilersToggle, "no-spoilers");
    });
}

const setStyleDefault = (cookieValue) => {
    if (cookieValue === null || cookieValue === "default") {
        defaultToggle.classList.add("selected-toggle")
        cookieValue = "default";
    } else if (cookieValue === "accessible") accessibleToggle.classList.add("selected-toggle");

    currentStyling = cookieValue;
    document.body.classList.add(currentStyling);
}

const fetchCookies = () => {
    let cookieList = document.cookie.split(";");

    for (let i = 0; i < cookieList.length; i++) {
        if (cookieList[i].length < 1) break;

        let cookieName = cookieList[i].split("=")[0].trim();
        let cookieValue = cookieList[i].split("=")[1].trim();

        if (cookieName === "style-preference") cookies.stylePreference = cookieValue;
        if (cookieName === "view-preference") cookies.viewPreference = cookieValue;
    }

    setStyleDefault(cookies.stylePreference);
}

const getFootnoteText = (noteSource) => {
    let footNoteElement = document.getElementById(noteSource)
    if (footNoteElement == undefined || footNoteElement == null) return

    let noteText = footNoteElement.querySelector(".note-text")

    if (noteText == null) return

    return noteText.innerHTML
}

const generateFootnote = (element) => {
    let footnoteText = getFootnoteText(element.id.replace("source", "explaination"))
    if (footnoteText == null || footnoteText == undefined || footnoteText == "") return
    let footnoteSpan = document.createElement("span")
    footnoteSpan.classList.add("tooltiptext")
    footnoteSpan.insertAdjacentHTML("beforeend", `<p>${footnoteText}</p>`)

    element.appendChild(footnoteSpan)

    let elementRectangle = footnoteSpan.getBoundingClientRect()
    footnoteSpan.style.top = `-${elementRectangle.height/2}px`
}

const handleFootnotes = () => {
    document.querySelectorAll(".hover-note").forEach(element => {
        if (element.href.includes("explaination")) generateFootnote(element)
    })
}

handleFootnotes()
fetchCookies();
export { cookies as default };