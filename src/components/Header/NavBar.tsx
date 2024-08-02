"use client"
import React from 'react'
import Logo from './Logo'
import { OrganizationSwitcher, UserButton, UserProfile, useAuth } from '@clerk/nextjs'

function NavBar() {
  const {orgId} = useAuth()
  console.log(orgId)
  return (
    <div className="w-full px-32 py-4 font-medium flex items-center justify-between text-xl shadow-sm">
      <Logo />
      <OrganizationSwitcher afterCreateOrganizationUrl={'/dashboard'} afterLeaveOrganizationUrl={'/dashboard'}/>
      <UserButton showName />
    </div>
  )
}

export default NavBar
 