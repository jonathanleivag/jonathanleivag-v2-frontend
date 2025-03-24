import type { FC } from 'react'
import { useDataFetch } from '../../../hooks/useDataFetch.hook'
import type { AboutMes } from '../../../type'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useStore } from '@nanostores/react'
import { isLanguage } from '../../../store'
import SocialSharedComponent from '../../shared/social.shared.component'

const AboutMePageComponent: FC = () => {
  const $lang = useStore(isLanguage)
  const [data, loading] = useDataFetch<AboutMes>('about')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: 'beforeChildren'
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='w-full min-h-screen py-20 px-4 bg-gradient-to-b from-background via-background/80 to-background relative overflow-hidden'
    >
      <div className='absolute inset-0 bg-grid-white/[0.02] -z-10' />
      <div className='absolute inset-0 flex items-center justify-center -z-10'>
        <div className='w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl' />
      </div>

      {!loading && (
        <motion.div
          variants={container}
          initial='hidden'
          animate={isInView === true ? 'show' : 'hidden'}
          className='max-w-7xl mx-auto relative'
        >
          <motion.h2
            variants={item}
            className='text-7xl font-bold text-center mb-20 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative inline-block w-full'
          >
            <span className='absolute -inset-1 blur-2xl bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full' />
            {data.title}
          </motion.h2>

          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
            <motion.div
              variants={item}
              whileHover={{ scale: 1.02 }}
              className='lg:col-span-5 relative group'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 blur-2xl scale-95 opacity-0 group-hover:opacity-100 transition-all duration-500' />
              <div className='relative w-full aspect-square overflow-hidden rounded-3xl border border-white/10'>
                <img
                  src={data.image}
                  className='object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110'
                />
                <SocialSharedComponent />
                <div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              </div>
            </motion.div>

            <div className='lg:col-span-7 space-y-10'>
              <motion.div
                variants={item}
                className='relative backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10'
              >
                <p className='text-xl leading-relaxed text-foreground/90'>
                  {data.description}
                </p>
              </motion.div>

              <motion.div variants={item} className='grid grid-cols-2 gap-6'>
                <div className='relative group'>
                  <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  <motion.div
                    whileHover={{ y: -8 }}
                    className='relative backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10'
                  >
                    <h3 className='text-2xl font-semibold mb-4 text-primary'>
                      {$lang === 'es' ? 'Experiencia' : 'Experience'}
                    </h3>
                    <p className='text-lg text-foreground/80'>
                      {$lang === 'es'
                        ? '3 año de experiencia'
                        : '3 year of experience'}
                    </p>
                  </motion.div>
                </div>

                <div className='relative group'>
                  <div className='absolute inset-0 bg-gradient-to-r from-secondary/20 to-secondary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  <motion.div
                    whileHover={{ y: -8 }}
                    className='relative backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10'
                  >
                    <h3 className='text-2xl font-semibold mb-4 brightness-125'>
                      {$lang === 'es' ? 'Especialidades' : 'Specialties'}
                    </h3>
                    <p className='text-lg text-foreground/80'>
                      {$lang === 'es'
                        ? 'Frontend & Backend'
                        : 'Frontend & Backend'}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.section>
  )
}

export default AboutMePageComponent
