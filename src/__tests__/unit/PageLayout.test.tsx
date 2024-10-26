import { IonApp } from '@ionic/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { PageLayout } from '../../components/layout/PageLayout';

const renderWithIonic = (component: React.ReactNode) => {
  return render(
    <MemoryRouter>
      <IonApp>{component}</IonApp>
    </MemoryRouter>,
  );
};

describe('PageLayout', () => {
  it('renders with default props', async () => {
    const { container } = renderWithIonic(
      <PageLayout title="Test Title">
        <div>Test Content</div>
      </PageLayout>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(
      container.querySelector('ion-buttons[slot="start"]'),
    ).toBeInTheDocument();
  });

  it('renders without back button when showBackButton is false', () => {
    const { container } = renderWithIonic(
      <PageLayout title="Test Title" showBackButton={false}>
        <div>Test Content</div>
      </PageLayout>,
    );

    expect(
      container.querySelector('ion-buttons[slot="start"]'),
    ).not.toBeInTheDocument();
  });

  it('displays the correct title', () => {
    renderWithIonic(
      <PageLayout title="Custom Page Title">
        <div>Test Content</div>
      </PageLayout>,
    );

    expect(screen.getByText('Custom Page Title')).toBeInTheDocument();
  });

  it('renders children content', () => {
    renderWithIonic(
      <PageLayout title="Test Title">
        <div>Special Test Content</div>
      </PageLayout>,
    );

    expect(screen.getByText('Special Test Content')).toBeInTheDocument();
  });

  it('renders menu button', () => {
    const { container } = renderWithIonic(
      <PageLayout title="Test Title">
        <div>Test Content</div>
      </PageLayout>,
    );

    expect(
      container.querySelector('ion-buttons[slot="end"]'),
    ).toBeInTheDocument();
  });
});
