define(function () {
    class EndPage extends PageModel {

        constructor () {
            super ("end");
        }

        setupTyping () {
            console.log ("[EndPage] setupTyping");

            /* this.typeit = new TypeIt ("#typed-page", { speed: 50, startDelay: 0 })
                // .type ("Esse sou eu :)")
                .go (); */
        }

        onShow () {
            console.log ("[EndPage] onShow");
            lazyload();
            this.setupTyping ();
        }
        onHide () {
            return new Promise (async (resolve, reject) => {
                console.log ("[EndPage] onHide");

                setTimeout(resolve, 1000);
            });
        }
    }

    return new EndPage ();
});