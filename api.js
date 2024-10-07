const dropDown = document.querySelector('.dropdownMenu');
const dropOptions =document.querySelector('.drop-options');
const toggle = document.querySelector('.toggle');
const icon = document.querySelector('.bx');
const countries = document.querySelector('.countries');
const search =  document.querySelector('.search');
const regions = document.querySelectorAll('.regions');
const modal = document.getElementById('countryModal');
const modalDetails = document.getElementById('modal-details');
const closeModal = document.querySelector('.close');


toggle.addEventListener('click', e => {
    document.body.classList.toggle('dark-mode');
    toggle.classList.toggle('dark-mode');
    icon.classList.toggle('bxs-moon');
    dropDown.classList.toggle('dark-mode');
    dropOptions.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#111517' : 'var(--bg-color)';

})
dropDown.addEventListener('click', e =>{
    dropOptions.classList.toggle('show-options');
})


async function fetchCountry() {
    try{
        const response = await fetch('data.json');
        const  data = await response.json();
        showCountries(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchCountry();

      // Load country data into the DOM
function showCountries(data) {
    data.forEach(val => {
        const country = document.createElement('div');
        country.classList.add('country');
        country.innerHTML =
            `div class="country-img">
                <img src="${val.flag}" alt="${val.name}">
            </div>

            <div class="country-details">
                <h5 class="countryName">${val.name}</h5>
                <p><strong>Population:</strong>${val.population}</p>
                <p><strong>Region:</strong>${val.region}</p>
                <p><strong>Capital:</strong>${val.capital}</p>
            </div>`;
        countries.appendChild(country);

        country.querySelector('.country-img').addEventListener('click', () => {
        showModal(val);
        });
    });
}

function showModal(country) {
    modalDetails.innerHTML = `<h2>${country.name}</h2>
        <img src="${country.flags.svg}" alt="${country.name}" style="width: 300px;">
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
        <p><strong>Currencies:</strong> ${Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
        <p><strong>Timezone(s):</strong> ${country.timezones.join(', ')}</p>
        <p><strong>Native Name:</strong> ${country.nativeName}</p>
        <p><strong>Top-Level Domain:</strong> ${country.topLevelDomain.join(', ')}</p>
        <p><strong>Borders:</strong> ${country.borders ? country.borders.join(', ') : 'No borders'}</p>`;


        modal.style.display = 'block';
}


closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target==modal) {
        modal.style.display = 'none';
    }
})


search.addEventListener('input', e => {
    const searchTerm = e.target.value.toLowerCase();
    const countryNames = document.querySelectorAll('.countryName');

    countryNames.forEach(country => {
        const countryDiv = country.parentElement.parentElement;
        if (country.innerText.toLowerCase().includes(searchTerm)) {
            countryDiv.style.display = 'block';
        } else {
            countryDiv.style.display = 'none';
        }
    });
});
/*const countryName = document.getElementsByClassName('countryName');
search.addEventListener('input', e =>  {
    Array.from (countryName).forEach(country => {
        if(country.innerHTML.toLowerCase().includes(search.value.toLowerCase())) {
            country.parentElement.parentElement.style.display= "grid";
        } else{
            country.parentElement.parentElement.style.display= "none";
        }
    })
}) */

    regions.forEach(region => {
        region.addEventListener('click', e => {
            const selectedRegion = e.target.innerText;
            const regionNames = document.querySelectorAll('.country-details p:nth-child(3)');
    
            regionNames.forEach(regionName => {
                const countryDiv = regionName.parentElement.parentElement;
                if (regionName.innerText.includes(selectedRegion) || selectedRegion === 'All') {
                    countryDiv.style.display = 'block';
                } else {
                    countryDiv.style.display = 'none';
                }
            });
        });
    });

/*const regionName = document.getElementsByClassName('.regionName');
regions.forEach(region => {
    region.addEventListener('click', e => {
        Array.from(regionName).forEach(element => {
            if(element.innerText.includes(region.innerText) || region.innerText === "All") {
                element.parentElement.parentElement.style.display = "grid";
            } else {
                element.parentElement.parentElement.style.display = "none";
            }
        })
    })
}) *?