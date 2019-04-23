function getLeftTopCornerPoints(startPoint_x, startPoint_y, endPoint_x, endPoint_y, pageWidth, pageHeight) {
    var offsetPagingVector_x = endPoint_x
    var offsetPagingVector_y = endPoint_y
    var offsetPagingVector_length = Math.sqrt(offsetPagingVector_x * offsetPagingVector_x + offsetPagingVector_y * offsetPagingVector_y)

    var A_a = offsetPagingVector_y
    var A_b = offsetPagingVector_length
    var A_beta = Math.acos(A_a / A_b)

    var B_a = startPoint_y
    var B_beta = A_beta
    var B_b = Math.cos(B_beta) * B_a

    var C_a = B_b
    var C_beta = Math.PI * 0.5 - B_beta
    var C_b = C_a * Math.cos(C_beta)

    var D_b = B_b
    var D_beta = B_beta
    var D_a = D_b * Math.cos(D_beta)

    var B_x = C_b
    var B_y = D_a

    var pagingVector_x =  2 * B_x + offsetPagingVector_x // rename
    var pagingVector_y =  2 * B_y + offsetPagingVector_y //rename
    var pagingVector_length =  offsetPagingVector_length + 2 * B_b

    var boundingVector_x = pagingVector_x - pageWidth
    var boundingVector_y = pagingVector_y
    var

    boundingVector_length = Math.sqrt(boundingVector_x * boundingVector_x + boundingVector_y * boundingVector_y)
    pagingVector_beta = Math.acos(pagingVector_y / pagingVector_length)

    if (boundingVector_length > pageWidth) {

        var ratio = (pageWidth / boundingVector_length)

        boundingVector_x = boundingVector_x * ratio
        boundingVector_y = boundingVector_y * ratio

        pagingVector_x = boundingVector_x + pageWidth
        pagingVector_y = boundingVector_y
        pagingVector_beta = Math.acos(pagingVector_y / pagingVector_length)

        pagingVector_length = Math.sqrt(pagingVector_x * pagingVector_x + pagingVector_y * pagingVector_y)
    }

    var E_a = pagingVector_y
    var E_b = pagingVector_length
    var E_c = pagingVector_x
    var E_beta = Math.acos(E_a / E_b)

    var G_b =  0.5 * pagingVector_length
    var G_beta = E_beta
    var G_a = G_b / Math.cos(G_beta)

    var F_a = 0.5 * pagingVector_length
    var F_beta = Math.PI * 0.5 - G_beta
    var F_b = F_a / Math.cos(F_beta)

    var bottomBandPoint_x = 0
    var bottomBandPoint_y = G_a

    var topBandPoint_x = F_b
    var topBandPoint_y = 0

    if (bottomBandPoint_y > pageHeight) {
        var H_a = bottomBandPoint_y - pageHeight,
        var H_alpha = Math.PI * 0.5 - pagingVector_beta
        var H_b = H_a * Math.tan(H_alpha)

        bottomBandPoint_x = H_b
        bottomBandPoint_y = pageHeight
    }

    return {
        topBandPoint_x,
        topBandPoint_y,
        bottomBandPoint_x,
        bottomBandPoint_y,
        pagingVector_x,
        pagingVector_y
    }
}
