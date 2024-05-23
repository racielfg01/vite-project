interface ButtonProps{
    text:string,
    type?:string,
    delButton?:boolean,
    handleClick?:()=>void
}

function Button({ text = 'Button',type,delButton, handleClick}:ButtonProps) {

    return (
        <button
            className={`flex-shrink-0
            ${delButton?' bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700'
            :'bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700'}
            
            text-sm border-4 text-white py-1 px-2 rounded`}
            type={type?"button":"submit"}
            onClick={handleClick}
            >
            {text}
        </button>
    );
}

export default Button;
