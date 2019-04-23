const COUNT = 1000
const COEFFS = []

for (var i = 1; i <= COUNT; i += 1) {
    COEFFS[i - 1] = Math.pow(i / COUNT, 1)
}

function drawPaging(ctx, secondContext, x, y, startPoint_x, startPoint_y, endPoint_x, endPoint_y, A, B, C, D, pageWidth, pageHeight) {

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

    var {topBandPoint_x, topBandPoint_y, bottomBandPoint_x, bottomBandPoint_y, pagingVector_x, pagingVector_y, effectTopPoint_x, effectTopPoint_y, effectBottomPoint_x, effectBottomPoint_y, effectPoint_x, effectPoint_y, corner, angle, effectAngle, pagingVector_length, effectPoint_length, J_h, ratio, bottomPoint_x, bottomPoint_y} = getAnyCornerPoints(startPoint_x, startPoint_y, endPoint_x, endPoint_y, pageWidth, pageHeight)

    ctx.save()
    var path = new Path2D()

    secondContext.clearRect(0, 0, secondContext.canvas.width, secondContext.canvas.height)
    secondContext.save()

    switch (corner) {
        case LT:
            secondContext.translate(0,  secondContext.canvas.width)
            secondContext.rotate(-effectAngle)
            secondContext.translate(-bottomBandPoint_x, -bottomBandPoint_y)
            break
        case LB:
            secondContext.translate(0, secondContext.canvas.height - secondContext.canvas.width)
            secondContext.rotate(effectAngle)
            secondContext.translate(-topBandPoint_x, -topBandPoint_y)
            break
        case RT:
            secondContext.translate(secondContext.canvas.width, secondContext.canvas.width)
            secondContext.rotate(effectAngle)
            secondContext.translate(-bottomBandPoint_x, -bottomBandPoint_y)
            break
        case RB:
            secondContext.translate(secondContext.canvas.width, secondContext.canvas.height - secondContext.canvas.width)
            secondContext.rotate(-effectAngle)
            secondContext.translate(-topBandPoint_x, -topBandPoint_y)
            break
    }

    drawRawPaging(secondContext, corner, A, B, C, D, bookWidth, bookHeight, pagingVector_x, pagingVector_y, angle, effectPoint_x, effectPoint_y, pagingVector_length, topBandPoint_x, topBandPoint_y, bottomBandPoint_x, bottomBandPoint_y, effectTopPoint_x, effectTopPoint_y, effectBottomPoint_x, effectBottomPoint_y, effectPoint_length, ratio, bottomPoint_x, bottomPoint_y)

    effectBottomPoint_x += x
    effectBottomPoint_y += y

    effectTopPoint_x += x
    effectTopPoint_y += y

    topBandPoint_x += x
    topBandPoint_y += y

    bottomBandPoint_x += x
    bottomBandPoint_y += y

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.save()



    var effectPath = new Path2D()

    ctx.save()

    var shadowClip = new Path2D()

    ctx.translate(x, y)

    switch (corner) {
        case LT:
        case LB:
            ctx.drawImage(C, 0, 0)
            shadowClip.moveTo(topBandPoint_x - x, topBandPoint_y - y)
            shadowClip.lineTo(pageWidth, 0)
            shadowClip.lineTo(pageWidth, pageHeight)
            shadowClip.lineTo(0, pageHeight)
            shadowClip.lineTo(bottomBandPoint_x - x, bottomBandPoint_y - y)
            break
        case RT:
        case RB:
            ctx.drawImage(B, pageWidth, 0)
            break
    }

    shadowClip.closePath()

    ctx.clip(shadowClip)

    var gradient = secondContext.createLinearGradient(pageWidth, 0, 0, pageHeight)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    secondContext.globalCompositeOperation = 'source-atop'
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1000, 1000)
    secondContext.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
    ctx.restore()

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

            ctx.translate(bottomBandPoint_x, bottomBandPoint_y)
            ctx.rotate(effectAngle)
            ctx.drawImage(canvasRendering, 0, -(secondContext.canvas.width))
            break

        case LB:
            effectPath.moveTo(effectTopPoint_x, effectTopPoint_y)
            effectPath.lineTo(effectTopPoint_x + (effectTopPoint_x - effectBottomPoint_x), effectTopPoint_y - (effectBottomPoint_y - effectTopPoint_y))

            if (effectTopPoint_x == x) {
                effectPath.lineTo(0, 0)
            }

            effectPath.lineTo(ctx.canvas.width, 0)
            effectPath.lineTo(ctx.canvas.width, ctx.canvas.height)
            effectPath.lineTo(0, ctx.canvas.height)
            effectPath.lineTo(effectBottomPoint_x - (effectTopPoint_x - effectBottomPoint_x), effectBottomPoint_y + (effectBottomPoint_y - effectTopPoint_y))
            effectPath.lineTo(effectBottomPoint_x, effectBottomPoint_y)
            effectPath.closePath()

            ctx.clip(effectPath)

            ctx.translate(topBandPoint_x, topBandPoint_y)
            ctx.rotate(-effectAngle)
            ctx.drawImage(canvasRendering, 0, -secondContext.canvas.height + secondContext.canvas.width)
            break

        case RT:
            effectPath.moveTo(effectTopPoint_x, effectTopPoint_y)
            effectPath.lineTo(effectTopPoint_x + (effectTopPoint_x - effectBottomPoint_x), effectTopPoint_y - (effectBottomPoint_y - effectTopPoint_y))
            effectPath.lineTo(0, 0)
            effectPath.lineTo(0, ctx.canvas.height)
            effectPath.lineTo(ctx.canvas.width, ctx.canvas.height)
            effectPath.lineTo(effectBottomPoint_x - (effectTopPoint_x - effectBottomPoint_x), effectBottomPoint_y + (effectBottomPoint_y - effectTopPoint_y))
            effectPath.lineTo(effectBottomPoint_x, effectBottomPoint_y)
            effectPath.closePath()

            ctx.clip(effectPath)

            ctx.translate(bottomBandPoint_x, bottomBandPoint_y)
            ctx.rotate(-effectAngle)
            ctx.drawImage(canvasRendering, -secondContext.canvas.width, -secondContext.canvas.width)
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

            ctx.translate(topBandPoint_x, topBandPoint_y)
            ctx.rotate(effectAngle)
            ctx.drawImage(canvasRendering, -secondContext.canvas.width, -secondContext.canvas.height + secondContext.canvas.width)
            break
    }

    ctx.restore()

    ctx.save()
    var effectOffset = 0
    const vectorPeace = J_h / COUNT

    switch (corner) {
        case LT:

            ctx.translate(bottomBandPoint_x, bottomBandPoint_y)
            ctx.rotate(effectAngle)
            ctx.translate(0, -secondContext.canvas.width)

            for (var i = 0; i < COUNT; i += 1) {
                effectOffset += vectorPeace * COEFFS[COUNT - i - 1]
                ctx.drawImage(
                    canvasRendering,
                    J_h - vectorPeace * (i + 1),
                    0,
                    vectorPeace,
                    secondContext.canvas.height,
                    J_h - effectOffset,
                    0,
                    vectorPeace * COEFFS[COUNT - i - 1],
                    secondContext.canvas.height
                 )
            }
            break
        case LB:
            ctx.translate(topBandPoint_x, topBandPoint_y)
            ctx.rotate(-effectAngle)
            ctx.translate(0, -canvasRendering.height + secondContext.canvas.width)

            for (var i = 0; i < COUNT; i += 1) {
                effectOffset += vectorPeace * COEFFS[COUNT - i - 1]
                ctx.drawImage(
                    canvasRendering,
                    J_h - vectorPeace * (i + 1),
                    0,
                    vectorPeace,
                    secondContext.canvas.height,
                    J_h - effectOffset,
                    0,
                    vectorPeace * COEFFS[COUNT - i - 1],
                    secondContext.canvas.height
                 )
            }

            break
        case RT:
            ctx.translate(bottomBandPoint_x, bottomBandPoint_y)
            ctx.rotate(-effectAngle)
            ctx.translate(-secondContext.canvas.width, -secondContext.canvas.width)

            for (var i = 0; i < COUNT; i += 1) {
                effectOffset += vectorPeace * COEFFS[COUNT - i - 1]

                if (i == 0) {
                    ctx.drawImage(
                        canvasRendering,
                        (secondContext.canvas.width - J_h),
                        0,
                        vectorPeace,
                        secondContext.canvas.height,
                        (secondContext.canvas.width - J_h),
                        0,
                        vectorPeace * COEFFS[COUNT - i - 1],
                        secondContext.canvas.height
                     )
                }

                ctx.drawImage(
                    canvasRendering,
                    (secondContext.canvas.width - J_h) + vectorPeace * (i + 1),
                    0,
                    vectorPeace,
                    secondContext.canvas.height,
                    (secondContext.canvas.width - J_h) + effectOffset,
                    0,
                    vectorPeace * COEFFS[COUNT - i - 1],
                    secondContext.canvas.height
                 )
            }
            break
        case RB:
            ctx.translate(topBandPoint_x, topBandPoint_y)
            ctx.rotate(effectAngle)
            ctx.translate(-secondContext.canvas.width, -canvasRendering.height + secondContext.canvas.width)

            for (var i = 0; i < COUNT; i += 1) {
                effectOffset += vectorPeace * COEFFS[COUNT - i - 1]

                if (i == 0) {
                    ctx.drawImage(
                        canvasRendering,
                        (secondContext.canvas.width - J_h),
                        0,
                        vectorPeace,
                        secondContext.canvas.height,
                        (secondContext.canvas.width - J_h),
                        0,
                        vectorPeace * COEFFS[COUNT - i - 1],
                        secondContext.canvas.height
                     )
                }

                ctx.drawImage(
                    canvasRendering,
                    (secondContext.canvas.width - J_h) + vectorPeace * (i + 1),
                    0,
                    vectorPeace,
                    secondContext.canvas.height,
                    (secondContext.canvas.width - J_h) + effectOffset,
                    0,
                    vectorPeace * COEFFS[COUNT - i - 1],
                    secondContext.canvas.height
                 )
            }
            break
    }
    ctx.restore()

    // ctx.save()
    // ctx.translate(x, y)
    // ctx.beginPath()
    // ctx.arc(bottomPoint_x, bottomPoint_y, 4, 0, 2 * Math.PI, false)
    // ctx.setLineDash([3, 3])
    // ctx.strokeStyle = '#333'
    // ctx.stroke()
    // ctx.closePath()
    // ctx.restore()
    //
    // secondContext.save()
    // secondContext.beginPath()
    // secondContext.moveTo(secondContext.canvas.width - J_h, 0)
    // secondContext.lineTo(secondContext.canvas.width - J_h, secondContext.canvas.height)
    // secondContext.strokeStyle = '#333'
    // secondContext.stroke()
    // secondContext.closePath()
    // secondContext.restore()
    // //
    // ctx.save()
    // ctx.translate(x, y)
    // ctx.beginPath()
    // ctx.font = '10px Georgia'
    // //ctx.fillText('angle: ' + effectAngle, effectTopPoint_x - x, effectTopPoint_y - y - 30)
    // ctx.arc(effectTopPoint_x - x, effectTopPoint_y - y, 4, 0, 2 * Math.PI, false)
    // ctx.strokeStyle = '#ff0000'
    // ctx.stroke()
    // ctx.closePath()
    // ctx.restore()
    //
    // ctx.save()
    // ctx.translate(x, y)
    // ctx.beginPath()
    // ctx.font = '10px Georgia'
    // //ctx.fillText('angle: ' + effectAngle, effectTopPoint_x - x, effectTopPoint_y - y - 30)
    // ctx.arc(0, NoName_y, 4, 0, 2 * Math.PI, false)
    // ctx.strokeStyle = '#ff0000'
    // ctx.stroke()
    // ctx.closePath()
    // ctx.restore()
    //
    // ctx.save()
    // ctx.translate(x, y)
    // ctx.beginPath()
    // ctx.font = '10px Georgia'
    // //ctx.fillText('angle: ' + effectAngle, effectTopPoint_x - x, effectTopPoint_y - y - 30)
    // ctx.arc(topBandPoint_x - x, topBandPoint_y - y, 4, 0, 2 * Math.PI, false)
    // ctx.strokeStyle = '#ff0000'
    // ctx.stroke()
    // ctx.closePath()
    // ctx.restore()
    //
    // var newTriangle_b_or_y = triangleOfEdgeBottomPoint_c * Math.sin(Math.PI * 0.5 - angle)
    // var newTriangle_a_or_x = Math.sqrt((triangleOfEdgeBottomPoint_c * triangleOfEdgeBottomPoint_c) - (newTriangle_b_or_y * newTriangle_b_or_y)) + bottomBandPoint_x
    // newTriangle_b_or_y += pageHeight
    // console.log(newTriangle_b_or_y)
    // console.log(newTriangle_a_or_x)
    // ctx.save()
    // ctx.translate(x, y)
    // ctx.beginPath()
    // ctx.arc(newTriangle_a_or_x, newTriangle_b_or_y, 4, 0, 2 * Math.PI, false)
    // ctx.strokeStyle = '#ff0000'
    // ctx.stroke()
    // ctx.closePath()
    // ctx.restore()
    //
    // ctx.save()
    // ctx.translate(x, y)
    // ctx.beginPath()
    // ctx.arc(effectBottomPoint_x - x, effectBottomPoint_y - y, 4, 0, 2 * Math.PI, false)
    // ctx.strokeStyle = '#ff0001'
    // ctx.stroke()
    // ctx.closePath()
    // ctx.restore()
    // //
    // ctx.save()
    // ctx.translate(x, y)
    // ctx.beginPath()
    // ctx.arc(effectPoint_x, effectPoint_y, 4, 0, 2 * Math.PI, false)
    // ctx.strokeStyle = '#ff0001'
    // ctx.stroke()
    // ctx.closePath()
    // ctx.restore()
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

// console.log(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height))

// ctx.drawImage(trim(ctx), 0, 0)

function trim(c) {
  var ctx = c,
    copy = document.createElement('canvas').getContext('2d'),
    pixels = ctx.getImageData(0, 0, c.canvas.width, c.canvas.height),
    l = pixels.data.length,
    i,
    bound = {
      top: null,
      left: null,
      right: null,
      bottom: null
    },
    x, y;

  for (i = 0; i < l; i += 4) {
    if (pixels.data[i+3] !== 0) {
      x = (i / 4) % c.canvas.width;
      y = ~~((i / 4) / c.canvas.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  var trimHeight = bound.bottom - bound.top
  var trimWidth = bound.right - bound.left
  var trimmed = c.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  // open new window with trimmed image:
  return copy.canvas;
}
