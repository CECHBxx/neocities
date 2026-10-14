let cookies = {stylePreference: null, viewPreference: null};
let currentStyling = "default";

const defaultToggle = document.querySelector("#default-option");
const accessibleToggle = document.querySelector("#accessible-option");

let spoilerTagsToggle;
let showSpoilersToggle;
let dontShowSpoilersToggle;
let article;
let currentSpoilers;

let noteStart = "(NoteStart: "
let noteEnd = " :NoteEnd)"
let footnoteCount = 0;

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

// BUILDING FOOTNOTES DYNAMICALLY ==========================================================================================================================================

const generateFootnote = (element, noteText) => {
    if (element == null || element == undefined) return
    if (noteText == null || noteText == undefined || noteText == "") return

    let footnoteSpan = document.createElement("span");
    footnoteSpan.classList.add("tooltiptext");
    footnoteSpan.insertAdjacentHTML("beforeend", noteText);
    element.appendChild(footnoteSpan);
    let elementRectangle = footnoteSpan.getBoundingClientRect();

    footnoteSpan.style.top = `-${elementRectangle.height/2}px`;
}

const buildFootNote = (section, noteSection, noteIndex) => {
    let note = section.innerHTML.substring(noteIndex, section.innerHTML.indexOf(noteEnd) + noteEnd.length);
    let cleanNote = note.substring(noteStart.length, note.length - noteEnd.length);

    let beforeNote = section.innerHTML.substring(0, noteIndex);
    let afterNote = section.innerHTML.substring(section.innerHTML.indexOf(noteEnd) + noteEnd.length);
    let newHTML = `<a href="#note-${footnoteCount}-explanation" class="hover-note" id="note-${footnoteCount}-source">${footnoteCount}</a>`;

    
    section.innerHTML = beforeNote + newHTML + afterNote;
    // fetching the newly added element through queryselector isnt the best- but it works
    generateFootnote(section.querySelector(`#note-${footnoteCount}-source`), cleanNote);

    noteSection.insertAdjacentHTML("beforeend", `<p id="note-${footnoteCount}-explanation"><span><a href="#note-${footnoteCount}-source" class="hover-note">${footnoteCount}: </a><span class="note-text">${cleanNote}</span></p>`)
}

const searchForNotes = (section, noteSection) => {
    let noteIndex = section.innerHTML.indexOf(noteStart)

    while (-1 < noteIndex) {
        footnoteCount += 1;
        buildFootNote(section, noteSection, noteIndex);
        noteIndex = section.innerHTML.indexOf(noteStart);
    }
}

const buildFootNotes = () => {
    let sections = document.querySelectorAll(".text-section");
    let noteSection = document.querySelector("#notes-container");

    if (noteSection == null || noteSection == undefined) return

    for (let i = 0; i < sections.length; i++) {
        let section = sections[i];
        if (section == noteSection) return
        searchForNotes(section, noteSection)
    }
}

// BUILDING FOOTNOTES DYNAMICALLY ==========================================================================================================================================

buildFootNotes();
fetchCookies();