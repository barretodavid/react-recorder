// @flow
import Rx from 'rxjs/Rx';
import CssSelectorGenerator from 'css-selector-generator';

const CONTAINER_ID = 'tip-app';

const selectorGenerator = new CssSelectorGenerator();

interface Step {
  type: string;
  selector: string;
}

const createStep = (event: Event): Step => {
  return {
    type: event.type,
    selector: selectorGenerator.getSelector(event.target)
  }
};

const filterContainerEvents = (step: Step): boolean => {
  return step.selector.indexOf(`#${CONTAINER_ID}`) === -1;
};

const registerEventHandlers = () => {
  Rx.Observable.fromEvent(document, 'click')
    .map(createStep)
    .filter(filterContainerEvents)
    .subscribe(console.log);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
