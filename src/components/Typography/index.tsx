import React from 'react'
import style from './style.module.scss'

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`${style.h2} ${className ? className : ''}`}>{children}</h2>
)

export const H3 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`${style.h3} ${className ? className : ''}`}>{children}</h3>
)

export const Body = ({
  children,
  className,
  large,
}: {
  children: React.ReactNode
  className?: string
  large?: boolean
}) => (
  <p className={`${style.body} ${large ? style.large : ''} ${className ? className : ''}`}>
    {children}
  </p>
)
