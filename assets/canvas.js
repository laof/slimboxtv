window.inputid = ''

function startCanvas() {
  //获取随机验证码
  var randomChars = randomChar()
  console.log(randomChars)
  //点击画布刷新验证码
  document.querySelector('canvas').onclick = function () {
    randomChars = randomChar()
    console.log(randomChars)
  }
}
//生成随机验证码
function randomChar() {
  //画布宽
  var canWidth = 200
  //画布高
  var canHeight = 80
  //存储随机字符数量
  var charCount = 4
  //存储字体最小尺寸
  var charMinSize = 20
  //存储字体最大尺寸
  var charMaxSize = 40
  //存储干扰线条数
  var lineCount = 20
  //获取画布对象
  var can = document.querySelector('canvas')
  //获取画笔
  var ctx = can.getContext('2d')
  //应用画布宽高
  can.width = canWidth
  can.height = canHeight
  //产生随机验证码
  var randomChar = createRandomChars(charCount)
  //绘制字符
  drawChars(
    randomChar,
    charMaxSize,
    charMinSize,
    canWidth,
    canHeight,
    charCount,
    ctx
  )
  //绘制干扰线
  drawLine(lineCount, canWidth, canHeight, ctx)
  return randomChar.join('')
}
//绘制干扰线
function drawLine(lineCount, canWidth, canHeight, ctx) {
  for (var i = 0; i < lineCount; i++) {
    ctx.beginPath()
    //确定线条起点
    //x:[0,canWidth] y:[0,canHeight]
    var starX = Math.ceil(Math.random() * canWidth)
    var starY = Math.ceil(Math.random() * canHeight)
    ctx.moveTo(starX, starY)
    //确定线条终点
    //x:[0,canWidth] y:[0,canHeight]
    var endX = Math.ceil(Math.random() * canWidth)
    var endY = Math.ceil(Math.random() * canHeight)
    ctx.lineTo(endX, endY)
    //设置干扰线颜色
    //随机red [0,255]
    var red = Math.ceil(Math.random() * 255)
    //随机green [0,255]
    var green = Math.ceil(Math.random() * 255)
    //随机blue [0,255]
    var blue = Math.ceil(Math.random() * 255)
    ctx.strokeStyle = `rgb(${red},${green},${blue})`
    //呈现
    ctx.stroke()
    ctx.closePath()
  }
}
//绘制验证码到画布上
function drawChars(
  randomChar,
  charMaxSize,
  charMinSize,
  canWidth,
  canHeight,
  charCount,
  ctx
) {
  //遍历随机字符
  for (var index in randomChar) {
    index = Number(index)
    //获取每个字符
    var char = randomChar[index]
    //随机设置字体尺寸 [charMinSize,charMaxSize]
    var fontSize =
      Math.ceil(Math.random() * (charMaxSize - charMinSize)) + charMinSize
    //设置字体尺寸
    ctx.font = `${fontSize}px 微软雅黑`
    //设置字体颜色
    //随机red [0,255]
    var red = Math.ceil(Math.random() * 255)
    //随机green [0,255]
    var green = Math.ceil(Math.random() * 255)
    //随机blue [0,255]
    var blue = Math.ceil(Math.random() * 255)
    ctx.fillStyle = `rgb(${red},${green},${blue})`
    //绘制字符到画布 x:[0,canWidth] y:[0,canHeight]
    /*
        每个字符占水平宽度最大值:canWidth/charCount
        第一个字符:
            x:[0,canWidth/charCount-fontSize]  y:[fontSize,canHeight]
        第二个字符:
            x:[canWidth/charCount,2*(canWidth/charCount)-fontSize] y:[fontSize,canHeight]
        第三个字符:
            x:[canWidth/charCount*2,3*(canWidth/charCount)-fontSize] y:[fontSize,canHeight]
        第四个字符:
            x:[canWidth/charCount*3,4*(canWidth/charCount)-fontSize] y:[fontSize,canHeight]
        */
    //获取每个字符的单元宽度
    var charCeilSize = canWidth / charCount
    //[index*(charCeilSize),(index+1)(charCeilSize)-fontSize]
    var x =
      Math.ceil(
        Math.random() *
          ((index + 1) * charCeilSize - fontSize - index * charCeilSize)
      ) +
      index * charCeilSize
    //[fontSize,canHeight]
    var y = Math.ceil(Math.random() * (canHeight - fontSize)) + fontSize
    ctx.fillText(char, x, y)
  }
}
//生成指定位数的随机字符
function createRandomChars(charCount) {
  //定义字符串，存储验证码字符
  var charList =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  //存储随机字符
  var randomChar = []
  for (var i = 0; i < charCount; i++) {
    //随机索引[0,len)
    var index = Math.floor(Math.random() * charList.length)
    //获取索引对应字符
    var char = charList.charAt(index)
    //存储随机字符
    randomChar.push(char)
  }
  return randomChar
}
