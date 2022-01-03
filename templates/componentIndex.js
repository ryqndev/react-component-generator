module.exports = (componentName) => 
`import ${componentName} from './${componentName}.jsx';

export default ${componentName};

`;