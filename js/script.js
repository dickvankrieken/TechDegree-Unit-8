let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const findUser = document.querySelector("#finduserbox");


fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));

function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>

        </div>
    `
    });

    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];

    let date = new Date(dob.date);

    modal.setAttribute('data-index', index);

    const modalHTML = `
        <div id="modal-flex-container" data-index=${index}>
            <div class="left-arrow"><</div>
            <div id="img-text-flex">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                    <hr />
                    <p>${phone}</p> 
                    <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
                    <p>Birthday:
                    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
                </div>
            </div>
            <div class="right-arrow">></div>
        </div>
        `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}
overlay.addEventListener('click', (e) => {
    const modal = document.querySelector(".modal");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    if (!overlay.classList.contains('hidden')) {
        if (e.target.classList.contains('left-arrow') || e.target.classList.contains('right-arrow')) {
            return;
        } else if (!modal.contains(e.target)) {
            overlay.classList.add('hidden');
        }

    }
});

gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
})

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

findUser.addEventListener('input', () => {
    input = findUser.value;
    const name = document.querySelectorAll(".name");
    for (i = 0; i < name.length; i += 1) {
        const loopName = name[i].innerHTML.toUpperCase();
        if (loopName.includes(input.toUpperCase())) {
            name[i].parentNode.parentNode.style.display = "";
            console.log(loopName);
        } else if (!loopName.includes(input)) {
            name[i].parentNode.parentNode.style.display = "none";
        }

    }
});

modalContainer.addEventListener('click', (e) => {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const modalFlexContainer = document.querySelector("#modal-flex-container");
    const dataIndex = modalFlexContainer.getAttribute('data-index');
    if (e.target === leftArrow) {
        if (dataIndex != 0) {
            displayModal(parseInt(dataIndex) - 1);
        }
    }
    if (e.target === rightArrow) {
        if (dataIndex != 11) {
            displayModal(parseInt(dataIndex) + 1);
        }
    }

});
