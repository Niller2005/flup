import { RefreshingAuthProvider } from "@twurple/auth";
import { db } from "$db/turso";
import { users } from "$db/schema";

const tokenData = async (userId: number | string) => {
  const data = Bun.file(`tokens/tokens.${userId}.json`);
  return await data.json();
};

const authProvider = new RefreshingAuthProvider({
  clientId: process.env.TWITCH_CLIENT_ID || "",
  clientSecret: process.env.TWITCH_CLIENT_SECRET || "",
  appImpliedScopes: [
    "chat:edit",
    "chat:read",
    "moderation:read",
    "moderator:manage:banned_users",
  ],
});

authProvider.onRefresh(
  async (userId, newTokenData) =>
    await Bun.write(
      `tokens/tokens.${userId}.json`,
      JSON.stringify(newTokenData)
    )
);

const results = await db.select().from(users).all();

console.log(results);

await authProvider.addUserForToken(
  await tokenData(process.env.TWITCH_BROADCASTER_ID!)
);

await authProvider.addUserForToken(
  await tokenData(process.env.TWITCH_BOT_ID!),
  ["chat", `botFor:${process.env.TWITCH_BROADCASTER_ID}`]
);

export { authProvider };
