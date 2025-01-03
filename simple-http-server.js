"use strict";

let net = require("net")

let server = net.createServer()
let port = 8006

server.listen(port, () => {
  console.log("listening on port " + port)
})

let message = [] 
server.on("connection", (conn) => {
  console.log("connection")

  conn.on("data", (data) => {
    console.log("收到数据")
    let request = data.toString()
    let [header, body] = request.split("\r\n\r\n")
    let [firstLine, ...rest] = header.split("\r\n")
    let [method, path] = firstLine.split(" ")
    console.log(firstLine)
    // console.log(firstLine)
    let url = new URL("http://127.0.0.1:" + port + path)

    if (url.pathname === "/example/message.html") {
      if (method === "POST") {
        message.push(parseQueryString(body))
      }
      
      conn.write("HTTP/1.1 200 ok\r\n")
      conn.write("Content-Type: text/html\r\n")
      conn.write("\r\n")
      conn.write(`
        <form method="POST" action="/example/message.html">
        <p>Name: <input type="text" name="name"></p>
        <p>Message:<br><textarea name="message"></textarea></p>
        <p><button type="submit">Send</button>
        </form>
      `)
      for (let msg of message) {
        conn.write(`
          <fieldset>
            <legend>${msg.name}</legend>
            ${msg.message}
          </fieldset>
        `)
      }
    } else {
      conn.write("HTTP/1.1 404 Not Found\r\n")
      conn.write("Content-Type: text/html\r\n")
      conn.write("\r\n")
      conn.write(`page not found!!!`)
    }

    conn.end()

  })
})
  // /example/message.html?name=zcz&message=zxcx
  // {name: zcz message: zxcx}
function parseQueryString(body) {

  return body.split("&").reduce((obj, pair) => {
    let [name, val] = pair.split("=")
    obj[name] = encodeURIComponent(val)
    return obj
  }, {})

}
