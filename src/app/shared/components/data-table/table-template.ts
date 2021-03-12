import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { TableColumnComponent } from './table-column.component';

/*eslint-disable */
@Component({
  selector: 'rd-column-header-template',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnHeaderTemplateComponent implements OnInit, OnDestroy {
  @Input() column: TableColumnComponent;

  embeddedView: EmbeddedViewRef<any>;

  constructor(private viewContainer: ViewContainerRef) {}

  ngOnInit() {
    this.embeddedView = this.viewContainer.createEmbeddedView(
      this.column.headerTemplate,
      {
        ['implicit']: this.column,
      }
    );
  }

  ngOnDestroy() {
    if (this.embeddedView) {
      this.embeddedView.destroy();
    }
  }
}

@Component({
  selector: 'rd-column-body-template',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnBodyTemplateComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() column: TableColumnComponent;
  @Input() rowData: any;
  @Input() rowIndex: number;

  embeddedView: EmbeddedViewRef<any>;

  constructor(private viewContainer: ViewContainerRef) {}

  ngOnInit() {
    this.embeddedView = this.viewContainer.createEmbeddedView(
      this.column.bodyTemplate,
      {
        ['implicit']: this.column,
        ['rowData']: this.rowData,
        ['rowIndex']: this.rowIndex,
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const rowIndexChange: SimpleChange = changes['rowIndex'];

    if (rowIndexChange && this.embeddedView) {
      this.embeddedView.context.rowIndex = rowIndexChange.currentValue;
    }
  }

  ngOnDestroy() {
    if (this.embeddedView) {
      this.embeddedView.destroy();
    }
  }
}
