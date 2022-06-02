const forge2d = require('./forge2d')
const oxygen = require('./oxygen')

module.exports = {
    text: "其他模块",
    link: "/guide/other_modules/forge2d.md",
    collapsible: true,
    children: [
        forge2d, oxygen, {
            text: "Tiled",
            link: "/guide/other_modules/tiled.md"
        }, {
            text: "闪屏页",
            link: "/guide/other_modules/splash_screen.md"
        }
    ]
}