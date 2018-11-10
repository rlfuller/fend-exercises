let cat1El = document.getElementById("cat-photo1");
let cat2El = document.getElementById("cat-photo2");
let clickTotalEl1 = document.getElementById("click-total-cat1");
let clickTotalEl2 = document.getElementById("click-total-cat2");
let clickTotal1 = 0;
let clickTotal2 = 0;
const cat1Name = "Caticus Aurealis";
const cat2Name = "Judd";

let cat1NameEl = document.getElementById("cat1name");
let cat2NameEl = document.getElementById("cat2name");
cat1NameEl.innerText = cat1Name;
cat2NameEl.innerText = cat2Name;

cat1El.addEventListener("click", function(){
    clickTotal1 += 1;
    clickTotalEl1.innerText = "You have clicked the cat " + clickTotal1 + " time(s)";
}, false);

cat2El.addEventListener("click", function(){
    clickTotal2 += 1;
    clickTotalEl2.innerText = "You have clicked the cat " + clickTotal2 + " time(s)";
}, false);