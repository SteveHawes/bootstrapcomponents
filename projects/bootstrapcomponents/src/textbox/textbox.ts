import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectorRef, Renderer2, Input, ChangeDetectionStrategy, Inject, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Format, WindowRefService } from '@servoy/public';
import { ServoyBootstrapBasefield } from '../bts_basefield';

@Component({
    selector: 'bootstrapcomponents-textbox',
    templateUrl: './textbox.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapTextbox extends ServoyBootstrapBasefield<HTMLInputElement> {

    @Input() format: Format;
    @Input() inputType: string;
    @Input() autocomplete: string;

    @Output() inputTypeChange = new EventEmitter();

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document, private windowService: WindowRefService) {
        super(renderer, cdRef, doc);
    }

    svyOnInit() {
        super.svyOnInit();
        if(this.autocomplete === 'off') {
            this.autocomplete = this.windowService.nativeWindow.navigator.userAgent.match(/chrome/i) ? 'chrome-off' : 'off';
        }
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (changes.inputType) {
            this.setInputType(this.inputType);
        }
    }

    onModelChange(newValue) {
        if(newValue && typeof newValue.getTime === 'function' && isNaN(newValue.getTime())) {
            // invalid date, force dataprovider display with invalid date text
            this.dataProviderID = null;
            this.cdRef.detectChanges();
            this.dataProviderID = newValue;
            this.cdRef.detectChanges();
        }
        else {
            this.dataProviderID = newValue;
        }
    }

    setInputType(inputType: string) {
        const types = ["text", "password", "email", "tel", "date", "time", "datetime-local", "month", "week", "number", "color","search", "url"];

        if (types.indexOf(inputType) > -1) {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'type', this.inputType);
            if (this.inputType !== inputType) {
                this.inputType = inputType;
                this.inputTypeChange.emit(this.inputType);
            }
            const dp = this.dataProviderID;
            if (dp) {
                this.dataProviderID = null;
                this.cdRef.detectChanges();
                this.dataProviderID = dp;
                this.cdRef.detectChanges();
            }
            return true;
        } else {
            return false;
        }
    }
}
