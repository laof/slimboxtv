var local = location.hostname == 'localhost'

function home() {
  window.open('https://github.com/laof/slimboxtv')
}

function sync() {
  window.open('https://github.com/laof/slimboxtv-sync')
}

function copyTextToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('复制成功，请粘贴到迅雷去下载')
    })
    .catch((e) => {
      alert('地址解析，失败请重试')
    })
}

function render(list) {
  const arr = []

  list.forEach(({ box, cd, disk }, i) => {
    // if (i > 3) return

    const files = []

    for (let { type, link } of disk) {
      link.forEach((item, i) => {
        if (type) {
          files.push(`<p class="category">${type}</p>`)
        }
        files.push(
          `<p class="disk"><a onclick="verify('${item.href}','${box}</br>${item.name}')">${item.name}</a></p>`
        )
      })
    }

    const div = [
      '<div class="item"><div class="header"><span class="name">',
      box,
      '</span> <date>',
      cd,
      '</date></div><div class="info">',
      files.join(''),
      '</div></div>'
    ]

    arr.push(div.join(''))
  })

  if (list.length) {
  } else {
    arr.push('Oh~ Sorry, No data.')
  }

  document.querySelector('.box').innerHTML = arr.join('')
}

fetch('conf/data.json')
  .then((res) => res.json())
  .then((res) => render(res))

function cancel() {
  document.body.classList.toggle('lock')
  var dialog = document.querySelector('.dialog')
  document.body.removeChild(dialog)
}
function lock() {
  document.body.classList.toggle('lock')
}

function verify(url, name) {
  const div = document.createElement('div')
  div.className = 'dialog'
  div.innerHTML = `
  <div class="mask"></div>
  <div class="win">
    <h5 class="title">${name}</h5>
    <div class="dialog-box">
      <canvas></canvas>
      <input type="text" maxlength="10">
      <a class="check">确定</a>&nbsp;&nbsp;
      <a onclick="cancel()">退出</a>
    </div>
  </div>
  `
  document.body.appendChild(div)
  lock()

  var randomChars = randomChar()
  document.querySelector('canvas').onclick = function () {
    randomChars = randomChar()
  }

  document.querySelector('.check').onclick = function () {
    const dom = document.querySelector('input')
    const val = dom.value.toLocaleLowerCase()

    if (val == randomChars.toLocaleLowerCase() || local) {
      loading(url)
    } else {
      dom.value = ''
      randomChars = randomChar()
    }
  }
}

function loadData(url, cb) {
  // try {
  //   await fetch('https://jazzy-alfajores-2f455d.netlify.app')
  // } catch (e) {
  //   document.querySelector('.link').innerHTML = error
  //   return
  // }

  const data = {
    method: 'POST',
    body: JSON.stringify({ disk: url })
  }
  var api = 'https://slimboxtv-download.netlify.app/.netlify/functions/p3'
  return fetch(api, data)
    .then((res) => res.json())
    .then((res) => cb(res))
}

function mockData(url, cb) {
  const data = {
    error: [],
    files: [
      {
        name: 'test_download_aosp_15_4_1.7z',
        size: 783572280,
        url: 'magnet:?xt=urn:btih:31594780a8889367ae2bf5fbec218f2503a35ae4',
        modified: '2012/9/18 01:12:19'
      },
      {
        name: 'sbx_dealdig_boxd6_aosp_15_4_1.7z',
        size: 713272280,
        url: 'https://www.npmjs.com/package/litee64c26fc945bb5681f4b7d91fcc2032afa549616504c05ad0b93656c60dec80/635ab1c1/Arlo4ikbYaCSRCfmCwxQEVczWv8M8YpFDoBdoAIqzoINLZSr7w60gJP2DpWFJNaKNDUryjaONY0GW4RhGeR_wg%3D%3D?uid=0&filename=ugsbx_ugoos_x2_atv_042_9.7z&disposition=attachment&hash=ysKPQC6obIABL8sNuBMSfzDWiMVAj9NJ3xmkCKo%2BSErDQe9%2B16VZULwZb0RFX1Cnq/J6bpmRyOJonT3VoXnDag%3D%3D%3A/ugsbx_ugoos_x2_atv_042_9.7z&limit=0&content_type=application%2Fx-7z-compressed&owner_uid=40520828&fsize=776415887&hid=0ab2996e34cf1bce9168914cf0420743&media_type=compressed&tknv=v2',
        modified: '2012/9/18 01:12:19'
      },
      {
        name: 'ugsbx_ugoos_am6_encrypted_atv_042_9.7z',
        size: 783272280,
        url: 'https://www.npmjs.com/pfdas593e19964bcfed7940ea432fce5e2fc76642ebae1e8676647b68ef13d80bf76d/635ab1be/Arlo4ikbYaCSRCfmCwxQETgj6GaxQBp89_o3evMLIeE71jTN4MOAUzAEpMF_SeFGsSah89lRtI2gD00wts4FBA%3D%3D?uid=0&filename=ugsbx_ugoos_x2_encrypted_aosp_053_1.7z.uploadtmp&disposition=attachment&hash=Luo48wER2Ps7JrNm7R0LQuNjyxLVFedPCFphuGECnMHzjnhd05fXWXgMIx8rouggq/J6bpmRyOJonT3VoXnDag%3D%3D%3A/ugsbx_ugoos_x2_encrypted_aosp_053_1.7z.uploadtmp&limit=0&content_type=application%2Fx-7z-compressed&owner_uid=40520828&fsize=837194756&hid=65223fa428da7de0cddabf64e6256ca6&media_type=compressed&tknv=v2',
        modified: '2022/9/18 03:11:59'
      }
    ]
  }

  return new Promise((resolve) => resolve(cb(data)))
}

async function loading(url) {
  const error = `解析失败 <a onclick="loading('${url}')">重试</a> <a onclick="cancel()">退出</a>`

  var box = document.querySelector('.dialog-box')

  box.innerHTML = '<p>正在解析...&nbsp;&nbsp;请等待<p>'

  const get = local ? mockData : loadData

  get(url, (res) => {
    const list = []
    if (res && res.files) {
      res.files.forEach((obj, i) => {
        const mb = (obj.size / 1024 / 1024).toFixed(2) + 'M'
        if (obj.url) {
          list.push(
            `<div class="file"><p><a onclick="copyTextToClipboard('${obj.url}')">${obj.name}</a></p><info>发布于${obj.modified}</info></div>`
          )
        }
      })
    }

    if (list.length) {
      list.push('<br/><a onclick="cancel()">退出</a>')
    }

    box.innerHTML = list.length ? list.join('') : error
  }).catch((e) => {
    console.log(e)
    box.innerHTML = error
  })
}
