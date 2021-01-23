import React from 'react';
import ColorModeSwitch from '@/components/ColorModeSwitch';
import { render } from '../test-utils';

describe('ColorModeSwitch', () => {
  it('should render ColorModeSwitch component', () => {
    render(<ColorModeSwitch />, {});
  });
});
