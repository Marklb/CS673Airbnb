'use babel';


class MbNotifications extends HTMLElement {
  static get TYPES(){return {
    'BASIC': 'basic',
    'WARNING': 'warning',
    'ERROR': 'error'
  };};

  createdCallback() {
    this.root = this.createShadowRoot();

    // let link = document.querySelector('link[is="mb-notifications"]');
    // if(link){
    //   // Clone the <template> in the import.
    //   var tplStyles = link.import.querySelector('template#tpl-styles');
    //   var clone = document.importNode(tplStyles.content, true);
    //   this.root.appendChild(clone);
    // }else{
    //   console.log('mb-notifications templates file not imported');
    // }

    this.root.innerHTML += `
    <style>
    ::-webkit-scrollbar {
        /*width: 8px;*/
        background-color: rgba(50, 50, 50, 1);
    }

    ::-webkit-scrollbar:horizontal {
        height: 8px;
        background-color: rgba(50, 50, 50, 1);
    }

    ::-webkit-scrollbar:vertical {
        width: 8px;
        background-color: rgba(50, 50, 50, 1);
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        /*border-radius: 10px;*/
    }

    ::-webkit-scrollbar-thumb {
        /*border-radius: 10px;*/
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
        background-color: rgba(30, 0, 100, 1);
    }

    ::-webkit-scrollbar-corner {
      background-color: rgba(30, 0, 100, 1);
    }

    :host {
        position: fixed; /* Stay in place */
        z-index: 10000; /* Sit on top */
        width: 100%;
        height: 100%;
        top: 0px;
        margin: 0 auto;
        display: block;
        box-sizing: border-box;
        /*background-color: rgba(0, 0, 0, 0.5);*/
        pointer-events: none;
    }

    :host .notification{
      background-color: rgba(50,50,50,1);
      margin: 5px auto; /* 5px from the top and centered */
      /*margin-right: 5px;*/
      /*padding: 20px;*/
      /*border: 1px solid rgba(100, 100, 200, 1);*/
      /*color: rgba(100, 100, 200, 1);*/
      padding: 5px;
      width: 500px;
      max-height: 300px;
      display: block;
      box-sizing: border-box;
      overflow: auto;
      pointer-events: auto;
      position: relative;
      /* TODO: Fix the transition */
      -webkit-transition: height 2s linear;
        -moz-transition: height 2s linear;
          -ms-transition: height 2s linear;
              -o-transition: height 2s linear;
                  transition: height 2s linear;
    }
    :host .notification.hidden{
      height: 0;
      overflow: hidden;
      border: 0;
    }

    :host .notification.basic{
      border: 1px solid rgba(100, 100, 200, 1);
      color: rgba(100, 100, 200, 1);
    }

    :host .notification.warning{
      border: 1px solid rgba(200, 200, 0, 1);
      color: rgba(200, 200, 0, 1);
    }

    :host .notification.error{
      border: 1px solid rgba(200, 0, 0, 1);
      color: rgba(200, 0, 0, 1);
    }

    :host .notification .close-btn{
      position: absolute;
      top: 1px;
      right: 1px;
      width: 10px;
      height: 10px;
      border: 1px solid rgba(100, 100, 200, 1);
      color: rgba(100, 100, 200, 1);
      display: block;
      box-sizing: border-box;
    }

    :host .notification .close-btn:hover{
      border: 1px solid rgba(255, 0, 0, 1);
    }
    </style>
    `;

  }

  attachedCallback() {
    // console.log('attachedCallback: MbNotifications');
    // this.addNotification('This is a test notification.');
    // let s = '';
    // for(let i = 0; i < 1000; i++){
    //   s = s + 'a ';
    // }
    // this.addNotification(s);
    // this.addNotification('This is a test time notification.', {'duration': 1000});
    // this.addNotification('This is a test notification.', {'type': MbNotifications.TYPES.WARNING});
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
    // this.addNotification('This is a test notification.');
  }

  /*
  options:
    type: ['basic', 'warning', 'error']
  */
  addNotification(text, options = {}){
    let notification = document.createElement('div');
    notification.classList.add('notification');
    let isValidType = false;
    if(options['type'] !== undefined){
      let list = [];
      for(let type in MbNotifications.TYPES){
        list.push(MbNotifications.TYPES[type]);
      }
      if(list.indexOf(options['type']) != -1){
        notification.classList.add(options['type']);
        isValidType = true;
      }
    }
    if(isValidType == false){
      notification.classList.add(MbNotifications.TYPES.BASIC);
    }
    notification.innerHTML = text;
    this.root.appendChild(notification);

    let closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn');
    // closeBtn.innerHTML = 'x';
    notification.appendChild(closeBtn);

    let timerId = null;
    if(options['duration'] !== undefined){
      timerId = setTimeout(() => {
        // notification.classList.add('hidden');
        this.root.removeChild(notification);
      }, options['duration']);
    }

    closeBtn.addEventListener('mousedown', (e) => {
      if(e.button == 0){
        // notification.classList.add('hidden');
        this.root.removeChild(notification);
        clearTimeout(timerId);
      }
    });


  }





}


document.registerElement('mb-notifications', MbNotifications);
// module.exports = MbNotifications
// global.MbNotifications = MbNotifications
(function (name, definition){
  if (typeof define === 'function'){ // AMD
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) { // Node.js
    module.exports = definition();
  } else { // Browser
    var theModule = definition(), global = this, old = global[name];
    theModule.noConflict = function () {
      global[name] = old;
      return theModule;
    };
    global[name] = theModule;
  }
})('MbNotifications', function () {

  // return the module's API
  return MbNotifications;

});
