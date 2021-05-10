## Unreleased

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
