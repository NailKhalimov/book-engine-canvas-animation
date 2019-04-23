function getLeftTopCornerPoints(startPoint_y, endPoint_x, endPoint_y, pageWidth, pageHeight) {

    endPoint_y = endPoint_y - startPoint_y
    var offsetPagingVector_length_or_G_cosBeta = Math.sqrt(endPoint_x * endPoint_x + endPoint_y * endPoint_y)

    var boundingVector_x_or_B_cosBeta_or_G_minusBeta = endPoint_y / offsetPagingVector_length_or_G_cosBeta
    var bottomBandPoint_x_or_B_b_x2 = boundingVector_x_or_B_cosBeta_or_G_minusBeta * startPoint_y * 2

    /* Координаты части вектора pagingVector */

    var pagingVector_x = bottomBandPoint_x_or_B_b_x2 * Math.cos(Math.PI * 0.5 - Math.acos(boundingVector_x_or_B_cosBeta_or_G_minusBeta)) + endPoint_x
    var pagingVector_y = bottomBandPoint_x_or_B_b_x2 * boundingVector_x_or_B_cosBeta_or_G_minusBeta + endPoint_y

    boundingVector_x_or_B_cosBeta_or_G_minusBeta = pagingVector_x - pageWidth
    startPoint_y = Math.sqrt(boundingVector_x_or_B_cosBeta_or_G_minusBeta * boundingVector_x_or_B_cosBeta_or_G_minusBeta + pagingVector_y * pagingVector_y)

    if (startPoint_y > pageWidth) {

        boundingVector_x_or_B_cosBeta_or_G_minusBeta = boundingVector_x_or_B_cosBeta_or_G_minusBeta * (pageWidth / startPoint_y)

        pagingVector_x = boundingVector_x_or_B_cosBeta_or_G_minusBeta + pageWidth
        pagingVector_y = pagingVector_y * (pageWidth / startPoint_y)

        endPoint_y = Math.sqrt(pagingVector_x * pagingVector_x + pagingVector_y * pagingVector_y)
    } else {
        endPoint_y = offsetPagingVector_length_or_G_cosBeta + bottomBandPoint_x_or_B_b_x2
    }

    offsetPagingVector_length_or_G_cosBeta = pagingVector_y / endPoint_y
    boundingVector_x_or_B_cosBeta_or_G_minusBeta = Math.PI * 0.5 - Math.acos(offsetPagingVector_length_or_G_cosBeta)

    bottomBandPoint_x_or_B_b_x2 = 0
    startPoint_y = 0.5 * endPoint_y / offsetPagingVector_length_or_G_cosBeta

    if (startPoint_y > pageHeight) {
        bottomBandPoint_x_or_B_b_x2 = (startPoint_y - pageHeight) * Math.tan(boundingVector_x_or_B_cosBeta_or_G_minusBeta)
        startPoint_y = pageHeight
    }

    topBandPoint_x = 0.5 * endPoint_y / Math.cos(boundingVector_x_or_B_cosBeta_or_G_minusBeta)
    topBandPoint_y = 0
    bottomBandPoint_x = bottomBandPoint_x_or_B_b_x2
    bottomBandPoint_y = startPoint_y
