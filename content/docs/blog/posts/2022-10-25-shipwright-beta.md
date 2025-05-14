---
title: "Bringing Shipwright to Beta - and Beyond!"
date: 2022-10-25T17:00:00-04:00
draft: false
author: "Adam Kaplan [@adambkaplan](https://github.com/adambkaplan)"
---

Recently, the Shipwright community came together to define a beta API for the
[Build project](https://github.com/shipwright-io/build) with stronger support
guarantees.
We have come a long way since our launch two years ago, as "a framework for
building container images on Kubernetes."
During the workshop, the community found itself coming back to a fundamental
question, "What is Shipwright?"
And more importantly, "What do we want Shipwright to be?"

## What Should Shipwright Become?

We concluded that Shipwright is and should remain a framework for building
container images.
Shipwright will continue to make it simple to build a container image from
source, using tools that are actively maintained by a community of experts.
Our separation of [build strategy]({{% ref "/docs/build/buildstrategies" %}})
from build definition and execution will remain a cornerstone of the Shipwright
framework.

However, we realized that building the image is just the starting point to
delivering software on the cloud.
Software supply chain security is a topmost concern of teams large and small.
Artifacts like image scans, signatures,
[software bill of materials](https://www.cisa.gov/sbom), and
[provenance](https://in-toto.io/in-toto/) are needed to build modern software
for the cloud.
Shipwright can, and should, rise up to meet these demands.

We also decided that Shipwright will continue to run on cloud-native
infrastructure, powered by [Kubernetes](https://kubernetes.io) and
[Tekton](https://tekton.dev).
We can go further, though, and plug Shipwright into the vast cloud-native
ecosystem, through integrations with [CDEvents](https://cdevents.dev),
[ArgoCD](https://argo-cd.readthedocs.io/en/stable/), and more.
Shipwright is just getting started in this effort through the
[Triggers](https://github.com/shipwright-io/triggers) and
[Image](https://github.com/shipwright-io/image) sub-projects.

## Core Values

Over the past two years, the Shipwright community has coalesced around three
core values: simplicity, flexibility, and security. 

Simplicity means that we provide an experience that is intuitive and
consistent.
It also means that we shouldn’t be afraid to take an opinionated stance on
common tasks, or features that we want to add to the project.
We discovered in the Beta API workshop areas where our APIs were not consistent
or intuitive, and we identified changes to fix these problem areas.
These include single sources for builds and maintaining our opinionated steps
to obtain source code.

Flexibility means that we provide space for teams to bend Shipwright to fit
their needs.
This started with the build strategy model itself, which we are keeping at the
core of the API.
We continued with the Parameters API, which provides avenues for customization
between build strategies and build executions.
We also took steps in our beta workshop to ensure our API is tool agnostic,
such that we can help grow the ecosystem of build tools.
This meant that some fields that were only used by specific build tools were
dropped.

Lastly, Shipwright aims to meet the security needs for cloud-native
applications.
Security for Shipwright starts with the transparent pod security contexts built
into the build strategy API.
This encourages the continued evolution of tooling away from privileged and
“root” containers, both of which are potential security risks.
As a community, we have started experimenting with tools like
[Trivy](https://github.com/aquasecurity/trivy) to make the security of
Shipwright-built images more transparent.
We hope to continue these efforts with emerging software security tools in the
future.

## Bringing Shipwright to Beta

Starting in version 0.12, Shipwright will introduce the beta [Build API]({{% ref "/docs/build/build" %}})
and begin phasing out the current alpha API.
We encourage current and future users to provide feedback as we roll this new
API out.
You can provide feedback by filing an issue on [GitHub](https://github.com/shipwright-io/build/issues),
sending an email to our [mailing list](mailto:shipwright-dev@lists.shipwright.io),
or posting a message to the `#shipwright` channel on [Kubernetes Slack](https://kubernetes.slack.com/archives/C019ZRGUEJC).
We look forward to hearing from you!
