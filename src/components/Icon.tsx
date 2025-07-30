import React from 'react'
import SVG from 'react-inlinesvg'

const icons = import.meta.glob('../assets/*.svg', { eager: true, as: 'url' })

type IconProps = {
  name: string
  width?: string | number
  height?: string | number
  [key: string]: unknown
}

export const Icon: React.FC<IconProps> = ({ name, width = '20px', height = '20px', ...rest }) => {
  const srcSVG = icons[`../assets/${name}.svg`] as string
  if (!srcSVG) {
    return <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor:"red" }} />
  }
  return <SVG src={srcSVG} width={width} height={height} {...rest} />
}
