import { Schema, model, models } from 'mongoose';

const triggerSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  trigger: {
    type: String,
    required: [true, 'Prompt/Trigger is required'],
  },
  category: {
    type: String,
    required: [true, 'Category required'],
  },
});

const Trigger = models.Trigger || model('Trigger', triggerSchema);

export default Trigger;
