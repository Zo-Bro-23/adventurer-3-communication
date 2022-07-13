const pushbullet = require('pushbullet')
const instance = new pushbullet('o.Jc8QAOaJWyDD2AK32rV843Xf9Uo3UEYg')

instance.updateDevice("ujwWSPb4XPEsjAKIh30ccm", {
    nickname: "Zohan's 3D Printer",
    model: "Adventurer 3",
    manufacturer: "Flashforge",
    icon: "phone"
}, (error, response) => {
    console.log(response)
})

instance.devices((error, response) => console.log(response))