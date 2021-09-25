// Set up namespace object
// Fetch Api data
// Add event listener to listen for users animal type choice
// Display user choice on page (create li element and append to ul)



// Add like button to animal profiles
// Add event listener to auto scroll to next animal profile once like button has been pushed
// save user like data in favourites section.
// save user like data in favourites section


const adoptionApp = {};
adoptionApp.apiKey = 'PjoCn4l5'

adoptionApp.ul = document.querySelector('.data-display');

// Making api call to get specie name to populate selection form.
adoptionApp.getAnimalsName = () => {
    const url = new URL(`https://api.rescuegroups.org/v5/public/animals/species/`);

    fetch(url, {
        headers: {
            'Authorization': adoptionApp.apiKey
        }
    })
        .then(res => res.json())
        .then((apiInfo) => {
            const animalInfo = apiInfo.data
            const animalList = document.querySelector('#animalList');
            let species = "";
            animalInfo.forEach((data) => {
                const name = data.attributes.plural
                species += `<option value="${name}">${name}</option>`
            })
            animalList.innerHTML = species;
        })

};

// Making api call to get the animal object.
adoptionApp.getData = (choice) => {
    const url = new URL(`https://api.rescuegroups.org/v5/public/animals/search/${choice.toLowerCase()}/`)
    fetch(url, {
        headers: {
            'Authorization': adoptionApp.apiKey
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(apiInfo => {
            const animalInfo = apiInfo.data;
            const images = apiInfo.included.filter((res) => {
                return res.attributes.large;
            })
            adoptionApp.display(animalInfo, images);
        })
        .catch(err => {
            adoptionApp.errorHandler({ behavior: "smooth" });
        })
};

// Function to handle errors when api call returns nothing. 
adoptionApp.errorHandler = () => {
    adoptionApp.ul.innerHTML = "";
    const li = document.createElement('li');
    const p = document.createElement('p');
    adoptionApp.ul.appendChild(li);
    li.classList.add('no-data');
    li.appendChild(p);

    p.innerText = 'Sorry but we do not have any animals available in the species for adoption. Please search another species or try again later.';
    li.scrollIntoView();

}

// display the data from the api call to the browser
adoptionApp.display = (dataFromApi, image) => {
    const mainElement = document.querySelector('#main');
    const havePic = dataFromApi.filter(data => data.relationships.pictures !== undefined);
    adoptionApp.ul.innerHTML = "";
    // Looping through api results and creating info cards for each to display in main section.
    havePic.forEach(res => {
        const animalId = res.id;
        const name = res.attributes.name
        const description = res.attributes.descriptionText
        const exitId = res.attributes.slug
        const li = document.createElement('li')
        adoptionApp.ul.appendChild(li);

        // Sorting through object if there is no description, we skipped that animal.
        if (description !== undefined) {
            const pics = image.filter(data => data.id === res.relationships.pictures.data[0].id)
                .map(data => data.attributes.large.url);
            li.innerHTML = `
                <div class="card">
                    <div class="small">
                        <img src="${pics}" alt=""/>
                        <h3>${name}</h3>
                        <div class="btn-container">
                            <button id="${name}">More Info</button>
                            <button id="${animalId}123">Like</button>
                            <button class="hidden exit" id="${exitId}">x</button>
                        </div>
                    </div>
                    <p class="hidden" id="${animalId}">${description}</p>
                </div>
            `
        }
        adoptionApp.userInteraction(name, animalId, exitId);
    });
    mainElement.scrollIntoView({ behavior: "smooth" });
};

// take the user selection and change the search paramiter for the api call for the specific animal chosen.
adoptionApp.userSelection = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const userAnimalChoice = e.target.animalList.value;
        adoptionApp.getData(userAnimalChoice)
    })

};

// user hover over cards to revile more info
adoptionApp.userInteraction = () => {
    const card = document.querySelector('.card');

    card.addEventListener('mouseOver', () => {

    })
}

// Function for all user interaction with buttons. 
adoptionApp.userInteraction = (name, tag, exit) => {

    adoptionApp.ul.addEventListener('click', function (e) {
        const infoButton = document.getElementById(name);
        const description = document.getElementById(tag);
        const exitButton = document.getElementById(exit);
        // Expend the info cards to reveal more information.
        if (e.target.id === name) {
            description.classList.remove('hidden')
            exitButton.classList.remove('hidden')
            infoButton.classList.add('hidden')
            exitButton.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // Exit to minimize info card.
        if (e.target.id === exit) {
            description.classList.add('hidden')
            exitButton.classList.add('hidden')
            infoButton.classList.remove('hidden')
        }
        // Toggles like button on and off.
        if (e.target.id === `${tag}123`) {
            const likeButton = document.getElementById(`${tag}123`)
            if (likeButton.innerText === 'Like') {
                likeButton.innerText = 'Liked'
                likeButton.classList.add('liked')
            } else {
                likeButton.innerText = 'Like'
                likeButton.classList.remove('liked')
            }
        }
    })
}


// our init for page load
adoptionApp.init = () => {
    adoptionApp.getAnimalsName();
    adoptionApp.userSelection();
};

adoptionApp.init();
