// Credit to ThiefMaster: https://stackoverflow.com/questions/10152390/dynamically-arrange-some-elements-around-a-circle
function distributeChoices() {
    let fields = $('.option');
    let sidelength = $('#menu-square').height();
    let radius = .25 * sidelength;
    let angle = randInt(360) * (Math.PI / 180);
    let step = (2 * Math.PI) / fields.length;

    let offsets = [];

    fields.each(function () {
        let offsetX = radius * Math.cos(angle) - $(this).outerWidth()/2
        let offsetY = radius * Math.sin(angle) - $(this).outerHeight()/2
        let x = Math.round(sidelength/2 + offsetX);
        let y = Math.round(sidelength/2 + offsetY);
        $(this).css({
            left: x + 'px',
            top: y + 'px'
        })
        angle += step;
        offsets.push([offsetX, offsetY])
    });

    return offsets
}