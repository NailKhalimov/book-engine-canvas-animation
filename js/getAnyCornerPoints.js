const LT = 1
const RB = 2
const RT = 3
const LB = 4
const R = 5
const L = 6

function getAnyCornerPoints(startPoint_x, startPoint_y, endPoint_x, endPoint_y, pageWidth, pageHeight) {
    var bookWidth = pageWidth << 1
    // var pageCorner = pageWidth / 10
    var CORNER

    if (startPoint_x > pageWidth) {
        if (endPoint_y > startPoint_y) {
            endPoint_x = bookWidth - endPoint_x
            CORNER = RT
        } else {
            endPoint_x = bookWidth - endPoint_x
            startPoint_y = pageHeight - startPoint_y
            endPoint_y = pageHeight - endPoint_y
            CORNER = RB
        }
        if (startPoint_y == endPoint_y) {
            CORNER = R
        }
    } else {
        if (endPoint_y > startPoint_y) {
            CORNER = LT
        } else {
            startPoint_x = 0
            startPoint_y = pageHeight - startPoint_y
            endPoint_y = pageHeight - endPoint_y
            CORNER = LB
        }
        if (startPoint_y == endPoint_y) {
            CORNER = L
        }
    }

    /*------------------------------------------------------------------------------------------------------------------*/
        endPoint_y = endPoint_y - startPoint_y
        // if (endPoint_x < pageCorner){
        //     endPoint_x = pageCorner
        //     endPoint_y = pageCorner
        // }
        // console.log(endPoint_x, endPoint_y)
        /*
        Все ньюансы, которые приводят к ошибкам сгиба, и неправильной отрисовке, можно исправить поставив exceeptions на каждый из случаев, например, как в книге Ibooks
        */
        var offsetPagingVector_length = Math.sqrt(endPoint_x * endPoint_x + endPoint_y * endPoint_y)
        if (endPoint_x == 0 && endPoint_y == 0) {
            offsetPagingVector_length = 1
        }
        var A_beta = Math.acos(endPoint_y / offsetPagingVector_length)

        var B_b = Math.cos(A_beta) * startPoint_y

        var pagingVector_x =  2 * B_b * Math.cos(Math.PI * 0.5 - A_beta) + endPoint_x
        var pagingVector_y =  2 * B_b * Math.cos(A_beta) + endPoint_y
        var pagingVector_length =  offsetPagingVector_length + 2 * B_b

        var boundingVector_radius = pageWidth / Math.cos(Math.PI * 0.25)

        var boundingVector_x = pagingVector_x - pageWidth
        var boundingVector_y = pagingVector_y + pageWidth

        var boundingVector_length = Math.sqrt(boundingVector_x * boundingVector_x + boundingVector_y * boundingVector_y)
        var pagingVector_beta = Math.acos(pagingVector_y / pagingVector_length)

        if (boundingVector_length > boundingVector_radius) {
            var ratio = (boundingVector_radius / boundingVector_length)

            boundingVector_x = boundingVector_x * ratio
            boundingVector_y = boundingVector_y * ratio

            pagingVector_x = boundingVector_x + pageWidth
            pagingVector_y = boundingVector_y - pageWidth

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

        var effectTopPoint_x = topBandPoint_x << 1
        var effectTopPoint_y = 0

        for (var i = 1; i <= COUNT; i += 1) {
            COEFFS[i - 1] = Math.pow(i / COUNT, 0.35 + ((effectTopPoint_x) / pageWidth) * ((effectTopPoint_x) / pageWidth))
        }

        if (effectTopPoint_x > pageWidth) {
            effectTopPoint_x = pageWidth
        }

        var effectBottomPoint_x = 0
        var effectBottomPoint_y = bottomBandPoint_y << 1

        if (effectBottomPoint_y > pageHeight) {
            var ratio = effectBottomPoint_y / (effectBottomPoint_y - pageHeight)

            effectBottomPoint_x = effectTopPoint_x / ratio
            effectBottomPoint_y = pageHeight
        }

        if (effectBottomPoint_x > pageWidth) {
            effectBottomPoint_x = pageWidth
        }

        var I_a = effectBottomPoint_y
        var I_b = effectTopPoint_x - effectBottomPoint_x

        var effectPoint_x = pagingVector_x
        var effectPoint_y = pagingVector_y

        var effectAngle = Math.atan2(I_b, I_a)

        var effectPoint_length = pagingVector_length

        if (effectTopPoint_x == pageWidth) {
            effectPoint_x = ((0 * pagingVector_y - pagingVector_x * 0) * (effectBottomPoint_x - effectTopPoint_x) - (effectTopPoint_x * effectBottomPoint_y - effectBottomPoint_x * effectTopPoint_y) * (pagingVector_x - 0)) / ((0 - pagingVector_y) * (effectBottomPoint_x - effectTopPoint_x) - (effectTopPoint_y  - effectBottomPoint_y) * (pagingVector_x - 0))
            effectPoint_y = ((effectTopPoint_y - effectBottomPoint_y) * effectPoint_x - (effectTopPoint_x * effectBottomPoint_y - effectBottomPoint_x * effectTopPoint_y)) / (effectBottomPoint_x - effectTopPoint_x)
            effectPoint_x *= -1

            effectPoint_length = Math.sqrt(effectPoint_x * effectPoint_x + effectPoint_y * effectPoint_y)
        }

        var ratio

        if (bottomBandPoint_y > pageHeight) {
            var H_a = bottomBandPoint_y - pageHeight
            ratio =  bottomBandPoint_y / H_a

            bottomBandPoint_x = topBandPoint_x / ratio
            bottomBandPoint_y = pageHeight
        }

        var angle = (Math.PI - Math.acos(Math.cos(G_beta)) * 2) * (CORNER < RT ? 1 : -1)

        var botTriangle_c = Math.abs(Math.cos(Math.PI * 0.5 - angle)) * pageHeight
        var botTriangle_b = Math.cos(angle) * pageHeight

        var topTriangle_a = Math.sqrt(((pagingVector_x - topBandPoint_x) * (pagingVector_x - topBandPoint_x)) + ((pagingVector_y - topBandPoint_y) * (pagingVector_y - topBandPoint_y)))
        var topTriangle_b = pagingVector_y
        var topTriangle_c = Math.sqrt((topTriangle_a * topTriangle_a) - (topTriangle_b * topTriangle_b))

        var bottomPoint_x = topBandPoint_x + (topTriangle_c - botTriangle_c)
        var bottomPoint_y = topTriangle_b + botTriangle_b

    /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
    /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
    switch (CORNER) {
        case RT:
            topBandPoint_x = bookWidth - topBandPoint_x

            bottomBandPoint_x = bookWidth - bottomBandPoint_x

            pagingVector_x = bookWidth - pagingVector_x

            effectTopPoint_x = bookWidth - effectTopPoint_x

            effectBottomPoint_x = bookWidth - effectBottomPoint_x

            effectPoint_x = bookWidth - effectPoint_x

            bottomPoint_x = bookWidth - bottomPoint_x

            break

        case RB:
            bottomBandPoint_x_or_B_b_x2 = topBandPoint_x
            topBandPoint_x = bookWidth - bottomBandPoint_x
            topBandPoint_y = pageHeight - bottomBandPoint_y

            bottomBandPoint_x = bookWidth - bottomBandPoint_x_or_B_b_x2
            bottomBandPoint_y = pageHeight

            pagingVector_x = bookWidth - pagingVector_x
            pagingVector_y = pageHeight - pagingVector_y

            bottomBandPoint_x_or_B_b_x2 = effectTopPoint_x
            effectTopPoint_x = bookWidth - effectBottomPoint_x
            effectTopPoint_y = pageHeight - effectBottomPoint_y

            effectBottomPoint_x = bookWidth - bottomBandPoint_x_or_B_b_x2
            effectBottomPoint_y = pageHeight

            effectPoint_x = bookWidth - effectPoint_x
            effectPoint_y = pageHeight - effectPoint_y

            bottomPoint_x = bookWidth - bottomPoint_x
            bottomPoint_y = pageHeight - bottomPoint_y

            break;

        case R:
            pagingVector_x = bookWidth - endPoint_x
            pagingVector_y = 0
            topBandPoint_x = pagingVector_x + endPoint_x * 0.5
            topBandPoint_y = pagingVector_y
            bottomBandPoint_x = topBandPoint_x
            bottomBandPoint_y = pageHeight

            effectTopPoint_x = bookWidth - effectPoint_x
            effectTopPoint_y = 0

            effectPoint_x = effectTopPoint_x
            effectPoint_y = 0

            effectBottomPoint_x = effectTopPoint_x
            effectBottomPoint_y = pageHeight

            effectAngle = Math.atan2(effectTopPoint_x - effectBottomPoint_x, effectBottomPoint_y)

            bottomPoint_x = bookWidth - bottomPoint_x

            CORNER = RT
            break;

        case LB:
            bottomBandPoint_x_or_B_b_x2 = topBandPoint_x

            bottomPoint_y = pageHeight - bottomPoint_y

            topBandPoint_x = bottomBandPoint_x
            topBandPoint_y = pageHeight - bottomBandPoint_y

            bottomBandPoint_x = bottomBandPoint_x_or_B_b_x2
            bottomBandPoint_y = pageHeight

            pagingVector_y = pageHeight - pagingVector_y

            bottomBandPoint_x_or_B_b_x2 = effectTopPoint_x
            effectTopPoint_x = effectBottomPoint_x
            effectTopPoint_y = pageHeight - effectBottomPoint_y

            effectBottomPoint_x = bottomBandPoint_x_or_B_b_x2
            effectBottomPoint_y = pageHeight

            effectPoint_y = pageHeight - effectPoint_y

            break;

        case L:
            topBandPoint_x = endPoint_x * 0.5
            topBandPoint_y = 0
            bottomBandPoint_x = topBandPoint_x
            bottomBandPoint_y = pageHeight
            pagingVector_y = 0


            effectTopPoint_x = effectTopPoint_x
            effectTopPoint_y = 0
            effectPoint_x = effectTopPoint_x
            effectPoint_y = 0
            effectBottomPoint_x = effectTopPoint_x
            effectBottomPoint_y = pageHeight

            effectAngle = Math.atan2(effectTopPoint_x - effectBottomPoint_x, effectBottomPoint_y)
            CORNER = LT
            break;
    }

    var J_h //change position of variable declaration

    switch (CORNER) {
        case RB:
        case LB:
            var J_a = Math.sqrt(((topBandPoint_x - effectTopPoint_x) * (topBandPoint_x - effectTopPoint_x)) + ((topBandPoint_y - effectTopPoint_y) * (topBandPoint_y - effectTopPoint_y)))
            var J_b = Math.sqrt(((effectBottomPoint_x - topBandPoint_x) * (effectBottomPoint_x - topBandPoint_x)) + ((effectBottomPoint_y - topBandPoint_y) * (effectBottomPoint_y - topBandPoint_y)))
            var J_c = Math.sqrt(((effectTopPoint_x - effectBottomPoint_x) * (effectTopPoint_x - effectBottomPoint_x)) + ((effectTopPoint_y - effectBottomPoint_y) * (effectTopPoint_y - effectBottomPoint_y)))

            var p = (J_a + J_b + J_c) * 0.5

            J_h = ((Math.sqrt(p * (p - J_a) * (p - J_b) * (p - J_c))) << 1) / J_c

            break
        case RT:
        case LT:
            var J_a = Math.sqrt((bottomBandPoint_x - effectTopPoint_x) * (bottomBandPoint_x - effectTopPoint_x) + (bottomBandPoint_y - effectTopPoint_y) * (bottomBandPoint_y - effectTopPoint_y))
            var J_b = Math.sqrt((effectBottomPoint_x - bottomBandPoint_x) * (effectBottomPoint_x - bottomBandPoint_x) + (effectBottomPoint_y - bottomBandPoint_y) * (effectBottomPoint_y - bottomBandPoint_y))
            var J_c = Math.sqrt((effectBottomPoint_x - effectTopPoint_x) * (effectBottomPoint_x - effectTopPoint_x) + (effectBottomPoint_y - effectTopPoint_y) * (effectBottomPoint_y - effectTopPoint_y))

            var p = (J_a + J_b + J_c) * 0.5

            J_h = ((Math.sqrt(p * (p - J_a) * (p - J_b) * (p - J_c))) << 1) / J_c

            break
    }

    return {
        topBandPoint_x,
        topBandPoint_y,
        bottomBandPoint_x,
        bottomBandPoint_y,
        pagingVector_x,
        pagingVector_y,
        effectTopPoint_x,
        effectTopPoint_y,
        effectBottomPoint_x,
        effectBottomPoint_y,
        effectPoint_x,
        effectPoint_y,
        corner: CORNER,
        angle: angle,
        effectAngle,
        pagingVector_length,
        effectPoint_length,
        J_h,
        ratio,
        bottomPoint_x,
        bottomPoint_y
    }
}
