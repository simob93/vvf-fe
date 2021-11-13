import { TreeNode } from './treeNode';

export interface RolePermission extends TreeNode<RolePermission> {
    permesso: string
}