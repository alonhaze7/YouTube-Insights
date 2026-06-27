# YouTube Insights Dashboard - Threshold & Alert Logic

## Color Coding System

All thresholds use a 3-tier traffic light system:
- **Green** = Performing well, maintain or scale
- **Yellow** = Watch closely, monitor for 1 more period before acting
- **Red** = Action required immediately

---

## Widget-Level Thresholds

### Widget 1 - Total View Volume KPI

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Views >= 100% of period target pace | Green | None | `BUDGET_SET` — maintain current budget |
| Views 80-99% of period target pace | Yellow | Warning banner | `BUDGET_SET` — prepare to increase 10% |
| Views < 80% of period target pace | Red | Urgent alert | `BUDGET_SET` — increase budget 25%+ immediately |
| Views > 120% of target pace | Blue (over-deliver) | Info | `BUDGET_SET` — consider reducing to save budget |

### Widget 2 - Delivery Pacing

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Actual within +/- 10% of ideal pace | Green | None | `PACING_CHANGE` — maintain |
| Actual 10-20% behind pace | Yellow | Monitor | `PACING_CHANGE` — accelerate 15% |
| Actual > 20% behind pace | Red | Urgent | `PACING_CHANGE` — accelerate 30%+ or extend period |
| Actual > 20% ahead of pace | Orange | Overspend risk | `PACING_CHANGE` — decelerate to preserve budget |

### Widget 3 - Channel Efficiency

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Channel views > average + engagement > average | Green | Top performer | `BUDGET_REALLOCATE` — increase allocation |
| Channel views near average | Yellow | Neutral | `BUDGET_REALLOCATE` — maintain, test new content |
| Channel views < 50% of average for 2+ weeks | Red | Underperformer | `BUDGET_REALLOCATE` — reduce 30%, shift to top |

### Widget 4 - View Quality (Duration vs Volume)

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Views up + Duration up | Green | Quality growth | `BID_STRATEGY_CHANGE` — maintain current |
| Views up + Duration down (>15% drop) | Red | Hollow growth | `BID_STRATEGY_CHANGE` — switch to maximize watch-time |
| Views down + Duration up | Yellow | Niche but engaged | `BID_STRATEGY_CHANGE` — switch to target ROAS/engagement |
| Views down + Duration down | Red | Full decline | `BID_STRATEGY_CHANGE` — creative refresh + strategy review |

### Widget 5 - Net Subscribers

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Net positive growth > prior period | Green | Growing | `BUDGET_SET` — maintain acquisition budget |
| Net positive but declining trend | Yellow | Slowing | `BUDGET_SET` — test new subscriber content |
| Net negative for 1 week | Orange | Warning | `BUDGET_SET` — investigate cause |
| Net negative for 2+ consecutive weeks | Red | Crisis | `BUDGET_SET` — increase subscriber budget 50%+ |

### Widget 6 - Geographic Views Map

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Country has > 10% of total views + no active targeting | Gold highlight | Opportunity | `GEO_TARGET` — add to targeting |
| Country has active targeting + < 1% of views | Red outline | Waste | `GEO_TARGET` — remove from targeting |
| Country showing 50%+ growth WoW | Green pulse | Emerging | `GEO_TARGET` — increase geo bid modifier |

### Widget 7 - Geo Engagement

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Engagement Rate > 5% | Green | High engagement | `BID_ADJUST` — increase bid modifier +20% |
| Engagement Rate 2-5% | Yellow | Average | `BID_ADJUST` — maintain current bid |
| Engagement Rate < 2% | Red | Low engagement | `BID_ADJUST` — decrease bid modifier -15% |
| Engagement Rate < 1% + high volume | Red flash | Wasted spend | `BID_ADJUST` — decrease bid -30% or suppress |

### Widget 8 - Activity Heatmap

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Time block in top 25% of views | Dark orange | Peak hours | `SCHEDULE_DAYPART` — allocate 70% of budget here |
| Time block in 25-75% range | Medium orange | Active hours | `SCHEDULE_DAYPART` — allocate 25% of budget |
| Time block in bottom 25% | Light/white | Dead hours | `SCHEDULE_DAYPART` — allocate 5% or exclude |

### Widget 9 - Subscriber Growth by Country

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Country: Net subs positive + growth > avg | Green | Expand here | `AUDIENCE_EXPAND` — create lookalikes |
| Country: Net subs positive but below avg | Gray | Maintain | `AUDIENCE_EXPAND` — maintain current |
| Country: Net subs negative | Red | Losing audience | `AUDIENCE_EXPAND` — do not expand, investigate |

### Widget 10 - Audience Rejection

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Dislike Ratio < 2% | Green | Healthy | `AUDIENCE_SUPPRESS` — no action |
| Dislike Ratio 2-5% | Yellow | Monitor | `AUDIENCE_SUPPRESS` — watch for 1 more week |
| Dislike Ratio > 5% + views > 1000 | Red | Suppress | `AUDIENCE_SUPPRESS` — add to suppression list |
| Dislike Ratio > 10% | Red urgent | Immediate suppress | `AUDIENCE_SUPPRESS` — suppress + investigate content |

### Widget 11 - Video Performance Scatter

| Quadrant | Color | Alert | Decision |
|----------|-------|-------|----------|
| High Views + High Duration (top-right) | Green | Star content | `CREATIVE_MANAGE` — promote heavily |
| Low Views + High Duration (top-left) | Blue | Hidden gem | `CREATIVE_MANAGE` — boost distribution |
| High Views + Low Duration (bottom-right) | Orange | Clickbait risk | `CREATIVE_MANAGE` — fix content/thumbnail mismatch |
| Low Views + Low Duration (bottom-left) | Red | Failing | `CREATIVE_MANAGE` — pause or replace |

### Widget 12 - Engagement by Video

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Video in top 20% engagement | Green | Top creative | `PLACEMENT_MANAGE` — extend to more placements |
| Video in middle 60% | Yellow | Average | `PLACEMENT_MANAGE` — maintain current placements |
| Video in bottom 20% | Red | Weak creative | `CREATIVE_MANAGE` — rotate out within 7 days |

### Widget 13 - Video Status Table

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| 7-day trend > +20% growth | Green row | Scaling | `STATUS_CHANGE` — Active, increase budget |
| 7-day trend between -10% and +20% | No highlight | Stable | `STATUS_CHANGE` — maintain |
| 7-day trend -10% to -20% decline | Yellow row | Declining | `STATUS_CHANGE` — monitor, prepare replacement |
| 7-day trend > -20% decline | Red row | Failing | `STATUS_CHANGE` — Pause immediately |
| Dislike ratio > 5% regardless of trend | Red text | Toxic | `STATUS_CHANGE` — Pause + investigate |

### Widget 14 - Topic Treemap

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Tag: Large tile + Engagement > 4% | Dark green | Winning topic | `KEYWORD_MANAGE` — increase bids, create more content |
| Tag: Large tile + Engagement < 2% | Red | Volume but no engagement | `KEYWORD_MANAGE` — investigate quality |
| Tag: Small tile + Engagement > 4% | Light green | Niche opportunity | `KEYWORD_MANAGE` — test with more budget |
| Tag: Small tile + Engagement < 2% | Gray | Low priority | `KEYWORD_MANAGE` — reduce bids or remove |

### Widget 15 - Engagement Funnel

| Drop-off Point | Color | Alert | Decision |
|----------------|-------|-------|----------|
| Views→Likes drop > 95% | Red stage 1-2 | Hook problem | `SIGNAL_CONFIG` — optimize for impressions/click signals |
| Likes→Comments drop > 90% | Red stage 2-3 | CTA problem | `SIGNAL_CONFIG` — optimize for comment signals |
| Comments→Shares drop > 85% | Red stage 3-4 | Virality problem | `SIGNAL_CONFIG` — optimize for share signals |
| All conversions above benchmarks | Green all | Healthy funnel | `SIGNAL_CONFIG` — maintain current signals |

### Widget 16 - Acquisition Efficiency

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Ratio decreasing (improving) for 3+ weeks | Green | Efficient | `BID_ADJUST` — scale winning placements |
| Ratio stable (within +/- 5%) | Yellow | Neutral | `BID_ADJUST` — maintain current bids |
| Ratio increasing (degrading) for 2 weeks | Orange | Watch | `BID_ADJUST` — review placement performance |
| Ratio increasing for 3+ weeks | Red | Inefficient | `BID_ADJUST` — reduce bids on worst placements 20% |

### Widget 17 - Content Fatigue

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| New video (< 14 days) + Dislike < 2% | Green | Fresh & healthy | `FREQUENCY_CAP` — allow up to 3x/week |
| Any video + Dislike 2-4% | Yellow | Early fatigue | `FREQUENCY_CAP` — cap at 2x/week |
| Old video (> 30 days) + Dislike > 4% | Orange | Fatigued | `FREQUENCY_CAP` — cap at 1x/week |
| Any video + Dislike > 7% | Red | Severe fatigue | `FREQUENCY_CAP` — cap at 1x/2weeks or pause |
| New video (< 7 days) + Dislike > 5% | Red urgent | Creative failure | `FREQUENCY_CAP` — pause immediately |

### Widget 18 - View Duration KPI

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Avg Duration > 60 seconds | Green | Strong retention | `PLACEMENT_MANAGE` — expand to browse placements |
| Avg Duration 30-60 seconds | Yellow | Adequate | `PLACEMENT_MANAGE` — maintain current mix |
| Avg Duration < 30 seconds | Red | Message not landing | `PLACEMENT_MANAGE` — restrict to high-intent placements |
| % videos above 30s < 50% | Red | Portfolio problem | `PLACEMENT_MANAGE` — review all creatives |

### Widget 19 - Channel Engagement

| Condition | Color | Alert | Decision |
|-----------|-------|-------|----------|
| Channel engagement rate > 2x portfolio avg | Green | Star channel | `BUDGET_REALLOCATE` — increase budget +30% |
| Channel engagement rate 0.8-2x avg | Yellow | Average | `BUDGET_REALLOCATE` — maintain allocation |
| Channel engagement rate < 0.5x avg | Red | Underperforming | `BUDGET_REALLOCATE` — reduce budget 25% |
| Channel dominated by shares (>50% of engagement) | Blue | Viral channel | `BUDGET_REALLOCATE` — prioritize viral/short content |

### Widget 20 - Content Lifecycle

| Quadrant | Color | Alert | Decision |
|----------|-------|-------|----------|
| Age > 90d + Engagement > 3% (Evergreen) | Green | Long-lasting | `STATUS_CHANGE` — continue, reference for new content |
| Age > 90d + Engagement < 1% (Retire) | Red | Past prime | `STATUS_CHANGE` — pause/archive |
| Age < 30d + Engagement > 3% (Rising Star) | Bright green | Scale now | `STATUS_CHANGE` — increase budget immediately |
| Age < 30d + Engagement < 1% (Underperformer) | Orange | Failing early | `STATUS_CHANGE` — creative refresh or kill in 7 days |

---

## Global Alert Rules

| Priority | Condition | Notification | Auto-Decision |
|----------|-----------|-------------|---------------|
| P0 - Critical | Net subscribers negative 2+ weeks | Email + Slack | Flag for `BUDGET_SET` review |
| P0 - Critical | Any video dislike ratio > 10% | Email + Slack | Auto-suggest `STATUS_CHANGE` → Pause |
| P1 - High | Pacing > 25% behind target | Dashboard banner | Flag for `PACING_CHANGE` |
| P1 - High | Top channel views drop > 40% WoW | Dashboard banner | Flag for `BUDGET_REALLOCATE` |
| P2 - Medium | Acquisition ratio degrading 3 weeks | In-widget alert | Suggest `BID_ADJUST` |
| P2 - Medium | New country emerges with >5% share | In-widget highlight | Suggest `GEO_TARGET` add |
| P3 - Low | Any metric improves > 30% WoW | Green highlight | Informational only |

---

## Decision Urgency Framework

| Urgency | Timeframe to Act | Visual Indicator | Example |
|---------|-----------------|-----------------|---------|
| **Immediate** (< 24 hours) | Same day | Red pulse + banner | Dislike ratio > 10%, negative net subs |
| **Soon** (1-3 days) | Within 48h | Red static | Pacing 25%+ behind, creative failing |
| **This Week** | Within 7 days | Yellow/Orange | Efficiency declining, fatigue building |
| **Next Cycle** | Within 14 days | Yellow | Moderate underperformance, emerging trends |
| **Informational** | No deadline | Green/Blue | Positive trends, opportunities to explore |
