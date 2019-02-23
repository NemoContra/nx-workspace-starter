import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Flight } from '@flight-app/shared';

export const FlightSchema = new mongoose.Schema({
  id: Number,
  from: String,
  to: String,
  date: String,
  delayed: {
    type: Boolean,
    default: false,
  },
});

FlightSchema.pre('save', async function () {
  const document = this as FlightDocument;
  if (document.isNew) {
    document.id = await this.constructor['countDocuments']({});
  }
});

export type FlightDocument = Flight & Document;
