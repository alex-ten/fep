function beginTask(){
    initSession()       // Defined in initsess.js
    let initData = {
            "famRuleMap": jatos.studySessionData["famRuleMap"],
            "famCatMap": jatos.studySessionData["famCatMap"]
        };
        jatos.appendResultData(initData);
    jatos.startComponentByPos(2)
};


function execChoice() {
    // Reset siblings' class to option
    $(this).siblings().each(function(){
        $(this).removeClass("option--active")
        $(this).addClass("option")
    })
    
    // Check if user declares or commits to a choice and act accordingly
    if ($(this).hasClass("option")) {
        // Add modifier to the class of clicked element
        $(this).removeClass("option")
        $(this).addClass("option--active")
    } else if ($(this).hasClass("option--active")) {
        // Execite committed choice
        jatos.studySessionData["choice"] = this.value
        jatos.startComponentByPos(3);
    }
};

// Return a Promise that executes feedback presentation and resolve it only when audio stops playing
function promiseFeedback(correct){
    return new Promise(resolve => {
        $("#mask").css({display: 'block'})
        let s = "correct"
        if (!correct) {s = "in" + s}
        $(`#${s}-image`).css({display: "block"}).animate({opacity: 1})
        $(`#${s}-sound`).get(0).onended = resolve
        $(`#${s}-sound`).get(0).play()
    })
}

async function registerResponse(event) {
    const correct = this.value == event.data.correct
    
    // Wait until feedback is presented and audio track stops playing
    resolvedPromise = await promiseFeedback(correct)

    // Increment number of free trials complete, make a response record, and save data
    jatos.studySessionData['freeTrialsComplete'] += 1
    let resultData = {
        "trialsComplete": jatos.studySessionData['freeTrialsComplete'],
        "choice":  jatos.studySessionData['choice'],
        "guess": this.value,
        "correct": correct,
        
    };
    jatos.appendResultData(resultData);

    // If `maxTrials` is reached, end study, else circle back to choice phase
    if (jatos.studySessionData['freeTrialsComplete'] >= jatos.studyJsonInput['maxTrials']) {
        jatos.endStudy()
    } else {
        jatos.startComponentByPos(2)
    }
};
