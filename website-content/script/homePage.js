import articleListArray from "./data.js";
import cookies from "./script.js";

let currentView = "list-view";
const backloggdURL = "scph1001";
const backloggdLinkStart = `https://backloggd.com/u/${backloggdURL}/review`;

const articleList = document.querySelector("#article-list");
const listToggle = document.querySelector("#list-option");
const gridToggle = document.querySelector("#grid-option");

listToggle.addEventListener("click", (event) => {
    switchView(gridToggle, listToggle, "list");
});

gridToggle.addEventListener("click", (event) => {
    switchView(listToggle, gridToggle, "grid");
});

const switchView = (current, next, type) => {
    if (currentView != `${type}-view`) {
        next.classList.add("selected-toggle");
        current.classList.remove("selected-toggle");
        articleList.classList.remove(currentView);
        currentView = `${type}-view`;
        articleList.classList.add(currentView);

        document.cookie = `view-preference=${type};`;
    }
}

class PostListing {
    constructor(postData) {
        if (postData == null) return;
        this.postData = postData;

        this.day = null;
        this.month = null;
        this.year = null;
        
        this.htmlURL = this.postData.title.replaceAll(" ", "-").toLowerCase();
        this.htmlURL = this.htmlURL.replaceAll(`'`, "");

        [ this.day, this.month, this.year ] = this.postData.createdDate.split("/");

        this.content = this.createTab();
    }

    createTab = () => {
        const linkToArticle = document.createElement("a");
        linkToArticle.classList.add("article-preview");
        const linkToArticleContent =    `<div class="article-tab">
                                            <h2 class="article-title">${this.postData.title}</h2>
                                        </div>

                                        <div class="article-date">
                                            <p>${this.day[0]}</p><p>${this.day[1]}</p>
                                            <p>${this.month[0]}</p><p>${this.month[1]}</p>
                                            <p>${this.year[0]}</p><p>${this.year[1]}</p>
                                        </div>`;

        linkToArticle.insertAdjacentHTML("beforeend", linkToArticleContent);

        linkToArticle.href = `../html/articles/${this.htmlURL}.html`;
        linkToArticle.querySelector(".article-tab").style.backgroundImage = `url(../assets/tab-images/${this.htmlURL}.png)`;
        return linkToArticle;
    }
}

const setListDefault = (cookieValue) => {
    if (cookieValue === null || cookieValue === "list") {
        cookieValue = "list";
        listToggle.classList.add("selected-toggle")
    } else if (cookieValue === "grid") gridToggle.classList.add("selected-toggle");

    currentView = `${cookieValue}-view`;
    articleList.classList.add(currentView);
}

const setUpContent = () => {
    let length = articleListArray.length;
    for (let i = 0; i < length; i++) {

        let post = new PostListing(articleListArray[i]);
        articleList.insertAdjacentElement("beforeend", post.content);
    }

    setListDefault(cookies.viewPreference);
}

setUpContent();