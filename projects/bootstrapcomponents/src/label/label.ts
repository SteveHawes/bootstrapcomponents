import { ServoyBootstrapBaseLabel } from '../bts_baselabel';
import { Component, Input, Renderer2, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'bootstrapcomponents-label',
    templateUrl: './label.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapLabel extends ServoyBootstrapBaseLabel<HTMLSpanElement> {

    @Input() labelFor: string;
    @Input() styleClassExpression: string;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
        if (this.onDoubleClickMethodID) {
            this.renderer.listen(this.elementRef.nativeElement, 'dblclick', (e) => {
                this.onDoubleClickMethodID(e, this.getDataTarget(e));
            });
        }
    }
}
