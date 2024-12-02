import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { FormFieldType } from './Form';
import { Form } from './Form';

vi.mock('@hooks/useToastStore', () => ({
  useToastStore: vi.fn(() => ({
    showToast: vi.fn(),
  })),
}));

describe('Form Component', () => {
  const fields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text' as FormFieldType,
      required: true,
      placeholder: 'Enter your username',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email' as FormFieldType,
      required: true,
      placeholder: 'Enter your email',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password' as FormFieldType,
      required: true,
      placeholder: 'Enter your password',
    },
  ];

  const onSubmit = vi.fn((e) => {
    e.preventDefault();
    return Promise.resolve();
  });

  const onChange = vi.fn();

  it('renders form fields correctly', () => {
    render(
      <Form
        fields={fields}
        onSubmit={onSubmit}
        submitText="Submit"
        values={{}}
        fieldErrors={{}}
        onChange={onChange}
      />,
    );

    fields.forEach((field) => {
      expect(
        screen.getByPlaceholderText(field.placeholder),
      ).toBeInTheDocument();
    });
  });

  it('disables submit button when isLoading is true', () => {
    render(
      <Form
        fields={fields}
        onSubmit={onSubmit}
        submitText="Submit"
        isLoading={true}
        values={{}}
        fieldErrors={{}}
        onChange={onChange}
      />,
    );

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeDisabled();
  });

  it('renders children correctly', () => {
    render(
      <Form
        fields={fields}
        onSubmit={onSubmit}
        submitText="Submit"
        values={{}}
        fieldErrors={{}}
        onChange={onChange}
      >
        <div>Child Component</div>
      </Form>,
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
