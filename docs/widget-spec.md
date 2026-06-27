# YouTube Insights Dashboard - Widget Specification

## Field Mapping Reference

| Ingested Field | Semantic Name | Data Type |
|----------------|--------------|-----------|
| Date.ID | Delivery Engagement Summary Date Time | DateTime |
| video.id | SocialMessageId | String |
| video.name | SocialMessageContent | String |
| channel_name/snippet.channelTitle | SocialPageName | String |
| snippet.channelId | SocialPageId | String |
| snippet.title | SocialMessageContentTags | String |
| snippet.thumbnails.(key).url | SocialMessageImage | URL |
| Country | Country / Audience Id / Engaged Audience Id | String |
| likes | Social Post Likes | Integer |
| comments | Social Post Comments | Integer |
| views | SocialMessageVideoViews | Integer |
| dislikes | Dislikes | Integer |
| shares | Social Post Shares | Integer |
| subscribersGained | SocialPageFansAdded | Integer |
| subscribersLost | SocialPageFansRemoved | Integer |
| estimatedMinutesWatched | SocialMessageVideoViewTime | Float |
| averageViewDuration | Video Average Duration | Float |

---

## Calculated Fields Required

| Calc Field | Formula | Used In |
|------------|---------|---------|
| Engagement Rate | (likes + comments + shares) / views * 100 | Widgets 7, 11, 20 |
| Net Subscribers | subscribersGained - subscribersLost | Widget 5 |
| Dislike Ratio | dislikes / views * 100 | Widgets 10, 17 |
| Like/Dislike Ratio | likes / (likes + dislikes) * 100 | Widget 10 |
| Acquisition Cost Ratio | views / subscribersGained | Widget 16 |
| Engagement Total | likes + comments + shares | Widgets 12, 15 |
| Funnel: View-to-Like Rate | likes / views * 100 | Widget 15 |
| Funnel: Like-to-Comment Rate | comments / likes * 100 | Widget 15 |
| Funnel: Comment-to-Share Rate | shares / comments * 100 | Widget 15 |
| Video Age (Days) | TODAY() - Date.ID | Widget 20 |
| Day of Week | DAYOFWEEK(Date.ID) | Widget 8 |
| Hour of Day | HOUR(Date.ID) | Widget 8 |

---

## PAGE 1: Performance & Budget Optimization

### Widget 1 - Total View Volume KPI
- **Type:** KPI Metric Card
- **Question:** "What is my total view volume this period vs. target?"
- **Decision:** `BUDGET_SET`
- **Fields:**
  - Primary Metric: SUM(SocialMessageVideoViews)
  - Comparison: Previous period (auto-calculated)
  - Sparkline: SocialMessageVideoViews by Date.ID (7-day trend)
- **Thresholds:** See threshold doc
- **Action:** If below target pace → increase budget allocation

### Widget 2 - Delivery Pacing Line
- **Type:** Line Chart
- **Question:** "Is my content pacing on track to hit period goals?"
- **Decision:** `PACING_CHANGE`
- **Fields:**
  - X-Axis: Delivery Engagement Summary Date Time (daily)
  - Y-Axis Line 1: RUNNING_SUM(SocialMessageVideoViews) — actual cumulative
  - Y-Axis Line 2: Ideal Pace Line (linear target/days_in_period * day_number)
- **Visual Config:**
  - Actual line: solid blue
  - Pace line: dashed gray
  - Area between: red fill if behind, green fill if ahead
- **Action:** Gap > 15% behind → accelerate pacing. Gap > 20% ahead → slow pacing to preserve budget.

### Widget 3 - Channel Budget Efficiency
- **Type:** Stacked Bar Chart
- **Question:** "Which channels are consuming budget efficiently vs. wasting it?"
- **Decision:** `BUDGET_REALLOCATE`
- **Fields:**
  - X-Axis: SocialPageName (channel)
  - Y-Axis: SUM(SocialMessageVideoViews)
  - Color Stack: Engagement Rate bands (High/Medium/Low)
- **Sort:** Descending by total views
- **Action:** Bottom 20% channels by views → reallocate budget to top performers.

### Widget 4 - View Quality Combo
- **Type:** Combo Chart (Dual Axis)
- **Question:** "Are we getting quality views or just volume?"
- **Decision:** `BID_STRATEGY_CHANGE`
- **Fields:**
  - X-Axis: Delivery Engagement Summary Date Time (weekly)
  - Y-Axis Left (Bar): SUM(SocialMessageVideoViews)
  - Y-Axis Right (Line): AVG(Video Average Duration)
- **Visual Config:**
  - Bars: blue gradient
  - Line: orange with markers
- **Action:** Views rising + Duration falling = low quality → switch to watch-time bid strategy. Both rising = scale. Both falling = creative refresh needed.

### Widget 5 - Net Subscriber Waterfall
- **Type:** Waterfall Chart
- **Question:** "What's my net subscriber growth trajectory?"
- **Decision:** `BUDGET_SET`
- **Fields:**
  - X-Axis: Delivery Engagement Summary Date Time (weekly)
  - Y-Axis Positive: SUM(SocialPageFansAdded)
  - Y-Axis Negative: SUM(SocialPageFansRemoved)
  - Net: SocialPageFansAdded - SocialPageFansRemoved
- **Color:** Green = gains, Red = losses, Blue = net
- **Action:** 2+ consecutive weeks of negative net → invest more in subscriber-focused content/promotion.

---

## PAGE 2: Audience & Geographic Targeting

### Widget 6 - Geographic View Distribution
- **Type:** Filled Map (Choropleth)
- **Question:** "Where is my audience actually watching from?"
- **Decision:** `GEO_TARGET`
- **Fields:**
  - Geography: Country
  - Color Intensity: SUM(SocialMessageVideoViews)
- **Color Scale:** Sequential blue (light=low, dark=high)
- **Interaction:** Click country → filters all other widgets on page
- **Action:** High-view countries not in targeting → add them. Countries with active spend + low views → reduce/exclude.

### Widget 7 - Engagement by Geography
- **Type:** Bar Chart (Horizontal)
- **Question:** "Which geos have the most engaged audiences?"
- **Decision:** `GEO_TARGET` / `BID_ADJUST`
- **Fields:**
  - Y-Axis: Country (top 20)
  - X-Axis: Engagement Rate ((likes+comments+shares)/views*100)
  - Color: Engagement Rate (diverging — red/yellow/green)
- **Sort:** Descending by Engagement Rate
- **Action:** Top 5 engagement geos → increase bid modifier +20%. Bottom 5 → decrease bid modifier -15%.

### Widget 8 - Activity Heatmap
- **Type:** Heatmap (Square)
- **Question:** "When is my audience most active?"
- **Decision:** `SCHEDULE_DAYPART`
- **Fields:**
  - X-Axis: Hour of Day (0-23)
  - Y-Axis: Day of Week (Mon-Sun)
  - Color: SUM(SocialMessageVideoViews)
- **Color Scale:** Sequential orange (light=low, dark=high)
- **Action:** Top 6 time blocks → concentrate 70% of ad delivery. Bottom 6 blocks → reduce to 5% of spend or exclude.

### Widget 9 - Subscriber Growth by Country
- **Type:** Dot Plot (Circle View)
- **Question:** "Which geos are driving subscriber growth?"
- **Decision:** `AUDIENCE_EXPAND`
- **Fields:**
  - Y-Axis: Country
  - X-Axis: SUM(SocialPageFansAdded)
  - Size: Net Subscribers (gained - lost)
  - Color: Net positive (green) vs. Net negative (red)
- **Action:** Countries with high sub growth + positive net → create lookalike audiences and expand targeting.

### Widget 10 - Audience Rejection Table
- **Type:** Table with Conditional Formatting
- **Question:** "Which audiences are rejecting my content?"
- **Decision:** `AUDIENCE_SUPPRESS`
- **Fields:**
  - Rows: Country
  - Columns: SUM(views), SUM(likes), SUM(dislikes), Like/Dislike Ratio, Dislike Ratio
  - Conditional Color: Dislike Ratio column (green < 3%, yellow 3-5%, red > 5%)
- **Sort:** Descending by Dislike Ratio
- **Action:** Countries with Dislike Ratio > 5% AND views > 1000 → suppress from targeting.

---

## PAGE 3: Content & Creative Performance

### Widget 11 - Video Performance Scatter
- **Type:** Scatter Plot
- **Question:** "Which videos hook AND retain viewers?"
- **Decision:** `CREATIVE_MANAGE`
- **Fields:**
  - X-Axis: SUM(SocialMessageVideoViews) per video
  - Y-Axis: AVG(Video Average Duration) per video
  - Color: Engagement Rate
  - Size: Engagement Total (likes+comments+shares)
  - Label: SocialMessageContent (video name) — on hover
  - Detail: SocialMessageImage (thumbnail) — on tooltip
- **Quadrant Lines:** Median of each axis
- **Action:**
  - Top-right (high views + high duration) → increase promotion budget
  - Bottom-left (low views + low duration) → pause or replace
  - Top-left (high duration + low views) → boost distribution
  - Bottom-right (high views + low duration) → fix hook/thumbnail mismatch

### Widget 12 - Engagement by Video
- **Type:** Bar Chart (Horizontal, Stacked)
- **Question:** "Which creatives generate the most interaction?"
- **Decision:** `CREATIVE_MANAGE` / `PLACEMENT_MANAGE`
- **Fields:**
  - Y-Axis: SocialMessageContent (video name, top 15)
  - X-Axis: Engagement Total
  - Stack: Likes (blue), Comments (green), Shares (orange)
- **Sort:** Descending by total engagement
- **Action:** Top 5 engagement videos → extend to additional placements (suggested, homepage). Bottom 5 → rotate out.

### Widget 13 - Video Performance Table
- **Type:** Table with Conditional Formatting
- **Question:** "Which specific videos should I pause, scale, or replace?"
- **Decision:** `STATUS_CHANGE`
- **Fields:**
  - Rows: SocialMessageContent (video name)
  - Columns:
    - SUM(views) — with 7-day trend arrow
    - AVG(Video Average Duration)
    - Engagement Rate
    - Dislike Ratio
    - SUM(SocialPageFansAdded)
    - Last 7 days vs Prior 7 days % change
  - Image: SocialMessageImage (thumbnail mini)
- **Conditional Formatting:**
  - 7-day trend declining > 20% → red background
  - 7-day trend growing > 20% → green background
  - Dislike ratio > 5% → red text
- **Action:**
  - Red rows (declining + high dislikes) → PAUSE (Status: Inactive)
  - Green rows (growing + high engagement) → SCALE (increase budget)
  - Yellow rows (flat) → REPLACE with fresh creative

### Widget 14 - Topic/Tag Treemap
- **Type:** Treemap
- **Question:** "Which content topics are driving the most traction?"
- **Decision:** `KEYWORD_MANAGE`
- **Fields:**
  - Category: SocialMessageContentTags (parsed keywords from title)
  - Size: SUM(SocialMessageVideoViews)
  - Color: Engagement Rate (diverging green/red)
- **Action:**
  - Large green tiles → increase keyword bids, create more content on this topic
  - Small red tiles → reduce keyword bids or remove from targeting
  - Large red tiles → topic is getting views but not engagement, investigate creative quality

### Widget 15 - Engagement Funnel
- **Type:** Funnel Chart
- **Question:** "Where is the engagement funnel leaking?"
- **Decision:** `SIGNAL_CONFIG`
- **Fields:**
  - Stage 1: SUM(SocialMessageVideoViews)
  - Stage 2: SUM(Social Post Likes)
  - Stage 3: SUM(Social Post Comments)
  - Stage 4: SUM(Social Post Shares)
- **Labels:** Show conversion rate between each stage
- **Action:**
  - Biggest drop at Views→Likes → thumbnail/hook problem → optimize for click signals
  - Biggest drop at Likes→Comments → no CTA/discussion prompt → optimize for comment signals
  - Biggest drop at Comments→Shares → content not share-worthy → optimize for share signals

---

## PAGE 4: Efficiency & Frequency Control

### Widget 16 - Acquisition Efficiency Trend
- **Type:** Line Chart
- **Question:** "Is my acquisition cost improving or degrading?"
- **Decision:** `BID_ADJUST`
- **Fields:**
  - X-Axis: Delivery Engagement Summary Date Time (weekly)
  - Y-Axis: Acquisition Cost Ratio (views / subscribersGained)
- **Reference Line:** 4-week moving average
- **Color:** Green when below average (efficient), Red when above (inefficient)
- **Action:** Ratio rising for 3+ weeks → lower bids on inefficient placements. Ratio falling → scale winning placements.

### Widget 17 - Content Fatigue Indicator
- **Type:** Bar Chart
- **Question:** "Which content is causing audience fatigue or rejection?"
- **Decision:** `FREQUENCY_CAP`
- **Fields:**
  - Y-Axis: SocialMessageContent (video name)
  - X-Axis: Dislike Ratio (dislikes/views*100)
  - Color: Video Age (days since publish — darker = older)
- **Sort:** Descending by Dislike Ratio
- **Filter:** Only videos with views > 500
- **Action:**
  - Old videos + high dislike ratio → cap frequency to 1/week max
  - New videos + high dislike ratio → pause immediately (creative problem)
  - Low dislike ratio → allow higher frequency (up to 3/week)

### Widget 18 - View Duration KPI
- **Type:** KPI Cards (set of 3)
- **Question:** "Are viewers watching long enough for my message to land?"
- **Decision:** `PLACEMENT_MANAGE`
- **Fields:**
  - Card 1: AVG(Video Average Duration) — current period
  - Card 2: AVG(Video Average Duration) — previous period
  - Card 3: % videos above 30-second threshold
- **Benchmark Line:** 30 seconds (minimum message delivery)
- **Action:**
  - Average < 30s → move to higher-intent placements (search, related videos)
  - Average > 60s → expand to broader placements (homepage, suggested)
  - Average between 30-60s → maintain current placement mix

### Widget 19 - Channel Engagement Breakdown
- **Type:** Stacked Bar Chart
- **Question:** "Which channel pages deserve more content investment?"
- **Decision:** `BUDGET_REALLOCATE`
- **Fields:**
  - X-Axis: SocialPageName (channel)
  - Y-Axis: Engagement Total
  - Stack: Likes (blue), Comments (green), Shares (orange)
  - Secondary metric (label): Engagement Rate
- **Sort:** Descending by Engagement Total
- **Action:**
  - Channels with engagement rate > 2x average → reallocate +30% budget
  - Channels with engagement rate < 0.5x average → reduce budget 25%
  - Channels dominated by shares → prioritize viral content formats

### Widget 20 - Content Lifecycle Bubble
- **Type:** Bubble Chart
- **Question:** "Which older content is still performing and which should be retired?"
- **Decision:** `STATUS_CHANGE`
- **Fields:**
  - X-Axis: Video Age (days)
  - Y-Axis: Engagement Rate
  - Size: SUM(SocialMessageVideoViews)
  - Color: Trend (7d growth = green, 7d decline = red, stable = gray)
  - Label: SocialMessageContent (on hover)
- **Quadrant:**
  - Old + High Engagement = "Evergreen" → extend promotion
  - Old + Low Engagement = "Retire" → pause/archive
  - New + High Engagement = "Rising Star" → scale immediately
  - New + Low Engagement = "Underperformer" → creative refresh or kill
- **Action:**
  - "Retire" quadrant (Age > 90 days + Engagement < 1%) → set status to paused
  - "Evergreen" quadrant → continue promotion, reference for new content creation

---

## Global Filters

| Filter | Type | Field | Default |
|--------|------|-------|---------|
| Date Range | Date Picker | Delivery Engagement Summary Date Time | Last 30 days |
| Channel | Multi-select Picker | SocialPageName | All |
| Country | Multi-select Picker | Country | All |
| Video Search | Text Input | SocialMessageContent | Empty |
| Min Views | Input (number) | SocialMessageVideoViews threshold | 100 |
