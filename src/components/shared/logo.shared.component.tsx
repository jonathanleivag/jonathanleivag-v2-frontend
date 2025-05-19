import type {FC} from 'react'
import type {LogoSharedComponentProps} from '../../type'

const LogoSharedComponent: FC<LogoSharedComponentProps> = ({
  className = ''
}) => {
  return (
    <a className={`w-[70px] flex flex-row justify-center items-center h-auto ${className}`} href="/">
      <img
        src='https://res.cloudinary.com/dq8fpb695/image/upload/v1662878253/jonathanleivag/logo/ohbxjqje4kelihconfov.png'
        alt='Logo of jonathanleivag.cl'
      />
    </a>
  )
}

export default LogoSharedComponent
