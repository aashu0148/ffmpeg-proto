import { Request, Response } from "express";
import { v4 } from "uuid";
import { exec } from "child_process";
import fs from "fs";

import commands, { Resolution, Resolutions } from "#utils/ffmpegCommands";
import { createResponse } from "#utils/util";

const uploadSingleFile = async (req: Request, res: Response) => {
  const file = req.file;
  const filePath = file.path;
  const folderId = v4();

  const videoUrls: Partial<Record<Resolution, string>> = {};
  for (const r in Resolutions) {
    const outputPath = `./videos/${folderId}/${r}`;

    // if output folder not there then create it
    if (!fs.existsSync(outputPath))
      fs.mkdirSync(outputPath, { recursive: true });

    const ffmpegCommand = commands.hlsQuality(
      filePath,
      outputPath,
      r as Resolution
    );

    // for now using exec command and doing the conversions here only instead on a separate server
    exec(ffmpegCommand, (_error, _stdout, _stderr) => {
      // not dealing with errors for now
    });

    videoUrls[r] = outputPath.slice(1) + `/index.m3u8`;
  }

  createResponse(res, videoUrls);
};

export { uploadSingleFile };
