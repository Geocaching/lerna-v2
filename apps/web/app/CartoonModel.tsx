'use client'
import React, { useMemo } from 'react'
import GlbModel from '@geocaching/glb-model'
import CartoonMaterial from './CartoonShaderMaterial'

const CartoonModel = ({ url, ...rest }: { url: string } & Omit<React.ComponentProps<typeof GlbModel>, 'url' | 'material'>) => {
  const material = useMemo(() => new CartoonMaterial(), [])
  return <GlbModel url={url} material={material} {...rest} />
}

export default CartoonModel
