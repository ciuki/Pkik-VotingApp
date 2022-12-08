import './MyComponent.scss';

import React, { FC } from 'react';

interface MyComponentProps {}

const MyComponent: FC<MyComponentProps> = () => (
  <div className="MyComponent">MyComponent Component</div>
);

export default MyComponent;
