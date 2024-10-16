'use client'
import {
  AuthUserWithAgencySigebarOptionsSubAccounts,
  UserWithPermissionsAndSubAccounts,
} from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { SubAccount, User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import {
  changeUserPermissions,
  getAuthUserDetails,
  getUserPermissions,
  // saveActivityLogsNotification,
  updateUser,
} from '@/lib/queries'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

import { db } from '@/lib/db';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import FileUpload from '../global/file-upload'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Button } from '../ui/button'
import Loading from '../global/loading'
import { Separator } from '../ui/separator'
import { Switch } from '../ui/switch'
import { v4 } from 'uuid'

export default async function UserSettingPage({ params }: { params: { userId: string } }) {
  // Check if the userId is provided
  if (!params.userId) {
    return <div>User ID is missing</div>;
  }

  // Fetch the user based on the userId from params
  const targetUser = await db.user.findUnique({
    where: { id: '95e18b04-a4df-4a69-ae8b-aeba1c552243' },
    include: {
      Funnels: true,
      Media: true,
      Contact: true,
      Trigger: true,
      Automation: true,
      Pipeline: {
        include: {
          Lane: true,  // Assuming you also want to include the related lanes of pipelines
        },
      },
    },
  });

  // If user is not found, handle the error
  if (!targetUser) {
    return <div>User not found</div>;
  }

  // Render the User Settings Page with the user data and related entities
  return (
    <div>
      <h1>{targetUser.name}'s Settings</h1>
      <p>Email: {targetUser.email}</p>
      <p>City: {targetUser.city}</p>
      <p>Country: {targetUser.country}</p>
      <p>Avatar URL: <img src={targetUser.avatarUrl} alt={`${targetUser.name}'s avatar`} /></p>

      {/* Display associated Funnels */}
      <div>
        <h2>Funnels</h2>
        {targetUser.Funnels.length ? (
          targetUser.Funnels.map((funnel) => (
            <div key={funnel.id}>
              <h3>{funnel.name}</h3>
              <p>Subdomain: {funnel.subDomainName || 'No subdomain'}</p>
              <p>Description: {funnel.description || 'No description'}</p>
            </div>
          ))
        ) : (
          <p>No funnels available.</p>
        )}
      </div>

      {/* Display associated Pipelines */}
      <div>
        <h2>Pipelines</h2>
        {targetUser.Pipeline.length ? (
          targetUser.Pipeline.map((pipeline) => (
            <div key={pipeline.id}>
              <h3>{pipeline.name}</h3>
              <p>Created At: {new Date(pipeline.createdAt).toDateString()}</p>
              {/* Display associated Lanes */}
              <div>
                <h4>Lanes</h4>
                {pipeline.Lane.length ? (
                  pipeline.Lane.map((lane) => (
                    <div key={lane.id}>
                      <p>Lane Name: {lane.name}</p>
                      <p>Order: {lane.order}</p>
                    </div>
                  ))
                ) : (
                  <p>No lanes available.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No pipelines available.</p>
        )}
      </div>

      {/* Display associated Contacts */}
      <div>
        <h2>Contacts</h2>
        {targetUser.Contact.length ? (
          targetUser.Contact.map((contact) => (
            <div key={contact.id}>
              <h3>{contact.name}</h3>
              <p>Email: {contact.email}</p>
            </div>
          ))
        ) : (
          <p>No contacts available.</p>
        )}
      </div>

      {/* Display associated Media */}
      <div>
        <h2>Media</h2>
        {targetUser.Media.length ? (
          targetUser.Media.map((media) => (
            <div key={media.id}>
              <h3>{media.name}</h3>
              <p>Link: <a href={media.link}>{media.link}</a></p>
            </div>
          ))
        ) : (
          <p>No media available.</p>
        )}
      </div>

      {/* Display associated Triggers */}
      <div>
        <h2>Triggers</h2>
        {targetUser.Trigger.length ? (
          targetUser.Trigger.map((trigger) => (
            <div key={trigger.id}>
              <h3>{trigger.name}</h3>
              <p>Type: {trigger.type}</p>
            </div>
          ))
        ) : (
          <p>No triggers available.</p>
        )}
      </div>

      {/* Display associated Automations */}
      <div>
        <h2>Automations</h2>
        {targetUser.Automation.length ? (
          targetUser.Automation.map((automation) => (
            <div key={automation.id}>
              <h3>{automation.name}</h3>
              <p>Published: {automation.published ? 'Yes' : 'No'}</p>
            </div>
          ))
        ) : (
          <p>No automations available.</p>
        )}
      </div>
    </div>
  );
}
