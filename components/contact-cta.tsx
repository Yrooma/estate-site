import { ContactCTAActions } from './contact-cta-actions'

interface ContactCTAProps {
  compact?: boolean
}

export function ContactCTA({ compact = false }: ContactCTAProps) {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:space-x-reverse w-full">
      <ContactCTAActions compact={compact} />
    </div>
  )
}

