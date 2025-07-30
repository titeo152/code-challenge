import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography, Grid, Container } from '@mui/material'
import type { Currency } from './index.types'
import './style.css'
import CustomSelect from '../components/CustomSelect'

export const Problem2 = () => {
  const [prices, setPrices] = useState<Currency[]>([])
  const [amount, setAmount] = useState(0)
  const [fromToken, setFromToken] = useState('')
  const [toToken, setToToken] = useState('')
  const [result, setResult] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCurrencyData() {
      fetch('https://interview.switcheo.com/prices.json')
        .then((response) => response.json())
        .then((data) => {
          setPrices(data)
        })
        .catch((error) => console.error('Error fetching currency data:', error))
    }
    fetchCurrencyData()
  }, [])

  const getLatestPrice = (currency: string): number | null => {
    const filtered = prices.filter((p) => p.currency === currency)
    return filtered.length > 0 ? filtered[0].price : null
  }

  const handleSwap = () => {
    const fromPrice = getLatestPrice(fromToken)
    const toPrice = getLatestPrice(toToken)

    if (fromPrice == null || toPrice == null) {
      alert('Invalid token selection.')
      return
    }

    const usdValue = amount * fromPrice
    const converted = usdValue / toPrice
    setResult(converted)
  }
  return (
    <Container>
      <Box sx={{ maxWidth: 1000, margin: 'auto', mt: 4 }}>
        <Typography variant='h5' gutterBottom>
          Token Swap
        </Typography>
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField type='number' label='Amount' fullWidth value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </Grid>
          <Grid size={4}>
            <CustomSelect
              label='From'
              value={fromToken}
              prices={prices}
              onChange={(e) => {
                setFromToken(e.target.value)
                if (toToken.length > 0) {
                  handleSwap()
                }
              }}
            />
          </Grid>
          <Grid size={4}>
            <CustomSelect label='To' value={toToken} prices={prices} onChange={(e) => setToToken(e.target.value)} />
          </Grid>
          <Grid sx={{ margin: 'auto' }} size={4}>
            <Button variant='contained' fullWidth onClick={handleSwap} disabled={amount <= 0 || fromToken.length === 0 || toToken.length === 0}>
              Swap
            </Button>
          </Grid>
          {result !== null && (
            <Grid size={12}>
              <Typography textAlign='center' variant='h6'>
                {amount} {fromToken} ≈ {result.toFixed(6)} {toToken}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  )
}

export default Problem2
