const pushbullet = require('pushbullet')
const instance = new pushbullet('o.Jc8QAOaJWyDD2AK32rV843Xf9Uo3UEYg')
let last = Date.now() / 1000
let storage = require('./storage.json')
const fs = require('fs')


function poll() {
    instance.history({ modified_after: last }, (error, response) => {
        if (!error) {
            response.pushes.forEach(push => {
                last = push.modified
                console.log(push)
                if (push.source_device_iden !== "ujwWSPb4XPEsjAKIh30ccm" && !storage.readMessages.includes(push.iden)) {
                    storage.readMessages.push(push.iden)
                    instance.note({ source_device_iden: "ujwWSPb4XPEsjAKIh30ccm" }, 'Received push!', push.body)
                }
            })
            setTimeout(poll, 500)
        } else {
            console.log(error)
            setTimeout(poll, 500)
        }
    })
}

poll()

function writeToDB() {
    fs.writeFileSync("./storage.json", JSON.stringify(storage, null, 4))
    setTimeout(writeToDB, 500)
}

writeToDB()