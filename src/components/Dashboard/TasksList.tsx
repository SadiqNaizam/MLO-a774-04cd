import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Settings, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

const initialTasks: Task[] = [
  { id: '1', text: 'Review and make sure nothing slips through cracks', completed: false, date: '15 Sep, 2021' },
  { id: '2', text: 'Send meeting invites for sales upcampaign', completed: true, date: '20 Sep, 2021' },
  { id: '3', text: 'Weekly closed sales won checking with sales team', completed: false, date: '24 Sep, 2021' },
  { id: '4', text: 'Add notes that can be viewed from the individual view', completed: false, date: '27 Sep, 2021' },
  { id: '5', text: 'Move stuff to another page', completed: true, date: '27 Sep, 2021' },
];

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState<string>('');

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const remainingTasksCount = tasks.length - completedTasksCount;

  const handleToggleComplete = useCallback((taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleAddTask = useCallback(() => {
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskText('');
  }, [newTaskText]);

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Tasks</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {remainingTasksCount} of {tasks.length} remaining
          </p>
          <div className="w-full bg-muted h-1.5 rounded-full mt-1">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: tasks.length > 0 ? `${(completedTasksCount / tasks.length) * 100}%` : '0%' }}
            ></div>
          </div>
        </div>
        
        <div className="flex space-x-2 mb-4">
          <Input 
            type="text"
            placeholder="Add new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            className="flex-grow"
          />
          <Button onClick={handleAddTask} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
              <div className="flex items-center">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleToggleComplete(task.id)}
                  className="mr-3"
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    'text-sm font-medium leading-none',
                    task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                  )}
                >
                  {task.text}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground whitespace-nowrap">{task.date}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleDeleteTask(task.id)}>
                    <Trash2 className="h-3.5 w-3.5"/>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksList;
