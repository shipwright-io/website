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

{{< imgproc deploy-java-vm Resize "640x360" >}} 
{{< /imgproc >}}

For engineers in larger enterprises, this experience should feel familiar. You may have used C#,
C++, or were adventurous and testing Ruby on Rails. Perhaps instead of compiling the application
yourself, a separate release team was responsible for building the application on secured
infrastructure. Your releases may have undergone extensive acceptance testing in a staging
environment before being promoted to production (and those practices may still continue today). If
you were fortunate, some of the release tasks were automated by emerging continuous integration
tools like Hudson and Jenkins.

## Delivering on Docker and Kubernetes

The emergence of [Docker/Moby](https://mobyproject.org/) and [Kubernetes](https://kubernetes.io/)
changed the unit of delivery. With both of these platforms, developers package their software in
container images rather than executables, JAR files, or script bundles. Moving to this method of 
delivery was not a simple task, since many teams had to learn entirely new sets of skills to deploy
their code.

I first learned of Docker and Kubernetes at a startup I had joined. We used Kubernetes as a means
to scale our back-end application and break apart our Python-based monolith. To test our
applications, we built our container images locally with Docker, and ran clusters locally with
minikube or used a dev cluster set up with our cloud provider. For acceptance testing and
production releases, we used a third-party continuous integration service to assemble our code into
a container image, push it to our private container registry (also hosted by our cloud provider),
and use a set of deployment scripts to upgrade our applications in the respective environment.
Along the way, we had to learn the intricacies of Docker, assembling our image via
[Dockerfiles](https://docs.docker.com/engine/reference/builder/), and running Python inside a
container.

{{< imgproc deploy-k8s-image Resize "640x360" >}} 
{{< /imgproc >}}

What we could not do was build our applications directly on our Kubernetes clusters. At the time,
the only way to build a container image on "vanilla" Kubernetes was to expose the cluster's Docker
socket to a running container. Since docker ran as root, this presented a significant security
risk - a malicious actor could use our build containers or service accounts to run arbitrary
workloads on our clusters. Since our CI provider made it easy to build container images, and we
implicitly trusted the security of their environments, we opted to use their service instead of
running our container image builds on our clusters.

## Creating Container Images Today

Much has changed since the first release of Kubernetes with regard to building container images.
There are now tools designed to build images from a Dockerfile inside a container, like
[Kaniko](https://github.com/GoogleContainerTools/kaniko) and [Buildah](https://buildah.io/). Other
tools like [Source-to-Image](https://github.com/openshift/source-to-image) and
[Cloud-Native Buildpacks](https://buildpacks.io/) go a step further and build images directly from
source code, without the need to write a Dockerfile. There are even image building tools optimized
for specific programming languages, such as [Jib](https://github.com/GoogleContainerTools/jib).

{{< imgproc container-tools Resize "640x360" >}} 
{{< /imgproc >}}

When it comes to delivering applications on Kubernetes, there is a wide variety of tooling and
projects available. [Jenkins-X](https://jenkins-x.io/) and [Tekton](https://tekton.dev/) are two
such projects that orchestrate continuous application delivery on Kubernetes. However, there is no
standard way to produce container images on Kubernetes, nor is there a standard way for build tool
authors to declare how to use their tool on Kubernetes.

In Part 2 of this series, we aim to address these challenges by introducing Shipwright and the
Build API.
