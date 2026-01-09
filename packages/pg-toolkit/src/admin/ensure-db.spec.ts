import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { checkAndCreateDB } from './ensure-db';
import { Client } from 'pg';

vi.mock('pg', () => {
  const mClient = {
    connect: vi.fn(),
    query: vi.fn(),
    end: vi.fn(),
  };
  return {
    Client: vi.fn(() => mClient),
  };
});

describe('checkAndCreateDB', () => {
  const mockConnect = vi.fn();
  const mockQuery = vi.fn();
  const mockEnd = vi.fn();

  beforeEach(() => {
    vi.mocked(Client).mockImplementation(
      () =>
        ({
          connect: mockConnect,
          query: mockQuery,
          end: mockEnd,
        }) as unknown as Client,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create database if it does not exist', async () => {
    mockConnect.mockResolvedValue(undefined);
    // First query checks existence (returns 0 rows)
    // Second query creates database
    mockQuery
      .mockResolvedValueOnce({ rowCount: 0 })
      .mockResolvedValueOnce({ rowCount: 1 });

    await checkAndCreateDB('postgres://user:pass@localhost:5432/target_db');

    expect(Client).toHaveBeenCalled();
    expect(mockConnect).toHaveBeenCalled();
    // Check existence query
    expect(mockQuery).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('SELECT 1 FROM pg_database'),
      ['target_db'],
    );
    // Create query
    expect(mockQuery).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('CREATE DATABASE "target_db"'),
    );
    expect(mockEnd).toHaveBeenCalled();
  });

  it('should not create database if it already exists', async () => {
    mockConnect.mockResolvedValue(undefined);
    mockQuery.mockResolvedValueOnce({ rowCount: 1 }); // Exists

    await checkAndCreateDB('postgres://user:pass@localhost:5432/target_db');

    expect(mockQuery).toHaveBeenCalledTimes(1); // Only check test
    expect(mockQuery).not.toHaveBeenCalledWith(
      expect.stringContaining('CREATE DATABASE'),
    );
    expect(mockEnd).toHaveBeenCalled();
  });

  it('should handle admin connection string derivation', async () => {
    mockConnect.mockResolvedValue(undefined);
    mockQuery.mockResolvedValueOnce({ rowCount: 1 });

    await checkAndCreateDB('postgres://user:pass@localhost:5432/target_db');

    // Verify Client was initialized with postgres db, not target_db
    expect(Client).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        connectionString: expect.stringMatching(/\/postgres$/),
      }),
    );
  });
});
