const net = require('net')
const fs = require('fs')
const toChunks = require('buffer-chunks')
const bufferPad = require('pad-buffer')
const client = net.createConnection({ port: 8899, host: '192.168.29.16' }, () => {
    ledOnOff(client)
    console.log('connected')
    client.on('data', (data) => {
        console.log(data.toString())
    })
    let chunks = []
    // fs.createReadStream('./zo-keychain.gx')
    //     .on('data', data => {
    //         chunks.push(data)
    //     })
    //     .on('end', () => {
    //         client.write(`~M28 ${Buffer.concat(chunks).length} test.gx\n`)
    //         chunks = toChunks(Buffer.concat(chunks), 4112)
    //         chunks.forEach(chunk => {
    //             chunk = bufferPad.bufferPadEnd(chunk, 4112 - chunk.length)
    //             client.write(chunk.toString())
    //         })
    //         client.write('~M29\n')
    //     })
})

function ledOnOff(client) {
    client.write('~M146 r255 g255 b255 F0\n')
    setTimeout(() => {
        client.write('~M146 r0 g0 b0 F0\n')
        setTimeout(() => ledOnOff(client), 1000)
    }, 1000)
}