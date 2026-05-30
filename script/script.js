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
        document.cookie = `style-preference=${type};`;
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

fetchCookies();
export { cookies as default };