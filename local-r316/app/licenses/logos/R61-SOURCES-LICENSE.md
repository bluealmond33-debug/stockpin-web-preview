# r61 local identification artwork (not permission to redistribute)

R49-PRESENTATION-NOTE.md, OFFICIAL-SOURCES.json and the original asset bytes remain unchanged. This note supersedes r49's *presentation* choice of text-only Samsung, not its legal caution. No holdings, account data, user-provided issuer names or financial payload were sent to a logo service. Fixed public brand pages/assets were fetched only during development. Runtime uses local allowlisted URLs only.

## Samsung: sourced wordmark, NOT an official download or custom font approximation

The geometry is the existing pinned Simple Icons Samsung SVG from commit `c71c69e3a27e4436936b831c72643e6513b9f49b`:
https://github.com/simple-icons/simple-icons/blob/c71c69e3a27e4436936b831c72643e6513b9f49b/icons/samsung.svg

Original `samsung.svg` SHA256: `4a241ca8ebab6e71883b172acb9fb454efa69f308e4f2c31ec80668aeb6627d9`.
The existing SIMPLE-ICONS-LICENSE.md remains the CC0 project notice; it does NOT grant blanket trademark or individual brand-use permission.

Public official identity reference read successfully: https://www.samsung.com/us/about-us/brand-identity/logo/ . Its blue and black wordmark illustrations (`https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/256_144_1.png` and `256_144_2.png`) were decoded and visually inspected. They have illustration backgrounds and are NOT shipped as transparent marks. This reference supports brand identification, not exact equivalence or permission for the Simple Icons drawing.

- `samsung-wordmark-r61.svg`: same path bytes, viewBox changed from `0 0 24 24` to `-0.5 9.8 25 4.4` to remove unused square canvas without clipping the wordmark. Black default fill. SHA256 `132473bab0ce9d275549ff9844d3cd7c3fd9b8f1c156bb39ed39ea6de91e24f1`.
- `samsung-wordmark-dark-r61.svg`: same viewBox/path, explicit `fill="#fff"` derivative for dark UI. This is an app-prepared monochrome variant, NOT an officially downloaded dark-mode asset. SHA256 `c5a7147c1400b44db1ce3e6f8009574516fb45096d1d2b6b034962e8cc6733bc`.
- All seven letters were visually inspected using enlarged SVG previews on appropriate backgrounds. 30px CSS wordmark width is a candidate; small-screen GUI readability remains parent acceptance.

## Hyundai: official-site header assets, preserved colour/alpha

Page: https://www.hyundai.com/worldwide/en (HTTP200). Both URLs were discovered in that page, not guessed.

- Blue source: https://www.hyundai.com/etc/designs/hyundai/ww/en/images/common/logo.png . Original 310×44 PNG SHA256 `27b8add7704adfd9530ca50319febd438f7edb5b2f453125704bbbdb8ea89c97`.
- White source: https://www.hyundai.com/content/dam/hyundai/ww/en/images/main/new/common/logo-wh.png . Original 520×73 PNG SHA256 `918274f4171860a302d2c4c8407bfe5241681a806ea8512815a0677aa4a84523`.
- `hyundai-symbol-r61.png`: decode RGBA, crop left emblem (0,0,85,44), trim transparent bounds (0,0,84,43). Final84×43, SHA256 `4a99454d592d257122d4e27c07c9a264b3255b3f6120ff79526397dfc6379b11`.
- `hyundai-symbol-dark-r61.png`: decode RGBA, crop left emblem (0,0,148,73), trim transparent bounds (10,1,146,71). Final136×70, SHA256 `c778a851420f8824b6a2a5e897300d80cee946a5e7d5fc806c1e1662dd2f6173`.
- No colour replacement, interpolation or stretching. Removed HYUNDAI text, retained entire ellipse/H symbol. Source and resulting PNG pixels were directly inspected. Both include alpha0 and alpha255 pixels; CSS contain preserves their native aspect ratios. Cropping a header lockup is a derivative, not a separately sanctioned logo package.

## Microsoft

No asset-byte change. Existing source https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png and r49 verified square-crop history remain. `microsoft-official.png` SHA256 `0cd0910008f29af925cc504ba9997a4480e0965345f20df30fa1158a6e246a12`; complete46×46 four-colour symbol visually inspected. CSS renders18×18 instead of20×20; square is contained, not circularly clipped, on transparent frame. Same full-colour asset in both themes (no invented recolouring).

## Rights and release status

Official public availability is provenance, NOT copyright/trademark permission. Samsung derivative, Hyundai lockup crop and Microsoft historical symbol crop are identification candidates, not endorsed assets. No new general redistribution license or brand-use approval was established. Public-release/legal review remains REQUIRED; this work performs no deployment. Existing public/licenses mirror is outside worker ownership: parent must reconcile release notice collection before publishing. Historical function name `officialCompanyLogo` is not a legal assertion: its catalogue already includes Simple Icons and Wikimedia sources.

## GUI still required

Parent must inspect same final app candidate in explicit light/dark, narrow/wide, holdings and recent trades, at actual DPR and small-size rasterization, including load failure and identity change. CSS default is dark and explicit `:root[data-theme="light"]` selects blue/black assets independent of OS preference. Other issuers retain their previous presentation. Unit/SSR checks and standalone asset inspection do not establish GUI acceptance.
