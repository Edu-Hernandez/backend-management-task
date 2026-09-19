import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { db } from '../../../prisma/db.js';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly client = db;

  async onModuleDestroy(): Promise<void> {
    await this.client.close();
  }
}
