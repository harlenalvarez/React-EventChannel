import React, { useEffect } from 'react';
import {
  channelCompleteEventName,
  EventCompletePayload,
  EventPayload,
  generateEvent
} from './channelEvent';

export const dispatchChannelEvent = (eventName: string) => {
  const simpleEvent = new EventPayload();
  simpleEvent.eventName = eventName;
  const event = generateEvent(simpleEvent);
  document.dispatchEvent(event);
}

type EventChannelProducerProps = {
  eventName: string
  onComplete?: (params?: unknown) => void
}

export const useEventProducer = ({
  eventName,
  onComplete,
}: EventChannelProducerProps, deps: React.DependencyList = []) => {
  const handleComplete = (e: Event) => {
    if (
      onComplete &&
      e instanceof CustomEvent &&
      e.detail &&
      e.detail instanceof EventCompletePayload &&
      e.detail.eventName == eventName
    ) {
      onComplete(e.detail.result);
    }
  }
  useEffect(() => {
    if (onComplete) {
      document.addEventListener(channelCompleteEventName, handleComplete);
    }
    return () => {
      if (onComplete) {
        document.removeEventListener(channelCompleteEventName, handleComplete);
      }
    }
  }, deps)

  const dispatch = (...args: any[]) => {
    const payload = new EventPayload();
    payload.eventName = eventName;
    payload.args = args;
    const event = generateEvent(payload);
    document.dispatchEvent(event);
  }

  return [dispatch]
}
