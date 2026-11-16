# staging.trotecsolutions.com

Static staging build of the new Trotec Solutions site in English (`/en-us/`) and Spanish (`/es-us/`, translated page addresses). `/` redirects to `/en-us/`. Every page links to its other-language version (hreflang tags and a header switch).

- 23 pages per language: 13 core, 8 brand pages, site map, 404
- `.htaccess`: noindex header, HTTPS, `/` to `/en-us/`, one-hop 301s from the old site's .html addresses and earlier root-level staging addresses into `/en-us/`, a Spanish 404 for `/es-us/`, security and cache headers. On Plesk, turn "Smart static files processing" off so the headers apply.
- Every page also carries a `noindex, nofollow` meta tag. Remove both before launch.
- `/images/` holds placeholders. Replace them with the finished images using the same file names.
- Forms post to `/form/quote.php` and `/form/contact.php`, which aren't built yet; on staging they show a preview notice and send nothing.
- Analytics load only on trotecsolutions.com, so staging visits aren't counted.

## Publishing

`main` is the working branch. Merging or pushing to `deploy` runs `.github/workflows/deploy-staging.yml`, which uploads changed files to staging over FTPS. It needs repository secrets `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD` (optional `FTP_SERVER_DIR`). Until they're set, the workflow uploads nothing and leaves a warning.
