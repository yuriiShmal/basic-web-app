export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Rohan";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "yshmal";
  }

  if (query.toLowerCase().includes("largest")) {
    // Extract numbers (supports negatives and decimals)
    const numbers = query.match(/-?\d+(\.\d+)?/g)?.map(Number);

    if (!numbers || numbers.length === 0) {
      return "No numbers found";
    }

    const largest = Math.max(...numbers);
    return largest.toString();
  }

  if (query.toLowerCase().includes("plus")) {
    // Extract numbers (supports negatives and decimals)
    const numbers = query.match(/-?\d+(\.\d+)?/g)?.map(Number);

    if (!numbers || numbers.length === 0) {
      return "No numbers found";
    }

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum.toString();
  }

  if (query.toLowerCase().includes("multiplied")) {
    // Extract numbers (supports negatives and decimals)
    const numbers = query.match(/-?\d+(\.\d+)?/g)?.map(Number);

    if (!numbers || numbers.length === 0) {
      return "No numbers found";
    }

    const sum = numbers.reduce((acc, curr) => acc * curr, 1);
    return sum.toString();
  }

  if (query.toLowerCase().includes("both a square and a cube")) {
    const numbers = query.match(/-?\d+(\.\d+)?/g)?.map(Number);

    if (!numbers || numbers.length === 0) {
      return "No numbers found";
    }

    // A number is both a square and cube if it is a perfect sixth power
    const isPerfectSixthPower = (num: number): boolean => {
      const root = Math.round(Math.pow(num, 1 / 6));
      return Math.pow(root, 6) === num;
    };

    const result = numbers.find(isPerfectSixthPower);

    return result !== undefined ? result.toString() : "None found";
  }

  if (query.toLowerCase().includes("minus")) {
  const numbers = query.match(/-?\d+(\.\d+)?/g)?.map(Number);

  if (!numbers || numbers.length !== 2) {
    return "Invalid input";
  }

  const result = numbers[0] - numbers[1];
  return result.toString();
}

if (query.toLowerCase().includes("prime")) {
  const numbers = query.match(/-?\d+(\.\d+)?/g)?.map(Number);

  if (!numbers || numbers.length === 0) {
    return "No numbers found";
  }

  const isPrime = (num: number): boolean => {
    if (num <= 1 || !Number.isInteger(num)) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }

    return true;
  };

  const primes = numbers.filter(isPrime);

  return primes.length > 0 ? primes.join(", ") : "None";
}

  return "";
}
