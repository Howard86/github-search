import type { RootState } from '../store';
import type { UserState } from './slice';

export const selectUser = (state: RootState): UserState => state.user;
