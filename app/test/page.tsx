'use client'

import Button from '@/components/Button'
import style from './style.module.scss'
// import Header from '../sections/Header/'

const Page = () => {
  return (
    <>
      {/* <Header /> */}
      <div className={style.bg}>
        <Button as="button" variant="primary-red">
          Click me
        </Button>

        <Button as="button" variant="primary-white">
          Click me
        </Button>
      </div>
    </>
  )
}

export default Page
