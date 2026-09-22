import React from 'react'

export const SkeletonShimmer: React.FC<{ className?: string }> = ({
  className = 'h-32 w-full',
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-slate-200/80 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  )
}

export const RoomSkeletonList: React.FC = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="shadow-soft rounded-2xl border border-[#214956]/10 bg-white p-4">
          <SkeletonShimmer className="mb-3 h-44 w-full" />
          <SkeletonShimmer className="mb-2 h-5 w-3/4" />
          <SkeletonShimmer className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}
