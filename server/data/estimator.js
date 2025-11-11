export const estimatorConfig = {
  experiences: [
    {
      id: 'essential',
      name: 'Essential',
      description: 'Purpose-built layouts with efficient detailing and foundational finishes.',
    },
    {
      id: 'refined',
      name: 'Refined',
      description: 'Premium Techo-Bloc selections, lighting integration, and sculpted accents.',
    },
    {
      id: 'bespoke',
      name: 'Bespoke',
      description: 'Statement builds with layered stonework, custom features, and concierge coordination.',
    },
  ],
  services: [
    {
      id: 'patio',
      name: 'Patio',
      description: 'Exclusive Techo-Bloc surfaces sized for everyday living and hosting.',
      unit: 'sq ft',
      quantityLabel: 'Patio size (sq ft)',
      minQty: 250,
      maxQty: 2000,
      defaultQty: 600,
      required: true,
      rates: {
        essential: { low: 15, high: 20, note: 'Standard pavers, simple layout, minimal borders.' },
        refined: { low: 20, high: 30, note: 'Premium pavers, border or inlay, lighting conduit.' },
        bespoke: { low: 30, high: 45, note: 'Large-format slabs, inlays, seating edges, drainage upgrades.' },
      },
    },
    {
      id: 'retaining-wall',
      name: 'Retaining / Seat Wall',
      description: 'Structural or seating walls planned at an average 4’ face height.',
      unit: 'linear ft',
      quantityLabel: 'Wall length (lf @ 4’ avg height)',
      minQty: 20,
      maxQty: 200,
      defaultQty: 50,
      rates: {
        essential: { low: 40, high: 60, note: 'Segmental block wall ≤4’ with basic drainage.' },
        refined: { low: 60, high: 90, note: 'Premium block/stone veneer, engineered backfill.' },
        bespoke: {
          low: 90,
          high: 140,
          note: 'Tall walls, stone fascia, integrated lighting + complex site work.',
        },
      },
    },
    {
      id: 'fire-feature',
      name: 'Fire Feature',
      description: 'From sculpted fire tables to masonry fireplaces.',
      defaultActive: true,
      rates: {
        essential: { low: 1000, high: 3000, note: 'Compact gas/wood fire pit or table.' },
        refined: { low: 3000, high: 7000, note: 'Built seat wall integration, premium veneer, gas stub.' },
        bespoke: { low: 7000, high: 12000, note: 'Custom fireplace or multi-sided feature with lighting.' },
      },
    },
    {
      id: 'outdoor-kitchen',
      name: 'Outdoor Kitchen',
      description: 'Appliances, storage, and stonework for Techo-Bloc patios.',
      rates: {
        essential: { low: 10000, high: 18000, note: 'Grill island, basic counter, no plumbing.' },
        refined: { low: 18000, high: 35000, note: 'Grill, sink, refrigeration, stone veneer, lighting.' },
        bespoke: { low: 35000, high: 55000, note: 'Full appliance suite, premium finishes, possible roof or bar.' },
      },
    },
    {
      id: 'lighting',
      name: 'Integrated Lighting',
      description: 'Low-voltage accent lighting planned with the build.',
      defaultActive: true,
      rates: {
        essential: { low: 500, high: 1500, note: 'Entry-level path and step lighting.' },
        refined: { low: 1500, high: 4000, note: 'Seat wall, pergola, and focal lighting with smart timer.' },
        bespoke: { low: 4000, high: 8000, note: 'Full-zone control, color tuning, and feature integration.' },
      },
    },
  ],
}
