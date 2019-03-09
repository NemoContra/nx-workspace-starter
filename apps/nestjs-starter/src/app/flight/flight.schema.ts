import * as mongoose from 'mongoose';
import { Flight } from '@flight-app/shared';
import { Document } from 'mongoose';

export const FlightSchema = new mongoose.Schema({
  id: Number,
  from: String,
  to: String,
  date: String,
  delayed: {
    type: Boolean,
    default: false
  }
});

FlightSchema.pre('save', function() {
  const document = this as FlightDocument;
  if (document.isNew) {
    return this.constructor['countDocuments']({}, (err, counter: number) => {
      document.id = counter;
      return document;
    });
  }
});

export type FlightDocument = Flight & Document;
