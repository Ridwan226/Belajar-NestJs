import { Injectable } from '@nestjs/common';
import { Hero } from './entities/hero.entity';

@Injectable()
export class HeroService {
  private readonly heros: Hero[] = [
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

  create(hero: Hero) {
    this.heros.push(hero);
  }

  findAll(): Hero[] {
    return this.heros;
  }
}
