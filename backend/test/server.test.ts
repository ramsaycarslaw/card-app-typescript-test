import { server } from "../src/server";
import Prisma from "../src/db";

describe("Server tests", () => {
  afterAll(() => {
    server.close();
  });

  it("should retrieve all entries", async () => {
    const entries = [
      { id: "1", title: "Entry 1", description: "Description 1", created_at: new Date().toISOString(), scheduled: new Date().toISOString() },
      { id: "2", title: "Entry 2", description: "Description 2", created_at: new Date().toISOString(), scheduled: new Date().toISOString() },
    ];

    jest.spyOn(Prisma.entry, "findMany").mockResolvedValue(entries.map(entry => ({
      ...entry,
      created_at: new Date(entry.created_at),
      scheduled: new Date(entry.scheduled),
    })));

    const response = await server.inject({ method: 'GET', url: '/get/' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(entries);
  });

  it("should retrieve a single entry by id", async () => {
    const entry = { id: "1", title: "Entry 1", description: "Description 1", created_at: new Date().toISOString(), scheduled: new Date().toISOString() };

    jest.spyOn(Prisma.entry, "findUnique").mockResolvedValue({
      ...entry,
      created_at: new Date(entry.created_at),
      scheduled: new Date(entry.scheduled),
    });

    const response = await server.inject({ method: 'GET', url: '/get/1' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(entry);
  });

  it("should return error if entry not found", async () => {
    jest.spyOn(Prisma.entry, "findUnique").mockResolvedValue(null);

    const response = await server.inject({ method: 'GET', url: '/get/invalid-id' });
    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ msg: "Error finding entry with id invalid-id" });
  });

  it("should delete an entry", async () => {
    const deletedEntry = { id: "1", title: "Deleted Entry", description: "Deleted Description", created_at: new Date(), scheduled: new Date() };

    jest.spyOn(Prisma.entry, "delete").mockResolvedValue(deletedEntry);

    const response = await server.inject({ method: 'DELETE', url: '/delete/1' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ msg: "Deleted successfully" });
  });

  it("should return error on entry deletion failure", async () => {
    jest.spyOn(Prisma.entry, "delete").mockRejectedValue(new Error("Failed to delete"));

    const response = await server.inject({ method: 'DELETE', url: '/delete/invalid-id' });
    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ msg: "Error deleting entry" });
  });

  it("should update an entry", async () => {
    const updatedEntry = { id: "1", title: "Updated Entry", description: "Updated Description", created_at: new Date().toISOString(), scheduled: new Date().toISOString() };

    jest.spyOn(Prisma.entry, "update").mockResolvedValue({
      ...updatedEntry,
      created_at: new Date(updatedEntry.created_at),
      scheduled: new Date(updatedEntry.scheduled),
    });

    const response = await server.inject({ method: 'PUT', url: '/update/1', payload: updatedEntry });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ msg: "Updated successfully" });
  });

  it("should return error on entry update failure", async () => {
    jest.spyOn(Prisma.entry, "update").mockRejectedValue(new Error("Failed to update"));

    const response = await server.inject({ method: 'PUT', url: '/update/invalid-id', payload: {} });
    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({ msg: "Error updating" });
  });
});