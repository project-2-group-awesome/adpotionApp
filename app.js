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
// adoptionApp.animalTypes = ['alpacas',
//     'birds',
//     'cats',
//     'chickens',
//     'chinchillas',
//     'cows',
//     'degus',
//     'dogs',
//     'donkeys',
//     'ducks',
//     'ferrets',
//     'fish',
//     'frogs',
//     'geckos',
//     'geese',
//     'gerbils',
//     'goats',
//     'guineapigs',
//     'hamsters',
//     'hedgehogs',
//     'horses',
//     'iguanas',
//     'lizards',
//     'llama',
//     'mice',
//     'pigs',
//     'ponies',
//     'rabbits',
//     'rats',
//     'sheep',
//     'skunks',
//     'snakes',
//     'tortoises',
//     'turkeys',
//     'turtles'];

adoptionApp.getAnimalsName = () => {
    const url = new URL(`https://api.rescuegroups.org/v5/public/animals/species/`);

    fetch(url, {
        headers: {
            'Authorization': adoptionApp.apiKey
        }
    })
        .then(res => res.json())
        .then((apiInfo) => {
            const animalList = document.querySelector('#animalList');
            let species = "";
            apiInfo.data.forEach((data) => {
                species += `<option value="${data.attributes.plural}">${data.attributes.plural}</option>`
            })
            animalList.innerHTML = species.toLowerCase();

        })

};

// adoptionApp.userOptions = (array) => {
//     const animalList = document.querySelector('#animalList');

//     array.forEach((item) => {
//         animalList.innerHTML += `
//             <option value="${item}">${item}</option>
//         `
//     })
// }

// Get data from our Api call

adoptionApp.getData = (choice) => {
    const url = new URL(`https://api.rescuegroups.org/v5/public/animals/search/${choice}/`)
    fetch(url, {
        headers: {
            'Authorization': adoptionApp.apiKey
        }
    })
        .then(res => res.json())
        .then((apiInfo) => {
            // console.log(apiInfo);
            const images = apiInfo.included.filter((res) => {
                return res.attributes.large;
            })

            adoptionApp.display(apiInfo.data, images);


        })
};

// display the data from the api call to the browser




adoptionApp.display = (dataFromApi, image) => {
    // console.log(image);
    // const havePic = dataFromApi.filter(data => data.relationships.pictures !== undefined);
    // const pics = havePic.map()

    const havePic = dataFromApi.filter(data => data.relationships.pictures !== undefined);

    const ul = document.querySelector('.data-display');
    ul.innerHTML = "";
    havePic.forEach((res) => {
        // console.log(res.relationships.pictures.data[0].id)

        const name = res.attributes.name
        const description = res.attributes.descriptionText
        
        if (description !== undefined) {
            const li = document.createElement('li')
            ul.appendChild(li);

            const pics = image.filter(data => data.id === res.relationships.pictures.data[0].id)
                .map(data => data.attributes.large.url);
            li.innerHTML = `
                <div class="card">
                    <div class="small">
                        <img src="${pics}" alt=""/>
                        <h3>${name}</h3>
                        <div class="btn-container">
                            <button id="large">More Info</button>
                            <button>Like</button>
                        </div>
                    </div>
                    <p class="hidden">${description}</p>
                </div>
            `
        }
    });
    
    adoptionApp.userInteraction();

};

// take the user selection and change the search peramiter for the api call for the specific animal chosen.
adoptionApp.userSelection = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const userAnimalChoice = e.target.animalList.value;
        adoptionApp.getData(userAnimalChoice);
    })
};

adoptionApp.userInteraction = ()=> {
    const ulElement = document.querySelector('ul')
    const largeButton = document.querySelector('#large')
    const description = document.querySelector('p')

    ulElement.addEventListener('click', function(e) {
        if (e.target.id === 'large') {
            description.classList.toggle('hidden')
        }
    })
}

// our init for page load
adoptionApp.init = () => {
    adoptionApp.getAnimalsName();
    // adoptionApp.userOptions(adoptionApp.animalTypes);
    adoptionApp.userSelection();

};

adoptionApp.init();
