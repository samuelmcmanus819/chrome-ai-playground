declare namespace ai {
  interface Summarizer {
      summarize: (text: string) => Promise<string>;
  }

  interface SummarizerOptions {
      type: string;
      tone?: string;
      length?: string;
      sharedContext?: string;
      format?: string;
  }

  const summarizer: {
      create: (options: SummarizerOptions) => Promise<Summarizer>;
  };
}

declare namespace chrome {
    namespace runtime {
        interface MessageSender {
            tab?: {
                id: number;
                windowId: number;
            };
            frameId?: number;
            id?: string;
            url?: string;
            tlsChannelId?: string;
        }

        type SendResponse = (response: any) => void;

        interface OnMessageListener {
            (
                request: { action: string; text: string, type: string }, // Request object structure
                sender: MessageSender,
                sendResponse: SendResponse
            ): boolean | void;
        }

        interface OnMessageEvent {
            addListener(listener: OnMessageListener): void;
            removeListener(listener: OnMessageListener): void;
            hasListener(listener: OnMessageListener): boolean;
        }

        const onMessage: OnMessageEvent;

        interface SendMessageOptions {
            includeTlsChannelId?: boolean;
        }

        interface MessageResponseCallback {
            (response: any): void;
        }

        /**
         * Sends a message to another part of the extension.
         * @param extensionId Optional. The ID of the extension to send the message to.
         * @param message The message to send.
         * @param options Optional. Options for sending the message.
         * @param responseCallback Optional. Function to call when a response is sent back.
         */
        function sendMessage(
            message: any,
            responseCallback?: MessageResponseCallback
        ): void;
        function sendMessage(
            extensionId: string,
            message: any,
            responseCallback?: MessageResponseCallback
        ): void;
        function sendMessage(
            extensionId: string,
            message: any,
            options: SendMessageOptions,
            responseCallback?: MessageResponseCallback
        ): void;

        interface OnInstalledDetails {
            reason: 'install' | 'update' | 'chrome_update' | 'shared_module_update';
            previousVersion?: string;
            id?: string;
        }

        interface OnInstalledListener {
            (details: OnInstalledDetails): void;
        }

        interface OnInstalledEvent {
            addListener(listener: OnInstalledListener): void;
            removeListener(listener: OnInstalledListener): void;
            hasListener(listener: OnInstalledListener): boolean;
        }

        const onInstalled: OnInstalledEvent;

        /**
         * Represents an error that occurred during a runtime API call.
         */
        const lastError: {
            message?: string; // Error message, if an error occurred
        };
    }
}
