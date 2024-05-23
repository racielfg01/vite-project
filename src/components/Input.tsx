
function Input({}) {

    return (
        <input
        className='bg-white text-black focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
        type="text"
          name="todo"
          id="todo"
        placeholder="Ej: Estudiar 1 hora.."

      />
    );
}

export default Input;
