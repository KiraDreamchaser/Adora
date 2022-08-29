const fs = require('fs')

const FILE_PATH = './resource/stuff.json'

const stuffRaw = fs.readFileSync(FILE_PATH)
let stuff
try {
    stuff = JSON.parse(stuffRaw)
} catch (e) {
    stuff = ['safety dance']
}
console.log(stuff)

// const stuff = ['Pizza', 'Car', 'Platapus', 'Hippo', 'Ardvark'];

// function getRandom(response) {
//     const thing = getRandomThing()
//     response.send(thing)
// }

function getRandomThing() {
    const thing = stuff[Math.floor(Math.random() * stuff.length)]
    return thing
}

module.exports = (app) => {
    app.get('/hello/random', (_, response) => response.send(`
    <h1>
        Hello ${getRandomThing()}!
    </h1>`))
    app.get('/hello/:name', (request, response) => {
        const name = request.params.name || 'darkness my old friend'
        response.send(`Hello ${name[0].toUpperCase()}${name.slice(1)}!`)
    })
    app.get('/random', (_, response) => response.send(getRandomThing()))

    app.get('/random/:thing', (request, response) => {
        const thing = request.params.thing
        if (thing && stuff.indexOf(thing) === -1) {
            stuff.push(thing)
            fs.writeFileSync(FILE_PATH, JSON.stringify(stuff))
        }
        response.send(getRandomThing())
    })
}