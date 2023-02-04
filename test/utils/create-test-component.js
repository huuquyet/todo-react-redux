import {findRenderedComponentWithType, renderIntoDocument} from 'react-dom/test-utils';

export function createTestComponent(TestComponent) {
  return findRenderedComponentWithType(renderIntoDocument(TestComponent), TestComponent);
}
