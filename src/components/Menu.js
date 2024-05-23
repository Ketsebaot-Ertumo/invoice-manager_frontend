import { userLogoutAction } from '@/redux/actions/userAction';
import { Email, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; 

const Menu = () => {

  const { userInfo } = useSelector(state => state.signIn);
  const dispatch = useDispatch();
  const router = useRouter();

  //log out
  const logOut = () => {
      dispatch(userLogoutAction());
      router.push('/signin');
  }

  return (
    <div>
      <div className="mt-3 cursor-pointer text-white">
        <nav className="space-x-8 hidden lg:flex text-center text-base font-inter text-md">
  
          <div className="flex gap-10 cursor-pointer text-white">
            {!userInfo || userInfo?.token === null ? (
              <Link href="/signin">
                <div className="cursor-pointer hover:text-gray-500">
                  Login
                </div>
              </Link>
            ) : (
              <div className="cursor-pointer hover:text-gray-500" onClick={logOut}>
                Logout
              </div>
            )}

            <a href="https://www.linkedin.com/in/lik-architects?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
              <div className="cursor-pointer hover:text-gray-500">
                <LinkedIn />
              </div>
            </a>
            <a href="https://www.instagram.com/likawunt1?igsh=YTQwZjQ0NmI0OA%3D%3D&utm_source=qr">
              <div className="cursor-pointer hover:text-gray-500">
                <Instagram />
              </div>{' '}
            </a>
            <a href="mailto:Likawunt100@gmail.com">
              <div className="cursor-pointer hover:text-gray-500">
                <Twitter />
              </div>
            </a>
            <a href="https://www.youtube.com/@LeptonGames">
              <div className="cursor-pointer hover:text-gray-500">
                <YouTube />
              </div>
            </a>
            <a href="mailto:Likawunt100@gmail.com">
              <div className="cursor-pointer hover:text-gray-500">
                <Email />
              </div>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Menu;