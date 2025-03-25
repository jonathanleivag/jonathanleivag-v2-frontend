import type { FC } from 'react'
import type { Header, HeaderSharedComponentProps } from '../../type'
import { useDataFetch } from '../../hooks/useDataFetch.hook'

const HeaderSharedComponent: FC<HeaderSharedComponentProps> = ({
  children
}) => {
  const [data, loading] = useDataFetch<Header>('header')

  return (
    <header className='min-h-screen w-full flex flex-col justify-center relative overflow-hidden bg-background'>
      <div className='absolute top-0 left-0 w-full z-20'>{children}</div>
      <div className='absolute inset-0 bg-gradient-to-tr from-background via-primary/5 to-background' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(var(--primary-rgb),0.15),transparent_50%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(var(--secondary-rgb),0.1),transparent_50%)]' />
      <div className='absolute inset-0 opacity-10'>
        <img
          src={data.imageUrl}
          alt='Background Pattern'
          className='w-full h-full object-cover'
        />
      </div>

      {!loading && (
        <div className='container mx-auto px-4 text-left relative z-10 mt-28'>
          <p className='text-primary text-xl lg:text-3xl mb-6 font-light tracking-[0.2em] uppercase'>
            {data.title}
          </p>
          <h1 className='text-4xl md:text-7xl lg:text-[8.5rem] font-bold leading-none mb-8 bg-gradient-to-r from-white via-primary/80 to-white bg-clip-text text-transparent max-w-5xl'>
            {data.name}.
          </h1>
          <h2 className='text-2xl lg:text-3xl text-white/80 max-w-2xl leading-relaxed mt-8 font-light'>
            {data.subTitle}
          </h2>
          <button className='mt-12 cursor-pointer group relative px-8 py-3 text-lg overflow-hidden border border-primary/30 rounded-md'>
            <span className='relative z-10 text-primary group-hover:text-background transition-colors duration-300'>
              {data.buttonText}
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-primary to-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-300' />
          </button>
        </div>
      )}
    </header>
  )
}

export default HeaderSharedComponent
