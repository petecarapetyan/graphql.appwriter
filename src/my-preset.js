module.exports = {
  preset: {
    buildGeneratesSection: options => {
      const pluginMap = {
        ...options.pluginMap
      };
      const plugins = [...options.plugins];
      const output = [];
      const nodes = [];
      const typesMap = options.schemaAst.getTypeMap();
      const typeNames = Object.keys(typesMap);
      typeNames.slice().map(typeName =>{
        const type = typesMap[typeName];
        const astNode = type.astNode; // destructuring doesn't work, here. Don't do it.
        if (astNode && astNode.directives && astNode.directives.find(d => d.name.value === 'model')) {
          nodes.push(astNode.name.value);
        }
      })
      const modelsIndex = {
        filename: `packages/page-models/index.js`,
        plugins,
        pluginMap,
        schema: options.schema,
        schemaAst: options.schemaAst,
        documents: options.documents,
        config: {genType:"modelsIndex"}
      }
      output.push(modelsIndex);
      const modelsComponent = {
        filename: `packages/page-models/page-models.js`,
        plugins,
        pluginMap,
        schema: options.schema,
        schemaAst: options.schemaAst,
        documents: options.documents,
        config: {genType:"modelsComponent"}
      }
      output.push(modelsComponent);
      const modelsSource = {
        filename: `packages/page-models/src/PageModels.js`,
        plugins,
        pluginMap,
        schema: options.schema,
        schemaAst: options.schemaAst,
        documents: options.documents,
        config: {genType:"modelsSource", nodes}
      }
      output.push(modelsSource);
      nodes.slice().map(name => {
        const lname = name.toLowerCase();
        const modelUpsert = {
          filename: `packages/model-${lname}/src/${name}Upsert.js`,
          plugins,
          pluginMap,
          schema: options.schema,
          schemaAst: options.schemaAst,
          documents: options.documents,
          config: {modelName:name, genType:"modelUpsert"}
        }
        output.push(modelUpsert);
        const modelView = {
          filename: `packages/model-${lname}/src/${name}View.js`,
          plugins,
          pluginMap,
          schema: options.schema,
          schemaAst: options.schemaAst,
          documents: options.documents,
          config: {modelName:name, genType:"modelView"}
        }
        output.push(modelView);
        const modelDelete = {
          filename: `packages/model-${lname}/src/${name}Delete.js`,
          plugins,
          pluginMap,
          schema: options.schema,
          schemaAst: options.schemaAst,
          documents: options.documents,
          config: {modelName:name, genType:"modelDelete"}
        }
        output.push(modelDelete);
        const modelSource = {
          filename: `packages/model-${lname}/src/${name}Model.js`,
          plugins,
          pluginMap,
          schema: options.schema,
          schemaAst: options.schemaAst,
          documents: options.documents,
          config: {modelName:name, genType:"modelSource"}
        }
        output.push(modelSource);

        const indexModel = {
          filename: `packages/model-${lname}/index.js`,
          plugins,
          pluginMap,
          schema: options.schema,
          schemaAst: options.schemaAst,
          documents: options.documents,
          config: {modelName:name, genType:"indexModel"}
        }
        output.push(indexModel);

        const modelModel = {
          filename: `packages/model-${lname}/model-${lname}.js`,
          plugins,
          pluginMap,
          schema: options.schema,
          schemaAst: options.schemaAst,
          documents: options.documents,
          config: {modelName:name, genType:"modelModel"}
        }
        output.push(modelModel);
      });
      return output;
    }
  },
};