"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import SortModal from "@/components/modals/SortModal";
import EditTaskModal from "@/components/modals/EditTaskModal";
import NewTaskModal from "@/components/modals/NewTaskModal";
import { storage, type Task } from "@/lib/storage";

export default function TaskLibraryScreen() {
  const [showSortModal, setShowSortModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());

  // Load tasks from localStorage
  useEffect(() => {
    setTasks(storage.getTasks());
  }, []);

  const handleNewTask = (taskData: {
    title: string;
    description: string;
    energyLevel: "low" | "med" | "high";
    duration: string;
    subject: string;
  }) => {
    storage.addTask({
      ...taskData,
      inFocus: false,
    });
    setTasks(storage.getTasks());
    setShowNewTaskModal(false);
  };

  const handleSaveTask = (task: Task) => {
    storage.updateTask(task.id, task);
    setTasks(storage.getTasks());
    setEditingTask(null);
  };

  const handleDeleteTask = (id: number) => {
    storage.deleteTask(id);
    setTasks(storage.getTasks());
    setEditingTask(null);
  };

  const handleAddToFocus = (id: number) => {
    storage.updateTask(id, { inFocus: true });
    setTasks(storage.getTasks());
  };

  const handleToggleSelection = (id: number) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTasks(newSelected);
  };

  const handleAddSelectedToFocus = () => {
    selectedTasks.forEach((id) => {
      storage.updateTask(id, { inFocus: true });
    });
    setTasks(storage.getTasks());
    setSelectedTasks(new Set());
    setSelectionMode(false);
  };

  const handleCancelSelection = () => {
    setSelectedTasks(new Set());
    setSelectionMode(false);
  };

  return (
    <>
      <div>
        <Header />

        <div className="px-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-black">Right Now</h2>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full py-3 pl-5 pr-12 bg-white border-[3px] border-black rounded-2xl text-black placeholder:text-[#909090] focus:outline-none  focus:ring-black"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="black" strokeWidth="2" />
                  <path
                    d="M12 12l5 5"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => setShowSortModal(true)}
              className="w-14 h-14 bg-white border-[3px] border-black rounded-full flex items-center justify-center  hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 4h14M5 10h10M7 16h6"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="17" cy="4" r="2" fill="black" />
                <circle cx="15" cy="10" r="2" fill="black" />
                <circle cx="13" cy="16" r="2" fill="black" />
              </svg>
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-4 mb-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={
                  selectionMode
                    ? () => handleToggleSelection(task.id)
                    : undefined
                }
                className={selectionMode ? "cursor-pointer" : ""}
              >
                <TaskCard
                  {...task}
                  showEditButton={!selectionMode}
                  onEdit={() => setEditingTask(task.id)}
                  isSelected={selectedTasks.has(task.id)}
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-6">
            {selectionMode ? (
              <>
                <button
                  onClick={handleAddSelectedToFocus}
                  disabled={selectedTasks.size === 0}
                  className={`flex-1 bg-[#F5E7FF] text-black font-bold py-3.5 px-6 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)] transition-all ${
                    selectedTasks.size === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  + Add to My Focus
                </button>
                <button
                  onClick={handleCancelSelection}
                  className=" bg-[#FFE2E8] text-black font-bold py-3.5 px-4 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)] transition-all"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectionMode(true)}
                  className="flex-1 bg-[#F5E7FF] text-black font-bold py-3.5 px-4 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)] transition-all"
                >
                  + My Focus
                </button>
                <button
                  onClick={() => setShowNewTaskModal(true)}
                  className="flex-1 bg-[#FFF4BC] text-black font-bold py-3.5 px-4 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)] transition-all"
                >
                  + New Task
                </button>
              </>
            )}
          </div>

        </div>
      </div>

      {showSortModal && <SortModal onClose={() => setShowSortModal(false)} />}
      {showNewTaskModal && (
        <NewTaskModal
          onClose={() => setShowNewTaskModal(false)}
          onSave={handleNewTask}
        />
      )}
      {editingTask && (
        <EditTaskModal
          task={tasks.find((t) => t.id === editingTask)!}
          onClose={() => setEditingTask(null)}
          onSave={(task: Task) => handleSaveTask(task)}
          onDelete={() => handleDeleteTask(editingTask)}
        />
      )}
    </>
  );
}
