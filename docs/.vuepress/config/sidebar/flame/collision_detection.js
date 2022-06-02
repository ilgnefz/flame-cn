module.exports = {
    text: "碰撞检测",
    collapsible: true,
    link: "/guide/flame/collision-detection.md",
    children: [
        {
            text: "Mixins",
            collapsible: true,
            link: "#mixins",
            children: [
                {
                    text: "HasCollisionDetection",
                    link: "#hascollisiondetection"
                }, {
                    text: "CollisionCallbacks",
                    link: "#collisioncallbacks"
                }
            ]
        },
        {
            text: "ShapeHitbox",
            collapsible: true,
            link: "#shapehitbox",
            children: [
                {
                    text: "CollisionType",
                    link: "#collisiontype"
                }, {
                    text: "PolygonHitbox",
                    link: "#polygonhitbox"
                }, {
                    text: "RectangleHitbox",
                    link: "#rectanglehitbox"
                }, {
                    text: "CircleHitbox",
                    link: "#circlehitbox"
                }
            ]
        }, {
            text: "ScreenHitbox",
            link: "#screenhitbox"
        }, {
            text: "CompositeHitbox",
            link: "#compositehitbox"
        }, {
            text: "BroadPhase",
            link: "#broadphase"
        }, {
            text: "与 Forge2D 的比较",
            link: "#与-forge2d-的比较"
        }, {
            text: "从 v1.0 中的碰撞侦测系统迁移",
            collapsible: true,
            link: "#从-v1.0-中的碰撞侦测系统迁移",
            children: [{
                text: "名称更改",
                link: "#名称更改"
            }]
        }, {
            text: "示例",
            link: "/guide/flame/collision-detection.md#示例"
        }
    ]
}