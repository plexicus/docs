import React from 'react';
import { cn } from '@site/src/lib/utils';

interface AccordionGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionGroup({ children, className }: AccordionGroupProps) {
  return (
    <div className={cn('not-prose flex flex-col gap-2 my-6', className)}>
      {children}
    </div>
  );
}

export default AccordionGroup;
