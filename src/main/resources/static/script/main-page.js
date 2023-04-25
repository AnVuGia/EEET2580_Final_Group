const headerSelect = document.querySelectorAll('.nav-header-item');
// const searchPage = document.querySelector(".search-section");
const capstoneInfoSection = document.querySelector('.capstone-project-info');
const capstoneSearchSection = document.querySelector('.search-section');
const headerLogo = document.querySelector('.navbar-brand');
const createGroupBtn = document.querySelector('.create-group-btn');
const modalCancelBtn = document.querySelector('#cancel-btn');
const modalPage = document.querySelector('.modal');
const disSection = document.querySelector('.display-section');
const displayResult = document.querySelector('.display-result-search');
const groupListContainer = document.querySelector('.group-list');
var oldTarget = document.querySelector('.active');
// const groupPageSelector = document.querySelector('#group-info');
// const dashboardSelector = document.querySelector('#dashboard');
const numCapstonePerPage = 6;


const colorList = ["#BD3C14", "#FF2717","#4554A4","#0B9BE3","#06A3B7","#009688","#009606","#8D9900",
                    "#FD5D10","#65499D"];


let sort = 'asc';
let currentPage = 0;
const convertString = function (string){
    var temp = string.split(" ");
    return temp.join("%20");
}

headerLogo.addEventListener("click",function(ev){
    window.locaiton.href = "/main";
})
function headerBar() {
  for (var i = 0; i < headerSelect.length; i++)
    headerSelect[i].addEventListener('click', function (ev) {
      oldTarget.classList.remove('active');

      setVisibiltySearchPage(ev.target);
      ev.target.classList.add('active');
      oldTarget = ev.target;
    });
}
headerBar();
function setVisibiltySearchPage(target) {
  if (target.textContent === 'Dashboard') {
    disSection.textContent = 'Dashboard';
    window.location.href = '/main';
  }

  if (target.textContent === 'Search') {
    disSection.textContent = 'Search';
    capstoneInfoSection.setAttribute('hidden', 'hidden');
    capstoneSearchSection.removeAttribute('hidden');
  } else if (target.textContent === 'Dashboard') {
    disSection.textContent = 'Dashboard';
    capstoneSearchSection.setAttribute('hidden', 'hidden');
    capstoneInfoSection.removeAttribute('hidden');
  }else if (target.textContent === 'Announcment') {
    disSection.textContent = 'Recent Announcement';
    // capstoneSearchSection.setAttribute('hidden', 'hidden');
    // capstoneInfoSection.removeAttribute('hidden');
  }
}

modalCancelBtn.addEventListener('click', function () {
  modalPage.setAttribute('hidden', 'hidden');
});
createGroupBtn.addEventListener('click', function () {
  modalPage.removeAttribute('hidden');
});

async function getCapstoneList(capstone_name, company_name,supervisor_name,page,size,sort) {

    console.log("getCapstoneList");

    displayResult.innerHTML = `
    <div >
    <span class="">Loading...</span>
    </div>
    `
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''

    const url = `api/capstone-project/search?`;
    
  
    //if the param contains space, join them with %20
    var capstone_name = !!capstone_name? (capstone_name.includes(" ")?convertString(capstone_name):capstone_name)  :"";
    var company_name = !!company_name? (company_name.includes(" ")?convertString(company_name):company_name)  :"";
    var supervisor_name = !!supervisor_name? (supervisor_name.includes(" ")?convertString(supervisor_name):supervisor_name)  :"";
    var page = !!page? page:"";
    var size = !!size? size:"";
    var sort = !!sort? sort:"";
    //generate the query url
    var paraList = [capstone_name, company_name,supervisor_name,page,size,sort];
    var nameList = ["capstone_name", "company_name", "supervisor_name", "page", "size","sort"]
    var temp = ""

    for (var i = 0; i<  paraList.length;i++){
        if (!!paraList[i]){
            if (temp.length >0){
                temp += `&${nameList[i]}=${paraList[i]}`;
            }else{
                temp += `${nameList[i]}=${paraList[i]}`;
            }
        }
    }
   
    let endpoint = url + temp;
    // console.log(endpoint);
    response = await fetch(endpoint);
    result = await response.json();
    updateCapstoneListUI(result.content);
    await displayPagination(result);
}

async function updateCapstoneListUI(capstoneListData) {

    console.log('updateUI');
    
    console.log(capstoneListData);
    // console.log(capstoneListData);
    displayResult.innerHTML ="";
    for (let i = 0; i < capstoneListData.length; i++) {
        const capstone = capstoneListData[i];
        const capstoneCard = createCapstoneCard(capstone);
        displayResult.appendChild(capstoneCard);
    }
}

function createCapstoneCard(capstone) {
    const capItem = document.createElement('div');
    capItem.classList.add("capstone-item");
    capItem.innerHTML = `  
                            <div style ="background-color: ${!!capstone.capstoneColor?capstone.capstoneColor:"#BD3C14"}" class="capstone-item-color"></div>
                                <div class="capstone-item-info">
                                <p class="item-name">${capstone.projectTitle}</p>
                                <p class="course-code">COSC2753</p>
                                <p class="time-enrolled">Semester 1 2023</p>
                            </div>  
    `;
    return capItem;
}

//Company Search
async function getCompanyList(companyName, page, size, sort) {
    const url = `api/company/search?`;

    displayResult.innerHTML = `
    <div >
    <span class="">Loading...</span>
    </div>
    `
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''

    var companyName = !!companyName? (companyName.includes(" ")?convertString(companyName):companyName)  :"";
    var page = !!page? page:"";
    var size = !!size? size:"";
    var sort = !!sort? sort:"";

    var paraList = [companyName,page,size,sort];
    var nameList = [ "company_name", "page", "size","sort"];
    var temp = "";

    for (var i = 0; i<  paraList.length;i++){
        if (!!paraList[i]){
            if (temp.length >0){
                temp += `&${nameList[i]}=${paraList[i]}`;
            }else{
                temp += `${nameList[i]}=${paraList[i]}`;
            }
        }
    }
   
    let endpoint = url + temp;
    // console.log(endpoint);
    response = await fetch(endpoint);
    result = await response.json();
    updateCompanyUI(result.content);
    await displayPagination(result);
}
async function updateCompanyUI(companyList) {
    console.log(companyList);
    displayResult.innerHTML = '';
    for (let i = 0; i < companyList.length; i++) {
        const company = companyList[i];
        const companyCard = createCompanyCard(company);
        displayResult.appendChild(companyCard);
    }
}
function createCompanyCard(companyInfo) {
    console.log('createGroupCard');
    const div = document.createElement('div');
    div.classList.add("card");
    div.classList.add("p-3");
    div.classList.add("mb-2");
    div.innerHTML = `
            <img class="company-banner" src="images/BANNER-01.png" alt="company-banner">
            <div class="d-flex justify-content-between mt-2">
                <div class="d-flex flex-row align-items-center">
                    <div class="logo"> 
                       
                    </div>
                    <div class="ms-2 c-details">
                        <h5 class="company-title">${companyInfo.companyName}</h5> <span>1 days ago</span>
                    </div>
                </div>
            </div>
            <div class="mt-2">
                <div class="mt-2">
                    <div class="sub-overview">
                        <i class="bi bi-briefcase"> <span><span>Information Technology and Services</span></span></i>
                    </div>
                </div>
                <div class="mt-2">
                    <a href="" class="btn btn-outline-success btn-sm">Read More</a>
                    <a href="" class="btn btn-outline-danger btn-sm"><i class="bi bi-heart-fill"></i></a>
                </div>
            </div>
    `;
    return div;
}



//Group Search
async function getGroupList(groupName, page, size, sort) {
    const url = `api/group/search?`;

    displayResult.innerHTML = `
    <div >
    <span class="">Loading...</span>
    </div>
    `
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''

    var groupName = !!groupName? (groupName.includes(" ")?convertString(groupName):groupName)  :"";
    var page = !!page? page:"";
    var size = !!size? size:"";
    var sort = !!sort? sort:"";

    var paraList = [groupName,page,size,sort];
    var nameList = [ "groupName", "page", "size","sort"]
    var temp = ""

    for (var i = 0; i<  paraList.length;i++){
        if (!!paraList[i]){
            if (temp.length >0){
                temp += `&${nameList[i]}=${paraList[i]}`;
            }else{
                temp += `${nameList[i]}=${paraList[i]}`;
            }
        }
    }
   
    let endpoint = url + temp;
    // console.log(endpoint);
    response = await fetch(endpoint);
    result = await response.json();
    updateGroupUI(result.content);
    await displayPagination(result);
}
async function updateGroupUI(groupList) {
    console.log(groupList);
    displayResult.innerHTML = '';
    console.log('updateGroupUI');
    for (let i = 0; i < groupList.length; i++) {
        const group = groupList[i];
        const groupCard = createGroupCard(group);
        displayResult.appendChild(groupCard);
    }
}
function createGroupCard(groupInfo) {
    console.log('createGroupCard');
    const div = document.createElement('div');
    div.classList.add("card");
    div.classList.add("p-3");
    div.classList.add("mb-2");
    div.innerHTML = `
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <div class="icon"> <i class="bi bi-people"></i> </div>
                    <div class="ms-2 c-details">
                        <h5 class="mb-0">${groupInfo.groupName}</h5> <span>1 days ago</span>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <h3 class="heading">Enterprise Web Development</h3>
                <div class="mt-3">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 60%" aria-valuenow="3" aria-valuemin="0" aria-valuemax="5"></div>
                    </div>
                    <div class="mt-3"> 
                        <span class="text1">3 Applied <span class="text2">of 5</span></span> 
                    </div>
                    <div class="mt-3">
                        <button class="join-group-btn">JOIN</button>
                    </div>
                </div>
            </div>
    `;
    return div;
}
  
const displayPagination = async function (pageable) {
    console.log("display pagination");
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = `<li class="page-item">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>`;

    let maxPage = pageable.totalPages;

    
    
    for (let i = 0;  i < maxPage; i++) {
        const page = document.createElement("li");
        page.className = "page-item";

        const pageLink = document.createElement("div");

        pageLink.className = "page-link";
        pageLink.textContent = i + 1;
        pageLink.addEventListener("click", (e) => {
            const page = Number.parseInt(e.target.textContent) - 1;
            currentPage = page;

            if (searchSelection.value === "capstone"){
                updateCapstone(currentPage);
            }else if (searchSelection.value === "group"){
                updateGroup(currentPage);
            }else if (searchSelection.value === "company"){
                updateCompany(currentPage);
            } 
        })
        console.log("append pagi list");
        page.appendChild(pageLink);
        pagination.appendChild(page);
    }
    pagination.innerHTML += `<li class="page-item">
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
     </li>`;
}

const updateCapstone =  async function (curPage){
    console.log("updateCapstone");
    const supervisor_name = superVisorSelection.value === "all" ? undefined : superVisorSelection.value;
    const company_name = companySelection.value === "all" ? undefined : companySelection.value;
    await getCapstoneList(searchInput.value,company_name,supervisor_name,curPage);
}
const updateGroup =  async function (curPage){
    await getGroupList(searchInput.value,curPage);
}
const updateCompany =  async function (curPage){
    await getCompanyList(searchInput.value,curPage);
}
const onFiltered = async function(){
    console.trace();
    
    if(searchSelection.value === "capstone"){
        searchInput.placeholder = "Please enter Capstone Name"
        await updateCapstone(0);
    }else  if(searchSelection.value === "group"){
        searchInput.placeholder = "Please enter Group Name"
        await updateGroup(0);
    }else if (searchSelection.value === "company"){
        searchInput.placeholder = "Please enter Company Name"
        await updateCompany(0);

    }
}
const searchSelection = document.querySelector("#by-group-or-capstone");
const superVisorSelection = document.querySelector("#supervior-selection");
const companySelection = document.querySelector("#company-selection");
const searchInput = document.querySelector(".search-input");

searchSelection.addEventListener("change", function(){
    console.log("inside searchSelection")
    onFiltered()
} );

superVisorSelection.addEventListener("change", function(){
    console.log("inside superVisorSelection")
    onFiltered()
} );
companySelection.addEventListener("change", function(){
    console.log("inside superVisorSelection")
    onFiltered()
} );
searchInput.addEventListener("keyup", function(){
    console.log("inside superVisorSelection")
    onFiltered();
} );

const updateSupervisorList = async function (){
    let endpoint = "api/supervisor"
    superVisorSelection.innerHTML = `<option value="all">Select Supervisor</option>`;

    const response = await fetch(endpoint);
    const result = await response.json();

    console.log(result);

    for (var i = 0; i< result.length;i++){
        const option = document.createElement("option");
        option.textContent = result[i].supervisorName;
        option.value = result[i].supervisorName;
        superVisorSelection.appendChild(option);
    }
}


const updateCompanyList = async function (){
    // console.trace();

    companySelection.innerHTML ='<option value="all">Select Company</option>';

    let endpoint = "api/company"

    const response = await fetch(endpoint);
    const result = await response.json();

    console.log(result);

    for (var i = 0; i< result.length;i++){
        const option = document.createElement("option");
        option.textContent = result[i].companyName;
        option.value = result[i].companyName;
        companySelection.appendChild(option);
    }
}

updateCompanyList();
updateSupervisorList();
searchSelection.dispatchEvent(new Event('change'));
// onFiltered();
