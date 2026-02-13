'use client';

import { Alert, Button } from 'antd';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <div style={{ maxWidth: 500, width: '100%' }}>
        <Alert
          message="Something went wrong"
          description={error.message || 'Failed to load movies. Please try again.'}
          type="error"
          showIcon
        />
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Button type="primary" onClick={() => reset()}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
