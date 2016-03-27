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

// Reference list of all events in the official standard?
var standard_events = [
    "abort", "afterprint", "animationend", "animationiteration",
    "animationstart", "audioprocess", "beforeprint", "beforeunload",
    "beginEvent", "blocked", "blur", "cached", "canplay", "canplaythrough",
    "change", "chargingchange", "chargingtimechange", "checking", "click",
    "close", "complete", "complete", "compositionend", "compositionstart",
    "compositionupdate", "contextmenu", "copy", "cut", "dblclick",
    "devicelight", "devicemotion", "deviceorientation", "deviceproximity",
    "dischargingtimechange", "DOMActivate", "DOMAttributeNameChanged",
    "DOMAttrModified", "DOMCharacterDataModified", "DOMContentLoaded",
    "DOMElementNameChanged", "DOMNodeInserted", "DOMNodeInsertedIntoDocument",
    "DOMNodeRemoved", "DOMNodeRemovedFromDocument", "DOMSubtreeModified",
    "downloading", "drag", "dragend", "dragenter", "dragleave", "dragover",
    "dragstart", "drop", "durationchange", "emptied", "ended", "ended",
    "endEvent", "error", "error", "error", "error", "error", "error", "focus",
    "fullscreenchange", "fullscreenerror", "gamepadconnected",
    "gamepaddisconnected", "gotpointercapture", "hashchange",
    "lostpointercapture", "input", "invalid", "keydown", "keypress", "keyup",
    "languagechange", "levelchange", "load", "load", "loadeddata",
    "loadedmetadata", "loadend", "loadstart", "message", "message", "message",
    "message", "mousedown", "mouseenter", "mouseleave", "mousemove",
    "mouseout", "mouseover", "mouseup", "notificationclick", "noupdate",
    "obsolete", "offline", "online", "open", "open", "orientationchange",
    "pagehide", "pageshow", "paste", "pause", "pointercancel", "pointerdown",
    "pointerenter", "pointerleave", "pointerlockchange", "pointerlockerror",
    "pointermove", "pointerout", "pointerover", "pointerup", "play", "playing",
    "popstate", "progress", "progress", "push", "pushsubscriptionchange",
    "ratechange", "readystatechange", "repeatEvent", "reset", "resize",
    "scroll", "seeked", "seeking", "select", "selectstart", "selectionchange",
    "show", "stalled", "storage", "submit", "success", "suspend", "SVGAbort",
    "SVGError", "SVGLoad", "SVGResize", "SVGScroll", "SVGUnload", "SVGZoom",
    "timeout", "timeupdate", "touchcancel", "touchend", "touchenter",
    "touchleave", "touchmove", "touchstart", "transitionend", "unload",
    "updateready", "upgradeneeded", "userproximity", "versionchange",
    "visibilitychange", "volumechange", "waiting", "wheel" 
];

 // hoist this function to global scope.
 window.attachEvents = attachEvents;

})();
