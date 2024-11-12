import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderTopOne from "./menu/HeaderTopOne";
import NavMenu from "./menu/NavMenu";
import MobileSidebar from "./menu/MobileSidebar";
import UseSticky from "../../hooks/UseSticky";
import InjectableSvg from "../../hooks/InjectableSvg";
import CustomSelect from "../../ui/CustomSelect";
import TotalWishlist from "../../components/common/TotalWishlist";
import TotalCart from "../../components/common/TotalCart";

const HeaderOne = () => {
   const [selectedOption, setSelectedOption] = useState(null);
   const { sticky } = UseSticky();
   const [isActive, setIsActive] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [loading, setLoading] = useState(true); // Add loading state to manage async

   // Function to validate token using fetch
   const validateToken = async (token) => {
      try {
         const response = await fetch("http://localhost:5000/api/token/validateToken", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
         });

         if (response.ok) {
            return true; // Token is valid
         } else {
            return false; // Token is invalid or expired
         }
      } catch (error) {
         console.error("Error validating token", error);
         return false; // Handle fetch errors (e.g., network issues)
      }
   };

   // Check if token is valid or expired on component mount
   useEffect(() => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (token) {
         validateToken(token).then((isValid) => {
            if (isValid) {
               setIsLoggedIn(true); // User is logged in
            } else {
               localStorage.removeItem("token"); // Clear invalid token
               setIsLoggedIn(false); // User is logged out
            }
            setLoading(false); // Set loading to false once validation is done
         });
      } else {
         setIsLoggedIn(false); // No token found, user is not logged in
         setLoading(false); // Set loading to false
      }
   }, []);

   const handleSelectChange = (option) => {
      setSelectedOption(option);
   };

   // Show loading indicator while the token is being validated
   if (loading) {
      return <div>Loading...</div>; // Customize your loading screen as needed
   }

   return (
      <>
         <header>
            <HeaderTopOne style={false} />
            <div id="header-fixed-height"></div>
            <div id="sticky-header" className={`tg-header__area ${sticky ? "sticky-menu" : ""}`}>
               <div className="container custom-container">
                  <div className="row">
                     <div className="col-12">
                        <div className="tgmenu__wrap">
                           <nav className="tgmenu__nav">
                              <div className="logo">
                                 <Link to="/">
                                    <img src="/assets/img/logo/logo.svg" alt="Logo" />
                                 </Link>
                              </div>
                              <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                                 <NavMenu />
                              </div>
                              <div className="tgmenu__search d-none d-md-block">
                                 <CustomSelect value={selectedOption} onChange={handleSelectChange} />
                              </div>
                              <div className="tgmenu__action">
                                 <ul className="list-wrap">
                                    <li className="wishlist-icon">
                                       <Link to="/wishlist" className="cart-count">
                                          <InjectableSvg src="/assets/img/icons/heart.svg" className="injectable" alt="Wishlist" />
                                          <TotalWishlist />
                                       </Link>
                                    </li>
                                    <li className="mini-cart-icon">
                                       <Link to="/cart" className="cart-count">
                                          <InjectableSvg src="/assets/img/icons/cart.svg" className="injectable" alt="Cart" />
                                          <TotalCart />
                                       </Link>
                                    </li>
                                    <li className="header-btn login-btn">
                                       {isLoggedIn ? (
                                          <Link to="/profile">
                                             <InjectableSvg src="/assets/img/icons/user.svg" alt="Profile" className="injectable" />
                                          </Link>
                                       ) : (
                                          <Link to="/login">Log in</Link>
                                       )}
                                    </li>
                                 </ul>
                              </div>
                              <div className="mobile-login-btn">
                                 <Link to={isLoggedIn ? "/profile" : "/login"}>
                                    <InjectableSvg src="/assets/img/icons/user.svg" alt="Profile" className="injectable" />
                                 </Link>
                              </div>
                              <div onClick={() => setIsActive(true)} className="mobile-nav-toggler">
                                 <i className="tg-flaticon-menu-1"></i>
                              </div>
                           </nav>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <MobileSidebar isActive={isActive} setIsActive={setIsActive} />
      </>
   );
};

export default HeaderOne;
