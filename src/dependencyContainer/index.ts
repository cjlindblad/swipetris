import { Dependencies } from './types';
import { isEmptyObject } from '../underdash';
import { SetupInputListeners } from '../input/types';
import { GameCharSelector } from '../config/types';

class DependencyContainer {
  private constructor() {}

  private static dependencies: Dependencies | null = null;

  public static initialize(dependencies: Dependencies): void {
    if (!dependencies || isEmptyObject(dependencies)) {
      throw new Error('No dependencies supplied');
    }

    DependencyContainer.dependencies = dependencies;
  }

  public static resolve(
    dependencyName: keyof Dependencies
  ): Render | SetupInputListeners | GameCharSelector | undefined {
    // TODO could be cleaner
    if (DependencyContainer.dependencies === null) {
      throw new Error('Dependency container is not initialized');
    }
    const dependency = DependencyContainer.dependencies[dependencyName];
    return dependency;
  }
}

export default DependencyContainer;
