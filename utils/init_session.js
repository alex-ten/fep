function initSession() {
    // Create a list of coded labels for each stimulus family
    let famCodes = [
        1, // Bear
        2, // Bunny
        3, // Green
        4  // Squid
    ];

    // Create a list of labels for each categorization rule (i.e., each activity)
    let actRules = [
        "1d1", // 1 variable dimension; 1 relevant
        "2d1", // 2 variable dimensions; 1 relevant
        "2d2", // 2 variable dimensions; 2 relevant
        "2d0"  // 2 variable dumensions; 0 relevant
    ];

    // Shuffle one of the arrays
    shuffle(actRules)

    // Create a default mapping from anonymous labels of stimulus sets to activity labels (i.e., classification rules)
    let map = {};
    famCodes.forEach((element, index) => {
        map[element] = actRules[index];
    });
    jatos.studySessionData["famRuleMapping"] = map;

    // Set the number of (free) trials complete to 0 in the beginning of session
    jatos.studySessionData['freeTrialsComplete'] = 0
}