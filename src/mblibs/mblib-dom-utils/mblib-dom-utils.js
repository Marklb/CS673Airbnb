'use babel';

var mblibDomUtils = {};

const DRAGFLG_TOP = 1;
const DRAGFLG_RIGHT = 2;
const DRAGFLG_BOTTOM = 4;
const DRAGFLG_LEFT = 8;

const CURSORS = {};
CURSORS[DRAGFLG_TOP] = 'n-resize';
CURSORS[DRAGFLG_RIGHT] = 'e-resize';
CURSORS[DRAGFLG_BOTTOM] = 's-resize';
CURSORS[DRAGFLG_LEFT] = 'w-resize';
CURSORS[DRAGFLG_LEFT|DRAGFLG_TOP] = 'nw-resize';
CURSORS[DRAGFLG_RIGHT|DRAGFLG_TOP] = 'ne-resize';
CURSORS[DRAGFLG_LEFT|DRAGFLG_BOTTOM] = 'sw-resize';
CURSORS[DRAGFLG_RIGHT|DRAGFLG_BOTTOM] = 'se-resize';


let _printDragFlag = (num) => {
  var n = num.toString(2);
  return "0000".substr(n.length)+n;
};

const MBLIB_DOM_UTILS_PREFIX = 'mblib-dom-utils--';

const MBLIB_DOM_UTILS_CSS_CLASSNAMES = {
  CURSOR_N_RESIZE: `${MBLIB_DOM_UTILS_PREFIX}cursor-n-resize`,
  CURSOR_E_RESIZE: `${MBLIB_DOM_UTILS_PREFIX}cursor-e-resize`,
  CURSOR_S_RESIZE: `${MBLIB_DOM_UTILS_PREFIX}cursor-s-resize`,
  CURSOR_W_RESIZE: `${MBLIB_DOM_UTILS_PREFIX}cursor-w-resize`,
  CURSOR_NW_RESIZE: `${MBLIB_DOM_UTILS_PREFIX}cursor-nw-resize`,
  CURSOR_NE_RESIZE: `${MBLIB_DOM_UTILS_PREFIX}cursor-ne-resize`,
  CURSOR_SW_RESIZE: `${MBLIB_DOM_UTILS_PREFIX}cursor-sw-resize`,
  CURSOR_SE_RESIZE: `${MBLIB_DOM_UTILS_PREFIX}cursor-se-resize`
};
const _cssStyle = document.createElement('style');
_cssStyle.type = 'text/css';
_cssStyle.innerHTML = `
html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_N_RESIZE},
html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_N_RESIZE} * {
  cursor: ${CURSORS[DRAGFLG_TOP]} !important;
}

html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_E_RESIZE},
html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_E_RESIZE} * {
  cursor: ${CURSORS[DRAGFLG_RIGHT]} !important;
}

html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_S_RESIZE},
html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_S_RESIZE} * {
  cursor: ${CURSORS[DRAGFLG_BOTTOM]} !important;
}

html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_W_RESIZE},
html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_W_RESIZE} * {
  cursor: ${CURSORS[DRAGFLG_LEFT]} !important;
}

html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_NW_RESIZE},
html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_NW_RESIZE} * {
  cursor: ${CURSORS[DRAGFLG_LEFT|DRAGFLG_TOP]} !important;
}

html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_NE_RESIZE},
html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_NE_RESIZE} * {
  cursor: ${CURSORS[DRAGFLG_RIGHT|DRAGFLG_TOP]} !important;
}

html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_SW_RESIZE},
html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_SW_RESIZE} * {
  cursor: ${CURSORS[DRAGFLG_LEFT|DRAGFLG_BOTTOM]} !important;
}

html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_SE_RESIZE},
html.${MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_SE_RESIZE} * {
  cursor: ${CURSORS[DRAGFLG_RIGHT|DRAGFLG_BOTTOM]} !important;
}
`;
document.getElementsByTagName('head')[0].appendChild(_cssStyle);


const CLASSNAMES_CURSORS = {};
CLASSNAMES_CURSORS[DRAGFLG_TOP] = MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_N_RESIZE;
CLASSNAMES_CURSORS[DRAGFLG_RIGHT] = MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_E_RESIZE;
CLASSNAMES_CURSORS[DRAGFLG_BOTTOM] = MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_S_RESIZE;
CLASSNAMES_CURSORS[DRAGFLG_LEFT] = MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_W_RESIZE;
CLASSNAMES_CURSORS[DRAGFLG_LEFT|DRAGFLG_TOP] = MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_NW_RESIZE;
CLASSNAMES_CURSORS[DRAGFLG_RIGHT|DRAGFLG_TOP] = MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_NE_RESIZE;
CLASSNAMES_CURSORS[DRAGFLG_LEFT|DRAGFLG_BOTTOM] = MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_SW_RESIZE;
CLASSNAMES_CURSORS[DRAGFLG_RIGHT|DRAGFLG_BOTTOM] = MBLIB_DOM_UTILS_CSS_CLASSNAMES.CURSOR_SE_RESIZE;

/**
 *
 */
let _resetCursor = () => {
  for(let i = 0; i < Object.keys(CLASSNAMES_CURSORS).length; i++){
    let cn = CLASSNAMES_CURSORS[Object.keys(CLASSNAMES_CURSORS)[i]];
    document.getElementsByTagName('html')[0].classList.remove(cn);
  }
};



document._mbLibDomUtilsData = {};
if(!document._mbLibDomUtilsData) document._mbLibDomUtilsData = [];
let _GetData = (element) => {
  if(!element){
    return document._mbLibDomUtilsData;
  }else{
    if(!element._mbLibDomUtilsData) element._mbLibDomUtilsData = {};
    return element._mbLibDomUtilsData;
  }
};

// Library globals
_GetData().isDragging = false;
_GetData().resizableElements = [];

mblibDomUtils._GetData = _GetData;


let _fireEvent = (element, eventName) => {
  if(!_GetData(element).event){_GetData(element).event={}}
  if(_GetData(element).event[eventName]){
    _GetData(element).event[eventName]();
  }
};

mblibDomUtils.events = {};
mblibDomUtils.events.on = (element, eventName, cb) => {
  if(!_GetData(element).event){_GetData(element).event={}}
  if(_GetData(element).event[eventName]){
    console.log(`[MBLIB_ERROR]: 'on' event ${eventName} already exists.`);
  }
  _GetData(element).event[eventName] = cb;
}; 


/**
 *
 */
let _GetElementBoundsTop = (element) => {
  let bounds = element.getBoundingClientRect();
  return {
    x: bounds.x,
    y: bounds.y,
    w: bounds.width,
    h: _GetData(element).top.tolerance,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.top + _GetData(element).top.tolerance,
    left: bounds.left
  }
};
let _GetElementBoundsRight = (element) => {
  let bounds = element.getBoundingClientRect();
  return {
    x: bounds.right - _GetData(element).right.tolerance,
    y: bounds.top,
    w: _GetData(element).right.tolerance,
    h: bounds.bottom - bounds.top,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom,
    left: bounds.right - _GetData(element).right.tolerance
  }
};
let _GetElementBoundsBottom = (element) => {
  let bounds = element.getBoundingClientRect();
  return {
    x: bounds.left,
    y: bounds.bottom,
    w: bounds.right - bounds.left,
    h: _GetData(element).bottom.tolerance,
    top: bounds.bottom - _GetData(element).bottom.tolerance,
    right: bounds.right,
    bottom: bounds.bottom,
    left: bounds.left
  }
};
let _GetElementBoundsLeft = (element) => {
  let bounds = element.getBoundingClientRect();
  return {
    x: bounds.left,
    y: bounds.top,
    w: _GetData(element).left.tolerance,
    h: bounds.height,
    top: bounds.top,
    right: bounds.left + _GetData(element).right.tolerance,
    bottom: bounds.bottom,
    left: bounds.left
  }
};

let _isDragging = (element) => {
  if(element){
    return (_GetData(element).top.isDragging
      || _GetData(element).right.isDragging
      || _GetData(element).bottom.isDragging
      || _GetData(element).left.isDragging);
    }else{
      let dragging = false;
      for(let i = 0; i < _GetData().resizableElements.length; i++){
        if(_isDragging(_GetData().resizableElements[i])){
          dragging = true;
        }
      }
      return dragging;
    }
};

/**
 * p: Point
 * r: Rectangle
 */
let isPointInBounds = (p, r) => {
  if(p.x >= r.left && p.x < r.right && p.y >= r.top && p.y < r.bottom){
    return true;
  }else{
    return false;
  }
};

/**
 *
 */
let isPointInElementsResizeBounds = (point, element) => {
  let r = getElementResizeBounds(element);
  return isPointInBounds(point, r);
};

/**
 *
 */
let getElementResizeBounds = (element) => {
  let boundsTop = _GetElementBoundsTop(element);
  let boundsRight = _GetElementBoundsRight(element);
  let boundsBottom = _GetElementBoundsBottom(element);
  let boundsLeft = _GetElementBoundsLeft(element);

  return {
    top: boundsTop.top,
    right: boundsRight.right,
    bottom: boundsBottom.bottom,
    left: boundsLeft.left
  };
};

/**
 *
 */
let getOverlappedBoundsOfElements = (element1, element2) => {
  // IDEA: If performance isn't affected to much then check if the element are
  //        actually overlapped
  let b1 = getElementResizeBounds(element1);
  let b2 = getElementResizeBounds(element2);
  return {
    top: Math.max(b1.top, b2.top),
    right: Math.min(b1.right, b2.right),
    bottom: Math.min(b1.bottom, b2.bottom),
    left: Math.max(b1.left, b2.left)
  };
};

/**
 *
 */
let getDraggableElementsAtPoint = (point) => {
  let elems = [];
  for(let i = 0; i < _GetData().resizableElements.length; i++){
    let element = _GetData().resizableElements[i];
    if(isPointInElementsResizeBounds(point, element)){
      elems.push(element);
    }
  }

  // Debugger
  // if(window._mbLibDebugger){
  //   let grp = window._mbLibDebugger.getGroup('hovered-drag-elments').content;
  //   let grpItm = grp.querySelector('.hovered-elems');
  //   if(!grpItm){
  //     grpItm = document.createElement('div');
  //     grpItm.classList.add('hovered-elems');
  //     grp.appendChild(grpItm);
  //   }

  //   let ovStr = '';
  //   // if(elems.length >= 2){
  //   //   let ov = getOverlappedBoundsOfElements(elems[0], elems[1]);
  //   //   ovStr = `(${ov.top}, ${ov.right}, ${ov.bottom}, ${ov.left})`;
  //   //
  //   //   // let ovElem = document.querySelector('.overlap');
  //   //   // ovElem.style.left = `${ov.left}px`;
  //   //   // ovElem.style.top = `${ov.top}px`;
  //   //   // ovElem.style.width = `${ov.right - ov.left}px`;
  //   //   // ovElem.style.height = `${ov.bottom - ov.top}px`;
  //   // }

  //   if(elems.length > 1) {
  //     let topArr = [];
  //     let rightArr = [];
  //     let bottomArr = [];
  //     let leftArr = [];
  //     for(let i = 0; i < elems.length; i++){
  //       let resizeBounds = getElementResizeBounds(elems[i]);
  //       topArr.push(resizeBounds.top);
  //       rightArr.push(resizeBounds.right);
  //       bottomArr.push(resizeBounds.bottom);
  //       leftArr.push(resizeBounds.left);
  //     }
  //     let ovT = {
  //       top: Math.max.apply(null, topArr),
  //       right: Math.min.apply(null, rightArr),
  //       bottom: Math.min.apply(null, bottomArr),
  //       left: Math.max.apply(null, leftArr)
  //     };
  //     let ovElem = document.querySelector('.overlap');
  //     ovElem.style.left = `${ovT.left}px`;
  //     ovElem.style.top = `${ovT.top}px`;
  //     ovElem.style.width = `${ovT.right - ovT.left}px`;
  //     ovElem.style.height = `${ovT.bottom - ovT.top}px`;
  //     let x = (ovT.left + ((ovT.right - ovT.left)/2));
  //     let y = (ovT.top + ((ovT.bottom - ovT.top)/2));
  //     ovStr = `(${x}, ${y})`;

  //     let topElem = document.elementFromPoint(x, y);
  //     ovStr += ` ${topElem.className}`;
  //   }

  //   // grpItm.innerHTML = `Num: </br>${elems.length}`;
  //   grpItm.innerHTML = `Mouse: (${point.x}, ${point.y})</br>`;
  //   grpItm.innerHTML += `Top: ${ovStr}</br>`;
  //   for(let i = 0; i < elems.length; i++){
  //     // if(i > 0){
  //     //   let ov = getOverlappedBoundsOfElements(elems[i-1], elems[i]);
  //     //   let ovElem = document.querySelector('.overlap');
  //     //   ovElem.style.left = `${ov.left}px`;
  //     //   ovElem.style.top = `${ov.top}px`;
  //     //   ovElem.style.width = `${ov.right - ov.left}px`;
  //     //   ovElem.style.height = `${ov.bottom - ov.top}px`;
  //     // }

  //     let resizeBounds = getElementResizeBounds(elems[i]);
  //     // console.log(resizeBounds);
  //     let bStr = `(${resizeBounds.top}, ${resizeBounds.right}, ${resizeBounds.bottom}, ${resizeBounds.left})`;
  //     grpItm.innerHTML += `${elems[i].className} ${bStr}</br>`;
  //   }
  // }
};


//-----------------------------------------------------------------------------
// Make Element Resizable
//-----------------------------------------------------------------------------

mblibDomUtils.makeElementResizable = (element, opts={}) => {
  // console.log('makeElementResizable');

  if(_GetData().resizableElements === undefined){
    _GetData().resizableElements = [];
  }
  _GetData().resizableElements.push(element);
  _GetData(element).top = {
    tolerance: (opts.tolerance_top)? opts.tolerance_top : 3,
    isDragging: false
  };
  _GetData(element).right = {
    tolerance: (opts.tolerance_right)? opts.tolerance_right : 3,
    isDragging: false
  };
  _GetData(element).bottom = {
    tolerance: (opts.tolerance_bottom)? opts.tolerance_bottom : 3,
    isDragging: false
  };
  _GetData(element).left = {
    tolerance: (opts.tolerance_left)? opts.tolerance_left : 3,
    isDragging: false
  };


};


document.addEventListener('mousemove', (e) => {
  // console.log(e);
  if(_GetData().isDragging === true) return;
  if(!_GetData().resizableElements) return;

  // console.log(element);
  let pt = {x: e.clientX, y: e.clientY}

  if(!_GetData().resizableElements) return;

  let isOverAny = false;
  for(let i = 0; i < _GetData().resizableElements.length; i++){
    let element = _GetData().resizableElements[i];

    // // Check if there is another element on top of the element
    getDraggableElementsAtPoint(pt);
    let topElem = document.elementFromPoint(pt.x, pt.y);
    if(element !== topElem && !_isDragging()) continue;


    let dragFlag = 0;
    // ----------------------------------------------
    // Top
    // ----------------------------------------------
    let isOverTop = isPointInBounds(pt, _GetElementBoundsTop(element));
    // Check if already dragging
    if(_GetData(element).top.isDragging === false){
      // If not dragging
      if(isOverTop){dragFlag |= DRAGFLG_TOP;}
    }else{
      // If dragging
      // console.log('dragging top');
      // console.log(element);
      let startMouseY = _GetData(element).startMouseY;
      let dist = e.clientY - startMouseY;
      let newY = _GetData(element).startY + dist;
      let newH = _GetData(element).startH - dist;
      if(newH < 0){
        newY = _GetData(element).startY + _GetData(element).startH;
        newH = 0;
      }
      // console.log(`startsMouseY: ${startMouseY}, ${dist}, ${newY}`);
      element.style.top = newY+'px';
      element.style.height = newH+'px';
    }

    // ----------------------------------------------
    // Right
    // ----------------------------------------------
    let isOverRight = isPointInBounds(pt, _GetElementBoundsRight(element));
    // Check if already dragging
    if(_GetData(element).right.isDragging === false){
      // If not dragging
      if(isOverRight){dragFlag |= DRAGFLG_RIGHT;}
    }else{
      // If dragging
      let startMouseX = _GetData(element).startMouseX;
      let dist = e.clientX - startMouseX;
      let newW = _GetData(element).startW + dist;
      if(newW < 0){
        newW = 0;
      }
      // console.log(`startsMouseY: ${startMouseY}, ${dist}, ${newY}`);
      element.style.width = newW+'px';
    }

    // ----------------------------------------------
    // Bottom
    // ----------------------------------------------
    let isOverBottom = isPointInBounds(pt, _GetElementBoundsBottom(element));
    // Check if already dragging
    if(_GetData(element).bottom.isDragging === false){
      // If not dragging
      if(isOverBottom){dragFlag |= DRAGFLG_BOTTOM;}
    }else{
      // If dragging
      // console.log('dragging');
      let startMouseY = _GetData(element).startMouseY;
      let dist = e.clientY - startMouseY;
      let newH = _GetData(element).startH + dist;
      if(newH < 0){
        newH = 0;
      }
      // console.log(`startsMouseY: ${startMouseY}, ${dist}, ${newY}`);
      element.style.height = newH+'px';
    }

    // ----------------------------------------------
    // Left
    // ----------------------------------------------
    let isOverLeft = isPointInBounds(pt, _GetElementBoundsLeft(element));
    // Check if already dragging
    if(_GetData(element).left.isDragging === false){
      // If not dragging
      if(isOverLeft){dragFlag |= DRAGFLG_LEFT;}
    }else{
      // If dragging
      // console.log('dragging left');
      // console.log(element);
      let startMouseX = _GetData(element).startMouseX;
      let dist = e.clientX - startMouseX;
      let newX = _GetData(element).startX + dist;
      let newW = _GetData(element).startW - dist;
      if(newW < 0){
        newX = _GetData(element).startX + _GetData(element).startW;
        newW = 0;
      }
      // console.log(`startsMouseX: ${startMouseX}, ${dist}, ${newX}`);
      element.style.left = newX+'px';
      element.style.width = newW+'px';

    }
    
    // Set the cursor
    // let cursor = CURSORS[dragFlag];
    // document.body.style.cursor = (cursor)? cursor : '';
    // if(dragFlag !== 0) return;


    if(!_isDragging()){
      let cursorClassName = CLASSNAMES_CURSORS[dragFlag];
      if(cursorClassName){
        document.getElementsByTagName('html')[0].classList.add(cursorClassName);
        // didSetCursor = true;
      }else{
        _resetCursor();
      }
      if(dragFlag !== 0){
        isOverAny = true;
        break;
      }
    }else{
      _fireEvent(element, 'resize');
    }

  }

  

  if(!_isDragging() && !isOverAny){
    _resetCursor();
  }

});

let _resizableElementsOnLMouseDown = (e) => {
  if(!_GetData().resizableElements) return;

  let didDrag = false;
  let pt = {x: e.clientX, y: e.clientY}

  for(let i = 0; i < _GetData().resizableElements.length; i++){
    let element = _GetData().resizableElements[i];
    // console.log(element);
    if(_isDragging(element)){
      return;
    }
    // console.log('dragging');

    // Check if there is another element on top of the element
    let topElem = document.elementFromPoint(pt.x, pt.y);
    if(element !== topElem) continue;

    // ----------------------------------------------
    // Top
    // ----------------------------------------------
    let isOverTop = isPointInBounds(pt, _GetElementBoundsTop(element));
    // Check if already dragging
    if(_GetData(element).top.isDragging === false){
      // If not dragging
      if(isOverTop){
        _GetData(element).startMouseY = e.clientY;
        _GetData(element).startY = element.offsetTop;
        let b = element.getBoundingClientRect();
        _GetData(element).startH = b.bottom - b.top;
        _GetData(element).top.isDragging = true;
      }
    }else{
      // If dragging
      // console.log('dragging');
      // element.style.top = e.clientY+'px';
      didDrag = true;
    }

    // ----------------------------------------------
    // Right
    // ----------------------------------------------
    let isOverRight = isPointInBounds(pt, _GetElementBoundsRight(element));
    // Check if already dragging
    if(_GetData(element).right.isDragging === false){
      // If not dragging
      if(isOverRight){
        _GetData(element).startMouseX = e.clientX;
        let b = element.getBoundingClientRect();
        _GetData(element).startW = b.right - b.left;
        _GetData(element).right.isDragging = true;
      }
    }else{
      // If dragging
      // console.log('dragging click right');
      didDrag = true;
    }

    // ----------------------------------------------
    // Bottom
    // ----------------------------------------------
    let isOverBottom = isPointInBounds(pt, _GetElementBoundsBottom(element));
    // Check if already dragging
    if(_GetData(element).bottom.isDragging === false){
      // If not dragging
      if(isOverBottom){
        _GetData(element).startMouseY = e.clientY;
        let b = element.getBoundingClientRect();
        _GetData(element).startH = b.bottom - b.top;
        _GetData(element).bottom.isDragging = true;
      }
    }else{
      // If dragging
      // console.log('dragging');
      didDrag = true;
    }

    // ----------------------------------------------
    // Left
    // ----------------------------------------------
    // console.log('Clicked');
    let isOverLeft = isPointInBounds(pt, _GetElementBoundsLeft(element));
    // console.log(isOverLeft);
    // Check if already dragging
    if(_GetData(element).left.isDragging === false){
      // If not dragging
      if(isOverLeft){
        // console.log('Set left');
        _GetData(element).startMouseX = e.clientX;
        _GetData(element).startX = element.offsetLeft;
        let b = element.getBoundingClientRect();
        _GetData(element).startW = b.right - b.left;
        _GetData(element).left.isDragging = true;
      }
    }else{
      // If dragging
      // console.log('dragging Left');
      didDrag = true;
    }
  }

  if(didDrag){
    e.stopPropagation();
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  // e.preventDefault();
};


document.addEventListener('mousedown', (e) => {
  // console.log('mousedown');
  if(_GetData().isDragging === true) return;

  if(e.button == 0){
    _resizableElementsOnLMouseDown(e);
  }
});

document.addEventListener('mouseup', (e) => {
  // console.log('mouseup');
  if(!_GetData().resizableElements) return;

  for(let i = 0; i < _GetData().resizableElements.length; i++){
    let element = _GetData().resizableElements[i];
    _GetData(element).top.isDragging = false;
    _GetData(element).right.isDragging = false;
    _GetData(element).bottom.isDragging = false;
    _GetData(element).left.isDragging = false;
  }
});




//-----------------------------------------------------------------------------
// Make Element Draggable
//-----------------------------------------------------------------------------
mblibDomUtils.makeElementDraggable = (element, elementToMove = null) => {
  if(elementToMove === null){elementToMove = element;}
  _GetData(elementToMove).isDragging = false;

  let onLMouseDown = (e) => {
    console.log(elementToMove);
    _GetData().isDragging = true;
    _GetData(elementToMove).startMouseX = e.clientX;
    _GetData(elementToMove).startMouseY = e.clientY;
    _GetData(elementToMove).startX = elementToMove.offsetLeft;
    _GetData(elementToMove).startY = elementToMove.offsetTop;
    // let b = elementToMove.getBoundingClientRect();
    // _GetData(elementToMove).startH = b.bottom - b.top;
    _GetData(elementToMove).isDragging = true;
  };

  let onRMouseDown = (e) => {

  };

  let onLMouseUp = (e) => {

  };

  let onRMouseUp = (e) => {

  };

  let onMouseMove = (e) => {
    if(_GetData(elementToMove).isDragging === true){
      let startMouseX = _GetData(elementToMove).startMouseX;
      let startMouseY = _GetData(elementToMove).startMouseY;
      let distX = e.clientX - startMouseX;
      let distY = e.clientY - startMouseY;
      let newX = _GetData(elementToMove).startX + distX;
      let newY = _GetData(elementToMove).startY + distY;
      // console.log(`startsMouseY: ${startMouseY}, ${dist}, ${newY}`);
      elementToMove.style.left = newX+'px';
      elementToMove.style.top = newY+'px';
    }
  };

  document.addEventListener('mousedown', (e) => {
    if(_isDragging() === true)return;
    let elemAtMouse = document.elementFromPoint(e.clientX, e.clientY);
    if(elemAtMouse != element) return;

    if(e.button === 0){
      onLMouseDown(e);
    }else if(e.button === 2){
      onRMouseDown(e);
    }
  });

  document.addEventListener('mouseup', (e) => {
    if(e.button === 0){
      onLMouseUp(e);
    }else if(e.button === 2){
      onRMouseUp(e);
    }
    _GetData(elementToMove).isDragging = false;
    _GetData().isDragging = false;
  });

  document.addEventListener('mousemove', (e) => {
    onMouseMove(e);
  });
}





//-----------------------------------------------------------------------------
// Draggable Items List
//-----------------------------------------------------------------------------
// mblibDomUtils.




//-----------------------------------------------------------------------------
// Make Element Resizable(OLD)
//-----------------------------------------------------------------------------
mblibDomUtils.makeElementResizable_old = (element) => {
  console.log('making element resizable');
  console.log(element);
  // element.addEventListener('mousedown', (e) => {
  //   // console.log(e);
  // });

  const css = `
    <style>
    .mb-drag-controls .mb-drag-bar {

    }
    .mb-drag-controls .mb-drag-bar:hover {

    }

    .mb-drag-controls .mb-drag-bar.top {
      // background-color: rgba(50,40,90,1);
      background-color: rgba(150,40,90,1);
    }
    .mb-drag-controls .mb-drag-bar.top:hover {
      background-color: rgba(0,200,0,1);
      cursor: n-resize;
    }

    .mb-drag-controls .mb-drag-bar.right {
      // background-color: rgba(50,40,90,1);
      background-color: rgba(150,40,90,1);
    }
    .mb-drag-controls .mb-drag-bar.right:hover {
      cursor: e-resize;
    }

    .mb-drag-controls .mb-drag-bar.bottom {
      // background-color: rgba(50,40,90,1);
      background-color: rgba(150,40,90,1);
    }
    .mb-drag-controls .mb-drag-bar.bottom:hover {
      cursor: s-resize;
    }

    .mb-drag-controls .mb-drag-bar.left {
      // background-color: rgba(50,40,90,1);
      background-color: rgba(150,40,90,1);
    }
    .mb-drag-controls .mb-drag-bar.left:hover {
      cursor: w-resize;
    }


    .mb-drag-controls .mb-drag-bar.top-left {
      // background-color: rgba(50,40,90,1);
      // background-color: rgba(150,40,90,1);
      // background-color: rgba(0,250,0,1);
    }
    .mb-drag-controls .mb-drag-bar.top-left:hover {
      cursor: nw-resize;
    }

    .mb-drag-controls .mb-drag-bar.top-right {
      // background-color: rgba(50,40,90,1);
      // background-color: rgba(150,40,90,1);
      // background-color: rgba(0,250,0,1);
    }
    .mb-drag-controls .mb-drag-bar.top-right:hover {
      cursor: ne-resize;
    }

    .mb-drag-controls .mb-drag-bar.bottom-left {
      // background-color: rgba(50,40,90,1);
      // background-color: rgba(150,40,90,1);
      // background-color: rgba(0,250,0,1);
    }
    .mb-drag-controls .mb-drag-bar.bottom-left:hover {
      cursor: sw-resize;
    }

    .mb-drag-controls .mb-drag-bar.bottom-right {
      // background-color: rgba(50,40,90,1);
      // background-color: rgba(150,40,90,1);
      // background-color: rgba(0,250,0,1);
    }
    .mb-drag-controls .mb-drag-bar.bottom-right:hover {
      cursor: se-resize;
    }
    </style>
  `;
  var style = document.createElement('style');
  style.type = 'text/css';
  // style.innerHTML = '.cssClass { color: #F00; }';
  style.innerHTML = css;
  // document.getElementsByTagName('head')[0].appendChild(style);

  let dragControls = document.createElement('div');
  dragControls.appendChild(style);
  dragControls.classList.add('mb-drag-controls');
  // dragControls.style.backgroundColor = 'rgba(0,255,0,0.2)';
  dragControls.style.position = 'absolute';
  dragControls.style.top = '-3px';
  dragControls.style.right = '-3px';
  dragControls.style.bottom = '-3px';
  dragControls.style.left = '-3px';
  // dragControls.style.top = '-10px';
  // dragControls.style.right = '-10px';
  // dragControls.style.bottom = '-10px';
  // dragControls.style.left = '-10px';
  dragControls.style.zIndex = '-1';
  element.appendChild(dragControls);

  let dragBarTop = document.createElement('div');
  dragBarTop.classList.add('mb-drag-bar');
  dragBarTop.classList.add('top');
  dragBarTop.style.position = 'absolute';
  dragBarTop.style.top = '0px';
  dragBarTop.style.right = '3px';
  // dragBarTop.style.bottom = '0px';
  dragBarTop.style.left = '3px';
  // dragBarTop.style.width = '5px';
  dragBarTop.style.height = '3px';
  // dragBarTop.style.backgroundColor = 'rgba(0,0,0,1)';
  dragControls.appendChild(dragBarTop);

  let dragBarRight = document.createElement('div');
  dragBarRight.classList.add('mb-drag-bar');
  dragBarRight.classList.add('right');
  dragBarRight.style.position = 'absolute';
  dragBarRight.style.top = '3px';
  dragBarRight.style.right = '0px';
  dragBarRight.style.bottom = '3px';
  // dragBarRight.style.left = '0px';
  dragBarRight.style.width = '3px';
  // dragBarRight.style.height = '10px';
  // dragBarRight.style.backgroundColor = 'rgba(0,0,0,1)';
  dragControls.appendChild(dragBarRight);

  let dragBarBottom = document.createElement('div');
  dragBarBottom.classList.add('mb-drag-bar');
  dragBarBottom.classList.add('bottom');
  dragBarBottom.style.position = 'absolute';
  // dragBarBottom.style.top = '0px';
  dragBarBottom.style.right = '3px';
  dragBarBottom.style.bottom = '0px';
  dragBarBottom.style.left = '3px';
  // dragBarBottom.style.width = '5px';
  dragBarBottom.style.height = '3px';
  // dragBarBottom.style.backgroundColor = 'rgba(0,0,0,1)';
  dragControls.appendChild(dragBarBottom);

  let dragBarLeft = document.createElement('div');
  dragBarLeft.classList.add('mb-drag-bar');
  dragBarLeft.classList.add('left');
  dragBarLeft.style.position = 'absolute';
  dragBarLeft.style.top = '3px';
  // dragBarLeft.style.right = '0px';
  dragBarLeft.style.bottom = '3px';
  dragBarLeft.style.left = '0px';
  dragBarLeft.style.width = '3px';
  // dragBarLeft.style.height = '10px';
  // dragBarLeft.style.backgroundColor = 'rgba(0,0,0,1)';
  dragControls.appendChild(dragBarLeft);

  //
  //
  //
  let dragBarTL = document.createElement('div');
  dragBarTL.classList.add('mb-drag-bar');
  dragBarTL.classList.add('top-left');
  dragBarTL.style.position = 'absolute';
  dragBarTL.style.top = '0px';
  // dragBarTL.style.right = '0px';
  // dragBarTL.style.bottom = '3px';
  dragBarTL.style.left = '0px';
  dragBarTL.style.width = '3px';
  dragBarTL.style.height = '3px';
  // dragBarTL.style.backgroundColor = 'rgba(0,250,0,1)';
  dragControls.appendChild(dragBarTL);

  let dragBarTR = document.createElement('div');
  dragBarTR.classList.add('mb-drag-bar');
  dragBarTR.classList.add('top-right');
  dragBarTR.style.position = 'absolute';
  dragBarTR.style.top = '0px';
  dragBarTR.style.right = '0px';
  // dragBarTR.style.bottom = '3px';
  // dragBarTR.style.left = '0px';
  dragBarTR.style.width = '3px';
  dragBarTR.style.height = '3px';
  // dragBarTR.style.backgroundColor = 'rgba(0,250,0,1)';
  dragControls.appendChild(dragBarTR);

  let dragBarBL = document.createElement('div');
  dragBarBL.classList.add('mb-drag-bar');
  dragBarBL.classList.add('bottom-left');
  dragBarBL.style.position = 'absolute';
  // dragBarBL.style.top = '0px';
  // dragBarBL.style.right = '0px';
  dragBarBL.style.bottom = '0px';
  dragBarBL.style.left = '0px';
  dragBarBL.style.width = '3px';
  dragBarBL.style.height = '3px';
  // dragBarBL.style.backgroundColor = 'rgba(0,250,0,1)';
  dragControls.appendChild(dragBarBL);

  let dragBarBR = document.createElement('div');
  dragBarBR.classList.add('mb-drag-bar');
  dragBarBR.classList.add('bottom-right');
  dragBarBR.style.position = 'absolute';
  // dragBarBR.style.top = '0px';
  dragBarBR.style.right = '0px';
  dragBarBR.style.bottom = '0px';
  // dragBarBR.style.left = '0px';
  dragBarBR.style.width = '3px';
  dragBarBR.style.height = '3px';
  // dragBarBR.style.backgroundColor = 'rgba(0,250,0,1)';
  dragControls.appendChild(dragBarBR);


  dragControls._mbElementUtilsData = {
    elements: {
      dragControls: dragControls,
      dragBarTop: dragBarTop,
      dragBarRight: dragBarRight,
      dragBarBottom: dragBarBottom,
      dragBarLeft: dragBarLeft,
      dragBarTL: dragBarTL,
      dragBarTR: dragBarTR,
      dragBarBL: dragBarBL,
      dragBarBR: dragBarBR
    }
  };

  // Object.defineProperty(element._mbElementUtilsData.elements., 'temperature', {
  //   get: function() {
  //     console.log('get!');
  //     return temperature;
  //   },
  //   set: function(value) {
  //     temperature = value;
  //     archive.push({ val: temperature });
  //   }
  // });


  if(!window._mbElementUtils) window._mbElementUtils = [];
  window._mbElementUtils.draggingList = [];
  document.addEventListener('mousemove', (e) => {
    // console.log(e);
    let list = window._mbElementUtils.draggingList;
    let shouldFix = false;
    for(let i = 0; i < list.length; i++){
      let elem = list[i];
      console.dir(elem);
      elem._mbDragVars.dragFunc(e, elem);
      if(elem.classList.contains('bottom')){
        shouldFix = true;
      }
    }
    if(shouldFix && list.length > 0){
      let p = list[0].parentElement;
      if(p.upFix){
        p.upFix();
      }
    }
    if(list.length > 0){
      e.stopPropagation();
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  });

  document.addEventListener('mouseup', (e) => {
    console.log(e);
    window._mbElementUtils.draggingList = [];
  });

  dragControls.addEventListener('mousemove', (e) => {
    console.log(e);
  });
  let _dragbarTopFunc = (e) => {
    let parentElement = dragBarTop.parentElement.parentElement;
    let parentElemRect = parentElement.getBoundingClientRect();
    let offsetY   = parentElemRect.top - e.clientY;

    dragBarTop._mbDragVars.offsetY = offsetY;
    window._mbElementUtils.draggingList.push(dragBarTop);
  };
  // dragBarTop.addEventListener('mousedown', (e) => {
  document.addEventListener('mousedown', (e) => {
    let bounds = dragBarTop.getBoundingClientRect();
    console.log('down');
    console.log(bounds);
    console.log(e);
    let x = bounds.left;
    let y = bounds.top;
    let w = bounds.right - bounds.left;
    let h = bounds.bottom - bounds.top;
    console.log(`x: ${e.x}, y: ${e.y}`);
    console.log(`x: ${x}, y: ${y}, w: ${w}, h: ${h}`);
    if(e.x >= x && e.x <= x+w && e.y >= y && e.y <= y+h){
      console.log('clicked in');
      _dragbarTopFunc(e);
    }
  });

  dragBarRight.addEventListener('mousedown', (e) => {
    let parentElement = e.target.parentElement.parentElement;
    let parentElemRect = parentElement.getBoundingClientRect();
    let offsetX   = parentElemRect.right - e.clientX;

    e.target._mbDragVars.offsetX = offsetX;
    window._mbElementUtils.draggingList.push(e.target);
  });
  dragBarBottom.addEventListener('mousedown', (e) => {
    let parentElement = e.target.parentElement.parentElement;
    let parentElemRect = parentElement.getBoundingClientRect();
    let offsetY   = parentElemRect.bottom - e.clientY;


    e.target._mbDragVars.offsetY = offsetY;
    window._mbElementUtils.draggingList.push(e.target);
  });
  dragBarLeft.addEventListener('mousedown', (e) => {
    let parentElement = e.target.parentElement.parentElement;
    let parentElemRect = parentElement.getBoundingClientRect();
    let offsetX   = parentElemRect.left - e.clientX;

    e.target._mbDragVars.offsetX = offsetX;
    window._mbElementUtils.draggingList.push(e.target);
  });



  dragBarTL.addEventListener('mousedown', (e) => {
    let elements = e.target.parentElement._mbElementUtilsData.elements;

    let parentElement = e.target.parentElement.parentElement;
    let parentElemRect = parentElement.getBoundingClientRect();
    let offsetY   = parentElemRect.top - e.clientY;
    let offsetX   = parentElemRect.left - e.clientX;

    elements.dragBarLeft._mbDragVars.offsetX = offsetX;
    window._mbElementUtils.draggingList.push(elements.dragBarLeft);
    elements.dragBarTop._mbDragVars.offsetY = offsetY;
    window._mbElementUtils.draggingList.push(elements.dragBarTop);
  });

  dragBarTR.addEventListener('mousedown', (e) => {
    let elements = e.target.parentElement._mbElementUtilsData.elements;

    let parentElement = e.target.parentElement.parentElement;
    let parentElemRect = parentElement.getBoundingClientRect();
    let offsetY   = parentElemRect.top - e.clientY;
    let offsetX   = parentElemRect.right - e.clientX;

    elements.dragBarRight._mbDragVars.offsetX = offsetX;
    window._mbElementUtils.draggingList.push(elements.dragBarRight);
    elements.dragBarTop._mbDragVars.offsetY = offsetY;
    window._mbElementUtils.draggingList.push(elements.dragBarTop);
  });

  dragBarBL.addEventListener('mousedown', (e) => {
    let elements = e.target.parentElement._mbElementUtilsData.elements;

    let parentElement = e.target.parentElement.parentElement;
    let parentElemRect = parentElement.getBoundingClientRect();
    let offsetY   = parentElemRect.bottom - e.clientY;
    let offsetX   = parentElemRect.left - e.clientX;

    elements.dragBarLeft._mbDragVars.offsetX = offsetX;
    window._mbElementUtils.draggingList.push(elements.dragBarLeft);
    elements.dragBarBottom._mbDragVars.offsetY = offsetY;
    window._mbElementUtils.draggingList.push(elements.dragBarBottom);
  });

  dragBarBR.addEventListener('mousedown', (e) => {
    let elements = e.target.parentElement._mbElementUtilsData.elements;

    let parentElement = e.target.parentElement.parentElement;
    let parentElemRect = parentElement.getBoundingClientRect();
    let offsetY   = parentElemRect.bottom - e.clientY;
    let offsetX   = parentElemRect.right - e.clientX;

    elements.dragBarRight._mbDragVars.offsetX = offsetX;
    window._mbElementUtils.draggingList.push(elements.dragBarRight);
    elements.dragBarBottom._mbDragVars.offsetY = offsetY;
    window._mbElementUtils.draggingList.push(elements.dragBarBottom);
  });






  dragBarTop._mbDragVars = {};
  dragBarTop._mbDragVars.dragFunc = (e, elem) => {
    console.log('dragBarTop._mbDragVars.dragFunc');
    let parentElement = elem.parentElement.parentElement;
    var parentElemRect = parentElement.getBoundingClientRect();
    console.log(parentElement);
    console.log(parentElemRect);

    let newClickY = (e.clientY + elem._mbDragVars.offsetY);
    console.log(newClickY);

    let diff = parentElemRect.top - newClickY;
    console.log(diff);
    let newHeight = (parentElemRect.bottom - parentElemRect.top) + diff;
    if(newHeight < 0){newHeight = 0; newClickY=parentElemRect.bottom;}
    console.log(newHeight);

    parentElement.style.top = newClickY+'px';
    // parentElement.style.height = newHeight+'px';
  };
  console.dir(dragBarTop);

  dragBarRight._mbDragVars = {};
  dragBarRight._mbDragVars.dragFunc = (e, elem) => {
    let parentElement = elem.parentElement.parentElement;
    var parentElemRect = parentElement.getBoundingClientRect();


    let newClickX = (e.clientX + elem._mbDragVars.offsetX);

    let newWidth = newClickX-parentElemRect.left;
    if(newWidth < 0){newWidth = 0;}
    parentElement.style.width = newWidth+'px';
  };

  dragBarBottom._mbDragVars = {};
  dragBarBottom._mbDragVars.dragFunc = (e, elem) => {
    let parentElement = elem.parentElement.parentElement;
    var parentElemRect = parentElement.getBoundingClientRect();

    let newClickY = (e.clientY + elem._mbDragVars.offsetY);

    let newHeight = newClickY-parentElemRect.top;
    if(newHeight < 0){newHeight = 0;}
    parentElement.style.height = newHeight+'px';
  };

  dragBarLeft._mbDragVars = {};
  dragBarLeft._mbDragVars.dragFunc = (e, elem) => {
    let parentElement = elem.parentElement.parentElement;
    var parentElemRect = parentElement.getBoundingClientRect();


    let newClickX = (e.clientX + elem._mbDragVars.offsetX);

    let diff = parentElemRect.left - newClickX;
    let newWidth = (parentElemRect.right - parentElemRect.left) + diff;
    if(newWidth < 0){newWidth = 0; newClickX=parentElemRect.right;}

    parentElement.style.left = newClickX+'px';
    parentElement.style.width = newWidth+'px';
  };

  return dragControls;
};


module.exports = mblibDomUtils;
