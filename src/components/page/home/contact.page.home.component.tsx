import type { FC } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useStore } from '@nanostores/react'
import { isLanguage } from '../../../store'
import type { IFormInput } from '../../../type'

const ContactPageHomeComponent: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>()
  const $lang = useStore(isLanguage)

  const onSubmit = (data: IFormInput): void => {
    console.log(data)
  }

  return (
    <section className='w-full overflow-hidden min-h-screen flex rounded-2xl shadow-2xl border border-gray-800 items-center justify-center py-20 px-4 relative'>
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-90' />
        <div className='absolute inset-0 mix-blend-overlay opacity-50'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#3b82f6,transparent)]' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_600px_at_0%_800px,#7c3aed,transparent)]' />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-xl p-8 rounded-3xl bg-black/40 backdrop-blur-xl shadow-xl border border-white/5 relative z-10'
      >
        <h2 className='text-5xl font-bold mb-2 text-center bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent'>
          {$lang === 'es' ? 'Contáctame' : 'Contact Me'}
        </h2>
        <p className='text-gray-400 text-center mb-8'>
          {$lang === 'es'
            ? '¿Quieres trabajar juntos?'
            : 'Want to work together?'}
        </p>

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-300 ml-1'>
              {$lang === 'es' ? 'Nombre' : 'Name'}{' '}
              <span className='text-red-500'>*</span>
            </label>
            <motion.div whileFocus={{ scale: 1.01 }} className='relative'>
              <input
                {...register('name', { required: true })}
                type='text'
                placeholder='John Doe'
                className='w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all duration-300 pl-12'
              />
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
                👤
              </span>
            </motion.div>
            {errors.name !== undefined && (
              <p className='text-red-500 text-sm mt-1'>
                {$lang === 'es' ? 'El nombre es requerido' : 'Name is required'}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-300 ml-1'>
              {$lang === 'es' ? 'Correo electrónico' : 'Email'}{' '}
              <span className='text-red-500'>*</span>
            </label>
            <motion.div whileFocus={{ scale: 1.01 }} className='relative'>
              <input
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
                type='email'
                placeholder='john@example.com'
                className='w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all duration-300 pl-12'
              />
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
                ✉️
              </span>
            </motion.div>
            {errors.email !== undefined && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.type === 'required'
                  ? $lang === 'es'
                    ? 'El correo es requerido'
                    : 'Email is required'
                  : $lang === 'es'
                    ? 'Correo inválido'
                    : 'Invalid email'}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-300 ml-1'>
              {$lang === 'es' ? 'Mensaje' : 'Message'}{' '}
              <span className='text-red-500'>*</span>
            </label>
            <motion.div whileFocus={{ scale: 1.01 }} className='relative'>
              <textarea
                {...register('message', { required: true })}
                placeholder='Your message here...'
                rows={5}
                className='w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all duration-300 pl-12 resize-none'
              />
              <span className='absolute left-4 top-6 text-gray-400'>💭</span>
            </motion.div>
            {errors.message !== undefined && (
              <p className='text-red-500 text-sm mt-1'>
                {$lang === 'es'
                  ? 'El mensaje es requerido'
                  : 'Message is required'}
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            className='w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20'
          >
            {$lang === 'es' ? 'Enviar mensaje' : 'Send Message'} ✨
          </motion.button>
        </form>
      </motion.div>
    </section>
  )
}

export default ContactPageHomeComponent
