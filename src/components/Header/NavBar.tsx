"use client"
import React from 'react'
import Logo from './Logo'
import { OrganizationSwitcher, UserButton, UserProfile, useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '../ui/button'
import axios from "axios"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function NavBar() {
  // const {orgId} = useAuth()
  // console.log(orgId)
  const router = useRouter();

  const deleteAccount = async() => {

    try {
      const response = await axios.get("/api/user/delete-user");
      console.log(response);

      if(response.data.success){
        toast("User got successfully deleted")
        router.replace("/sign-in");
      } else {
        toast("Issues in deleting the user.")
      }

    } catch (error: any) {
      console.log("Error in deleting the account : ", error)
    }
  }
  return (
    <div className="w-full px-32 py-4 font-medium flex items-center justify-between text-xl shadow-sm">
      <Link href="/dashboard">
        <Logo />
      </Link>
      <OrganizationSwitcher afterCreateOrganizationUrl={'/dashboard'} afterLeaveOrganizationUrl={'/dashboard'} afterSelectOrganizationUrl={'/dashboard'} afterSelectPersonalUrl={"/dashboard"}/>
      <Button onClick={deleteAccount} className='text-red-600 bg-slate-300'>Delete Account</Button>
      <UserButton showName />
    </div>
  )
}

export default NavBar
 