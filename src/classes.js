const OPT={
    line:{
        stroke:'black',
        strokeWidth:'5px'
    },
    dot:{
        radius:'8',
        fill:'red',
        strokeWidth:'5'
    }
}

const  svg = document.getElementById('svg');

class Dots{
    constructor(args){
        
        const dots=[]
        for (let i = 0; i < args.dots.length; i++) {
            const dot = args.dots[i];
            let new_dot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            new_dot.setAttribute('cx',`${dot.x}`)
            new_dot.setAttribute('cy',`${dot.y}`)
            new_dot.setAttribute('r',`${OPT.dot.radius}`)
            new_dot.setAttribute('fill',`${OPT.dot.fill}`)
            new_dot.setAttribute('stroke-width',`${OPT.dot.strokeWidth}`)
            new_dot.setAttribute('_id',`${args._id||0}`)
            new_dot.setAttribute('stroke',`transparent`)
            dots.push(new_dot)
        }
        this.dots=dots
    }
    mountDots(){
        this.dots.forEach(d=>{
            svg.appendChild(d)
        })
        return this
    }
    unmountDots(){
        this.dots.forEach(d=>{
            svg.removeChild(d)
        })
        return this
    }
}


class Curve extends Dots {
    
    constructor(args){
        super(args)

        const line = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        line.setAttribute("d",`M${args.dots[0].x} ${args.dots[0].y} Q ${args.dots[1].x} ${args.dots[1].y} ${args.dots[2].x} ${args.dots[2].y}`);
        line.setAttribute('stroke',OPT.line.stroke)
        line.setAttribute('fill','transparent')
        line.setAttribute('_id',`${args._id}`)
        line.style.strokeWidth = OPT.line.strokeWidth
        this.line=line
    }
    mountLine(){
        svg.appendChild(this.line)
        return this
    }
 
}

export {Curve,Dots}