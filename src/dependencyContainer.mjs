class DependencyContainer {
  constructor() {
    if (!!DependencyContainer.instance) {
      return DependencyContainer.instance;
    }

    DependencyContainer.instance = this;

    this.dependencies = {};

    return this;
  }

  register(dependency, implementation) {
    this.dependencies[dependency] = implementation;
  }

  resolve(dependency) {
    return this.dependencies[dependency];
  }
}

export default DependencyContainer;
