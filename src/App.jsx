import "./App.css";
import { useEffect } from "react";

import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import History from "./routes/history/history.component";
import SignIn from "./routes/signIn/signIn.component";

import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { createActionUser } from "./store/user/user.action";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(createActionUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="history" element={<History />} />
        <Route path="auth" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
