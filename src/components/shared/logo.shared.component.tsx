import type {FC} from 'react'
import type {LogoSharedComponentProps} from '../../type'

const LogoSharedComponent: FC<LogoSharedComponentProps> = ({
  className = ''
}) => {
  return (
    <a href="/">
      <img
        src='https://res.cloudinary.com/dq8fpb695/image/upload/v1662878253/jonathanleivag/logo/ohbxjqje4kelihconfov.png'
        className={`w-[70px] h-auto ${className}`}
        alt='Logo of jonathanleivag.cl'
      />
    </a>
  )
}

export default LogoSharedComponent
