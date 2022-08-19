function initSession() {
    // Create a list of coded labels for each stimulus family
    let famCodes = [
        1, // Bear
        2, // Bunny
        3, // Green
        4  // Squid
    ];

    // Create a list of codes for category labels (just numbers from 0 to 17)
    let catCodes = [...Array(18).keys()]
    console.log(catCodes)

    // Randomly sample unique and nonoverlapping category sets for each stimulus family
    shuffle(catCodes)
    let k = 2
    let catSets = []
    for (let i = 0; i < k *famCodes.length; i += k) {
        catSets.push([catCodes[i], catCodes[i+1]])
    };
    console.log(catSets)


    // Create a list of labels for each categorization rule (i.e., each activity)
    let actRules = [
        "1d1", // 1 variable dimension; 1 relevant
        "2d1", // 2 variable dimensions; 1 relevant
        "2d2", // 2 variable dimensions; 2 relevant
        "2d0"  // 2 variable dumensions; 0 relevant
    ];

    // Randomly sample and fix the fixed dimension in 1d1 rule
    jatos.studySessionData["fixedDim"] = randInt(6) + 1
    
    // Randomly determine which dimension is relevant in 2d1 rule


    // Shuffle one of the arrays
    shuffle(actRules)

    // Create a mapping from stimulus family labels to activity labels
    let famRuleMap = {};
    famCodes.forEach((element, index) => {
        famRuleMap[element] = actRules[index];
    });
    jatos.studySessionData["famRuleMap"] = famRuleMap;

    // Create a mapping from stimulus family labels to the respective category sets
    let famCatMap = {};
    famCodes.forEach((element, index) => {
        famCatMap[element] = catSets[index]
    });
    jatos.studySessionData["famCatMap"] = famCatMap;

    // Set the number of (free) trials complete to 0 in the beginning of session
    jatos.studySessionData["freeTrialsComplete"] = 0
}