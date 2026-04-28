import React from "react"
import { cn } from "@site/src/lib/utils"

interface StepsProps {
  children: React.ReactNode
  className?: string
}

interface StepProps {
  title: string
  children: React.ReactNode
  className?: string
}

interface TipProps {
  children: React.ReactNode
  className?: string
}

interface NoteProps {
  children: React.ReactNode
  className?: string
}

const StepsContext = React.createContext<{
  currentStep: number
  totalSteps: number
}>({
  currentStep: 0,
  totalSteps: 0,
})

export function Steps({ children, className }: StepsProps) {
  const steps = React.Children.toArray(children)
  const totalSteps = steps.length

  return (
    <div className={cn("space-y-8", className)}>
      {steps.map((step, index) => (
        <StepsContext.Provider key={index} value={{ currentStep: index + 1, totalSteps }}>
          {step}
        </StepsContext.Provider>
      ))}
    </div>
  )
}

export function Step({ title, children, className }: StepProps) {
  const { currentStep, totalSteps } = React.useContext(StepsContext)

  return (
    <div className={cn("relative flex gap-4", className)}>
      {/* Step indicator */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8220ff] text-white font-semibold text-sm shadow-lg">
          {currentStep}
        </div>
        {currentStep < totalSteps && (
          <div className="mt-2 h-16 w-0.5 bg-gradient-to-b from-[#8220ff]/60 to-[#8220ff]/20" />
        )}
      </div>

      {/* Step content */}
      <div className="flex-1 pb-8">
        <h3 className="text-lg font-semibold text-foreground mb-3 text-balance">{title}</h3>
        <div className="text-muted-foreground space-y-2 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
