'use client'

import type { ReactNode } from 'react'
import type { HTMLMotionProps, Variants } from 'motion/react'
import { motion, useReducedMotion } from 'motion/react'

const easeOut = [0.22, 1, 0.36, 1] as const

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

type StaggerContainerProps = Omit<HTMLMotionProps<'div'>, 'children' | 'initial' | 'variants' | 'whileInView'> & {
  children: ReactNode
  delayChildren?: number
  staggerChildren?: number
}

export function StaggerContainer({
  children,
  delayChildren = 0,
  staggerChildren = 0.08,
  transition,
  viewport,
  className,
  ...props
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren,
            ...transition,
          },
        },
      }}
      viewport={{ once: true, amount: 0.15, ...viewport }}
      whileInView="visible"
      {...props}
    >
      {children}
    </motion.div>
  )
}

type MotionCardProps = Omit<HTMLMotionProps<'div'>, 'children' | 'variants'> & {
  children: ReactNode
}

export function MotionCard({ children, transition, className, ...props }: MotionCardProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={cardVariants}
      transition={{ duration: 0.4, ease: easeOut, ...transition }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
