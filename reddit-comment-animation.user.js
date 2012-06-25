// ==UserScript==
// @name           reddit comment animation
// @description    A userscript to play text animations on reddit comments.
// @namespace      git2samus
// @include        http://www.reddit.com/*
// @match          http://www.reddit.com/*
// @version        1.0.0
// @license        freeware
// ==/UserScript==

/* Frame class:
 *  represents a single frame in the animation
 */
function Frame(contents, duration) {
    this.contents = contents; // array of HTML nodes, all to be used on this frame
    this.duration = duration; // time in ms this frame will be shown
};

/* animate function:
 *  runs the specified frames on the given target
 *  target is an element of the page and frames is an array of Frame
 */
function animate(target, frames) {
    var frames_l = frames.length;

    // animation callback
    (function _set_frame(frame_i) {
        var frame = frames[frame_i];

        // set frame
        target.innerHTML = null;
        for (var framecontent_i=0, framecontent_l=frame.contents.length; framecontent_i<framecontent_l; framecontent_i++) {
            var framecontent = frame.contents[framecontent_i];
            target.appendChild(framecontent.cloneNode(true));
        };

        // update after frame.duration
        window.setTimeout(function() {
            _set_frame((frame_i+1) % frames_l);
        }, frame.duration);
    })(0); // start animation
};

/* has_frames function:
 *  helper to determine if a given HTML node contains a valid animation
 */
function has_frames(container) {
    var anchors = container.getElementsByTagName('a');
    for (var anchor_i=0, anchors_l=anchors.length; anchor_i<anchors_l; anchor_i++) {
        //XXX should we check hostname?
        if (anchors[anchor_i].pathname == '/frame')
            return true;
    };
};

/* extract_duration function:
 *  attempts to extract duration in ms for this frame, defaults to 1 second
 */
function extract_duration(container) {
    var duration_re = /^#([0-9]+)s([0-9]{3})?$/;

    var anchors = container.getElementsByTagName('a');
    for (var anchor_i=0, anchors_l=anchors.length; anchor_i<anchors_l; anchor_i++) {
        var anchor = anchors[anchor_i];

        //XXX should we check hostname?
        if (anchor.pathname == '/frame') {
            if (anchor.hash) {
                var re_match = duration_re.exec(anchor.hash);

                if (re_match)
                    return 1e3 * parseInt(re_match[1]) + (parseInt(re_match[2]) || 0);

                console.log('warning: malformed duration "' + anchor.hash +'"');
            };

            break; // there should be only one hidden link
        };
    };

    return 1e3;
};

/* function parse_comment:
 *  receives div.md which should contain frames and loads animation
 */
function parse_comment(container) {
    var animation_box;
    var frameset = [];

    var children = container.children;
    var children_i=0;

    while (children_i<children.length) {
        var child = children[children_i];
        var next_child = children[children_i+1];

        if (has_frames(child)) {
            if (typeof(animation_box) == 'undefined') {
                animation_box = document.createElement('div');
                animation_box.setAttribute('class', 'comment-animation');
                container.insertBefore(animation_box, child);

                children_i++;
            };

            var frame = new Frame([], extract_duration(child));
            frame.contents.push(container.removeChild(child));
            frame.contents.push(container.removeChild(next_child));

            frameset.push(frame);
        } else {
            children_i++;
        };
    };

    animate(animation_box, frameset);
};



/* program start:
 *  look for comment boxes and search for animations
 */
var usertexts = document.getElementsByClassName('usertext-body');
for (var usertext_i=0, usertexts_l=usertexts.length; usertext_i<usertexts_l; usertext_i++) {
    var usertext = usertexts[usertext_i];

    if (has_frames(usertext))
        parse_comment(usertext.children[0]); // we assume .usertext-body > .md
};
