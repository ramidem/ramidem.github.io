---
title: Hello, notes
date: 2026-10-13 14:27:00 +0800
description: Every piece of markdown a note can use
pinned: false
---
Sample note. Every piece of markdown a note can use, so the styles get tested in one place.

## Headings

The note title is the `title` in front matter. Inside a note, headings go from two levels down to six.

### Third level

#### Fourth level

##### Fifth level

###### Sixth level

## Text

A paragraph with *emphasis*, **strong text**, ***both at once***, ~~strikethrough~~, and `inline code`.\\
This line follows a hard line break.

Links: [an inline link](/), [a link with a title](https://github.com/ramidem "ramidem on GitHub"), and an autolink <https://ramidem.github.io>.

An abbreviation: HTML. A footnote reference.[^1]

## Quotes

> A blockquote. Good for things other people said.
>
> > A quote inside a quote.

## Lists

- Unordered item
- Another item
  - Nested item
  - Another nested item

1. Ordered item
2. Second item
   1. Nested ordered item
3. Third item

- [x] A finished task
- [ ] An open task

Definition term
: The definition, from a kramdown definition list.

## Code

```ruby
# A fenced code block with syntax highlighting
def greet(name)
  puts "Hello, #{name}"
end

greet("notes") # => Hello, notes
3.times { |i| puts i }
```

## Table

| Syntax       | Renders as   | Count |
| :----------- | :----------: | ----: |
| `*em*`       | *em*         | 1     |
| `**strong**` | **strong**   | 2     |
| `~~del~~`    | ~~del~~      | 3     |

## Image

![The site icon](/assets/icons/apple-icon-180x180.png "The site icon")

## Media

Markdown has no syntax for these, so each one is a one-line include from `_includes/notes/`.

### Image with a caption

{% include notes/figure.html src="/assets/icons/apple-icon-180x180.png" alt="The site icon" caption="An image with a caption, using figure.html." %}

### Video

{% include notes/video.html src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" webm="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" title="A flower blooming" caption="A self-hosted video with controls, using video.html. Sample clip: MDN, CC0." %}

### Looping clip

{% include notes/video.html src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" loop=true title="A flower blooming, looping" caption="The same clip with loop=true: silent and autoplaying, in place of a GIF." %}

### YouTube

{% include notes/youtube.html id="jNQXAC9IVRw" title="Me at the zoo" caption="Loads the player only when clicked, using youtube.html." %}

### Audio

{% include notes/audio.html src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" title="A T. rex roar" caption="An audio clip, using audio.html. Sample: MDN, CC0." %}

### Link cards

{% include notes/link-card.html url="https://jekyllrb.com/docs/includes/" title="Includes" description="How Jekyll includes work, and how to pass parameters to them." %}

{% include notes/link-card.html url="/resume/med-aduh-resume.pdf" title="Resume (PDF)" description="A PDF is easier to read opened in its own tab than embedded in the page." image="/assets/icons/apple-icon-180x180.png" %}

---

Above is a horizontal rule. Footnotes collect below.

*[HTML]: HyperText Markup Language

[^1]: The footnote text, with a link back.
