import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import ProjectCard from "../components/ProjectCard";
const List = ({ token }) => {
  const [project, setProject] = useState([]);
  const fetchProject = async () => {
    try {
      console.log(token);
      const response = await axios.get(
        backendUrl + "/api/admin/list",

        { headers: { token } },
      );
      if (response.data.success) {
        setProject(response.data.project);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProject();
  }, [token]);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your projects</p>
        </div>

        {project.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
            <p className="text-gray-500">No projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {project.map((item) => (
              <ProjectCard
                token={token}
                key={item._id}
                project={item}
                fetchProject={fetchProject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
