// Rule defenition 1d1
function init_1d1() {
    return {
        label: '1d1',
        nVarDims: 1,
        exclude: (x) => {return x[1] != 3},
    }
}

// Rule defenition 2d1
function init_2d1() {
    // return [[null, null], shuffle([false, true])]
    return {
        label: '2d1',
        nVarDims: 2,
    }
}

// Rule defenition 2d2
function init_2d2() {
    return {
        label: '2d2',
        nVarDims: 2,
    }
}

// Rule defenition 2d0
function init_2d0() {
    return {
        label: '2d0',
        nVarDims: 2
    }
}

// Rule defenition feature integration (fi)
function init_fi() {
    return {
        label: 'fi',
        nVarDims: 2,
        exclude: (x) => {return x[0]+x[1] == 7},
    }
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

    // // Create a list of codes for category labels (just numbers from 0 to 17)
    // let catCodes = [...Array(18).keys()];

    // // Randomly sample unique and nonoverlapping category sets for each stimulus family
    // shuffle(catCodes)
    // let k = 2;
    // let catSets = [];
    // for (let i = 0; i < k *famCodes.length; i += k) {
    //     catSets.push([catCodes[i], catCodes[i+1]])
    // };

    // Create instructions for activity rules
    const actRules = {
        '1d1'  : init_1d1(),
        '2d1'  : init_2d1(),
        '2d2'  : init_2d2(),
        '2d0'  : init_2d0(),
        'fi'   : init_fi()
    };

    // For rules included in JATOS study JSON input, create a rule definitions and add them to a list
    // Each rule definition is a list of elements with the following structure: [dimension_variability, dimension_relevance, rule_label]
    // Note that rule_label is added by concat below
    let rulesIncluded = [];
    jatos.studyJsonInput.rulesIncluded.forEach((element) => {
        rulesIncluded.push(actRules[element])
    })

    // Shuffle rules to randomize their assignment to families
    // Note: this only works for a single session right now 
    // (if the participant comes back on a different session, the assignment will be randomized anew)
    shuffle(rulesIncluded)

    // Create a mapping from stimulus family labels to activity labels
    let famRuleMap = {};
    famCodes.forEach((element, index) => {
        famRuleMap[element] = rulesIncluded[index]
    });
    jatos.studySessionData["famRuleMap"] = famRuleMap
   
    // // Create a mapping from stimulus family labels to the respective category sets
    // let famCatMap = {};
    // famCodes.forEach((element, index) => {
    //     famCatMap[element] = catSets[index]
    // });
    // jatos.studySessionData["famCatMap"] = famCatMap
    jatos.studySessionData["famCatMap"] = {
        1: [0, 2],
        2: [1, 4],
        3: [3, 5],
        4: [6, 7],
    }


    jatos.studySessionData["taskStack"] = [...jatos.studyJsonInput.taskStack]
    jatos.studySessionData["totalTrialsComplete"] = 0
}

function initNextStage() {
    const stage = jatos.studySessionData.taskStack.shift()
    jatos.studySessionData["popChoice"] = true
    jatos.studySessionData["currentStage"] = stage
    jatos.studySessionData.currentStage["trialsComplete"] = 0
    jatos.studySessionData.currentStage["trialsPerFam"] = {}
    jatos.studyJsonInput.famsIncluded.forEach((element) => {
        jatos.studySessionData.currentStage.trialsPerFam[element] = 0
    })

    const sp = jatos.studySessionData.currentStage.scheduleParams; // sp = schedule parameters
    if (sp !== null) {
        jatos.studySessionData.currentStage["schedule"] = initSchedule(
            blockSize = sp.blockSize,
            maxTrials = jatos.studySessionData.currentStage.maxTrials,
            actsOrder = sp.actsOrder,
            shuffleOrder = sp.shuffleOrder
        )
    } else {
        jatos.studySessionData.currentStage["schedule"] = null
    }

    if (jatos.studySessionData.currentStage.epochs) {
        jatos.studySessionData.currentStage.epochs = genEpochs(jatos.studySessionData.famRuleMap, blockSize)
    }

    return stage;
}

function initTrial() { //intro = false
    // If schedule has been initialized for current stage
    if (jatos.studySessionData.currentStage.schedule !== null) {
        // `shift` only if response was submitted
        if (jatos.studySessionData.popChoice) {
            jatos.studySessionData["choice"] = jatos.studySessionData.currentStage.schedule.shift() // pop the first forced choice from schedule
            jatos.studySessionData.popChoice = false
        }
        // If animation setting for the schedule is on
        if (jatos.studySessionData.currentStage.scheduleParams.choiceAnimation) {
            jatos.startComponentByPos(getComponentPos("choice_forced"))  // redirect to choice_forced component (plays animation automatically)
        } else {
            jatos.startComponentByPos(getComponentPos(jatos.studySessionData.currentStage.component)) // otherwise, redirect to the guessing component
        }
    // If schedule has not been initialized (== null)
    } else {
        jatos.startComponentByPos(getComponentPos("choice_free")) // redirect to choice_free component
    }
}