define(function () {
    class AboutPage extends PageModel {

        constructor () {
            super ("about");

            this.lineCount = 0;
        }

        animateLineBreak (value=1) {
            console.log ("[AboutPage] animateLineBreak");
            return new Promise ((function (value, resolve, reject) {
                this.lineCount += value;

                let element = document.querySelector ("#typed-page");
                element.style.top = `calc(50% - ${this.lineCount * 39 / 2 + 19.5}px)`;

                setTimeout (() => { resolve (); }, 150);
            }).bind (this, value));
        }

        setupTyping () {
            console.log ("[AboutPage] setupTyping");
            // Fui monitor no curso

            // Me formei no Técnico em Informática em 2016, com 15 anos.
            // Comecei a dar aulas ainda com 15
            // Fiz cursos de Inovação com Arduino com 16
            // Entrei na faculdade cursando Análise e desenvolvimento de sistemas, com 17.
            
            //me formo em 2021

            this.typeit = new TypeIt ("#typed-page", { speed: 50, startDelay: 900 })
                .type ("Comecei a dar <strong style='color: #08ffc8'>Aulas particulares</strong> aos <strong style='color: #08ffc8'>14 anos</strong>")
                .pause (750)
            
                .break ()
                .exec (this.animateLineBreak.bind (this, +1))
                .type ("Me formei como <strong style='color: #fd9005'>Técnico em Informática</strong> aos <strong style='color: #fd9005'>15 anos</strong>")
                .pause (300)
                

                .break ()
                .exec (this.animateLineBreak.bind (this, +1))
                .type ("Fiz cursos de <strong style='color: #f34573'>Aplicação e inovação em Arduino</strong> aos <strong style='color: #f34573'>16 anos</strong>")
                .pause (750)

                .break ()
                .exec (this.animateLineBreak.bind (this, +1))
                .type ("Atualmente estou cursando <strong style='color: #99dc1a'>Análise e desenvolvimento de sistemas</strong>")
                .pause (2250)

                .exec (() => {
                    return new Promise ((resolve, reject) => {
                        document.querySelector ("#page-about").classList.add ("exiting");

                        setTimeout (resolve, 500);
                    });
                })

                .exec (() => { window.nextPage (); })

                .go ();
        }

        onShow () {
            console.log ("[AboutPage] onShow");
            this.setupTyping ();
        }
        
        onHide () {
            return new Promise (async (resolve, reject) => {
                console.log ("[AboutPage] onHide");

                setTimeout(resolve, 1000);
            });
        }
    }

    return new AboutPage ();
});