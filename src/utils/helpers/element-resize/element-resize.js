import Browser from './../browser';
import Bowser from 'bowser';

/**
 * Creates a child 'object' or document which mimics the size of the given element and is
 * able to use the browser 'resize' event listener to trigger a callback.
 *
 * Adapted from http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
 *
 *   __resizeListenerCallbacks__ - an array of callbacks to trigger on this element when it is resized
 *   __resizeTrigger__ - the element to listen for resize events. The browser creates a fake object
 *   which supports resize events.
 */

/**
 * Sets up an event listener for when an element is resized.
 *
 * @method addResizeListener
 * @param {HTMLElement} element - the html element to watch
 * @param {Function} fn - the callback
 */
const addResizeListener = (element, callback) => {

  // if there is no resize listener on this element yet, create an object to apply the listener to
  if (!element.__resizeTrigger__) {
    element.__resizeListenerCallbacks__ = [];

    // ensure that the element has position relative for the child object to work properly
    if (getComputedStyle(element).position == 'static') {
      element.style.position = 'relative';
    }

    // creates an object which will support the resize event listener
    const obj = element.__resizeTrigger__ = document.createElement('object'); 
    obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
    // when the object is ready, add the event listener
    obj.onload = objectLoad(obj, element);
    obj.type = 'text/html';

    const isMS = Bowser.msie || Bowser.msedge;

    if (isMS) {
      element.appendChild(obj);
    }

    obj.data = 'about:blank';

    if (!isMS) {
      element.appendChild(obj);
    }
  }

  // add the callback to the array of listeners
  element.__resizeListenerCallbacks__.push(callback);
};

const removeResizeListener = (element, callback) => {
  // remove the event listener from the array
  element.__resizeListenerCallbacks__.splice(element.__resizeListenerCallbacks__.indexOf(callback), 1);

  // if there are no event listeners left, time to detach the event
  if (!element.__resizeListenerCallbacks__.length) {
    // remove the event listener on the object
    element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener);
    // remove the fake object
    element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
  }
}

/**
 * The event listener to be triggered.
 */
const resizeListener = (ev) => {
  const trigger = ev.target.__resizeTrigger__;

  // using the reference to the source element, retrieve the array of callbacks and trigger them all
  trigger.__resizeListenerCallbacks__.forEach((fn) => {
    fn.call(trigger, ev);
  });
}

/**
 * Return a function to be triggered when the fake object has been loaded into the DOM.
 */
const objectLoad = (obj, element) => {
  return () => {
    // assign a reference back to the source element in the new object's document
    obj.contentDocument.defaultView.__resizeTrigger__ = element;
    // apply the event listener to the new object's document
    obj.contentDocument.defaultView.addEventListener('resize', resizeListener);
  }
}

export {
  addResizeListener,
  removeResizeListener
}
