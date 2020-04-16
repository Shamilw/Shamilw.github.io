// ({
//     plugins: ['jsdom-quokka-plugin'],
//     jsdom: { file: './index.html' , config:{ pretendToBeVisual: true}   },
// });

import {Curve, Dots} from './classes'

const  svg = document.getElementById('svg');

const newClicks=[]

let drag 

const initCurvedLine = new Curve({dots:[{x:20,y:100},{x:95,y:20},{x:200,y:100}],_id:12333})
initCurvedLine.mountLine().mountDots()

window.addEventListener("mousedown",mdHandler);



function mdHandler(e) {
     e.srcElement instanceof SVGCircleElement ||e.target instanceof SVGCircleElement
        ?onCircle(e) 
        :newDots(e)  
    window.addEventListener("mouseup",muHandler)
}


function newDots(e) {
        newClicks.push({x:e.clientX,y:e.clientY})
        const dot = new Dots({dots:[{x:e.clientX,y:e.clientY}]})
        dot.mountDots()

        if (newClicks.length==3) {
            const fig = new Curve({dots:newClicks,_id:Date.now()})
            fig.mountLine().mountDots()
            newClicks.splice(0)
            clearTempDots()
        } 
        
   
}


function clearTempDots() {
   svg.querySelectorAll('circle[_id="0"]').forEach(dots=>{
        svg.removeChild(dots)
    })
}

function onCircle(event) {
    drag         = event.srcElement;
    drag.x       =+event.srcElement.getAttribute("cx");
    drag.y       =+event.srcElement.getAttribute("cy");
    drag._id     = event.srcElement.getAttribute("_id");
    drag.clientX = event.clientX;
    drag.clientY = event.clientY;

    window.addEventListener("mousemove",mmHandler);    
}

function mmHandler(e){
   
    let path = document.querySelectorAll(`path[_id="${drag._id}"]`)[0]
    let [c1,c2,c3] = document.querySelectorAll(`circle[_id="${drag._id}"]`)

    let d={
        x1:+c1.getAttribute("cx"),
        y1:+c1.getAttribute("cy"),
        x2:+c2.getAttribute("cx"),
        y2:+c2.getAttribute("cy"),
        x3:+c3.getAttribute("cx"),
        y3:+c3.getAttribute("cy")
    }
    drag.setAttribute("cx",e.clientX - (drag.clientX - drag.x));
    drag.setAttribute("cy",e.clientY - (drag.clientY - drag.y));
    switch( drag ){
      case c1:
        d.x1 = +drag.getAttribute("cx");
        d.y1 = +drag.getAttribute("cy");
         break;    
      case c2:
        d.x2 = +drag.getAttribute("cx");
        d.y2 = +drag.getAttribute("cy"); 
        break;
      case c3:
        d.x3 = +drag.getAttribute("cx");
        d.y3 = +drag.getAttribute("cy"); 
        break;
    }
    path.setAttribute("d",`M${d.x1} ${d.y1} Q ${d.x2} ${d.y2} ${d.x3} ${d.y3}`);

  
  }

  function muHandler(e){
    window.removeEventListener('mousemove',mmHandler)
    window.removeEventListener("mouseup",muHandler);
  } 










 
