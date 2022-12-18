import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { txHash } = req.query;
  const url = `https://api-testnet.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${process.env.BSCSCAN_API_KEY}`;

  try {
    const { data } = await axios.get(url);

    res.status(200).json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(400).json({ error: error.message });
    }
  }
}
