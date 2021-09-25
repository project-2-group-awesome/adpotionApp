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
adoptionApp.ul = document.querySelector('.data-display');   // ??????

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
            const animalInfo = apiInfo.data;
            const images = apiInfo.included.filter((res) => {
                return res.attributes.large;
            })
            adoptionApp.display(animalInfo, images);
        })
};

// display the data from the api call to the browser



<<<<<<< HEAD
adoptionApp.ul = document.querySelector('.data-display');
=======
>>>>>>> 891fe470961e4764a8abb43e6f692c5805920c8a

adoptionApp.display = (dataFromApi, image) => {
    // console.log(image);
    // const havePic = dataFromApi.filter(data => data.relationships.pictures !== undefined);
    // const pics = havePic.map()
    const mainElement = document.querySelector('#main');


    const havePic = dataFromApi.filter(data => data.relationships.pictures !== undefined);

    adoptionApp.ul.innerHTML = "";
    havePic.forEach((res) => {
        console.log(res)
        const animalId = res.id;
        const name = res.attributes.name
        const description = res.attributes.descriptionText
        const exitId = res.attributes.slug
        const li = document.createElement('li')
        adoptionApp.ul.appendChild(li);
<<<<<<< HEAD
        
=======

>>>>>>> 891fe470961e4764a8abb43e6f692c5805920c8a
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

    form.addEventListener('submit', (e) => {

        e.preventDefault();
        const userAnimalChoice = e.target.animalList.value;
        adoptionApp.getData(userAnimalChoice)

    })

};

<<<<<<< HEAD
adoptionApp.userInteraction = (name, tag, exit)=> {
    
    adoptionApp.ul.addEventListener('click', function(e) {
        console.log(e.target.id);
=======
adoptionApp.userInteraction = (name, tag, exit) => {

    adoptionApp.ul.addEventListener('click', function (e) {
        // console.log(e.target.id);
>>>>>>> 891fe470961e4764a8abb43e6f692c5805920c8a
        const infoButton = document.getElementById(name);
        const description = document.getElementById(tag);
        const exitButton = document.getElementById(exit);
        // console.log(name);
        if (e.target.id === name) {
            description.classList.remove('hidden')
            exitButton.classList.remove('hidden')
            infoButton.classList.add('hidden')
<<<<<<< HEAD
            exitButton.scrollIntoView({behavior: "smooth", block: "start"});
        }
        if (e.target.id === exit) {
            description.classList.add('hidden')
            exitButton.classList.add('hidden')
            infoButton.classList.remove('hidden')
        }
        if (e.target.id === `${tag}123`) {
=======
            exitButton.scrollIntoView({ behavior: "smooth", block: "start" });
        } if (e.target.id === exit) {
            description.classList.add('hidden')
            exitButton.classList.add('hidden')
            infoButton.classList.remove('hidden')
        } if (e.target.id === `${tag}123`) {
>>>>>>> 891fe470961e4764a8abb43e6f692c5805920c8a
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
    // adoptionApp.userOptions(adoptionApp.animalTypes);
    adoptionApp.getAnimalsName();
    adoptionApp.userSelection();


};

adoptionApp.init();
