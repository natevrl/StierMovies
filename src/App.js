import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import { Provider } from "react-redux";
import { myStore } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import {db} from "./Firebase";
import { collection, getDocs } from 'firebase/firestore';


const App = () => {
  let persistor = persistStore(myStore);

  return (
    <Provider store={myStore}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coup-de-coeur" element={<UserList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
