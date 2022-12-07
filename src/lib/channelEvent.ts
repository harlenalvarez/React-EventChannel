export const channelEventName = crypto.randomUUID()
export const channelCompleteEventName = crypto.randomUUID()

export class EventPayload {
  eventName = ''
  args?: any
}

export class EventCompletePayload {
  eventName = ''
  result?: any
}

export const generateEvent = (detail: EventPayload) => {
  const channelEvent = new CustomEvent<EventPayload>(channelEventName, {
    detail,
    bubbles: true,
    cancelable: false,
    composed: false,
  })

  return channelEvent
}

export const generateCompleteEvent = (detail: EventCompletePayload) => {
  const channelEvent = new CustomEvent<EventCompletePayload>(channelCompleteEventName, {
    detail,
    bubbles: true,
    cancelable: false,
    composed: false,
  })

  return channelEvent
}
