import { dbConnection } from '@/utils/db';
import Trigger from '@/models/trigger';

export const GET = async (req, { params }) => {
  try {
    await dbConnection();
    const trigger = await Trigger.find({
      userId: params.id,
    }).populate('userID');

    return new Response(JSON.stringify(trigger), { status: 200 });
  } catch (error) {
    return new Response('failed to retrive data', { status: 500 });
  }
};
