import { Dependencies } from './types';
import { isEmptyObject } from '../underdash';

class DependencyContainer {
  private constructor() {}

  private static dependencies: Dependencies | null = null;

  static initialize(dependencies: Dependencies) {
    if (!dependencies || isEmptyObject(dependencies)) {
      throw new Error('No dependencies supplied');
    }

    DependencyContainer.dependencies = dependencies;
  }

  static resolve(dependencyName: keyof Dependencies) {
    if (DependencyContainer.dependencies === null) {
      throw new Error('Dependency container is not initialized');
    }
    const dependency = DependencyContainer.dependencies[dependencyName];
    return dependency;
  }
}

export default DependencyContainer;
