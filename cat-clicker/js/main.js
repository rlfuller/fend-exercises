
let model = {
    cats: [
        {name: "dora", path: "../images/dora.jpg", clicks: 0},
        {name: "nora", path: "../images/nora.jpg", clicks: 0},
        {name: "flora", path: "../images/flora.jpg", clicks: 0},
        {name: "cora", path: "../images/cora.jpg", clicks: 0},
        {name: "james", path: "../images/james.jpg", clicks: 0}
    ],
    currentCat: {},

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
    $img: document.querySelector("img"),

    render: function(cat){
        this.$catName.textContent = cat.name;
        this.$img.setAttribute("src", cat.path);
        
        this.$totalCatClicks.textContent = `This cat has been clicked ${cat.clicks} time(s)`;
    },

    getCatImage: function(){
        //return Array.from(this.$mainPanel.querySelectorAll("img"));
        return this.$mainPanel.querySelector("img");
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

        this.catPanelView.getCatImage().addEventListener("click", () => {
            this.model.currentCat.clicks += 1;
            this.catPanelView.$totalCatClicks.textContent =
                `This cat has been clicked ${this.model.currentCat.clicks} time(s)`;
        });

        this.catMenuView.getListItems().forEach($li => {
            $li.addEventListener("click", () => {
                
                let currentCat = this.model.currentCat = $li.cat;
                
                this.catPanelView.render(currentCat);
        
            });
        });
    }
}

controller.init(model,catMenuView, catPanelView);