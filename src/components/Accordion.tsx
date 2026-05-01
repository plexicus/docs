import React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@site/src/lib/utils';

interface AccordionProps {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export function Accordion({
  title,
  description,
  defaultOpen = false,
  icon,
  children,
  className,
}: AccordionProps) {
  return (
    <details
      className={cn(
        'group rounded-xl border border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-background-surface-color)] my-2 overflow-hidden transition-colors',
        'open:border-[#8220ff]/40',
        className,
      )}
      open={defaultOpen}
    >
      <summary className="flex items-center gap-3 px-5 py-3.5 cursor-pointer list-none select-none hover:bg-[var(--ifm-color-emphasis-100)] [&::-webkit-details-marker]:hidden">
        {icon ? (
          <Icon
            icon={icon}
            width={18}
            height={18}
            className="shrink-0 text-[#8220ff]"
            aria-hidden
          />
        ) : null}
        <div className="flex-1 min-w-0">
          <span className="block text-sm font-semibold text-[var(--ifm-heading-color)] leading-tight">
            {title}
          </span>
          {description ? (
            <span className="block text-xs text-[var(--ifm-color-emphasis-700)] mt-0.5 leading-snug">
              {description}
            </span>
          ) : null}
        </div>
        <span
          className="shrink-0 text-[var(--ifm-color-emphasis-600)] transition-transform duration-150 group-open:rotate-90"
          aria-hidden
        >
          ›
        </span>
      </summary>
      <div className="px-5 pb-4 pt-1 text-sm text-[var(--ifm-color-emphasis-800)] leading-relaxed [&>p:first-child]:!mt-0 [&>p:last-child]:!mb-0">
        {children}
      </div>
    </details>
  );
}

export default Accordion;
