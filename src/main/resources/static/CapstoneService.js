const onFind = (event) => {
    event.preventDefault();
    fetch('/api/capstoneProject/data').then(response => response.json())
            .then(data => {
             const dataList = document.querySelector('#data-list');
             data.forEach(item => {
             const li = document.createElement('li');
             li.textContent = item;
             dataList.appendChild(li);
                      });
                  });
}