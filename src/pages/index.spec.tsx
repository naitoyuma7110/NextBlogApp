import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Index from './index';

describe('Rendering', () => {
  it('Should render hello text', () => {
    render(<Index />); // Homeコンポーネントをレンダリング
    expect(screen.getByText('Index')).toBeInTheDocument();
  });
});
