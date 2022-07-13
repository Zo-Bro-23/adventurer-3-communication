const net = require('net')
const fs = require('fs')
const toChunks = require('buffer-chunks')
const bufferPad = require('pad-buffer')
const crc = require('crc')
const client = net.createConnection({ port: 8899, host: '192.168.29.16' }, () => {
    const file = fs.readFileSync('./test.gx')
    let chunks = toChunks(file, 4096)
    client.write(`~M28 ${file.length} test.gx\n`)
    console.log('connected')
    client.on('data', (data) => {
        console.log(data.toString())
        if (data.toString('hex') == '434d44204d32382052656365697665642e0d0a') {
            console.log('yes')
            sendFile(client, chunks)
        }
    })
})

function sendFile(client, chunks) {
    chunks.forEach(chunk => {
        let packetCount = chunks.indexOf(chunk)
        let packetSize = chunk.length
        chunk = bufferPad.bufferPadEnd(chunk, 4096)
        let checksum = crc.crc32(chunk).toString(16)
        checksum = "00000000".substring(checksum.length) + checksum
        checksum = Buffer.from(checksum, 'hex')
        packetSize = Buffer.from(packetSize.toString(16), 'hex')
        packetSize = bufferPad.bufferPadStart(packetSize, 4)
        packetCount = Buffer.from(packetCount.toString(16), 'hex')
        packetCount = bufferPad.bufferPadStart(packetCount, 4)
        const header = Buffer.from('ZZ¥¥', 'ascii')
        client.write(Buffer.concat([header, packetCount, packetSize, checksum, chunk]))
        console.log(Buffer.concat([header, packetCount, packetSize, checksum, chunk]))
    })
    client.write('~M29\n')
}