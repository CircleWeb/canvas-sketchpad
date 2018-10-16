var canvas = document.getElementById('sketchpad')
var context = canvas.getContext('2d')

autoSetCanvasSize(canvas)

listenToUser(canvas)

/* 切换画笔、橡皮擦 */
var eraserEnabled = false;
eraser.onclick = function (e) {
    eraserEnabled = true
    toolDiv.className = 'action x'
}

brush.onclick = function () {
    eraserEnabled = false
    toolDiv.className = 'action'
}

function drawCircle(x, y) {
    context.beginPath()
    context.arc(x, y, 3, 0, Math.PI * 2)
    context.fill()
}

function drawLine(lastPointer, newPointer) {
    context.beginPath()
    context.moveTo(lastPointer.x, lastPointer.y)
    context.lineTo(newPointer.x, newPointer.y)
    context.lineWidth = 6
    context.stroke()
    context.closePath()
}

function autoSetCanvasSize(canvas) {

    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pWidth = document.documentElement.clientWidth;
        var pHeight = document.documentElement.clientHeight;
        canvas.width = pWidth
        canvas.height = pHeight

        pWidth = document.documentElement.clientWidth;
        pHeight = document.documentElement.clientHeight;
        canvas.width = pWidth
        canvas.height = pHeight
    }
}

function listenToUser(canvas) {
    var painting = false;
    var lastPointer = {
        'x': undefined,
        'y': undefined
    }

    // 特性检测：是否支持触摸
    if ('ontouchstart' in document.body) {
        canvas.ontouchstart = function (a) {
            painting = true;
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            lastPointer = {
                x: x,
                y: y
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y)
            }
        }

        canvas.ontouchmove = function (a) {
            if (painting) {
                var x = a.touches[0].clientX;
                var y = a.touches[0].clientY;
                var newPointer = {
                    x: x,
                    y: y
                }

                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    drawCircle(x, y)
                    drawLine(lastPointer, newPointer)
                }

                lastPointer = newPointer
            }

        }

        canvas.ontouchend = function (a) {
            painting = false
            console.log('摸完了')
        }
    } else {

        canvas.onmousedown = function (a) {
            painting = true;
            var x = a.clientX;
            var y = a.clientY;
            lastPointer = {
                x: x,
                y: y
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y)
            }
        }

        canvas.onmousemove = function (a) {
            if (painting) {
                var x = a.clientX;
                var y = a.clientY;
                var newPointer = {
                    x: x,
                    y: y
                }

                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {

                    drawCircle(x, y)
                    drawLine(lastPointer, newPointer)

                }

                lastPointer = newPointer
            }
        }

        document.onmouseup = function () {
            painting = false
        }

    }
}