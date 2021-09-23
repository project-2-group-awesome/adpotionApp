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
    const url = new URL(`https://api.rescuegroups.org/v5/public/animals/species/`)
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

}

// adoptionApp.userOptions = (array) => {
//     const animalList = document.querySelector('#animalList');

//     array.forEach((item) => {
//         animalList.innerHTML += `
//             <option value="${item}">${item}</option>
//         `
//     })
// }

adoptionApp.getData = (choice) => {
    const url = new URL(`https://api.rescuegroups.org/v5/public/animals/search/${choice}/`)
    fetch(url, {
        headers: {
            'Authorization': adoptionApp.apiKey
        }
    })
        .then(res => res.json())
        .then((apiInfo) => {
            console.log(apiInfo.data);
            adoptionApp.display(apiInfo.data);

            const picutres = apiInfo.included.filter((res) => {
                console.log(res.attributes.large);
            })
        })

}



adoptionApp.display = (dataFromApi) => {
    const ul = document.querySelector('.data-display');
    ul.innerHTML = "";
    dataFromApi.forEach((res) => {
        const li = document.createElement('li')
        ul.appendChild(li);
        const picture = res.attributes.pictureThumbnailUrl;
        const name = res.attributes.name
        const description = res.attributes.descriptionText

        if (description !== undefined && picture !== undefined) {
            li.innerHTML = `
                <div class="card-container">
                    <div class="card">
                        <div class="img-container">
                            <img src="${picture}" alt=""/>
                        </div>
                        <div class="description">
                            <h3>${name}</h3>
                        </div>
                        <div class="btn-container">
                            <button>More Info</button>
                            <button>Like</button>
                        </div>
                    </div>
                </div>
            `
        }
    });


}

adoptionApp.userSelection = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const userAnimalChoice = e.target.animalList.value;
        adoptionApp.getData(userAnimalChoice);
    })

};


adoptionApp.init = () => {
    adoptionApp.getAnimalsName();
    // adoptionApp.userOptions(adoptionApp.animalTypes);
    adoptionApp.userSelection();

};


adoptionApp.init();
