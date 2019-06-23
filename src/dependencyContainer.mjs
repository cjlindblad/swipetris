const initializeDependencies = env => {
  const date = new Date();

  return {
    doStuff: () => {
      console.log(date);
    }
  };
};

export default initializeDependencies('web');
