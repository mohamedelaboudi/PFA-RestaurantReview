import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const MainLayout = ({ children, setShowLogin }) => {
  return (
    <>
      <Navbar setShowLogin={setShowLogin} />
      <div className="main-content">
        {children}
      </div>
      <Footer />
    </>
  );
};
MainLayout.propTypes = {
    children: PropTypes.func.isRequired,
    setShowLogin: PropTypes.func.isRequired,
  };
export default MainLayout;
