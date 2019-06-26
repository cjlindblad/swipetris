class DependencyContainer {
  constructor(dependencies) {
    if (!!DependencyContainer.instance) {
      return DependencyContainer.instance;
    }

    if (!dependencies) {
      throw new Error('No dependencies supplied');
    }

    Object.keys(dependencies).forEach(key => {
      const implementation = dependencies[key];
      if (!(implementation instanceof Function)) {
        throw new Error(`Implementation supplied for ${key} is not a function`);
      }
    });

    DependencyContainer.instance = this;

    // TODO hide this
    this.dependencies = dependencies;

    return this;
  }

  resolve(dependency) {
    return this.dependencies[dependency];
  }
}

export default DependencyContainer;
