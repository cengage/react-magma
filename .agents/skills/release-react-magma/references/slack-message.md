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
- Match a supplied prior announcement's format and tone. React Magma's preferred
  team-channel style uses the `:magma3:` emoji and the structure below.

## Verified Release Template

```text
:magma3: react-magma-dom@{DOM_VERSION} has been released!

Here's a quick summary of what's new:
New features

{COMPONENT}: {ADOPTER_VISIBLE_FEATURE}
{COMPONENT}: {ADOPTER_VISIBLE_FEATURE}


Fixes & improvements

Accessibility: {ACCESSIBILITY_IMPROVEMENTS}
Behavior: {BEHAVIOR_FIXES}
Performance: {PERFORMANCE_IMPROVEMENTS}
Dependencies: {DEPENDENCY_CHANGES}
```

Remove empty categories instead of inventing content. When multiple adopter
packages publish, include them in the headline, for example:

```text
:magma3: react-magma-dom@{DOM_VERSION} and @react-magma/charts@{CHARTS_VERSION} have been released!
```

Add release-note or documentation links only when they are useful and available;
place them after the improvements section. If only a draft is requested before
publishing, prefix the headline with `Draft:` and replace "has been released"
with "is planned for release."
