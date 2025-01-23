import React from 'react';
import { useSelector } from 'react-redux';

// Import PNG files
import LogoDark from '../../assets/images/logos/logovalo.png';
import LogoWhite from '../../assets/images/logos/logovalo1.png';

const AuthLogo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);

  return (
    <div className="p-4 d-flex justify-content-center gap-2">
      {isDarkMode !== false ? (
        <img src={LogoWhite} alt="Logo White" style={{ width: '120px', height: 'auto' }} />
      ) : (
        <img src={LogoDark} alt="Logo Dark" style={{ width: '120px', height: 'auto' }} />
      )}
    </div>
  );
};

export default AuthLogo;
