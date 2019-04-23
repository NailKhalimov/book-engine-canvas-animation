// console.time('new')
// for (var i = 0; i < 1000000; i++) {
//     getAnyCornerPoints2(Math.random() * 1000, Math.random() * 1000, Math.random() * 1000, Math.random() * 1000, Math.random() * 1000)
// }
// console.timeEnd('new')
//
// console.time('old')
// for (var i = 0; i < 1000000; i++) {
//     getAnyCornerPoints(Math.random() * 1000, Math.random() * 1000, Math.random() * 1000, Math.random() * 1000, Math.random() * 1000)
// }
// console.timeEnd('old')
//
// // const RT = 1
// // const RB = 2
// // const R = 3
// // const LT = 4
// // const LB = 5
// // const L = 6
//
// function getAnyCornerPoints(startPoint_x, startPoint_y, endPoint_x, endPoint_y, pageWidth, pageHeight) {
//     var bookWidth = pageWidth << 1
//     var CORNER
//
//
//     if (startPoint_x > pageWidth) {
//         if (endPoint_y > startPoint_y) {
//             endPoint_x = bookWidth - endPoint_x
//             CORNER = RT
//         } else {
//             endPoint_x = bookWidth - endPoint_x
//             startPoint_y = pageHeight - startPoint_y
//             endPoint_y = pageHeight - endPoint_y
//             CORNER = RB
//         }
//         if (startPoint_y == endPoint_y) {
//             CORNER = R
//         }
//     } else {
//         if (endPoint_y > startPoint_y) {
//             CORNER = LT
//         } else {
//             startPoint_x = 0
//             startPoint_y = pageHeight - startPoint_y
//             endPoint_y = pageHeight - endPoint_y
//             CORNER = LB
//         }
//         if (startPoint_y == endPoint_y) {
//             CORNER = L
//         }
//     }
//     /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
//     endPoint_y = endPoint_y - startPoint_y
//     var offsetPagingVector_length_or_G_cosBeta = Math.sqrt(endPoint_x * endPoint_x + endPoint_y * endPoint_y)
//
//     var boundingVector_x_or_B_cosBeta_or_G_minusBeta = endPoint_y / offsetPagingVector_length_or_G_cosBeta
//     var bottomBandPoint_x_or_B_b_x2 = boundingVector_x_or_B_cosBeta_or_G_minusBeta * startPoint_y * 2
//
//     /* Координаты части вектора pagingVector */
//
//     var pagingVector_x = bottomBandPoint_x_or_B_b_x2 * Math.cos(Math.PI * 0.5 - Math.acos(boundingVector_x_or_B_cosBeta_or_G_minusBeta)) + endPoint_x
//     var pagingVector_y = bottomBandPoint_x_or_B_b_x2 * boundingVector_x_or_B_cosBeta_or_G_minusBeta + endPoint_y
//
//     boundingVector_x_or_B_cosBeta_or_G_minusBeta = pagingVector_x - pageWidth
//     startPoint_y = Math.sqrt(boundingVector_x_or_B_cosBeta_or_G_minusBeta * boundingVector_x_or_B_cosBeta_or_G_minusBeta + pagingVector_y * pagingVector_y)
//
//     if (startPoint_y > pageWidth) {
//
//         boundingVector_x_or_B_cosBeta_or_G_minusBeta = boundingVector_x_or_B_cosBeta_or_G_minusBeta * (pageWidth / startPoint_y)
//
//         pagingVector_x = boundingVector_x_or_B_cosBeta_or_G_minusBeta + pageWidth
//         pagingVector_y = pagingVector_y * (pageWidth / startPoint_y)
//
//         endPoint_y = Math.sqrt(pagingVector_x * pagingVector_x + pagingVector_y * pagingVector_y)
//     } else {
//         endPoint_y = offsetPagingVector_length_or_G_cosBeta + bottomBandPoint_x_or_B_b_x2
//     }
//
//     offsetPagingVector_length_or_G_cosBeta = pagingVector_y / endPoint_y
//     boundingVector_x_or_B_cosBeta_or_G_minusBeta = Math.PI * 0.5 - Math.acos(offsetPagingVector_length_or_G_cosBeta)
//
//     bottomBandPoint_x_or_B_b_x2 = 0
//     startPoint_y = 0.5 * endPoint_y / offsetPagingVector_length_or_G_cosBeta
//
//     if (startPoint_y > pageHeight) {
//         bottomBandPoint_x_or_B_b_x2 = (startPoint_y - pageHeight) * Math.tan(boundingVector_x_or_B_cosBeta_or_G_minusBeta)
//         startPoint_y = pageHeight
//     }
//
//     topBandPoint_x = 0.5 * endPoint_y / Math.cos(boundingVector_x_or_B_cosBeta_or_G_minusBeta)
//     topBandPoint_y = 0
//     bottomBandPoint_x = bottomBandPoint_x_or_B_b_x2
//     bottomBandPoint_y = startPoint_y
//     /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
//     switch (CORNER) {
//         case RT:
//             topBandPoint_x = bookWidth - topBandPoint_x
//             bottomBandPoint_x = bookWidth - bottomBandPoint_x
//             pagingVector_x = bookWidth - pagingVector_x
//             break;
//
//         case RB:
//             topBandPoint_x = bookWidth - topBandPoint_x
//             topBandPoint_y = pageHeight
//             bottomBandPoint_x = bookWidth - bottomBandPoint_x
//             bottomBandPoint_y = pageHeight - bottomBandPoint_y
//             pagingVector_x = bookWidth - pagingVector_x
//             pagingVector_y = pageHeight - pagingVector_y
//             break;
//
//         case R:
//             pagingVector_x = bookWidth - endPoint_x
//             pagingVector_y = 0
//             topBandPoint_x = pagingVector_x + endPoint_x * 0.5
//             topBandPoint_y = pagingVector_y
//             bottomBandPoint_x = topBandPoint_x
//             bottomBandPoint_y = pageHeight
//             break;
//
//         case LB:
//             topBandPoint_y = pageHeight
//             bottomBandPoint_y = pageHeight - bottomBandPoint_y
//             pagingVector_y = pageHeight - pagingVector_y
//             break;
//
//         case L:
//             topBandPoint_x = endPoint_x * 0.5
//             topBandPoint_y = 0
//             bottomBandPoint_x = topBandPoint_x
//             bottomBandPoint_y = pageHeight
//             pagingVector_y = 0
//             break;
//     }
//
//     return {
//         topBandPoint_x,
//         topBandPoint_y,
//         bottomBandPoint_x,
//         bottomBandPoint_y,
//         pagingVector_x,
//         pagingVector_y
//     }
// }
//
// function getAnyCornerPoints2(startPoint_x, startPoint_y, endPoint_x, endPoint_y, pageWidth, pageHeight) {
//     var bookWidth = pageWidth << 1
//     var CORNER
//     if (startPoint_x > pageWidth) {
//         if (endPoint_y > startPoint_y) {
//             endPoint_x = bookWidth - endPoint_x
//             CORNER = RT
//         } else {
//             endPoint_x = bookWidth - endPoint_x
//             startPoint_y = pageHeight - startPoint_y
//             endPoint_y = pageHeight - endPoint_y
//             CORNER = RB
//         }
//         if (startPoint_y == endPoint_y) {
//             CORNER = R
//         }
//     } else {
//         if (endPoint_y > startPoint_y) {
//             CORNER = LT
//         } else {
//             startPoint_x = 0
//             startPoint_y = pageHeight - startPoint_y
//             endPoint_y = pageHeight - endPoint_y
//             CORNER = LB
//         }
//         if (startPoint_y == endPoint_y) {
//             CORNER = L
//         }
//     }
//     /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
//     endPoint_y = endPoint_y - startPoint_y
//     var offsetPagingVector_length_or_G_cosBeta = Math.sqrt(endPoint_x * endPoint_x + endPoint_y * endPoint_y)
//
//     var boundingVector_x_or_B_cosBeta_or_G_minusBeta = endPoint_y / offsetPagingVector_length_or_G_cosBeta
//     var bottomBandPoint_x_or_B_b_x2 = boundingVector_x_or_B_cosBeta_or_G_minusBeta * startPoint_y * 2
//
//     /* Координаты части вектора pagingVector */
//
//     var pagingVector_x = bottomBandPoint_x_or_B_b_x2 * Math.cos(Math.PI * 0.5 - Math.acos(boundingVector_x_or_B_cosBeta_or_G_minusBeta)) + endPoint_x
//     var pagingVector_y = bottomBandPoint_x_or_B_b_x2 * boundingVector_x_or_B_cosBeta_or_G_minusBeta + endPoint_y
//
//     boundingVector_x_or_B_cosBeta_or_G_minusBeta = pagingVector_x - pageWidth
//     startPoint_y = Math.sqrt(boundingVector_x_or_B_cosBeta_or_G_minusBeta * boundingVector_x_or_B_cosBeta_or_G_minusBeta + pagingVector_y * pagingVector_y)
//
//     if (startPoint_y > pageWidth) {
//
//         boundingVector_x_or_B_cosBeta_or_G_minusBeta = boundingVector_x_or_B_cosBeta_or_G_minusBeta * (pageWidth / startPoint_y)
//
//         pagingVector_x = boundingVector_x_or_B_cosBeta_or_G_minusBeta + pageWidth
//         pagingVector_y = pagingVector_y * (pageWidth / startPoint_y)
//
//         endPoint_y = Math.sqrt(pagingVector_x * pagingVector_x + pagingVector_y * pagingVector_y)
//     } else {
//         endPoint_y = offsetPagingVector_length_or_G_cosBeta + bottomBandPoint_x_or_B_b_x2
//     }
//
//     offsetPagingVector_length_or_G_cosBeta = pagingVector_y / endPoint_y
//     boundingVector_x_or_B_cosBeta_or_G_minusBeta = Math.PI * 0.5 - Math.acos(offsetPagingVector_length_or_G_cosBeta)
//
//     bottomBandPoint_x_or_B_b_x2 = 0
//     startPoint_y = 0.5 * endPoint_y / offsetPagingVector_length_or_G_cosBeta
//
//     if (startPoint_y > pageHeight) {
//         bottomBandPoint_x_or_B_b_x2 = (startPoint_y - pageHeight) * Math.tan(boundingVector_x_or_B_cosBeta_or_G_minusBeta)
//         startPoint_y = pageHeight
//     }
//
//     topBandPoint_x = 0.5 * endPoint_y / Math.cos(boundingVector_x_or_B_cosBeta_or_G_minusBeta)
//     topBandPoint_y = 0
//     bottomBandPoint_x = bottomBandPoint_x_or_B_b_x2
//     bottomBandPoint_y = startPoint_y
//     /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
//     if(CORNER == RT) {
//         topBandPoint_x = bookWidth - topBandPoint_x
//         bottomBandPoint_x = bookWidth - bottomBandPoint_x
//         pagingVector_x = bookWidth - pagingVector_x
//     } else if(CORNER == RB) {
//         topBandPoint_x = bookWidth - topBandPoint_x
//         topBandPoint_y = pageHeight
//         bottomBandPoint_x = bookWidth - bottomBandPoint_x
//         bottomBandPoint_y = pageHeight - bottomBandPoint_y
//         pagingVector_x = bookWidth - pagingVector_x
//         pagingVector_y = pageHeight - pagingVector_y
//     } else if (CORNER == R) {
//         pagingVector_x = bookWidth - endPoint_x
//         pagingVector_y = 0
//         topBandPoint_x = pagingVector_x + endPoint_x * 0.5
//         topBandPoint_y = pagingVector_y
//         bottomBandPoint_x = topBandPoint_x
//         bottomBandPoint_y = pageHeight
//     } else if(CORNER == LB) {
//         topBandPoint_y = pageHeight
//         bottomBandPoint_y = pageHeight - bottomBandPoint_y
//         pagingVector_y = pageHeight - pagingVector_y
//     } else if (CORNER == L) {
//         topBandPoint_x = endPoint_x * 0.5
//         topBandPoint_y = 0
//         bottomBandPoint_x = topBandPoint_x
//         bottomBandPoint_y = pageHeight
//         pagingVector_y = 0
//     }
//
//     return {
//         topBandPoint_x,
//         topBandPoint_y,
//         bottomBandPoint_x,
//         bottomBandPoint_y,
//         pagingVector_x,
//         pagingVector_y
//     }
// }
