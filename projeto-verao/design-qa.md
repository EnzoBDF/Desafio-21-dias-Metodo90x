# Design QA — Projeto Verão, 25/10/2026

final result: passed

Latest scoped update: team section background changed to #000000 as requested, matching the supplied photograph. White prose and existing light headings retained; photo, typography, content and layout unchanged. Build/TypeScript passed. Browser confirms black background, white prose and no horizontal overflow. Rendered evidence inspected: `reference/team-black/section.png`. No actionable visual issue found for this single-color change. Local preview updated; no push.

Latest revision restores the coastal turquoise/seafoam/sun-yellow palette and applies the requested #FF6A13 as the primary accent and CTA pulse. Button foreground #052F34 preserves 5.01:1 contrast on this exact orange; orange text uses a darker related shade. Team sea green, turquoise community/investment bands and pale yellow investment card restored. Quiz/analysis/favicons follow the shared tokens. Build/TypeScript and ten palette contrast pairs passed. Browser at 1280px and 390px confirms RGB(255,106,19) on CTAs, no horizontal overflow, empty error/warning console. Evidence `reference/turquoise-orange/hero.png` and `mobile-hero.png`. Fonts, layout, imagery and motion retained; no actionable P0/P1/P2 findings for this scoped revision. No push.

Latest orange/white palette trial: white page/card surfaces, orange #FF8A3D actions, #FF9B54 section bands, pale orange supporting surfaces and #AD3E0D team/footer with light text. Main text is warm dark #38251C. Investment card is white. Shared quiz/analysis styles and favicon updated; typography, layout, images, motion and destinations retained. WhatsApp retains its identifying green.

Rendered at 1280px and 390px: hero, team and investment inspected; no horizontal overflow or console errors/warnings. Purchase button keyboard focus remains visible. Build/TypeScript, palette contrast checks (ten pairs at least 4.5:1), checkout-link check and diff whitespace check passed. Evidence in `reference/orange-white/hero.png`, `mobile-hero.png`, `mobile-team.png`, `mobile-investment.png`. No actionable P0/P1/P2 issue found for this color trial. Local preview updated; no push.

Latest palette update: replaced the restrained beige/navy treatment with turquoise #17CDB8, coral #FF8066 and sun yellow #FFD44F. Deep ocean text #083E45 and sea green #007B75 maintain readable contrast. Community and investment sections use saturated turquoise, the team section uses sea green, and method/bonus surfaces alternate light seafoam, warm yellow and coral. Hero has a coastal mint-to-ivory gradient and a matching mobile photo overlay. Quiz, analysis and favicon follow the same palette. Fonts, copy, supplied assets, layout and motion retained.

Rendered desktop (1280px) and mobile (390px) reviewed, including the hero, full-page sequence, team, bonuses and investment. Evidence: `reference/summer-palette/desktop-hero.png`, `desktop-full.png`, `mobile-hero.png`, `mobile-full.png` and section crops. No horizontal overflow, no pending reveals after scrolling, FAQ toggle works, all seven CTAs retained, console errors/warnings empty. Quiz initial and analysis empty state also reviewed. Build/TypeScript, application ESLint, quiz/checkout/palette tests and shared offer verification passed. Ten palette combinations pass 4.5:1 normal text contrast. No actionable P0/P1/P2 findings for this scoped color revision. Preview running locally; no push or publication for this revision.

Latest aesthetic update: implemented the three approved recommendations. Method cards now form an ordered list with 01/02/03 and existing line icons. The professionals section uses the brand navy background, light text and a two-column desktop composition, stacking on mobile; the supplied square photo remains complete. Four existing bonuses now have individual cards, separate from the program inclusions, in two desktop columns and one mobile column. Fonts, palette, assets, purchase destinations and CTA pulses retained; no new program deliverables or professional credentials added.

Matched-input visual QA: before `reference/aesthetic-review/{metodo,batista,beneficios}.png` and after `reference/aesthetic-update/mobile-{metodo,batista,beneficios}.png`, all at the same 488 × 884 CSS viewport. Inspected side-by-side `comparison-metodo.jpg`, `comparison-batista.jpg`, `comparison-beneficios.jpg` in `reference/aesthetic-update/`; desktop composition inspected separately. Full captures and measured section bounds saved in the same directory. Checked 320 × 740, 488 × 884, 768 × 1024 and 1440 × 1000: no horizontal overflow, correct column changes, no pending reveals after scrolling. FAQ toggling passed; console errors/warnings empty. Production build/TypeScript, ESLint on app/components/lib, shared offer verification, checkout-link and palette checks passed. No remaining actionable P0/P1/P2 findings. Local preview remains available; no publication.

Latest CTA-motion refinement: seven purchase buttons receive a restrained coral halo pulse, 4.8s cycle with long pauses, through a pointer-transparent pseudo-element. Text and button dimensions stay fixed. Hover, keyboard focus and active press disable the pulse; reduced-motion users receive no pseudo-element animation. Browser computed styles confirmed the animation on all seven CTAs and `none` on keyboard focus. No horizontal overflow at 390px. Build/TypeScript passed. Focused rendered evidence `reference/cta-pulse.png` inspected; fonts, colors, copy and imagery retained. No actionable P0/P1/P2 layout or interaction findings. The still capture records layout, while live computed styles/focus checks verify motion.

Latest team-content update: supplied image of Israel Correia and Batista replaces the group picture in the former Batista section. Source attachment copied unchanged (matching SHA-256) to `public/images/equipe-metodo-90x.jpeg`; 1254 × 1254px, rendered complete, 520 × 520px on desktop. Heading and copy now introduce both professionals jointly, using only the supplied names and existing program scope, with no invented credentials or individual responsibilities. Supplied image and rendered section inspected together. Evidence `reference/team/mobile-section.png` / `desktop-section.png`, cropped from the corresponding full-page browser captures using measured section positions. Viewports 390 × 844 and 1440 × 1000; image loaded at both sizes, no horizontal overflow, no console errors/warnings. Original fonts/colors/motion retained; copy and photo change intentionally follow the user's request. Build/TypeScript, component lint and checkout-link check passed. No remaining P0/P1/P2 findings.

Latest scoped update: removed the offer header and returned WhatsApp to the bottom-right corner on phones as requested. Browser confirmed zero header elements at 390/1440px and fixed CTA positioning, 16px/22px bottom spacing, respectively. Mobile has no horizontal overflow. Same font/color/image/content surfaces retained. Before/after comparison inspected in `reference/mobile-background/comparison-no-header.jpg`; final mobile evidence `mobile-no-header.png` in the same folder, equal-size 390px viewport captures. Production build/TypeScript, component lint and checkout check passed. No remaining P0/P1/P2 findings for this scoped update.

## Current revision — full mobile hero background

- Target: user-requested existing photo covering the entire first section on phones, keeping the brand typography/palette and readable copy.
- Before: `reference/refinements/04-mobile-hero.png`. After: `reference/mobile-background/mobile-390.png`; 375 × 812 pixels in both captures at 390 × 844 CSS viewport, no density correction. Equal-size side-by-side evidence: `reference/mobile-background/comparison.jpg`.
- Additional evidence: `reference/mobile-background/mobile-320.png` and `desktop.png`, at 320 × 740 and 1440 × 1000 CSS viewports respectively.
- Visual review: photo covers the complete mobile hero without rounded mask; warm translucent gradient supports navy text, coral action and original type pairing. Image is no longer a separate block below the mobile copy. Image label remains visible. Desktop composition remains the approved lateral image layout.
- Browser measurements: hero/photo width and height match; no horizontal overflow at 320 or 390px; button pointer events remain active, visual layer does not intercept input. Console errors/warnings empty.
- Build/TypeScript, lint of the changed component and checkout-link check passed. Mobile background is static while the copy retains its existing restrained entry animation. No new asset, dependency or published change.
- Five surfaces checked: same fonts and sizes; full-section image coverage and intact spacing; original palette with readable overlay; existing image/crop quality; same copy and action. Before/after inspected together, desktop verified separately. No actionable P0/P1/P2 issues found.

final result: passed

## Previous revision — four approved visual refinements

The user approved all four recommendations from `reference/audit-beauty/recomendacoes.md`. The acceptance target is that captured page with the specified layout refinements, preserving the brand fonts, palette, images, destinations and motion.

- Source baseline: `reference/audit-beauty/01-abertura.png`, `02-resultados.png`, `03-oferta.png`, `04-celular.png`.
- Rendered implementation: `reference/refinements/01-desktop-hero.png`, `02-desktop-results.png`, `03-desktop-offer.png`, `04-mobile-hero.png`, `05-mobile-offer.png`, `06-mobile-320.png`, `07-tablet.png`, `08-desktop-full.png`.
- CSS viewports: 1440 × 1000, 390 × 844, 320 × 740 and 768 × 1024. Desktop hero capture 1425 × 990, mobile hero capture 375 × 812; full-page desktop 1425 × 13003. Browser viewport captures exclude browser framing/scrollbar. Before and after images use the same capture mechanism and dimensions; compared at equal resize scale without unequal density changes.
- Focused before/after comparisons: `reference/refinements/comparison-hero.jpg` and `comparison-offer.jpg`. Composition/region overview: `reference/refinements/overview.jpg`; full rendered page also inspected through the browser traversal and capture.

### Four requests verified

1. Hero: left-aligned editorial copy with existing beach photo at right, larger header brand. Photo stacks below copy on small screens. Campaign illustration clearly labeled. Photo moved from the benefits block; no new image created.
2. Results: short mixed-case heading, cards follow the original image dimensions instead of letterboxing a fixed landscape box. Three/two/one-column responsive presentation. All seven comparative images remain complete; measured aspect-ratio error below 0.001. Featured image uses an appropriate larger image size.
3. Price: old price struck through, R$ 97 in large DM Sans, installments secondary. Five existing benefits, purchase action and seven-day guarantee grouped in the same card. Checkout unchanged.
4. Mobile: reduced opening/section spacing, readable 14px support copy, WhatsApp in the header. At 320px brand right edge 178.6 and WhatsApp left edge 245, leaving clear separation. No horizontal overflow at any checked width.

### Fidelity and verification

- Typography: original DM Sans/Cormorant pairing retained; price uses bold numeric hierarchy; no clipped text observed.
- Spacing/layout: approved two-column hero and natural-ratio gallery replace the older centered/boxed regions; offer has readable grouping; mobile stacks cleanly.
- Colors: original coral, sand, peach, navy and yellow tokens retained, along with recognizable green WhatsApp.
- Images: existing assets only; complete comparisons, no aspect distortion, appropriate campaign subject crop and consistent rounded masks. Zero broken loaded images.
- Copy/content: commercial terms and results caveats preserved; new short result heading and price-card title implement the approved hierarchy. All seven purchase destinations remain valid.
- Interactions: native FAQ open/close, investment anchor and keyboard focus checked. No new animation behavior; reduced-motion rules retained. Full browser console check returned no errors or warnings. Existing animation targets revealed on traversal, and keyboard-focused buttons remained visible.
- Production build/TypeScript, application lint, quiz/palette/checkout checks and shared offer validation passed. No deployment or payment; no physical-device or full screen-reader audit.
- Comparison history: four audit findings implemented, then compared against the captured baseline. Image sizing for the featured seventh record refined to avoid unnecessarily small downloaded resolution; production rebuilt and browser refreshed. Both the helper preview and the user's existing browser tab were inspected, and the existing tab was refreshed to the final version. No remaining actionable P0/P1/P2 findings.

final result: passed

## Previous revision — summer fonts, palette and motion

The user explicitly requested the earlier brand fonts and colors plus smooth animations. The earlier black-page comparison below is historical; black, Inter and Plus Jakarta Sans are no longer acceptance targets for the current identity.

- DM Sans used for body and controls; Cormorant Garamond for titles and italic headline accent. Confirmed via browser computed styles. Hero is 64px desktop / 44px mobile to accommodate the chosen editorial font.
- Page background #FFF6EA, text #21364B, secondary text #536276, buttons #E98673, alternate surfaces #FBEBDD/#FFFCF7, accent #B45F4D and yellow #F6D577. Existing navy footer and green WhatsApp identity retained. Scoped tokens preserve the quiz and analysis.
- Same section order, content, image slots and destinations. Media remains intact. No new assets or dependencies.
- Captures: `reference/summer/desktop-hero.png`, `desktop-full.png`, `mobile-hero.png`, `mobile-full.png`, `mobile-faq.png` and `mobile-320.png`. Same desktop/mobile CSS viewports as the prior comparison. Current full/focused comparison sheets are `reference/summer/comparison-structure.jpg` and `comparison-hero.jpg`; original reference left/top and current page right/bottom. Font/color differences are requested adaptations; composition and content order are the visual comparison targets.
- Motion: hero children enter in sequence; 49 individual blocks reveal once with opacity/transform over 650ms as they enter the viewport. Native scrolling retained. Hover effects limited to fine pointers, with brief button lift and slight community-photo zoom. FAQ panel enters over 260ms. Reduced-motion CSS removes effects, and its media-query listener immediately reveals pending content. Pending styles are added only by the effect, so the server HTML remains fully visible without JavaScript. Keyboard focus reveals the focused block.
- Browser verification: full traversal desktop and mobile; 49 revealed / 0 pending at end, 0 broken loaded images. No horizontal overflow at 320/390/1440px. FAQ open/close worked. Console errors/warnings empty. Reduced-motion behavior reviewed in code; system preference was not changed.
- Validation: production build and TypeScript, application ESLint, quiz/palette/checkout tests passed. Text/button palette contrast covered by the existing palette check. No deployment or payment.
- Current review of all five surfaces: typography matches the chosen font pairing without clipping; layout and section rhythm preserved; colors use original tokens; all photos remain complete and loaded; commercial copy and functional controls preserved. No actionable P0/P1/P2 findings. Earlier source-arrow P3 remains optional.
- Comparison history: initial palette/font revision reviewed on desktop and mobile. No corrective visual changes required after this comparison; motion states verified by traversing the complete page.

## Visual truth and state

- Source: https://rebueno.com.br/analisepaginabatista/; captured HTML and styles in `reference/source.html`.
- Implementation: http://127.0.0.1:3002/oferta, final production build, direct access without quiz answers.
- Desktop CSS viewport: 1440 × 1000. Source `reference/desktop.png`: 1425 × 13058 pixels. Implementation `reference/implementation-desktop.png`: 1425 × 12848 pixels.
- Mobile CSS viewport: 390 × 844. Source `reference/mobile.png`: 375 × 14676 pixels. Implementation `reference/implementation-mobile.png`: 375 × 14450 pixels.
- Screenshots exclude the 15-pixel browser scrollbar. Equal CSS scale and image density in both captures; no density correction needed. Comparison sheets resize both equally.
- First FAQ item initially open, all other items closed; fixed navigation. Final capture refreshed after production rebuild and server restart.

## Comparison evidence

- Full-page composition: `reference/comparison-full.jpg`, source above and implementation below, each split into consecutive 3000-pixel strips at equal scale.
- Focused typography, margins, headline wrapping, button and first-fold comparison: `reference/comparison-desktop-hero.jpg` and `reference/comparison-mobile-hero.jpg`, source left and implementation right.
- Expanded FAQ: `reference/faq-desktop.png` and `reference/implementation-mobile-faq.png`. Additional captures: `reference/implementation-mobile-price.png`, `reference/implementation-320.png`, `reference/implementation-tablet.png`.

## Findings and five fidelity surfaces

No actionable P0/P1/P2 findings remain within the requested adaptation.

- Fonts and typography: original Inter 400/500/600 and Plus Jakarta Sans 500/600 loaded locally through Next font. Hero 56px desktop and 40px mobile, matching 1.07 line height, weight, tracking and wrapping in the focused comparisons. No truncation or overlapping text observed.
- Spacing and layout rhythm: original 1068px content, 734px reading measure, 24px page margins, 128/80px section padding, 160/96px hero top padding, 24/16px grids, rounded surfaces and section markers retained. Same section sequence. Media regions intentionally adapt to the number and aspect ratio of existing images, so individual section heights differ.
- Colors and tokens: original black page, #141414 cards, white headings, gray secondary text and red/pink/orange/yellow border gradient retained. Offer tokens are scoped and do not recolor the quiz or analysis.
- Image quality and fidelity: all seven original result montages are displayed with contain, preserving complete comparisons and existing blur. Existing community images replace empty video slots; existing campaign image is identified as illustrative. No hotlinked pictures, generated replacements, empty placeholders or false video controls. Existing project brand and icon system retained as part of the adaptation.
- Copy and content: original headline and commercial sequence retained. Empty CREF, business-contact, student-count, video and message placeholders are omitted. Proof headings reflect the actual supplied photographs; no names, periods, metrics, message screenshots or video testimonials were fabricated. Material and bonus copy follows the supplied reference. Results caveat explains that photographs cover different periods.

## Expected adaptations

- Project Verão branding replaces the reference studio's branding.
- Four existing community photos replace the five video placeholders. The seventh result montage replaces the message/count placeholder area as one featured real story. This preserves the three proof sections without inventing media.
- The existing WhatsApp button and checkout are retained. Purchase buttons use the functioning checkout rather than the reference's unresolved `#checkout` fragment.
- The source reference uses a chevron; existing project arrows remain. This is a minor icon detail, classified P3.
- Quiz and analysis stay available. The offer headline is now fixed to the supplied reference; the analysis continues to show the visitor's choices.

## Interaction and technical verification

- Browser inspection: 320 × 740, 390 × 844, 768 × 1024 and 1440 × 1000; no horizontal page overflow.
- All six FAQ items opened and closed; first remains initially open. Investment anchor navigated to the price section.
- All seven purchase buttons point to the existing Greenn checkout. WhatsApp and Instagram destinations preserved. No purchase performed.
- No broken loaded images; console error/warning capture returned an empty list.
- Production build and TypeScript passed. ESLint on `app`, `components`, `lib` and the preparation script passed. Existing global lint still flags CommonJS `require()` in the preexisting `.cjs` tests; no application lint errors.
- Existing quiz, palette, checkout-link tests and shared offer verification passed. Shared verification updated for the seven static records and six FAQ entries replacing the previous carousel.
- React review: main content remains server rendered; shared client CTA retains analytics; native details require no new client state; images have sizes and alt text; font variables and CSS are isolated from other routes.
- No publication, commit or payment. Physical touch and a full screen-reader session were not tested.

## Comparison history

1. Initial rendered desktop/mobile captures compared together with the source: hero wrapping, colors and spacing matched; image distribution and branding differed intentionally. No actionable P0/P1/P2 visual drift found.
2. Removed an implementation-oriented sentence from the result note. Rebuilt, restarted and recaptured both sizes; refreshed comparison sheets. Composition and typography remain matched. No pending P0/P1/P2 findings.

## Implementation checklist

- [x] Capture source and implementation, desktop and mobile.
- [x] Compare complete composition and focused readable regions.
- [x] Preserve existing image contents and functional external destinations.
- [x] Check FAQ, responsive layouts, loaded images and console.
- [x] Pass production build, application lint and relevant existing checks.
- [x] Leave local preview running and available to inspect.

## Follow-up polish

- P3: use the exact source chevron if a later branding pass calls for matching control icons as well as layout.
