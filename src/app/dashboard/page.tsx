'use client';

import useRequireAuth from '../hooks/useRequireAuth';

const Dashboard = () => {
  const isLoggedIn = useRequireAuth();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary font-bold text-2xl mt-8 ">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
