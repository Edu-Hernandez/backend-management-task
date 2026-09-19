import { Module } from "@nestjs/common";
import { CreateProjectUseCase } from "./application/use-cases/create-project.use-case.js";
import { PROJECT_ENTITY } from "./domain/entities/project.entity.js";
import { PrismaProjectRepository } from "./infrastructure/persistence/prisma-project.repository.js";
import { ProjectController } from "./presentation/controllers/project.controller.js";

@Module({
    imports: [
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