// Initialize categorization rule 1D
function init1d1() {
    let dimensions = shuffle([randInt(6) + 1, null])
    let relevant = [false, false]
    relevant[dimensions.indexOf(null)] = true
    return [dimensions, relevant]
}

// Initialize categorization rule i1D
function init2d1() {
    return [[null, null], shuffle([false, true])]
}

function initSchedule(blockSize, maxTrials, actsOrder, shuffleOrder) {
    let p = shuffleOrder === 1 ? shuffle(actsOrder) : actsOrder
    const s = [];
    if ((shuffleOrder === 2) && (blockSize === 1)) {
        for (let i = 0; i <= maxTrials + (maxTrials % p.length); i += p.length) {
            let ii = i % p.length
            s.push(...shuffle(p.slice(ii, ii + p.length)))
        }
        return s.slice(0, maxTrials);
    }
    for (let i = 0; i <  Math.floor(maxTrials / blockSize); i++) {
        let ii = i % p.length;
        let block = [];
        for (let j = 0; j < blockSize; j++) {
            block.push(p[ii])
        }
        s.push(...block)
    }
    for (let i = 0; i < maxTrials % blockSize; i++) {
        s.push(p[1])
    }
    return s;
}

function initSession() {
    // Create a list of coded labels for each stimulus family
    let famCodes = jatos.studyJsonInput.famsIncluded

    // Create a list of codes for category labels (just numbers from 0 to 17)
    let catCodes = [...Array(18).keys()];

    // Randomly sample unique and nonoverlapping category sets for each stimulus family
    shuffle(catCodes)
    let k = 2;
    let catSets = [];
    for (let i = 0; i < k *famCodes.length; i += k) {
        catSets.push([catCodes[i], catCodes[i+1]])
    };

    // Create instructions for activity rules
    const actRules = {
        '1d1': init1d1(),                       // 1 variable dimension; 1 relevant
        '2d1': init2d1(),                       // 2 variable dimensions; 1 relevant
        '2d2': [[null, null], [true, true]],    // 2 variable dimensions; 2 relevant
        '2d0': [[null, null], [false, false]]   // 2 variable dumensions; 0 relevant
    };

    let rulesIncluded = [];
    jatos.studyJsonInput.rulesIncluded.forEach((element) => {
        rulesIncluded.push(actRules[element].concat([element]))
    })

    // Shuffle one of the arrays
    shuffle(rulesIncluded)

    // Create a mapping from stimulus family labels to activity labels
    let famRuleMap = {};
    famCodes.forEach((element, index) => {
        famRuleMap[element] = rulesIncluded[index]
    });
    jatos.studySessionData["famRuleMap"] = famRuleMap

    // Create a mapping from stimulus family labels to the respective category sets
    let famCatMap = {};
    famCodes.forEach((element, index) => {
        famCatMap[element] = catSets[index]
    });
    jatos.studySessionData["famCatMap"] = famCatMap

    jatos.studySessionData["taskStack"] = [...jatos.studyJsonInput.taskStack]
    jatos.studySessionData["totalTrialsComplete"] = 0
}

function initNextStage() {
    jatos.studySessionData["currentStage"] = jatos.studySessionData.taskStack.shift()
    jatos.studySessionData.currentStage["trialsComplete"] = 0
    jatos.studySessionData.currentStage["trialsPerFam"] = {}
    jatos.studyJsonInput.famsIncluded.forEach((element) => {
        jatos.studySessionData.currentStage.trialsPerFam[element] = 0
    })
    
    if (jatos.studySessionData.currentStage.epochs) {
        jatos.studySessionData.currentStage.epochs = genEpochs(jatos.studyJsonInput.famsIncluded)
    }

    const sp = jatos.studySessionData.currentStage.scheduleParams; // sp = schedule parameters
    if (sp !== null) {
        jatos.studySessionData["schedule"] = initSchedule(
            blockSize = sp.blockSize,
            maxTrials = jatos.studySessionData.currentStage.maxTrials,
            actsOrder = sp.actsOrder,
            shuffleOrder = sp.shuffleOrder
        )
    } else {
        jatos.studySessionData["schedule"] = null
    }
}

// Redirect to the choice component if no schedule is set for the current stage or \
// redirect to the guess component if forced schedule exists
function initTrial() {
    if (jatos.studySessionData.schedule !== null) {
        jatos.studySessionData["choice"] = jatos.studySessionData.schedule.shift() // forced choice from schedule
        if (jatos.studySessionData.currentStage.scheduleParams.choiceAnimation) {
            jatos.startComponentByPos(getComponentPos("choice_forced"))
        } else {
            jatos.startComponentByPos(getComponentPos(jatos.studySessionData.currentStage.component))
        }
    } else {
        jatos.startComponentByPos(getComponentPos("choice_free"))
    }
}