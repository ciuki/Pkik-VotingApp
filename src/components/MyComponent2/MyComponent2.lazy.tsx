import React, { Suspense, lazy } from 'react';

const LazyMyComponent2 = lazy( () => import( './MyComponent2' ) );

const MyComponent2 = ( props: JSX.IntrinsicAttributes & { children?: React.ReactNode; } ): JSX.Element => (
  <Suspense fallback={null}>
    <LazyMyComponent2 {...props} />
  </Suspense>
);

export default MyComponent2;
