import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  isEdited = false
  singleSelect = null
  model = null
  availableOptions = [
    { id: '1', name: 'Option A' },
    { id: '2', name: 'Option B' },
    { id: '3', name: 'Option C' }
  ]
  newRoute = null
  routesOptions = ["1","2","3"]
  @Output() changeRoute = new EventEmitter();

  onSave() {
    this.changeRoute.emit([this.actualRoute, this.newRoute, this.product]);
  }
  toggleEdition() {
    this.isEdited = !this.isEdited
  }
  @Input() product?: Object;
  @Input() actualRoute?: Object;

}
