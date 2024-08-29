"use client";
import React, { ReactNode, useEffect } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { useInboxNotifications, useUpdateRoomNotificationSettings } from "@liveblocks/react/suspense";
import {
  InboxNotification,
  InboxNotificationList,
} from "@liveblocks/react-ui";
import { useUnreadInboxNotificationsCount } from '@liveblocks/react';
  

function NotificationBox({children} : {children : ReactNode}) {
    const { inboxNotifications } = useInboxNotifications();
    const updateRoomNotificationUpdation = useUpdateRoomNotificationSettings();
    const {count, error} = useUnreadInboxNotificationsCount();
    useEffect(() => {
      updateRoomNotificationUpdation({threads : "all"})
    }, [count])
  return (
    <div>
    <Popover>
        <PopoverTrigger>
          <div className='flex gap-1'>
            {children} 
            <span className='p-1 rounded-full bg-primary text-white text-[3xl]'>{count}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-[500px]'>
            <InboxNotificationList>
            {inboxNotifications.map((inboxNotification) => (
                <InboxNotification
                key={inboxNotification.id}
                inboxNotification={inboxNotification}
            />
            ))}
            </InboxNotificationList>
        </PopoverContent>
    </Popover>

    </div>
  )
}

export default NotificationBox
