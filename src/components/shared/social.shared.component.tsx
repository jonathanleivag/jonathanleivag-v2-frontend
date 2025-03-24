import type { FC } from 'react'
import { useDataFetch } from '../../hooks/useDataFetch.hook'
import type { ResSocial } from '../../type'

const SocialSharedComponent: FC = () => {
  const [data, loading] = useDataFetch<ResSocial>('social', false)
  console.log('🚀 ~ data:', data)
  return (
    <div className='absolute inset-x-0 bottom-0 p-4 flex items-center justify-center gap-6 bg-gradient-to-t from-background/80 to-transparent z-40'>
      {!loading && (
        <>
          {data.socials.map((social, index) => (
            <a
              key={`${social.name}-${index}`}
              href={social.name === 'mail' ? `mailto:${social.url}` : social.url}
              target={social.name !== 'mail' ? '_blank' : undefined}
              rel={social.name !== 'mail' ? 'noopener noreferrer' : undefined}
              className='text-primary transition-colors duration-300'
            >
              <img
                src={`/icon/${social.icon}.svg`}
                alt={`Icono de ${social.name}`}
                className='w-6 h-6 [filter:brightness(0)_invert(0.7)] hover:[filter:brightness(0)_invert(1)] transition-all duration-300'
              />
            </a>
          ))}
        </>
      )}
    </div>
  )
}

export default SocialSharedComponent
