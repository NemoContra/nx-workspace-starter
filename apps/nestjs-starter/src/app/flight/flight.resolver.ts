import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FlightObjectType } from './flight.object-type';
import { FlightService } from './flight.service';
import { ArgsType, Field, InputType, Int } from 'type-graphql';
import { Flight } from '@flight-app/shared';

@ArgsType()
export class FlightSearchArgs implements Partial<Flight> {
  @Field()
  from: string;

  @Field()
  to: string;

  @Field({ nullable: true })
  fromDate?: string;

  @Field({ nullable: true })
  toDate?: string;
}

@InputType()
export class CreateFlight implements Flight {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  date: string;

  @Field({ nullable: true })
  delayed?: boolean;
}

@InputType()
export class UpdateFlight implements Flight {
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

@Resolver(() => FlightObjectType)
export class FlightResolver {
  constructor(private readonly flightService: FlightService) {
  }

  @Query(() => FlightObjectType, { name: 'flight' })
  async getFlight(@Args({name: 'id',  type: () => Int }) id: number): Promise<Flight> {
    return await this.flightService.getFlightById(id);
  }

  @Query(() => [FlightObjectType], { name: 'flights' })
  async searchFlights(
    @Args({ type: () => FlightSearchArgs }) { from, to, fromDate, toDate }: FlightSearchArgs
  ): Promise<Flight[]> {
    return await this.flightService.searchFlights(from, to, fromDate, toDate);
  }

  @Mutation(() => FlightObjectType)
  async createFlight(@Args({ name: 'flight', type: () => CreateFlight }) flight: CreateFlight): Promise<Flight> {
    return await this.flightService.createFlight(flight);
  }

  @Mutation(() => FlightObjectType)
  async updateFlight(@Args({ name: 'flight', type: () => UpdateFlight }) flight: UpdateFlight): Promise<Flight> {
    return await this.flightService.updateFlight(flight);
  }
}
