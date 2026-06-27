# YouTube Insights - Decision Engine Dashboard

An AI-powered YouTube analytics dashboard built for **Tableau Next**, where every widget answers a specific question and drives a campaign decision.

## Live Demo

**[View Live Dashboard](https://alonhaze7.github.io/YouTube-Insights/)**

## Decision Types Covered

| Decision | What It Controls |
|----------|-----------------|
| `BUDGET_SET` | Set or adjust total campaign budget |
| `BUDGET_REALLOCATE` | Shift budget between channels/campaigns |
| `BID_STRATEGY_CHANGE` | Switch optimization strategy |
| `BID_ADJUST` | Increase/decrease bid modifiers |
| `PACING_CHANGE` | Accelerate or decelerate delivery |
| `AUDIENCE_TARGET` | Add audiences to targeting |
| `AUDIENCE_EXPAND` | Create lookalikes, broaden reach |
| `AUDIENCE_SUPPRESS` | Exclude rejecting audiences |
| `KEYWORD_MANAGE` | Add/remove/adjust keyword bids |
| `PLACEMENT_MANAGE` | Extend or restrict placements |
| `GEO_TARGET` | Add/remove geographic targeting |
| `SCHEDULE_DAYPART` | Optimize time-of-day delivery |
| `CREATIVE_MANAGE` | Promote, pause, or replace creatives |
| `STATUS_CHANGE` | Pause/activate campaigns or content |
| `FREQUENCY_CAP` | Cap impression frequency |
| `SIGNAL_CONFIG` | Configure optimization signals |

## Dashboard Pages

### Page 1: Performance & Budget Optimization
5 widgets answering budget and pacing questions.

### Page 2: Audience & Geographic Targeting
5 widgets for geo, daypart, and audience decisions.

### Page 3: Content & Creative Performance
5 widgets for creative management and content strategy.

### Page 4: Efficiency & Frequency Control
5 widgets for bid optimization and fatigue management.

## Documentation

- [`docs/widget-spec.md`](docs/widget-spec.md) - Complete widget specification with field mappings
- [`docs/thresholds.md`](docs/thresholds.md) - Threshold and alert logic for every widget
- [`docs/dashboard-config.json`](docs/dashboard-config.json) - Tableau Next dashboard configuration

## Data Fields

| Ingested Field | Semantic Name |
|----------------|--------------|
| Date.ID | Delivery Engagement Summary Date Time |
| video.id | SocialMessageId |
| video.name | SocialMessageContent |
| channel_name | SocialPageName |
| snippet.channelId | SocialPageId |
| snippet.title | SocialMessageContentTags |
| snippet.thumbnails.url | SocialMessageImage |
| Country | Country / Audience Id |
| likes | Social Post Likes |
| comments | Social Post Comments |
| views | SocialMessageVideoViews |
| dislikes | Dislikes |
| shares | Social Post Shares |
| subscribersGained | SocialPageFansAdded |
| subscribersLost | SocialPageFansRemoved |
| estimatedMinutesWatched | SocialMessageVideoViewTime |
| averageViewDuration | Video Average Duration |

## Tech Stack

- HTML5 / CSS3 (dark theme, responsive grid)
- Chart.js 4.x for interactive visualizations
- Vanilla JavaScript (no framework dependencies)
- Designed for Tableau Next widget implementation

## Local Development

Simply open `index.html` in a browser, or:

```bash
npx serve .
```
