---
issue: 4

author: Daniele Salvagni
title: Unfair-Gamers.com - A community 10 years later
pubDate: 'Jul 24, 2018'
emoji: 👾

description: >
  Unfair-Gamers was as a gaming, modding and ethical online-game-hacking
  community. The main reason the community started was to learn and share the
  knowledge needed to create such tools, for us there was a more interesting
  game inside the game; a game made of learning, experimentation, reverse
  engineering and creation.
---

> A few weeks ago I was invited to a Whatsapp group called **Unfair-Gamers**,
> the name of an italian community website that I created back in **2009** while
> I still was in my teenage years and known online as `D4.Ny` (🤣). I was very
> happy and surprised to discover that many members of the community were able
> to stick together for this long after the website was closed. This is probably
> what prompted me to write this commemorative post, and also to serve as a
> point of reference for anyone that was involved.

![Unfair-Gamers](/img/blog/unfair-gamers/ug-splash.png)

I would define Unfair-Gamers as a **gaming, modding and ethical game-hacking
community**. The main reason the community started was to learn and share the
knowledge needed to create such tools, for us there was a more interesting game
inside the game: a game made of learning, experimentation, reverse engineering
and creativity. For me it was a very important part of my life as it defined the
path that I would take later on.

I like to think that the community succeded in its mission, and although there
were a lot of original releases accounting for millions of downloads, the main
accomplishment was to produce knowledge in an expanding field where the
information was still scarcely available on the web.

![Unfair-Gamers Screenshot](/img/blog/unfair-gamers/ug-screenshot.png)

The community was the most active in the timespan from 2010 to 2013, peaking at
about **2 million** page views per month, more than 200k posts and 100k users
(of which 3k+ I would define as active and more than 20k had at least one post,
the remaining registrations were mainly made just to lurk or download and use
our releases).

![Page Views Analytics](/img/blog/unfair-gamers/analytics-01.png)

_Peaks in the graph usually correspond to our major releases, Google Analytics
was missing for a short period after a website redesign._

# Game Hacking

While game hacking can be seen as a nuisance by many, Unfair-Gamers produced
mainly hacks that wouldn't be too much disruptive for the other players (like it
frequently happens with FPS games), our "hacks" were aimed to lessen the grind
on MMORPG games and provide a more enjoyable experience.

Game hacking consisted mainly in scouting for memory addresses or data
structures and modifying their values, creating and injecting new code, changing
the control flow of the game, scripting actions or directly calling game
functions for automation.

The main tools of the trade were:

- [Cheat Engine](https://www.cheatengine.org/): a powerful memory scanner and
  debugger
- [OllyDbg](http://www.ollydbg.de/): probably the most iconic debugger ever
  created
- Programming and scripting languages
- Other minor tools such as disassemblers, DLL injectors, process explorers.

### Example 1: Minimap replication

<video autoplay="autoplay" loop controls style="width:100%; height:auto;">
  <source src="/img/blog/unfair-gamers/minimap.mp4" type="video/mp4"></source>
</video>

_The game memory is being scanned for monsters and their attributes, a first
small step in order to create a bot. The monsters position is then drawn on a
canvas for demonstration purposes. (The game is Metin2)_

### Example 2: Long range monster puller

<video autoplay="autoplay" loop controls style="width:100%; height:auto;">
  <source src="/img/blog/unfair-gamers/mobber.mp4" type="video/mp4"></source>
</video>

_The function responsible for damaging a monster is being called directly,
skipping the attack and thus bypassing security checks on weapon range. This
would attract all nearby monsters "wirelessly"._

Although game hacking skills may look like a very specific topic at first sight,
its concepts can be applied in many other situations and can often be very
useful.

# Everything has an end (or almost)

UG would have been nothing without its **community**, to whom I want to give a
special thanks for all the content they created, the help they gave and for just
being there every day to have a chat. A community that somehow still managed to
survive until this day.

Unfair-Gamers was fully shut down on **March 1st, 2014**, along with its smaller
sister community The Coders Bay. (After all these years, I have to say that I'm
still proud of its minimal design)

![The Coders Bay](/img/blog/unfair-gamers/the-coders-bay.png)

The reasons were mainly due to a shift in interests and priorities of the staff
members and content creators, and I had less free time to keep the website
running while constantly releasing/updating game hacks.

It was also the end of an era of its kind, and as I said I like to think that in
a way the community succeded in its intent, with all the information now being
still available out there. It was a fun project and also an important phase of
my life to which I will always look back with a smile.

# Bonus content

- The top 15 members by post number were, in order: _Ryukizashi_, _ThePILLI_,
  _GLyTCH_, _Zyrel_, _ionut_baluca_, _D4.Ny_, _xXStephXx_, _vezdebest_,
  _Sakawa_, _Kingblast_, _MrTiz_, _ActionMan95_, _Sky92_, _Zioborn_, _Madara
  Uchiha_. ([Top 100](/img/blog/unfair-gamers/users-100.txt))
- The most viewed posts were Metin2 hacks and bots by _D4.Ny_, Metin2 private
  server guides by _Kingblast_ and a Dark Orbit bot by _SnFede_.
- A [style revamp](/img/blog/unfair-gamers/unreleased-mockup.png) was also in
  the works, but I never had the time to complete it.
- The green emoticons
  <img src="/img/blog/unfair-gamers/sisi.gif" style="display:inline;"> used on
  _The Coders Bay_ can be donwloaded
  [here](/img/blog/unfair-gamers/cb-emoticons.zip).
- I was going to release one last bot for Metin2, but my testing account was
  banned in the process, after passing undetected for years. I was too tired to
  create a new one. 🪦

## Meeting

In December 2019, a few of us were able to meet in person in Milan.

<div class="image-container">
  <img src="/img/blog/unfair-gamers/meet1.jpg" alt="Meet img 1">
  <img src="/img/blog/unfair-gamers/meet2.jpg" alt="Meet img 2">
</div>

<div align="center">

_Were you a member of Unfair-Gamers? Leave your story below!_

<!-- <br><img src="/img/blog/unfair-gamers/ug-dark.png"
  style="display:inline; width:5rem; display:inline-block;"> -->

</div>

<style>
  .image-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  .image-container img {
    width: calc(50% - 5px);
    margin-bottom: 1em;
  }
  @media screen and (max-width: 640px) {
    .image-container img {
      width: calc(100% - 5px);
    }
  }
</style>
