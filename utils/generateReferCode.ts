import db from "@/db";
import { nanoid } from 'nanoid';

export async function generateUniqueReferCode(): Promise<string> {
    const MAX_ATTEMPTS = 20;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const code = nanoid(8).toUpperCase();
        const existing = await db.user.findUnique({
            where: { referCode: code },
        });
        if (!existing) return code;
    }

    throw new Error("Failed to generate unique refer code after 10 attempts");
}
