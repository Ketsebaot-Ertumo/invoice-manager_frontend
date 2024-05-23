// components/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.signIn);

    useEffect(() => {
      if (!userInfo || !userInfo.token) {
        router.replace('/');
      }
    }, [userInfo, router]);

    return userInfo && userInfo.token ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
