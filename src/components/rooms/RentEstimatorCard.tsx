import React, { useState } from 'react'
import { Calculator, Utensils, Zap, Sparkles, Check } from 'lucide-react'

interface RentEstimatorCardProps {
  baseRent: number
}

export const RentEstimatorCard: React.FC<RentEstimatorCardProps> = ({ baseRent }) => {
  const [mealTier, setMealTier] = useState<'standard' | 'gourmet'>('standard')
  const [acMetered, setAcMetered] = useState<boolean>(true)
  const [laundryService, setLaundryService] = useState<boolean>(false)

  const mealAddon = mealTier === 'gourmet' ? 2500 : 0
  const acAddon = acMetered ? 1500 : 0
  const laundryAddon = laundryService ? 800 : 0

  const totalMonthlyCost = baseRent + mealAddon + acAddon + laundryAddon

  return (
    <div className="shadow-soft mb-6 rounded-2xl border border-[#214956]/15 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#214956]/10 text-[#214956]">
            <Calculator className="h-4 w-4 text-[#F35600]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1A202C]">Smart Rent & Addon Estimator</h3>
            <p className="text-xs text-[#64748B]">Customize your monthly all-inclusive package</p>
          </div>
        </div>
      </div>

      <div className="mb-5 space-y-3.5">
        {/* Base Rent (Fixed) */}
        <div className="flex items-center justify-between rounded-xl border border-[#214956]/10 bg-[#FAF6F0] p-3">
          <div>
            <span className="block text-xs font-bold text-[#1A202C]">Base Accommodation Rent</span>
            <span className="text-[11px] text-[#64748B]">Includes room & 300 Mbps Wi-Fi</span>
          </div>
          <span className="font-mono text-xs font-bold text-[#214956]">
            ₹{baseRent.toLocaleString('en-IN')}/mo
          </span>
        </div>

        {/* Meal Tier Selection */}
        <div className="rounded-xl border border-[#214956]/10 bg-[#FAF6F0] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#1A202C]">
              <Utensils className="h-3.5 w-3.5 text-[#124000]" /> Meal Subscription Tier
            </span>
            <span className="font-mono text-xs font-bold text-[#124000]">
              {mealTier === 'standard' ? 'Included' : '+₹2,500/mo'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMealTier('standard')}
              className={`rounded-lg border px-2.5 py-2 text-[11px] font-bold transition-all ${
                mealTier === 'standard'
                  ? 'border-[#214956] bg-[#214956] text-white'
                  : 'border-[#214956]/10 bg-white text-[#64748B]'
              }`}
            >
              Standard (2 Meals/day)
            </button>
            <button
              onClick={() => setMealTier('gourmet')}
              className={`rounded-lg border px-2.5 py-2 text-[11px] font-bold transition-all ${
                mealTier === 'gourmet'
                  ? 'border-[#214956] bg-[#214956] text-white'
                  : 'border-[#214956]/10 bg-white text-[#64748B]'
              }`}
            >
              Gourmet (3 Meals + Snacks)
            </button>
          </div>
        </div>

        {/* AC Power Package */}
        <div
          onClick={() => setAcMetered(!acMetered)}
          className="flex cursor-pointer items-center justify-between rounded-xl border border-[#214956]/10 bg-[#FAF6F0] p-3 transition-colors hover:bg-[#214956]/5"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            <div>
              <span className="block text-xs font-bold text-[#1A202C]">
                Unlimited AC Metered Pass
              </span>
              <span className="text-[11px] text-[#64748B]">Fixed cap for heavy summer cooling</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#214956]">+₹1,500</span>
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                acMetered
                  ? 'border-[#124000] bg-[#124000] text-white'
                  : 'border-[#64748B]/30 bg-white'
              }`}
            >
              {acMetered && <Check className="h-3.5 w-3.5" />}
            </div>
          </div>
        </div>

        {/* Laundry & Ironing Service */}
        <div
          onClick={() => setLaundryService(!laundryService)}
          className="flex cursor-pointer items-center justify-between rounded-xl border border-[#214956]/10 bg-[#FAF6F0] p-3 transition-colors hover:bg-[#214956]/5"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <div>
              <span className="block text-xs font-bold text-[#1A202C]">
                Doorstep Laundry & Ironing
              </span>
              <span className="text-[11px] text-[#64748B]">20 garments per month</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#214956]">+₹800</span>
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                laundryService
                  ? 'border-[#124000] bg-[#124000] text-white'
                  : 'border-[#64748B]/30 bg-white'
              }`}
            >
              {laundryService && <Check className="h-3.5 w-3.5" />}
            </div>
          </div>
        </div>
      </div>

      {/* Calculated Total Live Summary */}
      <div className="shadow-soft flex items-center justify-between rounded-xl bg-[#214956] p-4 text-white">
        <div>
          <span className="block text-[11px] text-[#FAF6F0]/80">All-Inclusive Total Rent</span>
          <span className="text-xs font-semibold text-[#F87A50]">Includes Taxes & Maintenance</span>
        </div>
        <div className="text-right">
          <span className="font-mono text-xl font-black">
            ₹{totalMonthlyCost.toLocaleString('en-IN')}
          </span>
          <span className="block text-xs text-white/80"> / month</span>
        </div>
      </div>
    </div>
  )
}
