import {type FC, useEffect, useState} from 'react'
import LogoSharedComponent from './logo.shared.component'
import {useDataFetch} from '../../hooks/useDataFetch.hook'
import type {MenuDesktopComponentProps, MenuMobileComponentProps, Navbar} from '../../type'
import LanguageSharedComponent from './language.shared.component'
import {TiThMenuOutline} from 'react-icons/ti'
import {IoCloseSharp} from 'react-icons/io5'
import {getENV} from "../../utils/env.util.ts";
import {ENV} from "../../enum.ts";

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

  return (
    <div className='w-[80%] h-full flex flex-row justify-end items-center'>
      <ul className='flex-row gap-6 justify-center items-center text-xl hidden lg:flex'>
        {!loading && (
          <>
            {data.nav.map((nav, index) => (
              <li key={`${nav.nav}-${index}`}>
                <a
                  href={`#${nav.router}`}
                  onClick={(e) => handleClick(e, nav.router)}
                  className='relative'
                >
                  {nav.nav}
                </a>
              </li>
            ))}
          </>
        )}
        {getENV(ENV.PUBLIC_LANG) === 'ON' && (
          <li>
            <LanguageSharedComponent className='border border-primary rounded-lg p-2 uppercase' />
          </li>
        )}
      </ul>
    </div>
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
    <section
      className={`fixed z-50 top-0 left-0 w-full h-full bg-background transition-transform duration-300 bg-secondary/90 lg:hidden ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='w-full h-full relative'>
        <div className='top-8 left-8 w-auto absolute'>
          <button
            onClick={() => setIsOpen(false)}
            className='text-4xl text-primary transition-transform duration-300'
          >
            <IoCloseSharp
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>
        <div className='w-full py-10  flex flex-row justify-center items-center'>
          <LogoSharedComponent className='block lg:hidden' />
        </div>
        <div className='w-full'>
          <ul className='w-full flex flex-col text-center justify-center items-center text-4xl gap-8'>
            {!loading && (
              <>
                {data.nav.map((nav, index) => (
                  <li
                    style={{ transitionDelay: `${index * 150}ms` }}
                    className={`py-3 transition-all duration-500 ${
                      isOpen
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-full opacity-0'
                    }`}
                    key={`${nav.nav}-${index}`}
                  >
                    <a
                      href={`#${nav.router}`}
                      onClick={(e) => handleClick(e, nav.router)}
                      className='transition-colors'
                    >
                      {nav.nav}
                    </a>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </section>
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

  useEffect(() => {
    const handleScroll = (): void => {
      setHasScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <MenuMobileComponent
        isOpen={isOpen}
        setIsOpen={handleClose}
        data={data}
        loading={loading}
      />
      <nav
        className={`fixed top-0 left-0 w-full h-[6.25rem] flex flex-row justify-center items-center z-40 transition-all duration-300 ${
          hasScrolled ? 'bg-background/80 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className='h-[4.375rem] w-[90%] flex flex-row justify-center items-center'>
          <div className='w-[20%] h-full flex flex-row justify-center items-center overflow-hidden'>
            <LogoSharedComponent className='hidden lg:block' />
            <button
              onClick={handlerIsOpen}
              className={`lg:hidden transition-all duration-300 ${
                isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
              }`}
            >
              <TiThMenuOutline className='text-primary text-4xl' />
            </button>
          </div>
          {!isOpen && <LogoSharedComponent className='lg:hidden absolute' />}
          <MenuDesktopComponent data={data} loading={loading} />
          <div className='py-1 lg:hidden'>
            <LanguageSharedComponent className='border border-primary rounded-lg p-2 uppercase' />
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavbarSharedComponent
