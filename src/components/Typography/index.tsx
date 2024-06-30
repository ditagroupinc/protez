import React from 'react'
import style from './style.module.scss'

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className={style.h2}>{children}</h2>
)

export const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className={style.h3}>{children}</h3>
)

export const Body = ({ children, large }: { children: React.ReactNode; large: boolean }) => (
  <p className={`${style.body} ${large ? style.large : ''}`}>{children}</p>
)
