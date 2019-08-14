import { Dependencies } from './types';
import { isEmptyObject } from '../underdash';
import { GameCharSelector } from '../config/types';
import { SetupInputListeners } from '../input/types';
import { Render } from '../render/types';

class DependencyContainer {
  private constructor() {}

  private static dependencies: Dependencies;

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
    if (!DependencyContainer.dependencies) {
      throw new Error('Dependency container is not initialized');
    }
    const dependency = DependencyContainer.dependencies[dependencyName];
    return dependency;
  }
}

export default DependencyContainer;
