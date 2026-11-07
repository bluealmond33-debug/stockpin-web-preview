# Bundled company logo provenance

The Samsung, Hyundai, NVIDIA, Apple and Tesla files are exact, unmodified SVG bytes from Simple Icons commit
`c71c69e3a27e4436936b831c72643e6513b9f49b` (not a floating CDN).

- `samsung.svg`: https://github.com/simple-icons/simple-icons/blob/c71c69e3a27e4436936b831c72643e6513b9f49b/icons/samsung.svg
- `hyundai.svg`: https://github.com/simple-icons/simple-icons/blob/c71c69e3a27e4436936b831c72643e6513b9f49b/icons/hyundai.svg
- `nvidia.svg`: https://github.com/simple-icons/simple-icons/blob/c71c69e3a27e4436936b831c72643e6513b9f49b/icons/nvidia.svg
- `tesla.svg`: https://github.com/simple-icons/simple-icons/blob/c71c69e3a27e4436936b831c72643e6513b9f49b/icons/tesla.svg
- `apple.svg`: https://github.com/simple-icons/simple-icons/blob/c71c69e3a27e4436936b831c72643e6513b9f49b/icons/apple.svg

`SIMPLE-ICONS-LICENSE.md` is the project's unmodified notice at that same commit.
It identifies CC0 for the project, but explicitly excludes blanket permission for
individual brand icons and requires checking relevant brand guidelines. These
logos identify issuers, not affiliation or endorsement. Trademark/brand-use review
remains a public-release gate; source availability is not permission to publish.

Upstream icon metadata sources:
- Samsung: https://www.samsung.com/us/about-us/brand-identity/logo/
- Hyundai: https://www.hyundai.com
- NVIDIA: https://www.nvidia.com/en-us
- Apple: https://www.apple.com

No CDN, favicon service, remote logo request, key, tracking, broker response or
portfolio data is included. Mappings are explicit presentation-only identifiers;
unknown issuers and failed image loads retain the neutral first-character fallback.
Six issuer brands and two brokers are covered, not the entire securities universe. Do not infer a logo
from an arbitrary company name or relabel an unknown security to force a match.

Additional sources, downloaded explicitly during development (no runtime requests):
- `alphabet.svg`: https://commons.wikimedia.org/wiki/File:Abc.xyz_Favicon.svg ; the file page marks this reproduction CC0. Trademark rights still apply. Original SVG: https://upload.wikimedia.org/wikipedia/commons/2/21/Abc.xyz_Favicon.svg
- `toss.png`: official https://static.tossinvest.com/assets/image/favicon-512x512.png , discovered in https://www.tossinvest.com/ . Decoded to lossless RGBA PNG without metadata.
- `kiwoom.png`: official https://www.kiwoom.com/favicon.ico , discovered in https://www.kiwoom.com/ . Decoded ICO to lossless RGBA PNG without metadata.

The brokers' favicons are identification assets, not CC0 Simple Icons assets. No explicit general redistribution license was confirmed for them. This private personal-use candidate does not establish public-release/trademark permission or broker endorsement. Never download icons based on a user's holdings at runtime.

## Official-site icons added after user2731
Six `*-official.png` files were fetched from official company sites or their head-linked CDN assets; exact source URLs/hashes and transformations are in `OFFICIAL-SOURCES.json`. Samsung/Hyundai/Apple/NVIDIA replace the displayed monochrome version, and SK hynix/Microsoft add missing issuers. ICO/BMP decoding is normalized to PNG; Microsoft is the left square symbol cropped from the observed official header wordmark, preserving colour. No tracking metadata is kept. Existing SVGs are preserved.

The downloaded Alphabet favicon was a uniformly white placeholder and is **not** used; the existing sourced Alphabet image remains. Tesla's official fetch was403, so its existing pinned Simple Icons version remains. An official public asset is not blanket trademark/redistribution permission: public release still needs review. No remote runtime logo request or transmission of holdings is added.

Known ETFs use the literal `ETF` badge; verified2x entries use the user-requested literal `2*`. The initial exact code catalogue is listed in the JSON. It is not complete market-wide ETF classification; unsupported securities keep neutral fallback and are not guessed from company names. Market/original-currency/credit identity validation remains strict.
