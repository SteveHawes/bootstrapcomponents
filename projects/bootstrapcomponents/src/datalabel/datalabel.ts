import { Component, Input, Renderer2, Pipe, PipeTransform, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ServoyBootstrapBaseLabel } from '../bts_baselabel';

@Component({
    selector: 'bootstrapcomponents-datalabel',
    templateUrl: './datalabel.html',
    styleUrls: ['./datalabel.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapDatalabel extends ServoyBootstrapBaseLabel<HTMLSpanElement> {

    @Input() dataProviderID;
    @Input() styleClassExpression;
    @Input() valuelistID;
    @Input() format;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
        if (this.onDoubleClickMethodID) {
            this.renderer.listen(this.elementRef.nativeElement, 'dblclick', (e) => {
                this.onDoubleClickMethodID(e);
            });
        }
    }

}

@Pipe( { name: 'designFilter' } )
export class DesignTextPipe implements PipeTransform {
    constructor( ) {
    }

    transform( input: string, inDesigner: boolean ): any {
        if ( inDesigner ) {
            return 'DataLabel';
        }
        return input;
    }
}
