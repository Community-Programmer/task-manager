import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchTasks, createTask, updateTask, deleteTask, setCurrentTask } from '@/store/slices/taskSlice';
import type { Task } from '@/store/slices/taskSlice';
import { logout } from '@/store/slices/authSlice';
import { useToast } from '@/hooks/useToast';
import { Badge } from '@/components/ui/badge';
import { TaskForm } from '@/components/task-form';
import type { RootState } from '@/store';

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const { user, token } = useAppSelector((state: RootState) => state.auth);
    const { tasks, currentTask, isLoading, error } = useAppSelector((state: RootState) => state.tasks);

    useEffect(() => {
        if (!token) {
            navigate('/auth');
            return;
        }

        dispatch(fetchTasks())
            .unwrap()
            .catch((error) => {
                addToast({
                    title: 'Error',
                    description: error || 'Failed to fetch tasks',
                    variant: 'destructive',
                });
            });
    }, [dispatch, token, navigate, addToast]);

    const handleCreateTask = () => {
        setIsEditMode(false);
        dispatch(setCurrentTask(null));
        setIsOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setIsEditMode(true);
        dispatch(setCurrentTask(task));
        setIsOpen(true);
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await dispatch(deleteTask(id)).unwrap();
            addToast({
                title: 'Success',
                description: 'Task deleted successfully',
                variant: 'default',
            });
        } catch (error: any) {
            addToast({
                title: 'Error',
                description: error || 'Failed to delete task',
                variant: 'destructive',
            });
        }
    };

    const handleTaskSubmit = async (values: any) => {
        try {
            if (isEditMode && currentTask) {
                await dispatch(updateTask({ id: currentTask.id, ...values })).unwrap();
                addToast({
                    title: 'Success',
                    description: 'Task updated successfully',
                    variant: 'default',
                });
            } else {
                await dispatch(createTask(values)).unwrap();
                addToast({
                    title: 'Success',
                    description: 'Task created successfully',
                    variant: 'default',
                });
            }
            setIsOpen(false);
        } catch (error: any) {
            addToast({
                title: 'Error',
                description: error || `Failed to ${isEditMode ? 'update' : 'create'} task`,
                variant: 'destructive',
            });
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth');
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'HIGH':
                return 'bg-red-100 text-red-800';
            case 'MEDIUM':
                return 'bg-yellow-100 text-yellow-800';
            case 'LOW':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        return status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                        <Button variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0 flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium">Your Tasks</h2>
                    <Button onClick={handleCreateTask}>Create New Task</Button>
                </div>

                {isLoading && <div className="text-center py-4">Loading tasks...</div>}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {!isLoading && tasks.length === 0 && (
                    <div className="text-center py-10 bg-white rounded-lg shadow">
                        <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
                        <p className="mt-1 text-gray-500">Get started by creating a new task</p>
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <div key={task.id} className="bg-white shadow rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-medium">{task.title}</h3>
                                <div className="flex space-x-2">
                                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                </div>
                            </div>
                            {task.description && <p className="text-gray-600 mb-4">{task.description}</p>}
                            {task.dueDate && (
                                <p className="text-sm text-gray-500 mb-4">
                                    Due: {format(new Date(task.dueDate), 'PPP')}
                                </p>
                            )}
                            <div className="flex justify-end space-x-2 mt-4">
                                <Button variant="outline" size="sm" onClick={() => handleEditTask(task)}>
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-50"
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEditMode ? 'Edit Task' : 'Create New Task'}</DialogTitle>
                        </DialogHeader>
                        <TaskForm
                            defaultValues={
                                isEditMode && currentTask
                                    ? {
                                        title: currentTask.title,
                                        description: currentTask.description,
                                        status: currentTask.status,
                                        dueDate: currentTask.dueDate,
                                        priority: currentTask.priority,
                                    }
                                    : undefined
                            }
                            onSubmit={handleTaskSubmit}
                            isLoading={isLoading}
                            isEdit={isEditMode}
                        />
                    </DialogContent>
                </Dialog>
            </main>
        </div>
    );
}
