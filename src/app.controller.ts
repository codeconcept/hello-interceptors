import { Controller, Get, UseInterceptors, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MesureDurationInterceptor } from './mesure-duration.interceptor';
import { LogClientsInterceptor } from './log-clients.interceptor';
import { EnrichResponseInterceptor } from './enrich-response.interceptor';
import { FilterRequestInterceptor } from './filter-request.interceptor';

@Controller('api/v1')
@UseInterceptors(MesureDurationInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:name')
  @UseInterceptors(FilterRequestInterceptor, LogClientsInterceptor, EnrichResponseInterceptor)
  getHello(@Param('name') name: string): string {
    return this.appService.getHello(name);
  }
}
