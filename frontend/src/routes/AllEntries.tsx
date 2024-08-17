import { useContext } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function AllEntries() {
  const { entries, deleteEntry } = useContext(EntryContext) as EntryContextType;
  let navigate = useNavigate();

  if (entries.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-10">
        <h1 className="text-center font-semibold text-2xl m-5 dark:text-gray-200">You don't have any card</h1>
        <p className="text-center font-medium text-md dark:text-gray-400">
          Lets{" "}
          <Link className="text-blue-400 underline underline-offset-1 dark:text-blue-500" to="/create">
            Create One
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {entries.map((entry: Entry, index: number) => {
          return (
            <div
              id={entry.id}
              key={index}
              className="bg-gray-300 shadow-md shadow-gray-500 p-6 rounded-lg flex flex-col justify-between dark:bg-gray-900 dark:shadow-gray-800"
            >
              <h1 className="font-bold text-sm md:text-lg dark:text-gray-200">{entry.title}</h1>
              <p className="text-center text-lg font-light mt-3 mb-4 dark:text-gray-400">{entry.description}</p>
              <section className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-6 md:space-y-0 pt-6">
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      deleteEntry(entry.id as string);
                    }}
                    className="p-2 font-semibold rounded-md bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/edit/${entry.id}`, { replace: true });
                    }}
                    className="p-2 font-semibold rounded-md bg-blue-500 hover:bg-blue-700 dark:bg-purple-500 dark:hover:bg-purple-800"
                  >
                    <FaPen />
                  </button>
                </div>
                <div className="text-right w-full max-w-xs md:max-w-sm lg:max-w-md">
                  <div className="flex justify-end items-center space-x-4 mt-2">
                    <p className="text-xs dark:text-gray-400">DATE</p>
                    <time className="text-sm md:text-lg dark:text-gray-400">
                      {new Date(entry.created_at.toString()).toLocaleDateString()}
                    </time>
                  </div>
                  <div className="flex justify-end items-center space-x-4 mt-2">
                    <p className="text-xs dark:text-gray-400">DUE</p>
                    <time className="text-sm md:text-lg dark:text-gray-400">
                      {new Date(entry.scheduled.toString()).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </section>
  );
}
