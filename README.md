# Reddit comment animation

A userscript to play text animations on reddit comments.

## Installation

* Chrome: click [here](https://github.com/git2samus/reddit-comment-animation/raw/master/reddit-comment-animation.user.js).
* Firefox: first [install greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) then do as with Chrome.
* Others: untested.

## Usage

Comment animations are sequences of "frames" which are composed of exactly two paragraphs within the comment, in order to be recognized the first paragraph of each frame must be tagged with an invisible link like this: `[](/frame)`

Originally I used a combination of blockquote/code-block to create a title+body effect but there's no restriction on the types of paragraphs as long as they're in pairs, also the first paragraph can contain just the hidden link which causes the animation to only display the contents of the second block of each frame.

## Example

This comment on reddit:

```
> [](/frame) here

    (\u2022_\u2022)

> [](/frame) we

    ( \u2022_\u2022)>\u2310\u25a0-\u25a0

> [](/frame) go!

    (\u2310\u25a0_\u25a0)
```

will result in the following animation:

![sample animation](http://cloud.github.com/downloads/git2samus/reddit-comment-animation/example.gif)

## Licence

Freeware.
