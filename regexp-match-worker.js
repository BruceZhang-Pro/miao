addEventListener("message", e => {
  let re = e.data.regexp
  let string = e.data.string
  let result = []
  let match = null
  while (match = re.exec(string)) {
    result.push(match)
    if (re.global === false) {
      break
    }
    if(match[0] === "") {
      re.lastIndex++
    }
  }
  postMessage(result)
})
