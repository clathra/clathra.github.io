---
title: "The carbon cost of a heavy page"
date: 2027-02-23
type: note
cover: true
excerpt: "Every web page view moves data, and current modelling translates that data transfer into a small carbon estimate. For a maritime sector built around decarbonisation messaging, a lean website becomes a quiet signal of coherence."
description: "Modelling puts the median page near 0.37 g of CO2 per view, with the heaviest pages about four times that. A lean site sits at the low end, by data transfer."
image: /images/og/the-carbon-cost-of-a-heavy-page.png
last_modified_at: 2027-02-23

---

A website consumes energy each time someone loads it. Servers answer the request, networks carry the bytes, and the visitor's device renders the result. The heavier the page, the more data moves, and by current modelling the more carbon is attributed to each view. The figures involved are small in absolute terms, and they are modelled estimates with no direct measurement behind them. The argument that follows turns on direction and coherence, and it has a particular edge for a sector that now organises much of its public message around emissions.

## How a page becomes a carbon estimate

The dominant approach treats data transfer as the proxy for energy use. The Sustainable Web Design Model v4, an open methodology that is advocacy-adjacent, attributes modelled emissions across four segments: data centres, networks, the visitor's device, and the embodied carbon of the hardware involved. Emissions in the model scale with the gigabytes transferred, so fewer bytes correspond to less modelled energy and less modelled carbon. The logic is straightforward, and its limits are equally clear. A byte count is a stand-in for energy, and the conversion from energy to carbon depends on the electricity that powers each segment.

The HTTP Archive Web Almanac 2024, in its open, non-commercial Sustainability chapter, applies this kind of modelling to the live web. It estimates that the median web page emits around 0.37 g CO2 per view on desktop and around 0.33 g on mobile. The 90th-percentile page, far heavier, is estimated at roughly four times that figure, and the estimate rises with page weight. These are modelled values derived from data transfer, and the Almanac presents them as such, with no claim that any individual server was measured.

{% include the-carbon-cost-of-a-heavy-page.html %}

The weight that drives those estimates has a direction of its own. The HTTP Archive Web Almanac 2025, reporting on page weight, puts the median mobile page at about 2,559 KB. That figure is the heavy default of the modern web, accumulated through large images, multiple fonts, tracking scripts, and embedded media. A page built lean, with compressed images, few scripts, and static delivery, sits well below that median and therefore at the low end of the modelled emissions range.

## What the figures can and cannot carry

Honesty about the method matters more than the headline number. Every web-carbon figure quoted above is modelled from data transfer, and none is a direct measurement of carbon leaving a stack. Grid carbon intensity varies by location and by hour, so the same page served to a visitor on a coal-heavy grid and a visitor on a hydro-heavy grid carries different real emissions while the modelled estimate may treat them alike. A single page view is also tiny in absolute terms, measured in fractions of a gram.

The wider context reinforces the need for restraint. Freitag, Berners-Lee and colleagues, in a peer-reviewed review published in Patterns in 2021, estimate that information and communications technology accounts for roughly 1.8 to 2.8 per cent of global greenhouse-gas emissions, and the authors explicitly caution against the inflated estimates that circulate in this area. A maritime firm's website is a vanishingly small fraction of that fraction. The case for a lean page does not rest on the absolute tonnage saved, which is negligible, and it does not pretend otherwise. The case rests on coherence and on the direction a firm's own assets point.

## Why coherence is the marketing point

Maritime marketing has reorganised itself around decarbonisation. Carriers publish emissions trajectories, ports promote shore power and alternative fuels, and shipyards market dual-fuel tonnage and efficiency retrofits. The language of the sector's external communication is now heavily weighted toward environmental performance. A firm that builds its public message on that footing and then serves a 2,500 KB website carrying a dozen trackers presents a small internal contradiction. The contradiction is not material in carbon terms. It is material in signalling terms, because the website is the artefact a prospect inspects most closely and most often.

A lean digital presence reads as a quiet piece of evidence that the firm's commitments extend into the details it controls directly. A heavy, sluggish site that loads a wall of third-party scripts undercuts an emissions narrative in the one place where a visitor can observe the firm's own engineering choices at first hand. The point holds even though the carbon arithmetic is trivial, because audiences read consistency between message and artefact as a proxy for seriousness.

The same lean construction serves goals that are not environmental at all. A light, static page loads faster, holds a visitor through the opening seconds, and performs better on the mobile connections common at sea and in port. The environmental framing and the performance framing converge on the same build. For a maritime firm whose external voice is already pitched around sustainability, the website is an opportunity to make the claim quietly true in its own construction. That alignment between what a firm says and what its assets demonstrate is the marketing work, carried out in the material a marketing agency controls end to end.
