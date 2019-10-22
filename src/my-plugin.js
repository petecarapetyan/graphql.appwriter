// eslint-disable-next-line import/no-extraneous-dependencies
const { printSchema, parse, visit } = require('graphql');

const parseType = rawType => {
  if (rawType.kind === 'NamedType') {
    return {
      type: rawType.name.value,
      isNullable: true,
      isList: false,
    };
  }
  if (rawType.kind === 'NonNullType') {
    return {
      ...parseType(rawType.type),
      isNullable: false,
      isList: false,
    };
  }
  if (rawType.kind === 'ListType') {
    return {
      ...parseType(rawType.type),
      isNullable: true,
      isList: true,
    };
  }
  return { type: rawType.kind, isNullable: false };
};

const getModelUpsert = (name, fields) => {
  const blah = fields.map(field => `blah ${field.name} foobar ${field.type}`);
  return `import { html, css, LitElement } from 'lit-element';
  window.customElements.define('${name.toLowerCase()}-view', ${name}View);

  export class ${name}Upsert) extends LitElement {
    static get styles() {
      return css\`
        :host {
          display: block;
          padding: 25px;
        }
      \`;
    }
  
    static get properties() {
      return {
        title: { type: String },
        counter: { type: Number },
      };
    }
  
    constructor() {
      super();
      this.title = 'Hey there';
      this.counter = 5;
    }
  
    __increment() {
      this.counter += 1;
    }
  
    render() {
      return html\`
        <h2>$\{this.title} Nr. $\{this.counter}!</h2>
${blah.join('\n')}
        <button @click=$\{this.__increment}>increment</button>
      \`;
    }
  }
  window.customElements.define('${name.toLowerCase()}-upsert', ${name}Upsert);
  
  `;
};

const getModelView = (name, fields) => {
  const blah = fields.map(field => `blah ${field.name} foobar ${field.type}`);
  return `import { html, css, LitElement } from 'lit-element';
  export class ${name}View extends LitElement {
    static get styles() {
      return css\`
        :host {
          display: block;
          padding: 25px;
        }
      \`;
    }
  
    static get properties() {
      return {
        title: { type: String },
        counter: { type: Number },
      };
    }
  
    constructor() {
      super();
      this.title = 'Hey there';
      this.counter = 5;
    }
  
    __increment() {
      this.counter += 1;
    }
  
    render() {
      return html\`
        <h2>$\{this.title} Nr. $\{this.counter}!</h2>
${blah.join('\n')}
        <button @click=$\{this.__increment}>increment</button>
      \`;
    }
  }
  
  window.customElements.define('${name.toLowerCase()}-view', ${name}View);
  `;
};

const getModelsIndex = () => `export { PageModels } from './src/PageModels.js';
  `;

const getIndexModel = name => `export { ${name}Model } from './src/${name}Model.js';
  `;

const getPageModels = (name, nodes) => {
  const links = nodes.map(node => `\t\t\t\t<p> ${node}</p>`);
  const imports = nodes.map(
    node => `import '../../model-${node.toLowerCase()}/model-${node.toLowerCase()}.js';`,
  );
  return `import { html, css, LitElement } from 'lit-element';
${imports.join('\n')}

  export class PageModels extends LitElement {
    static get styles() {
      return css\`
        :host {
          display: block;
          padding: 25px;
        }
      \`;
    }
  
    static get properties() {
      return {
        title: { type: String },
        counter: { type: Number },
      };
    }
  
    constructor() {
      super();
      this.title = 'Hey there';
      this.counter = 5;
    }
  
    __increment() {
      this.counter += 1;
    }
  
    render() {
      return html\`
        <h2>$\{this.title} Nr. $\{this.counter}!</h2>
${links.join('\n')}
        <button @click=$\{this.__increment}>increment</button>
      \`;
    }
  }
  
  `;
};

const getModelModel = name => `import { ${name}Model } from './src/${name}Model.js';

  window.customElements.define('model-${name.toLowerCase()}', ${name}Model);
  `;

const getModelSource = (name, fields) => {
  const blah = fields.map(field => `blah ${field.name} foobar ${field.type}`);
  return `import { html, css, LitElement } from 'lit-element';

  export class ${name}Model extends LitElement {
    static get styles() {
      return css\`
        :host {
          display: block;
          padding: 25px;
        }
      \`;
    }
  
    static get properties() {
      return {
        title: { type: String },
        counter: { type: Number },
      };
    }
  
    constructor() {
      super();
      this.title = 'Hey there';
      this.counter = 5;
    }
  
    __increment() {
      this.counter += 1;
    }
  
    render() {
      return html\`
        <h2>$\{this.title} Nr. $\{this.counter}!</h2>
${blah.join('\n')}
        <button @click=$\{this.__increment}>increment</button>
      \`;
    }
  }
  
  `;
};

const getModelsSource = () => `import { PageModels } from './src/PageModels.js';

  window.customElements.define('page-models', PageModels);
  `;

const getModelDelete = (name, fields) => {
  const blah = fields.map(field => `blah ${field.name} foobar ${field.type}`);
  return `import { html, css, LitElement } from 'lit-element';

  export class ${name}Delete extends LitElement {
    static get styles() {
      return css\`
        :host {
          display: block;
          padding: 25px;
        }
      \`;
    }
  
    static get properties() {
      return {
        title: { type: String },
        counter: { type: Number },
      };
    }
  
    constructor() {
      super();
      this.title = 'Hey there';
      this.counter = 5;
    }
  
    __increment() {
      this.counter += 1;
    }
  
    render() {
      return html\`
        <h2>$\{this.title} Nr. $\{this.counter}!</h2>
${blah.join('\n')}
        <button @click=$\{this.__increment}>increment</button>
      \`;
    }
  }
  
  window.customElements.define('${name.toLowerCase()}-delete', ${name}Delete);
  `;
};

const extractFields = (name, types) => {
  const thisTypes = types.filter(type => type.name.value === name);
  if (thisTypes && thisTypes[0]) {
    return thisTypes[0].fields;
  }
  return [];
};

module.exports = {
  // eslint-disable-next-line consistent-return
  plugin: (schema, _documents, config) => {
    const { genType } = config;
    const { modelName } = config;
    const printedSchema = printSchema(schema);
    const astNode = parse(printedSchema);
    const visitor = {
      FieldDefinition: node => {
        const type = parseType(node.type);
        type.name = node.name.value;
        return type;
      },
      ObjectTypeDefinition: node => node,
    };
    const result = visit(astNode, { leave: visitor });
    const fields = extractFields(modelName, result.definitions);
    switch (genType) {
      case 'modelSource':
        return getModelSource(modelName, fields.slice());
      case 'modelUpsert':
        return getModelUpsert(modelName, fields.slice());
      case 'modelView':
        return getModelView(modelName, fields.slice());
      case 'modelDelete':
        return getModelDelete(modelName, fields.slice());
      case 'modelsIndex':
        return getModelsIndex();
      case 'indexModel':
        return getIndexModel(modelName);
      case 'modelModel':
        return getModelModel(modelName);
      case 'modelsComponent':
        return getModelsSource();
      case 'modelsSource':
        return getPageModels(modelName, config.nodes);

      default:
        console.log('ZONED OUT - go fix something', genType);
    }
  },
};
