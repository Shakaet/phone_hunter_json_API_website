let allPhones = []; // Store all fetched phones
let displayedPhones = 6; // Number of phones to display initially

document.getElementById("search").addEventListener("keyup", function (e) {
    searchData(e.target.value);
});

let loadData = async () => {
    let res = await fetch(`https://openapi.programming-hero.com/api/phones?search=apple`);
    let data = await res.json();

    allPhones = data.data; // Store all phones for later use
    displayData(allPhones.slice(0, displayedPhones)); // Display only initial 6 phones
};

loadData();

let searchData = async (search) => {
    let res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    let data = await res.json();

    allPhones = data.data; // Store all phones for later use
    displayData(allPhones.slice(0, displayedPhones)); // Display only initial 6 phones
};

let detailsData = async (slug) => {
    let res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    let data = await res.json();

    phone_model(data.data); // Pass the single phone data to the modal
};

let phone_model = (phone) => {
    let modal_container = document.getElementById("modal-content");

    modal_container.innerHTML = `
        <h2>Storage: ${phone.mainFeatures.storage} </h2>
        <h2>Display: ${phone.mainFeatures.displaySize} </h2>
        <h2>Chipset: ${phone.mainFeatures.chipSet} </h2>
        <h2>Memory: ${phone.mainFeatures.memory} </h2>
    `;

    document.getElementById("custom_modal").showModal();
};

let displayData = (phones) => {
    console.log(phones);

    let container = document.getElementById("container");
    container.innerHTML = '';

    for (let phone of phones) {
        let div = document.createElement("div");
        div.classList = "card bg-base-100 w-96 shadow-xl mx-auto my-10";

        div.innerHTML = `
        <figure class="px-10 pt-10">
            <img
            src=${phone.image}
            alt="Phone"
            class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <div class="card-actions">
            <button onclick="detailsData('${phone.slug}')" class="btn btn-primary">More Details</button>
            </div>
        </div>
        `;

        container.appendChild(div);
    }
};

let ShowMoreData = () => {
    if (displayedPhones === 6) {
        displayedPhones = 21; // Increase the number of displayed phones to 21
        displayData(allPhones.slice(0, 21)); // Show the next 15 phones (from index 6 to 21)
    }
};
