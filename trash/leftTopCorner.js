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
