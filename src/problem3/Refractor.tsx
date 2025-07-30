import React, { useMemo } from 'react'

// Define blockchain types
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo'

// Define priority constants for better maintainability
const BlockchainPriority = {
  OSMOSIS: 100,
  ETHEREUM: 50,
  ARBITRUM: 30,
  ZILLIQA: 20,
  NEO: 20,
  DEFAULT: -99
} as const

interface WalletBalance {
  currency: string
  amount: number
  blockchain: Blockchain
}

interface FormattedWalletBalance {
  currency: string
  amount: number
  formatted: string
  blockchain: Blockchain
}

interface WalletRowProps {
  amount: number
  usdValue: number
  formattedAmount: string
  className?: string
}

// Mock components and hooks (in real app, these would be imported)
const WalletRow: React.FC<WalletRowProps> = ({ amount, usdValue, formattedAmount, className }) => (
  <div className={className}>
    <span>Amount: {formattedAmount} ({amount})</span>
    <span>USD Value: ${usdValue.toFixed(2)}</span>
  </div>
)

const useWalletBalances = (): WalletBalance[] => {
  // Mock implementation - in real app this would fetch from API
  return [
    { currency: 'USD', amount: 100, blockchain: 'Ethereum' },
    { currency: 'ETH', amount: 2.5, blockchain: 'Ethereum' },
    { currency: 'OSMO', amount: 50, blockchain: 'Osmosis' },
    { currency: 'ARB', amount: 10, blockchain: 'Arbitrum' }
  ]
}

const usePrices = (): Record<string, number> => {
  // Mock implementation - in real app this would fetch from API
  return {
    USD: 1,
    ETH: 2000,
    OSMO: 2,
    ARB: 1.5
  }
}

interface Props {
  className?: string
}

export const WalletPage: React.FC<Props> = ({ className }) => {
  const balances = useWalletBalances()
  const prices = usePrices()

  const getPriority = (blockchain: Blockchain): number => {
    switch (blockchain) {
      case 'Osmosis':
        return BlockchainPriority.OSMOSIS
      case 'Ethereum':
        return BlockchainPriority.ETHEREUM
      case 'Arbitrum':
        return BlockchainPriority.ARBITRUM
      case 'Zilliqa':
        return BlockchainPriority.ZILLIQA
      case 'Neo':
        return BlockchainPriority.NEO
      default:
        return BlockchainPriority.DEFAULT
    }
  }

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain)
        // Only include balances with positive amounts and valid priorities
        return balancePriority > BlockchainPriority.DEFAULT && balance.amount > 0
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)
        return leftPriority > rightPriority ? -1 : 1
      })
  }, [balances])

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map((balance: WalletBalance) => ({
    ...balance,
    formatted: balance.amount.toFixed(2),
  }))

  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = (prices[balance.currency] || 0) * balance.amount
    return (
      <WalletRow 
        key={`${balance.currency}-${index}`}
        amount={balance.amount} 
        usdValue={usdValue} 
        formattedAmount={balance.formatted}
        className={className}
      />
    )
  })

  return <div className={className}>{rows}</div>
}
