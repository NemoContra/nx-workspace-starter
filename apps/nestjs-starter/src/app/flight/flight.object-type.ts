import { Flight } from '@flight-app/shared';
import { Field, Int, ObjectType } from '@nestjs/graphql';

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

  @Field({ nullable: true })
  delayed?: boolean;
}
