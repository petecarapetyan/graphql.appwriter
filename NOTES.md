## Graphql App Writer

https://graphql.appwriter.com 

## Next Steps

- src/...view, src/...delete etc pages need to be fleshed out with at least a title
- navigation from each of the views to the next 
- first actual functionality against graphql

## Sequence to Replicate

At least, to this point

  - opened up https://aws-amplify.github.io/docs/js/start?platform=purejs
  - mkdir graphql.appwriter
  - npm init @open-wc took all defaults and package name of graphql.appwriter
  - added two dependencies to package.json per above aws-amplify docs
      "@aws-amplify/api": "latest",
      "@aws-amplify/pubsub": "latest"
  - yarn
  - had to re-install amplify go figure npm install -g @aws-amplify/cli
  - amplify init
  - amplify add api
  - amplify push
      used javascript as the code generation language target, not typescript
  - copied
      index.ts from zospeum for the preset code
      your-plugin.js from rPlugin for the plugin code
      codegen.yml from rPlugin
  - repathed and renamed above 3
  - copied 4 graphql dev dependencies from rPlugin
  - copied start script from rPlugin and renamed gen
  - [magic happened here]
  - it runs with `npm run gen`
  - launch the app itself with `npm start`
