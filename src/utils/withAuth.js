import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.signIn);

    useEffect(() => {
      if (!userInfo || !userInfo.token) {
        router.replace('/');
      }
    }, [userInfo, router]);

    return userInfo && userInfo.token ? <WrappedComponent {...props} /> : null;
  };

  // Set display name for the returned component
  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ComponentWithAuth;
};

export default withAuth;
