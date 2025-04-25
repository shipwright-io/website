---
date: 2020-10-21
title: "Introducing Shipwright - Part 1"
linkTitle: "Intro to Shipwright (Part 1)"
description: "A framework for building container images on Kubernetes"
author: "Adam Kaplan ([@adambkaplan](https://github.com/adambkaplan))"
resources:
- src: "**.{png}"
  title: "Figure #:counter"
---
*Update 2020-11-30: Added link to Part 2 of this series*

What is Shipwright? Which problems does this project try to solve?

In [Part 1](/blog/2020/10/15/introducing-shipwright-part-1) of this series, we'll look back at the history of delivering software applications,
and how that has changed in the age of Kubernetes and cloud-native development.

In [Part 2](/blog/2020/11/30/introducing-shipwright-part-2) of this series, we'll introduce Shipwright and the Build APIs that make it simple to
build container images on Kubernetes.

## Delivering Your Applications - A History

Think back to 2010. If you were a professional software engineer, a hobbyist, or a student, which
tools and programming languages did you use? How did you package your applications? How did you or
your team release software for end-users to consume?

Back then, I was a junior software engineer at a small technology consulting company. My team
maintained a suite of custom software tools whose back-end was written in Java. Our release process
consisted of creating a tag in our version control system (SVN), compiling a JAR file on our
laptops, and uploading the JAR to our client's SFTP site. After submitting a ticket and undergoing
a change control review with our client's IT department, our software would be released during a
scheduled maintenance window.

![](deploy-java-vm)