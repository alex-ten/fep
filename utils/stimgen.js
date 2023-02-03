function getNextFeatures() {
    const choice = jatos.studySessionData.choice;
    const count = jatos.studySessionData.currentStage.trialsPerFam[choice];
    const epoch = jatos.studySessionData.currentStage.epochs[choice];
    const ind = count % epoch.length
    return jatos.studySessionData.currentStage.epochs[choice][ind];
}

// Generate stimulus features based on array that specifies whether a dimension is variable or fixed at a given value
function getStimFeatures(nVarDims) {
    if (jatos.studySessionData.currentStage.epochs) {
        return getNextFeatures();
    } else {
        // TODO: this always returns 1 or 2 random features (no exclusion implemented)
        let features = (nVarDims == 1) ? [3, randInt(6) + 1] : [randInt(6) + 1, randInt(6) + 1]
        return features;
    }
}

// Return only relevant features based on the (boolean) relevance array
function getRelevantFeatures(features, relevance) {
    return features.filter((item, i) => relevance[i]);
}

function xnor(x, y) {
    return (x && y) || (! x && ! y);
}

// Get stimulus category (0 or 1) based on the values of relevant features
// if relDims is [], stimulus cateogry is determined randomly
// if relDims is [v], stimulus category is 1 if the v < 3
// if relDims is [v, w], stimulus category is 1 if (v < 3 AND w < 3) OR (v > 3 AND w > 3)
function getStimCat(features, rule) {
    switch (rule) {
        case '1d1':
            return features[0] < 4 ? 1 : 0
        case '2d1':
            return features[0] < 4 ? 1 : 0
        case '2d2':
            return xnor(features[0] < 4, features[1] < 4) ? 1 : 0
        case '2d0':
            return randInt(2)
        case 'fi':
            return (features[0] + features[1] > 7) ? 1 : 0
        default:
            console.log('Invalid rule entered.')
    }
}

function genEpochs(famRuleMap, blockSize) {
    // Assumes 6 values per dimension and that there are two variable dimensions
    let s = {};
    for (const [fam, rule] of Object.entries(famRuleMap)) {
        let epochs = []
        while (epochs.length < blockSize) {
            let epoch = []
            for (let i = 1; i < 7; i++) {
                for (let j = 1; j < 7; j++) {
                    let vals = [i, j]
                    if (rule.exclude == undefined) {
                        epoch.push(vals)
                    } else {
                        if (!rule.exclude(vals)) {
                            epoch.push(vals)
                        }
                    }
                }
            }
            epochs = epochs.concat(shuffle(epoch))
        }
        s[fam] = epochs.slice(0, blockSize)
    }
    return s;
}