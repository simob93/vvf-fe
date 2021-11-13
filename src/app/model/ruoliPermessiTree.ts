import { TreeNode } from './treeNode';

export interface RuoliPermissiTree extends TreeNode<RuoliPermissiTree> {
    permesso: string
}