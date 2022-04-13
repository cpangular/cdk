import { EventEmitter } from '@angular/core';
import { LayerSizes } from '../layer/LayerSizes';

export interface ILayer {
  topOpened: boolean;
  topOpenedChange: EventEmitter<boolean>;
  leftOpened: boolean;
  leftOpenedChange: EventEmitter<boolean>;
  bottomOpened: boolean;
  bottomOpenedChange: EventEmitter<boolean>;
  rightOpened: boolean;
  rightOpenedChange: EventEmitter<boolean>;
  layerResize: EventEmitter<LayerSizes>;
  openAll(): void;
  closeAll(): void;
}
