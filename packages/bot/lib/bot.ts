import { ChatClient, ChatMessage } from "@twurple/chat";
import { authProvider } from "./auth.ts";
import { ApiClient } from "@twurple/api";

const api = new ApiClient({ authProvider });

const chatClient = new ChatClient({
  authProvider,
  isAlwaysMod: true,
  channels: ["niller2005"],
  authIntents: ["chat", "moderator"],
});

chatClient.onMessage(
  async (channel: string, user: string, text: string, message: ChatMessage) => {
    if (text.startsWith("!hello")) {
      chatClient.say(channel, `dankiHi @${message.userInfo.displayName}!`, {
        replyTo: message,
      });
    }

    if (text.startsWith("!tesla")) {
      chatClient.say(channel, `glisumInHisNewTesla wanna take it for a spin?`, {
        replyTo: message,
      });
    }

    if (text.startsWith("!test")) {
      const banUser = await api.users.getUserByName(user);
      if (!banUser) return;
      api.asUser(837862204, async (ctx) => {
        ctx.moderation.banUser(19574996, {
          duration: 1,
          reason: "Test ban",
          user: { id: banUser?.id },
        });
      });
    }
  }
);

console.log("Bot is running!");

export { chatClient };
