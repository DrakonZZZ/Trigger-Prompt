import { dbConnection } from '@/utils/db';
import Trigger from '@/models/trigger';

export const GET = async (_, { params }) => {
  try {
    await dbConnection();
    const trigger = await Trigger.findById(params.id).populate('userID');

    if (!trigger) new Response('No Triggers found', { status: 404 });
    return new Response(JSON.stringify(trigger), { status: 200 });
  } catch (error) {
    return new Response('failed to retrive data', { status: 500 });
  }
};
export const PATCH = async (req, { params }) => {
  const { trigger, category } = await req.json();

  try {
    await dbConnection();
    const triggerSearch = await Trigger.findById(params.id);

    if (!trigger) new Response('Search yeilded no triggers', { status: 404 });

    triggerSearch.trigger = trigger;
    triggerSearch.category = category;
    await triggerSearch.save();
    return new Response(JSON.stringify(triggerSearch), { status: 200 });
  } catch (error) {
    return new Response('failed to retrive data', { status: 500 });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await dbConnection();
    await Trigger.findByIdAndDelete(params.id);

    return new Response('Deleted Sucessfully', { status: 200 });
  } catch (error) {
    return new Response('failed to delete', { status: 500 });
  }
};
