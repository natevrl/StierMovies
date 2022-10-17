import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Provider } from "react-redux";
import { myStore } from "./redux";
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"


const App = () => {
  let persistor = persistStore(myStore);
  return (
    <Provider store={myStore}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coup-de-coeur" element={<UserList />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
