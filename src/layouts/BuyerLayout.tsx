import { Outlet } from 'react-router-dom'
import { BuyerFooter, BuyerNav } from '../components/BuyerChrome'

export function BuyerLayout() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <BuyerNav />
      <Outlet />
      <BuyerFooter />
    </div>
  )
}
