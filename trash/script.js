function getCornerData(startPoint, endPoint) {
   /*
    *    Алгоритм нахождения всех точек
    *        1. Найдем длину вектора
    *        2. Нахождение уголов, катета и гипотенузы треугольника(сделать метку какой именно).
    *        3. Находим гипотенузу треугольника (сделать метку какой именно).
    *        4. Координаты нижней точки.
    *        5. Координаты верхней точки.
    *        6. Координаты центральной точки.
    *
    *        Черновик:
    *
    *        Найдем нижнюю точку точку сгиба страницы - 'bottomBandPoint', для этого необходима длина гипотенузы треугольника В.
    *        Для нахождения гипотенузы нужно получить значение противолежащего катета к гипотенузе и угла альфа.
    *        Чтобы получить угол альфа, нужно представить треугольник A, в котором известны катет и гипотенуза.
    *        Длина катета находится вычитанием из endPoint.y - startPoint.y,
    *        а длина гипотенузы, треугольника А, находится по двум точкам,
    *        расстояние между которыми считается по формуле длины вектора.
    *
    *        Найдем верхнюю точку сгиба страницы - 'topBandPoint', для этого нужно получить длину катета треугольника С.
    *        Длина катета расчитывается путем умножения коэфицента подобия треугольников С и В на 1/2 длины вектора - offsetPagingVector
    *        Коэффициент подобия находится путем: деления катета 'a' треугольника С на гипотенузу 'с' треугольника В.
    *        Длина вектора - offsetPagingVector расчитывается между двумя точками 'startPoint' и 'endPoint' по формуле длины вектора
    *
    *        Найдем центральную точку сгиба страницы - 'pagingVector' путем умножения координат 'x' и 'y', вектора offsetPagingVector, на коэффицент подобия.
    */

    /*    1:
            Сместим вектор, начинается от [0, 0], до [endPoint.x, endPoint.y - startPoint.y]
    */

    var offsetPagingVector = {
        x: endPoint.x,
        y: endPoint.y - startPoint.y
    }

    offsetPagingVector.length = calcVectorLength(offsetPagingVector)

    /*
    2:
   Представим треугольник и найдем отношение противолежащего катета к гипотенузе.
   Длина противолежащего катета - "oppositeСatheter" находится через формулу длины вектора.
   Он идет от "startPoint" до [0, endPoint.y], вдоль оси
    */
    var A = {
        x: startPoint.x, //trash
        y: startPoint.y, //trash
        a: offsetPagingVector.y,
        b: offsetPagingVector.length
    }

    A.alpha = Math.PI * 0.5
    A.beta = Math.acos(A.a / A.b)
    A.gamma = Math.PI * 0.5 - A.beta
    A.c = Math.sqrt(A.b * A.b - A.a * A.a)

    /*
        3:
        Найдем длину гипотенузы для треугольника с катетом, который является 1/2 вектора, чтобы в дальнейшем найти нижнюю точку сгиба страницы
        По подобию треугольников, угол
    */
    var B = {
        b: offsetPagingVector.length * 0.5,
        alpha: Math.PI * 0.5 - A.beta,
        beta: A.beta
    }
    B.a = B.b / Math.cos(A.beta)
    B.c = Math.sqrt(B.a * B.a - B.b * B.b)
    B.alpha = Math.PI * 0.5 - B.beta
    B.gamma = Math.PI * 0.5
    /*
        4:
        Координаты нижней точки:
    */
    var bottomBandPoint = {x: 0, y: B.a + startPoint.y}
    /*
        5:
        Координаты верхней точки:
        Найдем соотношение - 'ratio' сторон треугольников
        И координаты верхней точки сгиба страницы. По подобию треугольников он равен 1/2 вектора умноженному на коэф. подобия.
    */

    var ratio = bottomBandPoint.y / B.a
    //var ratio = C.a / B.c
    var topBandPoint = {x: B.b * bottomBandPoint.y / B.c, y: 0}

    var C = {
        a: bottomBandPoint.y,
        b: topBandPoint.x,
        c: Math.sqrt(bottomBandPoint.y * bottomBandPoint.y + topBandPoint.x * topBandPoint.x),
        alpha: B.alpha,
        beta: Math.PI * 0.5,
        gamma: B.beta
    }
    /*
        6:
        Центральная точка:
    */
    //var ratio2 =
    pagingVector = {
        x: offsetPagingVector.x * ratio,
        y: offsetPagingVector.y * ratio,
        length: offsetPagingVector.length * ratio,
        angle: A.beta
    }

    return {
        topBandPoint,
        bottomBandPoint,
        pagingVector,
        A,
        B,
        C
    }
}

function calcVectorLength(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
}
