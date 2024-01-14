import { backEndUrl } from "@/lib/utils";

export async function createUser(userId: string) {
  if (!userId) {
    return;
  }
  try {
    const response = await fetch(`${backEndUrl}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}
