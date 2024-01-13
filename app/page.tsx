import Image from "next/image";
import styles from "./page.module.css";

import Gallery from "./gallery";
import { User } from "./types/user";

// constants
const USERS_GPT_PROMPT = {
  model: "gpt-3.5-turbo-1106",
  response_format: { "type": "json_object" },
  system: `
    You are an API designed to output JSON data of type { users: User[] }. User type is defined as follows:
    export type User = {
      id: number;
      name: string;
      username: string;
      email: string;
      address: Address;
      phone: string;
      website: string;
      company: Company;
    };
    
    export type Address = {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: Geo;
    };
    
    export type Company = {
      name: string;
      catchPhrase: string;
      bs: string;
    };
    
    export type Geo = {
      lat: string;
      lng: string;
    };
  `,
  message: "Give me an array of NBA users"
};

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
// https://platform.openai.com/docs/guides/text-generation/json-mode
// Same way Excalidraw uses OpenAI: https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/data/magic.ts
async function getUsers(): Promise<User[]> {
  // const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: USERS_GPT_PROMPT.model,
      messages: [
        {
          role: "system",
          content: USERS_GPT_PROMPT.system,
        },
        {
          role: "user",
          content: USERS_GPT_PROMPT.message
        },
      ],
      response_format: USERS_GPT_PROMPT.response_format,
      stream: false,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const json = await res.json()

  const { users }  = JSON.parse(json.choices[0].message.content);

  return users;
}

export default async function Home() {
  const users = await getUsers()

  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
