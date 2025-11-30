import React, { useState, useEffect, useContext } from 'react';

export default function NavBarItemCompontent() {
  const [isRefresh, setRefresh] = useState(false);
  useEffect(() => {
    setRefresh(true);
    console.log('NavBarItemCompontent refresh', isRefresh);
  }, [isRefresh]);
  return <div className="layout-header-edit">3333</div>;
}
