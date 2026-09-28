export function Button( {value, onClick, primary = true , children} ){

    const style = primary ? undefined : {backgroundColor: "transparent", borderColor: "purple", color: "purple"};

    return <button style={style} className="btn group" onClick={onClick}>
        {value}
        {children}
    </button>
}