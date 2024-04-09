import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Resume from './pages/Resume';
import Contact from './components/Contact';
import './App.css';
import Layout from './components/Layout';
import Profile from './components/Profile';
import SignIn from './pages/Auth/SignIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import UserProfile from './pages/UserProfile';
import Templates from './pages/Templates';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route element={<Layout />}>
                <Route path='/user-profile' element={<UserProfile />} />
                <Route path='/templates' element={<Templates />} />
                <Route path='/create-resume' element={<Home />} />
                <Route path='/resume/:template' element={<Resume />} />
                <Route path='/contact-us' element={<Contact />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;