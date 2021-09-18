// Set up namespace object
// Fetch Api data
// Add event listener to listen for users animal type choice
// Display user choice on page (create li element and append to ul)



// Add like button to animal profiles
// Add event listener to auto scroll to next animal profile once like button has been pushed
// save user like data in favourites section.
// save user like data in favourites section

const adoptionApp = {};


const url = new URL('https://api.rescuegroups.org/v5/public/animals/species/')

fetch(url, {
    method: 'GET',
    headers: {
        Authorization: 'PjoCn4l5',
    },
    body: JSON.stringify(),
})
    .then(res => res.json())
    .then((data) => {
        console.log(data);
    });

adoptionApp.init = () => {
    console.log('this is working');
};


adoptionApp.init();