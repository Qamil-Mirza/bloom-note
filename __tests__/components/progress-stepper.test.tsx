import { render, screen } from '@testing-library/react';
import { ProgressStepper } from '@/components/ui/progress-stepper';

describe('ProgressStepper', () => {
  const steps = ['Step 1', 'Step 2', 'Step 3'];

  it('should render all steps', () => {
    render(<ProgressStepper currentStep={1} steps={steps} />);

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('should highlight current step', () => {
    render(<ProgressStepper currentStep={2} steps={steps} />);

    const step2 = screen.getByText('2');
    expect(step2).toHaveClass('bg-romantic-600');
  });

  it('should show checkmark for completed steps', () => {
    render(<ProgressStepper currentStep={3} steps={steps} />);

    // Steps 1 and 2 should be completed
    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks).toHaveLength(2);
  });

  it('should show step numbers for incomplete steps', () => {
    render(<ProgressStepper currentStep={1} steps={steps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render connector lines between steps', () => {
    const { container } = render(
      <ProgressStepper currentStep={2} steps={steps} />
    );

    // There should be 2 connector lines for 3 steps
    const lines = container.querySelectorAll('.w-16.h-0\\.5');
    expect(lines).toHaveLength(2);
  });
});
