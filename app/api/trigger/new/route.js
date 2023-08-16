import { dbConnection } from '@/utils/db';
import Trigger from '@/models/trigger';

export const POST = async (req) => {
  const { trigger, userID, category } = await req.json();

  try {
    await dbConnection();
    const newTrigger = await Trigger({ trigger, userID, category });
    await newTrigger.save();

    return new Response(JSON.stringify(newTrigger), { status: 201 });
  } catch (error) {
    return new Response("Couldn't create a new trigger", { status: 500 });
  }
};
