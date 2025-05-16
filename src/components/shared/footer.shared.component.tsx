import type { FC } from 'react'
import { motion } from 'framer-motion'
import SocialSharedComponent from './social.shared.component'
import { useStore } from '@nanostores/react'
import { isLanguage } from '../../store'

const FooterSharedComponent: FC = () => {
  const $lang = useStore(isLanguage)

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 overflow-hidden'
    >
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-center items-center'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='mb-4 md:mb-0 w-full md:w-1/2 flex flex-col justify-center items-center'
          >
            <h2 className='text-2xl font-bold'>Jonathan Leiva</h2>
            <p className='text-gray-400'>Full Stack Developer</p>
          </motion.div>

          <motion.div className='flex flex-row w-full md:w-1/2 justify-center items-center relative h-11 overflow-hidden rounded-3xl'>
            <SocialSharedComponent />
          </motion.div>
        </div>

        <motion.div
          className='mt-8 text-center text-gray-400 text-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            © {new Date().getFullYear()} Jonathan Leiva.{' '}
            {$lang === 'es'
              ? 'Todos los derechos reservados'
              : 'All rights reserved'}{' '}
            .
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default FooterSharedComponent
