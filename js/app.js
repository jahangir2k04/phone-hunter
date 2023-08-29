const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // display 20 phones
    const showAllbtn = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAllbtn.classList.remove('d-none')
    }
    else{
        showAllbtn.classList.add('d-none')
    }


    // show warning message 
    const noPhone = document.getElementById('no-phone-found');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Brand : ${phone.brand}</h5>
                <h6>Model : ${phone.phone_name} </h6>
                <p class="card-text">Details : ${phone.slug}</p>
                <button onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loading spinner
    toggleSpinner(false);
}


//  spinner loading with show limited data and all data with function
const searchLimit = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
    
    searchLimit(10);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    // console.log(e.key);
    if (e.key === 'Enter') {
        searchLimit(10);
    }
});


// loading spinner function
const toggleSpinner = isLoading => {
    const loadingSpinner = document.getElementById('spinner');
    if(isLoading){
        loadingSpinner.classList.remove('d-none');
    }
    else{
        loadingSpinner.classList.add('d-none');
    }
}


document.getElementById('show-all-btn').addEventListener('click', function(){
    searchLimit();
})


const loadPhoneDetail = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneTitle = document.getElementById('phone-title');
    phoneTitle.innerText = phone.name;
    const phoneBody = document.getElementById('phone-body');
    phoneBody.innerHTML = `
    <img src="${phone.image}">
    <p><span class="fw-semibold">Release Date : </span>${phone.releaseDate ? phone.releaseDate : 'No Release Date'}</p>
    `;
}

loadPhones('apple');