export interface TreeNode<T> {
    nodId: number;
	parentId: number;
	text: string;
	children: T[];
	isRoot:boolean;
}