// Randomly shuffle an array (source: https://javascript.info/task/shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  };


function randInt(max) {
  return Math.floor(Math.random() * max);
}

// function add a function to output a random label of a stimulus exemplar from a given family (depending on categorization rule)
function getFeatures() {

};