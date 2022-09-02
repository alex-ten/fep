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
        jatos.startComponentByPos(
            getComponentPos(jatos.studySessionData.currentStage.component)
        );
    }
}

function nextTrialOrStage() {
    // If `maxTrials` of the current stage is reached, either
    // (1) Initialize and start next stage, or
    // (2) End study
    if (jatos.studySessionData.stageTrialsComplete >= jatos.studySessionData.currentStage.maxTrials) {
        if (jatos.studySessionData.taskStack.length) {
            initNextStage()
            initTrial()
        } else {
            jatos.endStudy()
        }
    // Otherwise, initialize new trial
    } else {
        initTrial()
    }
}

function promiseFeedback(correct){
// Return a Promise that executes feedback presentation and resolve it only when audio stops playing
    return new Promise(resolve => {
        $("#mask").css({display: 'block'})
        let s = "correct"
        if (!correct) {s = "in" + s}
        $(`#${s}-image`).css({display: "block"}).animate({opacity: 1})
        $(`#${s}-sound`).get(0).onended = resolve
        $(`#${s}-sound`).get(0).play()
    })
}

async function binaryResponse(event) {
    incrementStageTrialCount()

    const correct = this.value == event.data.correctResponse;
    if (jatos.studySessionData.currentStage.feedback) {
        // Wait until feedback is presented and audio track stops playing
        await promiseFeedback(correct)
    }
    // Save data
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
    
    nextTrialOrStage()
}

async function confidenceResponse(event) {
    if ($(this).hasClass("disabled")) {
        alert("Please, make a guess in favor of one option, even if are not confident in either option. To make a guess, move the green slider towards the option you would like to answer with.")
        return;
    }
    incrementStageTrialCount()

    const guess = event.data.responseOrder[event.data.confidence > 0 ? 1 : 0]
    const correct = guess == event.data.correctResponse;
    if (jatos.studySessionData.currentStage.feedback) {
        // Wait until feedback is presented and audio track stops playing
        await promiseFeedback(correct)
    }
    // Save data
    let resultData = {
        "stage": jatos.studySessionData.currentStage.name,
        "feedbackOn": jatos.studySessionData.currentStage.feedback,
        "trialsComplete": jatos.studySessionData.stageTrialsComplete,
        "famInd":  event.data.famChoiceInd,
        "features": event.data.stimFeatures,
        "rule": event.data.ruleLabel,
        "responseOrder": event.data.responseOrder,
        "correctResponse": event.data.correctResponse,
        "guess": guess,
        "confidence": Math.abs($("#confidence-slider").val()),
        "correct": correct
        // reaction time  
    };
    jatos.appendResultData(resultData);

    nextTrialOrStage();
}

function readSlider(event) {
    if (this.value == 0.00) {
        $("#submit-button").removeClass("enabled")
        $("#submit-button").addClass("disabled")
        $(`#label-mid`).css({opacity: 1.0})
    } else {
        $("#submit-button").removeClass("disabled")
        $("#submit-button").addClass("enabled")

        const targ = this.value > 0.0 ? ["left", "right"] : ["right", "left"]
        const opac = .2 + Math.abs(this.value) * .8
        $(`#label-${targ[1]}`).removeClass("untargeted").css({opacity: opac})
        $(`#answer-${targ[1]}`).removeClass("untargeted").css({opacity: opac})
        $(`#label-${targ[0]}`).css({opacity: 0.2})
        $(`#answer-${targ[0]}`).css({opacity: 0.2})
        $("#label-mid").css({opacity: 1.2 - opac})
    }
}

function shiftSlider() {
    $(this).attr("id") == "answer-left" ? $("#confidence-slider").val(-1.0) : $("#confidence-slider").val(1.0)
    $("#confidence-slider").trigger('change')
}