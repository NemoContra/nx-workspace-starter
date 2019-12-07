import { Field, Int, ObjectType } from 'type-graphql';
import { Flight } from '@flight-app/shared';

@ObjectType()
export class FlightObjectType implements Flight {
  @Field(() => Int)
  id: number;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  date: string;

  @Field({nullable: true})
  delayed?: boolean;
}
