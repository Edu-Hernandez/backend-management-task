import { CreateProjectDto } from "../../application/dto/create-project.dto";
import { ProjectEntity } from "../entities/project.entity";

export interface ProjectRepository {
    create(createProjectDto: CreateProjectDto, userId: string): Promise<ProjectEntity>;
}