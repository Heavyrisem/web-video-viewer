import type { GetServerSideProps, NextPage } from "next";
import fs from "fs/promises";
import Link from "next/link";
import { sortByStringNumber } from "../helper/sort";

interface DirListProps {
  directories: string[];
}

const DirList: NextPage<DirListProps> = ({ directories }) => {
  return (
    <ul className="flex justify-center items-center flex-col">
      {directories.sort(sortByStringNumber).map((dir) => (
        <li
          key={dir}
          className="rounded-md border-gray-200 border px-2 py-1 my-2 hover:bg-gray-400 hover:text-white duration-200"
        >
          <Link href={dir}>{dir}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getServerSideProps: GetServerSideProps<
  DirListProps
> = async () => {
  const datas = await fs.readdir("./public", { withFileTypes: true });
  const filtered = datas.filter((data) => data.isDirectory());
  const directories = filtered
    .map((data) => data.name)
    .sort(sortByStringNumber);

  return {
    props: {
      directories,
    },
  };
};

export default DirList;
