import { Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { response } from 'express';

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
  index(@Res() response) {
    response.json(data);
  }

  @Get('create')
  create(@Res({ passthrough: true }) response): string {
    response.cookie('name', 'ridwan');
    return 'Oke Coockie';
  }

  @Post('store')
  store(@Req() request, @Res({ passthrough: true }) response) {
    // response.status(201).json(request.body);
    const { id, name, image } = request.body;
    data.push({ id, name, image });
    return data;
  }
}
