# staging.trotecsolutions.com

Static staging build of the new Trotec Solutions site (English only, pages at the site root). Upload the contents of this repo to the staging subdomain's document root.

- 23 pages: 13 core, 8 brand pages, site map, 404
- `.htaccess`: noindex header, HTTPS, one-hop 301s from the old site's .html addresses and earlier staging addresses, security and cache headers. On Plesk, turn "Smart static files processing" off so the headers apply.
- Every page also carries a `noindex, nofollow` meta tag. Remove both before launch.
- `/images/` holds placeholders. Replace them with the finished images using the same file names.
- Forms post to `/form/quote.php` and `/form/contact.php`, which aren't built yet; on staging they show a preview notice and send nothing.
- Analytics load only on trotecsolutions.com, so staging visits aren't counted.
