//update-current-stage/+server.ts
import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

export async function POST({ request }) {
    const { SONumber, currentStage } = await request.json();

    try {
        const updatedStage0 = await prisma.stage0.update({
            where: { SONumber: SONumber },
            data: { currentStage: currentStage }
        });

        return json({ success: true, data: updatedStage0 });
    } catch (error) {
        console.error('Error updating current stage:', error);
        return json({ success: false, error: 'Error updating current stage' }, { status: 500 });
    }
}