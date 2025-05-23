import type {FC} from 'react'
import {useState} from 'react' // Importamos useState
import {motion} from 'framer-motion'
import {useForm} from 'react-hook-form'
import {useStore} from '@nanostores/react'
import {isLanguage} from '../../../store'
import type {IFormInput} from '../../../type'
import {toast, Toaster} from "react-hot-toast";

const ContactPageHomeComponent: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
      reset
  } = useForm<IFormInput>()
  const $lang = useStore(isLanguage)

  const onSubmit = async (form: IFormInput): Promise<void> => {
      try {
        setIsSubmitting(true)
        const response = await fetch('/api/contact',  {
          method: 'POST',

          body: JSON.stringify({...form, content: form.message}),
        })
        const data = await response.json()
        if (data.error === null) {
          toast.success(data.message)
          reset()
        } else {
          toast.error(data.error)
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
          toast.error(e.message)
        }
      } finally {
        setIsSubmitting(false)
      }
  }

  return (
    <section
      id='contact'
      className='w-full overflow-hidden min-h-screen flex rounded-2xl shadow-2xl border border-gray-800 items-center justify-center py-20 px-4 relative'
    >
      <Toaster />
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
            ? '¿Quieres trabajar conmigo?'
            : 'Do you want to work with me?'}
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
                placeholder={$lang === 'es' ? 'Juan Pérez' : 'John Doe'}
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
                placeholder={
                  $lang === 'es' ? 'juan@ejemplo.com' : 'john@example.com'
                }
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
                placeholder={
                  $lang === 'es' ? 'Tu mensaje aquí...' : 'Your message here...'
                }
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
            disabled={isSubmitting}
            className='w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 cursor-pointer'
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>{$lang === 'es' ? 'Enviando...' : 'Sending...'}</span>
              </div>
            ) : (
              <>{$lang === 'es' ? 'Enviar mensaje' : 'Send Message'} ✨</>
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  )
}

export default ContactPageHomeComponent
