module.exports = {
    text: "摄像机和视口",
    collapsible: true,
    link: "/guide/flame/camera-and-viewport.md",
    children: [
        {
            text: "视口",
            link: "#视口",
        }, {
            text: "摄像机",
            collapsible: true,
            link: "#摄像机",
            children: [
                {
                    text: "Camera.followVector2",
                    link: "#camera-followvector2",
                }, {
                    text: "Camera.followComponent",
                    link: "#camera-followcomponent",
                }, {
                    text: "在游戏类中使用摄像机",
                    link: "#在游戏类中使用摄像机",
                }
            ]
        }
    ]
}