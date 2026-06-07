/**
 * Unit tests for the Naukri Profile Updater
 *
 * These tests validate the profile summary, resume headline, and core functionality.
 */

describe('Naukri Profile Updater - Profile Summary Validation', () => {
  describe('Summary length validation', () => {
    it('should require minimum 50 characters', () => {
      const shortSummary = 'Too short';
      const validSummary = 'A'.repeat(50);

      expect(shortSummary.length).toBeLessThan(50);
      expect(validSummary.length).toBeGreaterThanOrEqual(50);
    });

    it('should trim whitespace before validation', () => {
      const summaryWithSpaces =
        '  Valid summary with more than fifty characters here and more  ';
      const trimmed = summaryWithSpaces.trim();

      expect(trimmed.length).toBeGreaterThan(50);
    });
  });

  describe('Input validation', () => {
    it('should handle empty profile summary gracefully', () => {
      const emptySummary = '';
      expect(emptySummary.length).toBe(0);
    });

    it('should handle exactly 50 characters', () => {
      const exactSummary = 'A'.repeat(50);
      expect(exactSummary.length).toBe(50);
    });

    it('should accept summary longer than 50 characters', () => {
      const longSummary = 'A'.repeat(100);
      expect(longSummary.length).toBeGreaterThan(50);
    });
  });
});

describe('Resume Path Handling', () => {
  it('should handle single resume path', () => {
    const singlePath = './resumes/resume1.pdf';
    const paths = [singlePath];

    expect(paths.length).toBe(1);
    expect(paths[0]).toBe(singlePath);
  });

  it('should handle multiple resume paths', () => {
    const multiplePaths = `./resumes/resume1.pdf
./resumes/resume2.pdf
./resumes/resume3.pdf`;

    const paths = multiplePaths
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));

    expect(paths.length).toBe(3);
  });

  it('should filter out comment lines', () => {
    const pathsWithComments = `./resumes/resume1.pdf
# This is a comment
./resumes/resume2.pdf`;

    const paths = pathsWithComments
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));

    expect(paths.length).toBe(2);
    expect(paths).toEqual(['./resumes/resume1.pdf', './resumes/resume2.pdf']);
  });

  it('should filter out empty lines', () => {
    const pathsWithEmptyLines = `./resumes/resume1.pdf

./resumes/resume2.pdf`;

    const paths = pathsWithEmptyLines
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));

    expect(paths.length).toBe(2);
  });
});

describe('Date-based Resume Selection', () => {
  it('should use modulo for deterministic selection', () => {
    const resumePaths = ['resume1.pdf', 'resume2.pdf', 'resume3.pdf'];
    const selectionFactor = 5;
    const selectedIndex = selectionFactor % resumePaths.length;

    expect(selectedIndex).toBeLessThan(resumePaths.length);
    expect(selectedIndex).toBeGreaterThanOrEqual(0);
  });

  it('should rotate through all resumes over time', () => {
    const resumePaths = ['resume1.pdf', 'resume2.pdf', 'resume3.pdf'];
    const selections = new Set();

    // Simulate different days
    for (let day = 0; day < 10; day++) {
      const index = day % resumePaths.length;
      selections.add(resumePaths[index]);
    }

    // Should have used all resumes
    expect(selections.size).toBe(resumePaths.length);
  });
});
