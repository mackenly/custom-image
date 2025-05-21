import { MCEvent } from '@managed-components/types'
import { addPixel } from './index'
import { vi, expect, describe, it, beforeEach } from 'vitest'
import { mockEvent } from '@mackenly/zaraz-tools'

// Create mock functions
const mockExecute = vi.fn()
const mockConsoleLog = vi.fn()
const mockConsoleError = vi.fn()

describe('addPixel function', () => {
  beforeEach(() => {
    // Clear mocks between tests
    mockExecute.mockClear()
    mockConsoleLog.mockClear()
    mockConsoleError.mockClear()

    // Mock console methods
    console.log = mockConsoleLog
    console.error = mockConsoleError
  })

  it('should log error when no imgSrc is provided', async () => {
    const fakeEvent: MCEvent = {
      ...mockEvent,
      client: {
        ...mockEvent.client,
        execute: mockExecute,
      },
      payload: {}, // No imgSrc provided
    }

    await addPixel(fakeEvent)

    // Verify client.execute wasn't called
    expect(mockExecute).not.toHaveBeenCalled()

    // Verify error was logged
    expect(mockConsoleError).toHaveBeenCalledWith(
      'No imgSrc provided in payload'
    )
  })

  it('should correctly escape double quotes in imgSrc', async () => {
    const testImgSrc = 'https://example.com/test?param="test"'
    const fakeEvent: MCEvent = {
      ...mockEvent,
      client: {
        ...mockEvent.client,
        execute: mockExecute,
      },
      payload: {
        imgSrc: testImgSrc,
      },
    }

    await addPixel(fakeEvent)

    // Verify that quotes were escaped properly
    const executedScript = mockExecute.mock.calls[0][0]
    expect(executedScript).toContain(
      'https://example.com/test?param=\\"test\\"'
    )
    expect(executedScript).not.toContain(
      'https://example.com/test?param="test"'
    )
  })
})
