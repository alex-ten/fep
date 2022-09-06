function revealParentDiv() {
    jatos.removeOverlay()
    $(".hidden").css("display", "block")
}

function getOverlaySetting(s) {
    if ('overlay' in jatos.componentJsonInput) {
        if (s in jatos.componentJsonInput.overlay) {
            return jatos.componentJsonInput.overlay[s]
        }
    } else {
        return jatos.studyJsonInput.default.overlay[s]
    }
}

function incrementStageTrialCount() {
        jatos.studySessionData.stageTrialsComplete += 1
    $("#tcount").prop({
        innerHTML: `Trials completed: ${jatos.studySessionData.stageTrialsComplete} / ${jatos.studySessionData.currentStage.maxTrials}`,
    });
}

function addCustomAbortButton() {
    jatos.addAbortButton({
        text: "Terminate",
        confirmText: "You are about to terminate the experiment before completing it. Press OK to confirm or press Cancel to go back to the experiment.",
        tooltip: "This button terminates the experiment.",
        msg: `${jatos.workerId} dropped out early.`,
        style: ""
    })
}