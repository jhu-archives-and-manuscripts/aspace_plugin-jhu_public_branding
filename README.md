## Summary

This plugin is currently targeted at ArchivesSpace 2.x and implements
Johns Hopkins University Sheridan Libraries branding-related customizations to the ArchivesSpace public
user interface (PUI).

---

## Customizations

### Common elements (should be visible pretty much anywhere)

  - Branding
    - JHU Libraries logo
    - JHU Libraries site navigation
    - Style changes for consistency with other JHU Libraries UX guidelines and/or recommendations

  - Header navigation bar:
    - Removed "Accessions", "Classifications", and "Digital Objects" links.

  - Footer:
    - Changed text from `Visit ArchivesSpace.org | <version>` to `Powered by ArchivesSpace <version>` and removed hyperlink to avoid end-user confusion.

### Home page:
- Since DOs link is gone, added some text and links to get visitors to some of
other key repositories (JScholarship, Levy, and JHU Data Archive).

### Breadcrumb:
- Prefixed resource titles with call number/identifier.
- Icons for record types.

### Search results:
- Added callno/identifier column to results
- Added column headings, since there are now two columns in the results

---

## Activate the plugin
- Install the plugin:
  - Clone this repository into the plugins/jhu_public_branding directory; or
  - Unzip the release zip into the plugins/jhu_public_branding directory.

- Enable the plugin:
  - Edit the config/config.rb file to add the plugin name to the "AppConfig[:plugins]" list, e.g.:

    AppConfig[:plugins] = ['jhu_public_branding']

- Restart ArchivesSpace
