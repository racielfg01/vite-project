import { Dispatch, SetStateAction } from "react";
import Item from "./Item";
import { RecordModel } from "pocketbase";

interface ListProps {
    tasks: RecordModel[],
    setTasks: Dispatch<SetStateAction<RecordModel[]>>,
}

function List({ tasks, setTasks }: ListProps) {

    return (

        <>
            <div className=" ">

                <div className="p-4 bg-white rounded-lg border shadow-md 
                sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold leading-none
                         text-gray-900  dark:text-white">Lista de Tareas</h3>
                       
                    </div>
                    <div className="flow-root ">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {tasks && tasks.length > 0 ? (
                                tasks?.map((item, key) => (
                                    <Item key={key} item={item} tasks={tasks} setTasks={setTasks} />
                                ))
                            ) : (
                                <p className="text-white">No hay tareas</p>
                            )}

                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
}

export default List;
