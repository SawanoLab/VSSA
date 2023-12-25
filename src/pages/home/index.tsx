import React from 'react'

interface Props {}

const HomeIndex: React.FC<Props> = () => {
  return <Component />
}

interface IProps {}

export const Component: React.FC<IProps> = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default HomeIndex
