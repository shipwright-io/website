{{- define "gvList" -}}
{{- $groupVersions := . -}}

---
title: {{env "API_GROUP"}} Resources
sidebar_position: {{env "API_POSITION"}}
description: {{env "API_GROUP"}} Custom Resource Definitions
---

# Packages
{{- range $groupVersions }}
- {{ markdownRenderGVLink . }}
{{- end }}

{{ range $groupVersions }}
{{ template "gvDetails" . }}
{{ end }}

{{- end -}}
