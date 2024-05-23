import { ChangeEvent, Dispatch,  SetStateAction,  useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { RecordModel } from "pocketbase";
import pb from "../libs/pocketbase";

interface ButtonProps{
    tasks:RecordModel[],
    newTask:string,
    setTasks:Dispatch<SetStateAction<RecordModel[]>>,
    setNewTask:Dispatch<SetStateAction<string>>,
}

 function Form({tasks,setTasks}:ButtonProps) {

  const [field, setField] = useState('x');

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = e.target.todo.value;
         
        if(!value){
            setField('')
          return}else {setField(value)}

          const newTask = {
            "text": value,
            "completed": false
        };
        
       
            try {
              // Actualizar el producto en la base de datos
              const record = await pb.collection('tasks').create(newTask);
              // Actualizar el producto en el estado y el localStorage
              setTasks((prevTasks) => [...prevTasks, record]);

              const updatedTaskList = JSON.stringify([...tasks, record]);
             localStorage.setItem("tasks", updatedTaskList);
            } catch (error) {
              console.error('Error creating task:', error);
            }

          e.target.reset();
    };


    return (
        <form
        className="flex flex-col gap-1"
        
        onSubmit={handleSubmit}>
            <span className="text-red-400 p-0">{!field?'No escribiste nada':''}</span>
          <div className='flex justify-between gap-3 my-5'>
           <Input  />
            <Button text='Add' />
          </div>
        </form>
    );
}

export default Form;
