# Slack Release Announcement

Produce this message after npm packages, tags, changelogs, and docs are verified.
Return it in a fenced code block so the release engineer can paste it into the
team channel. Do not send it unless explicitly requested.

## Content Rules

- Lead with the released React Magma line and DOM version.
- List exact versions for every package published in this release.
- Select three to six adopter-visible highlights from the final changelogs.
- Prefer public component and option names over commit or implementation detail.
- Include migration guidance for breaking changes.
- Include release notes and documentation links when available.
- Mention internal CI, lockfile, or release-process work only when engineers must
  take action because of it.
- For v4, label the release as the v4/React 17 maintenance line and include the
  verified v4 npm dist-tag.
- Match a supplied prior announcement's format and tone. Otherwise use the
  concise template below without adding decorative emoji.

## Verified Release Template

```text
*React Magma {DOM_VERSION} is now available*

This release includes updates to {PUBLISHED_PACKAGE_LIST}.

*Highlights*
- {ADOPTER_VISIBLE_CHANGE}
- {ADOPTER_VISIBLE_CHANGE}
- {ADOPTER_VISIBLE_CHANGE}

*Published packages*
- `react-magma-dom@{DOM_VERSION}`
- `@react-magma/charts@{CHARTS_VERSION}`
- {OTHER_PUBLISHED_PACKAGES}

*Links*
- <{GITHUB_RELEASE_URL}|Release notes>
- <{DOCS_URL}|Documentation>

Questions or issues can be shared in #react-magma.
```

Remove unused package lines and placeholders. If only a draft is requested
before publishing, title it `Draft: React Magma {VERSION} release` and replace
"is now available" with "is planned for release."

