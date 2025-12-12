## 0.15.5

* feat: add `to_be_discontinued` to `AddonPlan` interface
* feat: add `trial_available` to `AddonPlan` interface

## 0.15.4

* feat: add `updated_at` to `Addon` interface
* feat: add `last_event` to `App` interface
* chore: bump dependencies

## 0.15.3

* feat: add app get `private_network_domain_names` endpoint
* chore: bump dependencies

## 0.15.2

* feat: add project deletion

## 0.15.1

* feat: support new technology/plan params for database
* chore: bump dependencies

## 0.15.0

* feat: Enhance `Collaborator` interfaces (https://github.com/Scalingo/scalingo.js/pull/487)
  Note (breaking change): `CollaboratorInvitation` has been removed in the process.

## 0.14.8

* fix: rename `database_name` into `name` in `Database` `CreateParams`

## 0.14.7

* feat: add addon to `DatabaseAppDashboard`

## 0.14.6

* feat: update `Database` interface to match the new API index
* chore: bump dependencies

## 0.14.5

* feat: support for `Database` interface
* feat: add index and create endpoints for databases

## 0.14.4

* feat: add `project_id` to `App` create params

## 0.14.3

* feat: add `project_id` and `project_name` to `Event` interface
* chore: bump dependencies

## 0.14.2

* feat: add `project_id` to `App` update params

## 0.14.1

* feat: add `flags` to `Project` interface
* feat: accept `Collaborator payload` in `Collaborators` invitation endpoint

## 0.14.0

* feat: support for `Project` model
* feat: add `AppProject` to `App` interface
* feat: add projects endpoints
* feat: add collaborators.update endpoint

## 0.13.1

* feat: add `is_limited` to `Collaborator` interface

## 0.13.0

* chore: bump dependencies

## 0.12.0

* feat: include `attempt` to `TwoFactorAuth` delete api call

## 0.11.0

* feat: add the `role` field in `User` model
* feat: add the users.roles endpoint

## 0.10.0

* chore: bump dependencies
* feat(scm_organizations): add pagination support

## 0.9.0

* chore: bump dependencies
* chore: linter violations following update
* versions: dropping node 14 and 16, no longer maintained. Adds 20.x and 22.x to test matrix
* tooling: switch from yarn to npm
* feat: add the `private_networks_ids` field to the model
* feat: added collaborators.all endpoint

## 0.8.2

* chore: bump esbuild from 0.15.6 to 0.17.5. Might be changes in the output
* chore: bump axios from 0.x to 1.3.x. Might be breaking in some cases
* chore: bump dependencies
* feat(stacks): deployments have stack base image property
* feat(accounting): add in billing profile a field for a custom text on invoices
* feat(review-app): scm repo links have a fork allowed property
* feat(review-app): pull requests contains information about source repository

## 0.8.1

* feat: stacks API
* chore: bump dependencies

## 0.8.0

* chore: bump dependencies
* feat/breaking: contracts API has been changed. It is expected to be stable now.

## 0.7.0

* chore: bump dependencies
* feat(data consent): update modelisation and signature calls (preview endpoint)

## 0.6.4

* improv: update HDS Contact signature/model

## 0.6.3

* chore: bump dependencies
* feature: support HDS endpoints and fields

## 0.6.2

* feature: support for data access consents

## 0.6.1

* feature: support for contracts and agreements

## 0.6.0

* feature: support for regions endpoint
* breaking change: `Environment.bulkDestroy` returns an array of ids instead of an object (with an array of ids)
* feature: list processes, run and stop one-off containers
* Improved type definitions
* Bump dependencies (dev and runtime)
* drop support for node 12.x, add 18.x to test matrix

## 0.5.2

* Fix broken build to the user agent. No longer contains the version for now.

## 0.5.1 (broken)

* New endpoint: cron tasks
* User Agent now contains client version
* Slight change in typings

## 0.5.0

* Bump dependencies versions (axios, ws)
* Bump devDependencies (typescript, eslint, test utils)
* Remove rollup in favor of esbuild
* Update the default endpoint of the regional API
* Change the script names/organisation

## 0.4.0

* App#transfer: based in the ID rather than the user email
* types: update user

## 0.3.12

* Log archives: support for pagination

## 0.3.11

* Containers: scaling can be a no-op (no operations return)

## 0.3.10

* Typo

## 0.3.9

* Deployments: create from archive

## 0.3.8

* Domains: updated typings

## 0.3.7

* Addons: resume endpoint

## 0.3.6

* Users: account deletion confirmation

## 0.3.5

* Types: improve Alerts types
* Addons: allow fetching addon providers with authentication

## 0.3.4

* User preferences: add `logs_font_size` and `theme` fields

## 0.3.3

* Events: add `find` endpoint to get a given event
* Domains: add ssl_status field

## 0.3.2

* Types: add user preferences
* Add support for audit logs

## 0.3.1

* An incorrect build was uploaded for 0.3.0. This one replaces it.

## 0.3.0

* More alerts endpoints
* Deployments: purge cache endpoint
* Internal: bump dependencies

## 0.2.9

* Type: Regional/apps

## 0.2.8

* Bugfix: Forgot to add autoscalers entrypoint

## 0.2.7

* Bugfix: SCM repo link missing field in type

## 0.2.6

* Bugfix: wrong import path

## 0.2.5

* New: SCM Repo links : get review apps for a repo link. Also improved typings.

## 0.2.4

* Types: update Addon

## 0.2.3

* New: autoscalers endpoint

## 0.2.2

* Improv: user typings, missing deployment status

## 0.2.1

* Bugfix: Alerts endpoint was not added to the main client

## 0.2.0

* Chore: upgrade typescript/tsdoc
* Chore: upgrade linter ecosystem & styleguide
* Breaking: move params types to src/params
* Breaking: change signature of Apps#create, Addons#create
* Breaking: compile destination is now `lib`
* Breaking: move models (types and consts) to src/models
* Breaking: Log archive response has changed
* Users: stop free trial
* New: App alerts endpoint
* New: get repo branches for a SCM integration

## 0.1.4

* Users: request account deletion
* Deployments: new status "queued"

## 0.1.3

* Tooling: bump `dependencies`, typescript & typedoc
* Improv: Better deployment listener
* Fix: Misuse of promise typings (b8ad8f4, e9dd910)
* Fix: Wront typing for deployments#for (1654c9c)
* New: deployment status constants (0032a7c)
* New: App status field + status constants (ac33eef)
