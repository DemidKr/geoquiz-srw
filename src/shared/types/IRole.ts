export type RoleTypes = 'user'|'admin';

export interface IRole {
    id?: number,
    name: RoleTypes,
}