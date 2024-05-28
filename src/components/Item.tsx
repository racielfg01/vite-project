import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "./Button";
import { RecordModel } from "pocketbase";
import pb from "../libs/pocketbase";

interface ListProps {
  item: RecordModel,
  tasks: RecordModel[],
  setTasks: Dispatch<SetStateAction<RecordModel[]>>,
}

function Item({ item,tasks, setTasks }: ListProps) {
  const [field, setField] = useState('');
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);


  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdateStorage = () => {
       // Update localStorage after editing todo
   const updatedTasks = JSON.stringify(tasks);
   localStorage.setItem("tasks", updatedTasks);
  };


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    setField(e.target.value)
  
  };



  const handleDelete = async (id: string) => {
    setTasks(prevTasks => prevTasks.filter((task) => task.id !== id));
    await pb.collection('tasks').delete(item.id);

  };

  const handleToggleCompleted = async () => {
const completedState=item.completed
  try {
    // Actualizar el producto en la base de datos
    const record = await pb.collection('tasks').update(item.id,{...item,completed:!completedState});
    // Actualizar el producto en el estado y el localStorage
    
setTasks(prevTasks =>
    prevTasks.map((task) =>
      task.id === item.id
        ? { ...task, completed: !task.completed }
        : task
    )
  , () => {
    // Esta función se ejecutará después de que el estado se haya actualizado
    const updatedTasks = JSON.stringify(tasks);
    localStorage.setItem("tasks", updatedTasks);
  });

  } catch (error) {
    console.error('Error updating product:', error);
  }
      
  };
  

  const handleInputSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if(!field)return

    item.text=field

    try {
      
      // Actualizar el producto en la base de datos
      const record= await pb.collection('tasks').update(item.id,item);
   
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === record.id ? record : task
        )
      );

     
    } catch (error) {
      console.error('Error updating task:', error);
    }
 
    setEditing(false);
  };


  const handleInputBlur = () => {
    setEditing(false);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // position the cursor at the end of the text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  useEffect(() => {
    handleUpdateStorage();
  }, [tasks]);


  return (

    <li className="py-3 sm:py-4 ">
    <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
        <input
          className='mr-2 leading-tight'
          type="checkbox"
          onChange={handleToggleCompleted}
          checked={item.completed}
        />
     
        </div>
        <div className="flex-1 min-w-0">
        {editing ? (
          <form onSubmit={handleInputSubmit}>
            <input
              ref={inputRef}
              type="text"
              className='bg-white text-black focus:outline-none 
              focus:shadow-outline border border-gray-300 rounded-lg
               py-2 px-4 block w-full appearance-none leading-normal'
              defaultValue={item?.text}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </form>
        ) : (
          <p
            style={{
              textDecoration: item.completed ? 'line-through' : 'none',
            }}
            className="text-sm font-medium text-gray-900 truncate dark:text-white"
          >
            {item.text}
          </p>
        )}
            
           
        </div>
        <div className="inline-flex items-center gap-1 lg:gap-3 text-base font-semibold text-gray-900 dark:text-white">
        <Button text='Edit' type='button' handleClick={() => handleEdit()} />
        <Button text='Delete' type='button' delButton handleClick={() => handleDelete(item.id)} />
    
        </div>
    </div>
</li>
  

  );
}

export default Item;
