import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { CreateHeroDto } from './dto/CreateHero.dto';

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
    console.log('params', id);
    const resultObject = data.find((item) => item.id == id);
    console.log(resultObject);
    return response.json(resultObject);
  }
}
