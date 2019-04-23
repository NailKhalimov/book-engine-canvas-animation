function getAnyCornerPoints(startPoint, endPoint, pageWidth, pageHeight) {
    var data

    if (startPoint.x > pageWidth) {
        if (endPoint.y > startPoint.y) {
            /* Перевод с правой на левую сторону страницы */
            startPoint.x = 960
            startPoint.y = startPoint.y

            endPoint.x = pageWidth * 2 - endPoint.x
            endPoint.y = endPoint.y

            data = getLeftTopCornerPoints(startPoint, endPoint, pageWidth, pageHeight)

            data.topBandPoint.x = pageWidth * 2 - data.topBandPoint.x
            data.topBandPoint.y = data.topBandPoint.y

            data.bottomBandPoint.x = pageWidth * 2 - data.bottomBandPoint.x
            data.bottomBandPoint.y = data.bottomBandPoint.y

            data.pagingVector.x = pageWidth * 2 - data.pagingVector.x
            data.pagingVector.y = data.pagingVector.y

            startPoint.x = 960
            startPoint.y = startPoint.y

            endPoint.x = pageWidth * 2 - endPoint.x
            endPoint.y = endPoint.y
        } else {
            /* Перевод с правой на левую сторону страницы */
            // startPoint.x = 0
            startPoint.y = startPoint.y

            endPoint.x = pageWidth * 2 - endPoint.x
            endPoint.y = endPoint.y
            /* Зеркальная интерпретация вектора для низа */
            // startPoint.x = 0
            startPoint.y = pageHeight - startPoint.y

            endPoint.x = endPoint.x
            endPoint.y = pageHeight - endPoint.y

            data = getLeftTopCornerPoints(startPoint, endPoint, pageWidth, pageHeight)

            data.topBandPoint.x = pageWidth * 2 - data.topBandPoint.x
            data.topBandPoint.y = pageHeight

            data.bottomBandPoint.x = pageWidth * 2 - data.bottomBandPoint.x
            data.bottomBandPoint.y = pageHeight - data.bottomBandPoint.y

            data.pagingVector.x = pageWidth * 2 - data.pagingVector.x
            data.pagingVector.y = pageHeight - data.pagingVector.y

            // startPoint.x = 0
            startPoint.y = pageHeight - startPoint.y

            endPoint.x = endPoint.x
            endPoint.y = pageHeight - endPoint.y
        }
        if (startPoint.y == endPoint.y) {
            data = getLeftTopCornerPoints(startPoint, endPoint, pageWidth, pageHeight)

            data.topBandPoint.x = (pageWidth * 2 - endPoint.x) + endPoint.x * 0.5
            data.topBandPoint.y = 0

            data.bottomBandPoint.x = (pageWidth * 2 - endPoint.x) + endPoint.x * 0.5
            data.bottomBandPoint.y = pageHeight

            data.pagingVector.x = pageWidth * 2 - endPoint.x
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
