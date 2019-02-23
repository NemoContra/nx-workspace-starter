import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'flights' })
export class FlightDao {
  @Prop()
  id: number;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  date: string;

  @Prop({ default: false })
  delayed: boolean;
}

export type FlightDocument = HydratedDocument<FlightDao>;

export const FlightSchema = SchemaFactory.createForClass(FlightDao).pre(
  'save',
  async function () {
    if (this.isNew) {
      this.id = await this.constructor['countDocuments']({});
    }
  }
);
