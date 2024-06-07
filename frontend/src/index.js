import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContext from "./Context/UserContext";
import {Provider} from "react-redux";
import {store} from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserContext>
          <Provider store={store}>
              <App />
          </Provider>
      </UserContext>
  </React.StrictMode>
);
