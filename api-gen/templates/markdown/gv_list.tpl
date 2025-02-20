{{- define "gvList" -}}
{{- $groupVersions := . -}}

---
title: {{env "API_GROUP"}} Resources
weight: {{env "API_WEIGHT"}}
---

# Packages
{{- range $groupVersions }}
- {{ markdownRenderGVLink . }}
{{- end }}

{{ range $groupVersions }}
{{ template "gvDetails" . }}
{{ end }}

{{- end -}}
