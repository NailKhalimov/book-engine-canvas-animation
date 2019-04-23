var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var c = document.createElement('canvas')
c.setAttribute('id', 'canvas-rendering')
document.body.appendChild(c)

var canvasRendering = document.getElementById('canvas-rendering')
var canvasRenderingContex = canvasRendering.getContext('2d')

var pageWidth = 320
var pageHeight = 480
var bookWidth = pageWidth << 1
var bookHeight = pageHeight
var bookX = 150
var bookY = 150
var fingerOffset = {x: 1, y: 1}

canvasRendering.width = Math.sqrt(bookWidth * bookWidth + bookHeight * bookHeight)
canvasRendering.height = bookWidth + Math.sqrt(pageWidth * pageWidth + pageHeight * pageHeight)

const A = new Image(pageWidth, pageHeight)
A.src = './src/IMG_1.jpg'

const B = new Image(pageWidth, pageHeight)
B.src = './src/IMG_2.jpg'

const C = new Image(pageWidth, pageHeight)
C.src = './src/IMG_3.jpg'

const D = new Image(pageWidth, pageHeight)
D.src = './src/IMG_4.jpg'

canvas.addEventListener('mousemove', function(event) {
    if (event.clientX > bookWidth + bookX || event.clientX < bookX || event.clientY < bookY || event.clientY > bookHeight + bookY) {

    } else {
        drawPaging(ctx, canvasRenderingContex, bookX, bookY, fingerOffset.x, fingerOffset.y, event.clientX, event.clientY, A, B, C, D, pageWidth, pageHeight)
    }
})

canvas.addEventListener('click', function(event) {
    if (event.clientX > bookWidth + bookX || event.clientX < bookX || event.clientY < bookY || event.clientY > bookHeight + bookY) {

    } else {
        fingerOffset = {x: event.clientX, y: event.clientY}
        drawPaging(ctx, canvasRenderingContex, bookX, bookY, fingerOffset.x, fingerOffset.y, event.clientX, event.clientY, A, B, C, D, pageWidth, pageHeight)
    }
})

function drawRawPaging(secondContext, corner, A, B, C, D, bookWidth, bookHeight, pagingVector_x, pagingVector_y, angle, effectPoint_x, effectPoint_y, pagingVector_length, topBandPoint_x, topBandPoint_y, bottomBandPoint_x, bottomBandPoint_y, effectTopPoint_x, effectTopPoint_y, effectBottomPoint_x, effectBottomPoint_y, effectPoint_length, ratio, bottomPoint_x, bottomPoint_y) {

    var effectPath = new Path2D()
    /* Cliping */
    switch (corner) {
        case LT:
            effectPath.moveTo(topBandPoint_x, topBandPoint_y)
            effectPath.lineTo(topBandPoint_x + (topBandPoint_x - bottomBandPoint_x), topBandPoint_y - (bottomBandPoint_y - topBandPoint_y))
            effectPath.lineTo(secondContext.canvas.width, 0)
            effectPath.lineTo(secondContext.canvas.width, secondContext.canvas.height)
            effectPath.lineTo(0, secondContext.canvas.height)
            effectPath.lineTo(bottomBandPoint_x - (topBandPoint_x - bottomBandPoint_x), bottomBandPoint_y + (bottomBandPoint_y - topBandPoint_y))
            effectPath.lineTo(bottomBandPoint_x, bottomBandPoint_y)
            break
        case LB:
            effectPath.moveTo(topBandPoint_x, topBandPoint_y)
            effectPath.lineTo(topBandPoint_x + (topBandPoint_x - bottomBandPoint_x), topBandPoint_y - (bottomBandPoint_y - topBandPoint_y))

            if (topBandPoint_x == 0) {
                effectPath.lineTo(0, 0)
            }

            effectPath.lineTo(secondContext.canvas.width, 0)
            effectPath.lineTo(secondContext.canvas.width, secondContext.canvas.height)
            effectPath.lineTo(0, secondContext.canvas.height)
            effectPath.lineTo(bottomBandPoint_x - (topBandPoint_x - bottomBandPoint_x), bottomBandPoint_y + (bottomBandPoint_y - topBandPoint_y))
            effectPath.lineTo(bottomBandPoint_x, bottomBandPoint_y)

            break
        case RT:
            effectPath.moveTo(topBandPoint_x, topBandPoint_y)
            effectPath.lineTo(topBandPoint_x + (topBandPoint_x - bottomBandPoint_x), topBandPoint_y - (bottomBandPoint_y - topBandPoint_y))
            effectPath.lineTo(0, 0)
            effectPath.lineTo(0, secondContext.canvas.height)
            effectPath.lineTo(secondContext.canvas.width, secondContext.canvas.height)
            effectPath.lineTo(bottomBandPoint_x - (topBandPoint_x - bottomBandPoint_x), bottomBandPoint_y + (bottomBandPoint_y - topBandPoint_y))
            effectPath.lineTo(bottomBandPoint_x, bottomBandPoint_y)
            break
        case RB:
            effectPath.moveTo(topBandPoint_x, topBandPoint_y)
            effectPath.lineTo(topBandPoint_x + (topBandPoint_x - bottomBandPoint_x), topBandPoint_y - (bottomBandPoint_y - topBandPoint_y))

            if (topBandPoint_x == bookWidth) {
                effectPath.lineTo(secondContext.canvas.width, 0)
            }

            effectPath.lineTo(0, 0)
            effectPath.lineTo(0, secondContext.canvas.height)
            effectPath.lineTo(secondContext.canvas.width, secondContext.canvas.height)
            effectPath.lineTo(bottomBandPoint_x - (topBandPoint_x - bottomBandPoint_x), bottomBandPoint_y + (bottomBandPoint_y - topBandPoint_y))
            effectPath.lineTo(bottomBandPoint_x, bottomBandPoint_y)
            break
    }

    effectPath.closePath()

    secondContext.clip(effectPath)

    secondContext.drawImage(B, 0, 0)
    secondContext.drawImage(C, bookWidth * 0.5, 0)
    secondContext.save()
    secondContext.setTransform(1, 0, 0, 1, 0, 0)

    /* Shadows */
    switch (corner) {
        case LT:
        case LB:
            var gradient = secondContext.createLinearGradient(0, 0, pagingVector_length * 0.5, 0)
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0.45)')
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
            secondContext.globalCompositeOperation = 'source-atop'
            secondContext.fillStyle = gradient
            secondContext.fillRect(0, 0, Math.round(pagingVector_length * 0.5), secondContext.canvas.height)
            break
        case RT:
        case RB:
            var gradient = secondContext.createLinearGradient(secondContext.canvas.width - pagingVector_length * 0.5, 0, secondContext.canvas.width, 0)
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0.45)')
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
            secondContext.globalCompositeOperation = 'source-atop'
            secondContext.fillStyle = gradient
            secondContext.fillRect(secondContext.canvas.width - Math.round(pagingVector_length * 0.5), 0, secondContext.canvas.width - pagingVector_length * 0.5, secondContext.canvas.height)
            break
    }

    secondContext.restore()

    secondContext.translate(pagingVector_x, pagingVector_y)
    secondContext.rotate(angle)

    switch (corner) {
        case LT:
            secondContext.drawImage(A, -bookWidth * 0.5, 0)
            break
        case LB:
            secondContext.drawImage(A, -bookWidth * 0.5, -bookHeight)
            break
        case RT:
            secondContext.drawImage(D, 0, 0)
            break
        case RB:
            secondContext.drawImage(D, 0, -bookHeight)
            break
    }

    var glare = new Path2D()

    secondContext.save()
    secondContext.rotate(-angle)
    secondContext.translate(-pagingVector_x, -pagingVector_y)

    switch (corner) {
        case LT:
        case RT:
            if (bottomBandPoint_x == 0) {
                glare.moveTo(topBandPoint_x, topBandPoint_y)
                glare.lineTo(pagingVector_x, pagingVector_y)
                glare.lineTo(bottomBandPoint_x, bottomBandPoint_y)
                glare.closePath()
            } else {
                glare.moveTo(bottomBandPoint_x, bottomBandPoint_y)
                glare.lineTo(bottomPoint_x, bottomPoint_y)
                glare.lineTo(pagingVector_x, pagingVector_y)
                glare.lineTo(topBandPoint_x, topBandPoint_y)
                glare.closePath()
            }
            break
        case LB:
        case RB:
            if (topBandPoint_x == 0) {
                glare.moveTo(bottomBandPoint_x, bottomBandPoint_y)
                glare.lineTo(pagingVector_x, pagingVector_y)
                glare.lineTo(topBandPoint_x, topBandPoint_y)
                glare.closePath()
            } else {
                glare.moveTo(bottomBandPoint_x, bottomBandPoint_y)
                glare.lineTo(pagingVector_x, pagingVector_y)
                glare.lineTo(bottomPoint_x, bottomPoint_y)
                glare.lineTo(topBandPoint_x, topBandPoint_y)
                glare.closePath()
            }
            break
    }

    secondContext.clip(glare)

    secondContext.setTransform(1, 0, 0, 1, 0, 0)

    var secondGradient

    switch (corner) {
        case LT:
        case LB:
            secondGradient = secondContext.createLinearGradient(0, 0, pagingVector_length * 0.5, 0)

            secondGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
            secondGradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.05)')
            secondGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)')
            secondGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)')
            secondGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)')
            secondGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)')
            secondGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.5)')
            secondGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)')
            secondGradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.1)')
            secondGradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.05)')
            secondGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

            secondContext.globalCompositeOperation = 'source-atop'
            secondContext.fillStyle = secondGradient
            secondContext.fillRect(0, 0, Math.round(pagingVector_length * 0.5), secondContext.canvas.height)
            break
        case RT:
        case RB:
            secondGradient = secondContext.createLinearGradient(secondContext.canvas.width - pagingVector_length * 0.5, 0, secondContext.canvas.width, 0)

            secondGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
            secondGradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.05)')
            secondGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)')
            secondGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)')
            secondGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)')
            secondGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)')
            secondGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.5)')
            secondGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)')
            secondGradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.1)')
            secondGradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.05)')
            secondGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

            secondContext.globalCompositeOperation = 'source-atop'
            secondContext.fillStyle = secondGradient
            secondContext.fillRect(secondContext.canvas.width - Math.round(pagingVector_length * 0.5), 0, secondContext.canvas.width - pagingVector_length * 0.5, secondContext.canvas.height)
            break
    }

    secondContext.restore()
    secondContext.restore()
}
