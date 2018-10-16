var canvas = document.getElementById('sketchpad')
var context = canvas.getContext('2d')
var lineWidth = penSize.value;

autoSetCanvasSize(canvas)

listenToUser(canvas)

/* 切换画笔、橡皮擦 */
var eraserEnabled = false;
eraser.onclick = function (e) {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

/* 画笔颜色 */
black.onclick = function(bbb) {
    context.fillStyle = bbb.target.id
    context.strokeStyle = bbb.target.id
    bbb.target.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
}

red.onclick = function(bbb) {
    context.fillStyle = bbb.target.id
    context.strokeStyle = bbb.target.id
    bbb.target.classList.add('active')
    black.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
}

blue.onclick = function(bbb) {
    context.fillStyle = bbb.target.id
    context.strokeStyle = bbb.target.id
    bbb.target.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
}

yellow.onclick = function(bbb) {
    context.fillStyle = bbb.target.id
    context.strokeStyle = bbb.target.id
    bbb.target.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}

penSize.onchange = function(e) {
    console.log('size changed')
    lineWidth = e.target.value
}

clear.onclick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

download.onclick = function() {
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    a.href = url
    a.download = '我的画儿'
    a.target = '_blank'
    a.click()
    // var url = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    // window.location.href = url
}

function drawCircle(x, y) {
    context.beginPath()
    context.arc(x, y, lineWidth / 2, 0, Math.PI * 2)
    context.fill()
}

function drawLine(lastPointer, newPointer) {
    context.beginPath()
    context.moveTo(lastPointer.x, lastPointer.y)
    context.lineTo(newPointer.x, newPointer.y)
    context.lineWidth = lineWidth
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