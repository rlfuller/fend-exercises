
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
    }, 

    updateCat: function(cat){
        console.log("tom *********", cat);
        this.currentCat.name = cat.name;
        this.currentCat.path = cat.path;
        this.currentCat.clicks = cat.clicks;
    }

};

// function CatMenuView(selector) {
//     this.el = document.querySelector(selector);
// }
// CatMenuView.prototype.render = function(cats) {

// }
// let catMenuView = new CatMenuView("#cat-list > ul");

let adminView = {
    $name: document.querySelector("#current-cat-name"),
    $href: document.querySelector("#current-cat-href"),
    $clicks: document.querySelector("#current-cat-clicks"),
    
    $save: document.querySelector("#save"),
    $cancel: document.querySelector("#cancel"),
    $form: document.querySelector("form"),
    //$fd: new FormData(this.$form),

    render: function(cat){
        console.log(cat);
        this.$name.value = cat.name;
        this.$href.value = cat.path;
        this.$clicks.value = cat.clicks;
    }

}

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
    $adminBtn: document.querySelector(".admin-btn"),

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
    init: function(model, catMenuView, catPanelView, adminView){ //passing the model and view into the controller
        this.catMenuView = catMenuView;
        this.catPanelView = catPanelView;
        this.adminView = adminView;
        this.model = model;

        let cats = model.getCats();
        catMenuView.render(cats);
        this.selectCat(cats[0]);
        //this.adminView.render(cats[0]);
        this.bind();
    }, 

    bind: function(){
        //cat panel - adding event listenter to the cat image
        this.catPanelView.getCatImage().addEventListener("click", () => {
            this.model.currentCat.clicks += 1;
            this.catPanelView.$totalCatClicks.textContent =
                `This cat has been clicked ${this.model.currentCat.clicks} time(s)`;
        });

        //menu - each list item
        this.catMenuView.getListItems().forEach($li => {
            $li.addEventListener("click", () => {
                
                this.selectCat($li.cat);
        
            });
        });

        //admin button
        this.catPanelView.$adminBtn.addEventListener("click", () => {
            //show the admin view

            //set the witht the current cat
            //console.log("checkster", this.model.currentCat);
            this.adminView.render(this.model.currentCat);
            this.adminView.$form.classList.toggle("hidden");
        });

        //save button
        this.adminView.$form.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("huzzah");
            //console.log("rachel", this.adminView.cat);
            //this.model.updateCat(this.adminView.cat)
            //let fd = new FormData(this.adminView.form).entries();
            let fd = new FormData(this.adminView.$form);
            // for (let x of fd.entries()){
            //     console.log(x);
            // }
            console.log("ldjsl", fd.get("clicks"));
            let clickz = parseInt(fd.get("clicks")) || 0;
            this.model.updateCat(
                {name:fd.get("cat-name"), path:fd.get("cat-href"), clicks: clickz}
            );
            this.adminView.$form.classList.toggle("hidden");
            this.catPanelView.render(this.model.currentCat);
        });

        //cancel button
        this.adminView.$form.addEventListener("reset", () => {
            //updte the model
            //console.log("rachel", this.adminView.cat);
            //this.model.updateCat(this.adminView.cat)
            
            //hide the view
            this.adminView.$form.classList.toggle("hidden");
        });
    }, 
    selectCat: function(cat){
        let currentCat = this.model.currentCat = cat;
        this.catPanelView.render(currentCat);
    }
}

controller.init(model,catMenuView, catPanelView, adminView);