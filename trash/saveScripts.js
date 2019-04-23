function getAnyCornerPoints(startPoint, endPoint, pageWidth, pageHeight) {
    var data
    var bookWidth = bookWidth

    if (startPoint.x > pageWidth) {
        if (endPoint.y > startPoint.y) {
            /* Перевод с правой на левую сторону страницы */
            startPoint.x = 960
            startPoint.y = startPoint.y

            endPoint.x = bookWidth - endPoint.x
            endPoint.y = endPoint.y

            data = getLeftTopCornerPoints(startPoint, endPoint, pageWidth, pageHeight)

            data.topBandPoint.x = bookWidth - data.topBandPoint.x
            data.topBandPoint.y = data.topBandPoint.y

            data.bottomBandPoint.x = bookWidth - data.bottomBandPoint.x
            data.bottomBandPoint.y = data.bottomBandPoint.y

            data.pagingVector.x = bookWidth - data.pagingVector.x
            data.pagingVector.y = data.pagingVector.y

            startPoint.x = 960
            startPoint.y = startPoint.y

            endPoint.x = bookWidth - endPoint.x
            endPoint.y = endPoint.y
        } else {
            /* Перевод с правой на левую сторону страницы */
            // startPoint.x = 0
            startPoint.y = startPoint.y

            endPoint.x = bookWidth - endPoint.x
            endPoint.y = endPoint.y
            /* Зеркальная интерпретация вектора для низа */
            // startPoint.x = 0
            startPoint.y = pageHeight - startPoint.y

            endPoint.x = endPoint.x
            endPoint.y = pageHeight - endPoint.y

            data = getLeftTopCornerPoints(startPoint, endPoint, pageWidth, pageHeight)

            data.topBandPoint.x = bookWidth - data.topBandPoint.x
            data.topBandPoint.y = pageHeight

            data.bottomBandPoint.x = bookWidth - data.bottomBandPoint.x
            data.bottomBandPoint.y = pageHeight - data.bottomBandPoint.y

            data.pagingVector.x = bookWidth - data.pagingVector.x
            data.pagingVector.y = pageHeight - data.pagingVector.y

            // startPoint.x = 0
            startPoint.y = pageHeight - startPoint.y

            endPoint.x = endPoint.x
            endPoint.y = pageHeight - endPoint.y
        }
        if (startPoint.y == endPoint.y) {
            data = getLeftTopCornerPoints(startPoint, endPoint, pageWidth, pageHeight)

            data.topBandPoint.x = (bookWidth - endPoint.x) + endPoint.x * 0.5
            data.topBandPoint.y = 0

            data.bottomBandPoint.x = (bookWidth - endPoint.x) + endPoint.x * 0.5
            data.bottomBandPoint.y = pageHeight

            data.pagingVector.x = bookWidth - endPoint.x
            data.pagingVector.y = 0
        }
    } else {
        if (endPoint.y > startPoint.y) {
            data = getLeftTopCornerPoints(startPoint, endPoint, pageWidth, pageHeight)
        } else {
            startPoint.x = 0
            startPoint.y = pageHeight - startPoint.y

            endPoint.x = endPoint.x
            endPoint.y = pageHeight - endPoint.y

            data = getLeftTopCornerPoints(startPoint, endPoint, pageWidth, pageHeight)

            data.topBandPoint.x = data.topBandPoint.x
            data.topBandPoint.y = pageHeight

            data.bottomBandPoint.x = data.bottomBandPoint.x
            data.bottomBandPoint.y = pageHeight - data.bottomBandPoint.y

            data.pagingVector.x = data.pagingVector.x
            data.pagingVector.y = pageHeight - data.pagingVector.y

            startPoint.x = 0
            startPoint.y = pageHeight - startPoint.y

            endPoint.x = endPoint.x
            endPoint.y = pageHeight - endPoint.y
        }
        if (startPoint.y == endPoint.y) {
            data = getLeftTopCornerPoints(startPoint, endPoint, pageWidth, pageHeight)

            data.topBandPoint.x = endPoint.x * 0.5
            data.topBandPoint.y = 0

            data.bottomBandPoint.x = endPoint.x * 0.5
            data.bottomBandPoint.y = pageHeight

            data.pagingVector.x = endPoint.x
            data.pagingVector.y = 0
        }
    }
    return data
}


function getLeftTopCornerPoints(startPoint, endPoint, pageWidth, pageHeight) {

    var offsetPagingVector = {
        x: endPoint.x,
        y: endPoint.y - startPoint.y
    }

    offsetPagingVector.length = calcVectorLength(offsetPagingVector)

    var A = {
        a: offsetPagingVector.y,
        b: offsetPagingVector.length
    }
    A.beta = Math.acos(A.a / A.b)

    var B = {
        a: startPoint.y,
        beta: A.beta
    }

    B.b = Math.cos(B.beta) * B.a

    var C = {
        a: B.b,
        beta: Math.PI * 0.5 - B.beta
    }
    C.b = C.a * Math.cos(C.beta)


    var D = {
        b: B.b,
        beta: B.beta
    }
    D.a = D.b * Math.cos(D.beta)

    /* Найдем координаты части вектора pagingVector  */

    B.x = C.b //rename
    B.y = D.a //
    /* ---- */

    var pagingVector = {
        x: 2 * B.x + offsetPagingVector.x, // rename
        y: 2 * B.y + offsetPagingVector.y, //rename
        length: offsetPagingVector.length + 2 * B.b
    }

    var boundingVector = {
        x: pagingVector.x - pageWidth,
        y: pagingVector.y
    }

    boundingVector.length = calcVectorLength(boundingVector)
    pagingVector.beta = Math.acos(pagingVector.y / pagingVector.length)

    if (boundingVector.length > pageWidth) {

        var ratio = (pageWidth / boundingVector.length)

        boundingVector.x = boundingVector.x * ratio
        boundingVector.y = boundingVector.y * ratio

        pagingVector.x = boundingVector.x + pageWidth
        pagingVector.y = boundingVector.y
        pagingVector.beta = Math.acos(pagingVector.y / pagingVector.length)

        pagingVector.length = calcVectorLength(pagingVector)
    }

    var E = {
        a: pagingVector.y,
        b: pagingVector.length,
        c: pagingVector.x
    }

    E.beta = Math.acos(E.a / E.b)

    var G = {
        b: 0.5 * pagingVector.length,
        beta: E.beta
    }

    G.a = G.b / Math.cos(G.beta)

    var F = {
        a: 0.5 * pagingVector.length,
        beta: Math.PI * 0.5 - G.beta
    }

    F.b = F.a / Math.cos(F.beta)

    var bottomBandPoint = {
        x: 0,
        y: G.a
    }

    var topBandPoint = {
        x: F.b,
        y: 0
    }

    if (bottomBandPoint.y > pageHeight) {
        var H = {
            a: bottomBandPoint.y - pageHeight,
            alpha: Math.PI * 0.5 - pagingVector.beta
        }
        H.b = H.a * Math.tan(H.alpha)

        bottomBandPoint.x = H.b
        bottomBandPoint.y = pageHeight
    }

    return {
        topBandPoint,
        bottomBandPoint,
        pagingVector
    }
}

function calcVectorLength(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
}



/* upd 22.01*/


var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var fingerOffset = {x: 0, y: 100}
// const A = new Image(480, 720)
// img.src = './src/img.jpg'
//
// const B = new Image(480, 720)
// img.src = './src/img.jpg'
//
// const C = new Image(480, 720)
// img.src = './src/img.jpg'
//
// const D = new Image(480, 720)
// img.src = './src/img.jpg'


//drawPaging(ctx, x, y, fingerOffset.x, fingerOffset.y, event.clientX, event.clientY, A, B, C, D, 480, 720)


canvas.addEventListener('mousemove', function(event) {
    var data = getAnyCornerPoints(fingerOffset.x, fingerOffset.y, event.clientX, event.clientY, 320, 480)
    paint(fingerOffset, {x: event.clientX, y: event.clientY}, data)
})
canvas.addEventListener('click', function(event) {
    fingerOffset = {x: 0, y: event.clientY}
    if (event.clientX > 320) {
        fingerOffset = {x: 640, y: event.clientY}
    }
    var data = getAnyCornerPoints(fingerOffset.x, fingerOffset.y, event.clientX, event.clientY, 320, 480)
    paint(fingerOffset, {x: event.clientX, y: event.clientY}, data)
})

function paint(startPoint, endPoint, {topBandPoint_x, topBandPoint_y, bottomBandPoint_x, bottomBandPoint_y, pagingVector_x, pagingVector_y, corner, angle}) {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    //ctx.drawImage(img, pagingVector_x, pagingVector_y)
    var path = new Path2D()
    switch (corner) {
        case LT:
            path.moveTo(topBandPoint_x, topBandPoint_y)
            path.lineTo(canvas.width, 0)
            path.lineTo(canvas.width, canvas.height)
            if (bottomBandPoint_y < canvas.height) {
                path.lineTo(0, canvas.height)
            }
            path.lineTo(bottomBandPoint_x, bottomBandPoint_y)
            path.closePath()
            break
        case LB:
            path.moveTo(topBandPoint_x, topBandPoint_y)
            if (topBandPoint_y > 0) {
                path.lineTo(0, 0)
            }
            path.lineTo(canvas.width, 0)
            path.lineTo(canvas.width, canvas.height)
            path.lineTo(bottomBandPoint_x, bottomBandPoint_y)
            path.closePath()
            break
        case RT:
            path.moveTo(0, 0)
            path.lineTo(topBandPoint_x, topBandPoint_y)
            path.lineTo(bottomBandPoint_x, bottomBandPoint_y)
            if (bottomBandPoint_x === canvas.width) {
                path.lineTo(canvas.width, canvas.height)
            }
            path.lineTo(0, canvas.height)
            path.closePath()
            break
        case RB:
            path.moveTo(0, 0)
            if (topBandPoint_x === canvas.width) {
                path.lineTo(canvas.width, 0)
            }
            path.lineTo(topBandPoint_x, topBandPoint_y)
            path.lineTo(bottomBandPoint_x, bottomBandPoint_y)
            path.lineTo(0, canvas.height)
            path.closePath()
            break
    }

    ctx.clip(path)

    ctx.translate(pagingVector_x, pagingVector_y)
    ctx.rotate(angle)
    switch (corner) {
        case LT:
            ctx.drawImage(img, -canvas.width * 0.5, 0)
            break
        case LB:
            ctx.drawImage(img, -canvas.width * 0.5, -canvas.height)
            break
        case RT:
            ctx.drawImage(img, 0, 0)
            break
        case RB:
            ctx.drawImage(img, 0, -canvas.height)
            break
    }
    //ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.restore()


    ctx.beginPath()
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(endPoint.x, endPoint.y)
    ctx.strokeStyle = '#ff0000';
    ctx.setLineDash([0, 0])
    ctx.stroke()
    ctx.closePath()
    //
    // ctx.beginPath()
    // ctx.moveTo(0, 0)
    // ctx.lineTo(pagingVector.x, pagingVector.y)
    // ctx.strokeStyle = '#1E90FF';
    // ctx.setLineDash([0, 0])
    // ctx.stroke()
    // ctx.closePath()

    // ctx.beginPath()
    // ctx.moveTo(canvas.width, 0)
    // ctx.lineTo(boundingVector.x + 480, boundingVector.y)
    // ctx.strokeStyle = '#008000';
    // ctx.setLineDash([0, 0])
    // ctx.stroke()
    // ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(bottomBandPoint_x, bottomBandPoint_y)
    //ctx.lineTo(pagingVector.x, pagingVector.y)//Линия от нижней точки до центральной
    //ctx.lineTo(topBandPoint_x, topBandPoint.y)//Линия от центральной точки до  верхней
    //ctx.lineTo(bottomBandPoint.x, bottomBandPoint.y)//Линия от верхней точки до нижней
    ctx.arc(pagingVector_x, pagingVector_y, 4, 0, 2 * Math.PI, false)
    ctx.arc(topBandPoint_x, topBandPoint_y, 4, 0, 2 * Math.PI, false)
    ctx.arc(bottomBandPoint_x, bottomBandPoint_y, 4, 0, 2 * Math.PI, false)
    ctx.setLineDash([3, 3])
    ctx.strokeStyle = '#333'
    ctx.stroke()
    ctx.closePath()
// console.log('bottom:')
// console.log(bottomBandPoint_x, bottomBandPoint_y)
// console.log('top')
// console.log(topBandPoint_x, topBandPoint_y)
//
// function drawT(T, color, x, y) {
//     ctx.beginPath()
//     ctx.strokeStyle = color
//     ctx.translate(x, y)
//     ctx.moveTo(0, 0)
//     ctx.lineTo(0, -T.a)
//     ctx.translate(0, -T.a)
//     ctx.rotate(Math.PI - T.beta)
//     ctx.lineTo(0, -T.b)
//     ctx.translate(0, -T.b)
//     ctx.rotate(Math.PI - T.gamma)
//     ctx.lineTo(0, -T.c)
//     ctx.stroke()
//     ctx.setTransform(1, 0, 0, 1, 0, 0)
//     ctx.closePath()
// }
    //drawT(A, '#00FF00', startPoint_x, endPoint.y)
    //drawT(B, '#00BFE0', bottomBandPoint.x, bottomBandPoint.y)
    //drawT(C, '#4510A0', bottomBandPoint.x, bottomBandPoint.y)
}


/*OPTIMAZE CODE*/
// endPoint_y = endPoint_y - startPoint_y
// var offsetPagingVector_length_or_G_cosBeta = Math.sqrt(endPoint_x * endPoint_x + endPoint_y * endPoint_y)
//
// var boundingVector_x_or_B_cosBeta_or_G_minusBeta = endPoint_y / offsetPagingVector_length_or_G_cosBeta
// var bottomBandPoint_x_or_B_b_x2 = boundingVector_x_or_B_cosBeta_or_G_minusBeta * startPoint_y * 2
//
// /* Координаты части вектора pagingVector */
//
// var pagingVector_x = bottomBandPoint_x_or_B_b_x2 * Math.cos(Math.PI * 0.5 - Math.acos(boundingVector_x_or_B_cosBeta_or_G_minusBeta)) + endPoint_x
// var pagingVector_y = bottomBandPoint_x_or_B_b_x2 * boundingVector_x_or_B_cosBeta_or_G_minusBeta + endPoint_y
//
// boundingVector_x_or_B_cosBeta_or_G_minusBeta = pagingVector_x - pageWidth
// startPoint_y = Math.sqrt(boundingVector_x_or_B_cosBeta_or_G_minusBeta * boundingVector_x_or_B_cosBeta_or_G_minusBeta + pagingVector_y * pagingVector_y)
//
// if (startPoint_y > pageWidth) {
//
//     boundingVector_x_or_B_cosBeta_or_G_minusBeta = boundingVector_x_or_B_cosBeta_or_G_minusBeta * (pageWidth / startPoint_y)
//
//     pagingVector_x = boundingVector_x_or_B_cosBeta_or_G_minusBeta + pageWidth
//     pagingVector_y = pagingVector_y * (pageWidth / startPoint_y)
//
//     endPoint_y = Math.sqrt(pagingVector_x * pagingVector_x + pagingVector_y * pagingVector_y)
// } else {
//     endPoint_y = offsetPagingVector_length_or_G_cosBeta + bottomBandPoint_x_or_B_b_x2
// }
//
// offsetPagingVector_length_or_G_cosBeta = pagingVector_y / endPoint_y
// boundingVector_x_or_B_cosBeta_or_G_minusBeta = Math.PI * 0.5 - Math.acos(offsetPagingVector_length_or_G_cosBeta)
//
// bottomBandPoint_x_or_B_b_x2 = 0
// startPoint_y = 0.5 * endPoint_y / offsetPagingVector_length_or_G_cosBeta
//
// if (startPoint_y > pageHeight) {
//     bottomBandPoint_x_or_B_b_x2 = (startPoint_y - pageHeight) * Math.tan(boundingVector_x_or_B_cosBeta_or_G_minusBeta)
//     startPoint_y = pageHeight
// }
//
// topBandPoint_x = 0.5 * endPoint_y / Math.cos(boundingVector_x_or_B_cosBeta_or_G_minusBeta)
// topBandPoint_y = 0
// bottomBandPoint_x = bottomBandPoint_x_or_B_b_x2
// bottomBandPoint_y = startPoint_y


/*  -upd 27.01- */
// function paint(startPoint, endPoint, {topBandPoint_x, topBandPoint_y, bottomBandPoint_x, bottomBandPoint_y, pagingVector_x, pagingVector_y, corner, angle}) {
//
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.save()
//     ctx.translate(pageTranslateX, pageTranslateY)
//     //ctx.drawImage(img, pagingVector_x, pagingVector_y)
//     var path = new Path2D()
//     switch (corner) {
//         case LT:
//             path.moveTo(topBandPoint_x, topBandPoint_y)
//
//             path.lineTo(canvas.width, 0)
//             path.lineTo(canvas.width, canvas.height)
//             if (bottomBandPoint_y < canvas.height) {
//                 path.lineTo(0, canvas.height)
//             }
//             path.lineTo(bottomBandPoint_x, bottomBandPoint_y)
//             path.closePath()
//             break
//         case LB:
//             path.moveTo(topBandPoint_x, topBandPoint_y)
//             if (topBandPoint_y > 0) {
//                 path.lineTo(0, 0)
//             }
//             path.lineTo(canvas.width, 0)
//             path.lineTo(canvas.width, canvas.height)
//             path.lineTo(bottomBandPoint_x, bottomBandPoint_y)
//             path.closePath()
//             break
//         case RT:
//             path.moveTo(0, 0)
//             path.lineTo(topBandPoint_x, topBandPoint_y)
//             path.lineTo(bottomBandPoint_x, bottomBandPoint_y)
//             if (bottomBandPoint_x === bookWidth) {
//                 path.lineTo(bookWidth, bookHeight)
//             }
//             path.lineTo(0, bookHeight)
//             path.closePath()
//             break
//         case RB:
//             path.moveTo(0, 0)
//             if (topBandPoint_x === bookWidth) {
//                 path.lineTo(bookWidth, 0)
//             }
//             path.lineTo(topBandPoint_x, topBandPoint_y)
//             path.lineTo(bottomBandPoint_x, bottomBandPoint_y)
//             path.lineTo(0, bookHeight)
//             path.closePath()
//             break
//     }
//
//     ctx.clip(path)
//
//     ctx.translate(pagingVector_x, pagingVector_y)
//
//     ctx.rotate(angle)
//     switch (corner) {
//         case LT:
//             ctx.drawImage(img, -bookWidth * 0.5, 0)
//             break
//         case LB:
//             ctx.drawImage(img, -bookWidth * 0.5, -bookHeight)
//             break
//         case RT:
//             ctx.drawImage(img, 0, 0)
//             break
//         case RB:
//             ctx.drawImage(img, 0, -bookHeight)
//             break
//     }
//     //ctx.setTransform(1, 0, 0, 1, 0, 0)
//     ctx.restore()
//
//     ctx.save()
//     ctx.translate(pageTranslateX, pageTranslateY)
//     ctx.beginPath()
//     ctx.moveTo(startPoint.x, startPoint.y)
//     ctx.lineTo(endPoint.x, endPoint.y)
//     ctx.strokeStyle = '#ff0000';
//     ctx.setLineDash([0, 0])
//     ctx.stroke()
//     ctx.closePath()
//
//     ctx.beginPath()
//     ctx.moveTo(0, 0)
//     ctx.lineTo(pagingVector.x, pagingVector.y)
//     ctx.strokeStyle = '#1E90FF';
//     ctx.setLineDash([0, 0])
//     ctx.stroke()
//     ctx.closePath()
//
//     ctx.beginPath()
//     ctx.moveTo(bookWidth, 0)
//     ctx.lineTo(boundingVector.x + 480, boundingVector.y)
//     ctx.strokeStyle = '#008000';
//     ctx.setLineDash([0, 0])
//     ctx.stroke()
//     ctx.closePath()
//
//     ctx.beginPath()
//     ctx.moveTo(bottomBandPoint_x, bottomBandPoint_y)
//     ctx.lineTo(pagingVector.x, pagingVector.y)//Линия от нижней точки до центральной
//     ctx.lineTo(topBandPoint_x, topBandPoint.y)//Линия от центральной точки до  верхней
//     ctx.lineTo(bottomBandPoint.x, bottomBandPoint.y)//Линия от верхней точки до нижней
//     ctx.arc(pagingVector_x, pagingVector_y, 4, 0, 2 * Math.PI, false)
//     ctx.arc(topBandPoint_x, topBandPoint_y, 4, 0, 2 * Math.PI, false)
//     ctx.arc(bottomBandPoint_x, bottomBandPoint_y, 4, 0, 2 * Math.PI, false)
//     ctx.setLineDash([3, 3])
//     ctx.strokeStyle = '#333'
//     ctx.stroke()
//     ctx.closePath()
//     ctx.restore()
//
// console.log('bottom:')
// console.log(bottomBandPoint_x, bottomBandPoint_y)
// console.log('top')
// console.log(topBandPoint_x, topBandPoint_y)
//
// function drawT(T, color, x, y) {
//     ctx.beginPath()
//     ctx.strokeStyle = color
//     ctx.translate(x, y)
//     ctx.moveTo(0, 0)
//     ctx.lineTo(0, -T.a)
//     ctx.translate(0, -T.a)
//     ctx.rotate(Math.PI - T.beta)
//     ctx.lineTo(0, -T.b)
//     ctx.translate(0, -T.b)
//     ctx.rotate(Math.PI - T.gamma)
//     ctx.lineTo(0, -T.c)
//     ctx.stroke()
//     ctx.setTransform(1, 0, 0, 1, 0, 0)
//     ctx.closePath()
// }
//     drawT(A, '#00FF00', startPoint_x, endPoint.y)
//     drawT(B, '#00BFE0', bottomBandPoint.x, bottomBandPoint.y)
//     drawT(C, '#4510A0', bottomBandPoint.x, bottomBandPoint.y)
//}



/*28.01.2017 11:22*/
/*
const COUNT = 1000
const COEFFS = []

for (var i = 1; i <= COUNT; i += 1) {
    COEFFS[i - 1] = Math.pow(i / COUNT, 1)
}


function drawPaging(ctx, x, y, startPoint_x, startPoint_y, endPoint_x, endPoint_y, A, B, C, D, pageWidth, pageHeight) {
    startPoint_x -= x
    startPoint_y -= y
    endPoint_x -= x
    endPoint_y -= y

    if (startPoint_x < pageWidth) {
        startPoint_x = 0
    } else {
        startPoint_x = pageWidth << 1
    }

    if (startPoint_y < 0) {
        startPoint_y = 0
    } else if (startPoint_y > pageHeight) {
        startPoint_y = pageHeight
    }

    if (endPoint_x + x < x) {
        var path = new Path2D()
        ctx.save()
        path.moveTo(0, 0)
        path.lineTo(x, 0)
        path.lineTo(x, ctx.canvas.height)
        path.lineTo(0, ctx.canvas.height)
        path.closePath()
        ctx.clip(path)
        ctx.restore()
        endPoint_x = 0
    }

    if (endPoint_x > pageWidth << 1) {
        var path = new Path2D()
        ctx.save()
        path.moveTo(ctx.canvas.width, 0)
        path.lineTo(ctx.canvas.width - y, 0)
        path.lineTo(ctx.canvas.width - y, ctx.canvas.height)
        path.lineTo(ctx.canvas.width, ctx.canvas.height)
        path.closePath()
        ctx.clip(path)
        ctx.restore()
        endPoint_x = pageWidth + pageWidth
    }

    var {topBandPoint_x, topBandPoint_y, bottomBandPoint_x, bottomBandPoint_y, pagingVector_x, pagingVector_y, effectTopPoint_x, effectTopPoint_y, effectBottomPoint_x, effectBottomPoint_y, effectPoint_x, effectPoint_y, corner, angle, effectAngle, pagingVector_length} = getAnyCornerPoints(startPoint_x, startPoint_y, endPoint_x, endPoint_y, pageWidth, pageHeight)

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.save()
    var path = new Path2D()

    topBandPoint_x += x
    topBandPoint_y += y
    bottomBandPoint_x += x
    bottomBandPoint_y += y

    switch (corner) {
        case LT:
            path.moveTo(topBandPoint_x, topBandPoint_y)
            path.lineTo(ctx.canvas.width, y)
            path.lineTo(ctx.canvas.width, ctx.canvas.height)
            path.lineTo(bottomBandPoint_x, ctx.canvas.height)
            path.lineTo(bottomBandPoint_x, bottomBandPoint_y)
            path.closePath()
            break
        case LB:
            path.moveTo(bottomBandPoint_x, bottomBandPoint_y)
            path.lineTo(ctx.canvas.width, pageHeight + y)
            path.lineTo(ctx.canvas.width, 0)
            path.lineTo(topBandPoint_x, 0)
            path.lineTo(topBandPoint_x, topBandPoint_y)
            path.closePath()
            break

        case RT:
            path.moveTo(topBandPoint_x, topBandPoint_y)
            path.lineTo(0, y)
            path.lineTo(0, ctx.canvas.height)
            path.lineTo(bottomBandPoint_x, ctx.canvas.height)
            path.lineTo(bottomBandPoint_x, bottomBandPoint_y)
            path.closePath()
            break

        case RB:
            path.moveTo(bottomBandPoint_x, bottomBandPoint_y)
            path.lineTo(0, pageHeight + y)
            path.lineTo(0, 0)
            path.lineTo(topBandPoint_x, 0)
            path.lineTo(topBandPoint_x, topBandPoint_y)
            path.closePath()
    }

    ctx.clip(path)

    ctx.translate(x, y)

    ctx.drawImage(B, 0, 0)
    ctx.drawImage(C, pageWidth, 0)

    ctx.translate(pagingVector_x, pagingVector_y)
    ctx.rotate(angle)
    switch (corner) {
        case LT:
            ctx.drawImage(A, -pageWidth, 0)
            break
        case LB:
            ctx.drawImage(A, -pageWidth, -pageHeight)
            break
        case RT:
            ctx.drawImage(D, 0, 0)
            break
        case RB:
            ctx.drawImage(D, 0, -pageHeight)
            break
    }
    ctx.restore()

    var canvasRendering = paint(ctx.canvas, x, y, pageWidth, pageHeight, effectPoint_x, effectPoint_y, effectAngle, corner, pagingVector_length, A, B, C, D )

    effectBottomPoint_x += x
    effectBottomPoint_y += y
    effectTopPoint_x += x
    effectTopPoint_y += y

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.save()
    var effectPath = new Path2D()
    switch (corner) {
        case LT:
            effectPath.moveTo(effectTopPoint_x, effectTopPoint_y)
            effectPath.lineTo(effectTopPoint_x + (effectTopPoint_x - effectBottomPoint_x), effectTopPoint_y - (effectBottomPoint_y - effectTopPoint_y))
            effectPath.lineTo(ctx.canvas.width, 0)
            effectPath.lineTo(ctx.canvas.width, ctx.canvas.height)
            effectPath.lineTo(0, ctx.canvas.height)
            effectPath.lineTo(effectBottomPoint_x - (effectTopPoint_x - effectBottomPoint_x), effectBottomPoint_y + (effectBottomPoint_y - effectTopPoint_y))
            effectPath.lineTo(effectBottomPoint_x, effectBottomPoint_y)
            effectPath.closePath()

            ctx.clip(effectPath)
            ctx.translate(effectPoint_x + x, effectPoint_y + y)
            ctx.rotate(effectAngle)
            ctx.drawImage(canvasRendering, -pageWidth, -pageHeight * 1.5)
            break

        case LB:
            effectPath.moveTo(effectTopPoint_x, effectTopPoint_y)
            effectPath.lineTo(effectTopPoint_x + (effectTopPoint_x - effectBottomPoint_x), effectTopPoint_y - (effectBottomPoint_y - effectTopPoint_y))
            if (effectTopPoint_x - x == 0) {
                effectPath.lineTo(0, 0)
            }
            effectPath.lineTo(ctx.canvas.width, 0)
            effectPath.lineTo(ctx.canvas.width, ctx.canvas.height)
            effectPath.lineTo(0, ctx.canvas.height)
            effectPath.lineTo(effectBottomPoint_x - (effectTopPoint_x - effectBottomPoint_x), effectBottomPoint_y + (effectBottomPoint_y - effectTopPoint_y))
            effectPath.lineTo(effectBottomPoint_x, effectBottomPoint_y)
            effectPath.closePath()

            ctx.clip(effectPath)
            ctx.translate(effectPoint_x + x, effectPoint_y + y)
            ctx.rotate(-effectAngle)
            ctx.drawImage(canvasRendering, -pageWidth, -pageHeight * 1.5)
            break

        case RT:
            effectPath.moveTo(effectTopPoint_x, effectTopPoint_y)
            effectPath.lineTo(effectTopPoint_x + (effectTopPoint_x - effectBottomPoint_x), effectTopPoint_y - (effectBottomPoint_y - effectTopPoint_y))
            effectPath.lineTo(0, 0)
            effectPath.lineTo(0, ctx.canvas.height)
            effectPath.lineTo(ctx.canvas.width, ctx.canvas.height)
            effectPath.lineTo(effectBottomPoint_x - (effectTopPoint_x - effectBottomPoint_x), effectBottomPoint_x + (effectBottomPoint_y - effectTopPoint_y))
            effectPath.lineTo(effectBottomPoint_x, effectBottomPoint_y)
            effectPath.closePath()

            ctx.clip(effectPath)
            ctx.translate(effectPoint_x + x, effectPoint_y + y)
            ctx.rotate(-effectAngle)
            ctx.drawImage(canvasRendering, -pageWidth * 2.5, -pageHeight * 1.5)
            break

        case RB:
            effectPath.moveTo(effectTopPoint_x, effectTopPoint_y)
            effectPath.lineTo(effectTopPoint_x + (effectTopPoint_x - effectBottomPoint_x), effectTopPoint_y - (effectBottomPoint_y - effectTopPoint_y))
            if (effectTopPoint_x - x == bookWidth) {
                effectPath.lineTo(ctx.canvas.width, 0)
            }
            effectPath.lineTo(0, 0)
            effectPath.lineTo(0, ctx.canvas.height)
            effectPath.lineTo(ctx.canvas.width, ctx.canvas.height)
            effectPath.lineTo(effectBottomPoint_x - (effectTopPoint_x - effectBottomPoint_x), effectBottomPoint_y + (effectBottomPoint_y - effectTopPoint_y))
            effectPath.lineTo(effectBottomPoint_x, effectBottomPoint_y)
            effectPath.closePath()

            ctx.clip(effectPath)
            ctx.translate(effectPoint_x + x, effectPoint_y + y)
            ctx.rotate(effectAngle)
            ctx.drawImage(canvasRendering, -pageWidth * 2.5, -pageHeight * 1.5)
            break
    }

    ctx.restore()


    ctx.save()
    ctx.translate(x + effectPoint_x, y + effectPoint_y)
    const vectorPeace = (pagingVector_length * 0.5) / COUNT
    var effectOffset = 0

    switch (corner) {
        case LT:
            ctx.rotate(effectAngle)
            ctx.translate(0, -pageHeight * 1.5)

            for (var i = 0; i < COUNT; i+=1) {
                effectOffset += vectorPeace * COEFFS[COUNT - i - 1]
                ctx.drawImage(
                    canvasRendering,
                    pageWidth - vectorPeace * (i + 1),
                    0,
                    vectorPeace,
                    pageHeight * 3,
                    -effectOffset,
                    0,
                    vectorPeace * COEFFS[COUNT - i - 1],
                    pageHeight * 3
                 )
            }
            break
        case LB:
            ctx.rotate(Math.PI * 2 - effectAngle)
            ctx.translate(0, -pageHeight * 1.5)

            for (var i = 0; i < COUNT; i+=1) {
                effectOffset += vectorPeace * COEFFS[COUNT - i - 1]
                ctx.drawImage(
                    canvasRendering,
                    pageWidth - vectorPeace * (i + 1),
                    0,
                    vectorPeace,
                    pageHeight * 3,
                    -effectOffset,
                    0,
                    vectorPeace * COEFFS[COUNT - i - 1],
                    pageHeight * 3
                 )
            }
            break
        case RT:
            ctx.rotate(-effectAngle)
            ctx.translate(0, -pageHeight * 1.5)

            for (var i = 0; i < COUNT; i+=1) {
                effectOffset += vectorPeace * COEFFS[COUNT - i - 1]
                ctx.drawImage(
                    canvasRendering,
                    pageWidth * 2.5 + vectorPeace * (i + 1),
                    0,
                    vectorPeace,
                    pageHeight * 3,
                    effectOffset,
                    0,
                    vectorPeace * COEFFS[COUNT - i - 1],
                    pageHeight * 3
                 )
            }
            break
        case RB:
            ctx.rotate(effectAngle)
            ctx.translate(0, -pageHeight * 1.5)

            for (var i = 0; i < COUNT; i+=1) {
                effectOffset += vectorPeace * COEFFS[COUNT - i - 1]
                ctx.drawImage(
                    canvasRendering,
                    pageWidth * 2.5 + vectorPeace * (i + 1),
                    0,
                    vectorPeace,
                    pageHeight * 3,
                    effectOffset,
                    0,
                    vectorPeace * COEFFS[COUNT - i - 1],
                    pageHeight * 3
                 )
            }
            break
    }
    ctx.restore()


    ctx.save()
    ctx.translate(x, y)
    ctx.beginPath()
    ctx.moveTo(bottomBandPoint_x - y, bottomBandPoint_y - y)
    ctx.arc(pagingVector_x, pagingVector_y, 4, 0, 2 * Math.PI, false)
    ctx.arc(topBandPoint_x - x, topBandPoint_y - y, 4, 0, 2 * Math.PI, false)
    ctx.arc(bottomBandPoint_x - x, bottomBandPoint_y - y, 4, 0, 2 * Math.PI, false)
    ctx.setLineDash([3, 3])
    ctx.strokeStyle = '#333'
    ctx.stroke()
    ctx.closePath()
    ctx.restore()

    ctx.save()
    ctx.translate(x, y)
    ctx.beginPath()
    ctx.font = '10px Georgia'
    //ctx.fillText('angle: ' + effectAngle, effectTopPoint_x - x, effectTopPoint_y - y - 30)
    ctx.arc(effectTopPoint_x - x, effectTopPoint_y - y, 4, 0, 2 * Math.PI, false)
    ctx.strokeStyle = '#ff0000'
    ctx.stroke()
    ctx.closePath()
    ctx.restore()

    ctx.save()
    ctx.translate(x, y)
    ctx.beginPath()
    ctx.arc(effectBottomPoint_x - x, effectBottomPoint_y - y, 4, 0, 2 * Math.PI, false)
    ctx.strokeStyle = '#ff0001'
    ctx.stroke()
    ctx.closePath()
    ctx.restore()

    ctx.save()
    ctx.translate(x, y)
    ctx.beginPath()
    ctx.arc(effectPoint_x, effectPoint_y, 4, 0, 2 * Math.PI, false)
    ctx.strokeStyle = '#ff0001'
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    //
    // var secondCanvas = document.getElementById('secondCanvas')
    // var secCtx = secondCanvas.getContext('2d')
    //
    // secCtx.save()
    // secCtx.translate(x, y)
    // secCtx.clearRect(0, 0, secCtx.canvas.width, secCtx.canvas.height)
    // secCtx.drawImage(D, 0, 0)
    // secCtx.drawImage(A, pageWidth, 0)
    // secCtx.restore()
}


var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var c = document.createElement('canvas')
c.setAttribute('id', 'canvas-rendering')
document.body.appendChild(c);

var canvasRendering = document.getElementById('canvas-rendering')
var canvasRenderingContex = canvasRendering.getContext('2d')

var bookWidth = 640
var bookHeight = 480
var bookX = 150
var bookY = 150
var fingerOffset = {x: 0, y: 0}

canvasRendering.width = bookWidth * 2
canvasRendering.height = bookHeight * 3

const A = new Image(320, 480)
A.src = './src/IMG_1.jpg'

const B = new Image(320, 480)
B.src = './src/IMG_2.jpg'

const C = new Image(320, 480)
C.src = './src/IMG_3.jpg'

const D = new Image(320, 480)
D.src = './src/IMG_4.jpg'

canvas.addEventListener('mousemove', function(event) {
    drawPaging(ctx, bookX, bookY, fingerOffset.x, fingerOffset.y, event.clientX, event.clientY, A, B, C, D, 320, 480)
})
canvas.addEventListener('click', function(event) {
    fingerOffset = {x: event.clientX, y: event.clientY}
    drawPaging(ctx, bookX, bookY, fingerOffset.x, fingerOffset.y, event.clientX, event.clientY, A, B, C, D, 320, 480)
})

function paint(canvas, bookOffsetX, bookOffsetY, pageWidth, pageHeight, effectPoint_x, effectPoint_y, middlePointAngle, corner, pagingVector_length) {
    canvasRenderingContex.clearRect(0, 0, canvasRenderingContex.canvas.width, canvasRenderingContex.canvas.height)

    console.log(-effectPoint_x)
    switch (corner) {
        case LT:
            canvasRenderingContex.save()
            canvasRenderingContex.translate(pageWidth, pageHeight * 1.5)
            canvasRenderingContex.rotate(-middlePointAngle)
            canvasRenderingContex.drawImage(canvas, -effectPoint_x - bookOffsetX, -effectPoint_y - bookOffsetY)
            canvasRenderingContex.restore()
            break

        case LB:
            canvasRenderingContex.save()
            canvasRenderingContex.translate(pageWidth, pageHeight * 1.5)
            canvasRenderingContex.rotate(middlePointAngle)
            canvasRenderingContex.drawImage(canvas, -effectPoint_x - bookOffsetX, -effectPoint_y - bookOffsetY)
            canvasRenderingContex.restore()
            break

        case RB:
            canvasRenderingContex.save()
            canvasRenderingContex.translate(pageWidth * 2.5, pageHeight * 1.5)
            canvasRenderingContex.rotate(-middlePointAngle)
            canvasRenderingContex.drawImage(canvas, -effectPoint_x - bookOffsetX, -effectPoint_y - bookOffsetY)
            canvasRenderingContex.restore()
            break

        case RT:
            canvasRenderingContex.save()
            canvasRenderingContex.translate(pageWidth * 2.5, pageHeight * 1.5)
            canvasRenderingContex.rotate(middlePointAngle)
            canvasRenderingContex.drawImage(canvas, -effectPoint_x - bookOffsetX, -effectPoint_y - bookOffsetY)
            canvasRenderingContex.restore()
            break
    }

    return canvasRendering
}


*/
