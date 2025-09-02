// Define the shape of the root state
// This is used to avoid circular dependencies
export interface RootState {
  auth: {
    user: {
      id: string;
      name: string;
      email: string;
    } | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
  };
  tasks: {
    tasks: Array<{
      id: string;
      title: string;
      description?: string;
      status: 'PENDING' | 'COMPLETED';
      dueDate?: string;
      priority: 'LOW' | 'MEDIUM' | 'HIGH';
      createdAt: string;
      updatedAt: string;
      userId: string;
    }>;
    currentTask: {
      id: string;
      title: string;
      description?: string;
      status: 'PENDING' | 'COMPLETED';
      dueDate?: string;
      priority: 'LOW' | 'MEDIUM' | 'HIGH';
      createdAt: string;
      updatedAt: string;
      userId: string;
    } | null;
    isLoading: boolean;
    error: string | null;
  };
}
