# BELLA Hero / LCP Mini Performance Pass Report

Date: June 23, 2026  
Scope: diagnostic-first Hero LCP pass only

## LCP Diagnostic Findings

### Measurement conditions

- Production `next build` + `next start`
- Chrome / Lighthouse 12.8.2
- 375 × 667 mobile emulation, device scale factor 2
- Simulated Slow 4G:
  - RTT: 150 ms
  - throughput: 1,638.4 Kbps
  - request latency: 562.5 ms
  - download throughput: 1,474.56 Kbps
  - upload throughput: 675 Kbps
- 4× CPU slowdown
- Fresh incognito Chrome process and cold storage/cache per invocation
- Five runs per locale; reported aggregate is the median
- Actual English route `/`; Arabic route `/ar` (avoids measuring an English locale redirect)

### Exact LCP element

Lighthouse selected the same element in every one of the ten baseline runs.

**English and Arabic**

- Tag: `<span>`
- Text: `BELLA`
- Selector:
  `div.relative > div.mb-4 > div.group > span.whitespace-nowrap`
- Lighthouse node label: `BELLA`
- Classes:
  `whitespace-nowrap font-bold leading-none text-white/[0.04] [-webkit-text-stroke:0.5px_rgba(255,255,255,0.08)]`
- Mobile bounds: approximately 418 × 96 px
- Source: `components/ui/aceternity/text-hover-effect.tsx`

### Five-run baseline

| Locale | Run | Score | FCP | LCP | TBT | CLS | LCP element |
|---|---:|---:|---:|---:|---:|---:|---|
| EN | 1 | 65 | 1,083 ms | 6,111 ms | 367 ms | 0 | Hero `BELLA` span |
| EN | 2 | 71 | 1,078 ms | 6,002 ms | 166 ms | 0 | Hero `BELLA` span |
| EN | 3 | 72 | 1,015 ms | 5,969 ms | 153 ms | 0 | Hero `BELLA` span |
| EN | 4 | 76 | 993 ms | 6,022 ms | 52 ms | 0 | Hero `BELLA` span |
| EN | 5 | 76 | 957 ms | 6,092 ms | 68 ms | 0 | Hero `BELLA` span |
| AR | 1 | 73 | 1,690 ms | 6,702 ms | 61 ms | 0 | Hero `BELLA` span |
| AR | 2 | 74 | 1,682 ms | 6,696 ms | 48 ms | 0 | Hero `BELLA` span |
| AR | 3 | 74 | 1,677 ms | 6,693 ms | 57 ms | 0 | Hero `BELLA` span |
| AR | 4 | 73 | 1,685 ms | 6,699 ms | 108 ms | 0 | Hero `BELLA` span |
| AR | 5 | 73 | 1,684 ms | 6,697 ms | 71 ms | 0 | Hero `BELLA` span |

Baseline medians:

| Metric | EN median | AR median |
|---|---:|---:|
| Lighthouse score | 72 | 73 |
| FCP | 1,015 ms | 1,684 ms |
| LCP | 6,022 ms | 6,697 ms |
| TBT | 153 ms | 61 ms |
| CLS | 0 | 0 |

### LCP phase breakdown

| Locale | TTFB | Resource load delay | Resource load duration | Element render delay | Dominant phase |
|---|---:|---:|---:|---:|---|
| EN median | 472 ms | 0 ms | 0 ms | 5,514 ms | Element render delay (~92.1%) |
| AR median | 461 ms | 0 ms | 0 ms | 6,236 ms | Element render delay (~93.1%) |

The wordmark is plain text in a system font, so it has no resource-load phase. Network discovery or image/font download is not the LCP bottleneck.

### Current rendering path

1. **Does the LCP element exist in server-rendered HTML?**
   - Yes, the Hero wordmark is server-rendered.
   - However, it is emitted inside `<div hidden id="S:0">`, the hidden streamed payload for the route-level Suspense boundary created by `app/loading.tsx`.
   - The initially visible server HTML is the full-screen loading fallback, not the Hero.

2. **Is the LCP element or an ancestor initially hidden by Hero animation CSS?**
   - No.
   - The base wordmark span has no `opacity`, `visibility`, filter, transform, or animation delay.
   - Its Hero content ancestors are emitted with final server styles.
   - `PageTransition` is emitted as `style="opacity:1;transform:none"` on the initial request because `AnimatePresence initial={false}` suppresses its initial route animation.
   - `BlurText` does begin its own words at `opacity: 0`, but it is not the measured LCP element.

3. **Does the LCP element have an animation delay?**
   - No. Its only effect is a CSS-only hover overlay; the visible base span is immediate once its hidden route payload is revealed.

4. **When does it reach its final visible paint?**
   - A diagnostic DevTools-throttled trace recorded the first loading-fallback `BELLA` candidate at 1,980 ms (contentful size 6,342).
   - The Hero wordmark became the replacement LCP candidate at 3,903 ms (contentful size 40,875).
   - The simulated Lighthouse model converts the same route behavior to the 6,022 ms English median.
   - Therefore the late paint happens at the route boundary reveal, before any wordmark hover interaction and independently of its own animation.

### Arabic-specific investigation

1. **Same or different LCP element?**
   - The same Hero `BELLA` span is selected in all EN and AR runs.
   - AR is 675 ms slower at the median.

2. **Markazi Text loading**
   - `Markazi Text` is loaded through `next/font/google`.
   - `preload` is not written explicitly, but Next.js documents and applies `true` by default.
   - The production responses include the Markazi Arabic subset (`9a6f0c4a818c35a9…woff2`) in the HTTP `Link` preload header for both routes.
   - It uses `font-display: swap`.
   - Lighthouse’s font-display audit passes.
   - The measured LCP span itself uses `Georgia, "Times New Roman", serif`; Markazi is not its font dependency.

3. **Locale / `isRTL` waterfall**
   - There is no client-only locale waterfall in the Hero.
   - `useLocale()` resolves during server rendering through the existing provider.
   - The server HTML already contains the correct `dir="ltr"`/`dir="rtl"` on the MorphingText wrapper and localized Hero copy before hydration.

4. **MorphingText initialization**
   - MorphingText is not the LCP element.
   - Its server output is a fixed-size canvas plus screen-reader text.
   - Its drawing loop begins after hydration and does not resize the Hero column.
   - Median TBT is low (153 ms EN, 61 ms AR), so it is not the dominant delay.

The remaining Arabic delta is consistent with the larger Arabic font/style workload after CSS discovery: the Arabic run loads additional Markazi/Noto Arabic ranges and spends more time in style/layout and script evaluation. It can cause extra sibling-layout repaint work, but it does not explain the primary six-second LCP because the LCP resource phases remain zero and the same Georgia wordmark is selected.

### Root cause and regression conclusion

The primary root cause is **not an opacity-zero Hero entrance**. It is the route-level loading boundary:

1. `app/loading.tsx` is initially visible.
2. The complete locale page, including the Hero, is streamed inside hidden `#S:0`.
3. The Hero wordmark becomes visible only when the boundary replacement runs.
4. Because the Hero wordmark is much larger than the loading fallback’s wordmark, it replaces the earlier candidate and sets the final LCP timestamp.

The previous pass worsened this behavior in two ways:

- `TextHoverEffect` changed from an SVG treatment to two large CSS text spans. The visible base span is now a 40,875-contentful-pixel candidate, decisively larger than the loading fallback.
- The finalized localized page emits more complete Home markup, especially in Arabic, behind the same route-level loading boundary. That increases the amount of route work completed before the hidden payload is revealed.

The fix that advances **actual Hero paint**, rather than merely suppressing the measured candidate, is to remove or narrow the route-level `app/loading.tsx` boundary so the Hero can stream and paint immediately while below-fold content continues independently. `app/loading.tsx` and `app/[locale]/page.tsx` are explicitly outside this mini-pass scope.

Changing the wordmark to canvas/path content solely to make it ineligible for LCP would leave the Hero appearing at the same late time and would only game the metric. That approach is intentionally rejected.

## Fixes applied

No production source file was changed. The diagnosis did not support any of candidate fixes A–F, and the confirmed root cause is outside the explicit file allowlist.

| Candidate | Applied? | Evidence and decision |
|---|---|---|
| Fix A — remove initial opacity gate | No | The measured LCP span and its Hero ancestors are emitted at opacity 1. `BlurText` has an opacity entrance, but it is not the LCP candidate; changing it would violate the instruction not to modify non-LCP animation. |
| Fix B — separate decorative animation | No | The base wordmark is already a static span. Its hover-gradient overlay is an absolutely positioned sibling and does not gate the base span’s paint. |
| Fix C — Arabic font preload | No | Markazi is already preloaded through the production HTTP `Link` header, uses `font-display: swap`, passes Lighthouse’s font-display audit, and is not the measured wordmark’s font. |
| Fix D — defer heavy Hero effects | No | Mobile particles are already omitted, the continuous gradient is compositor-driven, and median TBT is only 153 ms EN / 61 ms AR. The trace ties the late candidate to the route-boundary reveal, not Hero effect initialization. |
| Fix E — server-resolve RTL | No | Locale copy and direction are already present correctly in server HTML. There is no client-only locale waterfall. |
| Fix F — defer MorphingText | No | MorphingText is a fixed-size canvas, is not the LCP element, and does not account for the dominant render delay. |

The only file created by this pass is this diagnostic report.

## Before/after measurement

The post-pass set is a second independent five-run validation of the unchanged production code. It is intentionally reported rather than presenting a metric-only workaround as a performance fix.

| Metric | EN Baseline (median, 5 runs) | EN After Mini Pass (median, 5 runs) | AR Baseline (median, 5 runs) | AR After Mini Pass (median, 5 runs) |
|---|---:|---:|---:|---:|
| Lighthouse Score | 72 | 76 | 73 | 74 |
| FCP | 1,015 ms | 981 ms | 1,684 ms | 1,679 ms |
| LCP | 6,022 ms | 6,018 ms | 6,697 ms | 6,694 ms |
| TBT | 153 ms | 78 ms | 61 ms | 75 ms |
| CLS | 0 | 0 | 0 | 0 |
| LCP Element | Hero `BELLA` span | Hero `BELLA` span | Hero `BELLA` span | Hero `BELLA` span |

Post-pass individual runs:

| Locale | Run | Score | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|
| EN | 1 | 76 | 981 ms | 6,021 ms | 71 ms | 0 |
| EN | 2 | 76 | 996 ms | 5,716 ms | 149 ms | 0 |
| EN | 3 | 76 | 981 ms | 6,018 ms | 78 ms | 0 |
| EN | 4 | 78 | 988 ms | 5,195 ms | 123 ms | 0 |
| EN | 5 | 76 | 974 ms | 6,019 ms | 62 ms | 0 |
| AR | 1 | 62 | 2,315 ms | 6,724 ms | 327 ms | 0 |
| AR | 2 | 73 | 1,828 ms | 6,694 ms | 45 ms | 0 |
| AR | 3 | 74 | 1,679 ms | 6,694 ms | 53 ms | 0 |
| AR | 4 | 74 | 1,674 ms | 6,691 ms | 75 ms | 0 |
| AR | 5 | 74 | 1,674 ms | 6,316 ms | 97 ms | 0 |

## Visual confirmation

The production Hero was visually inspected after the diagnostic pass in both locales at:

- 1440 × 1000 desktop
- 390 × 844 mobile
- 360 × 844 mobile

The layout, brand treatment, locale direction, copy, CTA arrangement, section fade, and existing entrance character remain intact. The intentionally oversized decorative wordmark remains clipped by the Hero on narrow screens without causing document-level horizontal overflow.

## Regression checks

| Check | Result |
|---|---|
| EN and AR desktop visual integrity | Pass |
| EN and AR at 390 px | Pass |
| EN and AR at 360 px | Pass |
| Premium Hero entrance retained | Pass; no production animation was altered |
| Reduced-motion continuous effects paused | Pass; morph text, spinning text, particles/continuous background state remained stable during the timed check |
| Hydration errors / console warnings | None observed in six production viewport runs or the reduced-motion run |
| CLS | 0 in all twenty Lighthouse runs |
| EN FCP vs previous-pass 1,451 ms gate | Pass; post-pass median 981 ms |
| EN TBT ≤ 668 ms | Pass; post-pass median 78 ms |
| Target TBT ≤ 600 ms | Pass in both locales |
| LCP < 3,000 ms | **Fail**; EN 6,018 ms, AR 6,694 ms |
| Lint | Pass |
| TypeScript | Pass |
| Production build | Pass |

## Remaining gap

The hard LCP target is not reachable honestly within the authorized Hero-only file set.

The next change must address the route-level reveal:

1. Remove `app/loading.tsx` for the initial Home request, **or**
2. Narrow the loading/Suspense boundary so `HeroSection` and critical navigation render outside it while below-fold sections stream behind their own boundaries.

That change requires work in `app/loading.tsx`, `app/[locale]/page.tsx`, and possibly the locale layout. Those files were explicitly frozen by this brief, except for font preload configuration. Once that scope is approved, the existing trace predicts that the first visible loading candidate (approximately 1.98 seconds in the diagnostic DevTools trace) can be replaced by an immediately streamed Hero rather than a late 3.90-second Hero candidate.

Merely changing `TextHoverEffect` to canvas, SVG paths, or another LCP-ineligible representation could produce a sub-3-second reported LCP by leaving the loading screen as the final candidate, but it would not make the Hero appear sooner. That is not accepted as a valid performance fix.

## Manual confirmation gaps

- Safari/WebKit was not available.
- Physical iOS and Android devices were not available.
- Lighthouse results are controlled lab simulations; field Core Web Vitals should be checked after deployment once the route-level loading boundary is addressed.
