---
title: css
---

A little trick is to toggle the following rule during development to be able to
see easily the structure of the page. With Astro, it is easy to scope this to
single layouts / components.

```css
* {
  outline: 1px solid pink;
}
```

## Selectors

### Combinators

```css
.parent .child     /* Descendant Combinator           */
.parent > .child   /* Child Combinator                */
.child + .sibling  /* Adjacent Sibling                */
.child ~ .sibling  /* Subsequent sibling              */
.class1.class2     /* Have both classes               */
```

### Attribute selectors

```css
[role="dialog"]    /* Exact                           */
[class~="box"]     /* Has word                        */
[class|="box"]     /* Exact or prefix (eg, value-)    */
[href$=".doc"]     /* Ends in                         */
[href^="/index"]   /* Begins with                     */
[class*="-is-"]    /* Contains                        */
```

### Pseudo-classes

```css
:target
:disabled
:focus
:active
:nth-child(3)      /* 3rd child                        */
:nth-child(3n+2)   /* 2nd child in groups of 3         */
:nth-child(-n+4)
:nth-last-child(2)
:nth-of-type(2)
:checked
:disabled
:default
:empty
```

### Pseudo-classes variations

```css
:first-of-type
:last-of-type
:nth-of-type(2)
:only-of-type
:first-child
:last-child
:nth-child(2)
:only-child
```
