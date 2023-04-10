const headerSelect = document.querySelectorAll(".nav-header-item");
// const searchPage = document.querySelector(".search-section");
const capstoneInfoSection = document.querySelector(".capstone-project-info");
const capstoneSearchSection = document.querySelector(".search-section");
const headerLogo = document.querySelector(".header-logo");
const createGroupBtn = document.querySelector(".create-group-btn");
const modalCancelBtn = document.querySelector("#cancel-btn");
const modalPage =document.querySelector(".modal"); 


var oldTarget;
headerLogo.addEventListener("click",function(){
    window.location.href = "index.html";
})


function headerBar(){
    for (var i = 0; i < headerSelect.length;i++)
    (
        headerSelect[i].addEventListener("click",function(ev){
            if (oldTarget != undefined)
            {
                oldTarget.classList.remove("shaded");
            }
            setVisibiltySearchPage(ev.target);
            ev.target.classList.add("shaded");
            oldTarget = ev.target;
        })
    )
}
function setVisibiltySearchPage (target){
    if (target.textContent ==="Dashboard")window.location.href = "index.html";
    if (target.textContent ==="Search")
    {
        capstoneInfoSection.setAttribute("hidden","hidden");
        capstoneSearchSection.removeAttribute("hidden");
    }else{
        capstoneSearchSection.setAttribute("hidden","hidden");
        capstoneInfoSection.removeAttribute("hidden");
    }
}

modalCancelBtn.addEventListener("click",function(){
    modalPage.setAttribute("hidden","hidden");
})
createGroupBtn.addEventListener("click",function(){
    modalPage.removeAttribute("hidden");
})


headerBar();