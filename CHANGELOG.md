## Unreleased

* Chore: upgrade linter ecosystem & styleguide
* Breaking: move params types to src/params
* Breaking: change signature of Apps#create, Addons#create
* Breaking: compile destination is now `lib`
* Breaking: move models (types and consts) to src/models

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
