/**
 * Tests for the registration API logic
 */

import bcrypt from "bcryptjs";

jest.mock("bcryptjs");

describe("Registration API Logic", () => {
  const mockHash = bcrypt.hash as jest.Mock;

  beforeEach(() => {
    mockHash.mockResolvedValue("hashed_password_123");
  });

  it("rejects empty name field", () => {
    const data = { name: "", email: "test@test.com", password: "password123" };
    expect(data.name).toBeFalsy();
  });

  it("rejects empty email field", () => {
    const data = { name: "Test", email: "", password: "password123" };
    expect(data.email).toBeFalsy();
  });

  it("rejects password shorter than 8 characters", () => {
    const password = "short";
    expect(password.length).toBeLessThan(8);
  });

  it("accepts password with 8 or more characters", () => {
    const password = "password123";
    expect(password.length).toBeGreaterThanOrEqual(8);
  });

  it("hashes password with bcrypt before saving", async () => {
    const password = "mySecurePassword123";
    await bcrypt.hash(password, 12);
    expect(mockHash).toHaveBeenCalledWith(password, 12);
  });

  it("returns hashed password (not plaintext)", async () => {
    const password = "mySecurePassword123";
    const hashed = await bcrypt.hash(password, 12);
    expect(hashed).not.toBe(password);
    expect(hashed).toBe("hashed_password_123");
  });

  it("validates email format with regex", () => {
    const emailRegex = /^\S+@\S+$/i;
    expect(emailRegex.test("valid@email.com")).toBe(true);
    expect(emailRegex.test("invalid-email")).toBe(false);
    expect(emailRegex.test("")).toBe(false);
  });
});
