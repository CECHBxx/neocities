class LeftSidebar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let svgDown = `<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                    <path d="M19 7H5c-.37 0-.71.21-.89.54a1 1 0 0 0 .07 1.04l7 10a.997.997 0 0 0 1.64 0l7-10c.21-.31.24-.7.07-1.04A1 1 0 0 0 19 7m-7 9.26L6.92 9h10.16z"></path>
                </svg>`

        this.innerHTML =    `
                            <div id="mobile-sidebar"><div id="close-icon"><button id="sidebar-button">${svgDown}</button></div></div>
                            <div class="sidebar-stack"> 
                                <div class="top-container">
                                    <a href="/html/beloveds.html"><img src="/assets/jackfrost.png" alt="An image of Jack Frost from Shin Megami Tensei. He is a cartoon snowman. He has a blue hat with pointed ends which look like horns. The hat goes around his entire face and has a trim near his neck with little bells. The image has a transparent background, a blue-green duotone effect, and a halftone effect. Jack frost is drawn in a cartoon style and he is sitting on the ground." id="left-sidebar-image"></a>
                                    <a href="/" class="single-button single-button-tall box-shadow ">
                                        <div class="color-strip"></div>
                                        <div class="button-text">Home</div>
                                    </a>
                                    <a href="/html/info.html" class="single-button single-button-tall box-shadow ">
                                        <div class="color-strip"></div>
                                        <div class="button-text">Info</div>
                                    </a>
                                </div>
                                <div class="bottom-container">
                                    <a-tab href="https://backloggd.com/u/scph1001/"class="single-button single-button-wide box-shadow ">
                                        <div class="color-strip"></div>
                                        <div class="button-text">Backloggd</div>
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
        let innerHTML = this.innerHTML;
        let externalLink = document.createElement("a");

        let idValue = (this.id != null && this.id != undefined) ? this.id : "";
        if (idValue != "") externalLink.id = idValue;

        let classValue = (this.className != null && this.className != undefined) ? this.className : "";
        if (classValue != "") externalLink.className = classValue;

        externalLink.href = this.getAttribute("href");
        externalLink.target = "_blank";
        externalLink.rel = "noopener noreferrer";
        externalLink.innerHTML = innerHTML;

        this.replaceWith(externalLink);
    }
}

customElements.define("a-tab", ATab);

// class Footnote extends HTMLElement {
//     constructor() {
//         super();
//     }

//     connectedCallback() {
//         let number = this.attributes["number"].nodeValue;
//         let innerHTML = `<sub>${number}</sub><span class="footnote-text" type="footnote">${this.innerHTML}</span>`;
//         console.log(innerHTML)

//         let footnote = document.createElement("a");
//         footnote.id = `footnote-location-${number}`;
//         footnote.className = `footnote`;
//         footnote.href = `#footnote-source-${number}`;
//         footnote.innerHTML = innerHTML;

//         this.replaceWith(footnote);
//     }
// }

// customElements.define("foot-note", Footnote);

class FootnoteFull extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let number = this.attributes["number"].nodeValue;
        let innerHTML = `${number} <a href="#footnote-location-${number}" class="footnote"><sup>^</sup></a>${this.innerHTML}`;

        let fullFootnote = document.createElement("p");
        fullFootnote.id = `footnote-source-${number}`;
        fullFootnote.className = `footnote`;
        fullFootnote.innerHTML = innerHTML;

        this.replaceWith(fullFootnote);
    }
}

customElements.define("foot-note-full", FootnoteFull);