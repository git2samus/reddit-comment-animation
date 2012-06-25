# Reddit comment animation

A userscript to play text animations on reddit comments.

Original idea by gfixler: http://www.reddit.com/r/vim/comments/upr3n/extracting_variable/c54m6r6?context=4

## Installation

* Chrome: click [here](https://github.com/git2samus/reddit-comment-animation/raw/master/reddit-comment-animation.user.js).
* Firefox: first [install greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) then do as with Chrome.
* Others: untested.

## Usage

Comment animations are sequences of "frames" which are composed of exactly two paragraphs within the comment, in order to be recognized the first paragraph of each frame must be tagged with an invisible link like this: `[](/frame)`

Originally I used a combination of blockquote/code-block to create a title+body effect but there's no restriction on the types of paragraphs as long as they're in pairs, also the first paragraph can contain just the hidden link which causes the animation to only display the contents of the second block of each frame.

It is possible to specify the duration of each frame by appending a hash to the hidden link with the format `/[0-9]+s([0-9]{3})?/` that is, an integer followed by the letter "s" that represents the amount of seconds, optionally followed by a three-digit number that specifies the additional milliseconds. A hidden link such as `[](/frame#1s250)` would indicate to display that frame for 1.25 seconds.

## Example

This comment on reddit:

```
> [](/frame) here

    (•_•)

> [](/frame) we

    ( •_•)>⌐■-■

> [](/frame) go!

    (⌐■_■)
```

will result in the following animation:

<img src="https://github.com/downloads/git2samus/reddit-comment-animation/example.gif" alt="sample animation" />

## FAQ

### How do I remove the script?

* Chrome: go to Preferences > Settings > Extensions > (reddit comment animation) Remove
* Firefox: go to Tools > Add-ons > User Scripts > (reddit comment animation) Remove

## License

Freeware.
