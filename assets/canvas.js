function randomChar() {
  var canWidth = 200
  var canHeight = 80
  var charCount = 4
  var charMinSize = 20
  var charMaxSize = 40
  var lineCount = 20
  var can = document.querySelector('canvas')
  var ctx = can.getContext('2d')
  can.width = canWidth
  can.height = canHeight
  var randomChar = createRandomChars(charCount)
  drawChars(
    randomChar,
    charMaxSize,
    charMinSize,
    canWidth,
    canHeight,
    charCount,
    ctx
  )
  drawLine(lineCount, canWidth, canHeight, ctx)
  return randomChar.join('')
}
function drawLine(lineCount, canWidth, canHeight, ctx) {
  for (var i = 0; i < lineCount; i++) {
    ctx.beginPath()
    var starX = Math.ceil(Math.random() * canWidth)
    var starY = Math.ceil(Math.random() * canHeight)
    ctx.moveTo(starX, starY)
    var endX = Math.ceil(Math.random() * canWidth)
    var endY = Math.ceil(Math.random() * canHeight)
    ctx.lineTo(endX, endY)
    var red = Math.ceil(Math.random() * 255)
    var green = Math.ceil(Math.random() * 255)
    var blue = Math.ceil(Math.random() * 255)
    ctx.strokeStyle = `rgb(${red},${green},${blue})`
    ctx.stroke()
    ctx.closePath()
  }
}
function drawChars(
  randomChar,
  charMaxSize,
  charMinSize,
  canWidth,
  canHeight,
  charCount,
  ctx
) {
  for (var index in randomChar) {
    index = Number(index)
    var char = randomChar[index]
    var fontSize =
      Math.ceil(Math.random() * (charMaxSize - charMinSize)) + charMinSize
    ctx.font = `${fontSize}px 微软雅黑`
    var red = Math.ceil(Math.random() * 255)
    var green = Math.ceil(Math.random() * 255)
    var blue = Math.ceil(Math.random() * 255)
    ctx.fillStyle = `rgb(${red},${green},${blue})`
    var charCeilSize = canWidth / charCount
    var x =
      Math.ceil(
        Math.random() *
          ((index + 1) * charCeilSize - fontSize - index * charCeilSize)
      ) +
      index * charCeilSize
    var y = Math.ceil(Math.random() * (canHeight - fontSize)) + fontSize
    ctx.fillText(char, x, y)
  }
}
function createRandomChars(charCount) {
  var charList =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  var randomChar = []
  for (var i = 0; i < charCount; i++) {
    var index = Math.floor(Math.random() * charList.length)
    var char = charList.charAt(index)
    randomChar.push(char)
  }
  return randomChar
}
