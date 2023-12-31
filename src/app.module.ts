import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleController } from './role/role.controller';
import { UserModule } from './user/user.module';
import { HeroModule } from './hero/hero.module';

@Module({
  imports: [UserModule, HeroModule],
  controllers: [AppController, RoleController],
  providers: [AppService],
})
export class AppModule {}
