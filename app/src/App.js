// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Alert, AlertTitle, Stack } from '@mui/material'
const ENDPOINT = 'http://127.0.0.1:4001'

export default function ClientComponent() {
  const [data, setData] = useState({ id: '', type: '', index: '', text: '', userId: '', durationPeriod: '', })
  const [show, setShow] = useState(true)

  useEffect(() => {
    const notification = async () => {
      const socket = io.connect(ENDPOINT)
      socket.on('connect', async () => {
        console.log(`socket ${socket.id} connected successfully to server`)

        const {
          userId
        } = await fetch(`http://localhost:4001/init?id=${socket.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        socket.on('notification', (data) => {
          const { type, text, index, id, durationPeriod } = data
          console.log(data)
          setData({
            ...data,
            type,
            index,
            text,
            id,
            durationPeriod,
            userId,
          })

          setShow(true)
          setTimeout(() => setShow(false), Number(data.durationPeriod) * 1000)
        })

        socket.on('disconnect', () => {
          console.log('Disconnected from server')
        })
      })
    }
    notification()
  }, [])

  const handleClick = async () => {
    const { id: userId, index } = data
    await fetch(`http://localhost:4001/click?userId=${userId}&index=${index}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return data.type && show ? (
    <Stack sx={{ width: '50%', margin: 'auto', marginTop: '10%' }} spacing={2}>
      <Alert severity={data.type} onClick={handleClick}>
        <AlertTitle>{data.type}</AlertTitle>
        {data.text}
      </Alert>
    </Stack>
  ) : null
}
