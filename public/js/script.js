//Global Variables
var openFilterModal = true;
var isDarkTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") == "true" :false ;


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

function changeTheme (theme) {
    if(!theme){   
        document.documentElement.classList.remove('dark')
        document.getElementById("sun-icon").classList.add("hidden");
        document.getElementById("moon-icon").classList.remove("hidden");
    }else{
        document.documentElement.classList.add('dark')
        document.getElementById("sun-icon").classList.remove("hidden");
        document.getElementById("moon-icon").classList.add("hidden");
    }
    localStorage.setItem("theme",theme)
}
changeTheme(isDarkTheme);
