import { type FC, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import type { Blog, Pagination } from '../../../type'
import { getENV } from '../../../utils/env.util.ts'
import { ENV } from '../../../enum.ts'

const BlogPageHomeComponent: FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [data, setData] = useState<Blog[]>([])

  useEffect(() => {
    const dataFetch = async (): Promise<void> => {
      try {
        const response = await fetch('/api/blog', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data: Pagination<Blog> = await response.json()
        setData(data.docs)
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
        }
      }
    }
    void dataFetch()
  }, [])

  return (
    <motion.section
      id='blog'
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className='w-full px-4 py-12'
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
      >
        Blog
      </motion.h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
        <AnimatePresence>
          {data.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                delay: isInView ? 0.4 + index * 0.1 : 0
              }}
              className='bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl
                       transform hover:scale-105 transition-all duration-300
                       border border-gray-700 hover:border-purple-500 overflow-hidden'
            >
              <div className='relative w-full h-48 mb-4 rounded-lg overflow-hidden'>
                <img
                  src={post.image}
                  alt={post.title}
                  className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
                />
              </div>
              <span className='inline-block px-3 py-1 text-sm bg-purple-600 text-white rounded-full mb-4'>
                {post.category.name}
              </span>
              <h3 className='text-xl font-semibold text-white mb-3'>
                {post.title}
              </h3>
              <p className='text-gray-300 mb-4'>{post.description}</p>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-400'>
                  {post.createdAt.toString()}
                </span>
                <a
                  target='_blank'
                  href={`${getENV(ENV.BLOG_URL)}/blog/view/${post.slug}`}
                  className='text-purple-400 hover:text-purple-300 transition-colors'
                  rel='noreferrer'
                >
                  Leer más →
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      <motion.div className='text-center mt-10' whileTap={{ scale: 0.95 }}>
        <a
          href={`${getENV(ENV.BLOG_URL)}`}
          target='_blank'
          rel='noreferrer'
          className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full
                     transition-colors duration-300 font-semibold shadow-lg
                     hover:shadow-purple-500/30'
        >
          Ver más
        </a>
      </motion.div>
    </motion.section>
  )
}

export default BlogPageHomeComponent
