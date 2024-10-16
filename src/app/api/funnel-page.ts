// pages/api/funnel-page.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { v4 } from 'uuid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { funnelId, values, defaultData, order, userId } = req.body

    try {
      const response = await db.funnelPage.upsert({
        where: { id: defaultData?.id || v4() },
        update: {
          name: values.name,
          pathName: values.pathName,
          order: defaultData?.order || order,
          visits: defaultData?.visits || 0,
          content: defaultData?.content || '',
          funnelId,
          userId,
        },
        create: {
          name: values.name,
          pathName: values.pathName,
          order,
          visits: 0,
          content: '',
          funnelId,
          userId,
        },
      })
      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
