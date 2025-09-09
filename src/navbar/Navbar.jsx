// src/navbar/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { auth, db, onAuthStateChanged, signOut } from '../firebaseconfig/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../CustomCSS/nabar.css';

// Map emails -> customer metadata (expand later for more customers)
const getCustomerForEmail = (email) => {
  if (!email) return null;

  const map = {
    'kershnie.chetty@radissonblu.com': { id: 'radisson', name: 'Radisson Blu' },
    // Future examples:
    // 'buyer@coastlands.co.za': { id: 'coastlands', name: 'Coastlands Hotels' },
    // 'orders@capitolcaterers.co.za': { id: 'capitol', name: 'Capitol Caterers' },
  };

  return map[email.toLowerCase()] || null;
};

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const clickSoundRef = useRef(null);
  const adminDropdownRef = useRef(null);
  const navigate = useNavigate();

  const adminEmail = 'admin@example.com';
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Label for the portal tab (rename for Radisson)
const portalLabel =
  (user?.email?.toLowerCase() === 'kershnie.chetty@radissonblu.com')
    ? 'Radisson Blu'
    : 'Customer Portal';

  // Preload click sound
  useEffect(() => {
    clickSoundRef.current = new Audio('/Put.mp3');
  }, []);

  // Auth subscription (guarded for local dev)
  useEffect(() => {
    if (!auth) {
      setUser(null);
      setUserDetails(null);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // If Google auth, use displayName
        if (currentUser.providerData?.[0]?.providerId === 'google.com') {
          setUserDetails({
            firstName: currentUser.displayName,
            lastName: '',
          });
        } else {
          // Otherwise try pull from Firestore /users
          try {
            if (db) {
              const usersRef = collection(db, 'users');
              const q = query(usersRef, where('uid', '==', currentUser.uid));
              const querySnapshot = await getDocs(q);
              if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0].data();
                setUserDetails(userDoc);
              } else {
                setUserDetails(null);
              }
            } else {
              setUserDetails(null);
            }
          } catch (error) {
            console.error('Error fetching user details:', error);
            setUserDetails(null);
          }
        }
      } else {
        setUser(null);
        setUserDetails(null);
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const playClickSound = () => {
    if (clickSoundRef.current) clickSoundRef.current.play();
  };

  const handleLinkClick = () => {
    playClickSound();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleAdminDropdown = () => setIsAdminDropdownOpen(!isAdminDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
        setIsAdminDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  // Determine which customer this user belongs to (e.g., Radisson)
  const customer = getCustomerForEmail(user?.email);

  return (
    <nav className="navbar">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold zoom" onClick={handleLinkClick}>
            <img src="/Suncat3.png" alt="Logo" className="navbar-logo" />
          </Link>
        </div>

        {/* Burger Menu Button */}
        <button className="block md:hidden" onClick={toggleMenu}>
          <svg
            className="w-8 h-8 text-white"
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
          {user && (
            
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'active-link text-white block px-1 py-1' : 'text-white block px-1 py-1 hover:bg-black rounded-md'
                }
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
<NavLink
  to="portal"
  className={({ isActive }) =>
    isActive
      ? "active-link text-white block px-1 py-1"
      : "text-white block px-1 py-1 hover:bg-black rounded-md"
  }
  onClick={handleLinkClick}
>
  {portalLabel}
</NavLink>

              <NavLink
                to="about-us"
                className={({ isActive }) =>
                  isActive ? 'active-link text-white block px-1 py-1' : 'text-white block px-1 py-1 hover:bg-black rounded-md'
                }
                onClick={handleLinkClick}
              >
                About Us
              </NavLink>

              <NavLink
                to="founding-fathers"
                className={({ isActive }) =>
                  isActive ? 'active-link text-white block px-1 py-1' : 'text-white block px-1 py-1 hover:bg-black rounded-md'
                }
                onClick={handleLinkClick}
              >
                Founding Fathers
              </NavLink>

              <NavLink
                to="contact-us"
                className={({ isActive }) =>
                  isActive ? 'active-link text-white block px-1 py-1' : 'text-white block px-1 py-1 hover:bg-black rounded-md'
                }
                onClick={handleLinkClick}
              >
                Contact Us
              </NavLink>

              {/* Customer Portal (renames to the customer's display name) */}
              {customer && (
                <NavLink
                  to={`/${customer.id}-portal`}
                  className={({ isActive }) =>
                    isActive ? 'active-link text-white block px-1 py-1' : 'text-white block px-1 py-1 hover:bg-black rounded-md'
                  }
                  onClick={handleLinkClick}
                >
                  {customer.name || 'Customer Portal'}
                </NavLink>
              )}

              {/* Admin Dropdown */}
              {user.email === adminEmail && (
                <div className="relative" ref={adminDropdownRef}>
                  <button onClick={toggleAdminDropdown} className="bg-black rounded-md p-2 hover:text-blue-500 shadow-neon">
                    Admin Actions
                  </button>
                  {isAdminDropdownOpen && (
                    <ul className="absolute bg-gray-800 text-white rounded mt-2 shadow-lg">
                      <NavLink
                        to="video-upload"
                        className={({ isActive }) =>
                          isActive ? 'active-link text-white block px-1 py-1' : 'text-white block px-1 py-1'
                        }
                        onClick={handleLinkClick}
                      >
                        Video Upload
                      </NavLink>
                      <NavLink
                        to="video-alter"
                        className={({ isActive }) =>
                          isActive ? 'active-link text-white block px-1 py-1' : 'text-white block px-1 py-1'
                        }
                        onClick={handleLinkClick}
                      >
                        Video Alter
                      </NavLink>
                      <NavLink
                        to="next-generation"
                        className={({ isActive }) =>
                          isActive ? 'active-link text-white block px-1 py-1' : 'text-white block px-1 py-1'
                        }
                        onClick={handleLinkClick}
                      >
                        Next Generation
                      </NavLink>
                    </ul>
                  )}
                </div>
              )}

              {/* Welcome pill */}
              {userDetails && (
                <div className="welcome-message-container">
                  {userDetails.firstName ? (
                    <span className="welcome-message text-white bg-teal-600 rounded-full p-1 md:mb-0 shadow-nature">
                      Welcome {userDetails.firstName} {userDetails.lastName}
                    </span>
                  ) : (
                    <span className="welcome-message text-white bg-teal-600 rounded-full p-1 md:mb-0">
                      Welcome {user.email}
                    </span>
                  )}
                </div>
              )}

              {/* Logout */}
              <button onClick={logout} className="text-white hover:text-blue-500">
                Logout
              </button>
            </div>
          )}

          {!user && (
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <NavLink to="register" onClick={handleLinkClick} className="text-white hover:text-blue-500">
                Register
              </NavLink>
              <NavLink to="login" onClick={handleLinkClick} className="text-white hover:text-blue-500 ">
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
