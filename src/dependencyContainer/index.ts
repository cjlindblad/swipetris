import { Dependencies } from './types';

class DependencyContainer {
  static instance: DependencyContainer | null = null;
  dependencies: Dependencies | null = null;

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
    if (this.dependencies === null) {
      throw new Error('No dependencies supplied');
    }
    return this.dependencies[dependencyName];
  }
}

export default DependencyContainer;
