define(function () {
    class Page2 extends PageModel {

        constructor () {
            super ("Page2");
            
            this.projectList = [];
            this.currentProjectPointer = 0;
        }

        setupProjectBadges () {
            console.log ("[Page2] setupProjectBadges");

            let element = document.querySelector ("#page2 #container");
            for (let i = 0; i < element.children.length; i++) {
                const child = element.children[i];
                child._position = null;
                this.projectList.push (child);
            }

            this.animateProjectBadgesEnter ();
        }

        generateRandomPosition () {
            console.log ("[Page2] generateRandomPosition");
            return {
                x: Math.floor (Math.random () * (document.body.offsetWidth - 128)),
                y: Math.floor (Math.random () * (document.body.offsetHeight - 128))
            };            
        }

        checkOverlapping (positionA, positionB) {
            let distance = (Math.pow ((positionB.x + 64) - (positionA.x + 64), 2) + Math.pow ((positionB.y + 64) - (positionA.y + 64), 2));
             console.log ("[Page2] checkOverlapping", distance); 
            return distance < Math.pow (120, 2);
        }
        
        checkTextOverlapping (position) {
            let rect = {
                x: document.body.offsetWidth / 5,
                y: document.body.offsetHeight / 2 - 50,
                w: document.body.offsetWidth - (document.body.offsetWidth / 5) * 2,
                h: 100
            };
            let circle = {
                x: position.x + 64,
                y: position.y + 64,
                r: 128
            };

            var distX = Math.abs (circle.x - rect.x - rect.w/2);
            var distY = Math.abs ( circle.y - rect.y - rect.h/2);

            if (distX > (rect.w / 2 + circle.r)) { return false; }
            if (distY > (rect.h / 2 + circle.r)) { return false; }

            if (distX <= (rect.w / 2)) { return true; } 
            if (distY <= (rect.h / 2)) { return true; }

            var dx = distX- rect.w / 2;
            var dy = distY- rect.h / 2;
            return (dx * dx + dy * dy <= (circle.r * circle.r));
        }

        isOverlappingWithAny (a) {   
            // console.log ("[Page2] isOverlappingWithAny");
            for (var i = 0; i < this.projectList.length; i ++) {
                let b = this.projectList[i];

                if (a != b && a._position && b._position && this.checkOverlapping (a._position, b._position)) {
                    return true;
                } else continue;
            }

            return false;
        }

        placeProjectBadge (element) {
            let position = this.generateRandomPosition ();
            element._position = position;
            if (this.checkTextOverlapping (element._position) || this.isOverlappingWithAny (element)) {
                setTimeout (this.placeProjectBadge.bind (this, element), 1);
            } else {
                element.style.left = `${element._position.x}px`;
                element.style.top = `${element._position.y}px`;
                element.classList.add ("active");            
            
                setTimeout (this.animateProjectBadgesEnter.bind (this), Math.random () * 500 + 500);
            }
        }

        animateProjectBadgesEnter () {
            console.log ("[Page2] animateProjectBadgesEnter");
            if (this.currentProjectPointer >= this.projectList.length) {
                setTimeout (window.nextPage, 1500);
                return;
            }

            let element = this.projectList[this.currentProjectPointer++];
            this.placeProjectBadge (element);
        }

        setupTyping () {
            console.log ("[Page2] setupTyping");

            // Além disso, conheço 10 linguagens de programação diferentes
            // Sou Full-stack
            // Posso atuar em projetos totalmente sozinho
            // Especialista em desenvolvimento Android e JavaScript
            
            this.typeit = new TypeIt ("#typed-page", { speed: 50, startDelay: 900 })
                .type ("Sou  <strong style='color: #fd9005'>Full-stack</strong>")
                .pause (300)
                .break ()
                .type ("Especialista em desenvolvimento <strong style='color: #99dc1a'>Android</strong> e <strong style='color: #f34573'>JavaScript</strong>")
                .pause (300)
                .delete ()
                .pause (500)
                .type ("Participei de vários projetos na RCA")
                //.exec (() => { this.setupProjectBadges (); })
                .pause (300)
                .go ();
        }

        onShow () {
            console.log ("[Page2] onShow");
            this.setupTyping ();
            this.setupProjectBadges ();
            //setTimeout (this.setupScrolling, 250);
            
        }
    
        onHide () {
            return new Promise (async (resolve, reject) => {
                console.log ("[Page2] onHide");

                document.querySelector ("#page2").classList.add ("exiting");
                setTimeout(resolve, 1000);
            });
        }
    }

    return new Page2 ();
});