module.exports = (componentName) => 
`import cn from './${componentName}.module.scss';

function ${componentName}() {
    return (
        <div className={cn.container}>
        
        </div>
    );
}

export default ${componentName};

`;