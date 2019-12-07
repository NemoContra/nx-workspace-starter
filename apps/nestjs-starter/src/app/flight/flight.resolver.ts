import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FlightObjectType } from './flight.object-type';
import { FlightService } from './flight.service';
import { ArgsType, Field, InputType, Int } from 'type-graphql';
import { Flight } from '@flight-app/shared';

@ArgsType()
export class FlightSearchArgs implements Partial<Flight> {
  @Field(() => Int, {nullable: true})
  id?: number;

  @Field({nullable: true, defaultValue: ''})
  from: string;

  @Field({nullable: true, defaultValue: ''})
  to: string;

  @Field({nullable: true})
  fromDate?: string;

  @Field({nullable: true})
  toDate?: string;
}

@InputType()
export class MutateFlight implements Flight {
  @Field(() => Int, {nullable: true})
  id?: number;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  date: string;

  @Field({nullable: true})
  delayed?: boolean;
}

@Resolver(() => FlightObjectType)
export class FlightResolver {
  constructor(private readonly flightService: FlightService) {
  }

  @Query(() => FlightObjectType, { name: 'flight' })
  async getFlight(
    @Args({type: () => FlightSearchArgs}) {id, from, to, fromDate, toDate}: FlightSearchArgs
  ): Promise<Flight | Flight[]> {
    return await id ? this.flightService.getFlightById(id) : this.flightService.searchFlights(from, to, fromDate, toDate);
  }

  @Mutation(() => FlightObjectType)
  async createFlight(@Args({name: 'flight', type: () => MutateFlight}) flight: MutateFlight): Promise<Flight> {
    return await this.flightService.createFlight(flight);
  }

  @Mutation(() => FlightObjectType)
  async updateFlight(@Args({name: 'flight', type: () => MutateFlight}) flight: MutateFlight): Promise<Flight> {
    return await this.flightService.updateFlight(flight);
  }
}
