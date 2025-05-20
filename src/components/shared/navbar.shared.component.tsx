import {type FC, useEffect, useState} from 'react'
import LogoSharedComponent from './logo.shared.component'
import {useDataFetch} from '../../hooks/useDataFetch.hook'
import type {MenuDesktopComponentProps, MenuMobileComponentProps, Navbar} from '../../type'
import LanguageSharedComponent from './language.shared.component'
import {TiThMenuOutline} from 'react-icons/ti'
import {IoCloseSharp} from 'react-icons/io5'
import {getENV} from "../../utils/env.util.ts";
import {ENV} from "../../enum.ts";
import {AnimatePresence, motion} from 'framer-motion'

const MenuDesktopComponent: FC<MenuDesktopComponentProps> = ({
  data,
  loading
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    router: string
  ): void => {
    e.preventDefault()
    const element = document.getElementById(router)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const createRippleEffect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const circle = document.createElement("span");
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;

    circle.classList.add("ripple-effect");

    const ripple = button.querySelector(".ripple-effect");
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  };

  return (
    <>
      <style>
        {`
          .nav-link {
            position: relative;
            overflow: hidden;
            padding: 6px 12px;
            border-radius: 4px;
          }
          
          .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
          }
          
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `}
      </style>
      <div className='w-[80%] h-full flex flex-row justify-end items-center'>
        <ul className='flex-row gap-6 justify-center items-center text-xl hidden lg:flex'>
          {!loading && (
            <>
              {data.nav.map((nav, index) => (
                <motion.li
                  key={`${nav.nav}-${index}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.a
                    href={`#${nav.router}`}
                    onClick={(e) => {
                      createRippleEffect(e);
                      handleClick(e, nav.router);
                    }}
                    className='relative nav-link'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95, backgroundColor: "rgba(var(--primary), 0.1)" }}
                  >
                    {nav.nav}
                  </motion.a>
                </motion.li>
              ))}
            </>
          )}
          {getENV(ENV.PUBLIC_LANG) === 'ON' && (
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: data.nav.length * 0.1 }}
            >
              <LanguageSharedComponent className='border border-primary rounded-lg p-2 uppercase' />
            </motion.li>
          )}
        </ul>
      </div>
    </>
  )
}

const MenuMobileComponent: FC<MenuMobileComponentProps> = ({
  isOpen,
  setIsOpen,
  loading,
  data
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    router: string
  ): void => {
    e.preventDefault()
    const element = document.getElementById(router)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
    setTimeout(() => {
      window.location.hash = router
    }, 500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          className="fixed z-50 top-0 left-0 w-full h-full bg-secondary/90 lg:hidden"
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className='w-full h-full relative'>
            <div className='top-8 left-8 w-auto absolute'>
              <motion.button
                onClick={() => setIsOpen(false)}
                className='text-4xl text-primary'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: 180 }}
                initial={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <IoCloseSharp />
              </motion.button>
            </div>
            <motion.div
              className='w-full py-10 flex flex-row justify-center items-center'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <LogoSharedComponent className='block lg:hidden' />
            </motion.div>
            <div className='w-full'>
              <ul className='w-full flex flex-col text-center justify-center items-center text-4xl gap-8'>
                {!loading && (
                  <>
                    {data.nav.map((nav, index) => (
                      <motion.li
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          ease: "easeOut"
                        }}
                        className="py-3"
                        key={`${nav.nav}-${index}`}
                      >
                        <motion.a
                          href={`#${nav.router}`}
                          onClick={(e) => handleClick(e, nav.router)}
                          className='transition-colors'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {nav.nav}
                        </motion.a>
                      </motion.li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

const NavbarSharedComponent: FC = () => {
  const [data, loading] = useDataFetch<Navbar>('navbar')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hasScrolled, setHasScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setHasScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlerIsOpen = (): void => {
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const handleClose = (): void => {
    setIsOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <MenuMobileComponent
        isOpen={isOpen}
        setIsOpen={handleClose}
        data={data}
        loading={loading}
      />
      <motion.nav
        className="fixed top-0 left-0 w-full h-[6.25rem] flex flex-row justify-center items-center z-40"
        initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
        animate={{
          backgroundColor: hasScrolled ? 'rgba(var(--background), 0.8)' : 'rgba(0,0,0,0)',
          backdropFilter: hasScrolled ? 'blur(8px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className='h-[4.375rem] w-[90%] flex flex-row justify-center items-center'>
          <motion.div
            className='w-[20%] h-full flex flex-row justify-center items-center overflow-hidden'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LogoSharedComponent className='hidden lg:block' />
            <motion.button
              onClick={handlerIsOpen}
              className="lg:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <TiThMenuOutline className='text-primary text-4xl' />
            </motion.button>
          </motion.div>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute"
            >
              <LogoSharedComponent />
            </motion.div>
          )}
          <MenuDesktopComponent data={data} loading={loading} />
          {getENV(ENV.PUBLIC_LANG) === 'ON' && (
            <motion.div
              className='py-1 lg:hidden'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <LanguageSharedComponent className='border border-primary rounded-lg p-2 uppercase' />
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  )
}

export default NavbarSharedComponent
