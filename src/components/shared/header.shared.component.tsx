import {type FC, useEffect} from 'react'
import type {Header, HeaderSharedComponentProps} from '../../type'
import {useDataFetch} from '../../hooks/useDataFetch.hook'
import CvButtonSharedComponent from "./cvButton.shared.component.tsx";
import {personalData} from "../../store.ts";
import {motion} from 'framer-motion';

const fromLeftVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

const scaleVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const rotateVariant = {
  hidden: { opacity: 0, rotate: -5 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 0.5 } }
};

// Definir una variante combinada
const combinedVariant = {
  hidden: { opacity: 0, x: -30, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const HeaderSharedComponent: FC<HeaderSharedComponentProps> = ({
  children
}) => {
  const [data, loading] = useDataFetch<Header>('header')

  useEffect(() => {
    if (!loading){
      personalData.set({
        name: data.name,
        profession: data.subTitle
      })
    }
  }, [loading, data]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <header
      id='home'
      className='min-h-screen w-full flex flex-col justify-center relative overflow-hidden bg-background'
    >
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
        <motion.div
          className='container mx-auto px-4 text-left relative z-10 mt-28'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <motion.p
            className='text-primary text-xl lg:text-3xl mb-6 font-light tracking-[0.2em] uppercase'
            variants={combinedVariant}
          >
            {data.title}
          </motion.p>
          <motion.h1
            className='text-4xl md:text-7xl lg:text-[8.5rem] font-bold leading-none mb-8 bg-gradient-to-r from-white via-primary/80 to-white bg-clip-text text-transparent max-w-5xl'
            variants={scaleVariant}
            whileHover={{ scale: 1.05 }}  // Efecto adicional al pasar el mouse
            transition={{ duration: 0.3 }}
          >
            {data.name}.
          </motion.h1>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className='text-2xl lg:text-3xl text-white/80 max-w-2xl leading-relaxed mt-8 font-light'
              variants={rotateVariant}
            >
              {data.subTitle}
            </motion.h2>
            <motion.div variants={fromLeftVariant}>
              <CvButtonSharedComponent text={data.buttonText} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </header>
  )
}

export default HeaderSharedComponent
