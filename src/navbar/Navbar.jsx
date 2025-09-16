// src/navbar/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { auth, db, onAuthStateChanged, signOut } from '../firebaseconfig/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
// import '../CustomCSS/nabar.css'; // ← Temporarily comment out to avoid forced dark styles

const Navbar = () => {
  const [user, setUser] = useState(null);
  const clickSoundRef = useRef(null);
  const navigate = useNavigate();
  const adminEmail = 'admin@example.com';

  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const adminDropdownRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // added state for userName and surname to fetch
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    clickSoundRef.current = new Audio('/Put.mp3');

    if (!onAuthStateChanged || !auth) {
      setUser(null);
      setUserDetails(null);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.providerData[0]?.providerId === 'google.com') {
          setUserDetails({ firstName: currentUser.displayName, lastName: '' });
        } else if (db) {
          try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('uid', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              setUserDetails(querySnapshot.docs[0].data());
            } else {
              setUserDetails(null);
            }
          } catch (error) {
            console.error('Error fetching user details:', error);
            setUserDetails(null);
          }
        } else {
          setUserDetails(null);
        }
      } else {
        setUser(null);
        setUserDetails(null);
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const playClickSound = () => {
    try { clickSoundRef.current?.play(); } catch {}
  };

  const logout = async () => {
    try {
      if (signOut && auth) await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAdminDropdown = () => setIsAdminDropdownOpen((s) => !s);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
        setIsAdminDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen((s) => !s);

  const handleLinkClick = () => {
    playClickSound();
    setIsMenuOpen(false);
  };

  const linkClass = ({ isActive }) =>
    [
      'block px-2 py-1 rounded-md transition-colors',
      'text-[var(--fg)]',
      isActive ? 'font-semibold underline' : 'hover:bg-black/5',
    ].join(' ');

  return (
    <nav
      className="page-bg border-b border-black/10"
      style={{ background: 'var(--bg)', color: 'var(--fg)' }}
    >
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center py-2 px-3">
        <div className="flex items-center mb-2 md:mb-0">
{/* src/navbar/Navbar.jsx — logo block */}
<Link to="/" onClick={handleLinkClick} className="block">
  <div className="h-14 md:h-16 lg:h-18 flex items-center">   {/* controls max logo height */}
    <img
      src="/SuncatDialedBack.jpg"
      alt="Suncat"
      className="block w-auto h-full object-contain"
      style={{ imageRendering: 'auto' }}  // no smoothing quirks
    />
  </div>
</Link>
        </div>

        {/* Burger Menu Button */}
        <button className="block md:hidden text-[var(--fg)]" onClick={toggleMenu} aria-label="Menu">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Menu Items */}
        <div
          className={`flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 text-center ${
            isMenuOpen ? 'block' : 'hidden'
          } md:block`}
        >
          {user ? (
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <NavLink to="/" className={linkClass} onClick={handleLinkClick}>
                Home
              </NavLink>

              <NavLink to="about-us" className={linkClass} onClick={handleLinkClick}>
                About Us
              </NavLink>

              <NavLink to="founding-fathers" className={linkClass} onClick={handleLinkClick}>
                Founding Fathers
              </NavLink>
<NavLink to="/portal-fullscreen" className={linkClass} onClick={handleLinkClick}>
  Customer Portal
</NavLink>
              <NavLink to="contact-us" className={linkClass} onClick={handleLinkClick}>
                Contact Us
              </NavLink>
              

              {/* Admin dropdown */}
              {user.email === adminEmail && (
                <div className="relative" ref={adminDropdownRef}>
                  <button
                    onClick={toggleAdminDropdown}
                    className="card-bg border border-black/10 rounded-md px-3 py-2 hover:bg-black/5"
                  >
                    Admin Actions
                  </button>
                  {isAdminDropdownOpen && (
                    <ul className="absolute right-0 mt-2 card-bg border border-black/10 rounded shadow-md text-left">
                      <li>
                        <NavLink to="video-upload" className={linkClass} onClick={handleLinkClick}>
                          Video Upload
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="video-alter" className={linkClass} onClick={handleLinkClick}>
                          Video Alter
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="next-generation" className={linkClass} onClick={handleLinkClick}>
                          Next Generation
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </div>
              )}

              {/* Welcome pill */}
              {userDetails && (
                <div className="card-bg border border-black/10 rounded-full px-3 py-1">
                  {userDetails.firstName ? (
                    <span>
                      Welcome {userDetails.firstName} {userDetails.lastName}
                    </span>
                  ) : (
                    <span>Welcome {user.email}</span>
                  )}
                </div>
              )}

              <button
                onClick={logout}
                className="card-bg border border-black/10 rounded-md px-3 py-2 hover:bg-black/5"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <NavLink to="/portal-fullscreen" onClick={handleLinkClick} className={linkClass}>
              Customer Portal
              </NavLink>
              <NavLink to="register" onClick={handleLinkClick} className={linkClass}>
                Register
              </NavLink>
              <NavLink to="login" onClick={handleLinkClick} className={linkClass}>
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
