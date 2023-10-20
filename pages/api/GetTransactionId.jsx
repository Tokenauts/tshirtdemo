export default async function handleTransaction(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed. Use POST." });
    return;
  }

  const { address, amount, chainId, contractAddress } = req.body;

  if (!address || !amount || !chainId || !contractAddress) {
    res.status(400).json({ message: "Missing parameters." });
    return;
  }

  try {
    // Here, you'd perform your transaction. This is a placeholder; you'll need to replace it with your actual transaction logic.
    const response = await fetch(
      `https://front-git-test-way2pay.vercel.app/api/transaction`, // The URL should be the URL of the actual transaction endpoint, not the Next.js API route.
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, amount, chainId, contractAddress }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("There was an error with the transaction:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
