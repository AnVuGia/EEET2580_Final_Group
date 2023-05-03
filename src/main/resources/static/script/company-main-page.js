const approveRequest = [];
const rejectRequest = [];
const pendingRequest = [];
const currCompany = sessionStorage.getItem('user');
async function getApproveCapstoneProject() {
  const url = `api/capstone-project/${currCompany.name}/approved`;
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  return result;
}
getApproveCapstoneProject();
