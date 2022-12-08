import React, { Suspense, lazy } from 'react';

const LazyMyComponent = lazy( () => import( './MyComponent' ) );

const MyComponent = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
): JSX.Element => (
  <Suspense fallback={null}>
    <LazyMyComponent {...props} />
  </Suspense>
);

export default MyComponent;
