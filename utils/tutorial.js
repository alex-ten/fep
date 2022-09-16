function readTutorialSlider(event) {
    if (this.value >= event.data.range[0] && this.value <= event.data.range[1]) {
        $(`#state${event.data.id}`).val("1")
        $(`#state${event.data.id}`).trigger('change')
        $(`#feedback-light${event.data.id}`).css('background-color', 'lightgreen')
    } else {
        $(`#state${event.data.id}`).val("0")
        $(`#state${event.data.id}`).trigger('change')
        $(`#feedback-light${event.data.id}`).css('background-color', 'tomato')
    }
    if ($("#state1").val()=="1" && $("#state2").val()=="1" && $("#state3").val()=="1") {
        $(".go-button").removeClass("disabled")
    } else {
        $(".go-button").addClass("disabled")
    }
    const opac = .2 + Math.abs(this.value) * .8
    if (Math.abs(this.value) != 0.0) {
        const targ = this.value > 0.0 ? ["left", "right"] : ["right", "left"]
        $(`#answer${event.data.id}-${targ[1]} > span`).removeClass("untargeted").css({opacity: opac})
        $(`#answer${event.data.id}-${targ[1]} > .bar-bg > .bar-fg`).css({width: `${opac*100}%`})
        $(`#answer${event.data.id}-${targ[0]} > .bar-bg > .bar-fg`).css({width: "0%"})
        $(`#answer${event.data.id}-${targ[0]} > span`).addClass("untargeted")
        
    } else {
        $(`#answer${event.data.id}-left .bar-bg > .bar-fg`).css({width: "0%"})
        $(`#answer${event.data.id}-right .bar-bg > .bar-fg`).css({width: "0%"})
        $(`#answer${event.data.id}-left > span`).addClass("untargeted")
        $(`#answer${event.data.id}-right > span`).addClass("untargeted")
    }
}

function shiftTutorialSlider(event) {
    $(this).attr("id") == `answer${event.data.id}-left` ? $(`#inp${event.data.id}`).val(-1.0) : $(`#inp${event.data.id}`).val(1.0)
    $(`#inp${event.data.id}`).trigger("change")
}

function playYum() {$("#correct-sound").get(0).play()}

function playYuck() {$("#incorrect-sound").get(0).play()}