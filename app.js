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

adoptionApp.url = new URL('https://api.rescuegroups.org/v5/public/animals/search/cats/')

adoptionApp.getData = () => {
    fetch(adoptionApp.url, {
        headers: {
            'Authorization': adoptionApp.apiKey
        }
    })
        .then(res => res.json())
        .then((apiInfo) => {
            adoptionApp.display(apiInfo.data);

        })



}

adoptionApp.display = (dataFromApi) => {
    const ul = document.querySelector('.data-display');
    // console.log(typeof (dataFromAPI))
    dataFromApi.forEach((res) => {
        const li = document.createElement('li')
        ul.appendChild(li);


        // console.log(res.attributes.name);
        // console.log(res.attributes.descriptionText);
        // console.log(res.attributes.pictureThumbnailUrl)
        const picture = res.attributes.pictureThumbnailUrl;
        const name = res.attributes.name
        const description = res.attributes.descriptionText
        li.innerHTML = `
            <div>
                <img src="${picture}"/>
                <h2>${name}</h2>
                <p>${description}</p>
            </div>
        `
    });


}



adoptionApp.init = () => {
    adoptionApp.getData();
};


adoptionApp.init();
