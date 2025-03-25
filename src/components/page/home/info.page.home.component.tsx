import { useEffect, useState, useRef, type FC } from 'react'
import type { AboutMes, technologies } from '../../../type'
import { useDataFetch } from '../../../hooks/useDataFetch.hook'
import { useStore } from '@nanostores/react'
import { isLanguage } from '../../../store'

const InfoPageHomeComponent: FC = () => {
  const $lang = useStore(isLanguage)
  const [mounted, setMounted] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const [technologies, setTechnologies] = useState<technologies[]>([])
  const [allTechnologies, setAllTechnologies] = useState<technologies[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [data, loading] = useDataFetch<AboutMes>('about')

  useEffect(() => {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show-timeline')
          } else {
            entry.target.classList.remove('show-timeline')
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    const orbitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setMounted(true), 100)
          } else {
            setMounted(false)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (!loading && data !== undefined) {
      const timelineItems =
        timelineRef.current?.querySelectorAll('.timeline-item')
      timelineItems?.forEach((item) => {
        item.classList.add('timeline-item')
        timelineObserver.observe(item)
      })

      if (techRef.current !== null) {
        orbitObserver.observe(techRef.current)
      }
    }

    return () => {
      timelineObserver.disconnect()
      orbitObserver.disconnect()
    }
  }, [loading, data])

  useEffect(() => {
    const getRandomElements = (
      array: technologies[],
      count: number = 8
    ): technologies[] => {
      const shuffled = [...array].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    }

    const handlerSetTechnologies = (): void => {
      if (loading) return
      const knowledge: technologies[] = data.knowledge.knowledge.flatMap(
        (category) =>
          category.knowledge.map((tech, index) => ({
            name: tech.language,
            delay: `${(index + 1) * 0.1}s`,
            icon: tech.icon,
            url: tech.url
          }))
      )
      setAllTechnologies(knowledge)
      setTechnologies(getRandomElements(knowledge))
    }
    handlerSetTechnologies()
  }, [loading, data])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const Modal: FC = () => {
    if (!isModalOpen) return null

    return (
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
        <div className='bg-background/80 backdrop-blur-sm p-6 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto'>
          <div className='flex justify-between items-center mb-6'>
            <h3 className='text-xl font-bold'>{data.knowledge.title}</h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className='text-text/60 hover:text-text cursor-pointer'
            >
              ✕
            </button>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {allTechnologies.map((tech, index) => (
              <a
                key={tech.name}
                href={tech.url}
                target='_blank'
                rel='noreferrer'
                className='flex flex-col items-center p-4 bg-primary/5 rounded-lg
                         hover:bg-primary/10 transition-all duration-300'
                style={{
                  animation: 'fadeInUp 0.3s ease-out forwards',
                  animationDelay: `${index * 0.05}s`
                }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className='w-12 h-12 object-contain bg-white/80 p-1.5 rounded-md'
                />
                <span className='mt-2 text-sm text-center'>{tech.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className='w-full flex flex-row justify-center items-center my-20'>
        <div className='w-[90%] flex flex-col lg:flex-row'>
          {!loading && (
            <div className='w-full lg:w-[60%]' ref={timelineRef}>
              <h2 className='text-2xl font-bold mb-8 text-text uppercase'>
                {data.works.title}.
              </h2>
              <div className='space-y-8 px-4'>
                {data.works.works.map((work, index) => (
                  <div
                    key={`${work.name}-${index}`}
                    className='relative pl-8 border-l-2 border-primary/30 timeline-item'
                  >
                    <div className='absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1' />
                    <h3 className='text-xl font-semibold mb-2'>
                      {work.jobTitle}
                    </h3>
                    <p className='text-sm text-text/60 mb-3'>
                      {work.dateStart} -{' '}
                      {work.dateEnd === null
                        ? $lang === 'es'
                          ? 'Actualidad'
                          : 'Present'
                        : work.dateEnd}
                    </p>
                    <p className='text-text/80 text-white'>{work.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div
            className='w-full lg:w-[40%] flex flex-col justify-center items-center mt-12 lg:mt-0'
            ref={techRef}
          >
            <h2 className='text-2xl font-bold mb-8 text-text text-center uppercase order-1 lg:order-1'>
              {!loading && data.knowledge.title}.
            </h2>
            <div className='relative w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] order-3 lg:order-2'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div
                  className='absolute w-20 h-20 lg:w-32 lg:h-32
                                  bg-primary/10 backdrop-blur-sm rounded-full
                                  flex items-center justify-center z-10
                                  hover:scale-110 transition-all duration-300
                                  hover:bg-primary/20 group'
                >
                  {technologies.length > 0 && (
                    <a
                      href={technologies[0].url}
                      target='_blank'
                      rel='noreferrer'
                      className='relative flex items-center justify-center'
                    >
                      <img
                        src={technologies[0].icon}
                        alt={technologies[0].name}
                        className='w-10 h-10 lg:w-16 lg:h-16 object-contain'
                      />
                      <span
                        className='absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 transition-all rounded
                                                 bg-primary/10 p-2 text-xs group-hover:scale-100
                                                 backdrop-blur-sm whitespace-nowrap'
                      >
                        {technologies[0].name}
                      </span>
                    </a>
                  )}
                </div>

                <div className='absolute w-[240px] h-[240px] lg:w-[400px] lg:h-[400px] rounded-full border border-primary/20'>
                  {technologies.length > 0 &&
                    technologies.slice(1).map((tech, index) => {
                      const totalIcons = technologies.slice(1).length
                      const angle = (index * (2 * Math.PI)) / totalIcons
                      const radius = window.innerWidth >= 1024 ? 180 : 100
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius

                      return (
                        <div
                          key={tech.name}
                          className='absolute w-16 h-16 lg:w-24 lg:h-24
                                 bg-background/80 backdrop-blur-sm rounded-full
                                 flex items-center justify-center z-10
                                 hover:scale-110 transition-all duration-300
                                 hover:bg-primary/5'
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: 'translate(-50%, -50%)',
                            opacity: mounted ? 1 : 0,
                            transition:
                              'opacity 0.5s ease-out, transform 0.5s ease-out',
                            transitionDelay: tech.delay
                          }}
                        >
                          <a
                            href={tech.url}
                            target='_blank'
                            className='group relative w-full h-full flex items-center justify-center'
                            rel='noreferrer'
                          >
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className='w-8 h-8 lg:w-12 lg:h-12 object-contain bg-white/80 p-1 rounded-md'
                            />
                            <div
                              className='invisible group-hover:visible absolute -bottom-10
                                       bg-white/80 text-black backdrop-blur-sm rounded px-3 py-1
                                       text-xs transition-all duration-300 z-[40]
                                       whitespace-nowrap'
                            >
                              {tech.name}
                            </div>
                          </a>
                        </div>
                      )
                    })}
                </div>
                <div className='absolute w-full h-full rounded-full border border-primary/5' />
                <div className='absolute w-[180px] h-[180px] lg:w-[300px] lg:h-[300px] rounded-full border border-primary/10' />
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='mt-8 px-6 py-2 bg-primary/10 hover:bg-primary/20
                       backdrop-blur-sm rounded-full text-sm font-medium
                       transition-all duration-300 order-2 lg:order-3 cursor-pointer'
            >
              {$lang === 'es' ? 'Ver todo' : 'View all'}
            </button>
          </div>
        </div>
      </section>
      {!loading && <Modal />}
    </>
  )
}

export default InfoPageHomeComponent
