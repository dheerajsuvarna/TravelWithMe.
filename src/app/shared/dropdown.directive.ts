/**
 * Created by nilu on 06/07/17.
 */

import {Directive, HostBinding, HostListener} from '@angular/core';
@Directive({
  selector: '[appDropDown]'
})

export class DropDownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen() {

  }
}
