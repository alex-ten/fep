function beginTask() {
    initSession()       // Defined in initsess.js
    let initData = {
        "famRuleMap": jatos.studySessionData.famRuleMap,
        "famCatMap": jatos.studySessionData.famCatMap
    }
    jatos.appendResultData(initData)
    if (jatos.studySessionData.taskStack.length) {
        initNextStage()
        initTrial()
    } else {
        jatos.endStudy()
    }
}

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
}

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
    jatos.studySessionData.stageTrialsComplete += 1
    $("#tcount").prop({
        innerHTML: `Trials completed: ${jatos.studySessionData.stageTrialsComplete} / ${jatos.studySessionData.currentStage.maxTrials}`,
    });

    const correct = this.value == event.data.correctResponse;

    if (jatos.studySessionData.currentStage.feedback) {
        // Wait until feedback is presented and audio track stops playing
        await promiseFeedback(correct)
    }

    // Increment number of free trials complete, make a response record, and save data
    
    let resultData = {
        "stage": jatos.studySessionData.currentStage.name,
        "feedbackOn": jatos.studySessionData.currentStage.feedback,
        "trialsComplete": jatos.studySessionData.stageTrialsComplete,
        "famInd":  event.data.famChoiceInd,
        "features": event.data.stimFeatures,
        "rule": event.data.ruleLabel,
        "responseOrder": event.data.responseOrder,
        "correctResponse": event.data.correctResponse,
        "guess": this.value,
        "correct": correct
        // reaction time  
    };
    jatos.appendResultData(resultData);

    nextTrialOrStage();
        }
    // Otherwise, initialize new trial
    } else {
        initTrial()
    }
}
