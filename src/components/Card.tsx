import React from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { cn } from '@site/src/lib/utils';

interface CardProps {
  title: string;
  icon?: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  horizontal?: boolean;
}

export function Card({ title, icon, href, children, className, horizontal }: CardProps) {
  const isExternal = href?.startsWith('http');

  const inner = (
    <div
      className={cn(
        'group relative h-full rounded-xl border border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-card-background-color,var(--ifm-background-surface-color))] p-5 transition-all duration-150',
        href &&
          'hover:border-[#8220ff] hover:shadow-[0_0_0_1px_#8220ff,0_8px_24px_-12px_rgba(130,32,255,0.4)] hover:-translate-y-0.5 cursor-pointer',
        horizontal && 'flex items-start gap-4',
        className,
      )}
    >
      {icon ? (
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg bg-[#8220ff]/10 text-[#8220ff] shrink-0',
            horizontal ? 'mt-0.5' : 'mb-3',
          )}
          aria-hidden
        >
          <Icon icon={icon} width={20} height={20} />
        </div>
      ) : null}
      <div className="flex-1 min-w-0">
        <h3 className="!m-0 !mb-1 text-base font-semibold text-[var(--ifm-heading-color)] leading-tight">
          {title}
          {href ? (
            <span
              className="ml-1 inline-block translate-x-0 opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100 text-[#8220ff]"
              aria-hidden
            >
              {isExternal ? '↗' : '→'}
            </span>
          ) : null}
        </h3>
        {children ? (
          <div className="text-sm text-[var(--ifm-color-emphasis-700)] leading-relaxed [&>p]:!m-0 [&>p+p]:!mt-2">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );

  if (!href) return inner;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="!no-underline !text-inherit block h-full">
        {inner}
      </a>
    );
  }

  return (
    <Link to={href} className="!no-underline !text-inherit block h-full">
      {inner}
    </Link>
  );
}

export default Card;
