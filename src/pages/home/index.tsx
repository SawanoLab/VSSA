import React from 'react'

interface Props {}

const HomeIndex: React.FC<Props> = () => {
  return <Component />
}

interface IProps {}

export const Component: React.FC<IProps> = () => {
  return (
    <p>Hello Home</p>
  )
}

export default HomeIndex
