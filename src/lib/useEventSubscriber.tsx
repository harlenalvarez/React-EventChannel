import { useEffect } from 'react'
import {
  channelEventName,
  EventCompletePayload,
  EventPayload,
  generateCompleteEvent,
} from './channelEvent'

type ChannelProps = {
  [key: string]: (e: CustomEvent, params: any[]) => Promise<any> | any
}
export const useEventSubscriber = (triggers: ChannelProps) => {
  const executeTrigger = (e: Event) => {
    if (
      !e.defaultPrevented &&
      e instanceof CustomEvent &&
      e.detail instanceof EventPayload &&
      triggers[e.detail.eventName]
    ) {
      const asyncProcess = async () => { 
        const result = await triggers[e.detail.eventName](e, e.detail.args)
        const payload = new EventCompletePayload()
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
