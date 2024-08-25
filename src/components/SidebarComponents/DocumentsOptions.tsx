import { Link, MoreVerticalIcon, Trash2,FilePen, Copy } from 'lucide-react'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function DocumentsOptions() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVerticalIcon className='h-4 w-4'/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        <DropdownMenuItem className='flex gap-2'> <FilePen className='h-4 w-4'/>Rename</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-2'> <Link className='h-4 w-4'/>Share</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-2'> <Copy className='h-4 w-4'/>Duplicate</DropdownMenuItem>
          <DropdownMenuItem className='flex gap-2 text-red-500'> <Trash2 className='h-4 w-4'/>Delete</DropdownMenuItem>
        </DropdownMenuContent>
        
      </DropdownMenu>
    </div>
  )
}

export default DocumentsOptions

