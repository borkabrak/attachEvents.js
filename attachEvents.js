/***
 * Attach events, easily.
 *
 *
 * USAGE:
 *
 *   attachEvents(behaviors);
 *
 *   'behaviors' is an object/hash/associative array that relates event types,
 *   specific keystrokes, or CSS-style element selectors to the actions they should trigger.
 *
 *
 * EXAMPLE:
 *
 *    attachEvents({
 *
 *        // attach actions to events
 *        'click': (event) => console.log("click received."),
 *
 *       // attach actions to specific keypresses
 *        'o': (event) => console.log("The 'o' key has been received."),
 *
 *       // attach whatever to specific elements
 *       'h1': {
 *           'click': ()  => event.target.innerHTML = "click received on an <h1>",
 *           'o': (event) => event.target.innerHTML = "The 'o' key has been received by an <h1>."
 *       });
 */

(function(){
"use strict";

var attachEvents = function(behaviors, element) {
    // 'document' is the default element to attach behavior to
    if (typeof element === "undefined") { element = document};

    var keymap = {};

    Object.keys(behaviors).forEach(function(target) {
        // target is a selector.  Attach the actions to matching elements.
        if (document.querySelector(target)) {
            Array.prototype.slice.call(document.querySelectorAll(target)).forEach(function(element) { 
                attachEvents(behaviors[target], element); 
            });

        // single characters specify keypresses.  Add them to the keymap, which
        // gets attached to the keypress event.
        } else if (target.length === 1) {
            keymap[target] = behaviors[target];

        // target is an event.  Attach it.
        } else {
            element.addEventListener(target, behaviors[target])

        }
    } );

    // Handle keypresses.
    element.addEventListener("keypress", function(event) {
        var ch = String.fromCharCode(event.which);
        if (keymap[ch]) { keymap[ch].call(this, event) };
    });

};

// load all the valid event types ('click', 'blur', 'keypress', …)
window.event_types = Object.keys(window).filter(function(property){
    return (/^on/.test(property));

}).map(function(event_type) {
    return event_type.replace(/^on/,'');

});

// hoist this function to global scope.
window.attachEvents = attachEvents;

})();
