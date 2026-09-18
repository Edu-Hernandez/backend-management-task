import { Module } from "@nestjs/common";
import { ProjectController } from "./presentation/controllers/project.controller";
import { CreateProjectUseCase } from "./application/use-cases/create-project.use-case";
import { PROJECT_ENTITY } from "./domain/entities/project.entity";
import { PrismaProjectRepository } from "./infrastructure/persistence/prisma-project.repository";

@Module({
    imports: [
        CreateProjectUseCase,
    ],
    controllers: [ProjectController],
    providers: [
        CreateProjectUseCase,
        {
            provide: PROJECT_ENTITY,
            useClass: PrismaProjectRepository,
        },
    ],
    exports: [],
})
export class ProjectModule { }