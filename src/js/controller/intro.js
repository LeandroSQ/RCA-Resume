define(function () {
    class IntroPage extends PageModel {

        constructor () {
            super ("intro");
            this.typeit = null;
        }

        setupTypeEffect () {
            this.typeit = new TypeIt ("#typed-page", { speed: 50, startDelay: 900 })
                .type ("Olá, ")
                .pause (300)
                
                .type ("eu sou <strong>o Leandro</strong>")
                .pause (750)

                .delete ("o Leandro".length)
                .pause (750)
                .type ("<strong style='color: #fd9005'>músico</strong>")
                .pause (550)

                .delete ("músico".length)
                .pause (550)
                .type ("<strong style='color: #08ffc8'>professor particular</strong>")
                .pause (550)

                .delete ("professor particular".length)
                .pause (550)
                .type ("<strong style='color: #f34573'>empreendedor</strong>")
                .pause (550)

                .delete ("empreendedor".length)
                .pause (550)
                .type ("<strong style='color: #dadada'>programador</strong>")
                .pause (750)

                .delete ()

                .exec (() => { window.nextPage (); })
                .go ();
        }

        onShow () {
            console.log ("[IntroPage] onShow");

            setTimeout(this.setupTypeEffect, 1750);
        }
    
        onHide () {
            return new Promise ((resolve, reject) => {
                console.log ("[IntroPage] onHide");

                let h1Element = document.querySelector ("#page-intro #typed-page");
                h1Element.classList.add ("exiting");
                h1Element.parentElement.removeChild (h1Element);

                let imgElement = document.querySelector ("#page-intro .img");
                imgElement.classList.add ("exiting");

                setTimeout(resolve, 1000);
            });
        }
    }

    return new IntroPage ();
});