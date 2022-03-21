import { screen } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../../../mocks/server';
import { renderWithQueryClient } from '../../../test-utils';
import { AllStaff } from '../AllStaff';

test('renders response from query', async () => {
  renderWithQueryClient(<AllStaff />);

  const staffName = await screen.findAllByRole('heading', {
    name: /Divya|Sandra|Michael|Mateo/i,
  });

  expect(staffName).toHaveLength(4);
});

test('handles query error', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/staff', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
});
