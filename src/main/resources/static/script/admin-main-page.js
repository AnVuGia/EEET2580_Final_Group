const displayPendingList = document.querySelector(".request-capstone")
const approvedButton = document.querySelector("#approve-btn");
const rejectButton = document.querySelector("#reject-btn");
function extractNumberFromString(str) {
    const match = str.match(/\d+/);
    if (match) {
      return parseInt(match[0], 10);
    }
    return null;
}

async function getRequestList() {
    console.log("getRequestList");
    displayResult.innerHTML = `
    <div >
    <span class="">Loading...</span>
    </div>
    `
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''

    const endpoint = `api/pending-capstone-projects`;
    response = await fetch(endpoint);
    result = await response.json();

    console.log(result);

    updateRequestUI(result.content);
    // await displayPagination(result);
}

async function updateRequestUI(capstoneListData) {

    // console.log(capstoneListData);
    displayPendingList.innerHTML ="";
    for (let i = 0; i < capstoneListData.length; i++) {
        const capstone = capstoneListData[i];
        const capstoneCard = createRequestCapstoneCard(capstone);
        displayPendingList.appendChild(capstoneCard);
    }
}

function createRequestCapstoneCard(capstone) {
    const capItem = document.createElement('div');
    capItem.classList.add("capstone-item");
   
    capItem.innerHTML += `<div style ="background-color: ${capstone.capstoneColor}" class="capstone-item-color"></div>`;

    const itemInfo = document.createElement("div");
    itemInfo.classList.add("capstone-item-info");

    const itemName = document.createElement("p");
    itemName.classList.add("item-name");
    itemName.textContent =capstone.projectTitle;

    itemInfo.appendChild(itemName);
    
    const cardButton = document.createElement("button");
    cardButton.classList.add("btn", "btn-primary", "card-button");
    cardButton.setAttribute("data-bs-target", "#staticBackdrop");
    cardButton.setAttribute("data-bs-toggle", "modal");
    cardButton.setAttribute("type", "button");
    cardButton.textContent = "More info";
    
    cardButton.setAttribute("id",`${capstone.id}`);
    cardButton.addEventListener("click", async function(ev){
        sessionStorage.setItem("more-info", JSON.stringify(extractNumberFromString(ev.target.id)));
        console.log("click on item title");
        console.log(ev.target);
        let url = `api/capstone-project/id/${ev.target.id}`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        updateModal(data);
    })
    
    itemInfo.innerHTML += ` <p class="course-code">COSC2753</p>
                            <p class="time-enrolled">Semester 1 2023</p>`

    itemInfo.appendChild(cardButton);
   
    capItem.appendChild(itemInfo);
    return capItem;
}


const updateModal = function (capstone){
    console.log("update modal");
    const div = document.querySelector(".information-section");
    div.innerHTML =`<p>Capstone Project name: ${capstone.projectTitle} </p>`
}

approvedButton.addEventListener('click',async function(ev){
    let id = JSON.parse(sessionStorage.getItem("more-info"));
    await setCapstoneStatus(id,"approved");
    await getRequestList();
})
rejectButton.addEventListener('click',async function(ev){
    let id = JSON.parse(sessionStorage.getItem("more-info"));
    await setCapstoneStatus(id,"reject");
    await getRequestList();
})
const setCapstoneStatus = async function (id, status){
    let url = `/api/capstone-project/id/${id}`;
    let reponse = await fetch(url);
    let capstone = await reponse.json();
    
    url = `api/capstone-project/${capstone.id}`;
    capstone.capstoneStatus = status;
    try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(capstone)
        });
      } catch (error) {
        console.error(error);
    }
}

getRequestList();