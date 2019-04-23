function getCornerData(startPoint, endPoint, pageWidth) {

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

    B.x = C.b
    B.y = D.a
    /* ---- */

    var pagingVector = {
        x: 2 * B.x + offsetPagingVector.x,
        y: 2 * B.y + offsetPagingVector.y,
        length: offsetPagingVector.length + 2 * B.b
    }

    var boundedVector = {
        x: pagingVector.x - pageWidth,
        y: pagingVector.y
    }

    boundedVector.length = calcVectorLength(boundedVector)

    if (boundedVector.length > pageWidth) {
        var ratio = (pageWidth / boundedVector.length)
        boundedVector.x = boundedVector.x * ratio
        boundedVector.y = boundedVector.y * ratio

        pagingVector.x = boundedVector.x + pageWidth
        pagingVector.y = boundedVector.y
    }
    console.log('paging:')
    console.log(pagingVector)
    console.log('boudnded:')
    console.log(boundedVector)

    var bottomBandPoint = {
        x: 0,
        y: startPoint.y + ((0.5 * offsetPagingVector.length) / Math.cos(A.beta))
    }

    var ratio = (offsetPagingVector.length + B.b) / Math.cos(Math.PI * 0.5 - A.beta)

    var topBandPoint = {
        x: (0.5 * offsetPagingVector.length + B.b) / Math.cos(Math.PI * 0.5 - A.beta),
        y: 0
    }

    return {
        topBandPoint,
        bottomBandPoint,
        pagingVector,
        boundedVector,
        A,
        B,
        C,
        D
    }
}

function calcVectorLength(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
}
