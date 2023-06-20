
//Global Variables
var openFilterModal = true;
var isDarkTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") == "true" : false;

function filterModalAction() {
    if (openFilterModal) {
        document.getElementById("filtermodal").classList.remove("hidden");
        document.getElementById("filterModalButton").innerText = "Close Filters"
        openFilterModal = false;
    } else {
        document.getElementById("filtermodal").classList.add("hidden");
        document.getElementById("filterModalButton").innerText = "Open Filters"
        openFilterModal = true;
    }
}

function changeTheme(theme) {
    if (!theme) {
        document.documentElement.classList.remove('dark')
        document.getElementById("sun-icon").classList.add("hidden");
        document.getElementById("moon-icon").classList.remove("hidden");
    } else {
        document.documentElement.classList.add('dark')
        document.getElementById("sun-icon").classList.remove("hidden");
        document.getElementById("moon-icon").classList.add("hidden");
    }
    localStorage.setItem("theme", theme)
}
changeTheme(isDarkTheme);

async function logIn() {

    var email = document.getElementById("login-email").value
    var password = document.getElementById("login-password").value
    var toast = document.getElementById("login-toast");
    try {
        const response = await fetch(`http://localhost:8000/api/v2/user/login`, {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json',
                'api_key': "mero-54321-app"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();
        if (data.message) {
            toast.classList.remove("bottom-[-100px]");
            toast.classList.add("bottom-[50px]")
            toast.classList.add("border-fail")
            toast.innerHTML = `
        <h2 class="text-xs font-semibold text-text-mid">Log In Fail</h2>
          <h4 class="text-xxs font-medium text-text-mid">${data.message}</h4>`
          setTimeout(()=>{
            toast.classList.add("bottom-[-100px]");
            toast.classList.remove("bottom-[50px]")
          },3500)
        }
        if(data.token){
            document.cookie = `token=${data.token}`
            window.location.href = "/"
        }
    } catch (e) {
        console.log(e);

    }
}
