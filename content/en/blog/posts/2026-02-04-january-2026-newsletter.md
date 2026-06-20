---
title: "Shipwright Community Update: January 2026"
description: "A roundup of what happened in the Shipwright community since v0.18.0."
date: 2026-02-04T12:00:00Z
draft: false
author: "Adam Kaplan ([@adambkaplan](https://github.com/adambkaplan))"
---

Welcome to the first Shipwright community update of 2026! The holiday season in Europe and
North America hasn't slowed us down - as you can see, we've been very busy since the v0.18.0
release!

## 🛳️ What's New

Here’s a preview of what's coming in our next release (v0.19.0):

### Build

- **RuntimeClass support** — [@IrvingMg](https://github.com/IrvingMg) added a `runtimeClassName`
  field to the Build and BuildRun APIs so you can run builds with alternative container runtimes
  (for example, [Kata containers](https://katacontainers.io/) with stronger isolation). See
  [#2079](https://github.com/shipwright-io/build/pull/2079).
- **Shebang fix in install-spruce.sh** — [@IrvingMg](https://github.com/IrvingMg) moved the shebang
  to line 1 in `hack/install-spruce.sh`, fixing execution under `/bin/bash` when using `set -o pipefail`.
  ([#2080](https://github.com/shipwright-io/build/pull/2080))
- **README updates** — [@SaschaSchwarze0](https://github.com/SaschaSchwarze0) updated the main
  branch README with missing release information. ([#2067](https://github.com/shipwright-io/build/pull/2067))
- **PipelineRun execution mode** — [@ayushsatyam146](https://github.com/ayushsatyam146) introduced
  a common `BuildRunExecutorGenerator` interface so Shipwright can run builds with Tekton `TaskRuns` or
  `PipelineRuns`, laying the groundwork for future multi-arch builds support. See
  [#2056](https://github.com/shipwright-io/build/pull/2056) and [#2087](https://github.com/shipwright-io/build/pull/2087). 
- **CVE-2025-61728 Remediation** — [@SaschaSchwarze0](https://github.com/SaschaSchwarze0) updated 
  `github.com/klauspost/compress` from v1.18.1 to v1.18.3 to address CVE-2025-61728 and satisfy dependency scanners.
  ([#2095](https://github.com/shipwright-io/build/pull/2095))

### Operator

- **Remove API dependency on Tekton and cert-manager** — [@hasanawad94](https://github.com/hasanawad94)
  removed the operator’s direct API dependency on Tekton and cert-manager, simplifying dependency
  management. ([#274](https://github.com/shipwright-io/operator/pull/274))
- **Remove direct dependency on gopkg.in/yaml.v2** — [@SaschaSchwarze0](https://github.com/SaschaSchwarze0)
  dropped the direct dependency on `gopkg.in/yaml.v2` in the operator. ([#275](https://github.com/shipwright-io/operator/pull/275))

## 🏗️ In The Works

### Support RuntimeClass in Builds (provisional)

**[SHIP-0040](https://github.com/shipwright-io/community/blob/main/ships/0040-build-runtime-class.md)**
extends the `Build` and `BuildRun` APIs to let build pods select a Kubernetes [RuntimeClass](https://kubernetes.io/docs/concepts/containers/runtime-class/)
(e.g., Kata containers). Implementation was merged in the build repo in December ([#2079](https://github.com/shipwright-io/build/pull/2079)).

### Documentation Restructure (provisional)

**[SHIP-0041](https://github.com/shipwright-io/community/blob/main/ships/0041-docs-restructure.md)**
proposes restructuring the [shipwright.io](https://shipwright.io) documentation to align with CNCF
best practices (e.g., [CNCF tech docs primer](https://github.com/cncf/techdocs/blob/main/docs/sandbox-doc-primer.md)).
The community is looking for feedback and input.

### Multi-Arch Image Builds (implementable)

**[SHIP-0043](https://github.com/shipwright-io/community/blob/main/ships/0043-multi-arch-image-builds.md)**
extends Shipwright to orchestrate multi-architecture container image builds (e.g., scheduling on
native OS/arch nodes and passing platform parameters to build tools). Work on this feature is being
tracked in [community#285](https://github.com/shipwright-io/community/issues/285) and its sub-issues.

### BuildRun Executor Field (implemented)

**[SHIP-0044](https://github.com/shipwright-io/community/blob/main/ships/0043-buildrun-executor-field.md)**
adds an `executor` field to `BuildRunStatus` to indicate which resource (`TaskRun` or
`PipelineRun`) is executing the build, improving debugging and observability. Work for this feature
has already been completed.
*Note: this SHIP was merged as SHIP-0043 and will be renumbered in the future*.

### Build Step Resources Override (provisional)

**[SHIP-0046](https://github.com/shipwright-io/community/blob/main/ships/0046-add-resource-overrides.md)**
adds a `stepResources` field to the Build and BuildRun APIs so you can override CPU, memory, or
ephemeral storage for specific steps defined in a `BuildStrategy` or `ClusterBuildStrategy`.
Overrides follow existing Shipwright API conventions for other attributes, such as parameters,
volumes, and environment variables.

The community is looking for more feedback on open questions (e.g., use of Tekton’s `computeResources`
vs. Kubernetes pod resources, CLI and operator considerations). If you have use cases or opinions,
please comment on the [SHIP document](https://github.com/shipwright-io/community/blob/main/ships/0046-add-resource-overrides.md)
or in the related [build issue #1894](https://github.com/shipwright-io/build/issues/1894).

## Process updates

- **SHIP lifecycle** — The [SHIP (Shipwright Improvement Proposal)](https://github.com/shipwright-io/community/tree/main/ships
  lifecycle was clarified and simplified in the community repo ([#289](https://github.com/shipwright-io/community/pull/289)).
- **Contributor Ladder** — A new [Contributor Ladder](https://github.com/shipwright-io/community/blob/main/CONTRIBUTOR-LADDER.md)
  was added to document roles and progression ([#288](https://github.com/shipwright-io/community/pull/288)).
- **Roadmap** — The [Roadmap](https://github.com/shipwright-io/community/blob/main/ROADMAP.md) was updated to include an
  “Approved Features” section ([#291](https://github.com/shipwright-io/community/pull/291)).

## 🎉 Celebrations

Thank you to everyone who contributed over the past two months — we appreciate all your work to
support the community. If you’d like to get involved, check out our
[contribution guide](https://github.com/shipwright-io/.github/blob/main/CONTRIBUTING.md) and the
[ships](https://github.com/shipwright-io/community/tree/main/ships) directory for improvement
proposals seeking input.

### First Contributions

Thanks to [@IrvingMg](https://github.com/IrvingMg) for implementing SHIP-0040 (RuntimeClass
support) in the build repository and for the shebang fix in the install script. These were his
first contributions to the Shipwright project. Welcome!

### First SHIP Proposals

Congratulations to [@hasanawad94](https://github.com/hasanawad94) on having the **SHIP-0043**
**BuildRun Executor field** proposal merged in the [community](https://github.com/shipwright-io/community)
repository, and for the operator work that removed the API dependency on Tekton and cert-manager!

Congratulations to [@anchi205](https://github.com/anchi205) on having their first SHIP proposal,
**SHIP-0046** (Override Strategy Step Resources in Build and BuildRuns), accepted as
**provisional** in the [community](https://github.com/shipwright-io/community) repository. We’re
excited to see the discussion and implementation evolve!
