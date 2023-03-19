import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// route制御のために対象のコンポーネントをwrapして使用する
// 認証済みの場合のみコンポーネントのレンダリング
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // useSessionからstateを分割代入
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [router, status]);

  if (status === 'unauthenticated') return null;

  // wrapした子コンポーネントを表示
  return <>{children}</>;
};

export default ProtectedRoute;
