import React from "react";
import { Plus, List, LogOut } from "lucide-react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
const Navbar = ({ token, setToken }) => {
  const [loading, setLoading] = useState(false);
  const logOutHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/admin/logout",
        {},
        {
          headers: { token },
        },
      );
      if (response.data.success) {
        setToken("");
        localStorage.removeItem("token");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-0">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Sandyway
        </h1>

        <div className="flex items-center gap-2">
          <a
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <Plus size={17} />
            <span>Add</span>
          </a>

          <a
            href="/list"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <List size={17} />
            <span>List</span>
          </a>

          <button
            onClick={logOutHandler}
            disabled={loading}
            type="button"
            className="ml-2 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <LogOut size={17} />
            <span>{loading ? "Logging Out..." : "Log Out"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
