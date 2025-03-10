{{- define "gvDetails" -}}
{{- $gv := . -}}

# {{ $gv.GroupVersionString }}

{{ $gv.Doc }}

{{- if len $gv.Kinds  }}
## Resource Types
{{- range $gv.SortedKinds }}
- {{ $gv.TypeForKind . | markdownRenderTypeLink }}
{{- end }}
{{ end }}

{{ range $gv.SortedTypes }}
{{ template "type" . }}
{{ end }}

{{- end -}}
