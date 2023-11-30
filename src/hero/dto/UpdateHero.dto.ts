import { PartialType } from '@nestjs/mapped-types';
import { CreateHeroDto } from './CreateHero.dto';

export class UpdateHeroDto extends PartialType(CreateHeroDto) {}
