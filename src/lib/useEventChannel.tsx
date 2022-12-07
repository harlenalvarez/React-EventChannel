import { useEffect } from 'react'
import {
  channelEventName,
  EventCompletePayload,
  EventPayload,
  generateCompleteEvent,
} from './channelEvent'

type ChannelProps = {
  [key: string]: (params?: any[]) => Promise<any> | any
}
export const useEventChannel = (triggers: ChannelProps) => {
  const executeTrigger = (e: Event) => {
    if (
      e instanceof CustomEvent &&
      e.detail instanceof EventPayload &&
      triggers[e.detail.eventName]
    ) {
      const asyncProcess = async () => {
        const result = await triggers[e.detail.eventName](e.detail.args)
        const payload: EventCompletePayload = new EventCompletePayload()
        payload.eventName = e.detail.eventName
        if (result) {
          payload.result = result
        }
        const completeEvent = generateCompleteEvent(payload)
        document.dispatchEvent(completeEvent)
      }
      asyncProcess()
    }
  }

  useEffect(() => {
    document.addEventListener(channelEventName, executeTrigger)
    return () => {
      document.removeEventListener(channelEventName, executeTrigger)
    }
  }, [])
}
