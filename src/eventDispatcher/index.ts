import {
  DispatchEvent,
  UnregisterCallback,
  EventDispatcher,
  IdentityClient,
  Client
} from './types';

const createEventDispatcher = (): EventDispatcher => {
  let _clients: IdentityClient[] = [];
  let _id = 0;

  const _unregister = (id: number): void => {
    _clients = _clients.filter((client): boolean => client.id !== id);
  };

  const register = (client: Client): UnregisterCallback => {
    const nextId = _id;
    _id += 1;

    _clients.push({
      ...client,
      id: nextId
    });

    return (): void => _unregister(nextId);
  };

  const dispatch = (event: DispatchEvent): void => {
    _clients.forEach((client): void => {
      client.handleEvent(event);
    });
  };

  return {
    register,
    dispatch
  };
};

export default createEventDispatcher;
