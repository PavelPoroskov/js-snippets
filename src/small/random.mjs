const getRandomIntInclusive = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// shuffle
function shuffleArr(array) {
    return array.sort( () => Math.random( ) - 0.5) ;
}

const getRandomItem = (items) =>  items[Math.floor(Math.random() * items.length)];
