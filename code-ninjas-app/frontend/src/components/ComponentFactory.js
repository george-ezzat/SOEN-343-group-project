import React from 'react';
import AutocompleteInput from './AutocompleteInput';

const componentMap = {
  AutocompleteInput,
};

const ComponentFactory = {
  createComponent: (type, props) => {
    const Component = componentMap[type];
    if (!Component) {
      throw new Error(`Component type "${type}" is not recognized.`);
    }
    return <Component {...props} />;
  },
};

export default ComponentFactory;