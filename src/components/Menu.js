import { Email, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Update active menu based on the current page
    const path = router.pathname;
    if (path && path.startsWith('/about')) {
      setActiveMenu('about');
    } else if (path && path.startsWith('/services')) {
      setActiveMenu('service');
    } else if (path && path.startsWith('/portfolio')) {
      setActiveMenu('portfolio');
    } else if (path && path.startsWith('/contact')) {
      setActiveMenu('contact');
    } else {
      setActiveMenu(null);
    }
  }, [router.pathname]);

  const handleMenuHover = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div>
      <div className="mt-3 cursor-pointer text-white">
        <nav className="space-x-8 hidden lg:flex text-center text-base font-inter text-md">
          {/* <div
            onMouseEnter={() => handleMenuHover('aboutNav')}
            onMouseLeave={() => handleMenuHover(null)}
          >
            <Link href="/about">
              <p
                className={`${
                  activeMenu === 'aboutNav' || activeMenu === 'about'
                    ? 'text-gray-500'
                    : 'text-white'
                } pb-3`}
              >
                About
              </p>
            </Link>
            {activeMenu === 'aboutNav' && (
              <div className="absolute bg-white shadow text-left p-4 rounded-lg">
                <ul>
                  <Link href="/about#about">
                    <li className="hover:text-gray-500">
                      <p>About Us</p>
                    </li>
                  </Link>
                  <Link href="/about#approach">
                    <li className="hover:text-gray-500 py-5">
                      <p>Our Approach</p>
                    </li>
                  </Link>
                  <Link href="/about#team">
                    <li className="hover:text-gray-500">
                      <p>Our Team</p>
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div> */}
          

          <div className="flex gap-10 cursor-pointer text-white">
            <Link href="/signin">
                <div className="cursor-pointer hover:text-gray-500">
                    LogIn
                </div>
            </Link>
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