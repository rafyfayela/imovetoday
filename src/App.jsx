import { Route, Routes } from "react-router-dom";
import './App.css';
import LandingPage from './pages/landingPage/LandingPage';
import SignUp from './pages/singUp/SignUp';
import Login from './pages/login/Login';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import Dashboard from './components/dashboard/Dashoard';
import ProtectedRoute from './components/ProtectedRoute';
import AuthCallback from './components/AuthCallback';
import SchoolDetails from './pages/schoolDetails/SchoolDetails';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SchoolList from './components/schoolList/SchoolList';
import PropertyList from './components/propertiesList/PropertiesList';
import PropertyDetails from './pages/propertyDetails/PropertyDetails';
import AppHome from './components/appHome/AppHome';
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/profile" element={<Profile />} />

          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AppHome />} /> 
            <Route path="schools" element={<SchoolList />} /> 
            <Route path="schools/:id" element={<SchoolDetails />} /> 
            <Route path="properties" element={<PropertyList />} />
            <Route path="properties/:id" element={<PropertyDetails />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
