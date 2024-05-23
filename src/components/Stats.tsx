interface StatsProps{
    task_completed:number,
    total_task:number,
}

function Stats({ task_completed, total_task }:StatsProps) {
    return (
      <div className="flex flex-col justify-items-center">
          <p className="text-lg">Tareas Completadas</p>
          <p className="text-sm text-gray-500">Continua así</p>
        <div className="text-5xl">
          {task_completed}/{total_task}
        </div>
      </div>
    );
  }
  
  export default Stats;