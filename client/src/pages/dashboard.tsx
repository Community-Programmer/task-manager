import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { toast } from "sonner";
import type { Task } from '@/store/slices/taskSlice';
import { Navbar } from '@/components/navbar';
import { FilterBar } from '@/components/filter-bar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchTasks, createTask, updateTask, deleteTask, setCurrentTask } from '@/store/slices/taskSlice';

import { taskSchema } from '@/lib/validations';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [filters, setFilters] = useState({
        status: 'ALL',
        priority: 'ALL',
        search: ''
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const { addToast } = useToast();
    const { token } = useAppSelector((state: any) => state.auth);
    const { tasks, currentTask, isLoading, error } = useAppSelector((state: any) => state.tasks);

    const form = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            status: 'PENDING',
            dueDate: '',
            priority: 'MEDIUM',
        },
    });

    useEffect(() => {
        if (!token) {
            navigate('/auth');
            return;
        }

        dispatch(fetchTasks())
            .unwrap()
            .catch((_) => {
                toast.error('Failed to fetch tasks');
            });
    }, [dispatch, token, navigate]);

    useEffect(() => {
        if (currentTask && isEditMode) {
            form.reset({
                title: currentTask.title,
                description: currentTask.description || '',
                status: currentTask.status,
                dueDate: currentTask.dueDate || '',
                priority: currentTask.priority,
            });
        }
    }, [currentTask, form, isEditMode]);

    const handleCreateTask = () => {
        setIsEditMode(false);
        dispatch(setCurrentTask(null));
        form.reset({
            title: '',
            description: '',
            status: 'PENDING',
            dueDate: '',
            priority: 'MEDIUM',
        });
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
            toast.success('Task deleted successfully');
        } catch (error: any) {
            toast.error('Failed to delete task');
        }
    };

    const onSubmit = async (values: any) => {
        try {
            if (isEditMode && currentTask) {
                await dispatch(updateTask({ id: currentTask.id, ...values })).unwrap();
                toast.success('Task updated successfully');
            } else {
                await dispatch(createTask(values)).unwrap();
                toast.success('Task created successfully');
            }
            setIsOpen(false);
        } catch (error: any) {
            toast.error(`Failed to ${isEditMode ? 'update' : 'create'} task`);
        }
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
            <Navbar />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-2 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Your Tasks</h2>
                        <Button onClick={handleCreateTask}>Create New Task</Button>
                    </div>

                    <FilterBar
                        filters={filters}
                        onFilterChange={(type: string, value: string) => {
                            setFilters(prev => ({ ...prev, [type]: value }));
                        }}
                    />

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
                        {tasks
                            .filter((task: Task) => {
                                const matchesStatus = filters.status === 'ALL' || task.status === filters.status;
                                const matchesPriority = filters.priority === 'ALL' || task.priority === filters.priority;
                                const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                                    (task.description?.toLowerCase() || '').includes(filters.search.toLowerCase());
                                return matchesStatus && matchesPriority && matchesSearch;
                            })
                            .map((task: Task) => (
                                <div key={task.id} className="bg-white shadow rounded-lg p-4 relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="flex items-center p-1 cursor-pointer"
                                                onClick={() => {
                                                    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
                                                    dispatch(updateTask({
                                                        id: task.id,
                                                        title: task.title,
                                                        description: task.description,
                                                        status: newStatus,
                                                        dueDate: task.dueDate,
                                                        priority: task.priority
                                                    }));
                                                }}
                                            >
                                                <Checkbox
                                                    checked={task.status === 'COMPLETED'}
                                                    className="cursor-pointer border-gray-400"
                                                />
                                            </div>
                                            <h3 className={cn(
                                                "text-lg font-medium transition-all duration-200",
                                                task.status === 'COMPLETED' && "line-through text-gray-500"
                                            )}>
                                                {task.title}
                                            </h3>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Badge className={getStatusColor(task.status)}>
                                                {task.status}
                                            </Badge>
                                            <Badge className={getPriorityColor(task.priority)}>
                                                {task.priority}
                                            </Badge>
                                        </div>
                                    </div>
                                    {task.description && (
                                        <p className={cn(
                                            "text-gray-600 mb-4 transition-all duration-200",
                                            task.status === 'COMPLETED' && "line-through text-gray-400"
                                        )}>
                                            {task.description}
                                        </p>
                                    )}
                                    {task.dueDate && (
                                        <p className={cn(
                                            "text-sm text-gray-500 mb-4",
                                            task.status === 'COMPLETED' && "text-gray-400"
                                        )}>
                                            Due: {format(new Date(task.dueDate), 'PPP')}
                                        </p>
                                    )}
                                    <div className="flex justify-end space-x-2 mt-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEditTask(task)}
                                            disabled={task.status === 'COMPLETED'}
                                            className={cn(
                                                "hover:bg-blue-50",
                                                task.status === 'COMPLETED' && "opacity-50 cursor-not-allowed"
                                            )}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={cn(
                                                "text-red-600 hover:bg-red-50",
                                                task.status === 'COMPLETED' && "opacity-50 cursor-not-allowed"
                                            )}
                                            disabled={task.status === 'COMPLETED'}
                                            onClick={() => handleDeleteTask(task.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEditMode ? 'Edit Task' : 'Create New Task'}</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }: any) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Task title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }: any) => (
                                        <FormItem>
                                            <FormLabel>Description (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Task description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }: any) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="PENDING">Pending</SelectItem>
                                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }: any) => (
                                        <FormItem>
                                            <FormLabel>Priority</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a priority" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="LOW">Low</SelectItem>
                                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                                    <SelectItem value="HIGH">High</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({ field }: any) => (
                                        <FormItem>
                                            <FormLabel>Due Date (Optional)</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading
                                            ? isEditMode
                                                ? 'Updating...'
                                                : 'Creating...'
                                            : isEditMode
                                                ? 'Update Task'
                                                : 'Create Task'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </main>
        </div>
    );
}
