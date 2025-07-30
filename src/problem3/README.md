interface WalletBalance {
  currency: string
  amount: number
}
interface FormattedWalletBalance {
  currency: string
  amount: number
  formatted: string
}

interface Props extends BoxProps {}
======> No BoxProps import from that cause error
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props
  ======> children defined but  never used, it also not declare in Props
  const balances = useWalletBalances()
  const prices = usePrices()

  const getPriority = (blockchain: any): number => {
    ======> Should not use any 
    switch (blockchain) {
      case 'Osmosis':
        return 100
        ======> replace those magical number with enum
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    ======> No import useMemo
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain)
        ======> balancePriority not used, blockchain not in WalletBalance interface type
        if (lhsPriority > -99) {
          ======> no declaration for lhsPriority
          if (balance.amount <= 0) {
            return true
          }
        }
        return false
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)
        ======> blockchain not in WalletBalance interface type
        if (leftPriority > rightPriority) {
          return -1
        } else if (rightPriority > leftPriority) {
          return 1
        }
        ======> Should use return leftPriority > rightPriority? -1: 1
      })
  }, [balances, prices])
  ======> no need prices as dependency

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    ======> formattedBalances not in use
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount
    return <WalletRow className={classes.row} key={index} amount={balance.amount} usdValue={usdValue} formattedAmount={balance.formatted} />
    ======> WalletRow is not imported, classes is not declared
  })

  return <div {...rest}>{rows}</div>
}
