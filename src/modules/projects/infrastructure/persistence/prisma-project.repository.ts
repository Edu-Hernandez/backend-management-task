import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../shared/prisma/prisma.service.js";
import { CreateProjectDto } from "../../application/dto/create-project.dto.js";
import { ProjectEntity } from "../../domain/entities/project.entity.js";
import { ProjectRepository } from "../../domain/repositories/project.repository.js";

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(createProjectDto: CreateProjectDto, userId: string): Promise<ProjectEntity> {
        const response = await this.prisma.client.orm.public.Project.create({
            name: createProjectDto.name,
            description: createProjectDto.description ?? null,
            ownerId: createProjectDto.ownerId,
            createdById: userId,
            status: 'ACTIVE',
        });

        return new ProjectEntity({
            id: response.id,
            name: response.name,
            description: response.description,
            ownerId: response.ownerId,
            createdById: response.createdById,
            status: response.status,
            createdAt: new Date(response.createdAt),
            updatedAt: new Date(response.updatedAt),
            archivedAt: response.archivedAt
                ? new Date(response.archivedAt)
                : null,
            deletedAt: response.deletedAt
                ? new Date(response.deletedAt)
                : null,
        });
    }
}
