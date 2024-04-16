import type { ComponentType, ComponentProps } from 'svelte';
interface GridItemProps {
	[key: string]: unknown;
}

export interface GridItem<C extends ComponentType = ComponentType> extends GridItemProps {
	component: ComponentProps<InstanceType<C>>;
}
