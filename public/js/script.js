
var openFilterModal = true;

function filterModalAction () {
    if(openFilterModal){
        document.getElementById("filtermodal").classList.remove("hidden");
        document.getElementById("filterModalButton").innerText = "Close Filters"
        openFilterModal = false;
    }else{
        document.getElementById("filtermodal").classList.add("hidden");
        document.getElementById("filterModalButton").innerText = "Open Filters"
        openFilterModal = true;
    }
}
