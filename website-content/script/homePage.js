import { articleListArray } from "./data.js"

const articleList = document.querySelector("main");

class PostListing {
    constructor(postData) {
        if (postData == null) return;
        this.postData = postData;

        this.day = null;
        this.month = null;
        this.year = null;
        
        this.htmlURL = this.postData.title.replaceAll(" ", "-").toLowerCase();
        this.htmlURL = this.htmlURL.replaceAll(`'`, "");
        this.htmlURL = this.htmlURL.replaceAll(`:`, "");
        this.postData.title = this.postData.title.replaceAll(`:`, "");
        this.htmlURL = this.htmlURL.replaceAll(`<br>`, "");

        [ this.day, this.month, this.year ] = this.postData.createdDate.split("/");

        this.content = this.createTab();
    }

    createTab = () => {
        const linkToArticle = document.createElement("a");
        linkToArticle.classList.add("article-preview");
        const linkToArticleContent =    `<section class="article-tab">
                                            <h2 class="article-title">${this.postData.title}</h2>
                                            <div class="article-date">
                                                <p>${this.day[0]}</p><p>${this.day[1]}</p><p class="date-seperator">/</p>
                                                <p>${this.month[0]}</p><p>${this.month[1]}</p><p class="date-seperator">/</p>
                                                <p>${this.year[0]}</p><p>${this.year[1]}</p>
                                            </div>
                                        </section>`;

        linkToArticle.insertAdjacentHTML("beforeend", linkToArticleContent);

        linkToArticle.href = `../html/articles/${this.htmlURL}.html`;
        linkToArticle.querySelector(".article-tab").style.backgroundImage = `url(../assets/tab-images/${this.htmlURL}.png)`;
        return linkToArticle;
    }
}

const setUpContent = () => {
    let length = articleListArray.length;
    for (let i = 0; i < length; i++) {

        let post = new PostListing(articleListArray[i]);
        articleList.insertAdjacentElement("beforeend", post.content);
    }
}

setUpContent();