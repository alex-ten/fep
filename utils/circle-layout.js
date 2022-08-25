// Credit to ThiefMaster: https://stackoverflow.com/questions/10152390/dynamically-arrange-some-elements-around-a-circle
function distributeChoices() {
    let fields = $('.option')
    let container = $('#menu-square')
    let sidelength = container.height()
    let radius = .25 * sidelength;
    let angle = 0
    let step = (2 * Math.PI) / fields.length

    fields.each(function() {
        let x = Math.round(sidelength/2 + radius * Math.cos(angle) - $(this).outerWidth()/2);
        let y = Math.round(sidelength/2 + radius * Math.sin(angle) - $(this).outerHeight()/2);
        if(window.console) {
            console.log($(this).text(), x, y);
        }
        $(this).css({
            left: x + 'px',
            top: y + 'px'
        });
        angle += step;
    });
}