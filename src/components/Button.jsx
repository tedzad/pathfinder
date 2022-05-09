function Button({onClick, children}) {
    return <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded px-20 mx-10 mt-5" onClick={onClick}>{children}</button>
}

export default Button