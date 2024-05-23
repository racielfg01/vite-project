import { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import Stats from './components/Stats';
import pb from './libs/pocketbase';
import { RecordModel } from 'pocketbase';

export interface TaskProps {
  id: string,
  text: string,
  completed: boolean,
  created: string,
  updated: string,
}

function App() {
  const [tasks, setTasks] = useState<RecordModel[]>([]);
  const [newTask, setNewTask] = useState('');


  useEffect(() => {
 // Verificar si hay datos en el localStorage
 const cachedTasks = localStorage.getItem('tasks');
 if (cachedTasks) {
   setTasks(JSON.parse(cachedTasks));
 } else {
   // Obtener datos de la base de datos
    fetchTasksFromDatabase();
 }
    
  }, []);

  const fetchTasksFromDatabase = async () => {
    try {
      const response =  await pb.collection('tasks').getList(1, 50, {
        filter: 'created >= "2022-01-01 00:00:00"',
    });
      const {items} = response;
      setTasks(items);
      // Almacenar los datos en el localStorage
      localStorage.setItem('tasks', JSON.stringify(items));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      
    }
  };


  const task_completed = tasks.filter(
    (task) => task.completed == true
  ).length;
  const total_tasks = tasks.length;


  return (
    <>
      <div className="bg-cyan-800 h-screen ">
        <div className="mx-auto grid max-w-4xl grid-cols-12 gap-4 p-1">

          <div className="col-span-12 rounded-lg bordertext-white border 
          shadow-md sm:p-8 dark:bg-gray-800  dark:border-gray-700
           dark:text-white p-8 sm:col-span-8">
            <h1 className='text-2xl '>Crea una tarea!</h1>
            <Form tasks={tasks} newTask={newTask} setNewTask={setNewTask} setTasks={setTasks} />
          </div>
          <div className="col-span-12 content-center rounded-lg border
           dark:bg-gray-800  dark:border-gray-700 dark:text-white p-5 sm:col-span-4">
            <Stats task_completed={task_completed} total_task={total_tasks} />
          </div>
          <div className=" col-span-12 ">
            <List tasks={tasks} setTasks={setTasks} />
          </div>
        </div>
      </div>





    </>

  );
}

export default App;
