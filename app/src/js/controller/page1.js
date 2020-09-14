define(function () {
    class Page1 extends PageModel {

        constructor () {
            super ("Page1");
            this.state = "entering";
            this.languages = [];
            this.currentLanguagePointer = 0;

            this.lineCount = 0;
        }

        animateLineBreak (value=1) {
            console.log ("[Page1] animateLineBreak");
            return new Promise ((function (value, resolve, reject) {
                this.lineCount += value;

                let element = document.querySelector ("#typed-page");
                element.style.top = `calc(50% - ${this.lineCount * 39 / 2 + 19.5}px)`;

                setTimeout (() => { resolve (); }, 150);
            }).bind (this, value));
        }

        animateLanguageBadgesEnter () {
            console.log ("[Page1] updateLanguageBadges");
            if (this.currentLanguagePointer >= this.languages.length) return;

            let element = this.languages[this.currentLanguagePointer++];

            if (this.state === "entering") {
                let positions = [
                    ["10vw", "10vh"],// NodeJS
                    ["30vw", "20vh"],// Kotlin
                    ["70vw", "75vh"],// Android
                    ["7vw", "60vh"],// Javascript
                    ["76vw", "15vh"],// Typescript
                    ["80vw", "57vh"],// MongoDB
                    ["40vw", "60vh"],// Java
                ];
                element.style.left = positions[this.currentLanguagePointer - 1][0];
                element.style.top = positions[this.currentLanguagePointer - 1][1];
            }

            element.classList.add (this.state);

            setTimeout (this.animateLanguageBadgesEnter.bind (this), Math.random () * 500 + 500);
        }

        setupLanguages () {
            console.log ("[Page1] setupLanguages");
            let element = document.querySelector ("#page1 #container");
            for (let i = 0; i < element.children.length; i++) {
                const child = element.children[i];
                this.languages.push (child);
            }

            this.animateLanguageBadgesEnter ();
        }

        setupTyping () {
            console.log ("[Page1] setupTyping");
            this.typeit = new TypeIt ("#typed-page", { speed: 50, startDelay: 900 })
                .type ("Programador desde os <strong style='color: #fd9005'>7 anos de idade</strong>")
                .pause (300)

                .break ()
                .exec (this.animateLineBreak.bind (this, +1))
                .type (`Totalizando <strong style='color: #08ffc8'>${Math.ceil(new Date().getFullYear() - 2008)} anos</strong>`)
                .pause (750)

                .exec (() => {
                    return new Promise ((resolve, reject) => {
                        this.setupLanguages ();
                        resolve ();
                    });
                })

                .break ()
                .exec (this.animateLineBreak.bind (this, +1))
                .type ("Fluente em várias <strong style='color: #f34573'>linguagens e tecnologias</strong>")
                .pause (2550)

                // #region deletion
                .delete ("Fluente em várias linguagens e tecnologias".length + 1)
                .exec (this.animateLineBreak.bind (this, -1))

                .delete ("Totalizando 11 anos".length + 1)
                .exec (this.animateLineBreak.bind (this, -1))

                .delete ("Programador desde os 7 anos de idade".length + 1)
                .exec (this.animateLineBreak.bind (this, -1))
                // #endregion

                .exec (() => { window.nextPage (); })

                .go ();
        }

        onShow () {
            console.log ("[Page1] onShow");

            this.setupTyping ();
        }

        animateLanguageBadgesExit () {
            return new Promise ((function (resolve, reject) {
                console.log ("[Page1] animateLanguageBadgesExit");

                for (let i = 0; i < this.length; i++) {
                    const child = this[i];

                    child.style.left = "calc(50vw - 64px)";
                    child.style.top = "calc(50vh - 64px)";
                }

                setTimeout (() => {
                    document.querySelector ("#page1").classList.add ("exiting");
                    setTimeout(resolve, 250);
                }, 750);

            }).bind (this.languages));
        }

        onHide () {
            return new Promise (async (resolve, reject) => {
                console.log ("[Page1] onHide");

                await this.animateLanguageBadgesExit ();

                setTimeout(resolve, 1000);
            });
        }
    }

    return new Page1 ();
});