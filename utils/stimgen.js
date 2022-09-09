function getNextFeatures() {
    const choice = jatos.studySessionData.choice;
    const count = jatos.studySessionData.currentStage.trialsPerFam[choice];
    const epoch = jatos.studySessionData.currentStage.epochs[choice];
    if (count % epoch.length == 0) {
        jatos.studySessionData.currentStage.epochs[choice] = shuffle(epoch)
    }
    return jatos.studySessionData.currentStage.epochs[choice][count];
}

// Generate stimulus features based on array that specifies whether a dimension is variable or fixed at a given value
function genStimFeatures(dimVariance) {
    if (jatos.studySessionData.currentStage.epochs) {
        return getNextFeatures();
    } else {
        let features = [...dimVariance];
        for (let i = 0; i < dimVariance.length; i++) {
            if (dimVariance[i] === null) {
                features[i] = randInt(6) + 1;
            }
        }
        return features;
    }
}

// Return only relevant features based on the (boolean) relevance array
function getRelevantFeatures(features, relevance) {
    return features.filter((item, i) => relevance[i]);
}

function xnor(x, y) {
    return(x && y) || (! x && ! y);
}

// Get stimulus category (0 or 1) based on the values of relevant features
// if relDims is [], stimulus cateogry is determined randomly
// if relDims is [v], stimulus category is 1 if the v < 3
// if relDims is [v, w], stimulus category is 1 if (v < 3 AND w < 3) OR (v > 3 AND w > 3)
function getStimCat(relDims) {
    if (relDims.length === 0) { // R rule: category is random
        return randInt(2);
    } else if (relDims.length == 1) { // 1D and i1D rule: category based on 1 relevant dim
        return relDims[0] < 3
            ? 1
            : 0;
    } else if (relDims.length == 2) {
        return xnor(relDims[0] < 3, relDims[1] < 3)
            ? 1
            : 0;
    }
}

function genEpochs(famCodes) {
    // This is a highly specific function. It assumes there are 6 values per dimension and that there are two variable dimensions.
    // Make it less specific by using the mapping from family codes to rule definitions. When the rule is 1d-, fix one dimension at a constant value
    let s = {};
    famCodes.forEach((fam) => {
        let epoch = [];
        for (let i=1; i < 7; i++) {
            for (let j=1; j < 7; j++) {
                epoch.push([i, j])
            }
        }
        s[fam] = shuffle(epoch)
    })
    return s;
}