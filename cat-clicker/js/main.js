
let model = {
    cats: [
        {name: "dora", path: "../images/dora.jpg", clicks: 0},
        {name: "nora", path: "../images/nora.jpg", clicks: 0},
        {name: "flora", path: "../images/flora.jpg", clicks: 0},
        {name: "cora", path: "../images/cora.jpg", clicks: 0},
        {name: "james", path: "../images/james.jpg", clicks: 0}
    ],

    getCats: function(){
        return this.cats;
    }
};

// function CatMenuView(selector) {
//     this.el = document.querySelector(selector);
// }
// CatMenuView.prototype.render = function(cats) {

// }
// let catMenuView = new CatMenuView("#cat-list > ul");

let catMenuView = {
    $list: document.querySelector("#cat-list > ul"),

    render: function(cats){ //view does not talk to model, pass in cat, this willl need tobe called by octopus, only octopus call model, 
        cats.forEach( cat => {
            let $anchor = document.createElement("a");
            let $li = document.createElement("li");
            //$li.dataset.cat = cat;
            $li.cat = cat;

            $anchor.setAttribute("href", "javascript:void(0)");
            $anchor.text = cat.name;
            $li.appendChild($anchor);

            this.$list.appendChild($li);
        });
    },

    getListItems: function(){
        return Array.from(this.$list.querySelectorAll("li"));
    }
};

let catPanelView = {
    $mainPanel: document.querySelector("#main"),
    $catName: document.querySelector("#name"),
    $totalCatClicks: document.querySelector("#main p"),

    render: function(cats){
        cats.forEach (cat => {
            $img = document.createElement("img");
            $img.setAttribute("src", cat.path);
            $img.className = "hidden";
            $img.cat = cat; //this is a reference to the cat (from the model)
            //$img.dataset.cat = cat;

            this.$mainPanel.appendChild($img); 
        });
        
    },

    getCatImages: function(){
        return Array.from(this.$mainPanel.querySelectorAll("img"));
    },

    getImageByCat: function(cat) {
        return this.getCatImages().filter($img => $img.cat === cat)[0];
    }
    
}

let controller = {
    init: function(model, catMenuView, catPanelView){ //passing the model and view into the controller
        this.catMenuView = catMenuView;
        this.catPanelView = catPanelView;
        this.model = model;

        let cats = model.getCats();
        catMenuView.render(cats);
        catPanelView.render(cats);

        this.bind();
    }, 

    bind: function(){

        this.catPanelView.getCatImages().forEach( $img => {
            $img.addEventListener("click", () => {
                $img.cat.clicks +=1;
                this.catPanelView.$totalCatClicks.textContent =
                    `This cat has been clicked ${$img.cat.clicks} time(s)`;
            });
        });


        this.catMenuView.getListItems().forEach($li => {
            $li.addEventListener("click", () => {
                
                this.catPanelView.$catName.textContent = $li.cat.name;
        
                this.catPanelView.getCatImages().forEach( $image => {
                    $image.className = "hidden";
                    console.log($li.cat);
                    this.catPanelView.$totalCatClicks.textContent =
                        `This cat has been clicked ${$li.cat.clicks} time(s)`;
                });
                let $img = this.catPanelView.getImageByCat($li.cat);
                $img.classList = "";
        
            });
        });
    }
}

controller.init(model,catMenuView, catPanelView);