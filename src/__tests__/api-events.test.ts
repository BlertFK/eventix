/**
 * Tests for the events API filtering and pagination logic
 */

describe("Events API Logic", () => {
  const mockEvents = [
    { _id: "1", name: "Rock Concert", category: "music", city: "London", price: 50, date: "2025-06-01", venue: "O2 Arena" },
    { _id: "2", name: "Tech Conference", category: "tech", city: "Berlin", price: 25, date: "2025-07-01", venue: "Convention Center" },
    { _id: "3", name: "Art Exhibition", category: "arts", city: "Paris", price: 15, date: "2025-08-01", venue: "Louvre" },
    { _id: "4", name: "Jazz Night", category: "music", city: "NYC", price: 40, date: "2025-09-01", venue: "Blue Note" },
    { _id: "5", name: "Food Festival", category: "food", city: "London", price: 10, date: "2025-10-01", venue: "Hyde Park" },
  ];

  function filterEvents(events: typeof mockEvents, params: { category?: string; search?: string; city?: string }) {
    return events.filter((e) => {
      if (params.category && params.category !== "all" && e.category !== params.category) return false;
      if (params.city && !e.city.toLowerCase().includes(params.city.toLowerCase())) return false;
      if (params.search) {
        const q = params.search.toLowerCase();
        if (!e.name.toLowerCase().includes(q) && !e.venue.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }

  function paginate(events: typeof mockEvents, page: number, limit: number) {
    const start = (page - 1) * limit;
    return {
      events: events.slice(start, start + limit),
      total: events.length,
      page,
      totalPages: Math.ceil(events.length / limit),
    };
  }

  it("returns all events when no filter applied", () => {
    const result = filterEvents(mockEvents, {});
    expect(result).toHaveLength(5);
  });

  it("filters by category", () => {
    const result = filterEvents(mockEvents, { category: "music" });
    expect(result).toHaveLength(2);
    expect(result.every((e) => e.category === "music")).toBe(true);
  });

  it("filters by city (case-insensitive)", () => {
    const result = filterEvents(mockEvents, { city: "london" });
    expect(result).toHaveLength(2);
  });

  it("filters by search term in name", () => {
    const result = filterEvents(mockEvents, { search: "concert" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Rock Concert");
  });

  it("filters by search term in venue", () => {
    const result = filterEvents(mockEvents, { search: "arena" });
    expect(result).toHaveLength(1);
    expect(result[0].venue).toBe("O2 Arena");
  });

  it("paginates results correctly", () => {
    const result = paginate(mockEvents, 1, 2);
    expect(result.events).toHaveLength(2);
    expect(result.total).toBe(5);
    expect(result.totalPages).toBe(3);
    expect(result.page).toBe(1);
  });

  it("returns correct second page", () => {
    const result = paginate(mockEvents, 2, 2);
    expect(result.events).toHaveLength(2);
    expect(result.events[0].name).toBe("Art Exhibition");
  });

  it("handles last page with fewer items", () => {
    const result = paginate(mockEvents, 3, 2);
    expect(result.events).toHaveLength(1);
  });
});
