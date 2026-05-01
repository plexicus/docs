import React from 'react';
import { cn } from '@site/src/lib/utils';

interface CardGroupProps {
  cols?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

const colsMap: Record<NonNullable<CardGroupProps['cols']>, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export function CardGroup({ cols = 2, children, className }: CardGroupProps) {
  return (
    <div className={cn('not-prose grid gap-3 my-6', colsMap[cols], className)}>
      {children}
    </div>
  );
}

export default CardGroup;
