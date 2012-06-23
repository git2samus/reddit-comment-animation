function Frame(contents, duration) {
    this.contents = contents;
    this.duration = duration;
}

function animate(target, frames) {
    var frames_l = frames.length;

    function _set_frame(frame_i) {
        var frame = frames[frame_i];

        target.innerHTML = frame.contents;
        window.setTimeout(function() {
            _set_frame((frame_i+1) % frames_l);
        }, frame.duration);
    };

    _set_frame(0);
};

