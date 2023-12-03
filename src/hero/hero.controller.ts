import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { CreateHeroDto } from './dto/CreateHero.dto';
import { UpdateHeroDto } from './dto/UpdateHero.dto';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) {}

  @Get()
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  index(@Res() response) {
    response.json(this.heroService.findAll);
  }

  @Get('create')
  create(@Res({ passthrough: true }) response): string {
    response.cookie('name', 'ridwan');
    return 'Oke Coockie';
  }

  @Post('store')
  @HttpCode(201)
  store(
    @Req() request,
    @Body() createHeroDto: CreateHeroDto,
    @Res({ passthrough: true }) response,
  ) {
    try {
      // const { id, name, image } = request.body;
      // data.push({ id, name, image });
      // return data;
      return createHeroDto;
    } catch (error) {
      response.status(500).json({ message: error });
    }
  }

  @Get('welcome')
  @Redirect('http://ridwanromadhon.com/')
  hello() {
    return 'welcome';
  }

  @Get('detail/:id')
  show(@Param('id') id: any, @Res() response) {
    const resultObject = this.heroService
      .findAll()
      .find((item) => item.id == id);
    return response.json(resultObject);
  }

  @Put('update/:id')
  update(@Param('id') id: any, @Body() UpdateUserDto: UpdateHeroDto) {
    this.heroService.findAll().filter((hero) => {
      if (hero.id == id) {
        hero.name = UpdateUserDto.name;
        hero.image = UpdateUserDto.image;
      }
    });
    return this.heroService.findAll();
  }

  @Delete('destroy/:id')
  destrou(@Param('id') id: any, @Res() response) {
    const resultObject = this.heroService.findAll().filter((hero) => {
      return hero.id != id;
    });
    return response.json(resultObject);
  }
}
