import cookies from "./script.js";

let currentView = "grid-view";
const backloggdURL = "scph1001";
const backloggdLinkStart = `https://backloggd.com/u/${backloggdURL}/review`;

const articleList = document.querySelector("#article-list");
const listToggle = document.querySelector("#list-option");
const gridToggle = document.querySelector("#grid-option");

let articleListArray = 
[
    { title: "Danganronpa: Trigger Happy Havoc", createdDate: "10/03/26", topic: ["Danganronpa: Trigger Happy Havoc", "Danganronpa"], mentioned: ["Danganronpa", "Danganronpa: Trigger Happy Havoc", "Danganronpa 2: Goodbye Despair"] },
    { title: "ICO", createdDate: "09/30/26", topic: ["ICO"], mentioned: ["Final Fantasy VII", "Final Fantasy VIII", "The Legend of Zelda: Ocarina of Time", "Persona 3", "Resident Evil", "Final Fantasy", "Dragon Quest II", "Persona 3 Portable", "Persona 3 Reload", "ICO"] },
    { title: "Dragon Quest", createdDate: "09/12/26", topic: ["Dragon Warrior", "Dragon Quest"], mentioned: ["The Portopia Serial Murder Case", "Portopia"] },
    { title: "Metal Gear Solid", createdDate: "08/09/26", topic: ["Metal Gear Solid", "MGS1", "MGS"], mentioned: ["MGS2", "Metal Gear Solid 2", "MGS3", "Metal Gear Solid 3", "MGS4", "Metal Gear Solid 4", "Metal Gear", "Metal Gear 2: Solid Snake", "MG2:SS"] },
    { title: "Deltarune Chapter 5", createdDate: "07/07/26", topic: ["Deltarune", "Deltarune Chapter 5"], mentioned: ["Undertale", "Deltarune Chapter 2", "Deltarune Chapter 3", "Deltarune Chapter 4", "Touhou", "Shin Megami Tensei: Strange Journey", "Shin Megami Tensei"] },
    { title: "Resident Evil", createdDate: "06/19/26", topic: ["Resident Evil", "RE1"], mentioned: ["Killer7", "MGS1", "Metal Gear Solid", "Robot Alchemic Drive"]},
    { title: "Who's Lila", createdDate: "06/01/26", topic: ["Who's Lila"], mentioned: []},
    { title: "Kaeru no Tame ni Kane wa Naru", createdDate: "05/29/26", topic: ["Kaeru no Tame ni Kane wa Naru", "For Whom The Frog Bell Toils"], mentioned: ["Super Smash Bros", "Super Smash Brothers", "The Legend of Zelda", "TLOZ", "Metroid"] },
    { title: "I hate Persona 4", createdDate: "05/25/25", topic: ["Persona", "Persona 4", "Persona 4 Golden", "P4", "P4G"], mentioned: ["SMT", "Shin Megami Tensei", "Persona 5", "Persona 5 Royal", "P5", "P5R", "Persona 3", "P3"] },
    { title: "The Silver Case", createdDate: "03/07/25", topic: ["The Silver Case"], mentioned: ["No More Heroes", "NMH"] },
    { title: "Burden I am Forced To Carry", createdDate: "04/17/24", topic: ["Persona", "Persona 5", "Persona 5 Royal", "P5", "P5R"], mentioned: ["SMT", "Shin Megami Tensei"] }
];

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
        this.htmlURL = this.htmlURL.replaceAll(`:`, "");

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
    if (cookieValue === "list") {
        listToggle.classList.add("selected-toggle")
    } else {
        cookieValue = "grid"
        gridToggle.classList.add("selected-toggle");
    }

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