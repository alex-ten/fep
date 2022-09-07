function runChoiceAnimations(id) {
    $(`#option${id}`).addClass('highlight')
    $(".highlight").css({
        "animation-name": "highlight-shadow, highlight-border",
        "animation-duration": "300ms, 0ms",
        "animation-delay": "700ms, 1500ms",
        "animation-iteration-count": "1, 1",
        "animation-timing-function": "linear, linear",
        "animation-fill-mode": "forwards, forwards"
    })
}

function runPointerAnimations() {
    $("#pointer").addClass('move')
    $(".move").css({
        "animation-name": "spin, move",
        "animation-duration": "500ms, 500ms",
        "animation-delay": "0ms, 500ms",
        "animation-iteration-count": "1, 1",
        "animation-timing-function": "ease-in-out, ease-in-out",
        "animation-fill-mode": "forwards, forwards"
    })
}

function defineAnimationKeyframe(id, locs, offsets) {
    const offsetsXY = offsets[locs.indexOf(id.toString())];
    const halfSide = $(".option").width()/2
    $.keyframe.define([{
        name: 'move',
        to: {
            left: `calc(50% + ${offsetsXY[0] + halfSide}px)`,
            top: `calc(50% + ${offsetsXY[1] + halfSide}px)`
        },
        from: {
            left: "50%",
            top: "50%"
        }
    }]);
}

