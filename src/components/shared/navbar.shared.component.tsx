import { useState, type FC } from 'react'
import LogoSharedComponent from './logo.shared.component'
import { useDataFetch } from '../../hooks/useDataFetch.hook'
import type {
  MenuDesktopComponentProps,
  MenuMobileComponentProps,
  Navbar
} from '../../type'
import LanguageSharedComponent from './language.shared.component'
import { TiThMenuOutline } from 'react-icons/ti'
import { IoCloseSharp } from 'react-icons/io5'

const MenuDesktopComponent: FC<MenuDesktopComponentProps> = ({
  data,
  loading
}) => {
  return (
    <div className='w-[80%] h-full flex flex-row justify-end items-center'>
      <ul className='flex-row gap-6 justify-center items-center text-xl hidden lg:flex'>
        {!loading && (
          <>
            {data.nav.map((nav, index) => (
              <li key={`${nav}-${index}`}>
                <a href='#'> {nav} </a>
              </li>
            ))}
          </>
        )}
        <li>
          <LanguageSharedComponent className='border border-primary rounded-lg p-2 uppercase' />
        </li>
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
          <ul className='w-full flex flex-col text-center justify-center items-center text-2xl'>
            {!loading && (
              <>
                {data.nav.map((nav, index) => (
                  <li
                    style={{ transitionDelay: `${index * 150}ms` }}
                    className={`py-1 transition-all duration-500 ${
                      isOpen
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-full opacity-0'
                    }`}
                    key={`${nav}-${index}`}
                  >
                    <a href='#'> {nav} </a>
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

  const handlerIsOpen = (): void => setIsOpen(true)

  return (
    <>
      <MenuMobileComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={data}
        loading={loading}
      />
      <nav className='h-[6.25rem] flex flex-row justify-center items-center'>
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
