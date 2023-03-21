import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ProtectedRoute from './ProtectedRoute';

//  authRoutesに指定したrouteのみprotectedコンポーネントにより保護する
const authRoutes = ['/mypage', '/articles/[id]', '/articles/post'];

// それ以外は通常通り表示
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'loading') return null;

  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </>
  );
};

export default AuthWrapper;
