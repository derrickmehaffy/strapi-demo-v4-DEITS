# DEITS -> Data Export/Import/Transfer System

The current plan is to split the content of DEITS into two releases:

- 4.6 will include the export and the import features, we already released a beta, and we’re on track to release it in GA on January 25th
- 4.7 will include the transfer feature, this week we could release the first beta and then we will release it in GA toward the end of February (the date for the 4.7 is to be defined)

## 4.6.0 Scope

- The ability to export and import data from a local instance (meaning the command is ran on the same system as the running app, regardless of environment)
  - Export/Import will be limited to file, not transfer
- The ability to encrypt and compress the tar archive
- Import capability will completely overwrite existing data EXCEPT for Admin users and API Tokens
- Export capability limited to NOT EXPORT Admin users or API Tokens
- Ability to perform transformations on the data during import

## 4.7.0 Scope

- The ability to transfer data from one instance to another (meaning the command is ran on a different system than the running app, regardless of environment)
- Different transfer ability is broken down and covered under the following circumstances:
  - Local to Remote (both running instances)
  - Remote to Local (both running instances)
  - Local to file
  - Remote to file
  - File to local
  - File to remote

## 4.8.0 Scope (TBD)

- Stable API to construct additional providers (source & destination) that do not ship with Strapi itself
- Ability to import or transfer from two instances (or file) where the content-type schemas do not match
  - We are planning 3 main options: Strict (minimal changes that don't impact the format), Ignore (no verification), and Exact (Default for 4.6.0 and 4.7.0)
  - Potentially a 4th option "Loose" that allow for attributes to be added or removed and still continue the transfer

## Future TBD features

These are a list of features we "would like to have" but are not guaranteed:

- "Maintenance mode" to limit CRUD actions on the target instance in preparation for the import (Basically locking out the ability to create, update, or delete data)
- Alternative merge schemes besides a full overwrite of the destination (merge missing, selective import, ect)
- Possible additional Strapi maintained providers for source and destination (S3 bucket instead of local file for example)
  - If you have requests, please feel free to mention them
  - Our hope is for community built and maintained providers
- Ability to export/import/transfer a single content type or a subset of content types
- Ability to export/import/transfer selective entries within a content type that match a filter pattern
- Ability to export/import/transfer media files that come from a 3rd party provider (AWS S3, Cloudinary, ect)
- Automatically take a remote export as a backup during a transfer with automatic rollback capability
- Have the ability to do export/import/transfer directly from within the Admin Panel
- Baked in Cron-based system to handle automated exports (backups)
- Realtime sync with an external provider
- Ease the data migration process when we create new major versions (for example a source provider for Strapi v4 and a destination provider for Strapi v5)

## Video Demo of DEITS 4.6.0 GA and 4.7.0 Beta

Included in this demo is the sample export (encrypted, not encrypted, and not compressed).
For the encrypted export, the password is "test1234".

Likewise this demo includes a [dataGen script](./source/dataGen.js) that uses some environment variables to create some blog posts, comments, and authors for the comments if you would like to test.

See the following Loom video for a demo of the 4.6.0 scope: https://www.loom.com/share/194134fd721548719fc9d1b7889825c3

See the following Loom video for a demo of the 4.7.0 scope:
https://www.loom.com/share/2bc519d349ad4e34a0f79479a45d106d 

## Benchmarks

When transferring (using a fake data generator via faker.js)

- ~240 Entities for a total of ~0.111MB in 2.218s (including 1.94s to load the Strapi app and ~0.278s to transfer entities)
- ~2,400 Entities for a total of ~1.122MB in 4.325s (including 1.864s to load the Strapi app and ~2.461s to transfer entities)
- ~240,000 Entities for a total of 112.492MB in 229.674s (~3m45s) (including 1.765s to load the Strapi app and ~227.909s to transfer entities)

**NOTE:** This benchmark does not include a database since the data source was done via faker.js so these numbers do not include database request and latency times during data fetching. Transfer really depends on several factors that largely depend on the location, distance, latency, ect of your database.
