import { readFileSync, writeFileSync } from "fs";
import https, { RequestOptions } from "node:https";

const request = async (day: number): Promise<string> => {
  const options: RequestOptions = {
    method: "GET",
    hostname: "adventofcode.com",
    path: `/${process.env.YEAR}/day/${day}/input`,
    headers: {
      Cookie: `session=${process.env.SESSION_ID}`,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const chunks: Uint8Array[] = [];

      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        resolve(Buffer.concat(chunks).toString());
      });

      res.on("error", (error) => {
        reject(error);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

export const getPuzzleInput = async (
  day: number,
  isJson = false,
): Promise<string> => {
  const filePath = `./cache/${day}.txt`;
  try {
    const data = readFileSync(filePath);
    return data.toString();
  }
  catch (_) {
    console.log("downloading");
    const result = await request(day);

    const data = isJson
      ? JSON.stringify(result)
      : result.toString();

    writeFileSync(filePath, data, { flag: "w+" });
    return data;
  }
};
