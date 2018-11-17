
let numClicks = 0;
let $list = document.querySelector("#cat-list");
//let $catFragment = document.createDocumentFragment();

let $catName = document.querySelector("#name");
let $totalCatClicks = document.querySelector("p");
let $mainPanel = document.querySelector("#main");

// class Cat {
//     constructor(name){
//         this.name = name;
//         this.numClicks = 0;
//     }
// }

let cats = [
    {name: "dora", path: "../images/dora.jpg", clicks: 0},
    {name: "nora", path: "../images/nora.jpg", clicks: 0},
    {name: "flora", path: "../images/flora.jpg", clicks: 0},
    {name: "cora", path: "../images/cora.jpg", clicks: 0},
    {name: "james", path: "../images/james.jpg", clicks: 0}
];

cats.forEach(function(cat){
    let $anchor = document.createElement("a");
    // let href = document.createAttribute("href");
    // href.value = cat.path;
    // anchorEl.setAttributeNode(href);
    $anchor.setAttribute("href", "javascript:void(0)");
    $anchor.text = cat.name;

    let $img = document.createElement("img");
    $img.setAttribute("src", cat.path);
    $img.className = "hidden";
    $img.addEventListener("click", function(){
        cat.clicks +=1;
        $totalCatClicks.textContent = `This cat has been clicked ${cat.clicks} time(s)`;
    });

    $mainPanel.appendChild($img);   

    let $li = document.createElement("li");
    $li.appendChild($anchor);

    $li.addEventListener("click", function(){
        // $img.setAttribute("src", cat.path);
        
        $catName.textContent = cat.name;

        //document.querySelectorAll("img").forEach
        let images = Array.from(document.querySelectorAll("img")).forEach(function(image){
            image.className = "hidden";
            $totalCatClicks.textContent = `This cat has been clicked ${cat.clicks} time(s)`;
        });
        $img.classList = "";

    });

    $list.appendChild($li);


});