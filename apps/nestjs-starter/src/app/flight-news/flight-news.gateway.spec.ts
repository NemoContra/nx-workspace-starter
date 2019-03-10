import { Test, TestingModule } from '@nestjs/testing';
import { FlightNewsGateway } from './flight-news.gateway';
import { FlightNewsService } from './flight-news.service';

class FlightNewsGatewayUnderTest extends FlightNewsGateway {
  public server = {
    emit: () => null
  } as any;
}

describe('FlightNewsGateway', () => {
  let flightNewsGateway: FlightNewsGateway;
  let flightNewsService: FlightNewsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlightNewsService,
        {
          provide: FlightNewsGateway,
          useClass: FlightNewsGatewayUnderTest
        }
      ]
    }).compile();
    flightNewsGateway = module.get(FlightNewsGateway);
    flightNewsService = module.get(FlightNewsService);
  });

  it('should subscribe to flightNews', (done) => {
    flightNewsService.setFlightNews('FakeNews!!!');
    flightNewsGateway.getLatestFlightNews().subscribe(news => {
      expect(news).toEqual({event: 'flightNews', data: 'FakeNews!!!'});
      done();
    });
  });

  it('should push latest flightNews', () => {
    spyOn(flightNewsGateway.server, 'emit');
    flightNewsService.setFlightNews('FakeNews!!!');
    flightNewsGateway.pushLatestFlightNews();
    expect(flightNewsGateway.server.emit).toHaveBeenCalledWith('flightNews', 'FakeNews!!!');
  });
});
