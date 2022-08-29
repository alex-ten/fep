function addCustomAbortButton() {
    jatos.addAbortButton({
        text: "Terminate",
        confirmText: "You are trying to terminate the experiment prematurely. Press OK to confirm or press Cancel to go back to the experiment.",
        tooltip: "This button terminates the experiment.",
        msg: `${jatos.workerId} dropped out early.`,
        style: ""
    })
}