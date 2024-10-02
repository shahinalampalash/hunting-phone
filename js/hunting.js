const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // clear container
    phoneContainer.textContent = '';
    // display slice part
    const showAllContainer = document.getElementById('showw-all-btn')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        // 2.create div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
        // 3.set inner html
        phoneCard.innerHTML = `
        <figure>
                        <img src="${phone.image}" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end justify-center">
                            <button onclick="handelShowDetail('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `
        // append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggolLoadingSpinner(false)

}
// show details
const handelShowDetail = async (id) => {
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDeatilContainer= document.getElementById('show-detail-container');
    showDeatilContainer.innerHTML =`
    <img src ="${phone.image}" alt="" />
    <p> <span> Storage:</span>${phone?.mainFeatures?.storage}</P>
    <p> <span> Storage:</span>${phone?.brand}</P>
    <p> <span> Storage:</span>${phone?.releaseDate}</P>
    <p> <span> Storage:</span>${phone?.mainFeatures?.displaySize}</P>
    <p> <span> Storage:</span>${phone?.mainFeatures?.memory}</P>
    <p> <span> Storage:</span>${phone?.mainFeatures?.chipSet}</P>
    <p> <span> Storage:</span>${phone?.mainFeatures?.storage}</P>
    <p> <span> Storage:</span>${phone?.mainFeatures?.slug}</P>
    `
    show_details_modal.showModal()
}

// search bar
const handelSearch = (isShowAll) => {
    toggolLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    loadPhone(searchText, isShowAll);
}
const toggolLoadingSpinner = (isLoading) => {
    const lodingspinner = document.getElementById('loading-spiner');
    if (isLoading) {
        lodingspinner.classList.remove('hidden')
    }
    else {
        lodingspinner.classList.add('hidden')
    }
}
const handelShowAll = () => {
    handelSearch(true);
}
loadPhone();
