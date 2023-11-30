import {
  Body,
  Controller,
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

let data = [
  {
    id: 1,
    name: 'Ridwan',
    image: 'Ridwan.png',
  },
  {
    id: 2,
    name: 'Budi',
    image: 'Budi.png',
  },
  {
    id: 3,
    name: 'Doni',
    image: 'Doni.png',
  },
];

@Controller('hero')
export class HeroController {
  @Get()
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  index(@Res() response) {
    response.json(data);
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
    const resultObject = data.find((item) => item.id == id);
    return response.json(resultObject);
  }

  @Put('update/:id')
  update(@Param('id') id: any, @Body() UpdateUserDto: UpdateHeroDto) {
    data.filter((hero) => {
      if (hero.id == id) {
        hero.name = UpdateUserDto.name;
        hero.image = UpdateUserDto.image;
      }
    });
    return data;
  }
}
