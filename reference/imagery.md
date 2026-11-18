# Imagery

Load this when the surface has a photograph, product shot, illustration, map, specimen or texture —
or when the brief implies one and you were about to design around the absence.

The skill's older instinct was: if there is no photo, let typography carry the page. That is a good
**fallback**, not a policy. When the subject has a face, a product, a place or an artifact, a page
without the picture is a page about nothing in particular. Use the image when the image exists, and
make the page work when it doesn't — but never pretend those are the same decision.

## Step 1: answer honestly what the subject is

| The picture… | What to do |
| --- | --- |
| **exists and you have it** | Use it. Art-direct it (below). It is the fastest way to stop looking generic. |
| **exists but you don't have it** | Do not substitute a grey box, a stock photo, or a generated blob. Either write the shot list (what to photograph, from where, at what light) or design a surface that does not need it: specimen, diagram, drawing, data. |
| **does not exist** (abstract service, infrastructure, a process) | Diagram, texture, or nothing. Empty space with good type is a decision. A placeholder is a confession. |

Write one line in the plan saying which of the three you are in. It changes what "done" means.

## Step 2: art direction, before markup

1. **One image is the subject.** A hero, a specimen, a portrait. Everything else supports it.
   Two equal-weight photographs compete and both lose.
2. **Name the focal point** in words ("the crust, not the plate") and then in CSS
   (`object-position: 50% 35%`). If you cannot say where the eye lands, the crop is arbitrary.
3. **Decide the crops per breakpoint** — 3:2 for wide, 4:5 or 1:1 for narrow — and decide what
   leaves the frame. Cropping is composition; letting `cover` decide is abdication.
4. **One treatment for the whole set**: full colour, duotone, grain, or a scrim. Mixing treatments
   across a page is the visual signature of stock photography.
5. **Light and angle consistent** inside a set. Two photos shot from different heights read as two
   different products.

## Step 3: markup that survives measurement

**Web**

- `width` and `height` attributes on every `<img>` — reserve the box, protect CLS.
- `srcset` + `sizes` for the breakpoints you actually use; the hero needs at least 1x and 2x.
- `loading="lazy"` below the fold; the hero is **not** lazy and gets `fetchpriority="high"`.
- `decoding="async"`.
- `alt` says what matters to the task ("Pão de fermentação natural, casca aberta no corte"), not
  what the file is called. Decorative images get `alt=""`, not a missing attribute.
- `object-fit: cover` plus a focal `object-position`. `fill` stretches — it is always a bug.
- Text over a photograph needs a scrim, and the scrim needs a **measured** worst-case contrast, not
  an average sampled from the pretty part of the picture.
- Files live in the repo (`images/`, `img/`). Never hotlink a third-party URL: it breaks offline and
  it breaks the eval.

**Flutter**

- `Image.asset(..., fit: BoxFit.cover, alignment: Alignment(x, y), cacheWidth: …)` with
  `semanticLabel` for meaning, `excludeFromSemantics` for decoration.
- `precacheImage` for the above-the-fold image; `frameBuilder` for a fade **inside a box that already
  has the right aspect ratio**, so nothing jumps when the bytes land.
- Same rules as web: one treatment, named focal point, no stretching.

## Step 4: verify without eyes

```
node scripts/shot.mjs page.html out.png 1440 900 --full --deep
```

Read `images[]` and `imageFlags[]`:

| Field | What it proves |
| --- | --- |
| `alt: "MISSING"` | accessibility hole, and probably a decorative image that wasn't decided |
| `stretched: true` | aspect ratio lost (`object-fit: fill`) — a visible defect every time |
| `attrs: "none"` | no width/height/loading/srcset — CLS risk and a lazy implementation |
| `broken: true` | file missing or path wrong — the page has a hole right now |
| `natural` vs `rendered` | whether you are upscaling a small file into a big box |

What measurement **cannot** prove: whether the photograph is good, whether the crop cuts someone's
head off, whether the treatment matches the brand. Say that in the report instead of implying you
looked.

## Anti-patterns

- Grey placeholder boxes with a camera glyph, `placeholder.com`, or a hotlinked Unsplash URL.
- An icon in a circle on every section header — the visual equivalent of saying "feature" five times.
- Stock people laughing at a salad; handshakes; a rocket; an upward arrow made of triangles.
- Duotone on the hero, full colour on the cards, grain on the footer.
- Text laid directly over a photo with no scrim, then "checked" by eye on the bright spot.
- A 3 MB hero, or a hero that is the same photo on every page of the site.
