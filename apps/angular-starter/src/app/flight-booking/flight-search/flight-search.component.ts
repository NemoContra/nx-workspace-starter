import { Component, OnInit } from '@angular/core';
import { Flight } from '@flight-app/shared';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent implements OnInit {
  from: string;
  to: string;
  flights: Flight[] = [];
  selectedFlight: Flight;
  message: string;
  searchError = '';

  flightNews$: Observable<string>;

  basket: object = {
    // <-- Neue Eigenschaft
    '3': true,
    '5': true,
  };

  constructor(private apollo: Apollo, private socket: Socket) {}

  ngOnInit(): void {
    this.socket.connect();
    // Optional to fetch initial news - Could also be Http-Call or dismissed completely:
    this.socket.emit('flightNews');

    // Will be updated with every socket event
    this.flightNews$ = this.socket.fromEvent<string>('flightNews');
  }

  search(): void {
    if (!this.from || !this.to) {
      return;
    }

    this.apollo
      .query({
        query: gql`
        {
          flights(from: "${this.from}", to: "${this.to}") {
            id
            from
            to
            date
            delayed
          }
        }
      `,
      })
      .subscribe({
        next: (result: ApolloQueryResult<{ flights: Flight[] }>) => {
          this.flights = result.data.flights;
          this.searchError = '';
        },
        error: (errResp) => {
          console.error('Error loading flights', errResp);
          if (errResp.status === 401) {
            this.searchError = 'Sie müssen sich zuerst einloggen!';
          }
        },
      });
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  save(): void {
    this.apollo
      .mutate({
        mutation: gql`
          mutation (
            $id: Int!
            $from: String!
            $to: String!
            $date: String!
            $delayed: Boolean
          ) {
            updateFlight(
              flight: {
                id: $id
                from: $from
                to: $to
                date: $date
                delayed: $delayed
              }
            ) {
              id
              from
              to
              date
              delayed
            }
          }
        `,
        variables: {
          id: this.selectedFlight.id,
          from: this.selectedFlight.from,
          to: this.selectedFlight.to,
          date: this.selectedFlight.date,
          delayed: true,
        },
      })
      .subscribe();
  }
}
