import React from 'react';
import BaiTapForm from './components/BaiTapForm/BaiTapForm';
import { Provider } from 'react-redux';
import { store } from './redux/ConfigStore';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BaiTapForm />
      </div>
    </Provider>
  );
}

export default App;