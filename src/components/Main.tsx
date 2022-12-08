import { Route, Routes } from 'react-router-dom';

import MyComponent from './MyComponent/MyComponent.lazy';
import MyComponent2 from './MyComponent2/MyComponent2.lazy';

const Main = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<MyComponent/>} />
      <Route path='/main' element={<MyComponent2/>} />
    </Routes>
  );
};

export default Main;