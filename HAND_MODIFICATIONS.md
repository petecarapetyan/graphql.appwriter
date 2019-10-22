## Hand Modifications Required:

- in the file packages/[app-name]/src/[appName.js], you have to hand write the inclusion of the page-models component from the menu at the top of the app.
- packages.json will be overwritten from what open-wc provides. You need to make sure those over-writes are still valid, in case open-wc has made changes subsequent to the last updates of this project's package.json

## Separate Options? Or Otherwise Missing...

- there is no router
- redux-saga probably wants to be included
- authorization layer
- 

## Guaranteed Nightmares

This project is created by running 3 successive CLIs on top of each other in the same project, and then doing hand modifications.

There is no possible way that this isn't a guaranteed nightmare. Except, of course, it works. Or it can work, under best circumstances.



## Logic

- does not concern itself with simplest app, instead inevitable if enterprise
- CA as much as possible - want to be customizable to achieve re-generating
