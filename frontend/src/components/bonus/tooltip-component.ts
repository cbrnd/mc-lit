import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {
    computePosition,
    autoPlacement,
    offset,
    shift
} from '@floating-ui/dom';

const enterEvents = ['pointerenter', 'focus'];
const leaveEvents = ['pointerleave', 'blur', 'keydown', 'click'];

@customElement('tooltip-component')
export class TooltipComponent extends LitElement {

    static styles = css`
      :host {
        display: inline-block;
        position: fixed;
        padding: 4px;
        border: 1px solid darkgray;
        border-radius: 4px;
        background: #ccc;
        pointer-events: none;
      }
    `;

    @property({type: Number})
    offset = 4;

    _target: Element|null = null;

    get target() {
        return this._target;
    }
    set target(target: Element|null) {

        if (this.target) {
            enterEvents.forEach(name =>
                this.target!.removeEventListener(name, this.show));
            leaveEvents.forEach(name =>
                this.target!.removeEventListener(name, this.hide));
        }

        if (target) {
            enterEvents.forEach(name =>
                target!.addEventListener(name, this.show));
            leaveEvents.forEach(name =>
                target!.addEventListener(name, this.hide));
        }
        this._target = target;
    }

    connectedCallback() {
        super.connectedCallback();
        this.hide();
        this.target ??= this.previousElementSibling;
    }

    render() {
        return html`<slot></slot>`;
    }

    show = () => {

        this.style.cssText = '';

        computePosition(this.target, this, {

            strategy: 'fixed',
            middleware: [

                offset(this.offset),
                shift(),
                autoPlacement({allowedPlacements: ['top', 'bottom']})
            ],

        }).then(({x, y}: {x: number, y: number}) => {

            this.style.left = `${x}px`;
            this.style.top = `${y}px`;
        });

    };

    hide = () => {
        this.style.display = 'none';
    };

}
