import React from 'react';
import ProfileField from '@/components/ProfileField';
import { render } from '../test-utils';

describe('ProfileField', () => {
  it('should render ProfileField component', () => {
    render(<ProfileField fieldKey="name" fieldValue="test" />, {});
  });
});
