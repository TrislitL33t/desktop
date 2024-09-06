import { useEffect } from "react";
import { checkAccessForNFTs } from "components/system/ThirdWeb/AccessContract";
import useFileSystemContextState from "contexts/fileSystem/useFileSystemContextState";
import { createM3uPlaylist } from "components/apps/Webamp/functions";

type WorkerFile = {
  album: string;
  artist: string;
  duration: number;
  title: string;
  url: string;
};
const fetchTracksFromWorker = async (): Promise<WorkerFile[]> => {
  const response = await fetch(
    "https://ogmusicfolder.trislit-52c.workers.dev/"
  );
  // Explicitly cast to WorkerFile[]
  return (await response.json()) as WorkerFile[];
};

const generatePlaylist = (tracks: WorkerFile[]): string => {
  const m3uTracks = tracks.map((track) => ({
    defaultName: `${track.artist} - ${track.title}`,
    duration: track.duration,
    metaData: {
      album: track.album,
      artist: track.artist,
      title: track.title,
    },
    url: track.url,
  }));

  return createM3uPlaylist(m3uTracks);
};

const savePlaylistFile = async (
  playlistContent: string,
  writeFile: (path: string, content: Buffer) => Promise<boolean>,
  updateFolder: (path: string) => Promise<void>
): Promise<void> => {
  const filePath = "/Users/Music/OGPlaylist.m3u";

  const writeSuccess = await writeFile(filePath, Buffer.from(playlistContent));

  if (writeSuccess) {
    await updateFolder("/Users/Music/");
    console.error("Playlist created successfully!");
  } else {
    console.error("Failed to write the playlist file.");
  }
};

const PlaylistGenerator = ({
  walletAddress,
}: {
  walletAddress: string;
}): null => {
  const { writeFile, updateFolder } = useFileSystemContextState();

  useEffect(() => {
    const generateM3UPlaylist = async (): Promise<void> => {
      const { playlistAccess } = await checkAccessForNFTs(walletAddress);

      if (playlistAccess) {
        const tracks = await fetchTracksFromWorker();
        const m3uPlaylist = generatePlaylist(tracks);
        await savePlaylistFile(m3uPlaylist, writeFile, updateFolder);
      } else {
        console.error("User does not have access to the playlist.");
      }
    };

    generateM3UPlaylist();
  }, [walletAddress, writeFile, updateFolder]);
  // eslint-disable-next-line unicorn/no-null
  return null; // Explicit return type as null
};

export default PlaylistGenerator;
