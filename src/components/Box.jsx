 export const Box = (props) => {
    return (
        <div className="h-28 w-28 bg-blue-500 flex justify-center items-center text-center border-2 border-black">
            <p>{props.name}: {props.order}</p>
        </div>
    )
}