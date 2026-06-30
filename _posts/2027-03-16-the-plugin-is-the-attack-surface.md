---
title: "The plugin is the attack surface"
date: 2027-03-16
type: note
cover: true
excerpt: "For a content-managed website, the risk concentrates in the plugins and themes bolted onto it. In shipping, where trade depends on trust, a compromised site is a reputational event."
description: "Patchstack attributes 91% of 2025 WordPress vulnerabilities to plugins, and Wordfence 96% for 2024. A static site removes whole classes of that risk."
image: /images/og/the-plugin-is-the-attack-surface.png
last_modified_at: 2027-03-16

---

A content-managed website is rarely compromised through the core software that runs it. The weakness sits in the layer of plugins and themes that accumulate around that core, the many add-ons a feature-rich build collects as it grows. Each addition extends what the site can do and widens the surface that an attacker can reach. The pattern is consistent across the security firms that track it, and the convergence of their figures is worth noting before the figures themselves, because most of those firms sell products that profit from the risk they describe.

## Where the vulnerabilities live

The clearest statement of where the risk concentrates comes from Patchstack, a vulnerability-intelligence vendor whose commercial interest lies in cataloguing and selling protection against these flaws. In its State of WordPress Security 2026, covering 2025 data, Patchstack reported that 91% of WordPress vulnerabilities disclosed in 2025 were found in plugins. The same report recorded 11,334 new vulnerabilities over the year, of which 46% remained unpatched at the moment they were made public. The prior edition, covering 2024, put the plugin share at 96%.

Wordfence, which sells a WordPress firewall and therefore has its own incentive to emphasise the threat, reached a near-identical figure from a different vantage point. Drawing on more than 54 billion blocked requests, its 2024 Annual WordPress Security Report attributed 96% of WordPress vulnerabilities disclosed in 2024 to plugins, with total disclosures up 68% year on year. Two firms with different business models and different data sources arrived at the same conclusion. That agreement is the point. The commercial incentive to overstate the danger is real and should be held in mind, and the close alignment of independently derived numbers strengthens the underlying claim even as the incentive is acknowledged.

{% include the-plugin-is-the-attack-surface.html %}

The academic record supports the same reading. Trunde and Weippl (2015), publishing in the proceedings of iiWAS '15 through ACM, analysed 199 publicly available WordPress and plugin exploits and documented the breadth of the resulting attack surface. As an established security group at SBA Research and TU Wien, working through peer review with no product to sell, they provide the disinterested anchor beneath the vendor figures. The structural finding holds independent of who profits from reporting it.

## What turns exposure into compromise

Exposure becomes incident through two well-documented routes: a flaw that goes unpatched, and a platform large enough to repay an attacker's effort. Sucuri, owned by GoDaddy and reporting only on the sites that engaged its incident-response service, found in its 2023 Hacked Website Report that WordPress accounted for 95.5% of detected infections, and that 39.1% of compromised CMS installations were running outdated software at the point of infection. The sample is self-selecting, since it covers sites that had already sought help with a problem, and Sucuri sells the remediation it documents. With those caveats stated, the figure on outdated software points to maintenance as the recurring failure.

Scale supplies the motive. W3Techs (2026) estimates that WordPress powers roughly 43% of all websites and around 61% of those built on a content-management system. W3Techs attaches its own caveat, that its detection reflects the presence of code and says nothing about whether any given site is maintained or secured. A platform of that size concentrates attacker attention, because a single plugin flaw can be exploited across millions of installations at once.

The maintenance gap is felt by the people who run these sites. Melapress, a WordPress security vendor, surveyed 264 WordPress professionals between May and July 2025 with a disclosed methodology, in its WordPress Security Survey 2025. Of those self-selected maintainers, 64% reported at least one security breach and 96% reported some security incident, while only 27% held a recovery plan. The distinction between the two headline figures matters: 64% is the breach number and 96% is the broader incident number. The sample is small and drawn from professionals already engaged with security, so it indicates more than it measures. It does suggest that the people closest to these systems treat compromise as a common occurrence and preparedness as a rare one.

## The architecture that removes the class

A site assembled without a database and without server-side execution removes whole categories of this risk at the level of architecture, with no per-flaw patching required. Contentful, a vendor of content infrastructure with its own commercial position to consider, describes how a static site with no database and no server-side scripting eliminates entire vulnerability classes, among them SQL injection and many cross-site-scripting vectors. The reasoning is structural and holds regardless of the source: a vulnerability in a plugin's database query cannot be exploited where no database query runs, and a flaw in server-side code cannot be reached where no such code executes at request time. The attack surface that the security firms measure is largely an artefact of dynamic, plugin-driven architecture. A static build does not shrink that surface. It declines to build most of it.

## Why a small attack surface is brand work

For a shipping company, the consequence reaches past the technical. Maritime trade runs on trust accumulated over years, expressed through safety records, charterer vetting, and standing relationships with ports and authorities. A defaced homepage, a site serving malware to visitors, or a public breach notice is a reputational event in that setting, read by counterparties as a signal about how the firm is run. The same scrutiny that a charterer applies to a vessel's maintenance attaches to the visible conduct of the company that owns it, and a compromised website is among the most visible failures available.

This reframes the technical choice as a brand decision. A small attack surface is itself a reputational asset, because the most reliable way to avoid the reputational cost of a compromise is to remove the architecture that invites one. A static, plugin-free build carries fewer of the vulnerability classes that the security firms count, and in a sector where the website stands as a continuous public statement of competence, that restraint is part of the brand the site exists to protect. The marketing question and the security question turn out to be the same question, answered by what the site is built from.
