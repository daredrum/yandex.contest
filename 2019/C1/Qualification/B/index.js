module.exports = function(input) {
    const [path, query] = input.split('?');
    const subPaths = path.slice(1).split('/');
    const [projectName, subProjectName] = subPaths[0].split('-');
    const entities = subPaths[1].split('_');
    const entityId = entities.length > 1 ? entities[0] : '';
    const entityName = entities.length > 1 ? entities[1] : entities[0];

    return `/${projectName}/${subProjectName}/${entityId ? entityName + '/' + entityId : entityName}?${query}`;
}
