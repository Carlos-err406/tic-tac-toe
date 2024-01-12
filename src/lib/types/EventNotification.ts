export const channels = {
	new_order: 'New order'
};
export type ChanelType = keyof typeof channels;
export type EventNotificationResponse<T> = {
	payload: T;
	channel: ChanelType;
};
