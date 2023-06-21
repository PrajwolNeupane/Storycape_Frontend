var openFilterModal = true;
var isDarkTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") == "true" : false;

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
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
            setTimeout(() => {
                toast.classList.add("bottom-[-100px]");
                toast.classList.remove("bottom-[50px]")
            }, 3500)
        }
        if (data.token) {
            setCookie("token", data.token, 30);
            window.location.href = "/"
        }
    } catch (e) {
        console.log(e);

    }
}
// Log Out
async function logOut() {
    deleteCookie("token");
    window.location.href = "/"
}
// Sign Up
async function signUp() {

    var name = document.getElementById("signup-name").value
    var email = document.getElementById("signup-email").value
    var password = document.getElementById("signup-password").value
    var cpassword = document.getElementById("signup-cpassword").value
    var toast = document.getElementById("login-toast");
    if (password == cpassword) {
        try {
            const response = await fetch(`${process.env.API_URL}api/v2/user/createUser`, {
                method: 'POST',
                headers: {
                    Accept: 'application.json',
                    'Content-Type': 'application/json',
                    'api_key': "mero-54321-app"
                },
                body: JSON.stringify({
                    name: name,
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
                setTimeout(() => {
                    toast.classList.add("bottom-[-100px]");
                    toast.classList.remove("bottom-[50px]")
                }, 3500)
            }
            if (data.token) {
                setCookie("token", data.token, 30);
                window.location.href = "/"
            }
        } catch (e) {
            console.log(e);

        }
    } else {
        toast.classList.remove("bottom-[-100px]");
        toast.classList.add("bottom-[50px]")
        toast.classList.add("border-fail")
        toast.innerHTML = `
        <h2 class="text-xs font-semibold text-text-mid">Sign in fail</h2>
          <h4 class="text-xxs font-medium text-text-mid">Confirm Password didn't match</h4>`
        setTimeout(() => {
            toast.classList.add("bottom-[-100px]");
            toast.classList.remove("bottom-[50px]")
        }, 3500)
    }
}
