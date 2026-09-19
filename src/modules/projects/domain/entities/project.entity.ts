export const PROJECT_ENTITY = Symbol('PROJECT_ENTITY');

export type ProjectProps = {
    archivedAt: Date | null;
    createdAt: Date;
    createdById: string;
    deletedAt: Date | null;
    description: string | null;
    id: string;
    name: string;
    ownerId: string;
    status: string;
    updatedAt: Date;
};

export class ProjectEntity {
    public readonly archivedAt: Date | null;
    public readonly createdAt: Date;
    public readonly createdById: string;
    public readonly deletedAt: Date | null;
    public readonly description: string | null;
    public readonly id: string;
    public readonly name: string;
    public readonly ownerId: string;
    public readonly status: string;
    public readonly updatedAt: Date;

    constructor(props: ProjectProps) {
        this.archivedAt = props.archivedAt;
        this.createdAt = props.createdAt;
        this.createdById = props.createdById;
        this.deletedAt = props.deletedAt;
        this.description = props.description;
        this.id = props.id;
        this.name = props.name;
        this.ownerId = props.ownerId;
        this.status = props.status;
        this.updatedAt = props.updatedAt;
    }
}
