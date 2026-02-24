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

  

  // ---- helpers ----
  const extractNumbers = (): number[] | null => {
    const nums = query.match(/-?\d+(\.\d+)?/g)?.map(Number);
    return nums && nums.length > 0 ? nums : null;
  };

  const isPrime = (num: number): boolean => {
    if (num <= 1 || !Number.isInteger(num)) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const isPerfectSixthPower = (num: number): boolean => {
    if (!Number.isInteger(num) || num < 0) return false;
    const root = Math.round(Math.pow(num, 1 / 6));
    return Math.pow(root, 6) === num;
  };

  // ---- special number property queries ----
  if (query.includes("both a square and a cube")) {
    const numbers = extractNumbers();
    if (!numbers) return "No numbers found";
    const hit = numbers.find(isPerfectSixthPower);
    return hit !== undefined ? hit.toString() : "None";
  }

  if (query.includes("prime")) {
    const numbers = extractNumbers();
    if (!numbers) return "No numbers found";
    const primes = numbers.filter(isPrime);
    return primes.length ? primes.join(", ") : "None";
  }

  if (query.includes("largest")) {
    const numbers = extractNumbers();
    if (!numbers) return "No numbers found";
    return Math.max(...numbers).toString();
  }

  // ---- arithmetic expressions (plus / minus / multiplied by), including mixed ops ----
  // Supports patterns like:
  // "What is 3 minus 62?"
  // "23 multiplied by 20 plus 30"
  // "10 plus 5 multiplied by 2 minus 3"
  //
  // Precedence: multiplied > plus/minus (standard)
  const hasArithmetic =
    query.includes("plus") || query.includes("minus") || query.includes("multiplied");
  if (hasArithmetic) {
    // tokenize: numbers and operators in order
    const tokens = query
      .toLowerCase()
      .replace(/\?/g, "")
      .match(/-?\d+(?:\.\d+)?|multiplied by|multiplied|plus|minus/g);

    if (!tokens || tokens.length === 0) return "Invalid input";

    const values: number[] = [];
    const ops: ("+" | "-" | "*")[] = [];

    for (const t of tokens) {
      if (/^-?\d/.test(t)) {
        values.push(Number(t));
      } else if (t === "plus") {
        ops.push("+");
      } else if (t === "minus") {
        ops.push("-");
      } else if (t === "multiplied" || t === "multiplied by") {
        ops.push("*");
      }
    }

    // basic validity
    if (values.length === 0) return "No numbers found";
    if (ops.length === 0) {
      // singular number query like "What is 7?"
      return values[0].toString();
    }
    if (values.length !== ops.length + 1) return "Invalid input";

    // apply multiplication first
    const collapsedValues: number[] = [values[0]];
    const collapsedOps: ("+" | "-")[] = [];

    for (let i = 0; i < ops.length; i++) {
      const op = ops[i];
      const nextVal = values[i + 1];

      if (op === "*") {
        collapsedValues[collapsedValues.length - 1] *= nextVal;
      } else {
        collapsedOps.push(op);
        collapsedValues.push(nextVal);
      }
    }

    // then apply + and -
    let result = collapsedValues[0];
    for (let i = 0; i < collapsedOps.length; i++) {
      result = collapsedOps[i] === "+" ? result + collapsedValues[i + 1] : result - collapsedValues[i + 1];
    }

    return result.toString();
  }

  return "";
}
