import { type FC, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const BlogPageHomeComponent: FC = () => {
  const [showAll, setShowAll] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const blogPosts = [
    {
      id: 1,
      title: 'Desarrollo Web Moderno',
      excerpt: 'Explorando las últimas tendencias en desarrollo web...',
      date: '2024-01-15',
      category: 'Desarrollo',
      image: '/images/web-development.jpg'
    },
    {
      id: 2,
      title: 'React y TypeScript',
      excerpt: 'Mejores prácticas para trabajar con React y TypeScript...',
      date: '2024-01-10',
      category: 'Frontend',
      image: '/images/react-typescript.jpg'
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      excerpt: 'Building scalable backend services with Node.js and Express...',
      date: '2024-01-08',
      category: 'Backend',
      image: '/images/nodejs-backend.jpg'
    },
    {
      id: 4,
      title: 'Docker & Containerization',
      excerpt: 'Mastering container deployment and orchestration...',
      date: '2024-01-05',
      category: 'DevOps',
      image: '/images/docker-containers.jpg'
    },
    {
      id: 5,
      title: 'GraphQL API Design',
      excerpt: 'Best practices for designing efficient GraphQL APIs...',
      date: '2024-01-03',
      category: 'API',
      image: '/images/graphql-api.jpg'
    },
    {
      id: 6,
      title: 'Cloud Architecture',
      excerpt: 'Modern cloud solutions and architectural patterns...',
      date: '2024-01-01',
      category: 'Cloud',
      image: '/images/cloud-architecture.jpg'
    }
  ]

  const visiblePosts = showAll ? blogPosts : blogPosts.slice(0, 3)

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
          {visiblePosts.map((post, index) => (
            <motion.article
              key={post.id}
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
                  src='/favicon.svg'
                  alt={post.title}
                  className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
                />
              </div>
              <span className='inline-block px-3 py-1 text-sm bg-purple-600 text-white rounded-full mb-4'>
                {post.category}
              </span>
              <h3 className='text-xl font-semibold text-white mb-3'>
                {post.title}
              </h3>
              <p className='text-gray-300 mb-4'>{post.excerpt}</p>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-400'>{post.date}</span>
                <button className='text-purple-400 hover:text-purple-300 transition-colors'>
                  Leer más →
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {blogPosts.length > 3 && (
        <motion.div className='text-center mt-10' whileTap={{ scale: 0.95 }}>
          <button
            onClick={() => setShowAll(!showAll)}
            className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full
                     transition-colors duration-300 font-semibold shadow-lg
                     hover:shadow-purple-500/30'
          >
            {showAll ? 'Ver menos' : 'Ver más'}
          </button>
        </motion.div>
      )}
    </motion.section>
  )
}

export default BlogPageHomeComponent
