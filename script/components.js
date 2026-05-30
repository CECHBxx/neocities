class LeftSidebar extends HTMLElement {
    constructor() {
        super();
        this.classList.add("left-sidebar");
    }

    connectedCallback() {
        this.innerHTML =    `<div class="left-top-elements">
                                <div class="left-sidebar-upper-buttons button-group">
                                    <a href="/" class="single-button single-button-tall box-shadow ">
                                        <div class="color-strip"></div>
                                        <div class="button-text"><p>H</p><p>O</p><p>M</p><p>E</p></div>
                                    </a>
                                    <a href="${this.getAttribute("rootPath")}/html/info.html" class="single-button single-button-tall box-shadow ">
                                        <div class="color-strip"></div>
                                        <div class="button-text"><p>I</p><p>N</p><p>F</p><p>O</p></div>
                                    </a>
                                </div>
                            </div>
                            <div class="left-bottom-elements">
                                <div class="left-sidebar-lower-buttons button-group">
                                    <a-tab href="https://backloggd.com/u/scph10000/" class="single-button single-button-wide box-shadow">
                                        <div class="color-strip"></div>
                                        <div class="button-text"><p>Backloggd</p></div>
                                    </a-tab>  
                                    <div class="toggle-button toggle-vertical box-shadow">
                                        <button id="default-option"><div class="button-text">Default</div></button>
                                        <button id="accessible-option"><div class="button-text">Accessible</div></button>
                                    </div>
                                </div>
                            </div>`;
    }
}

customElements.define("left-sidebar", LeftSidebar);

class Directory extends HTMLElement {
    constructor() {
        super();
        this.articleContent = document.querySelector("#main-review-content");
        this.headings = [];

        if (this.articleContent != null && this.articleContent != undefined) {
            this.headings = this.articleContent.querySelectorAll("h2");
        }
    }

    generateLinks = () => {
        let linkHTMLText = "";
        
        for (let i = 0; i < this.headings.length; i++) {
            let currentHeader = this.headings[i];
            let number = (i + 1 < 10) ? `0${i + 1}` : i + 1;
            linkHTMLText += `<a href="#${currentHeader.id}"><span class="directory-number">${number}</span><span class="directory-name">${currentHeader.innerText}</span></a>`;
        }

        return linkHTMLText;
    }

    connectedCallback() {
        if (this.headings.length != 0) {
            this.innerHTML = `<h2>Directory</h2><div class="directory-links">${this.generateLinks()}</div>`;
        }
    }
}

customElements.define("sidebar-directory", Directory);

class ATab extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML =    `   <a href="${this.getAttribute("href")}" target="_blank" rel="noopener noreferrer">
                                    ${this.innerHTML}
                                </a>`;
    }
}

customElements.define("a-tab", ATab);