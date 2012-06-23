function animation_cb(i) {
    i %= 3;
    console.log(i);
    window.setTimeout(function() {
        animation_cb(i+1);
    }, 1e3);
}