import { MouseEventHandler } from 'react';

export interface AlertMessageAction {
  name: string;
  handler: MouseEventHandler<HTMLButtonElement>;
}
