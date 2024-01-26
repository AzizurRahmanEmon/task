import React, { useState, useEffect } from "react";

const Problem1 = () => {
  const defaultTasks = [
    {
      name: "Eat",
      status: "Completed",
    },
    {
      name: "Sleep",
      status: "Pending",
    },
    {
      name: "Workout",
      status: "Active",
    },
    {
      name: "Code",
      status: "Pending",
    },
  ];

  const [show, setShow] = useState("all");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState(defaultTasks);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    if (fieldName === "name") {
      setName(value);
    } else if (fieldName === "status") {
      setStatus(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { name, status };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setName("");
    setStatus("");
  };

  const handleClick = (val) => {
    setShow(val.toLowerCase()); // Convert to lowercase for comparison
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (storedTasks.length === 0) {
      // If no tasks stored, set the default tasks in local storage
      localStorage.setItem("tasks", JSON.stringify(defaultTasks));
    } else {
      setTasks(storedTasks);
    }
  }, [defaultTasks]);

  // Custom sorting function
  const customSort = (taskA, taskB) => {
    const statusA = taskA.status.toLowerCase();
    const statusB = taskB.status.toLowerCase();

    // Sort by status: active, completed, and then the rest
    if (statusA === "active" && statusB !== "active") {
      return -1;
    } else if (statusA === "completed" && statusB !== "completed") {
      return -1;
    } else if (statusA !== "completed" && statusB === "completed") {
      return 1;
    } else {
      return 0;
    }
  };

  const filteredTasks =
    show === "all"
      ? tasks.sort(customSort)
      : tasks.filter((task) => task.status.toLowerCase() === show);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                name="status" // Add the name attribute
                value={status}
                onChange={(e) => handleInputChange(e, "status")}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
