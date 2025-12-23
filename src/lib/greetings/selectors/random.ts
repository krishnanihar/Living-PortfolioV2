/**
 * Weighted Random Selection
 *
 * Selects items from pools using weighted probabilities,
 * reducing weight for recently shown items.
 */

interface WeightedItem {
  id: string;
  weight: number;
}

/**
 * Select a single item using weighted random selection
 */
export function selectWeightedRandom<T extends WeightedItem>(
  items: T[],
  recentlyShown: string[] = []
): T {
  if (items.length === 0) {
    throw new Error('Cannot select from empty array');
  }

  if (items.length === 1) {
    return items[0];
  }

  // Reduce weight for recently shown items
  const adjustedItems = items.map(item => ({
    ...item,
    adjustedWeight: recentlyShown.includes(item.id) ? item.weight * 0.2 : item.weight,
  }));

  const totalWeight = adjustedItems.reduce((sum, item) => sum + item.adjustedWeight, 0);
  let random = Math.random() * totalWeight;

  for (const item of adjustedItems) {
    random -= item.adjustedWeight;
    if (random <= 0) {
      return items.find(i => i.id === item.id)!;
    }
  }

  return items[0]; // Fallback
}

/**
 * Select multiple items without repetition
 */
export function selectMultipleWeightedRandom<T extends WeightedItem>(
  items: T[],
  count: number,
  recentlyShown: string[] = []
): T[] {
  const selected: T[] = [];
  const remaining = [...items];
  const usedIds = [...recentlyShown];

  for (let i = 0; i < count && remaining.length > 0; i++) {
    const item = selectWeightedRandom(remaining, usedIds);
    selected.push(item);
    usedIds.push(item.id);

    const index = remaining.findIndex(r => r.id === item.id);
    if (index > -1) remaining.splice(index, 1);
  }

  return selected;
}
