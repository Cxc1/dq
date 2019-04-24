(function() {
    var windowW = document.body.clientWidth

    var htmlPx = windowW / 320 * 10

    document.getElementsByTagName('html')[0].style.fontSize = htmlPx + 'px'
})()
