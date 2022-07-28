---
layout: '../../layouts/BlogPost.astro'
collection: blog
issue: 5

author: Daniele Salvagni
title: The Planck - An ortholinear keyboard
publishDate: 2022-07-29

excerpt: test
---

![An old typewriter](/assets/img/content/003/typewriter.png)

The Plank is an ortholinear 40% keyboard. **Ortholinear** means that the keys
are arranged in a grid instead of on the staggered rows, which are just an
historical artifact of typewriters having to avoid their levers smacking into
each other. Most common keyboard are Full-Sized with 104 keys, so having a **40%
keyboard** means we have much less, 47 keys in this case.

Someone might think why you'd want such features, but I love both of them. I
have been using it for at least a couple years and the ortholinear layout feels
much more natural to me. It didn't take too long to adjust and now every key
feels at its right place, no more having to use a different finger or to do a
weird move to reach some of the keys with the staggered layout. The staggered
layout is not uncomfortable, but there are always a couple keys which really
feel out of place for me.  
The 40% part is also great, it means that my fingers never have to reach after
the only 4 available rows and thanks to multiple layers and the amazing
[QMK firmware](https://qmk.fm/) I have more functionality than what I'd have on
a full-size keyboard.

![My Planck Keyboard](/assets/img/content/003/my-planck.png)

🔝 _Did I mention you also need to buy less Mechanical Switches and Keycaps?_

## My current Keymap

There are a lot of customizations you can do in the QMK Firmware, here are my
main layers but there really is much more. The full code of my custom firmware
can be seen on
[Github](https://github.com/daniele-salvagni/qmk_firmware/tree/master/keyboards/planck/keymaps/danck).

### QWERTY Layer

```
 ,-----------------------------------------------------------------------.
 |GEsc |  Q  |  W  |  E  |  R  |  T  |  Y  |  U  |  I  |  O  |  P  |Bksp |
 |-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----|
 |PTT  |  A  |  S  |  D  |  F  |  G  |  H  |  J  |  K  |  L  |  ;  |  -  |
 |-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----|
 |Shift|  Z  |  X  |  C  |  V  |  B  |  N  |  M  |  ,  |  .  | Up  |  /  |
 |-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----|
 |Ctrl |Func | GUI |Alt  |Lower|   Space   |Raise|  '  |Left |Down |Right|
 `----------------------------------------------------------------------'
```

This layer has all the letters in the QWERTY layout and some common symbols,
it's pretty similar to any standard keyboard.

**GEsc** acts like a normal `Esc` when pressed alone, it's `~` when shifted and
`` ` `` when combined with GUI. **PTT** is a Keycode that has no side effects
which I use as a Push to Talk button, but if pressed with Alt I get `Alt+Tab`.  
If **Raise** is held it will act as a new layer like _Lower_, but if tapped it
will send `Enter`.

### LOWER Layer

```
,----------------------------------------------------------------------.
|  `  |  !  |  @  |  #  |  $  |  %  |  ^  |  &  |  *  |  (  |  )  |Bksp |
|-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----|
|Tab  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |  0  |  +  |
|-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----|
|     |  {  |  }  |     |  =  |     |     |  |  |  [  |  ]  |     |  \  |
|-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----|
|     |     |     |     |     |           |     |  "  |     |     | =>  |
`----------------------------------------------------------------------'
```

The numbers were missing on the main layer, so here they are! There is also a
little macro to send `=>`, pretty useful for writing Javascript. Some symbols
like `{ } =` are pretty common in programming, so I placed those in a way where
only one hand is required.

### RAISE Layer

```
,-----------------------------------------------------------------------.
|     |     |     |     |  €  |  °  |     |     |  ×  |     |  ø  |Del  |
|-----+-----+-----+-----+-----+-----------+-----+-----+-----+-----+-----|
|Tab  |     |     |     |     |     |     |     |     |     |     |     |
|-----+-----+-----+-----+-----+-----------+-----+-----+-----+-----+-----|
|     |     |     |     |     |     |     |     |  «  |  »  |     |  ÷  |
|-----+-----+-----+-----+-----+-----------+-----+-----+-----+-----+-----|
|     |     |     |     |     |           |     |     |     |     |     |
`----------------------------------------------------------------------'
```

Some extra symbols are on this layer, they aren't frequently used and so they
are placed in a way which is easy to remember. The reasoning is that keybodes
with a similar function are on the same key on different layers, some examples
are `{$, €}` `{*, ×}` `{< «}` `{> »}` `{\, ÷}` and so on...

### FUNCTION Layer

```
,-----------------------------------------------------------------------.
|Tsk  | F1  | F2  | F3  | F4  | F5  | F6  | F7  | F8  | F9  | F10 |CAD  |
|-----+-----+-----+-----+-----+-----------+-----+-----+-----+-----+-----|
|Caps | F11 | F12 | F13 | F14 | F15 |     |     |     |     |     |PSCR |
|-----+-----+-----+-----+-----+-----------+-----+-----+-----+-----+-----|
|     |LDSK |RDSK |     |EMAIL|Vol- |Vol+ |     |     |     |PgUp | Trb |
|-----+-----+-----+-----+-----+-----------+-----+-----+-----+-----+-----|
|     |     |     |     |     |    Mute    |Ret  |     |Home |PgDn |End  |
`-----------------------------------------------------------------------'
```

Function keys `F1`-`F15`, `Print-Screen`, Volume controls, Mute button, `PageUp`
and `PageDn`, a macro for the **Task Manager**, one for writing my **Email
Address** and a couple more to switch to the left/right **Virtual Desktops**.

There is also a macro that if pressed once sends a mouse click, if tapped twice
it will keep sending mouse clicks multiple times a second until interrupted.

![QMK Firmware](/assets/img/content/003/qmk-fw.png)

If you don't want an ortholinear keyboard, I'd still suggest checking out the
QMK Firmware and what you can do with it by skimming through its documentation:
https://docs.qmk.fm/#/  
After using it once you won't go back to anything else.
