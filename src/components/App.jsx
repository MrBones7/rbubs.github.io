import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import HomePage from './routes/home/HomePage';
import settings from '../../settings';
import configureStore from '../redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';

export const store = configureStore();
const persistor = persistStore(store);

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename={settings.repoPath}>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </ReduxProvider>
  );
}

export default hot(module)(App);
