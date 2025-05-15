import { useState } from 'react';

import AddTaskModal from './AddTaskModal';
import NoTaskFound from './NoTaskFound';
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
    const defaultTask = {
        'id': crypto.randomUUID(),
        'title': "Learn React ",
        'description': "I want to learn React such than I can treat it like my slave and make it do whateer I wan to do",
        "tags": ["web", "react", "js"],
        'priority': " High",
        'isFavorite': false,
    }
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    function handleAddEditTask(newTask, isAdd) {
        if (isAdd) {
            setTasks([
                ...tasks,
                newTask
            ])
        } else {
            setTasks(tasks.map((task) => {
                if (task.id === newTask.id) {
                    return newTask;
                }
                return task;
            }))
        }

        setShowAddModal(false)
        setTaskToUpdate(null);  // I have added personally 
    }

    function handleEditTask(task) {
        setTaskToUpdate(task)
        setShowAddModal(true)
    }

    function handleCloseClick() {
        setShowAddModal(false);
        setTaskToUpdate(null);
    }

    function handleDeleteTask(taskId) {
        const taskAfterDelete = tasks.filter(task => task.id !== taskId)
        setTasks(taskAfterDelete)
    }

    function handleDeleteAllClick() {
        tasks.length = 0
        setTasks([...tasks])
    }

    function handleFavorite(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId)
        const newTasks = ([...tasks])

        newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite
        setTasks(newTasks)
    }

    function handleSearch(searchTerm) {
        console.log(searchTerm);

        const filtered = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        )

        setTasks([...filtered])
    }


    return (
        <div>
            <section className="mb-20" id="tasks">
                {showAddModal && (
                    <AddTaskModal
                        onSave={handleAddEditTask}
                        taskToUpdate={taskToUpdate}
                        onCloseClick={handleCloseClick}
                    />)}
                <div className="container">

                    <div className="p-2 flex justify-end">
                        <SearchTask onSearch={handleSearch} />
                    </div>

                    <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                        <TaskActions
                            onAddClick={() => setShowAddModal(true)}
                            onDeleteAllClick={handleDeleteAllClick} />

                        {
                            tasks.length > 0 ?
                                (
                                    <TaskList
                                        tasks={tasks}
                                        onFav={handleFavorite}
                                        onEdit={handleEditTask}
                                        onDelete={handleDeleteTask} />
                                ) : (
                                    <NoTaskFound />
                                )

                        }
                    </div>
                </div>
            </section>
        </div>
    );
}