// ==UserScript==
// @name           reddit comment animation
// @namespace      git2samus
// @include        http://www.reddit.com/*
// @match          http://www.reddit.com/*
// ==/UserScript==

/* Frame class:
 *  stores the contents of a single frame and the duration in ms that it'll be visible
 */
function Frame(contents, duration) {
    this.contents = contents;
    this.duration = duration;
};

/* animate function:
 *  runs the specified frames on the given target
 *  target is an element of the page and frames is an array of Frame
 */
function animate(target, frames) {
    var frames_l = frames.length;

    // animation callback
    function _set_frame(frame_i) {
        var frame = frames[frame_i];

        // set frame
        target.innerHTML = frame.contents;

        // update after frame.duration
        window.setTimeout(function() {
            _set_frame((frame_i+1) % frames_l);
        }, frame.duration);
    };

    // start animation
    _set_frame(0);
};

/* has_frames function:
 *  helper to determine if a given HTML node contains a valid animation
 */
function has_frames(container) {
    var anchors = container.getElementsByTagName('a');
    for (var anchor_i=0, anchors_l=anchors.length; anchor_i<anchors_l; anchor_i++)
        //XXX should we check hostname?
        if (anchors[anchor_i].pathname == '/frame')
            return true;
};


/* program start:
 *  look for comment boxes and search for animations
 */
var usertexts = document.getElementsByClassName('usertext-body');
for (var usertext_i=0, usertexts_l=usertexts.length; usertext_i<usertexts_l; usertext_i++) {
    if (has_frames(usertexts[usertext_i]))
        console.log(usertexts[usertext_i]);
};
