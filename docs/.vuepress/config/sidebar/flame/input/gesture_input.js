module.exports = {
    text: "手势输入",
    collapsible: true,
    link: "/guide/flame/inputs/gesture-input.md",
    children: [{
        text: "介绍",
        link: "/guide/flame/inputs/gesture-input.md#介绍",
    }, {
        text: "触摸和鼠标检测器",
        link: "#触摸和鼠标检测器",
    }, {
        text: "PanDetector和ScaleDetector",
        link: "#pandetector和scaledetector",
    }, {
        text: "鼠标光标",
        link: "#鼠标光标",
    }, {
        text: "事件坐标系系统",
        collapsible: true,
        link: "#事件坐标系系统",
        children: [
            {
                text: "global",
                link: "#global",
            }, {
                text: "widget",
                link: "#widget",
            }, {
                text: "game",
                link: "#game",
            }
        ]
    }, {
        text: "示例",
        link: "/guide/flame/inputs/gesture-input.md#示例",
    }, {
        text: "可点击、可拖动和可悬停组件",
        collapsible: true,
        link: "#可点击、可拖动和可悬停组件",
        children: [
            {
                text: "可点击组件",
                link: "#可点击组件",
            }, {
                text: "可拖动组件",
                link: "#可拖动组件",
            }, {
                text: "可悬停组件",
                link: "#可悬停组件",
            }, {
                text: "GestureHitboxes",
                link: "#gesturehitboxes",
            }
        ]
    }]
}