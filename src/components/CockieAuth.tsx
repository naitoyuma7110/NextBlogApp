import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const CookieAuth = ({ children }: { children: React.ReactNode }) => {
  //router
  const router = useRouter();

  //Cookieのチェック（これをいろいろ認証タイプにより変更）
  const signedIn = Cookies.get('signedIn');
  //signedInがOKじゃなければ/loginへ
  if (signedIn !== 'OK') router.replace('/auth/login');

  //何もなければ次へ（そのまま処理）
  return children;
};

export default CookieAuth;
