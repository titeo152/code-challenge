import React from 'react'
import { MenuItem, TextField } from '@mui/material'
import { Icon } from './Icon'

interface SelectPropsType {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  prices: { currency: string }[]
  label: string
}

const CustomSelect = (props: SelectPropsType) => {
  const { value, onChange, prices, label } = props
  return (
    <TextField sx={{ display: 'flex', alignItems: 'center', gap: '5px' }} select label={label} fullWidth value={value} onChange={onChange}>
      {Array.from(new Set(prices.map((p) => p.currency))).map((token) => (
        <MenuItem value={token} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Icon name={token} />
          <span style={{ marginLeft: '5px' }}>{token}</span>
        </MenuItem>
      ))}
    </TextField>
  )
}

export default CustomSelect
