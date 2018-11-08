let catEl = document.getElementById("cat-photo");
let clickTotalEl = document.getElementById("click-total");
let clickTotal = 0;

catEl.addEventListener("click", function(){
    clickTotal += 1;
    clickTotalEl.innerText = "You have clicked the cat " + clickTotal + " time(s)";
}, false);