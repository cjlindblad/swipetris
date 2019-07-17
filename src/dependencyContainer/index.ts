import { Dependencies } from './types';

class DependencyContainer {
  static instance: DependencyContainer = null;
  dependencies: Dependencies = null;

  constructor(dependencies?: Dependencies) {
    if (!!DependencyContainer.instance) {
      return DependencyContainer.instance;
    }

    if (!dependencies) {
      throw new Error('No dependencies supplied');
    }

    DependencyContainer.instance = this;

    // TODO hide this
    this.dependencies = dependencies;

    return this;
  }

  resolve(dependencyName: keyof Dependencies) {
    return this.dependencies[dependencyName];
  }
}

export default DependencyContainer;
