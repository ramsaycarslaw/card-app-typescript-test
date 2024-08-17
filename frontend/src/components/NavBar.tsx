import { useContext, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // Import the icons
import { NavLink } from "react-router-dom";
import { EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NavBar() {
  const { toggleDarkMode } = useContext(EntryContext) as EntryContextType;

  return (
    <nav className="flex justify-center gap-5">
      <NavLink
        className="m-3 p-4 text-xl rounded-md font-medium text-white bg-blue-400 hover:bg-blue-500
                     dark:bg-purple-600 dark:hover:bg-purple-700"
        to={"/"}
      >
        All Entries
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl rounded-md font-medium text-white bg-blue-400 hover:bg-blue-500
                     dark:bg-purple-600 dark:hover:bg-purple-700"
        to={"/create"}
      >
        New Entry
      </NavLink>
      <button
        className="m-3 p-4 text-xl rounded-md font-medium text-white bg-blue-400 hover:bg-blue-500
                     dark:bg-purple-600 dark:hover:bg-purple-700"
        onClick={toggleDarkMode}
      >
        <FaMoon className="block dark:hidden" />
        <FaSun className="hidden dark:block" />
      </button>
    </nav>
  );
}
