enum Resolutions {
  "360p" = "360p",
  "720p" = "720p",
  "1080p" = "1080p",
}

type Resolution = `${Resolutions}`;

const resolutionsCommands: Record<Resolutions, string> = {
  [Resolutions["360p"]]: `-s 640x360 -b:v 800k`,
  [Resolutions["720p"]]: `-s 1280x720 -b:v 2800k`,
  [Resolutions["1080p"]]: `-s 1280x720 -b:v 2800k`,
};

const commands = {
  hls: (filePath: string, hlsPath: string, outputPath: string) =>
    `ffmpeg -i ${filePath} -c:v h264 -c:a aac -start_number 0 -hls_time 12 -hls_list_size 0 -f hls ${hlsPath}`,

  hlsQuality: (filePath: string, outputDir: string, resolution: Resolution) =>
    `ffmpeg -i "${filePath}" \
  -c:v libx264 -c:a aac \
  ${resolutionsCommands[resolution]} \
  -f hls -hls_time 10 -hls_list_size 0 \
  -hls_segment_filename "${outputDir}/segment%d.ts" \
  "${outputDir}/index.m3u8"`,
};

export { commands as default, Resolution, Resolutions };
