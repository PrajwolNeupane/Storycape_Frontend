
async function appendBlog() {
    var container = document.getElementById("container");
    try {
        const response = await fetch("https://dummyjson.com/posts");
        const data = await response.json();
        const posts = data.posts;
        posts.forEach(element => {
            container.innerHTML += ` <div
        class="flex flex-col py-[20px] px-[3%] mt-[20px] mb-[20px] w-[80%] bg-primary-light rounded-md"
       id="content">
        <div class="flex flex-row items-start gap-[10px]">
          <image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"
            class="w-[55px] h-[55px] object-cover bg-secondary-main rounded-[50%]"
          />
          <div>
            <h2 class="font-semibold text-sm text-text-main">Prajwol Neupane</h2>
            <h4 class="font-medium text-xxs text-text-light">
              prajwolneupane68@gmail.com
            </h4>
          </div>
        </div>
        <h1 class="font-medium text-lg text-text-main">
         ${element.title}
        </h1>
        <p
          class="font-medium text-xxs text-transparent bg-gradient-to-b from-text-mid via-text-mid to-primary-light bg-clip-text"
        >
        ${element.body}
        </p>
        <a href="https://tailwindcss.com/docs/min-height" target="_blank" class="mt-[-35px] w-[200px]  mx-[auto]">
          <button
            class="bg-text-light  py-[8px] w-[100%] text-xxs font-regular text-white  rounded-md hover:bg-text-mid"
          >
            Continue Reading
          </button>
        </a>
      </div> `
        });

    } catch (e) {
        console.log(e);
    }


}

window.addEventListener("scroll", function () {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        appendBlog();
    }
})