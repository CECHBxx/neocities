let cookies = {style: null, view: null};
let currentStyling = "standard";

// let spoilerTagsToggle;
// let showSpoilersToggle;
// let dontShowSpoilersToggle;
// let article;
// let currentSpoilers;

const isInvalid = (value) => {
    return (value == null || value == undefined)
}

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

// const switchSpoilerView = (next, type) => {
//     if (currentSpoilers != next) {
//         article.classList = `article-content page-text-content ${type}`;
//         next.classList.add("selected-toggle");
//         currentSpoilers.classList.remove("selected-toggle");
//         currentSpoilers = next;
//     }
// }

// if (document.querySelector(".spoiler-options") != undefined) {
//     spoilerTagsToggle = document.querySelector("#hover-option");
//     dontShowSpoilersToggle = document.querySelector("#no-spoilers-option");
//     showSpoilersToggle = document.querySelector("#spoilers-option");

//     currentSpoilers = showSpoilersToggle;
//     article = document.querySelector("#main-review-content");

//     spoilerTagsToggle.addEventListener("click", () => {
//         switchSpoilerView(spoilerTagsToggle, "spoiler-tags");
//     });

//     showSpoilersToggle.addEventListener("click", () => {
//         switchSpoilerView(showSpoilersToggle, "spoilers");
//     });

//     dontShowSpoilersToggle.addEventListener("click", () => {
//         switchSpoilerView(dontShowSpoilersToggle, "no-spoilers");
//     });
// }

const fetchCookies = () => {
    let cookieList = document.cookie.split(";");

    for (let i = 0; i < cookieList.length; i++) {
        if (cookieList[i].length < 1) break;

        let cookieName = cookieList[i].split("=")[0].trim();
        let cookieValue = cookieList[i].split("=")[1].trim();

        if (cookieName === "style-preference") cookies.style = cookieValue;
        if (cookieName === "view-preference") cookies.view = cookieValue;
    }

    if (cookies.style == null) cookies.style = "standard";
    if (cookies.view == null) cookies.view = "grid";
}

// BUILDING FOOTNOTES DYNAMICALLY ==========================================================================================================================================

const getFootnoteType = (footnoteRectangle, containerRectangle, width) => {
    if (containerRectangle.right < (footnoteRectangle.x + width)) return "left"
    return "right";
}

const adjustFootnoteLocation = (footnote, footnoteData) => {
    if (footnoteData.style.display == "none") return
    
    let boundingRectange = document.querySelector("main").getBoundingClientRect();
    let footnoteLocation = footnote.getBoundingClientRect();
    let type = getFootnoteType(footnoteLocation, boundingRectange, footnoteData.offsetWidth);
    let direction = (window.innerHeight / 2 < footnoteLocation.y) ? "up" : "down";

    footnoteData.setAttribute("horizontal-direction", type);
    footnoteData.setAttribute("vertical-direction", direction);
}

const updateFootnote = (currentElement) => {
    let number = currentElement.attributes["number"].nodeValue;
    let innerHTML = `<sub>${number}</sub><span class="footnote-text" type="footnote">${currentElement.innerHTML}</span>`;

    let footnote = document.createElement("a");
    footnote.id = `footnote-location-${number}`;
    footnote.className = `footnote`;
    footnote.href = `#footnote-source-${number}`;
    footnote.innerHTML = innerHTML;

    currentElement.replaceWith(footnote);
    let footnoteData = footnote.querySelector("span");
    
    footnote.addEventListener("mouseover", () => {adjustFootnoteLocation(footnote, footnoteData)});
    adjustFootnoteLocation(footnote, footnoteData); // fixes any currently out of bounds elements
}

const setUpFootnotes = () => {
    let footnotes = document.querySelectorAll("foot-note");
    for (let i = 0; i < footnotes.length; i++) updateFootnote(footnotes[i]);
}

const setUpSideBar = () => {
    let svgUp = `<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M12.82 5.43c-.37-.54-1.26-.54-1.64 0l-7 10c-.21.31-.24.7-.07 1.04.17.33.51.54.89.54h14c.37 0 .71-.21.89-.54a1 1 0 0 0-.07-1.04zM6.92 15 12 7.74 17.08 15z"></path>
                </svg>`

    let svgDown = `<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                        fill="currentColor" viewBox="0 0 24 24" >
                        <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                        <path d="M19 7H5c-.37 0-.71.21-.89.54a1 1 0 0 0 .07 1.04l7 10a.997.997 0 0 0 1.64 0l7-10c.21-.31.24-.7.07-1.04A1 1 0 0 0 19 7m-7 9.26L6.92 9h10.16z"></path>
                    </svg>`

    let body = document.querySelector("body");
    let sidebarButton = document.querySelector("#sidebar-button");
    if (sidebarButton == null || sidebarButton == undefined) return;

    sidebarButton.addEventListener("click", () => {
        if (body.classList.contains("view-sidebar")) {
            body.classList.remove("view-sidebar");
            sidebarButton.innerHTML = svgDown;
        } else {
            body.classList.add("view-sidebar");
            sidebarButton.innerHTML = svgUp;
        }
    });
}

fetchCookies();
setUpFootnotes();

const setUpToggleButtons = () => {
    let toggleButtons = document.querySelectorAll(".toggle-button");

    for (let i = 0; i < toggleButtons.length; i++) {
        let toggleGroup = toggleButtons[i];
        let type = toggleGroup.getAttribute("type");
        let cookieValue = (type in cookies) ? cookies[type]: null;
        let buttons = Array.from(toggleGroup.querySelectorAll("button"));
        setUpToggle(toggleGroup.getAttribute("type"), cookieValue, buttons, toggleGroup.getAttribute("effected-container"))
    }
}

const toggleAction = (type, selectedButton, effectedSiblings, effectedContainer, addToContainer) => {
    selectedButton.classList.add("selected-toggle");
    effectedContainer.setAttribute(type, addToContainer)

    for (let i = 0; i < effectedSiblings.length; i++) {
        effectedSiblings[i].classList.remove("selected-toggle");
    }

    document.cookie = `${type}-preference=${addToContainer};path=/`;
}

const setUpToggle = (type, cookieValue, buttonList, effectedContainer) => {
    let effectedContainerElement = document.querySelector(effectedContainer);

    if (isInvalid(type) || isInvalid(buttonList) || isInvalid(effectedContainerElement)) return;

    for (let i = 0; i < buttonList.length; i++) {
        let toggleButton = buttonList[i];
        let siblings = buttonList.slice(0, i).concat(buttonList.slice(i + 1))
        let buttonValue = toggleButton.getAttribute("value");

        if (cookieValue != null && buttonValue == cookieValue) {
            toggleAction(type, toggleButton, siblings, effectedContainerElement, buttonValue);
        }

        toggleButton.addEventListener("click", () => {
            toggleAction(type, toggleButton, siblings, effectedContainerElement, buttonValue);
        });
    }
}

setUpToggleButtons();