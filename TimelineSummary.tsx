// app/our-solutions/promos/tax-registration/TaxTimelineSummary.tsx

'use client'

import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'

const registrationSteps = [
  {
    title: 'Step 1: Identify your entity type',
    description: 'Determine whether you are a Resident Juridical Person, Non-Resident, or Natural Person. This will determine your specific registration deadline.'
  },
  {
    title: 'Step 2: Check your incorporation or license date',
    description: 'If incorporated before 1 March 2024, your deadline depends on the month of your license. If on or after, the deadline is within 3 months of incorporation.'
  },
  {
    title: 'Step 3: Submit your application before your deadline',
    description: 'Late registration may result in a AED 10,000 penalty unless your first tax return is filed within 7 months of your first tax period end.'
  },
  {
    title: 'Step 4: Receive TRN confirmation from the FTA',
    description: 'Once your registration is approved, your Tax Registration Number (TRN) is issued and must be used in all official filings.'
  },
]

export default function TaxTimelineSummary() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Tax Registration Timelines
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
            Registration deadlines vary depending on your entity type and license issuance. Below is a simplified process.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-10">
          {registrationSteps.map((step, index) => (
            <div key={index} className="relative pl-12">
              <div className="absolute left-0 top-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white ring-2 ring-white dark:ring-zinc-900">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-zinc-700 dark:text-zinc-300 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-orange-700 dark:text-orange-400">
            <ExclamationTriangleIcon className="h-5 w-5" />
            <span>Late registrations may result in a AED 10,000 penalty.</span>
          </div>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Waiver available if your return is filed within 7 months of your first tax period end.
          </p>
        </div>
      </div>
    </div>
  )
}
