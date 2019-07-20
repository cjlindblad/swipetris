import { Dependencies } from './types';

class DependencyContainer {
  static instance: DependencyContainer | null = null;
  private dependencies: Dependencies | null = null;

  constructor(dependencies?: Dependencies) {
    if (!!DependencyContainer.instance) {
      return DependencyContainer.instance;
    }

    if (!dependencies) {
      throw new Error('No dependencies supplied');
    }

    DependencyContainer.instance = this;

    this.dependencies = dependencies;

    return this;
  }

  resolve(dependencyName: keyof Dependencies) {
    if (this.dependencies === null) {
      throw new Error('No dependencies supplied');
    }
    const dependency = this.dependencies[dependencyName];
    return dependency;
  }
}

export default DependencyContainer;
