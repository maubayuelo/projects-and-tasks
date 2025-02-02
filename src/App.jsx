import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { fetchProjects } from "./redux/store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

const MainContent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const homePage = location.pathname === "/ProjectsAndTasks/";

  // Fetch initial projects from backend
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div
      className={`flex flex-col min-h-screen  ${homePage ? "bg-gray-100" : ""}`}
    >
      <Header />
      <main className={`flex-grow container mx-auto p-4`}>
        <Routes>
          <Route path="/ProjectsAndTasks/" element={<HomePage />} />
          <Route
            path="/ProjectsAndTasks/project/:id"
            element={<ProjectDetailsPage />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainContent />
      </Router>
    </Provider>
  );
};

export default App;
