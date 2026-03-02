import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';

// Components
import Navbar from './components/Navbar';
import BackgroundAnimator from './components/BackgroundAnimator';
import Accommodation from './components/Accommodation';
import Banner from './components/Banner';
import BookingBar from './components/BookingBar';
import ExtraFacilities from './components/ExtraFacilites';
import Facilities from './components/Facilities';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Gallery from './components/Gallery';
import InstallPWA from '../src/InstallPWA'; 

// Pages
import AdminDashboard from './admin/AdminDashboard'
import RoomDetails from './pages/RoomDetails';
import AllRooms from './pages/AllRooms';
import ReservationForm from './forms/Reservation';
import AboutUs from './pages/AboutUs';
import AllPhotos from './pages/AllPhotos';
import Offers from './pages/Offers';
import OfferDetails from './pages/OffersDetails';
import Login from './admin/Login';
import BlogPage from './pages/BlogPage';
import BlogDetails from './pages/BlogDetails';
import PackageDetails from './pages/PackageDetails';
import PackagesPage from './pages/PackagePage';
import Experience from './components/Experience';
import ActivitiesPage from './pages/Activities';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdminPath = location.pathname.startsWith('/admin');

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0f172a] text-indigo-500 font-bold tracking-widest uppercase">
        Loading AlMaris...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <ScrollToTop />
      
      {/* PWA Install Prompt - অ্যাডমিন প্যানেলে দেখাবে না */}
      {!isAdminPath && <InstallPWA />}

      {!isAdminPath && <Navbar />}

      {!isAdminPath && (
        <div className="fixed inset-0 z-[-1]">
          <BackgroundAnimator />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}

      <main className={isAdminPath ? "" : "relative z-10"}>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <Banner />
              <Accommodation />
              <Experience />
              <Facilities />
              <ExtraFacilities />
              <BookingBar />
              <Gallery />
            </>
          } />

          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/gallery" element={<AllPhotos />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/offers/:id" element={<OfferDetails />} />
          <Route path="/all-rooms" element={<AllRooms />} />

          <Route path="/login" element={!user ? <Login /> : <Navigate to="/admin/dashboard" />} />

          <Route
            path="/admin/dashboard/*"
            element={user ? <AdminDashboard /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
    </div>
  );
}

export default App;