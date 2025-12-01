'use client';

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { NavLinkModel } from '@/models';

function NavLink({href , activeClassName , disActiveClassName , children} :NavLinkModel) {
  const pathName = usePathname()
  return (
    <Link href={href} className={pathName.startsWith(href) ? activeClassName : disActiveClassName}>
      {children}
    </Link>
  )
}

export default NavLink
