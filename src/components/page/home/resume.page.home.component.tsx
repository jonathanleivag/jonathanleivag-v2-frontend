import type { FC } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'
import { useRef } from 'react'
import { useDataFetch } from '../../../hooks/useDataFetch.hook'
import type { AboutMes } from '../../../type'
import { isLanguage } from '../../../store'
import { useStore } from '@nanostores/react'
import { GiSkills } from 'react-icons/gi'
import { MdCastForEducation } from 'react-icons/md'

const ResumePageHomeComponent: FC = () => {
  const $lang = useStore(isLanguage)
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1
  })

  const [data, loading] = useDataFetch<AboutMes>('about')

  return (
    <section
      id='summary'
      ref={ref}
      className='w-full max-w-6xl mx-auto py-8 sm:py-16 px-4 min-h-screen flex flex-col justify-center overflow-x-hidden'
    >
      {!loading && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12'>
              {$lang === 'es' ? 'Mi viaje' : 'My Journey'}
            </h2>
          </motion.div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8'>
            {/* Education section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-4 sm:p-6 rounded-xl'
            >
              <div className='flex items-center gap-3 mb-6'>
                <FaGraduationCap className='w-8 h-8 text-purple-500' />
                <h3 className='text-2xl font-semibold'>
                  {data.education.title}.
                </h3>
              </div>
              <ul className='space-y-4'>
                {data.education.education.reverse().map((education, index) => (
                  <motion.li
                    key={`${index + 1}-${education.name}`}
                    whileHover={{ scale: 1.02 }}
                    className='p-4 bg-white/5 rounded-lg'
                  >
                    <h4 className='font-medium'>
                      {education.name} - {education.degree}
                    </h4>
                    <p className='text-gray-400'>
                      {education.dateStart} - {education.dateEnd}
                    </p>
                    <p className='text-gray-400'>{education.establishment}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='bg-gradient-to-br from-green-500/10 to-teal-500/10 p-4 sm:p-6 rounded-xl'
            >
              <div className='flex items-center gap-3 mb-6'>
                <MdCastForEducation className='w-8 h-8 text-green-500' />
                <h3 className='text-2xl font-semibold'>
                  {$lang === 'es' ? 'Cursos' : 'Courses'}.
                </h3>
              </div>
              <ul className='space-y-4'>
                {data.courses.map((curse, index) => (
                  <motion.li
                    key={`${index + 1}-${curse.name}`}
                    whileHover={{ scale: 1.02 }}
                    className='p-4 bg-white/5 rounded-lg'
                  >
                    <h4 className='font-medium'>{curse.name}</h4>
                    <p className='text-gray-400'>{curse.content}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className='col-span-1 md:col-span-2 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-4 sm:p-6 rounded-xl'
            >
              <div className='flex items-center gap-3 mb-4 sm:mb-6'>
                <GiSkills className='w-6 h-6 sm:w-8 sm:h-8 text-orange-500' />
                <h3 className='text-xl sm:text-2xl font-semibold'>
                  {data.skills.title}
                </h3>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {data.skills.skills.map((skill, index) => (
                  <motion.div
                    key={`${index + 1}-${skill.title}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-white/5 p-3 rounded-lg ${
                      index + 1 === 3
                        ? 'col-span-1 sm:col-span-2 md:col-span-1'
                        : ''
                    }`}
                  >
                    <h4 className='font-medium my-3 sm:my-5 text-center text-base sm:text-lg'>
                      {skill.title}
                    </h4>
                    <p className='text-gray-400 text-sm sm:text-base'>
                      {skill.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </section>
  )
}

export default ResumePageHomeComponent
