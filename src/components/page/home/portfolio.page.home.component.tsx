import { type FC, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useDataFetch } from '../../../hooks/useDataFetch.hook'
import type { IProject } from '../../../type'
import { useStore } from '@nanostores/react'
import { isLanguage } from '../../../store'

const PortfolioPageHomeComponent: FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [data, loading] = useDataFetch<IProject>('project', false)
  const $lang = useStore(isLanguage)

  const handlerExtractImageUrl = (description: string | null): string => {
    if (description === null) return ''
    if (typeof description !== 'string') return ''
    const match = description.match(/<<(.+?)>>/)
    if (match === null) return ''
    return match[1]
  }

  const handlerExtractUrl = (description: string | null): string => {
    if (description === null) return ''
    if (typeof description !== 'string') return ''

    const match = [...description.matchAll(/(?<!<)<([^<>\s]+?)>(?!>)/g)]

    if (match === null) return ''
    return match[0][1]
  }

  const handlerExtractTag = (description: string | null): string[] => {
    if (description === null) return []
    if (typeof description !== 'string') return []
    const match = description.match(/\[(".*?")\]/)
    if (match === null) return []
    const tagsRaw = match[1]
    const tags = tagsRaw.split(/"\s*,\s*"/).map((t) => t.replace(/"/g, ''))
    return tags
  }

  const handlerExtractDescription = (description: string | null): string => {
    if (description === null) return ''
    let limpio = description.replace(/<<[^<>]+?>>/, '')
    limpio = limpio.replace(/(?<!<)<[^<>]+?>(?!>)/, '')
    limpio = limpio.replace(/\["[^\]]*?"\]/, '')
    limpio = limpio.trim().replace(/\s{2,}/g, ' ')
    return limpio
  }

  return (
    <section
      ref={ref}
      className='min-h-screen py-20 px-4 bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl border border-gray-800'
    >
      {!loading && (
        <>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className='text-4xl font-bold text-center mb-12 text-white relative before:content-[""] before:absolute before:-bottom-4 before:left-1/2 before:-translate-x-1/2 before:w-20 before:h-1 before:bg-primary'
          >
            Portfolio
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex flex-col-reverse md:flex-row items-center gap-8 max-w-4xl mx-auto mb-16'
          >
            <div className='hidden md:block w-32 h-32 md:w-40 md:h-40'>
              <img
                src={data.info.avatar_url}
                alt='Portfolio illustration'
                className='w-full h-full rounded-full border-4 border-gray-700 shadow-xl object-cover'
              />
            </div>
            <div className='flex-1'>
              <p className='text-gray-300 text-lg leading-relaxed mb-4'>
                {data.info.bio}
              </p>
              <div className='flex flex-wrap gap-6 text-gray-400'>
                <a
                  href={data.info.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 hover:text-primary transition-colors'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.481C19.138 20.168 22 16.418 22 12c0-5.523-4.477-10-10-10z' />
                  </svg>
                  <span className='font-medium'>
                    {$lang === 'es' ? 'Ver perfil' : 'View profile'}
                  </span>
                </a>
                {data.info.html_url !== undefined && (
                  <>
                    <a
                      href={`${data.info.html_url}?tab=repositories`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 hover:text-primary transition-colors'
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.481C19.138 20.168 22 16.418 22 12c0-5.523-4.477-10-10-10z' />
                      </svg>
                      <span className='font-medium'>
                        {data.info.public_repos}
                      </span>
                      <span>
                        {$lang === 'es' ? 'repositorios' : 'repositories'}
                      </span>
                    </a>
                    <a
                      href={`${data.info.html_url}?tab=following`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 hover:text-primary transition-colors'
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M23 12c0-6.075-4.925-11-11-11S1 5.925 1 12s4.925 11 11 11c4.83 0 8.932-3.117 10.406-7.445.221-.65-.121-1.355-.771-1.576-.65-.221-1.355.121-1.576.771-1.159 3.41-4.397 5.75-8.059 5.75-4.767 0-8.5-3.733-8.5-8.5s3.733-8.5 8.5-8.5 8.5 3.733 8.5 8.5c0 .613-.081 1.212-.235 1.785-.153.573.186 1.162.759 1.315.573.153 1.162-.186 1.315-.759.2-.747.311-1.528.311-2.341z' />
                      </svg>
                      <span className='font-medium'>{data.info.following}</span>
                      <span>following</span>
                    </a>
                    <a
                      href={`${data.info.html_url}?tab=followers`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 hover:text-primary transition-colors'
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.481C19.138 20.168 22 16.418 22 12c0-5.523-4.477-10-10-10z' />
                      </svg>
                      <span className='font-medium'>{data.info.followers}</span>
                      <span>followers</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {data.pinned.map((project, index) => (
              <motion.div
                key={`${index + 1}-${project.name}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className='bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700/50 shadow-xl shadow-black/20'
              >
                <div className='relative group'>
                  <img
                    src={handlerExtractImageUrl(project.description)}
                    alt={project.name}
                    className='w-full h-48 object-cover brightness-90 group-hover:brightness-100 transition-all duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80' />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold mb-2 text-white'>
                    {project.name}
                  </h3>
                  <p className='text-gray-400 mb-4'>
                    {handlerExtractDescription(project.description)}
                  </p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {handlerExtractTag(project.description).map((tech) => (
                      <span
                        key={tech}
                        className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className='flex gap-3'>
                    {project.url !== null && (
                      <a
                        href={handlerExtractUrl(project.description)}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex-1 text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-primary/20'
                      >
                        {$lang === 'es' ? 'Demo' : 'Live Demo'}
                      </a>
                    )}
                    <a
                      href={project.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex-1 text-center border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 transform hover:-translate-y-1'
                    >
                      {$lang === 'es' ? 'Código fuente' : 'Source Code'}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default PortfolioPageHomeComponent
