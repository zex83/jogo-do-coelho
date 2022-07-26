class Link {
    constructor  (bodyA,bodyB) {
        let lastLink = bodyA.body.bodies.length-2
        this.constraint = Constraint.create ({
            bodyA: bodyA.body.bodies [lastLink],
            bodyB: bodyB,
            length: -10,
            stiffiness: 0.01
        })
        World.add (world,this.constraint)
    }

    detach () {
        World.remove (world,this.constraint)
    }
}
